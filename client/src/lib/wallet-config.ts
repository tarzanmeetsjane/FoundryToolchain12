import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon, bsc, arbitrum, optimism, base } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Environment detection
const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD

// Get project ID with fallback for development
const getProjectId = () => {
  const envProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
  if (envProjectId) return envProjectId
  
  // Only use demo ID in development
  return isDevelopment ? 'demo-project-id' : undefined
}

// Get proper metadata URL based on environment
const getAppMetadata = () => {
  let baseUrl: string
  
  if (isDevelopment) {
    baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000'
  } else {
    baseUrl = 'https://quantum-secure-trader.replit.app'
  }
  
  return {
    name: 'Quantum Secure Trader',
    description: 'Multi-Chain DeFi Analytics Platform',
    url: baseUrl,
    icons: [`${baseUrl}/favicon.ico`]
  }
}

// Create connectors with proper configuration
const getConnectors = () => {
  const projectId = getProjectId()
  const connectors = [injected(), metaMask()]
  
  // Only add WalletConnect if we have a valid project ID
  if (projectId) {
    connectors.push(
      walletConnect({
        projectId,
        metadata: getAppMetadata(),
        showQrModal: true,
        qrModalOptions: {
          themeMode: 'light',
          themeVariables: {
            '--wcm-z-index': '9999'
          }
        }
      })
    )
  }
  
  return connectors
}

// Create wagmi configuration
export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygon, bsc, arbitrum, optimism, base],
  connectors: getConnectors(),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
  ssr: false
})

// Export default config for backward compatibility
export { wagmiConfig as config }