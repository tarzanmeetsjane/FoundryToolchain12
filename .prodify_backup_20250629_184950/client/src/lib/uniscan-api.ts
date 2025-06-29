// Uniscan.xyz API integration for token balance and portfolio data
// Documentation: https://docs.uniscan.xyz/

export const UNISCAN_BASE_URL = "https://api.uniscan.xyz/v1";

export interface UniscanTokenBalance {
  contract_address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  balance_formatted: string;
  price_usd?: string;
  value_usd?: string;
  logo?: string;
  verified: boolean;
  contract_type: string;
}

export interface UniscanWalletData {
  address: string;
  total_value_usd: string;
  token_count: number;
  native_balance: string;
  native_value_usd: string;
  tokens: UniscanTokenBalance[];
  last_updated: string;
}

export interface UniscanPriceData {
  symbol: string;
  price_usd: string;
  price_change_24h: string;
  volume_24h: string;
  market_cap: string;
  last_updated: string;
}

export interface UniscanTransactionData {
  hash: string;
  block_number: number;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  gas_price: string;
  gas_used: string;
  status: string;
  token_transfers: Array<{
    contract_address: string;
    symbol: string;
    value: string;
    from: string;
    to: string;
  }>;
}

class UniscanAPI {
  private baseUrl: string;
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.baseUrl = UNISCAN_BASE_URL;
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add API key if available
    if (this.apiKey) {
      params.api_key = this.apiKey;
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
      throw new Error(`Uniscan API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Uniscan API error: ${data.error}`);
    }

    return data;
  }

  async getWalletBalances(walletAddress: string, chainId: number = 1): Promise<UniscanWalletData> {
    const endpoint = '/wallet/balances';
    return this.request<UniscanWalletData>(endpoint, {
      address: walletAddress,
      chain_id: chainId,
      include_prices: true,
      include_metadata: true
    });
  }

  async getTokenPrice(contractAddress: string, chainId: number = 1): Promise<UniscanPriceData> {
    const endpoint = '/token/price';
    return this.request<UniscanPriceData>(endpoint, {
      contract_address: contractAddress,
      chain_id: chainId
    });
  }

  async getTokenBalances(walletAddress: string, tokenAddresses: string[], chainId: number = 1): Promise<UniscanTokenBalance[]> {
    const endpoint = '/wallet/token-balances';
    return this.request<UniscanTokenBalance[]>(endpoint, {
      address: walletAddress,
      tokens: tokenAddresses.join(','),
      chain_id: chainId,
      include_prices: true
    });
  }

  async getWalletTransactions(walletAddress: string, chainId: number = 1, limit: number = 50): Promise<UniscanTransactionData[]> {
    const endpoint = '/wallet/transactions';
    return this.request<UniscanTransactionData[]>(endpoint, {
      address: walletAddress,
      chain_id: chainId,
      limit,
      include_token_transfers: true
    });
  }

  async getPoolData(poolAddress: string, chainId: number = 1) {
    const endpoint = '/pool/info';
    return this.request(endpoint, {
      pool_address: poolAddress,
      chain_id: chainId,
      include_liquidity: true,
      include_volume: true
    });
  }

  async getTopTokens(chainId: number = 1, limit: number = 100) {
    const endpoint = '/tokens/top';
    return this.request(endpoint, {
      chain_id: chainId,
      limit,
      sort_by: 'volume_24h'
    });
  }

  async searchTokens(query: string, chainId: number = 1) {
    const endpoint = '/tokens/search';
    return this.request(endpoint, {
      query,
      chain_id: chainId,
      limit: 20
    });
  }

  async validateAddress(address: string): Promise<{ valid: boolean; type: string; checksum: string }> {
    const endpoint = '/utils/validate-address';
    return this.request(endpoint, {
      address
    });
  }

  async getGasPrice(chainId: number = 1) {
    const endpoint = '/gas/price';
    return this.request(endpoint, {
      chain_id: chainId
    });
  }

  async getBlockNumber(chainId: number = 1) {
    const endpoint = '/blockchain/latest-block';
    return this.request(endpoint, {
      chain_id: chainId
    });
  }
}

// Export singleton instance
export const uniscanAPI = new UniscanAPI();

// Export class for custom instances with API keys
export { UniscanAPI };

// Helper functions for common operations
export const formatTokenBalance = (balance: string, decimals: number): string => {
  const balanceNum = parseFloat(balance) / Math.pow(10, decimals);
  return balanceNum.toFixed(6);
};

export const formatUSDValue = (value: string): string => {
  const valueNum = parseFloat(value);
  if (valueNum >= 1000000) {
    return `$${(valueNum / 1000000).toFixed(2)}M`;
  } else if (valueNum >= 1000) {
    return `$${(valueNum / 1000).toFixed(2)}K`;
  } else {
    return `$${valueNum.toFixed(2)}`;
  }
};

export const getChainName = (chainId: number): string => {
  const chains: Record<number, string> = {
    1: 'Ethereum',
    56: 'BSC',
    137: 'Polygon',
    250: 'Fantom',
    43114: 'Avalanche',
    42161: 'Arbitrum',
    10: 'Optimism'
  };
  return chains[chainId] || `Chain ${chainId}`;
};