import { ethers } from 'ethers';

// Direct contract execution service
export class DirectExecutionService {
  
  async generateExecutionData(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Generate the exact function call data for migrateMyTrappedETHG()
      const contractABI = [
        'function migrateMyTrappedETHG() external'
      ];
      
      const iface = new ethers.Interface(contractABI);
      const functionData = iface.encodeFunctionData('migrateMyTrappedETHG', []);
      
      return {
        success: true,
        data: {
          contractAddress: '0xd9145CCE52D386f254917e481eB44e9943F39138',
          userAddress: '0x058C8FE01E5c9eaC6ee19e6673673B549B368843',
          functionSelector: '0x1453926d',
          callData: functionData,
          gasLimit: '300000',
          maxFeePerGas: '2000000000', // 2 gwei
          maxPriorityFeePerGas: '1000000000', // 1 gwei
          instructions: [
            '1. Go to Remix IDE',
            '2. Deploy & Run tab',
            '3. At Address field: 0xd9145CCE52D386f254917e481eB44e9943F39138',
            '4. Click "At Address"',
            '5. Click red "migrateMyTrappedETHG" button',
            '6. In MetaMask: Edit gas to 2 gwei max fee, 1 gwei priority',
            '7. Confirm transaction'
          ]
        }
      };
      
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export const directExecution = new DirectExecutionService();