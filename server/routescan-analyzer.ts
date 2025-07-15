
import { ethers } from "ethers";

export interface ERC20Transfer {
  id: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  tokenDecimals: number;
  chainId: number;
  chainName: string;
}

export class RoutescanAnalyzer {
  private baseUrl = "https://cdn-canary.routescan.io/api/evm/all";
  
  async getERC20Transfers(address: string, options?: {
    excludedChainIds?: string;
    ecosystem?: string;
    sort?: 'asc' | 'desc';
    limit?: number;
  }): Promise<{
    transfers: ERC20Transfer[];
    analysis: {
      totalTransfers: number;
      uniqueTokens: number;
      uniqueChains: number;
      largestTransfer: ERC20Transfer | null;
      recentActivity: ERC20Transfer[];
      chainBreakdown: Record<string, number>;
      tokenBreakdown: Record<string, number>;
    };
  }> {
    try {
      const params = new URLSearchParams({
        excludedChainIds: options?.excludedChainIds || "1682324,2061,80002,4202,1234",
        ecosystem: options?.ecosystem || "all",
        sort: options?.sort || "desc",
        limit: (options?.limit || 50).toString()
      });

      const url = `${this.baseUrl}/address/${address}/erc20-transfers?${params}`;
      console.log(`Fetching ERC20 transfers from: ${url}`);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Routescan API error: ${response.status}`);
      }

      const data = await response.json();
      const transfers: ERC20Transfer[] = data.items || [];

      // Analyze the transfers
      const analysis = this.analyzeTransfers(transfers);

      return {
        transfers,
        analysis
      };
    } catch (error) {
      console.error('Error fetching Routescan data:', error);
      return {
        transfers: [],
        analysis: {
          totalTransfers: 0,
          uniqueTokens: 0,
          uniqueChains: 0,
          largestTransfer: null,
          recentActivity: [],
          chainBreakdown: {},
          tokenBreakdown: {}
        }
      };
    }
  }

  private analyzeTransfers(transfers: ERC20Transfer[]) {
    const uniqueTokens = new Set(transfers.map(t => t.tokenAddress)).size;
    const uniqueChains = new Set(transfers.map(t => t.chainId)).size;
    
    // Find largest transfer by value (convert to numbers for comparison)
    let largestTransfer: ERC20Transfer | null = null;
    let largestValue = 0;
    
    transfers.forEach(transfer => {
      try {
        const value = parseFloat(ethers.formatUnits(transfer.value, transfer.tokenDecimals));
        if (value > largestValue) {
          largestValue = value;
          largestTransfer = transfer;
        }
      } catch (error) {
        // Skip if can't parse value
      }
    });

    // Recent activity (last 10 transfers)
    const recentActivity = transfers.slice(0, 10);

    // Chain breakdown
    const chainBreakdown: Record<string, number> = {};
    transfers.forEach(transfer => {
      const chainName = transfer.chainName || `Chain ${transfer.chainId}`;
      chainBreakdown[chainName] = (chainBreakdown[chainName] || 0) + 1;
    });

    // Token breakdown
    const tokenBreakdown: Record<string, number> = {};
    transfers.forEach(transfer => {
      const tokenKey = `${transfer.tokenSymbol} (${transfer.tokenName})`;
      tokenBreakdown[tokenKey] = (tokenBreakdown[tokenKey] || 0) + 1;
    });

    return {
      totalTransfers: transfers.length,
      uniqueTokens,
      uniqueChains,
      largestTransfer,
      recentActivity,
      chainBreakdown,
      tokenBreakdown
    };
  }

  async getFoundationWalletActivity(): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
    
    try {
      const result = await this.getERC20Transfers(foundationWallet, {
        limit: 100,
        sort: 'desc'
      });

      // Look for ETHG/ETHGR related transfers
      const ethgTransfers = result.transfers.filter(t => 
        t.tokenSymbol.toLowerCase().includes('ethg') ||
        t.tokenName.toLowerCase().includes('ethg') ||
        t.tokenAddress.toLowerCase() === "0xc2b6d375b7d14c9ce73f97ddf565002cce257308"
      );

      return {
        success: true,
        data: {
          ...result,
          ethgTransfers,
          foundationSpecific: {
            totalETHGTransfers: ethgTransfers.length,
            lastETHGActivity: ethgTransfers[0]?.timestamp || null,
            ethgTokensDetected: [...new Set(ethgTransfers.map(t => t.tokenSymbol))]
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  formatTransferForDisplay(transfer: ERC20Transfer): string {
    try {
      const value = ethers.formatUnits(transfer.value, transfer.tokenDecimals);
      const formattedValue = parseFloat(value).toLocaleString(undefined, {
        maximumFractionDigits: 6
      });
      
      return `${formattedValue} ${transfer.tokenSymbol} on ${transfer.chainName}`;
    } catch (error) {
      return `${transfer.value} ${transfer.tokenSymbol} (raw)`;
    }
  }
}

export const routescanAnalyzer = new RoutescanAnalyzer();
