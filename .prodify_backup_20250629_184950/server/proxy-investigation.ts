import { ethers } from "ethers";

export class ProxyInvestigationService {
  private provider: ethers.JsonRpcProvider;
  private proxyAddress = "0xd816c710dc011db6d357e2b1210eafc60177338f";
  
  constructor() {
    this.provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID || 'demo'}`);
  }

  async getImplementationAddress(): Promise<string> {
    try {
      // Standard EIP-1967 implementation slot
      const implementationSlot = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
      const storageValue = await this.provider.getStorage(this.proxyAddress, implementationSlot);
      
      // Convert bytes32 to address
      const implementationAddress = ethers.getAddress("0x" + storageValue.slice(26));
      return implementationAddress;
    } catch (error) {
      console.error('Failed to get implementation address:', error);
      return "";
    }
  }

  async getAdminAddress(): Promise<string> {
    try {
      // Standard EIP-1967 admin slot
      const adminSlot = "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";
      const storageValue = await this.provider.getStorage(this.proxyAddress, adminSlot);
      
      // Convert bytes32 to address
      const adminAddress = ethers.getAddress("0x" + storageValue.slice(26));
      return adminAddress;
    } catch (error) {
      console.error('Failed to get admin address:', error);
      return "";
    }
  }

  async analyzeProxy(): Promise<{
    proxyAddress: string;
    implementationAddress: string;
    adminAddress: string;
    proxyBalance: string;
    implementationBalance: string;
    canRecover: boolean;
    recoveryMethod: string;
  }> {
    const implementationAddress = await this.getImplementationAddress();
    const adminAddress = await this.getAdminAddress();
    
    const proxyBalance = await this.provider.getBalance(this.proxyAddress);
    const implementationBalance = implementationAddress ? 
      await this.provider.getBalance(implementationAddress) : BigInt(0);
    
    return {
      proxyAddress: this.proxyAddress,
      implementationAddress,
      adminAddress,
      proxyBalance: ethers.formatEther(proxyBalance),
      implementationBalance: ethers.formatEther(implementationBalance),
      canRecover: parseFloat(ethers.formatEther(proxyBalance)) > 0 || 
                  parseFloat(ethers.formatEther(implementationBalance)) > 0,
      recoveryMethod: implementationAddress ? 
        "Call withdraw function on implementation contract" : 
        "Direct proxy interaction required"
    };
  }
}

export const proxyInvestigation = new ProxyInvestigationService();