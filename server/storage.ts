import { users, swapEvents, poolStats, dexPlatforms, type User, type InsertUser, type SwapEvent, type InsertSwapEvent, type PoolStats, type InsertPoolStats, type DexPlatform, type InsertDexPlatform } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Swap Events
  createSwapEvent(event: InsertSwapEvent): Promise<SwapEvent>;
  getSwapEvents(poolAddress?: string, dexPlatform?: string, chainId?: number, limit?: number, offset?: number): Promise<SwapEvent[]>;
  getSwapEventsByTimeRange(poolAddress: string, fromBlock: number, toBlock: number): Promise<SwapEvent[]>;
  
  // Pool Stats
  getPoolStats(poolAddress: string, dexPlatform?: string): Promise<PoolStats | undefined>;
  updatePoolStats(poolAddress: string, dexPlatform: string, stats: Partial<InsertPoolStats>): Promise<PoolStats>;
  createPoolStats(stats: InsertPoolStats): Promise<PoolStats>;
  
  // DEX Platforms
  getDexPlatforms(chainId?: number): Promise<DexPlatform[]>;
  getDexPlatform(name: string, chainId: number): Promise<DexPlatform | undefined>;
  createDexPlatform(platform: InsertDexPlatform): Promise<DexPlatform>;
  updateDexPlatform(id: number, updates: Partial<InsertDexPlatform>): Promise<DexPlatform>;
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

  async getSwapEvents(poolAddress?: string, dexPlatform?: string, chainId?: number, limit = 50, offset = 0): Promise<SwapEvent[]> {
    let query = db.select().from(swapEvents);
    
    const conditions = [];
    if (poolAddress) {
      conditions.push(eq(swapEvents.poolAddress, poolAddress.toLowerCase()));
    }
    if (dexPlatform) {
      conditions.push(eq(swapEvents.dexPlatform, dexPlatform));
    }
    if (chainId) {
      conditions.push(eq(swapEvents.chainId, chainId));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const events = await query
      .orderBy(desc(swapEvents.timestamp))
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

  async getPoolStats(poolAddress: string, dexPlatform?: string): Promise<PoolStats | undefined> {
    let query = db.select().from(poolStats);
    
    const conditions = [eq(poolStats.poolAddress, poolAddress.toLowerCase())];
    if (dexPlatform) {
      conditions.push(eq(poolStats.dexPlatform, dexPlatform));
    }
    
    const [stats] = await query.where(and(...conditions));
    return stats || undefined;
  }

  async updatePoolStats(poolAddress: string, dexPlatform: string, stats: Partial<InsertPoolStats>): Promise<PoolStats> {
    const [updated] = await db
      .update(poolStats)
      .set(stats)
      .where(and(
        eq(poolStats.poolAddress, poolAddress.toLowerCase()),
        eq(poolStats.dexPlatform, dexPlatform)
      ))
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

  // DEX Platform methods
  async getDexPlatforms(chainId?: number): Promise<DexPlatform[]> {
    let query = db.select().from(dexPlatforms).where(eq(dexPlatforms.isActive, true));
    
    if (chainId) {
      query = query.where(and(eq(dexPlatforms.isActive, true), eq(dexPlatforms.chainId, chainId)));
    }
    
    return await query.orderBy(dexPlatforms.displayName);
  }

  async getDexPlatform(name: string, chainId: number): Promise<DexPlatform | undefined> {
    const [platform] = await db
      .select()
      .from(dexPlatforms)
      .where(and(
        eq(dexPlatforms.name, name),
        eq(dexPlatforms.chainId, chainId)
      ));
    return platform || undefined;
  }

  async createDexPlatform(platform: InsertDexPlatform): Promise<DexPlatform> {
    const [newPlatform] = await db
      .insert(dexPlatforms)
      .values(platform)
      .returning();
    return newPlatform;
  }

  async updateDexPlatform(id: number, updates: Partial<InsertDexPlatform>): Promise<DexPlatform> {
    const [updated] = await db
      .update(dexPlatforms)
      .set(updates)
      .where(eq(dexPlatforms.id, id))
      .returning();
    
    if (!updated) {
      throw new Error('DEX platform not found');
    }
    
    return updated;
  }
}

export const storage = new DatabaseStorage();
