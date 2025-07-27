const express = require('express');
const { deployWithFoundationWallet } = require('./server-deploy');

const router = express.Router();

// Secure deployment endpoint
router.post('/api/deploy-contract', async (req, res) => {
    try {
        const { privateKey, walletAddress } = req.body;
        
        // Validate request
        if (!privateKey || !walletAddress) {
            return res.status(400).json({
                success: false,
                error: 'Missing private key or wallet address'
            });
        }
        
        // Verify foundation wallet
        if (walletAddress.toLowerCase() !== '0x058c8fe01e5c9eac6ee19e6673673b549b368843') {
            return res.status(400).json({
                success: false,
                error: 'Invalid foundation wallet address'
            });
        }
        
        // Set environment variable temporarily
        process.env.FOUNDATION_PRIVATE_KEY = privateKey;
        
        console.log('🚀 Starting secure server-side deployment...');
        
        // Deploy contract
        const result = await deployWithFoundationWallet();
        
        // Clear private key from environment
        delete process.env.FOUNDATION_PRIVATE_KEY;
        
        if (result.success) {
            res.json({
                success: true,
                contractAddress: result.contractAddress,
                transactionHash: result.transactionHash,
                gasUsed: result.gasUsed,
                message: 'Contract deployed successfully! 1,990,000 ETHGR tokens minted.'
            });
        } else {
            res.status(500).json({
                success: false,
                error: result.error
            });
        }
        
    } catch (error) {
        console.error('Deployment endpoint error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;