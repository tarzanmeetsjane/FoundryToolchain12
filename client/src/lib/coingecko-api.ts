// CoinGecko API integration for real-time price data
// Documentation: https://www.coingecko.com/en/api/documentation

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
const COINGECKO_PRO_URL = "https://pro-api.coingecko.com/api/v3";

export interface CoinGeckoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface CoinGeckoTokenPrice {
  [contractAddress: string]: {
    usd: number;
    usd_24h_change: number;
    usd_market_cap: number;
    usd_24h_vol: number;
  };
}

export interface CoinGeckoHistoricalData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

class CoinGeckoAPI {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_COINGECKO_API_KEY || '';
    this.baseUrl = this.apiKey ? COINGECKO_PRO_URL : COINGECKO_BASE_URL;
  }

  private async request<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add API key if available
    if (this.apiKey) {
      params.x_cg_pro_api_key = this.apiKey;
    }

    // Add parameters to URL
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
      if (response.status === 401) {
        throw new Error('Invalid CoinGecko API key. Please check your COINGECKO_API_KEY.');
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Consider upgrading to CoinGecko Pro API.');
      }
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getTokenPrices(contractAddresses: string[], vsCurrency: string = 'usd'): Promise<CoinGeckoTokenPrice> {
    const endpoint = '/simple/token_price/ethereum';
    return this.request<CoinGeckoTokenPrice>(endpoint, {
      contract_addresses: contractAddresses.join(','),
      vs_currencies: vsCurrency,
      include_market_cap: true,
      include_24hr_vol: true,
      include_24hr_change: true
    });
  }

  async getCoinPrices(coinIds: string[], vsCurrency: string = 'usd'): Promise<CoinGeckoPrice[]> {
    const endpoint = '/coins/markets';
    return this.request<CoinGeckoPrice[]>(endpoint, {
      ids: coinIds.join(','),
      vs_currency: vsCurrency,
      order: 'market_cap_desc',
      per_page: coinIds.length,
      page: 1,
      sparkline: false,
      price_change_percentage: '24h'
    });
  }

  async getTopCoins(vsCurrency: string = 'usd', limit: number = 100): Promise<CoinGeckoPrice[]> {
    const endpoint = '/coins/markets';
    return this.request<CoinGeckoPrice[]>(endpoint, {
      vs_currency: vsCurrency,
      order: 'market_cap_desc',
      per_page: limit,
      page: 1,
      sparkline: false,
      price_change_percentage: '24h'
    });
  }

  async getCoinDetails(coinId: string): Promise<any> {
    const endpoint = `/coins/${coinId}`;
    return this.request(endpoint, {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false
    });
  }

  async getHistoricalData(coinId: string, days: number = 7, vsCurrency: string = 'usd'): Promise<CoinGeckoHistoricalData> {
    const endpoint = `/coins/${coinId}/market_chart`;
    return this.request<CoinGeckoHistoricalData>(endpoint, {
      vs_currency: vsCurrency,
      days,
      interval: days <= 1 ? 'hourly' : 'daily'
    });
  }

  async searchCoins(query: string): Promise<any> {
    const endpoint = '/search';
    return this.request(endpoint, {
      query
    });
  }

  async getTrendingCoins(): Promise<any> {
    const endpoint = '/search/trending';
    return this.request(endpoint);
  }

  async getGlobalMarketData(): Promise<any> {
    const endpoint = '/global';
    return this.request(endpoint);
  }

  async getExchangeRates(): Promise<any> {
    const endpoint = '/exchange_rates';
    return this.request(endpoint);
  }

  async getCoinsByCategory(category: string): Promise<CoinGeckoPrice[]> {
    const endpoint = '/coins/markets';
    return this.request<CoinGeckoPrice[]>(endpoint, {
      vs_currency: 'usd',
      category,
      order: 'market_cap_desc',
      per_page: 50,
      page: 1,
      sparkline: false
    });
  }

  // Helper method to get price for a single token
  async getSingleTokenPrice(contractAddress: string, vsCurrency: string = 'usd'): Promise<number | null> {
    try {
      const prices = await this.getTokenPrices([contractAddress], vsCurrency);
      const tokenData = prices[contractAddress.toLowerCase()];
      return tokenData?.usd || null;
    } catch (error) {
      console.error('Error fetching token price:', error);
      return null;
    }
  }
}

export const coinGeckoAPI = new CoinGeckoAPI();

// Helper functions
export const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else if (price >= 1) {
    return `$${price.toFixed(4)}`;
  } else {
    return `$${price.toFixed(8)}`;
  }
};

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  } else {
    return `$${marketCap.toFixed(2)}`;
  }
};

export const formatVolume = (volume: number): string => {
  return formatMarketCap(volume);
};

export const formatPercentageChange = (change: number): { value: string; isPositive: boolean } => {
  const isPositive = change >= 0;
  return {
    value: `${isPositive ? '+' : ''}${change.toFixed(2)}%`,
    isPositive
  };
};

// Contract address to CoinGecko ID mapping for popular tokens
export const getTokenCoinGeckoId = (contractAddress: string): string | null => {
  const tokenMap: Record<string, string> = {
    '0xA0b86a33E6441b8435b662c1f8e7b3A8F9C9BF0f': 'usd-coin',
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': 'weth',
    '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'dai',
    '0xdAC17F958D2ee523a2206206994597C13D831ec7': 'tether',
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': 'uniswap',
    '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9': 'aave',
    '0xc00e94Cb662C3520282E6f5717214004A7f26888': 'compound-governance-token'
  };
  return tokenMap[contractAddress.toLowerCase()] || null;
};