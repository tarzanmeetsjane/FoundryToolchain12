import { pgTable, text, integer, decimal, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Bot Revenue Dashboard Tables
export const bots = pgTable("bots", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'liquidity_provider', 'arbitrage', 'market_maker'
  status: text("status").notNull(), // 'active', 'inactive', 'error'
  walletAddress: text("wallet_address").notNull(),
  totalRevenue: decimal("total_revenue", { precision: 18, scale: 6 }).default("0"),
  dailyRevenue: decimal("daily_revenue", { precision: 18, scale: 6 }).default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastActive: timestamp("last_active").defaultNow().notNull(),
  config: jsonb("config").$type<Record<string, any>>(),
});

export const walletBalances = pgTable("wallet_balances", {
  id: text("id").primaryKey(),
  walletAddress: text("wallet_address").notNull(),
  botId: text("bot_id").references(() => bots.id),
  ethBalance: decimal("eth_balance", { precision: 18, scale: 6 }).default("0"),
  ethValue: decimal("eth_value", { precision: 10, scale: 2 }).default("0"),
  tokenBalances: jsonb("token_balances").$type<Record<string, string>>(),
  lastChecked: timestamp("last_checked").defaultNow().notNull(),
});

export const lpPositions = pgTable("lp_positions", {
  id: text("id").primaryKey(),
  botId: text("bot_id").references(() => bots.id),
  walletAddress: text("wallet_address").notNull(),
  tokenAddress: text("token_address").notNull(),
  protocol: text("protocol").notNull(), // 'uniswap_v2', 'uniswap_v3', 'pancakeswap'
  pairInfo: text("pair_info").notNull(), // 'ETH/USDC', 'DAI/ETH'
  balance: decimal("balance", { precision: 18, scale: 6 }).default("0"),
  estimatedValue: decimal("estimated_value", { precision: 10, scale: 2 }).default("0"),
  blockchain: text("blockchain").notNull().default("ethereum"),
  isActive: boolean("is_active").default(true),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const revenueEvents = pgTable("revenue_events", {
  id: text("id").primaryKey(),
  botId: text("bot_id").references(() => bots.id),
  transactionHash: text("transaction_hash"),
  amount: decimal("amount", { precision: 18, scale: 6 }).notNull(),
  currency: text("currency").notNull(), // 'ETH', 'USDC', etc.
  eventType: text("event_type").notNull(), // 'trading_fee', 'arbitrage', 'liquidation'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  gasUsed: decimal("gas_used", { precision: 18, scale: 0 }),
  gasPrice: decimal("gas_price", { precision: 18, scale: 0 }),
});

export const fundingSources = pgTable("funding_sources", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'wallet_balance', 'lp_token', 'yield_farming'
  address: text("address").notNull(),
  currentValue: decimal("current_value", { precision: 10, scale: 2 }).default("0"),
  availableForLiquidation: decimal("available_for_liquidation", { precision: 10, scale: 2 }).default("0"),
  liquidationPriority: integer("liquidation_priority").default(5), // 1-10 scale
  lastAssessed: timestamp("last_assessed").defaultNow().notNull(),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
});

// Insert schemas
export const insertBotSchema = createInsertSchema(bots).omit({
  id: true,
  createdAt: true,
});

export const insertWalletBalanceSchema = createInsertSchema(walletBalances).omit({
  id: true,
  lastChecked: true,
});

export const insertLpPositionSchema = createInsertSchema(lpPositions).omit({
  id: true,
  lastUpdated: true,
});

export const insertRevenueEventSchema = createInsertSchema(revenueEvents).omit({
  id: true,
  timestamp: true,
});

export const insertFundingSourceSchema = createInsertSchema(fundingSources).omit({
  id: true,
  lastAssessed: true,
});

// Types
export type Bot = typeof bots.$inferSelect;
export type InsertBot = z.infer<typeof insertBotSchema>;

export type WalletBalance = typeof walletBalances.$inferSelect;
export type InsertWalletBalance = z.infer<typeof insertWalletBalanceSchema>;

export type LpPosition = typeof lpPositions.$inferSelect;
export type InsertLpPosition = z.infer<typeof insertLpPositionSchema>;

export type RevenueEvent = typeof revenueEvents.$inferSelect;
export type InsertRevenueEvent = z.infer<typeof insertRevenueEventSchema>;

export type FundingSource = typeof fundingSources.$inferSelect;
export type InsertFundingSource = z.infer<typeof insertFundingSourceSchema>;