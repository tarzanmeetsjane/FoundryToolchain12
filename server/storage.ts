import { users, swapEvents, poolStats, type User, type InsertUser, type SwapEvent, type InsertSwapEvent, type PoolStats, type InsertPoolStats } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private swapEvents: Map<number, SwapEvent>;
  private poolStats: Map<string, PoolStats>;
  private currentUserId: number;
  private currentSwapEventId: number;
  private currentPoolStatsId: number;

  constructor() {
    this.users = new Map();
    this.swapEvents = new Map();
    this.poolStats = new Map();
    this.currentUserId = 1;
    this.currentSwapEventId = 1;
    this.currentPoolStatsId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSwapEvent(event: InsertSwapEvent): Promise<SwapEvent> {
    const id = this.currentSwapEventId++;
    const swapEvent: SwapEvent = { ...event, id };
    this.swapEvents.set(id, swapEvent);
    return swapEvent;
  }

  async getSwapEvents(poolAddress?: string, limit = 50, offset = 0): Promise<SwapEvent[]> {
    let events = Array.from(this.swapEvents.values());
    
    if (poolAddress) {
      events = events.filter(event => event.poolAddress.toLowerCase() === poolAddress.toLowerCase());
    }
    
    // Sort by timestamp descending (newest first)
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return events.slice(offset, offset + limit);
  }

  async getSwapEventsByTimeRange(poolAddress: string, fromBlock: number, toBlock: number): Promise<SwapEvent[]> {
    const events = Array.from(this.swapEvents.values()).filter(
      event => 
        event.poolAddress.toLowerCase() === poolAddress.toLowerCase() &&
        event.blockNumber >= fromBlock &&
        event.blockNumber <= toBlock
    );
    
    return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getPoolStats(poolAddress: string): Promise<PoolStats | undefined> {
    return this.poolStats.get(poolAddress.toLowerCase());
  }

  async updatePoolStats(poolAddress: string, statsUpdate: Partial<InsertPoolStats>): Promise<PoolStats> {
    const existing = this.poolStats.get(poolAddress.toLowerCase());
    if (existing) {
      const updated: PoolStats = { ...existing, ...statsUpdate };
      this.poolStats.set(poolAddress.toLowerCase(), updated);
      return updated;
    }
    throw new Error('Pool stats not found');
  }

  async createPoolStats(stats: InsertPoolStats): Promise<PoolStats> {
    const id = this.currentPoolStatsId++;
    const poolStat: PoolStats = { ...stats, id };
    this.poolStats.set(stats.poolAddress.toLowerCase(), poolStat);
    return poolStat;
  }
}

export const storage = new MemStorage();
