import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Wallet,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function WalletRecoveryDashboard() {
  const [selectedFunction, setSelectedFunction] = useState("");
  const [parameters, setParameters] = useState("");
  const queryClient = useQueryClient();

  // Get wallet information
  const { data: walletInfo, isLoading: walletLoading } = useQuery({
    queryKey: ['/api/wallet/info'],
    refetchInterval: 10000
  });

  // Get June 15 analysis
  const { data: analysisData, isLoading: analysisLoading } = useQuery({
    queryKey: ['/api/recovery/june15-analysis'],
    refetchInterval: 30000
  });

  // Get proxy analysis
  const { data: proxyData, isLoading: proxyLoading } = useQuery({
    queryKey: ['/api/recovery/proxy-analysis/0xd816c710dc011db6d357e2b1210eafc60177338f'],
    refetchInterval: 30000
  });

  // Execute recovery transaction
  const executeMutation = useMutation({
    mutationFn: async (params: any) => {
      const response = await fetch('/api/recovery/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wallet/info'] });
      queryClient.invalidateQueries({ queryKey: ['/api/recovery/june15-analysis'] });
    }
  });

  const executeRecovery = () => {
    if (!selectedFunction) return;
    
    const params = {
      contractAddress: "0xd816c710dc011db6d357e2b1210eafc60177338f",
      functionSignature: selectedFunction,
      parameters: parameters ? JSON.parse(parameters) : [],
      value: "0"
    };
    
    executeMutation.mutate(params);
  };

  const proxyFunctions = [
    "admin() returns (address)",
    "implementation() returns (address)", 
    "upgradeTo(address newImplementation)",
    "upgradeToAndCall(address newImplementation, bytes data)",
    "changeAdmin(address newAdmin)"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">37 ETH Recovery Dashboard</h1>
          <p className="text-muted-foreground">
            Execute proxy contract functions to recover trapped ETH
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open('/eth-recovery-analyzer', '_blank')}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Analysis Tool
          </Button>
        </div>
      </div>

      <Alert className="border-orange-500 bg-orange-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Recovery Status:</strong> Proxy contract detected with potential admin access. 
          Use the functions below to attempt ETH recovery from the uninitialized proxy.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Current Wallet Status
            </CardTitle>
            <CardDescription>Your recovery wallet information</CardDescription>
          </CardHeader>
          <CardContent>
            {walletLoading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Loading wallet info...
              </div>
            ) : walletInfo?.success ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="font-semibold text-blue-700">Wallet Address</div>
                    <div className="text-sm font-mono">
                      {walletInfo.data.address.slice(0, 10)}...{walletInfo.data.address.slice(-8)}
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <div className="font-semibold text-green-700">ETH Balance</div>
                    <div className="text-lg font-bold">
                      {walletInfo.data.balance.toFixed(4)} ETH
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Private Key Access:</span>
                  <Badge variant={walletInfo.data.hasPrivateKey ? 'default' : 'destructive'}>
                    {walletInfo.data.hasPrivateKey ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {walletInfo.data.hasPrivateKey ? 'Available' : 'Missing'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Connection Status:</span>
                  <Badge variant={walletInfo.data.isConnected ? 'default' : 'destructive'}>
                    {walletInfo.data.isConnected ? 'Connected' : 'Disconnected'}
                  </Badge>
                </div>
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>Failed to load wallet information</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Proxy Contract Status
            </CardTitle>
            <CardDescription>Target contract: 0xd816...338f</CardDescription>
          </CardHeader>
          <CardContent>
            {proxyLoading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Analyzing proxy...
              </div>
            ) : proxyData?.success ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-purple-50 rounded">
                    <div className="font-semibold text-purple-700">Proxy Balance</div>
                    <div className="text-lg font-bold">
                      {proxyData.data.proxyBalance} ETH
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${(parseFloat(proxyData.data.proxyBalance) * 2422).toFixed(2)} USD
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded">
                    <div className="font-semibold text-yellow-700">Recovery Status</div>
                    <div className="text-sm">
                      {proxyData.data.canRecover ? 'Possible' : 'Investigating'}
                    </div>
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="font-semibold mb-1">Implementation:</div>
                  <div className="font-mono text-xs">
                    {proxyData.data.implementationAddress || 'Not set (0x000...)'}
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="font-semibold mb-1">Admin:</div>
                  <div className="font-mono text-xs">
                    {proxyData.data.adminAddress || 'Not set (0x000...)'}
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="font-semibold mb-1">Recovery Method:</div>
                  <div className="text-xs text-muted-foreground">
                    {proxyData.data.recoveryMethod}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Proxy analysis pending...
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Execute Recovery Functions
          </CardTitle>
          <CardDescription>
            Try proxy admin functions to recover the 37 ETH
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="function">Proxy Function</Label>
            <select 
              className="w-full p-2 border rounded mt-1"
              value={selectedFunction}
              onChange={(e) => setSelectedFunction(e.target.value)}
            >
              <option value="">Select a function to execute...</option>
              {proxyFunctions.map((func, index) => (
                <option key={index} value={func}>{func}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="params">Parameters (JSON array)</Label>
            <Input 
              id="params"
              value={parameters}
              onChange={(e) => setParameters(e.target.value)}
              placeholder='["0x1234..."] or [] for no parameters'
            />
          </div>

          <Button 
            onClick={executeRecovery}
            disabled={!selectedFunction || executeMutation.isPending || !walletInfo?.data?.isConnected}
            className="w-full"
          >
            {executeMutation.isPending ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Zap className="h-4 w-4 mr-2" />
            )}
            Execute Recovery Function
          </Button>

          {executeMutation.data && (
            <Alert className={executeMutation.data.data?.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
              <AlertDescription>
                {executeMutation.data.data?.success ? (
                  <div>
                    <strong>Success!</strong> Transaction: {executeMutation.data.data.transactionHash}
                  </div>
                ) : (
                  <div>
                    <strong>Failed:</strong> {executeMutation.data.data?.error || 'Unknown error'}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {analysisData?.success && (
        <Card>
          <CardHeader>
            <CardTitle>June 15 Transaction Analysis</CardTitle>
            <CardDescription>Searching for 37 ETH transfer history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-semibold">Current Wallet</div>
                <div className="text-xs font-mono">
                  {analysisData.data.currentWallet?.slice(0, 10)}...
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-semibold">Old Wallet</div>
                <div className="text-xs font-mono">
                  {analysisData.data.oldWallet?.slice(0, 10)}...
                </div>
              </div>
              <div className="p-3 bg-red-50 rounded">
                <div className="font-semibold text-red-700">ETH Sent Out</div>
                <div className="text-lg font-bold">
                  {analysisData.data.totalETHOut?.toFixed(4)} ETH
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold text-blue-700">Recovery Status</div>
                <div className="text-sm">
                  {analysisData.data.recoveryPossible ? 'Possible' : 'Investigating'}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm">
              <div className="font-semibold mb-2">Strategy:</div>
              <div className="text-muted-foreground">
                {analysisData.data.strategy}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}