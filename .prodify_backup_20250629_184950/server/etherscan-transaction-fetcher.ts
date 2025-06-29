import { ethers } from "ethers";

export class EtherscanTransactionFetcher {
  private provider: ethers.JsonRpcProvider;
  
  constructor() {
    this.provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY || 'demo'}`);
  }

  async analyzeTransaction(txHash: string) {
    try {
      // Get transaction details
      const tx = await this.provider.getTransaction(txHash);
      const receipt = await this.provider.getTransactionReceipt(txHash);
      
      if (!tx || !receipt) {
        throw new Error('Transaction not found');
      }

      // Parse transaction data
      const analysis = {
        hash: txHash,
        from: tx.from,
        to: tx.to,
        value: ethers.formatEther(tx.value),
        gasUsed: receipt.gasUsed.toString(),
        gasPrice: ethers.formatUnits(tx.gasPrice || 0, 'gwei'),
        status: receipt.status === 1 ? 'Success' : 'Failed',
        blockNumber: receipt.blockNumber,
        contractAddress: receipt.contractAddress,
        logs: receipt.logs.length,
        timestamp: null,
        ethSpent: 0,
        interpretation: ''
      };

      // Get block timestamp
      const block = await this.provider.getBlock(receipt.blockNumber);
      if (block) {
        analysis.timestamp = new Date(block.timestamp * 1000).toISOString();
      }

      // Calculate ETH spent on gas
      analysis.ethSpent = parseFloat(ethers.formatEther((receipt.gasUsed * (tx.gasPrice || BigInt(0))).toString()));

      // Interpret transaction type
      if (receipt.contractAddress) {
        analysis.interpretation = `Contract deployment - New contract created at ${receipt.contractAddress}`;
      } else if (tx.to && receipt.logs.length > 0) {
        analysis.interpretation = `Contract interaction - ${receipt.logs.length} events logged`;
      } else if (parseFloat(analysis.value) > 0) {
        analysis.interpretation = `ETH transfer - ${analysis.value} ETH sent`;
      } else {
        analysis.interpretation = `Contract call - No ETH transferred`;
      }

      return {
        success: true,
        transaction: analysis,
        rawData: {
          transaction: tx,
          receipt: receipt
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch transaction'
      };
    }
  }

  async getTransactionStateChanges(txHash: string) {
    // This would typically require a trace API call
    // For now, return structure for state change analysis
    return {
      success: true,
      stateChanges: {
        addresses: [],
        storageSlots: [],
        balanceChanges: []
      },
      message: "State change analysis requires trace API access"
    };
  }
}

export const etherscanFetcher = new EtherscanTransactionFetcher();