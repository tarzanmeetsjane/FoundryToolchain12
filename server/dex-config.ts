// Multi-DEX platform configurations
export interface DexConfig {
  name: string;
  displayName: string;
  chainId: number;
  chainName: string;
  swapEventTopic: string;
  routerAddress?: string;
  factoryAddress?: string;
  explorerUrl: string;
  apiEndpoint?: string;
  isActive: boolean;
}

export const DEX_CONFIGS: DexConfig[] = [
  // Ethereum Mainnet DEXs
  {
    name: "uniswap",
    displayName: "Uniswap V3",
    chainId: 1,
    chainName: "Ethereum",
    swapEventTopic: "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67",
    factoryAddress: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    explorerUrl: "https://etherscan.io",
    isActive: true,
  },
  {
    name: "sushiswap",
    displayName: "SushiSwap",
    chainId: 1,
    chainName: "Ethereum",
    swapEventTopic: "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
    routerAddress: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    factoryAddress: "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac",
    explorerUrl: "https://etherscan.io",
    isActive: true,
  },
  // Binance Smart Chain DEXs
  {
    name: "pancakeswap",
    displayName: "PancakeSwap V3",
    chainId: 56,
    chainName: "BSC",
    swapEventTopic: "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67",
    routerAddress: "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4",
    factoryAddress: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
    explorerUrl: "https://bscscan.com",
    apiEndpoint: "https://api.bscscan.com/api",
    isActive: true,
  },
  // Polygon DEXs
  {
    name: "uniswap-polygon",
    displayName: "Uniswap V3 (Polygon)",
    chainId: 137,
    chainName: "Polygon",
    swapEventTopic: "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67",
    factoryAddress: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    explorerUrl: "https://polygonscan.com",
    apiEndpoint: "https://api.polygonscan.com/api",
    isActive: true,
  },
  {
    name: "quickswap",
    displayName: "QuickSwap",
    chainId: 137,
    chainName: "Polygon", 
    swapEventTopic: "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
    routerAddress: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
    factoryAddress: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32",
    explorerUrl: "https://polygonscan.com",
    apiEndpoint: "https://api.polygonscan.com/api",
    isActive: true,
  },
];

export const getExplorerApiUrl = (chainId: number): string => {
  const config = DEX_CONFIGS.find(c => c.chainId === chainId);
  if (!config) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  
  switch (chainId) {
    case 1: // Ethereum
      return "https://api.etherscan.io/v2/api";
    case 56: // BSC
      return "https://api.bscscan.com/api";
    case 137: // Polygon
      return "https://api.polygonscan.com/api";
    default:
      throw new Error(`No API endpoint configured for chain ID: ${chainId}`);
  }
};

export const getApiKeyForChain = (chainId: number): string => {
  switch (chainId) {
    case 1: // Ethereum
      return process.env.ETHERSCAN_API_KEY || "YourApiKeyToken";
    case 56: // BSC
      return process.env.BSCSCAN_API_KEY || process.env.ETHERSCAN_API_KEY || "YourApiKeyToken";
    case 137: // Polygon
      return process.env.POLYGONSCAN_API_KEY || process.env.ETHERSCAN_API_KEY || "YourApiKeyToken";
    default:
      return process.env.ETHERSCAN_API_KEY || "YourApiKeyToken";
  }
};