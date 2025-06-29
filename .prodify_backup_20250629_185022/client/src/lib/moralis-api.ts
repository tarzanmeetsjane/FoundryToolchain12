// Moralis Web3 API integration for authentic blockchain data
// Documentation: https://docs.moralis.io/web3-data-api

const MORALIS_BASE_URL = "https://deep-index.moralis.io/api/v2.2";

export interface MoralisTokenBalance {
  token_address: string;
  symbol: string;
  name: string;
  logo?: string;
  thumbnail?: string;
  decimals: number;
  balance: string;
  possible_spam: boolean;
  verified_contract: boolean;
  balance_formatted: string;
  usd_price?: number;
  usd_value?: number;
  portfolio_percentage?: number;
}

export interface MoralisWalletBalance {
  address: string;
  chain: string;
  total_balance_usd: string;
  wallet_balance: {
    balance: string;
    balance_formatted: string;
    usd_price?: number;
    usd_value?: number;
  };
  tokens: MoralisTokenBalance[];
}

export interface MoralisTransaction {
  transaction_hash: string;
  address: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  transaction_fee: string;
  transaction_index: number;
  from_address: string;
  from_address_label?: string;
  to_address: string;
  to_address_label?: string;
  value: string;
  gas: string;
  gas_price: string;
  gas_used: string;
  nonce: string;
  transaction_type: number;
  r: string;
  s: string;
  v: string;
  receipt_cumulative_gas_used: string;
  receipt_gas_used: string;
  receipt_contract_address?: string;
  receipt_root?: string;
  receipt_status: string;
  decoded_call?: {
    label: string;
    type: string;
    params: any[];
  };
}

class MoralisAPI {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = MORALIS_BASE_URL;
    this.apiKey = import.meta.env.VITE_MORALIS_API_KEY || '';
  }

  private async request<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
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
        'X-API-Key': this.apiKey
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid Moralis API key. Please check your MORALIS_API_KEY.');
      }
      throw new Error(`Moralis API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getWalletTokenBalances(address: string, chain: string = 'eth'): Promise<MoralisTokenBalance[]> {
    const endpoint = `/${address}/erc20`;
    return this.request<MoralisTokenBalance[]>(endpoint, {
      chain,
      exclude_spam: true,
      exclude_unverified_contracts: false
    });
  }

  async getWalletBalance(address: string, chain: string = 'eth'): Promise<MoralisWalletBalance> {
    const endpoint = `/${address}/balance`;
    return this.request<MoralisWalletBalance>(endpoint, {
      chain,
      exclude_spam: true,
      exclude_unverified_contracts: false
    });
  }

  async getWalletTransactions(address: string, chain: string = 'eth', limit: number = 100): Promise<MoralisTransaction[]> {
    const endpoint = `/${address}`;
    return this.request<MoralisTransaction[]>(endpoint, {
      chain,
      limit,
      order: 'DESC'
    });
  }

  async getTokenPrice(addresses: string[], chain: string = 'eth'): Promise<any[]> {
    const endpoint = `/erc20/prices`;
    return this.request(endpoint, {
      chain,
      tokens: addresses,
      include: 'percent_change'
    });
  }

  async getTokenMetadata(addresses: string[], chain: string = 'eth'): Promise<any[]> {
    const endpoint = `/erc20/metadata`;
    return this.request(endpoint, {
      chain,
      addresses
    });
  }

  async getNFTs(address: string, chain: string = 'eth'): Promise<any> {
    const endpoint = `/${address}/nft`;
    return this.request(endpoint, {
      chain,
      format: 'decimal',
      media_items: false
    });
  }

  async getWalletNetWorth(address: string, chains: string[] = ['eth']): Promise<any> {
    const endpoint = `/${address}/net-worth`;
    return this.request(endpoint, {
      chains,
      exclude_spam: true,
      exclude_unverified_contracts: true
    });
  }
}

export const moralisAPI = new MoralisAPI();

// Chain mapping for Moralis
export const getMoralisChain = (chainId: number): string => {
  const chainMap: Record<number, string> = {
    1: 'eth',
    56: 'bsc',
    137: 'polygon',
    43114: 'avalanche',
    250: 'fantom',
    42161: 'arbitrum',
    10: 'optimism',
    8453: 'base'
  };
  return chainMap[chainId] || 'eth';
};