import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSwapEventSchema, insertPoolStatsSchema, insertDexPlatformSchema } from "@shared/schema";
import { ethers } from "ethers";
import { DEX_CONFIGS, getExplorerApiUrl, getApiKeyForChain } from "./dex-config";

// Moralis Web3 API configuration
const MORALIS_BASE_URL = "https://deep-index.moralis.io/api/v2.2";
const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

// CoinGecko API configuration
const COINGECKO_BASE_URL = process.env.COINGECKO_API_KEY 
  ? "https://pro-api.coingecko.com/api/v3"
  : "https://api.coingecko.com/api/v3";
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

// Default ETH/USDC pool address on Uniswap
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
  
  // Initialize DEX platforms in database
  app.post("/api/dex/initialize", async (req, res) => {
    try {
      const initializedPlatforms = [];
      
      for (const config of DEX_CONFIGS) {
        const existing = await storage.getDexPlatform(config.name, config.chainId);
        if (!existing) {
          const platform = await storage.createDexPlatform(config);
          initializedPlatforms.push(platform);
        }
      }
      
      res.json({ 
        message: `Initialized ${initializedPlatforms.length} DEX platforms`,
        platforms: initializedPlatforms 
      });
    } catch (error) {
      console.error("Error initializing DEX platforms:", error);
      res.status(500).json({ error: "Failed to initialize DEX platforms" });
    }
  });

  // Get all supported DEX platforms
  app.get("/api/dex/platforms", async (req, res) => {
    try {
      const chainId = req.query.chainId ? parseInt(req.query.chainId as string) : undefined;
      const platforms = await storage.getDexPlatforms(chainId);
      res.json(platforms);
    } catch (error) {
      console.error("Error fetching DEX platforms:", error);
      res.status(500).json({ error: "Failed to fetch DEX platforms" });
    }
  });

  // Get pool statistics
  app.get("/api/pools/:address/stats", async (req, res) => {
    try {
      const { address } = req.params;
      const dexPlatform = req.query.dex as string || "uniswap";
      const chainId = parseInt(req.query.chainId as string) || 1;
      
      let stats = await storage.getPoolStats(address, dexPlatform);
      
      if (!stats) {
        // Initialize default stats
        const defaultStats = {
          poolAddress: address,
          dexPlatform,
          chainId,
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
      const dexPlatform = req.query.dex as string;
      const chainId = req.query.chainId ? parseInt(req.query.chainId as string) : undefined;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const events = await storage.getSwapEvents(address, dexPlatform, chainId, limit, offset);
      res.json(events);
    } catch (error) {
      console.error("Error fetching swap events:", error);
      res.status(500).json({ error: "Failed to fetch swap events" });
    }
  });

  // Fetch and decode swap events from multiple DEX platforms
  app.post("/api/pools/:address/fetch-swaps", async (req, res) => {
    try {
      const { address } = req.params;
      const { fromBlock, toBlock, dexPlatform = "uniswap", chainId = 1 } = req.body;

      if (!fromBlock || !toBlock) {
        return res.status(400).json({ error: "fromBlock and toBlock are required" });
      }

      // Get DEX platform configuration
      const platform = await storage.getDexPlatform(dexPlatform, chainId);
      if (!platform) {
        return res.status(400).json({ error: `Unsupported DEX platform: ${dexPlatform} on chain ${chainId}` });
      }

      // Get API configuration for the chain
      const apiUrl = getExplorerApiUrl(chainId);
      const apiKey = getApiKeyForChain(chainId);

      // Fetch logs from blockchain explorer
      const logsUrl = new URL(apiUrl);
      logsUrl.searchParams.append("chainid", chainId.toString());
      logsUrl.searchParams.append("module", "logs");
      logsUrl.searchParams.append("action", "getLogs");
      logsUrl.searchParams.append("address", address);
      logsUrl.searchParams.append("fromBlock", fromBlock.toString());
      logsUrl.searchParams.append("toBlock", toBlock.toString());
      logsUrl.searchParams.append("topic0", platform.swapEventTopic);
      logsUrl.searchParams.append("page", "1");
      logsUrl.searchParams.append("offset", "1000");
      logsUrl.searchParams.append("apikey", apiKey);

      console.log(`Fetching logs from ${platform.displayName} on ${platform.chainName}:`, logsUrl.toString());
      
      const logsResponse = await fetch(logsUrl.toString());
      const logsData = await logsResponse.json();

      if (logsData.status !== "1") {
        return res.status(400).json({ error: logsData.message || `Failed to fetch logs from ${platform.chainName} explorer` });
      }

      // Fetch contract ABI
      const abiUrl = new URL(apiUrl);
      abiUrl.searchParams.append("chainid", chainId.toString());
      abiUrl.searchParams.append("module", "contract");
      abiUrl.searchParams.append("action", "getabi");
      abiUrl.searchParams.append("address", address);
      abiUrl.searchParams.append("apikey", apiKey);

      const abiResponse = await fetch(abiUrl.toString());
      const abiData = await abiResponse.json();

      let abi;
      if (abiData.status === "1" && abiData.result) {
        try {
          abi = JSON.parse(abiData.result);
        } catch (error) {
          // If parsing fails, use standard Uniswap V3 pool ABI
          abi = [
            {
              "anonymous": false,
              "inputs": [
                {"indexed": true, "internalType": "address", "name": "sender", "type": "address"},
                {"indexed": true, "internalType": "address", "name": "recipient", "type": "address"},
                {"indexed": false, "internalType": "int256", "name": "amount0", "type": "int256"},
                {"indexed": false, "internalType": "int256", "name": "amount1", "type": "int256"},
                {"indexed": false, "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160"},
                {"indexed": false, "internalType": "uint128", "name": "liquidity", "type": "uint128"},
                {"indexed": false, "internalType": "int24", "name": "tick", "type": "int24"}
              ],
              "name": "Swap",
              "type": "event"
            }
          ];
        }
      } else {
        // Use standard Uniswap V3 pool ABI as fallback
        abi = [
          {
            "anonymous": false,
            "inputs": [
              {"indexed": true, "internalType": "address", "name": "sender", "type": "address"},
              {"indexed": true, "internalType": "address", "name": "recipient", "type": "address"},
              {"indexed": false, "internalType": "int256", "name": "amount0", "type": "int256"},
              {"indexed": false, "internalType": "int256", "name": "amount1", "type": "int256"},
              {"indexed": false, "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160"},
              {"indexed": false, "internalType": "uint128", "name": "liquidity", "type": "uint128"},
              {"indexed": false, "internalType": "int24", "name": "tick", "type": "int24"}
            ],
            "name": "Swap",
            "type": "event"
          }
        ];
      }

      // Parse ABI and decode logs
      const contractInterface = new ethers.Interface(abi);
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
              dexPlatform,
              chainId,
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
      await updatePoolStatistics(address, dexPlatform, decodedEvents);

      res.json({ 
        message: `Successfully processed ${decodedEvents.length} swap events from ${platform.displayName}`,
        events: decodedEvents,
        platform: platform.displayName,
        chain: platform.chainName
      });
    } catch (error) {
      console.error("Error fetching and processing swaps:", error);
      res.status(500).json({ error: "Failed to fetch and process swap events" });
    }
  });

  // Get recent swap events across all pools and platforms
  app.get("/api/swaps/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const dexPlatform = req.query.dex as string;
      const chainId = req.query.chainId ? parseInt(req.query.chainId as string) : undefined;
      
      const events = await storage.getSwapEvents(undefined, dexPlatform, chainId, limit, 0);
      res.json(events);
    } catch (error) {
      console.error("Error fetching recent swaps:", error);
      res.status(500).json({ error: "Failed to fetch recent swap events" });
    }
  });

  const httpServer = createServer(app);
  // Wallet Portfolio API endpoint using Moralis and CoinGecko
  app.get("/api/wallet/:address/portfolio", async (req, res) => {
    try {
      const { address } = req.params;
      const chainId = parseInt(req.query.chainId as string) || 1;
      const moralisChain = getMoralisChain(chainId);

      // Get token balances from Moralis
      const tokenBalances = await makeMoralisRequest(`/${address}/erc20`, {
        chain: moralisChain,
        exclude_spam: true,
        exclude_unverified_contracts: false
      });

      // Get native balance from Moralis
      const walletBalance = await makeMoralisRequest(`/${address}/balance`, {
        chain: moralisChain
      });

      // Filter verified tokens with positive balances
      const verifiedTokens = tokenBalances.filter(
        (token: any) => !token.possible_spam && token.verified_contract && parseFloat(token.balance_formatted) > 0
      );

      if (verifiedTokens.length === 0) {
        return res.json({
          address,
          totalValueUSD: walletBalance.balance_formatted || "0",
          tokenCount: 0,
          nativeBalance: walletBalance.balance_formatted || "0",
          nativeValueUSD: "0",
          tokens: [],
          lastUpdated: new Date().toISOString()
        });
      }

      // Get contract addresses for CoinGecko price lookup
      const contractAddresses = verifiedTokens.map((token: any) => token.token_address);

      // Get prices from CoinGecko
      let tokenPrices: any = {};
      try {
        tokenPrices = await makeCoinGeckoRequest('/simple/token_price/ethereum', {
          contract_addresses: contractAddresses.join(','),
          vs_currencies: 'usd',
          include_market_cap: true,
          include_24hr_vol: true,
          include_24hr_change: true
        });
      } catch (priceError) {
        console.warn('CoinGecko price fetch failed:', priceError);
      }

      // Calculate total portfolio value
      let totalValueUSD = parseFloat(walletBalance.usd_value || '0');

      // Transform tokens with price data
      const transformedTokens = verifiedTokens.map((token: any) => {
        const priceData = tokenPrices[token.token_address.toLowerCase()];
        const priceUSD = priceData?.usd || token.usd_price || 0;
        const valueUSD = priceUSD * parseFloat(token.balance_formatted);
        totalValueUSD += valueUSD;

        return {
          contractAddress: token.token_address,
          symbol: token.symbol,
          name: token.name,
          decimals: token.decimals,
          balance: token.balance,
          balanceFormatted: token.balance_formatted,
          priceUSD: priceUSD.toString(),
          valueUSD: valueUSD.toString(),
          logo: token.logo || token.thumbnail,
          verified: token.verified_contract
        };
      });

      // Sort by value descending
      transformedTokens.sort((a: any, b: any) => parseFloat(b.valueUSD) - parseFloat(a.valueUSD));

      const portfolio = {
        address,
        totalValueUSD: totalValueUSD.toString(),
        tokenCount: transformedTokens.length,
        nativeBalance: walletBalance.balance_formatted || "0",
        nativeValueUSD: walletBalance.usd_value || "0",
        tokens: transformedTokens,
        lastUpdated: new Date().toISOString()
      };

      res.json(portfolio);
    } catch (error: any) {
      console.error("Wallet portfolio API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch wallet portfolio", 
        details: error.message 
      });
    }
  });

  // Token price lookup endpoint using CoinGecko
  app.get("/api/tokens/prices", async (req, res) => {
    try {
      const { contracts, chain = '1' } = req.query;
      
      if (!contracts) {
        return res.status(400).json({ error: "Contract addresses required" });
      }

      const contractList = (contracts as string).split(',');
      
      const prices = await makeCoinGeckoRequest('/simple/token_price/ethereum', {
        contract_addresses: contractList.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true
      });

      res.json(prices);
    } catch (error: any) {
      console.error("Token price API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch token prices", 
        details: error.message 
      });
    }
  });

  // Wallet transactions endpoint using Moralis
  app.get("/api/wallet/:address/transactions", async (req, res) => {
    try {
      const { address } = req.params;
      const chainId = parseInt(req.query.chainId as string) || 1;
      const limit = parseInt(req.query.limit as string) || 100;
      const moralisChain = getMoralisChain(chainId);

      const transactions = await makeMoralisRequest(`/${address}`, {
        chain: moralisChain,
        limit,
        order: 'DESC'
      });

      res.json(transactions);
    } catch (error: any) {
      console.error("Wallet transactions API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch wallet transactions", 
        details: error.message 
      });
    }
  });

  // Alerts management endpoints
  app.get("/api/alerts", async (req, res) => {
    try {
      // Get user alerts from database (implement based on authentication)
      res.json({
        alerts: [],
        recentTriggers: []
      });
    } catch (error: any) {
      console.error("Alerts API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch alerts", 
        details: error.message 
      });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const alertData = req.body;
      // Save alert to database and set up monitoring
      res.json({ success: true, alertId: Date.now().toString() });
    } catch (error: any) {
      console.error("Create alert API error:", error);
      res.status(500).json({ 
        error: "Failed to create alert", 
        details: error.message 
      });
    }
  });

  // Real-time market data endpoint using CoinGecko
  app.get("/api/market/trending", async (req, res) => {
    try {
      const trending = await makeCoinGeckoRequest('/search/trending');
      res.json(trending);
    } catch (error: any) {
      console.error("Trending API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch trending data", 
        details: error.message 
      });
    }
  });

  // Top coins endpoint
  app.get("/api/market/coins", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const vsCurrency = (req.query.vs_currency as string) || 'usd';
      
      const coins = await makeCoinGeckoRequest('/coins/markets', {
        vs_currency: vsCurrency,
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
      });

      res.json(coins);
    } catch (error: any) {
      console.error("Market coins API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch market data", 
        details: error.message 
      });
    }
  });

  // V3/V4 Uniswap positions endpoint using Moralis
  app.get("/api/positions/v3/:address", async (req, res) => {
    try {
      const { address } = req.params;
      const version = req.query.version as string || 'v3';
      const chainId = parseInt(req.query.chainId as string) || 1;
      const moralisChain = getMoralisChain(chainId);

      // Get NFT positions from Moralis (Uniswap V3 positions are NFTs)
      const nfts = await makeMoralisRequest(`/${address}/nft`, {
        chain: moralisChain,
        format: 'decimal',
        token_addresses: ['0xC36442b4A4522E871399CD717aBDD847Ab11FE88'], // Uniswap V3 Position Manager
        media_items: false
      });

      // Transform NFT data to position structure
      const positions = nfts.result?.map((nft: any) => {
        // In production, decode the NFT metadata to get position details
        return {
          tokenId: nft.token_id,
          poolAddress: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640", // Would be decoded from metadata
          token0: { symbol: "USDC", address: "0xA0b86a33E6441b8435b662c1f8e7b3A8F9C9BF0f", amount: "0", decimals: 6 },
          token1: { symbol: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", amount: "0", decimals: 18 },
          tickLower: 0,
          tickUpper: 0,
          currentTick: 0,
          priceRange: { lower: "0", upper: "0", current: "0" },
          liquidity: "0",
          feeGrowth: { token0: "0", token1: "0" },
          fees: { token0: "0", token1: "0", totalValue: "$0" },
          inRange: false,
          health: 'out-of-range' as const
        };
      }) || [];

      res.json(positions);
    } catch (error: any) {
      console.error("V3 positions API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch V3 positions", 
        details: error.message 
      });
    }
  });

  // DEX pool analytics endpoint
  app.get("/api/pools/:address/analytics", async (req, res) => {
    try {
      const { address } = req.params;
      const chainId = parseInt(req.query.chainId as string) || 1;
      
      // Get pool data from database
      const poolStats = await storage.getPoolStats(address);
      
      // Get real-time price data from CoinGecko
      const priceData = await makeCoinGeckoRequest('/simple/price', {
        ids: 'ethereum',
        vs_currencies: 'usd',
        include_24hr_change: true
      });

      const analytics = {
        poolAddress: address,
        chainId,
        stats: poolStats,
        priceData,
        lastUpdated: new Date().toISOString()
      };

      res.json(analytics);
    } catch (error: any) {
      console.error("Pool analytics API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch pool analytics", 
        details: error.message 
      });
    }
  });

  // Address information endpoint
  app.get("/api/address/:address/info", async (req, res) => {
    try {
      const { address } = req.params;
      const chainId = parseInt(req.query.chainId as string) || 1;
      const moralisChain = getMoralisChain(chainId);

      // Check if address is a contract using Moralis
      const contractInfo = await makeMoralisRequest(`/${address}`, {
        chain: moralisChain
      });

      res.json({
        address,
        type: contractInfo.is_contract ? 'contract' : 'wallet',
        name: contractInfo.name || null,
        symbol: contractInfo.symbol || null,
        chainId
      });
    } catch (error: any) {
      console.error("Address info API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch address info", 
        details: error.message 
      });
    }
  });

  // Multi-chain token analysis endpoint
  app.get("/api/analyze/:address", async (req, res) => {
    try {
      const { address } = req.params;
      const chainId = parseInt(req.query.chainId as string) || 1;
      const moralisChain = getMoralisChain(chainId);

      // Get comprehensive address analysis
      const [tokenBalances, nativeBalance, contractInfo] = await Promise.allSettled([
        makeMoralisRequest(`/${address}/erc20`, { chain: moralisChain }),
        makeMoralisRequest(`/${address}/balance`, { chain: moralisChain }),
        makeMoralisRequest(`/${address}`, { chain: moralisChain })
      ]);

      const analysis = {
        address,
        chainId,
        tokens: tokenBalances.status === 'fulfilled' ? tokenBalances.value : [],
        balance: nativeBalance.status === 'fulfilled' ? nativeBalance.value : { balance: "0" },
        contractInfo: contractInfo.status === 'fulfilled' ? contractInfo.value : null,
        timestamp: new Date().toISOString()
      };

      res.json(analysis);
    } catch (error: any) {
      console.error("Address analysis API error:", error);
      res.status(500).json({ 
        error: "Failed to analyze address", 
        details: error.message 
      });
    }
  });

  return httpServer;
}

