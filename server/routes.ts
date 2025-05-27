import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSwapEventSchema, insertPoolStatsSchema } from "@shared/schema";
import { ethers } from "ethers";

// Etherscan API configuration
const ETHERSCAN_API_URL = "https://api.etherscan.io/v2/api";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || process.env.API_KEY || "YourApiKeyToken";

// Uniswap V3 Swap event topic
const SWAP_EVENT_TOPIC = "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67";

// Default ETH/USDC pool address
const DEFAULT_POOL_ADDRESS = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";

interface EtherscanLog {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  timeStamp: string;
  gasPrice: string;
  gasUsed: string;
  logIndex: string;
  transactionHash: string;
  transactionIndex: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get pool statistics
  app.get("/api/pools/:address/stats", async (req, res) => {
    try {
      const { address } = req.params;
      let stats = await storage.getPoolStats(address);
      
      if (!stats) {
        // Initialize default stats
        const defaultStats = {
          poolAddress: address,
          totalVolume: "0",
          dailyTrades: 0,
          currentPrice: "0",
          buyPressure: 50,
          sellPressure: 50,
          largeVolume: "0",
          mediumVolume: "0",
          smallVolume: "0",
          lastUpdated: new Date(),
        };
        stats = await storage.createPoolStats(defaultStats);
      }
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching pool stats:", error);
      res.status(500).json({ error: "Failed to fetch pool statistics" });
    }
  });

  // Get swap events for a pool
  app.get("/api/pools/:address/swaps", async (req, res) => {
    try {
      const { address } = req.params;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const events = await storage.getSwapEvents(address, limit, offset);
      res.json(events);
    } catch (error) {
      console.error("Error fetching swap events:", error);
      res.status(500).json({ error: "Failed to fetch swap events" });
    }
  });

  // Fetch and decode swap events from Etherscan
  app.post("/api/pools/:address/fetch-swaps", async (req, res) => {
    try {
      const { address } = req.params;
      const { fromBlock, toBlock } = req.body;

      if (!fromBlock || !toBlock) {
        return res.status(400).json({ error: "fromBlock and toBlock are required" });
      }

      // Fetch logs from Etherscan
      const logsUrl = new URL(ETHERSCAN_API_URL);
      logsUrl.searchParams.append("chainid", "1");
      logsUrl.searchParams.append("module", "logs");
      logsUrl.searchParams.append("action", "getLogs");
      logsUrl.searchParams.append("address", address);
      logsUrl.searchParams.append("fromBlock", fromBlock.toString());
      logsUrl.searchParams.append("toBlock", toBlock.toString());
      logsUrl.searchParams.append("topic0", SWAP_EVENT_TOPIC);
      logsUrl.searchParams.append("page", "1");
      logsUrl.searchParams.append("offset", "1000");
      logsUrl.searchParams.append("apikey", ETHERSCAN_API_KEY);

      console.log("Fetching logs from:", logsUrl.toString());
      
      const logsResponse = await fetch(logsUrl.toString());
      const logsData = await logsResponse.json();

      if (logsData.status !== "1") {
        return res.status(400).json({ error: logsData.message || "Failed to fetch logs from Etherscan" });
      }

      // Fetch contract ABI
      const abiUrl = new URL(ETHERSCAN_API_URL);
      abiUrl.searchParams.append("chainid", "1");
      abiUrl.searchParams.append("module", "contract");
      abiUrl.searchParams.append("action", "getabi");
      abiUrl.searchParams.append("address", address);
      abiUrl.searchParams.append("apikey", ETHERSCAN_API_KEY);

      const abiResponse = await fetch(abiUrl.toString());
      const abiData = await abiResponse.json();

      if (abiData.status !== "1") {
        return res.status(400).json({ error: "Failed to fetch contract ABI" });
      }

      // Parse ABI and decode logs
      const contractInterface = new ethers.Interface(abiData.result);
      const decodedEvents = [];

      for (const log of logsData.result) {
        try {
          const parsedLog = contractInterface.parseLog({
            topics: log.topics,
            data: log.data
          });

          if (parsedLog && parsedLog.name === "Swap") {
            const [sender, recipient, amount0, amount1, sqrtPriceX96, liquidity, tick] = parsedLog.args;
            
            // Classify trade type based on amount0 (USDC) sign
            const amount0BigInt = BigInt(amount0.toString());
            const amount1BigInt = BigInt(amount1.toString());
            const tradeType = amount0BigInt < 0 ? "SELL" : "BUY";
            
            // Calculate amounts (assuming 6 decimals for USDC, 18 for ETH)
            const usdcAmount = Math.abs(Number(amount0BigInt)) / 1000000; // 6 decimals
            const ethAmount = Math.abs(Number(amount1BigInt)) / 1000000000000000000; // 18 decimals
            
            // Calculate price
            const price = ethAmount > 0 ? usdcAmount / ethAmount : 0;

            const swapEvent = {
              poolAddress: address,
              transactionHash: log.transactionHash,
              blockNumber: parseInt(log.blockNumber, 16),
              logIndex: parseInt(log.logIndex, 16),
              sender: sender.toString(),
              recipient: recipient.toString(),
              amount0: amount0.toString(),
              amount1: amount1.toString(),
              sqrtPriceX96: sqrtPriceX96.toString(),
              liquidity: liquidity.toString(),
              tick: Number(tick),
              tradeType,
              ethAmount: ethAmount.toString(),
              usdcAmount: usdcAmount.toString(),
              price: price.toString(),
              timestamp: new Date(parseInt(log.timeStamp, 16) * 1000),
              gasUsed: parseInt(log.gasUsed, 16),
            };

            const validatedEvent = insertSwapEventSchema.parse(swapEvent);
            const savedEvent = await storage.createSwapEvent(validatedEvent);
            decodedEvents.push(savedEvent);
          }
        } catch (decodeError) {
          console.error("Error decoding log:", decodeError);
          continue;
        }
      }

      // Update pool statistics
      await updatePoolStatistics(address, decodedEvents);

      res.json({ 
        message: `Successfully processed ${decodedEvents.length} swap events`,
        events: decodedEvents 
      });
    } catch (error) {
      console.error("Error fetching and processing swaps:", error);
      res.status(500).json({ error: "Failed to fetch and process swap events" });
    }
  });

