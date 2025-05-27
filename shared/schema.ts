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
});

export const poolStats = pgTable("pool_stats", {
  id: serial("id").primaryKey(),
  poolAddress: text("pool_address").notNull().unique(),
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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SwapEvent = typeof swapEvents.$inferSelect;
export type InsertSwapEvent = z.infer<typeof insertSwapEventSchema>;
export type PoolStats = typeof poolStats.$inferSelect;
export type InsertPoolStats = z.infer<typeof insertPoolStatsSchema>;
