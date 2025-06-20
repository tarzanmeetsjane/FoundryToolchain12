import { ethers } from 'ethers';
import type { Request, Response } from 'express';

// Gas relay service for ETHG recovery
export class GasRelayService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contractAddress: string;
  
  constructor() {
    // Initialize with production RPC
    this.provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/demo');
    this.contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
    
    // Gas sponsor wallet (would be funded with ETH)
    const privateKey = process.env.GAS_SPONSOR_KEY || '0x' + '1'.repeat(64); // Demo key
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }
  
  // Execute gasless createPair for ETHG/ETHGR
  async executeGaslessMigration(req: Request, res: Response) {
    try {
      const { userAddress, tokenA, tokenB } = req.body;
      
      // Verify this is the correct user
      if (userAddress.toLowerCase() !== '0x058C8FE01E5c9eaC6ee19e6673673B549B368843'.toLowerCase()) {
        return res.status(400).json({ error: 'Unauthorized address' });
      }
      
      // Check gas sponsor balance first
      const balance = await this.provider.getBalance(this.wallet.address);
      const balanceETH = parseFloat(ethers.formatEther(balance));
      
      if (balanceETH < 0.01) {
        return res.status(503).json({ 
          error: 'Gas sponsorship currently unavailable',
          details: 'Insufficient sponsor balance',
          sponsorBalance: balanceETH.toFixed(6) + ' ETH'
        });
      }
      
      // Uniswap V2 Factory contract
      const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
      const factoryABI = [
        'function createPair(address tokenA, address tokenB) external returns (address pair)',
        'function getPair(address tokenA, address tokenB) external view returns (address pair)'
      ];
      
      const factory = new ethers.Contract(factoryAddress, factoryABI, this.wallet);
      
      // Check if pair already exists
      const existingPair = await factory.getPair(tokenA, tokenB);
      if (existingPair !== '0x0000000000000000000000000000000000000000') {
        return res.json({
          success: true,
          pairAddress: existingPair,
          message: 'Pair already exists',
          alreadyExists: true
        });
      }
      
      // Execute createPair with gas sponsor paying
      const tx = await factory.createPair(tokenA, tokenB, {
        gasLimit: 500000,
        maxFeePerGas: ethers.parseUnits('30', 'gwei'),
        maxPriorityFeePerGas: ethers.parseUnits('3', 'gwei')
      });
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      // Get the new pair address from logs
      let pairAddress = '';
      if (receipt.logs && receipt.logs.length > 0) {
        // Find PairCreated event
        const pairCreatedTopic = '0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9';
        const pairLog = receipt.logs.find((log: any) => log.topics[0] === pairCreatedTopic);
        if (pairLog && pairLog.topics.length >= 4) {
          pairAddress = '0x' + pairLog.topics[3].slice(-40);
        }
      }
      
      res.json({
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        pairAddress: pairAddress,
        tokenA: tokenA,
        tokenB: tokenB,
        message: 'ETHG/ETHGR pair created successfully',
        nextStep: 'Add liquidity to the new pair'
      });
      
    } catch (error: any) {
      console.error('Gas relay error:', error);
      res.status(500).json({ 
        error: 'CreatePair execution failed', 
        details: error.message,
        availableBalance: await this.provider.getBalance(this.wallet.address).then(b => ethers.formatEther(b))
      });
    }
  }
  
  // Check gas sponsor balance
  async getGasSponsorStatus(req: Request, res: Response) {
    try {
      const balance = await this.provider.getBalance(this.wallet.address);
      const balanceETH = ethers.formatEther(balance);
      
      res.json({
        gasSponsorAddress: this.wallet.address,
        balance: balanceETH,
        canSponsorTransactions: parseFloat(balanceETH) > 0.01
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Initialize service
export const gasRelay = new GasRelayService();