  // Get recent swap events across all pools
  app.get("/api/swaps/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const events = await storage.getSwapEvents(undefined, limit, 0);
      res.json(events);
    } catch (error) {
      console.error("Error fetching recent swaps:", error);
      res.status(500).json({ error: "Failed to fetch recent swap events" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function updatePoolStatistics(poolAddress: string, events: any[]) {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    // Filter events from last 24 hours
    const recentEvents = events.filter(event => new Date(event.timestamp) > oneDayAgo);
    
    // Calculate statistics
    let totalVolume = 0;
    let buyVolume = 0;
    let sellVolume = 0;
    let largeVolume = 0;
    let mediumVolume = 0;
    let smallVolume = 0;
    let currentPrice = 0;
    
    for (const event of recentEvents) {
      const usdcAmount = parseFloat(event.usdcAmount);
      const ethAmount = parseFloat(event.ethAmount);
      
      totalVolume += usdcAmount;
      
      if (event.tradeType === "BUY") {
        buyVolume += usdcAmount;
      } else {
        sellVolume += usdcAmount;
      }
      
      // Volume categories
      if (ethAmount > 10) {
        largeVolume += usdcAmount;
      } else if (ethAmount >= 1) {
        mediumVolume += usdcAmount;
      } else {
        smallVolume += usdcAmount;
      }
      
      // Use latest price
      if (parseFloat(event.price) > 0) {
        currentPrice = parseFloat(event.price);
      }
    }
    
    const totalTradingVolume = buyVolume + sellVolume;
    const buyPressure = totalTradingVolume > 0 ? Math.round((buyVolume / totalTradingVolume) * 100) : 50;
    const sellPressure = 100 - buyPressure;
    
    const stats = {
      poolAddress,
      totalVolume: totalVolume.toString(),
      dailyTrades: recentEvents.length,
      currentPrice: currentPrice.toString(),
      buyPressure,
      sellPressure,
      largeVolume: largeVolume.toString(),
      mediumVolume: mediumVolume.toString(),
      smallVolume: smallVolume.toString(),
      lastUpdated: now,
    };
    
    const existingStats = await storage.getPoolStats(poolAddress);
    if (existingStats) {
      await storage.updatePoolStats(poolAddress, stats);
    } else {
      await storage.createPoolStats(stats);
    }
  } catch (error) {
    console.error("Error updating pool statistics:", error);
  }
}
