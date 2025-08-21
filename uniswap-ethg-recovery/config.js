// ETHG Recovery System Configuration
const CONFIG = {
    // Network Configuration
    NETWORKS: {
        MAINNET: {
            chainId: 1,
            name: 'Ethereum Mainnet',
            rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
            explorer: 'https://etherscan.io',
            uniswapRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap V2
            uniswapV3Router: '0xE592427A0AEce92De3Edee1F18E0157C05861564', // Uniswap V3
            wethAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
        },
        SEPOLIA: {
            chainId: 11155111,
            name: 'Sepolia Testnet',
            rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
            explorer: 'https://sepolia.etherscan.io',
            uniswapRouter: '0xC532a74256D3Db4D444bb7B4c3C5d1c4C5d1c4C5', // Placeholder
            uniswapV3Router: '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E', // Placeholder
            wethAddress: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14'
        }
    },

    // ETHG Token Addresses (Mainnet)
    ETHG_TOKENS: {
        // Main ETHG token (if it exists)
        MAIN_ETHG: '0x0000000000000000000000000000000000000000', // Replace with actual address
        
        // Alternative ETHG tokens that might exist
        ETHG_V1: '0x0000000000000000000000000000000000000000', // Replace if found
        ETHG_V2: '0x0000000000000000000000000000000000000000', // Replace if found
        
        // Test tokens for development
        TEST_ETHG: '0x0000000000000000000000000000000000000000' // Replace with test token
    },

    // Recovery Settings
    RECOVERY: {
        DEFAULT_SLIPPAGE: 1.0, // 1% default slippage tolerance
        MAX_SLIPPAGE: 5.0, // 5% maximum slippage tolerance
        MIN_SLIPPAGE: 0.1, // 0.1% minimum slippage tolerance
        
        GAS_LIMIT: {
            APPROVE: 50000, // Gas limit for token approval
            SWAP: 200000, // Gas limit for token swap
            META_TX: 250000 // Gas limit for meta-transactions
        },
        
        DEADLINE_MINUTES: 20, // Transaction deadline in minutes
        
        PRICE_IMPACT_WARNING: 3.0, // Warn if price impact > 3%
        PRICE_IMPACT_MAX: 10.0 // Reject if price impact > 10%
    },

    // UI Settings
    UI: {
        REFRESH_INTERVAL: 30000, // Refresh wallet info every 30 seconds
        MESSAGE_DISPLAY_TIME: 5000, // Show messages for 5 seconds
        LOADING_TIMEOUT: 60000, // Loading timeout after 1 minute
        
        DECIMALS: {
            ETH: 18,
            ETHG: 18, // Adjust based on actual token
            USD: 2
        }
    },

    // API Endpoints
    APIs: {
        ETHEREUM_PRICE: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
        ETHG_PRICE: 'https://api.coingecko.com/api/v3/simple/price?ids=ethg&vs_currencies=usd',
        GAS_TRACKER: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle',
        UNISWAP_GRAPH: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
    },

    // Error Messages
    ERRORS: {
        WALLET_NOT_FOUND: 'MetaMask not found! Please install MetaMask.',
        WRONG_NETWORK: 'Please switch to Ethereum Mainnet to use this recovery system.',
        INSUFFICIENT_BALANCE: 'Insufficient ETHG balance for recovery.',
        APPROVAL_FAILED: 'Token approval failed. Please try again.',
        SWAP_FAILED: 'ETHG recovery failed. Please check your settings and try again.',
        HIGH_SLIPPAGE: 'Slippage is too high. Please adjust your settings.',
        HIGH_PRICE_IMPACT: 'Price impact is too high. Consider reducing the swap amount.',
        NETWORK_ERROR: 'Network error. Please check your connection and try again.'
    },

    // Success Messages
    SUCCESS: {
        WALLET_CONNECTED: 'Wallet connected successfully!',
        TOKENS_APPROVED: 'Tokens approved for swap!',
        RECOVERY_SUCCESS: 'ETHG recovery successful! You now have ETH!',
        BALANCE_UPDATED: 'Wallet balance updated!'
    },

    // Help and Documentation
    HELP: {
        WHAT_IS_ETHG: 'ETHG is a token that represents trapped value that victims are trying to recover.',
        HOW_RECOVERY_WORKS: 'This system uses Uniswap to swap your trapped ETHG tokens for ETH directly.',
        WHY_UNISWAP: 'Uniswap provides immediate liquidity and is a trusted, decentralized exchange.',
        SLIPPAGE_EXPLANATION: 'Slippage is the difference between expected and actual swap price due to market movement.',
        PRICE_IMPACT: 'Price impact measures how much your swap affects the market price of ETHG.',
        GAS_FEES: 'Gas fees are required to execute transactions on the Ethereum network.'
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.ETHG_CONFIG = CONFIG;
}


