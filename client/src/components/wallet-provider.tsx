import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import { wagmiConfig } from '@/lib/wallet-config'

// Singleton QueryClient to prevent re-initialization
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

interface WalletProviderProps {
  children: React.ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="rounded"
          mode="auto"
          options={{
            hideBalance: false,
            hideTooltips: false,
            hideQuestionMarkCTA: true,
            hideNoWalletCTA: false,
            walletConnectCTA: "both",
            reducedMotion: false,
            disclaimer: null,
            bufferPolyfill: false
          }}
          customTheme={{
            "--ck-border-radius": "8px",
            "--ck-primary-button-border-radius": "8px",
            "--ck-secondary-button-border-radius": "8px",
            "--ck-tertiary-button-border-radius": "8px",
            "--ck-primary-button-color": "hsl(var(--primary))",
            "--ck-primary-button-background": "hsl(var(--primary))",
            "--ck-primary-button-hover-background": "hsl(var(--primary))",
            "--ck-font-family": "inherit",
            "--ck-modal-box-shadow": "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}