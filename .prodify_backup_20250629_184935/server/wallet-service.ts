import { ethers } from "ethers";

export class WalletService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet | null = null;
  
  constructor() {
    this.provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY || 'demo'}`);
    
    // Try different stored private keys
    const privateKeys = [
      process.env.RECOVERY_WALLET_PRIVATE_KEY,
      process.env.QUANTUM_TRADER_KEYPRIVATE_KEY,
      process.env.PRIVATE_KEY,
      process.env.RECOVERY_PRIVATE_KEY,
      process.env.ETH_PRIVATE_KEY
    ];
    
    for (const key of privateKeys) {
      if (key) {
        try {
          this.wallet = new ethers.Wallet(key, this.provider);
          console.log(`Wallet initialized: ${this.wallet.address}`);
          break;
        } catch (error) {
          // Skip invalid private key format silently
          continue;
        }
      }
    }
  }

  getWalletInfo(): {
    address: string;
    hasPrivateKey: boolean;
    isConnected: boolean;
    availableKeys: string[];
  } {
    const availableKeys = [
      process.env.RECOVERY_WALLET_PRIVATE_KEY ? "RECOVERY_WALLET_PRIVATE_KEY" : null,
      process.env.QUANTUM_TRADER_KEYPRIVATE_KEY ? "QUANTUM_TRADER_KEYPRIVATE_KEY" : null,
      process.env.PRIVATE_KEY ? "PRIVATE_KEY" : null,
      process.env.RECOVERY_PRIVATE_KEY ? "RECOVERY_PRIVATE_KEY" : null,
      process.env.ETH_PRIVATE_KEY ? "ETH_PRIVATE_KEY" : null
    ].filter(Boolean) as string[];
    
    return {
      address: this.wallet?.address || "No wallet configured",
      hasPrivateKey: availableKeys.length > 0,
      isConnected: !!this.wallet,
      availableKeys
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