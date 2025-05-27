import { users, swapEvents, poolStats, type User, type InsertUser, type SwapEvent, type InsertSwapEvent, type PoolStats, type InsertPoolStats } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Swap Events
  createSwapEvent(event: InsertSwapEvent): Promise<SwapEvent>;
  getSwapEvents(poolAddress?: string, limit?: number, offset?: number): Promise<SwapEvent[]>;
  getSwapEventsByTimeRange(poolAddress: string, fromBlock: number, toBlock: number): Promise<SwapEvent[]>;
  
  // Pool Stats
  getPoolStats(poolAddress: string): Promise<PoolStats | undefined>;
  updatePoolStats(poolAddress: string, stats: Partial<InsertPoolStats>): Promise<PoolStats>;
  createPoolStats(stats: InsertPoolStats): Promise<PoolStats>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createSwapEvent(event: InsertSwapEvent): Promise<SwapEvent> {
    const [swapEvent] = await db
      .insert(swapEvents)
      .values(event)
      .returning();
    return swapEvent;
  }

  async getSwapEvents(poolAddress?: string, limit = 50, offset = 0): Promise<SwapEvent[]> {
    let query = db.select().from(swapEvents);
    
    if (poolAddress) {
      query = query.where(eq(swapEvents.poolAddress, poolAddress.toLowerCase()));
    }
    
    const events = await query
      .orderBy(swapEvents.timestamp)
      .limit(limit)
      .offset(offset);
    
    return events;
  }

  async getSwapEventsByTimeRange(poolAddress: string, fromBlock: number, toBlock: number): Promise<SwapEvent[]> {
    const events = await db
      .select()
      .from(swapEvents)
      .where(eq(swapEvents.poolAddress, poolAddress.toLowerCase()));
    
    return events
      .filter(event => event.blockNumber >= fromBlock && event.blockNumber <= toBlock)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getPoolStats(poolAddress: string): Promise<PoolStats | undefined> {
    const [stats] = await db
      .select()
      .from(poolStats)
      .where(eq(poolStats.poolAddress, poolAddress.toLowerCase()));
    return stats || undefined;
  }

  async updatePoolStats(poolAddress: string, statsUpdate: Partial<InsertPoolStats>): Promise<PoolStats> {
    const [updated] = await db
      .update(poolStats)
      .set(statsUpdate)
      .where(eq(poolStats.poolAddress, poolAddress.toLowerCase()))
      .returning();
    
    if (!updated) {
      throw new Error('Pool stats not found');
    }
    
    return updated;
  }

  async createPoolStats(stats: InsertPoolStats): Promise<PoolStats> {
    const [poolStat] = await db
      .insert(poolStats)
      .values(stats)
      .returning();
    return poolStat;
  }
}

export const storage = new DatabaseStorage();