async function updatePoolStatistics(poolAddress: string, dexPlatform: string, events: any[]) {
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
      dexPlatform,
      chainId: events[0]?.chainId || 1,
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
    
    const existingStats = await storage.getPoolStats(poolAddress, dexPlatform);
    if (existingStats) {
      await storage.updatePoolStats(poolAddress, dexPlatform, stats);
    } else {
      await storage.createPoolStats(stats);
    }
  } catch (error) {
    console.error("Error updating pool statistics:", error);
  }
}

// Helper function for Moralis API requests
async function makeMoralisRequest(endpoint: string, params: Record<string, any> = {}) {
  if (!MORALIS_API_KEY) {
    throw new Error('MORALIS_API_KEY not configured');
  }

  const url = new URL(`${MORALIS_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-API-Key': MORALIS_API_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`Moralis API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Helper function for CoinGecko API requests
async function makeCoinGeckoRequest(endpoint: string, params: Record<string, any> = {}) {
  if (COINGECKO_API_KEY) {
    params.x_cg_pro_api_key = COINGECKO_API_KEY;
  }

  const url = new URL(`${COINGECKO_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'DEX-Analytics-Platform/1.0'
    }
  });

  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Chain mapping for Moralis
function getMoralisChain(chainId: number): string {
  const chainMap: Record<number, string> = {
    1: 'eth',
    56: 'bsc',
    137: 'polygon',
    43114: 'avalanche',
    250: 'fantom',
    42161: 'arbitrum',
    10: 'optimism',
    8453: 'base'
  };
  return chainMap[chainId] || 'eth';
}
