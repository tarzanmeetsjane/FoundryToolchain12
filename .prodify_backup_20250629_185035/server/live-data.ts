import { ethers } from 'ethers';

// Live blockchain data service
export class LiveDataService {
  private provider: ethers.JsonRpcProvider;
  
  constructor() {
    this.provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
  }

  // Get live ETH balance
  async getETHBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('ETH balance fetch error:', error);
      return '0';
    }
  }

  // Get live token balance using ERC20 contract
  async getTokenBalance(tokenAddress: string, walletAddress: string): Promise<string> {
    try {
      const abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)"
      ];
      
      const contract = new ethers.Contract(tokenAddress, abi, this.provider);
      const [balance, decimals] = await Promise.all([
        contract.balanceOf(walletAddress),
        contract.decimals()
      ]);
      
      return ethers.formatUnits(balance, decimals);
    } catch (error) {
      console.error('Token balance fetch error:', error);
      return '0';
    }
  }

  // Get live transaction status
  async getTransactionStatus(txHash: string): Promise<any> {
    try {
      const [tx, receipt] = await Promise.all([
        this.provider.getTransaction(txHash),
        this.provider.getTransactionReceipt(txHash)
      ]);

      if (!tx) return null;

      const currentBlock = await this.provider.getBlockNumber();
      const confirmations = receipt ? currentBlock - receipt.blockNumber : 0;

      return {
        hash: tx.hash,
        blockNumber: receipt?.blockNumber,
        confirmations,
        status: receipt?.status === 1 ? 'Success' : receipt?.status === 0 ? 'Failed' : 'Pending',
        gasUsed: receipt?.gasUsed?.toString(),
        timestamp: tx.blockNumber ? (await this.provider.getBlock(tx.blockNumber))?.timestamp : null
      };
    } catch (error) {
      console.error('Transaction status fetch error:', error);
      return null;
    }
  }

  // Get live gas prices
  async getGasPrice(): Promise<{ standard: string; fast: string; fastest: string }> {
    try {
      const feeData = await this.provider.getFeeData();
      const gasPrice = feeData.gasPrice || BigInt(0);
      
      return {
        standard: ethers.formatUnits(gasPrice, 'gwei'),
        fast: ethers.formatUnits(gasPrice * BigInt(120) / BigInt(100), 'gwei'),
        fastest: ethers.formatUnits(gasPrice * BigInt(150) / BigInt(100), 'gwei')
      };
    } catch (error) {
      console.error('Gas price fetch error:', error);
      return { standard: '20', fast: '25', fastest: '30' };
    }
  }

  // Get live block number
  async getCurrentBlock(): Promise<number> {
    try {
      return await this.provider.getBlockNumber();
    } catch (error) {
      console.error('Block number fetch error:', error);
      return 0;
    }
  }

  // Verify contract exists and get code
  async verifyContract(address: string): Promise<{ exists: boolean; isContract: boolean; code?: string }> {
    try {
      const code = await this.provider.getCode(address);
      return {
        exists: true,
        isContract: code !== '0x',
        code: code.length > 10 ? code.substring(0, 100) + '...' : code
      };
    } catch (error) {
      console.error('Contract verification error:', error);
      return { exists: false, isContract: false };
    }
  }

  // Get live ETH price from multiple sources
  async getLiveETHPrice(): Promise<number> {
    const sources = [
      async () => {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        return data.ethereum?.usd;
      },
      async () => {
        const response = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`);
        const data = await response.json();
        return data.status === '1' ? parseFloat(data.result.ethusd) : null;
      },
      async () => {
        const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=ETH');
        const data = await response.json();
        return parseFloat(data.data?.rates?.USD);
      }
    ];

    for (const source of sources) {
      try {
        const price = await source();
        if (price && price > 0) {
          return price;
        }
      } catch (error) {
        console.error('Price source failed:', error);
      }
    }

    return 2500; // Fallback price
  }
}

export const liveData = new LiveDataService();