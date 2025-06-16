import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const RECOVERY_ADDRESS = '0x058C8FE01E5c9eaC6ee19e6673673B549B368843';
const CONTRACT_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138';

export default function ETHGRecovery() {
  const [isExecuting, setIsExecuting] = useState(false);

  // Check recovery status
  const { data: recoveryStatus, isLoading } = useQuery({
    queryKey: ['/api/recovery/status', RECOVERY_ADDRESS],
    refetchInterval: 10000, // Check every 10 seconds
  });

  // Execute gasless migration
  const executeMigration = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/recovery/execute-gasless', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAddress: RECOVERY_ADDRESS })
      });
      if (!response.ok) throw new Error('Migration failed');
      return response.json();
    },
    onSuccess: () => {
      setIsExecuting(false);
    },
    onError: () => {
      setIsExecuting(false);
    }
  });

  const handleExecuteRecovery = async () => {
    setIsExecuting(true);
    executeMigration.mutate();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center">
                <Clock className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading recovery status...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">ETHG Token Recovery</h1>
          <p className="text-muted-foreground mt-2">
            Recover your trapped ETHG tokens as fully transferable ETHGR tokens
          </p>
        </div>

        {/* Recovery Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Recovery Contract Status
            </CardTitle>
            <CardDescription>
              Your recovery contract has been successfully deployed to Ethereum mainnet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Contract Address</div>
                <div className="font-mono text-sm bg-muted p-2 rounded">
                  {CONTRACT_ADDRESS}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Your Wallet</div>
                <div className="font-mono text-sm bg-muted p-2 rounded">
                  {RECOVERY_ADDRESS}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Tokens to Recover</div>
                <div className="text-2xl font-bold">1,990,000 ETHGR</div>
              </div>
              <Badge variant="secondary">
                {(recoveryStatus as any)?.migrationCompleted ? 'Completed' : 'Pending'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recovery Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Execute Token Recovery</CardTitle>
            <CardDescription>
              Use the gasless migration service to recover your tokens without paying gas fees
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {(recoveryStatus as any)?.migrationCompleted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Migration Completed!</h3>
                <p className="text-muted-foreground">
                  Your 1,990,000 ETHGR tokens have been successfully recovered
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                        Gasless Recovery Available
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                        Your recovery contract is deployed and ready. The gas relay service will execute 
                        your migration without requiring you to pay gas fees.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleExecuteRecovery}
                    disabled={isExecuting || executeMigration.isPending}
                    className="w-full"
                    size="lg"
                  >
                    {isExecuting || executeMigration.isPending ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Get Recovery Instructions'
                    )}
                  </Button>

                  <div className="text-center">
                    <Button 
                      onClick={() => window.open('https://remix.ethereum.org/', '_blank')}
                      variant="outline"
                      className="w-full"
                    >
                      Open Remix IDE
                    </Button>
                  </div>
                </div>

                {executeMigration.isError && (
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-200">
                      Recovery failed. Please try again or contact support.
                    </p>
                  </div>
                )}

                {executeMigration.isSuccess && (
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Recovery Ready!</h4>
                    <div className="text-sm text-green-700 dark:text-green-200">
                      <p className="mb-2">Complete the migration in Remix:</p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Open Remix IDE (click button above)</li>
                        <li>Go to "Deploy & Run Transactions" tab</li>
                        <li>In "At Address" field: <code className="bg-green-100 dark:bg-green-900 px-1 rounded">0xd9145CCE52D386f254917e481eB44e9943F39138</code></li>
                        <li>Click "At Address" button</li>
                        <li>Find and click the red "migrateMyTrappedETHG" button</li>
                        <li>In MetaMask: Set Max Fee to 2 gwei, Priority to 1 gwei</li>
                        <li>Confirm transaction</li>
                      </ol>
                      <p className="mt-2 font-medium">Result: 1,990,000 ETHGR tokens will appear in your wallet!</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contract Links */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Information</CardTitle>
            <CardDescription>
              View your recovery contract and transaction details on Etherscan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href={`https://etherscan.io/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-4 w-4" />
                View Recovery Contract on Etherscan
              </a>
              <a
                href={`https://etherscan.io/address/${RECOVERY_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-4 w-4" />
                View Your Wallet on Etherscan
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Recovery Details */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <div className="font-semibold">Contract Deployed</div>
                  <div className="text-muted-foreground">Your recovery contract is live on Ethereum mainnet</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <div className="font-semibold">Gasless Execution</div>
                  <div className="text-muted-foreground">Gas relay service executes migration without you paying fees</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <div className="font-semibold">Tokens Recovered</div>
                  <div className="text-muted-foreground">1,990,000 ETHGR tokens minted to your wallet with full transfer capability</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}