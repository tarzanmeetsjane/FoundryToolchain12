import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, CheckCircle, XCircle, ExternalLink, Copy, AlertTriangle, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ContractVerificationPage() {
  const [contractAddress, setContractAddress] = useState("0xfA7b8c553C48C56ec7027d26ae95b029a2abF247");

  // Get Etherscan verification details
  const { data: verificationData, isLoading, refetch } = useQuery({
    queryKey: [`/api/etherscan/contract/${contractAddress}`],
    queryFn: async () => {
      const response = await fetch(`/api/etherscan/contract/${contractAddress}`);
      if (!response.ok) throw new Error('Failed to fetch verification data');
      return response.json();
    },
    enabled: false
  });

  const handleVerify = () => {
    if (contractAddress) {
      refetch();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Contract Verification</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Verify contract details on Etherscan before proceeding with token launch
        </p>
      </div>

      {/* Verification Input */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Etherscan Contract Verification
          </CardTitle>
          <CardDescription>
            Enter your ETHGR contract address to verify its status on Etherscan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="contract">Contract Address</Label>
              <Input
                id="contract"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x..."
                className="font-mono"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleVerify}
                disabled={!contractAddress || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Verifying...' : 'Verify on Etherscan'}
              </Button>
            </div>
          </div>

          {/* Quick Contract Options */}
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setContractAddress("0xfA7b8c553C48C56ec7027d26ae95b029a2abF247")}
            >
              ETHGR Recovery Contract
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setContractAddress("0xd9145CCE52D386f254917e481eB44e9943F39138")}
            >
              Original ETHG (Broken)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Results */}
      {verificationData && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="token">Token Details</TabsTrigger>
            <TabsTrigger value="source">Source Code</TabsTrigger>
            <TabsTrigger value="actions">Next Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Verification Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    {verificationData.isVerified ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {verificationData.isVerified ? 'VERIFIED' : 'NOT VERIFIED'}
                  </div>
                  <Badge variant={verificationData.isVerified ? 'default' : 'destructive'}>
                    {verificationData.isVerified ? 'Source Code Available' : 'Unverified Contract'}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Contract Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{verificationData.contractName}</div>
                  <p className="text-sm text-gray-600">Compiler: {verificationData.compilerVersion}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Contract Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {verificationData.proxy ? 'Proxy' : 'Standard'}
                  </div>
                  <Badge variant={verificationData.proxy ? 'secondary' : 'default'}>
                    {verificationData.tokenDetails ? 'ERC-20 Token' : 'Smart Contract'}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Contract Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contract Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Contract Address</Label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                      {verificationData.contractAddress}
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(verificationData.contractAddress)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Creator Address</Label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                      {verificationData.creator || 'Unknown'}
                      {verificationData.creator && (
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(verificationData.creator)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Creation Transaction</Label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                      {verificationData.creationTx ? (
                        <>
                          {verificationData.creationTx.slice(0, 10)}...{verificationData.creationTx.slice(-6)}
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(verificationData.creationTx)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        'Unknown'
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Etherscan Link</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(verificationData.etherscanUrl, '_blank')}
                      className="w-full"
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View on Etherscan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="token" className="space-y-6">
            {verificationData.tokenDetails ? (
              <>
                {/* Token Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Token Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <div className="text-lg font-bold">{verificationData.tokenDetails.name}</div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Symbol</Label>
                        <div className="text-lg font-bold">{verificationData.tokenDetails.symbol}</div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Decimals</Label>
                        <div className="text-lg font-bold">{verificationData.tokenDetails.decimals}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Supply Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label className="text-sm font-medium">Total Supply</Label>
                        <div className="text-2xl font-bold text-green-600">
                          {verificationData.tokenDetails.totalSupply}
                        </div>
                        <p className="text-sm text-gray-600">
                          {verificationData.tokenDetails.symbol} tokens
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Token Status */}
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    <strong>ERC-20 Token Confirmed:</strong> This is a valid ERC-20 token contract with 
                    {verificationData.tokenDetails.totalSupply} {verificationData.tokenDetails.symbol} tokens available.
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  <strong>Token Details Unavailable:</strong> Unable to retrieve ERC-20 token information. 
                  This may indicate the contract is not a standard token or is not functioning properly.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="source" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Source Code Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                {verificationData.isVerified ? (
                  <div className="space-y-4">
                    <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800 dark:text-green-200">
                        <strong>Source Code Verified:</strong> Contract source code is publicly available and verified on Etherscan.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <Label className="text-sm font-medium">Compiler Information</Label>
                      <div className="text-sm mt-1">
                        <div>Version: {verificationData.compilerVersion}</div>
                        <div>Optimization: {verificationData.optimization ? 'Enabled' : 'Disabled'}</div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => window.open(`${verificationData.etherscanUrl}#code`, '_blank')}
                      className="w-full"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Source Code on Etherscan
                    </Button>
                  </div>
                ) : (
                  <Alert className="border-red-200 bg-red-50 dark:bg-red-950">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      <strong>Source Code Not Verified:</strong> The contract source code has not been verified on Etherscan. 
                      This makes it difficult to confirm the contract's functionality and security.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Next Steps</CardTitle>
                <CardDescription>
                  Based on the verification results, here are the recommended actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {verificationData.isVerified && verificationData.tokenDetails ? (
                  <div className="space-y-4">
                    <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800 dark:text-green-200">
                        <strong>Contract Verified - Ready for Launch:</strong> Your ETHGR contract is verified and functional. 
                        You can proceed with creating a Uniswap pool to establish market value.
                      </AlertDescription>
                    </Alert>

                    <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Ready for Market Launch</h4>
                      <div className="space-y-2 text-sm">
                        <div>✅ Contract verified on Etherscan</div>
                        <div>✅ ERC-20 token standard confirmed</div>
                        <div>✅ Total supply: {verificationData.tokenDetails.totalSupply} {verificationData.tokenDetails.symbol}</div>
                        <div>✅ Ready for Uniswap pool creation</div>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => window.location.href = '/token-launch'}
                    >
                      Proceed to Token Launch Hub
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert className="border-red-200 bg-red-50 dark:bg-red-950">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800 dark:text-red-200">
                        <strong>Verification Issues Detected:</strong> The contract has verification or functionality issues. 
                        Do not proceed with token launch until these are resolved.
                      </AlertDescription>
                    </Alert>

                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Required Actions</h4>
                      <div className="space-y-2 text-sm">
                        <div>❌ {verificationData.isVerified ? '✅' : 'Contract not verified on Etherscan'}</div>
                        <div>❌ {verificationData.tokenDetails ? '✅' : 'ERC-20 functions not accessible'}</div>
                        <div>⚠️ Review contract before proceeding</div>
                        <div>⚠️ Consider redeploying if necessary</div>
                      </div>
                    </div>

                    <Button 
                      variant="outline"
                      className="w-full" 
                      onClick={() => window.open(verificationData.etherscanUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Investigate on Etherscan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}