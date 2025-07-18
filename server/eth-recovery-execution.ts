import { ethers } from 'ethers';

export class ETHRecoveryExecution {
  private provider: ethers.JsonRpcProvider;
  private targetWallet: string;
  private ethgrContract: string;
  private uniswapRouter: string;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID || 'demo'}`);
    this.targetWallet = '0x058C8FE01E5c9eaC6ee19e6673673B549B368843';
    this.ethgrContract = '0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308';
    this.uniswapRouter = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  }

  async executeCompleteRecoveryToETH(): Promise<{
    success: boolean;
    ethgrRecovered?: string;
    ethReceived?: string;
    transactionHash?: string;
    error?: string;
  }> {
    try {
      const privateKey = process.env.PRIVATE_KEY;
      if (!privateKey) {
        return { success: false, error: "No private key configured" };
      }

      const wallet = new ethers.Wallet(privateKey, this.provider);
      console.log(`Using wallet: ${wallet.address}`);

      // ETHGR Contract setup
      const ethgrAbi = [
        "function migrateMyTrappedETHG() external",
        "function balanceOf(address) external view returns (uint256)",
        "function hasMigrated(address) external view returns (bool)",
        "function approve(address spender, uint256 amount) external returns (bool)"
      ];

      const ethgrContract = new ethers.Contract(this.ethgrContract, ethgrAbi, wallet);

      // Check migration status
      const hasMigrated = await ethgrContract.hasMigrated(this.targetWallet);
      let ethgrBalance = await ethgrContract.balanceOf(this.targetWallet);

      // Execute migration if needed
      if (!hasMigrated && ethgrBalance.toString() === '0') {
        console.log("Executing ETHGR migration...");
        const migrateTx = await ethgrContract.migrateMyTrappedETHG();
        await migrateTx.wait();
        ethgrBalance = await ethgrContract.balanceOf(this.targetWallet);
      }

      if (ethgrBalance.toString() === '0') {
        return { success: false, error: "No ETHGR balance to convert" };
      }

      // Convert to ETH via Uniswap
      const routerAbi = [
        "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
        "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
        "function WETH() external pure returns (address)"
      ];

      const router = new ethers.Contract(this.uniswapRouter, routerAbi, wallet);
      const weth = await router.WETH();

      // Approve ETHGR for router
      const approveTx = await ethgrContract.approve(this.uniswapRouter, ethgrBalance);
      await approveTx.wait();

      // Get estimated ETH output
      const path = [this.ethgrContract, weth];
      const amounts = await router.getAmountsOut(ethgrBalance, path);
      const estimatedETH = amounts[1];
      const minETH = estimatedETH * BigInt(95) / BigInt(100); // 5% slippage

      // Execute swap
      const swapTx = await router.swapExactTokensForETH(
        ethgrBalance,
        minETH,
        path,
        this.targetWallet,
        Math.floor(Date.now() / 1000) + 300,
        { gasLimit: 300000 }
      );

      const receipt = await swapTx.wait();

      return {
        success: true,
        ethgrRecovered: ethers.formatEther(ethgrBalance),
        ethReceived: ethers.formatEther(estimatedETH),
        transactionHash: receipt.transactionHash
      };

    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async executeRecovery(): Promise<{
    success: boolean;
    message: string;
    data?: any;
  }> {
    try {
      const abi = [
        'function migrateMyTrappedETHG() external',
        'function balanceOf(address) external view returns (uint256)',
        'function hasMigrated(address) external view returns (bool)'
      ];

      const contract = new ethers.Contract(this.contractAddress, abi, this.provider);

      // Check migration status
      const hasMigrated = await contract.hasMigrated(this.targetWallet);
      const currentBalance = await contract.balanceOf(this.targetWallet);

      if (hasMigrated) {
        return {
          success: true,
          message: 'Migration already completed',
          data: {
            status: 'completed',
            balance: ethers.formatEther(currentBalance)
          }
        };
      }

      return {
        success: true,
        message: 'Ready to execute migration',
        data: {
          status: 'ready',
          contractAddress: this.contractAddress,
          targetWallet: this.targetWallet,
          expectedTokens: '1990000',
          instruction: 'Call migrateMyTrappedETHG() from your wallet'
        }
      };

    } catch (error) {
      return {
        success: false,
        message: `Recovery check failed: ${error}`,
      };
    }
  }
}

export const ethRecoveryExecution = new ETHRecoveryExecution();