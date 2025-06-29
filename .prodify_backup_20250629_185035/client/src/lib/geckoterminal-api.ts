// GeckoTerminal API integration for real-time DEX data
const GECKOTERMINAL_BASE_URL = 'https://api.geckoterminal.com/api/v2';

export interface GeckoTerminalPool {
  id: string;
  type: 'pool';
  attributes: {
    name: string;
    address: string;
    base_token_price_usd: string;
    quote_token_price_usd: string;
    base_token_price_native_currency: string;
    quote_token_price_native_currency: string;
    pool_created_at: string;
    reserve_in_usd: string;
    fdv_usd: string;
    market_cap_usd: string;
    price_change_percentage: {
      h1: string;
      h6: string;
      h24: string;
    };
    transactions: {
      h1: {
        buys: number;
        sells: number;
        buyers: number;
        sellers: number;
      };
      h6: {
        buys: number;
        sells: number;
        buyers: number;
        sellers: number;
      };
      h24: {
        buys: number;
        sells: number;
        buyers: number;
        sellers: number;
      };
    };
    volume_usd: {
      h1: string;
      h6: string;
      h24: string;
    };
  };
  relationships: {
    base_token: {
      data: {
        id: string;
        type: 'token';
      };
    };
    quote_token: {
      data: {
        id: string;
        type: 'token';
      };
    };
    dex: {
      data: {
        id: string;
        type: 'dex';
      };
    };
  };
}

export interface GeckoTerminalToken {
  id: string;
  type: 'token';
  attributes: {
    address: string;
    name: string;
    symbol: string;
    image_url: string;
    coingecko_coin_id: string;
    decimals: number;
    total_supply: string;
    price_usd: string;
    fdv_usd: string;
    total_reserve_in_usd: string;
    volume_usd: {
      h24: string;
    };
    market_cap_usd: string;
  };
}

export interface GeckoTerminalResponse<T> {
  data: T;
  included?: any[];
  meta?: {
    page?: {
      size: number;
      number: number;
    };
  };
}

class GeckoTerminalAPI {
  private async makeRequest<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${GECKOTERMINAL_BASE_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`GeckoTerminal API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get trending pools across all networks
  async getTrendingPools(): Promise<GeckoTerminalResponse<GeckoTerminalPool[]>> {
    return this.makeRequest('/networks/trending_pools');
  }

  // Get pools for a specific network
  async getNetworkPools(network: string, page = 1): Promise<GeckoTerminalResponse<GeckoTerminalPool[]>> {
    return this.makeRequest(`/networks/${network}/pools?page=${page}`);
  }

  // Get top pools by market cap for a network
  async getTopPoolsByMarketCap(network: string): Promise<GeckoTerminalResponse<GeckoTerminalPool[]>> {
    return this.makeRequest(`/networks/${network}/pools?sort=market_cap_usd&order=desc`);
  }

  // Get pool information by address
  async getPoolByAddress(network: string, address: string): Promise<GeckoTerminalResponse<GeckoTerminalPool>> {
    return this.makeRequest(`/networks/${network}/pools/${address}`);
  }

  // Get token information
  async getTokenInfo(network: string, address: string): Promise<GeckoTerminalResponse<GeckoTerminalToken>> {
    return this.makeRequest(`/networks/${network}/tokens/${address}`);
  }

  // Get token pools
  async getTokenPools(network: string, address: string): Promise<GeckoTerminalResponse<GeckoTerminalPool[]>> {
    return this.makeRequest(`/networks/${network}/tokens/${address}/pools`);
  }

  // Search pools by token address
  async searchPools(query: string): Promise<GeckoTerminalResponse<GeckoTerminalPool[]>> {
    return this.makeRequest(`/search/pools?query=${encodeURIComponent(query)}`);
  }

  // Get new pools for a network
  async getNewPools(network: string): Promise<GeckoTerminalResponse<GeckoTerminalPool[]>> {
    return this.makeRequest(`/networks/${network}/new_pools`);
  }

  // Get OHLCV data for a pool
  async getPoolOHLCV(network: string, address: string, timeframe = '1h', aggregate = '1', before_timestamp?: number, limit = 100) {
    let endpoint = `/networks/${network}/pools/${address}/ohlcv/${timeframe}?aggregate=${aggregate}&limit=${limit}`;
    if (before_timestamp) {
      endpoint += `&before_timestamp=${before_timestamp}`;
    }
    return this.makeRequest(endpoint);
  }

  // Get network information
  async getNetworks(): Promise<GeckoTerminalResponse<any[]>> {
    return this.makeRequest('/networks');
  }

  // Get DEX information for a network
  async getNetworkDexes(network: string): Promise<GeckoTerminalResponse<any[]>> {
    return this.makeRequest(`/networks/${network}/dexes`);
  }
}

// Network mappings for GeckoTerminal
export const GECKOTERMINAL_NETWORKS = {
  ethereum: 'eth',
  bsc: 'bsc',
  polygon: 'polygon_pos',
  arbitrum: 'arbitrum',
  optimism: 'optimism',
  base: 'base',
  avalanche: 'avax',
  fantom: 'fantom',
  cronos: 'cronos',
  solana: 'solana'
} as const;

export const geckoTerminalAPI = new GeckoTerminalAPI();

// Helper functions
export const formatPoolName = (pool: GeckoTerminalPool, tokens: { base: GeckoTerminalToken; quote: GeckoTerminalToken }) => {
  return `${tokens.base.attributes.symbol}/${tokens.quote.attributes.symbol}`;
};

export const formatPoolPrice = (price: string) => {
  const num = parseFloat(price);
  if (num >= 1) return `$${num.toFixed(4)}`;
  if (num >= 0.0001) return `$${num.toFixed(6)}`;
  return `$${num.toExponential(2)}`;
};

export const formatVolume = (volume: string) => {
  const num = parseFloat(volume);
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
};

export const formatPercentageChange = (change: string) => {
  const num = parseFloat(change);
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
};

export const getPoolHealthStatus = (pool: GeckoTerminalPool): 'healthy' | 'warning' | 'risky' => {
  const volume24h = parseFloat(pool.attributes.volume_usd.h24);
  const reserveUsd = parseFloat(pool.attributes.reserve_in_usd);
  const priceChange24h = parseFloat(pool.attributes.price_change_percentage.h24);
  
  // Health indicators
  const hasGoodVolume = volume24h > 10000; // $10k+ daily volume
  const hasGoodLiquidity = reserveUsd > 50000; // $50k+ liquidity
  const isStablePricing = Math.abs(priceChange24h) < 20; // Less than 20% price change
  
  if (hasGoodVolume && hasGoodLiquidity && isStablePricing) {
    return 'healthy';
  } else if (hasGoodLiquidity || (hasGoodVolume && isStablePricing)) {
    return 'warning';
  } else {
    return 'risky';
  }
};