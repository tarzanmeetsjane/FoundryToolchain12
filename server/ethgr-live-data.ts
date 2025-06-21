import { liveData } from './live-data';

// ETHGR specific live data service
export class ETHGRLiveDataService {
  private ethgrContract = '0xfA7b8c553C48C56ec7027d26ae95b029a2abF247';
  private userWallet = '0x058C8FE01E5c9eaC6ee19e6673673B549B368843';

  // Get live ETHGR token data
  async getETHGRData() {
    try {
      const [balance, ethBalance, ethPrice, gasPrice, contractInfo] = await Promise.all([
        liveData.getTokenBalance(this.ethgrContract, this.userWallet),
        liveData.getETHBalance(this.userWallet),
        liveData.getLiveETHPrice(),
        liveData.getGasPrice(),
        liveData.verifyContract(this.ethgrContract)
      ]);

      const tokenBalance = parseFloat(balance);
      const ethBalanceNum = parseFloat(ethBalance);
      const marketPrice = 0.355; // Last known market price
      const portfolioValue = tokenBalance * marketPrice;

      return {
        contract: this.ethgrContract,
        wallet: this.userWallet,
        tokenBalance,
        tokenBalanceFormatted: tokenBalance.toLocaleString(),
        marketPrice,
        portfolioValue,
        portfolioValueFormatted: `$${portfolioValue.toLocaleString()}`,
        ethBalance: ethBalanceNum,
        ethBalanceUSD: ethBalanceNum * ethPrice,
        ethPrice,
        gasPrice,
        contractVerified: contractInfo.exists && contractInfo.isContract,
        lastUpdated: new Date().toISOString(),
        dataSource: 'live-blockchain'
      };
    } catch (error) {
      console.error('ETHGR live data error:', error);
      throw error;
    }
  }

  // Get transaction verification data
  async getTransactionVerification(txHash: string) {
    try {
      const txStatus = await liveData.getTransactionStatus(txHash);
      if (!txStatus) {
        throw new Error('Transaction not found');
      }

      return {
        hash: txStatus.hash,
        status: txStatus.status,
        blockNumber: txStatus.blockNumber,
        confirmations: txStatus.confirmations,
        verified: txStatus.confirmations > 0,
        permanent: txStatus.confirmations > 12,
        gasUsed: txStatus.gasUsed,
        timestamp: txStatus.timestamp,
        etherscanUrl: `https://etherscan.io/tx/${txHash}`
      };
    } catch (error) {
      console.error('Transaction verification error:', error);
      throw error;
    }
  }

  // Calculate real-time sales metrics
  async getSalesMetrics() {
    try {
      const ethgrData = await this.getETHGRData();
      const currentBlock = await liveData.getCurrentBlock();
      
      const salesPackages = [
        {
          name: 'Quick Starter',
          tokens: 50000,
          pricePerToken: 0.05,
          totalValue: 2500,
          ethEquivalent: 2500 / ethgrData.ethPrice,
          gasRequiredUSD: 20,
          netRevenue: 2480
        },
        {
          name: 'Power Pack',
          tokens: 100000,
          pricePerToken: 0.05,
          totalValue: 5000,
          ethEquivalent: 5000 / ethgrData.ethPrice,
          gasRequiredUSD: 25,
          netRevenue: 4975
        },
        {
          name: 'Mega Deal',
          tokens: 250000,
          pricePerToken: 0.04,
          totalValue: 10000,
          ethEquivalent: 10000 / ethgrData.ethPrice,
          gasRequiredUSD: 30,
          netRevenue: 9970
        }
      ];

      return {
        availableTokens: ethgrData.tokenBalance,
        portfolioValue: ethgrData.portfolioValue,
        currentETHPrice: ethgrData.ethPrice,
        gasEstimate: ethgrData.gasPrice,
        salesPackages,
        currentBlock,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Sales metrics error:', error);
      throw error;
    }
  }

  // Monitor pool creation readiness
  async getPoolCreationReadiness() {
    try {
      const [ethgrData, gasPrice] = await Promise.all([
        this.getETHGRData(),
        liveData.getGasPrice()
      ]);

      const minETHForPool = 2; // Minimum ETH needed for pool creation
      const estimatedGasCost = parseFloat(gasPrice.fast) * 500000 / 1e9; // Estimate for pool creation
      const hasEnoughETH = ethgrData.ethBalance >= (minETHForPool + estimatedGasCost);

      return {
        ready: hasEnoughETH,
        currentETH: ethgrData.ethBalance,
        requiredETH: minETHForPool,
        estimatedGas: estimatedGasCost,
        recommendation: hasEnoughETH 
          ? 'Ready for pool creation' 
          : `Need ${(minETHForPool + estimatedGasCost - ethgrData.ethBalance).toFixed(4)} more ETH`,
        tokensAvailable: ethgrData.tokenBalance,
        suggestedPoolRatio: `${minETHForPool} ETH : ${minETHForPool * ethgrData.ethPrice / 0.355} ETHGR`,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Pool readiness error:', error);
      throw error;
    }
  }
}

export const ethgrLiveData = new ETHGRLiveDataService();