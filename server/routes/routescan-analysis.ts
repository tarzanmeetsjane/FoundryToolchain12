
import { Router } from 'express';
import { routescanAnalyzer } from '../routescan-analyzer';

const router = Router();

// Get ERC20 transfers for any address
router.get('/erc20-transfers/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const {
      excludedChainIds,
      ecosystem,
      sort,
      limit
    } = req.query;

    const result = await routescanAnalyzer.getERC20Transfers(address, {
      excludedChainIds: excludedChainIds as string,
      ecosystem: ecosystem as string,
      sort: sort as 'asc' | 'desc',
      limit: limit ? parseInt(limit as string) : undefined
    });

    res.json({
      success: true,
      address,
      ...result
    });
  } catch (error) {
    console.error('ERC20 transfers analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze ERC20 transfers'
    });
  }
});

// Get foundation wallet specific analysis
router.get('/foundation-wallet-activity', async (req, res) => {
  try {
    const result = await routescanAnalyzer.getFoundationWalletActivity();
    res.json(result);
  } catch (error) {
    console.error('Foundation wallet analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze foundation wallet activity'
    });
  }
});

// Quick ETHG transfer lookup
router.get('/ethg-transfers/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    const result = await routescanAnalyzer.getERC20Transfers(address, {
      limit: 200
    });

    // Filter for ETHG-related transfers
    const ethgTransfers = result.transfers.filter(t => 
      t.tokenSymbol.toLowerCase().includes('ethg') ||
      t.tokenName.toLowerCase().includes('ethg') ||
      t.tokenAddress.toLowerCase() === "0xc2b6d375b7d14c9ce73f97ddf565002cce257308" ||
      t.tokenAddress.toLowerCase() === "0x3fc29836e84e471a053d2d9e80494a867d670ead"
    );

    res.json({
      success: true,
      address,
      ethgTransfers,
      totalETHGTransfers: ethgTransfers.length,
      analysis: {
        ...result.analysis,
        ethgSpecific: {
          hasETHGActivity: ethgTransfers.length > 0,
          lastETHGTransfer: ethgTransfers[0] || null,
          ethgTokensFound: [...new Set(ethgTransfers.map(t => t.tokenSymbol))]
        }
      }
    });
  } catch (error) {
    console.error('ETHG transfers analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze ETHG transfers'
    });
  }
});

export default router;
