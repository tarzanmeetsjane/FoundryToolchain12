import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, desc, sum, count, and, gte } from "drizzle-orm";
import * as schema from "@shared/schema";
import type { 
  Bot, InsertBot, 
  WalletBalance, InsertWalletBalance,
  LpPosition, InsertLpPosition,
  RevenueEvent, InsertRevenueEvent,
  FundingSource, InsertFundingSource
} from "@shared/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export interface IStorage {
  // Bot Management
  createBot(data: InsertBot): Promise<Bot>;
  getBots(): Promise<Bot[]>;
  getBotById(id: string): Promise<Bot | null>;
  updateBotStatus(id: string, status: string): Promise<void>;
  
  // Wallet Balances
  createWalletBalance(data: InsertWalletBalance): Promise<WalletBalance>;
  getWalletBalances(): Promise<WalletBalance[]>;
  getWalletBalancesByBot(botId: string): Promise<WalletBalance[]>;
  updateWalletBalance(address: string, ethBalance: string, ethValue: string): Promise<void>;
  
  // LP Positions
  createLpPosition(data: InsertLpPosition): Promise<LpPosition>;
  getLpPositions(): Promise<LpPosition[]>;
  getLpPositionsByBot(botId: string): Promise<LpPosition[]>;
  updateLpPositionValue(id: string, estimatedValue: string): Promise<void>;
  
  // Revenue Events
  createRevenueEvent(data: InsertRevenueEvent): Promise<RevenueEvent>;
  getRevenueEvents(): Promise<RevenueEvent[]>;
  getRevenueEventsByBot(botId: string): Promise<RevenueEvent[]>;
  getRevenueByDateRange(startDate: Date, endDate: Date): Promise<RevenueEvent[]>;
  
  // Funding Sources
  createFundingSource(data: InsertFundingSource): Promise<FundingSource>;
  getFundingSources(): Promise<FundingSource[]>;
  updateFundingSourceValue(id: string, currentValue: string, availableForLiquidation: string): Promise<void>;
  
  // Analytics
  getTotalRevenue(): Promise<number>;
  getDailyRevenueStats(): Promise<{ date: string; revenue: string }[]>;
  getBotPerformanceStats(): Promise<{ botId: string; name: string; totalRevenue: string; eventCount: number }[]>;
  getFundingSummary(): Promise<{ totalValue: number; liquidationValue: number; sourceCount: number }>;
}

export class DrizzleStorage implements IStorage {
  // Bot Management
  async createBot(data: InsertBot): Promise<Bot> {
    const id = `bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const [bot] = await db.insert(schema.bots).values({ ...data, id }).returning();
    return bot;
  }

  async getBots(): Promise<Bot[]> {
    return await db.select().from(schema.bots).orderBy(desc(schema.bots.lastActive));
  }

  async getBotById(id: string): Promise<Bot | null> {
    const [bot] = await db.select().from(schema.bots).where(eq(schema.bots.id, id));
    return bot || null;
  }

  async updateBotStatus(id: string, status: string): Promise<void> {
    await db.update(schema.bots)
      .set({ status, lastActive: new Date() })
      .where(eq(schema.bots.id, id));
  }

  // Wallet Balances
  async createWalletBalance(data: InsertWalletBalance): Promise<WalletBalance> {
    const id = `wallet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const [balance] = await db.insert(schema.walletBalances).values({ ...data, id }).returning();
    return balance;
  }

  async getWalletBalances(): Promise<WalletBalance[]> {
    return await db.select().from(schema.walletBalances).orderBy(desc(schema.walletBalances.lastChecked));
  }

  async getWalletBalancesByBot(botId: string): Promise<WalletBalance[]> {
    return await db.select().from(schema.walletBalances)
      .where(eq(schema.walletBalances.botId, botId));
  }

  async updateWalletBalance(address: string, ethBalance: string, ethValue: string): Promise<void> {
    await db.update(schema.walletBalances)
      .set({ 
        ethBalance, 
        ethValue,
        lastChecked: new Date()
      })
      .where(eq(schema.walletBalances.walletAddress, address));
  }

