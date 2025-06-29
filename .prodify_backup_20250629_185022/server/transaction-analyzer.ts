import { ethers } from "ethers";

export class TransactionAnalyzer {
  private provider: ethers.JsonRpcProvider;
  
  constructor() {
    this.provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY || 'demo'}`);
  }

  async analyzeTransactionData(txData: {
    addresses: Array<{
      address: string;
      beforeEth: string;
      afterEth: string;
      beforeNonce: number;
      afterNonce: number;
    }>;
    storageChanges: Array<{
      contract: string;
      storageAddress: string;
      before: string;
      after: string;
    }>;
  }) {
    try {
      // Analyze Uniswap factory storage changes
      const uniswapFactoryChanges = txData.storageChanges.filter(change => 
        change.contract === "0x5C69bEe701ab6c29BeE9cc5aA6f" // Uniswap V2 Factory
      );

      // Detect pool creation
      const poolCreationSlot = uniswapFactoryChanges.find(change => 
        change.storageAddress === "0x0000000000000000000000000000000000000000000000000000000000000003"
      );

      // Extract new pool addresses from storage changes
      const newPoolAddresses = uniswapFactoryChanges
        .filter(change => change.before === "0x0000000000000000000000000000000000000000000000000000000000000000")
        .map(change => "0x" + change.after.slice(-40));

      // Calculate ETH spent by main wallet
      const mainWallet = txData.addresses.find(addr => 
        addr.address.toLowerCase().includes("058c8fe0")
      );

      const ethSpent = mainWallet ? 
        parseFloat(mainWallet.beforeEth) - parseFloat(mainWallet.afterEth) : 0;

      return {
        success: true,
        analysis: {
          isUniswapPoolCreation: poolCreationSlot !== undefined,
          newPoolCount: poolCreationSlot ? 
            parseInt(poolCreationSlot.after, 16) - parseInt(poolCreationSlot.before, 16) : 0,
          newPoolAddresses,
          mainWalletActivity: {
            address: mainWallet?.address || "Unknown",
            ethSpent: ethSpent.toFixed(6),
            nonceIncreased: mainWallet ? mainWallet.afterNonce - mainWallet.beforeNonce : 0
          },
          minerReward: txData.addresses.find(addr => 
            addr.address.toLowerCase().includes("4838b106")
          ),
          timestamp: new Date().toISOString(),
          interpretation: this.interpretTransaction(ethSpent, newPoolAddresses.length > 0)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Analysis failed'
      };
    }
  }

  private interpretTransaction(ethSpent: number, isPoolCreation: boolean): string {
    if (isPoolCreation && ethSpent > 0) {
      return `SUCCESSFUL POOL CREATION: Spent ${ethSpent.toFixed(6)} ETH to create new Uniswap liquidity pool. This could be your ETHGR token pool launch!`;
    } else if (ethSpent > 0.001) {
      return `SIGNIFICANT ETH TRANSACTION: ${ethSpent.toFixed(6)} ETH spent - possibly related to recovery operations or token activities.`;
    } else {
      return `MINOR TRANSACTION: ${ethSpent.toFixed(6)} ETH spent on contract interaction.`;
    }
  }

  async getPoolDetails(poolAddress: string) {
    try {
      // ERC20 ABI for basic token info
      const erc20Abi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)", 
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint256)"
      ];
      
      const contract = new ethers.Contract(poolAddress, erc20Abi, this.provider);
      const [name, symbol, totalSupply] = await Promise.all([
        contract.name().catch(() => "Unknown"),
        contract.symbol().catch(() => "UNKNOWN"),
        contract.totalSupply().catch(() => "0")
      ]);

      return {
        address: poolAddress,
        name,
        symbol,
        totalSupply: ethers.formatEther(totalSupply),
        isETHGR: symbol.includes("ETHGR") || name.includes("ETHGR")
      };
    } catch (error) {
      return {
        address: poolAddress,
        error: error instanceof Error ? error.message : 'Failed to get pool details'
      };
    }
  }
}

export const transactionAnalyzer = new TransactionAnalyzer();