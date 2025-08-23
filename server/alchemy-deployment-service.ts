import { Request, Response } from 'express';
import { Alchemy, Network } from 'alchemy-sdk';

// Alchemy configuration for gas-sponsored deployments
const ALCHEMY_CONFIG = {
    apiKey: process.env.ALCHEMY_API_KEY || '1853a0dd-6740-40f8-b1cf-69f4f6389a69',
    network: Network.ETH_MAINNET,
    gasManagerConfig: {
        policyId: '3cb67340-3b28-4960-aa65-82f21aa8dddd',
        accountKitApiKey: 'mlPSMxEyzhZVpOh9opgGtPYbD11oZxGc'
    }
};

const alchemy = new Alchemy(ALCHEMY_CONFIG);

export interface DeploymentRequest {
    contractAddress: string;
    userWallet: string;
    contractBytecode: string;
    constructorArgs?: string[];
}

export interface DeploymentResponse {
    success: boolean;
    transactionHash?: string;
    deployedAddress?: string;
    gasUsed?: string;
    gasCost?: string;
    error?: string;
}

/**
 * Get gas policy information
 */
export const getGasPolicyInfo = async (req: Request, res: Response) => {
    try {
        const policyInfo = {
            policyId: ALCHEMY_CONFIG.gasManagerConfig.policyId,
            status: 'active',
            network: 'ethereum-mainnet',
            sponsorshipActive: true,
            accountHolder: 'DeNae Duncan',
            rpcEndpoint: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_CONFIG.apiKey}`
        };

        res.json({
            success: true,
            data: policyInfo
        });
    } catch (error) {
        console.error('Error fetching gas policy info:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch gas policy information'
        });
    }
};

/**
 * Estimate gas for contract deployment
 */
export const estimateDeploymentGas = async (req: Request, res: Response) => {
    try {
        const { contractBytecode, constructorArgs = [] } = req.body;

        // Estimate gas for contract deployment
        const gasEstimate = await alchemy.transact.estimateGas({
            to: null, // null for contract creation
            data: contractBytecode + (constructorArgs.length > 0 ? constructorArgs.join('') : ''),
        });

        // Get current gas price
        const gasPrice = await alchemy.core.getGasPrice();
        
        // Calculate estimated cost
        const estimatedCost = gasEstimate.mul(gasPrice);

        res.json({
            success: true,
            data: {
                gasEstimate: gasEstimate.toString(),
                gasPrice: gasPrice.toString(),
                estimatedCostWei: estimatedCost.toString(),
                estimatedCostETH: (parseFloat(estimatedCost.toString()) / 1e18).toFixed(6),
                sponsoredCost: '$0.00',
                sponsorshipActive: true
            }
        });
    } catch (error) {
        console.error('Error estimating deployment gas:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to estimate deployment gas'
        });
    }
};

/**
 * Monitor deployment transaction
 */
export const monitorDeployment = async (req: Request, res: Response) => {
    try {
        const { transactionHash } = req.params;

        // Get transaction receipt
        const receipt = await alchemy.core.getTransactionReceipt(transactionHash);
        
        if (!receipt) {
            return res.json({
                success: true,
                data: {
                    status: 'pending',
                    message: 'Transaction is still pending'
                }
            });
        }

        // Get transaction details
        const transaction = await alchemy.core.getTransaction(transactionHash);

        const deploymentInfo = {
            status: receipt.status === 1 ? 'success' : 'failed',
            deployedAddress: receipt.contractAddress,
            blockNumber: receipt.blockNumber,
            gasUsed: receipt.gasUsed.toString(),
            gasPrice: transaction?.gasPrice?.toString() || '0',
            transactionHash: receipt.transactionHash,
            confirmations: receipt.confirmations
        };

        res.json({
            success: true,
            data: deploymentInfo
        });
    } catch (error) {
        console.error('Error monitoring deployment:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to monitor deployment'
        });
    }
};

/**
 * Verify deployed contract
 */
export const verifyDeployedContract = async (req: Request, res: Response) => {
    try {
        const { contractAddress } = req.params;

        // Get contract bytecode
        const bytecode = await alchemy.core.getCode(contractAddress);
        
        if (bytecode === '0x') {
            return res.json({
                success: false,
                error: 'No contract found at the specified address'
            });
        }

        // Get contract balance
        const balance = await alchemy.core.getBalance(contractAddress);

        // Check if contract is verified on Etherscan (mock for now)
        const verificationInfo = {
            contractAddress,
            isContract: bytecode !== '0x',
            bytecodeLength: bytecode.length,
            balance: balance.toString(),
            balanceETH: (parseFloat(balance.toString()) / 1e18).toFixed(6),
            isVerified: false, // This would require Etherscan API integration
            verificationStatus: 'pending'
        };

        res.json({
            success: true,
            data: verificationInfo
        });
    } catch (error) {
        console.error('Error verifying deployed contract:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to verify deployed contract'
        });
    }
};

/**
 * Get ETHGRecovery contract interaction data
 */
export const getContractInteractionData = async (req: Request, res: Response) => {
    try {
        const { contractAddress } = req.params;

        // ETHGRecovery contract ABI for key functions
        const contractABI = [
            "function migrateMyTrappedETHG() external",
            "function emergencyWithdraw() external",
            "function toggleMigration() external",
            "function hasMigrated(address) view returns (bool)",
            "function migrationEnabled() view returns (bool)",
            "function totalSupply() view returns (uint256)",
            "function balanceOf(address) view returns (uint256)"
        ];

        const interactionData = {
            contractAddress,
            abi: contractABI,
            keyFunctions: [
                {
                    name: 'migrateMyTrappedETHG',
                    description: 'Mint 1,990,000 ETHGR tokens to owner wallet',
                    gasEstimate: '150000',
                    sponsored: true
                },
                {
                    name: 'emergencyWithdraw',
                    description: 'Withdraw any ETH held by the contract',
                    gasEstimate: '50000',
                    sponsored: true
                },
                {
                    name: 'toggleMigration',
                    description: 'Enable or disable migration functionality',
                    gasEstimate: '30000',
                    sponsored: true
                }
            ],
            ownerFunctions: ['migrateMyTrappedETHG', 'emergencyWithdraw', 'toggleMigration'],
            viewFunctions: ['hasMigrated', 'migrationEnabled', 'totalSupply', 'balanceOf']
        };

        res.json({
            success: true,
            data: interactionData
        });
    } catch (error) {
        console.error('Error getting contract interaction data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get contract interaction data'
        });
    }
};