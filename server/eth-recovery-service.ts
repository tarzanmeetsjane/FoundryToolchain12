import { ethers } from "ethers";

export class ETHRecoveryService {
  private provider: ethers.JsonRpcProvider;
  private currentWallet: string;
  private oldWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843"; // Blacklisted address
  private remixWallet = "0xc46eB37677360EfDc011F4097621F15b792fa630"; // User saw 37 ETH here in Remix
  private suspectContract = "0xd816c710dc011db6d357e2b1210eafc60177338f";
  
  constructor() {
    this.provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID || 'demo'}`);
    
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
          const wallet = new ethers.Wallet(key);
          this.currentWallet = wallet.address;
          console.log(`Using wallet: ${this.currentWallet}`);
          break;
        } catch (error) {
          console.log(`Failed to use private key: ${error}`);
          continue;
        }
      }
    }
    
    if (!this.currentWallet) {
      this.currentWallet = this.oldWallet;
    }
  }

  async analyzeJune15Transactions(): Promise<{
    suspectTransactions: any[];
    contractCreations: any[];
    ethTransfers: any[];
    totalETHOut: number;
    recoveryPossible: boolean;
    strategy: string;
  }> {
    try {
      // Get transaction history for both wallets around June 15, 2025 (blocks 22700000-22750000)
      const [currentTxResponse, oldTxResponse] = await Promise.all([
        fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${this.currentWallet}&startblock=22700000&endblock=22750000&page=1&offset=100&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`),
        fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${this.oldWallet}&startblock=22700000&endblock=22750000&page=1&offset=100&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`)
      ]);
      const [currentTxData, oldTxData] = await Promise.all([
        currentTxResponse.json(),
        oldTxResponse.json()
      ]);
      
      const currentTransactions = currentTxData.status === '1' ? currentTxData.result : [];
      const oldTransactions = oldTxData.status === '1' ? oldTxData.result : [];
      const allTransactions = [...currentTransactions, ...oldTransactions];

      // Filter for large ETH transfers (potential 37 ETH)
      const largeTransfers = allTransactions.filter((tx: any) => {
        const valueETH = parseFloat(tx.value) / 1e18;
        return valueETH > 10; // Looking for transfers > 10 ETH
      });

      // Look for contract creation transactions from both wallets
      const contractCreations = allTransactions.filter((tx: any) => 
        tx.to === "" || tx.to === null
      );

      // Calculate total ETH sent out from both wallets
      const totalETHOut = allTransactions
        .filter((tx: any) => 
          tx.from.toLowerCase() === this.currentWallet.toLowerCase() ||
          tx.from.toLowerCase() === this.oldWallet.toLowerCase()
        )
        .reduce((sum: number, tx: any) => sum + parseFloat(tx.value) / 1e18, 0);

      // Check suspect contract balance and history
      const contractBalance = await this.provider.getBalance(this.suspectContract);
      const contractBalanceETH = parseFloat(ethers.formatEther(contractBalance));

      return {
        suspectTransactions: largeTransfers,
        contractCreations,
        ethTransfers: largeTransfers,
        totalETHOut,
        currentWallet: this.currentWallet,
        oldWallet: this.oldWallet,
        contractBalance: contractBalanceETH,
        recoveryPossible: contractBalanceETH > 0 || largeTransfers.length > 0,
        strategy: this.determineRecoveryStrategy(contractBalanceETH, largeTransfers),
        hasPrivateKey: !!process.env.PRIVATE_KEY
      };
    } catch (error) {
      console.error('June 15 analysis failed:', error);
      return {
        suspectTransactions: [],
        contractCreations: [],
        ethTransfers: [],
        totalETHOut: 0,
        currentWallet: this.currentWallet,
        oldWallet: this.oldWallet,
        contractBalance: 0,
        recoveryPossible: false,
        strategy: "Analysis failed - manual investigation required",
        hasPrivateKey: !!process.env.PRIVATE_KEY
      };
    }
  }

  private determineRecoveryStrategy(contractBalance: number, transfers: any[]): string {
    if (contractBalance > 30) {
      return "DIRECT RECOVERY: Contract holds significant ETH - analyze proxy admin functions";
    } else if (transfers.length > 0) {
      return "TRACE TRANSFERS: Large ETH movements detected - follow transaction chain";
    } else {
      return "DEEP INVESTIGATION: Check internal transactions and proxy implementation";
    }
  }

  async generateRecoveryContract(): Promise<{
    contractCode: string;
    deploymentInstructions: string;
    gasEstimate: string;
  }> {
    const recoveryCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ETHRecoveryV2 {
    address private owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    // Emergency ETH withdrawal from any source
    function emergencyWithdraw() external {
        require(msg.sender == owner, "Only owner");
        payable(owner).transfer(address(this).balance);
    }
    
    // Call any contract function (for proxy interaction)
    function callContract(address target, bytes calldata data) external payable {
        require(msg.sender == owner, "Only owner");
        (bool success, ) = target.call{value: msg.value}(data);
        require(success, "Call failed");
    }
    
    // Receive ETH
    receive() external payable {}
    fallback() external payable {}
}`;

    return {
      contractCode: recoveryCode,
      deploymentInstructions: `
1. Deploy this contract from your current wallet (${this.currentWallet})
2. Use callContract() to interact with proxy at ${this.suspectContract}
3. Try calling admin(), implementation(), or direct withdrawal functions
4. Use emergencyWithdraw() to recover any ETH sent to this contract
      `,
      gasEstimate: "~200,000 gas (~$0.50 at current prices)"
    };
  }
}

export const ethRecovery = new ETHRecoveryService();