  // LP Positions
  async createLpPosition(data: InsertLpPosition): Promise<LpPosition> {
    const id = `lp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const [position] = await db.insert(schema.lpPositions).values({ ...data, id }).returning();
    return position;
  }

  async getLpPositions(): Promise<LpPosition[]> {
    return await db.select().from(schema.lpPositions)
      .where(eq(schema.lpPositions.isActive, true))
      .orderBy(desc(schema.lpPositions.estimatedValue));
  }

  async getLpPositionsByBot(botId: string): Promise<LpPosition[]> {
    return await db.select().from(schema.lpPositions)
      .where(and(
        eq(schema.lpPositions.botId, botId),
        eq(schema.lpPositions.isActive, true)
      ));
  }

  async updateLpPositionValue(id: string, estimatedValue: string): Promise<void> {
    await db.update(schema.lpPositions)
      .set({ 
        estimatedValue,
        lastUpdated: new Date()
      })
      .where(eq(schema.lpPositions.id, id));
  }

  // Revenue Events
  async createRevenueEvent(data: InsertRevenueEvent): Promise<RevenueEvent> {
    const id = `rev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const [event] = await db.insert(schema.revenueEvents).values({ ...data, id }).returning();
    return event;
  }

  async getRevenueEvents(): Promise<RevenueEvent[]> {
    return await db.select().from(schema.revenueEvents)
      .orderBy(desc(schema.revenueEvents.timestamp));
  }

  async getRevenueEventsByBot(botId: string): Promise<RevenueEvent[]> {
    return await db.select().from(schema.revenueEvents)
      .where(eq(schema.revenueEvents.botId, botId))
      .orderBy(desc(schema.revenueEvents.timestamp));
  }

  async getRevenueByDateRange(startDate: Date, endDate: Date): Promise<RevenueEvent[]> {
    return await db.select().from(schema.revenueEvents)
      .where(and(
        gte(schema.revenueEvents.timestamp, startDate),
        gte(endDate, schema.revenueEvents.timestamp)
      ))
      .orderBy(desc(schema.revenueEvents.timestamp));
  }

  // Funding Sources
  async createFundingSource(data: InsertFundingSource): Promise<FundingSource> {
    const id = `fund_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const [source] = await db.insert(schema.fundingSources).values({ ...data, id }).returning();
    return source;
  }

  async getFundingSources(): Promise<FundingSource[]> {
    return await db.select().from(schema.fundingSources)
      .orderBy(desc(schema.fundingSources.liquidationPriority));
  }

  async updateFundingSourceValue(id: string, currentValue: string, availableForLiquidation: string): Promise<void> {
    await db.update(schema.fundingSources)
      .set({
        currentValue,
        availableForLiquidation,
        lastAssessed: new Date()
      })
      .where(eq(schema.fundingSources.id, id));
  }

  // Analytics
  async getTotalRevenue(): Promise<number> {
    const result = await db.select({
      total: sum(schema.revenueEvents.amount)
    }).from(schema.revenueEvents);
    
    return parseFloat(result[0]?.total || "0");
  }

  async getDailyRevenueStats(): Promise<{ date: string; revenue: string }[]> {
    // This would need proper SQL date grouping for production
    const events = await db.select().from(schema.revenueEvents)
      .orderBy(desc(schema.revenueEvents.timestamp));
    
    // Simple grouping by date for now
    const grouped = events.reduce((acc, event) => {
      const date = event.timestamp.toISOString().split('T')[0];
      if (!acc[date]) acc[date] = 0;
      acc[date] += parseFloat(event.amount);
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([date, revenue]) => ({
      date,
      revenue: revenue.toString()
    }));
  }

  async getBotPerformanceStats(): Promise<{ botId: string; name: string; totalRevenue: string; eventCount: number }[]> {
    const bots = await this.getBots();
    const stats = [];

    for (const bot of bots) {
      const events = await this.getRevenueEventsByBot(bot.id);
      const totalRevenue = events.reduce((sum, event) => sum + parseFloat(event.amount), 0);
      
      stats.push({
        botId: bot.id,
        name: bot.name,
        totalRevenue: totalRevenue.toString(),
        eventCount: events.length
      });
    }

    return stats.sort((a, b) => parseFloat(b.totalRevenue) - parseFloat(a.totalRevenue));
  }

  async getFundingSummary(): Promise<{ totalValue: number; liquidationValue: number; sourceCount: number }> {
    const sources = await this.getFundingSources();
    
    return {
      totalValue: sources.reduce((sum, source) => sum + parseFloat(source.currentValue || "0"), 0),
      liquidationValue: sources.reduce((sum, source) => sum + parseFloat(source.availableForLiquidation || "0"), 0),
      sourceCount: sources.length
    };
  }
}

export const storage = new DrizzleStorage();