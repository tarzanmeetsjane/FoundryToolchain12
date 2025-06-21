import { ethers } from "ethers";

export class WalletService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet | null = null;
  
  constructor() {
    this.provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY || 'demo'}`);
    
    if (process.env.PRIVATE_KEY) {
      try {
        this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
      }
    }
  }

  getWalletInfo(): {
    address: string;
    hasPrivateKey: boolean;
    isConnected: boolean;
  } {
    return {
      address: this.wallet?.address || "No wallet configured",
      hasPrivateKey: !!process.env.PRIVATE_KEY,
      isConnected: !!this.wallet
    };
  }

  async getBalance(address?: string): Promise<string> {
    const targetAddress = address || this.wallet?.address;
    if (!targetAddress) throw new Error("No address provided");
    
    const balance = await this.provider.getBalance(targetAddress);
    return ethers.formatEther(balance);
  }

  async executeContractCall(
    contractAddress: string,
    functionSignature: string,
    parameters: any[] = [],
    value: string = "0"
  ): Promise<{
    success: boolean;
    transactionHash?: string;
    error?: string;
  }> {
    if (!this.wallet) {
      return { success: false, error: "No wallet configured" };
    }

    try {
      // Create contract interface
      const abi = [`function ${functionSignature}`];
      const contract = new ethers.Contract(contractAddress, abi, this.wallet);
      
      // Extract function name from signature
      const functionName = functionSignature.split('(')[0];
      
      // Execute transaction
      const tx = await contract[functionName](...parameters, {
        value: ethers.parseEther(value)
      });
      
      await tx.wait();
      
      return {
        success: true,
        transactionHash: tx.hash
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Transaction failed'
      };
    }
  }
}

export const walletService = new WalletService();