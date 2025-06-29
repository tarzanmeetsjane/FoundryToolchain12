
import { useAccount } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertTriangle, Wallet } from 'lucide-react'

export function WalletVerification() {
  const { address, isConnected } = useAccount()
  
  const ETHGR_OWNER = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
  const isCorrectWallet = address?.toLowerCase() === ETHGR_OWNER.toLowerCase()
  
  if (!isConnected) {
    return (
      <Alert>
        <Wallet className="h-4 w-4" />
        <AlertDescription>
          Please connect your wallet to verify ETHGR ownership
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Connected Address:</span>
          <span className="text-sm font-mono">{address?.slice(0, 10)}...{address?.slice(-8)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">ETHGR Owner Address:</span>
          <span className="text-sm font-mono">{ETHGR_OWNER.slice(0, 10)}...{ETHGR_OWNER.slice(-8)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {isCorrectWallet ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
                ✓ Correct Wallet Connected
              </Badge>
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <Badge variant="destructive">
                ⚠ Different Wallet Connected
              </Badge>
            </>
          )}
        </div>
        
        {isCorrectWallet && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Authorized:</strong> You can now access ETHGR migration features with 1,990,000 ETHGR tokens
            </AlertDescription>
          </Alert>
        )}
        
        {!isCorrectWallet && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Note:</strong> This wallet is not the ETHGR contract owner. Please connect the wallet ending in ...368843 to access migration features.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
