import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { config } from '@/lib/wagmi-config'

const queryClient = new QueryClient()

interface WalletProviderProps {
  children: React.ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="rounded"
          mode="light"
          customTheme={{
            "--ck-border-radius": "8px",
            "--ck-primary-button-border-radius": "8px",
            "--ck-secondary-button-border-radius": "8px",
            "--ck-tertiary-button-border-radius": "8px",
            "--ck-primary-button-color": "hsl(var(--primary))",
            "--ck-primary-button-background": "hsl(var(--primary))",
            "--ck-primary-button-hover-background": "hsl(var(--primary))",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}