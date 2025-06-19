import { ConnectKitButton } from 'connectkit'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'

export function WalletConnectButton() {
  const { address, isConnected, chain } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()
  const { toast } = useToast()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const openExplorer = () => {
    if (address && chain) {
      const explorerUrl = chain.blockExplorers?.default.url
      if (explorerUrl) {
        window.open(`${explorerUrl}/address/${address}`, '_blank')
      }
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const isETHGROwner = address?.toLowerCase() === "0x058c8fe01e5c9eac6ee19e6673673b549b368843"

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={`gap-2 ${isETHGROwner ? 'border-green-500 bg-green-50' : ''}`}>
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">
              {ensName || formatAddress(address)}
              {isETHGROwner && " ✓"}
            </span>
            <span className="sm:hidden">
              {ensName || formatAddress(address)}
              {isETHGROwner && " ✓"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">
                {ensName || formatAddress(address)}
                {isETHGROwner && " ✓ ETHGR Owner"}
              </p>
              <p className="text-xs text-muted-foreground">
                Connected to {chain?.name}
              </p>
              {isETHGROwner && (
                <p className="text-xs text-green-600 font-medium">
                  Authorized for ETHGR Migration
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openExplorer} className="cursor-pointer">
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Explorer
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => disconnect()} className="cursor-pointer text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <Button onClick={show} variant="default" className="gap-2">
            <Wallet className="h-4 w-4" />
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}