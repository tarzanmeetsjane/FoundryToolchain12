import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon, bsc, arbitrum, optimism, base } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Wallet Connect project ID - you'll need to get this from WalletConnect
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

// Dynamic metadata based on current environment
const getMetadata = () => {
  const isDev = import.meta.env.DEV;
  const baseUrl = isDev 
    ? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000')
    : 'https://quantum-secure-trader.replit.app';
    
  return {
    name: 'Quantum Secure Trader',
    description: 'Multi-Chain DeFi Analytics Platform',
    url: baseUrl,
    icons: [`${baseUrl}/favicon.ico`]
  };
};

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, bsc, arbitrum, optimism, base],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ 
      projectId,
      metadata: getMetadata(),
      showQrModal: true,
      qrModalOptions: {
        themeMode: 'light',
        themeVariables: {
          '--wcm-z-index': '9999'
        }
      }
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
})

// Uniswap V3 contract addresses for different chains
export const UNISWAP_V3_ADDRESSES = {
  [mainnet.id]: {
    factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    positionManager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
  },
  [polygon.id]: {
    factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    positionManager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
  },
  [arbitrum.id]: {
    factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    positionManager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
  },
  [optimism.id]: {
    factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    positionManager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
  },
  [base.id]: {
    factory: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
    router: '0x2626664c2603336E57B271c5C0b26F421741e481',
    positionManager: '0x03a520b32C04BF3bEEf7BF5d4128b4f3c4b2e613',
    quoter: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a'
  }
} as const

export const WETH_ADDRESSES = {
  [mainnet.id]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [polygon.id]: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC
  [arbitrum.id]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  [optimism.id]: '0x4200000000000000000000000000000000000006',
  [base.id]: '0x4200000000000000000000000000000000000006',
  [bsc.id]: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
} as const

// Common ERC20 tokens for each chain
export const COMMON_TOKENS = {
  [mainnet.id]: {
    USDC: '0xA0b86a33E6417d4a4A6e6D86a35F8bb8b6E7F23D',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  [polygon.id]: {
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  },
  [arbitrum.id]: {
    USDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  }
} as const