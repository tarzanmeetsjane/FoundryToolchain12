import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { CheckCircle, AlertCircle, ExternalLink, Search, FileText, Shield, Zap } from 'lucide-react';

export default function SourcifyVerification() {
  const [verificationResults, setVerificationResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedContract, setSelectedContract] = useState('');

  // Your ETHGR contract addresses
  const ethgrContracts = [
    {
      address: "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9",
      name: "ETHGR Contract 1",
      tokens: "1.99M ETHGR",
      chain: "mainnet",
      status: "Needs Verification"
    },
    {
      address: "0x828e614715BA6bbD32464E4aF5529a1263FB914d",
      name: "ETHGR Contract 2", 
      tokens: "1.99M ETHGR",
      chain: "mainnet",
      status: "Needs Verification"
    }
  ];

  // Sourcify API endpoints
  const sourcifyEndpoints = {
    check: "https://sourcify.dev/server/check-by-addresses",
    files: "https://sourcify.dev/server/files",
    metadata: "https://sourcify.dev/server/metadata",
    verify: "https://sourcify.dev/server/verify"
  };

  const checkContractVerification = async (contractAddress: string) => {
    setLoading(true);
    try {
      // Check if contract is verified on Sourcify
      const checkResponse = await fetch(
        `${sourcifyEndpoints.check}?addresses=${contractAddress}&chainIds=1`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      const checkData = await checkResponse.json();
      
      // Try to get contract metadata
      let metadata = null;
      if (checkData[0]?.status === 'perfect') {
        try {
          const metadataResponse = await fetch(
            `${sourcifyEndpoints.metadata}/1/${contractAddress}`,
            {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              }
            }
          );
          metadata = await metadataResponse.json();
        } catch (err) {
          console.log('Metadata not available');
        }
      }

      setVerificationResults({
        address: contractAddress,
        status: checkData[0]?.status || 'not verified',
        metadata: metadata,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Sourcify verification error:', error);
      setVerificationResults({
        address: contractAddress,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'perfect': return 'bg-green-100 border-green-300 text-green-700';
      case 'partial': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'not verified': return 'bg-red-100 border-red-300 text-red-700';
      case 'error': return 'bg-gray-100 border-gray-300 text-gray-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const formatContractInfo = (metadata: any) => {
    if (!metadata) return null;
    
    return {
      compiler: metadata.compiler?.version || 'Unknown',
      language: metadata.language || 'Solidity',
      name: metadata.output?.devdoc?.title || metadata.output?.userdoc?.title || 'Unknown',
      methods: Object.keys(metadata.output?.abi || []).length,
      optimization: metadata.settings?.optimizer?.enabled ? 'Enabled' : 'Disabled'
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Sourcify Contract Verification
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Verify and Analyze Your ETHGR Smart Contracts
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2 bg-blue-50 border-blue-300 text-blue-700">
          Decentralized Contract Verification Platform
        </Badge>
      </div>

      {/* About Sourcify */}
      <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Shield className="h-6 w-6 mr-3" />
            About Sourcify
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <p className="mb-4">
            Sourcify is a decentralized source code verification service that helps verify smart contracts 
            on Ethereum and other EVM-compatible chains. It provides full transparency by matching 
            deployed bytecode with source code and metadata.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded border">
              <div className="font-semibold">Decentralized</div>
              <div className="text-sm">No single point of failure</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="font-semibold">Full Verification</div>
              <div className="text-sm">Complete source code matching</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="font-semibold">Metadata Rich</div>
              <div className="text-sm">Comprehensive contract details</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="verify" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verify">Verify Contracts</TabsTrigger>
          <TabsTrigger value="results">Verification Results</TabsTrigger>
          <TabsTrigger value="analysis">Contract Analysis</TabsTrigger>
        </TabsList>

        {/* Contract Verification */}
        <TabsContent value="verify" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ETHGR Contract Verification</CardTitle>
              <CardDescription>
                Check if your ETHGR contracts are verified on Sourcify
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {ethgrContracts.map((contract, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold">{contract.name}</div>
                      <div className="font-mono text-sm text-gray-600">{contract.address}</div>
                      <div className="text-sm text-gray-500">{contract.tokens} • {contract.chain}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-yellow-50 border-yellow-300 text-yellow-700">
                        {contract.status}
                      </Badge>
                      <Button 
                        onClick={() => checkContractVerification(contract.address)}
                        disabled={loading}
                        size="sm"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        {loading ? 'Checking...' : 'Verify'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Alert className="bg-green-50 border-green-300">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Verification Benefits:</strong> Verified contracts provide transparency, 
                  enable accurate token recognition, and may resolve the "N/A" value display issues 
                  in your wallet.
                </AlertDescription>
              </Alert>

              <div className="flex justify-center">
                <Button 
                  onClick={() => window.open('https://sourcify.dev/', '_blank')}
                  variant="outline"
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Sourcify.dev
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verification Results */}
        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest Verification Results</CardTitle>
            </CardHeader>
            <CardContent>
              {verificationResults ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-mono text-sm">{verificationResults.address}</div>
                      <div className="text-xs text-gray-500">
                        Checked: {new Date(verificationResults.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <Badge className={getStatusColor(verificationResults.status)}>
                      {verificationResults.status}
                    </Badge>
                  </div>

                  {verificationResults.status === 'perfect' && verificationResults.metadata && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="font-semibold text-green-800 mb-3">✅ Contract Verified!</h3>
                      {(() => {
                        const info = formatContractInfo(verificationResults.metadata);
                        return info ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium">Compiler Version</div>
                              <div className="text-sm text-gray-600">{info.compiler}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Language</div>
                              <div className="text-sm text-gray-600">{info.language}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Contract Name</div>
                              <div className="text-sm text-gray-600">{info.name}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Optimization</div>
                              <div className="text-sm text-gray-600">{info.optimization}</div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}

                  {verificationResults.status === 'not verified' && (
                    <Alert className="border-red-300 bg-red-50">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Contract Not Verified:</strong> This contract is not yet verified on Sourcify. 
                        This could explain why your wallet shows "N/A" values for these tokens.
                      </AlertDescription>
                    </Alert>
                  )}

                  {verificationResults.error && (
                    <Alert className="border-gray-300 bg-gray-50">
                      <AlertCircle className="h-5 w-5 text-gray-600" />
                      <AlertDescription className="text-gray-800">
                        <strong>Verification Error:</strong> {verificationResults.error}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No verification results yet. Click "Verify" on a contract to check its status.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contract Analysis */}
        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-6 w-6 mr-3" />
                Next Steps for Unverified Contracts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">1. Manual Verification</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    If contracts are unverified, you can manually submit them to Sourcify with source code and metadata.
                  </p>
                  <Button 
                    onClick={() => window.open('https://sourcify.dev/#/verifier', '_blank')}
                    size="sm"
                    variant="outline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Sourcify Verifier
                  </Button>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">2. Alternative Verification</h3>
                  <p className="text-sm text-purple-700 mb-3">
                    Check if contracts are verified on other platforms like Etherscan.
                  </p>
                  <div className="space-y-2">
                    {ethgrContracts.map((contract, index) => (
                      <Button 
                        key={index}
                        onClick={() => window.open(`https://etherscan.io/address/${contract.address}#code`, '_blank')}
                        size="sm"
                        variant="outline"
                        className="mr-2"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View on Etherscan
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">3. Direct Contract Interaction</h3>
                  <p className="text-sm text-green-700 mb-3">
                    Use the Remix analysis tools to interact directly with the contracts and discover token information.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/remix-analysis'}
                    size="sm"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Go to Remix Analysis
                  </Button>
                </div>
              </div>

              <Alert className="bg-yellow-50 border-yellow-300">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Portfolio Impact:</strong> Unverified contracts may cause wallets to display "N/A" values 
                  because they cannot determine the token standard or retrieve proper metadata. Verification often 
                  resolves these display issues and enables proper token recognition.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}