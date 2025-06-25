import type { Express } from "express";
import { createServer, type Server } from "http";
import { Router } from "express";
import { z } from "zod";
import { storage } from "./storage";
import { insertBotSchema, insertWalletBalanceSchema, insertLpPositionSchema, insertRevenueEventSchema, insertFundingSourceSchema } from "@shared/schema";
import { ethers } from "ethers";
import { DEX_CONFIGS, getExplorerApiUrl, getApiKeyForChain } from "./dex-config";
import { liveData } from './live-data';
import { ethgrLiveData } from './ethgr-live-data';
import { proxyInvestigation } from './proxy-investigation';
import { ethRecovery } from './eth-recovery-service';
import { walletService } from './wallet-service';
import { transactionAnalyzer } from './transaction-analyzer';
import { ethgrTransactionAnalyzer } from './ethgr-transaction-analyzer';
import { etherscanFetcher } from './etherscan-transaction-fetcher';
import { WebSocketServer } from 'ws';

const router = Router();

// Bot Management Routes
router.get("/api/bots", async (req, res) => {
  try {
    const bots = await storage.getBots();
    res.json(bots);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bots" });
  }
});

router.post("/api/bots", async (req, res) => {
  try {
    const validatedData = insertBotSchema.parse(req.body);
    const bot = await storage.createBot(validatedData);
    res.json(bot);
  } catch (error) {
    res.status(400).json({ error: "Invalid bot data" });
  }
});

router.get("/api/bots/:id", async (req, res) => {
  try {
    const bot = await storage.getBotById(req.params.id);
    if (!bot) {
      return res.status(404).json({ error: "Bot not found" });
    }
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bot" });
  }
});

router.patch("/api/bots/:id/status", async (req, res) => {
  try {
    const { status } = z.object({ status: z.string() }).parse(req.body);
    await storage.updateBotStatus(req.params.id, status);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Invalid status update" });
  }
});

// Wallet Balance Routes
router.get("/api/wallet-balances", async (req, res) => {
  try {
    const balances = await storage.getWalletBalances();
    res.json(balances);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wallet balances" });
  }
});

router.post("/api/wallet-balances", async (req, res) => {
  try {
    const validatedData = insertWalletBalanceSchema.parse(req.body);
    const balance = await storage.createWalletBalance(validatedData);
    res.json(balance);
  } catch (error) {
    res.status(400).json({ error: "Invalid wallet balance data" });
  }
});

router.get("/api/bots/:id/wallet-balances", async (req, res) => {
  try {
    const balances = await storage.getWalletBalancesByBot(req.params.id);
    res.json(balances);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bot wallet balances" });
  }
});

// LP Position Routes
router.get("/api/lp-positions", async (req, res) => {
  try {
    const positions = await storage.getLpPositions();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch LP positions" });
  }
});

router.post("/api/lp-positions", async (req, res) => {
  try {
    const validatedData = insertLpPositionSchema.parse(req.body);
    const position = await storage.createLpPosition(validatedData);
    res.json(position);
  } catch (error) {
    res.status(400).json({ error: "Invalid LP position data" });
  }
});

router.get("/api/bots/:id/lp-positions", async (req, res) => {
  try {
    const positions = await storage.getLpPositionsByBot(req.params.id);
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bot LP positions" });
  }
});

// Revenue Event Routes
router.get("/api/revenue-events", async (req, res) => {
  try {
    const events = await storage.getRevenueEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch revenue events" });
  }
});

router.post("/api/revenue-events", async (req, res) => {
  try {
    const validatedData = insertRevenueEventSchema.parse(req.body);
    const event = await storage.createRevenueEvent(validatedData);
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: "Invalid revenue event data" });
  }
});

router.get("/api/bots/:id/revenue-events", async (req, res) => {
  try {
    const events = await storage.getRevenueEventsByBot(req.params.id);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bot revenue events" });
  }
});

// Funding Source Routes
router.get("/api/funding-sources", async (req, res) => {
  try {
    const sources = await storage.getFundingSources();
    res.json(sources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch funding sources" });
  }
});

router.post("/api/funding-sources", async (req, res) => {
  try {
    const validatedData = insertFundingSourceSchema.parse(req.body);
    const source = await storage.createFundingSource(validatedData);
    res.json(source);
  } catch (error) {
    res.status(400).json({ error: "Invalid funding source data" });
  }
});

// Analytics Routes
router.get("/api/analytics/total-revenue", async (req, res) => {
  try {
    const totalRevenue = await storage.getTotalRevenue();
    res.json({ totalRevenue });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total revenue" });
  }
});

router.get("/api/analytics/daily-revenue", async (req, res) => {
  try {
    const dailyStats = await storage.getDailyRevenueStats();
    res.json(dailyStats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch daily revenue stats" });
  }
});

router.get("/api/analytics/bot-performance", async (req, res) => {
  try {
    const performance = await storage.getBotPerformanceStats();
    res.json(performance);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bot performance stats" });
  }
});

router.get("/api/analytics/funding-summary", async (req, res) => {
  try {
    const summary = await storage.getFundingSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch funding summary" });
  }
});

// Initialize with discovered wallet data
router.post("/api/initialize-discovered-data", async (req, res) => {
  try {
    // Create sample bots based on discovered data
    const liquidityBot = await storage.createBot({
      name: "Liquidity Provider Bot",
      type: "liquidity_provider",
      status: "active",
      walletAddress: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      totalRevenue: "0",
      dailyRevenue: "0",
      config: {
        protocols: ["uniswap_v2", "uniswap_v3"],
        pairs: ["ETH/USDC", "DAI/ETH"],
        minLiquidity: "1000"
      }
    });

    const arbitrageBot = await storage.createBot({
      name: "Cross-Chain Arbitrage Bot",
      type: "arbitrage", 
      status: "active",
      walletAddress: "0xba618d94903cd30d40b95b982f8ade42db0d7a85",
      totalRevenue: "0",
      dailyRevenue: "0",
      config: {
        chains: ["ethereum", "bsc", "polygon"],
        minProfitThreshold: "10"
      }
    });

    // Create wallet balances for discovered addresses
    await storage.createWalletBalance({
      walletAddress: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      botId: liquidityBot.id,
      ethBalance: "0.008588",
      ethValue: "20.61",
      tokenBalances: {
        "ETHGR": "1990000"
      }
    });

    // Create LP positions from discovered data
    await storage.createLpPosition({
      botId: liquidityBot.id,
      walletAddress: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      tokenAddress: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc",
      protocol: "uniswap_v2",
      pairInfo: "USDC/ETH",
      balance: "0",
      estimatedValue: "0",
      blockchain: "ethereum"
    });

    // Create funding sources
    await storage.createFundingSource({
      name: "Foundation Wallet ETH",
      type: "wallet_balance",
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      currentValue: "20.61",
      availableForLiquidation: "15.00",
      liquidationPriority: 8,
      metadata: {
        description: "Main foundation wallet with confirmed ETH balance",
        estimatedGasCost: "5.61"
      }
    });

    await storage.createFundingSource({
      name: "ETHGR Token Holdings",
      type: "lp_token",
      address: "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308",
      currentValue: "0.00",
      availableForLiquidation: "0.00",
      liquidationPriority: 10,
      metadata: {
        description: "1,990,000 ETHGR tokens ready for market creation",
        tokenCount: "1990000"
      }
    });

    res.json({ 
      success: true, 
      message: "Initialized dashboard with discovered wallet data",
      botsCreated: 2,
      walletsTracked: 1,
      lpPositions: 1,
      fundingSources: 2
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize data" });
  }
});

export default router;