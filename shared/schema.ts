import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const swapEvents = pgTable("swap_events", {
  id: serial("id").primaryKey(),
  poolAddress: text("pool_address").notNull(),
  transactionHash: text("transaction_hash").notNull(),
  blockNumber: integer("block_number").notNull(),
  logIndex: integer("log_index").notNull(),
  sender: text("sender").notNull(),
  recipient: text("recipient").notNull(),
  amount0: text("amount0").notNull(), // Store as string to handle BigInt
  amount1: text("amount1").notNull(), // Store as string to handle BigInt
  sqrtPriceX96: text("sqrt_price_x96").notNull(),
  liquidity: text("liquidity").notNull(),
  tick: integer("tick").notNull(),
  tradeType: text("trade_type").notNull(), // "BUY" or "SELL"
  ethAmount: text("eth_amount").notNull(),
  usdcAmount: text("usdc_amount").notNull(),
  price: text("price").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  gasUsed: integer("gas_used"),
  dexPlatform: text("dex_platform").notNull().default("uniswap"), // "uniswap", "sushiswap", "pancakeswap", "1inch"
  chainId: integer("chain_id").notNull().default(1), // 1 for Ethereum, 56 for BSC, etc.
});

export const poolStats = pgTable("pool_stats", {
  id: serial("id").primaryKey(),
  poolAddress: text("pool_address").notNull(),
  dexPlatform: text("dex_platform").notNull().default("uniswap"),
  chainId: integer("chain_id").notNull().default(1),
  totalVolume: text("total_volume").notNull(),
  dailyTrades: integer("daily_trades").notNull(),
  currentPrice: text("current_price").notNull(),
  buyPressure: integer("buy_pressure").notNull(), // Percentage
  sellPressure: integer("sell_pressure").notNull(), // Percentage
  largeVolume: text("large_volume").notNull(),
  mediumVolume: text("medium_volume").notNull(),
  smallVolume: text("small_volume").notNull(),
  lastUpdated: timestamp("last_updated").notNull(),
});

// DEX Platforms table for managing supported platforms
export const dexPlatforms = pgTable("dex_platforms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // "uniswap", "sushiswap", "pancakeswap", "1inch"
  displayName: text("display_name").notNull(), // "Uniswap V3", "SushiSwap", etc.
  chainId: integer("chain_id").notNull(),
  chainName: text("chain_name").notNull(), // "Ethereum", "BSC", "Polygon"
  swapEventTopic: text("swap_event_topic").notNull(),
  routerAddress: text("router_address"),
  factoryAddress: text("factory_address"),
  isActive: boolean("is_active").notNull().default(true),
  apiEndpoint: text("api_endpoint"), // For platforms with their own APIs
  explorerUrl: text("explorer_url").notNull(), // etherscan.io, bscscan.com, etc.
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSwapEventSchema = createInsertSchema(swapEvents).omit({
  id: true,
});

export const insertPoolStatsSchema = createInsertSchema(poolStats).omit({
  id: true,
});

export const insertDexPlatformSchema = createInsertSchema(dexPlatforms).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SwapEvent = typeof swapEvents.$inferSelect;
export type InsertSwapEvent = z.infer<typeof insertSwapEventSchema>;
export type PoolStats = typeof poolStats.$inferSelect;
export type InsertPoolStats = z.infer<typeof insertPoolStatsSchema>;
export type DexPlatform = typeof dexPlatforms.$inferSelect;
export type InsertDexPlatform = z.infer<typeof insertDexPlatformSchema>;
