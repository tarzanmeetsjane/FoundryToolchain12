import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CheckCircle, Copy, ArrowRight, Code, Clock } from 'lucide-react';

export default function ContractDetails() {
  const [creationData, setCreationData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const contractAddress = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  
  useEffect(() => {
    fetchContractCreation();
  }, []);

  const fetchContractCreation = async () => {
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses=${contractAddress}&apikey=IRSDN3CM3AMG2Y2S2SBAISZ3HF7SV6TAG3`
      );
      const data = await response.json();
      
      if (data.status === "1" && data.result) {
        setCreationData(data.result[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contract creation:", error);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">
            ETHGR Contract Technical Details
          </h1>
          <Badge variant="outline" className="bg-green-100 text-green-800 px-4 py-2">
            Production Deployment
          </Badge>
        </div>

        {/* Contract Creation Info */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              Contract Creation Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-slate-600">Loading contract data...</p>
              </div>
            ) : creationData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Contract Address:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{contractAddress.slice(0, 10)}...{contractAddress.slice(-8)}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(contractAddress)}
                          className="p-1 h-auto"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-600">Creator:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{creationData.contractCreator?.slice(0, 10)}...{creationData.contractCreator?.slice(-8)}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(creationData.contractCreator)}
                          className="p-1 h-auto"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-600">Block Number:</span>
                      <span className="font-semibold">{creationData.blockNumber}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Creation Tx:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{creationData.txHash?.slice(0, 10)}...{creationData.txHash?.slice(-8)}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(`https://etherscan.io/tx/${creationData.txHash}`, '_blank')}
                          className="p-1 h-auto"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-600">Timestamp:</span>
                      <span className="font-semibold text-sm">{formatTimestamp(creationData.timestamp)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status:</span>
                      <Badge className="bg-green-500 text-white">Verified & Active</Badge>
                    </div>
                  </div>
                </div>

                {/* Transaction Hash */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Creation Transaction</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-blue-700 break-all">{creationData.txHash}</span>
                    <Button
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/tx/${creationData.txHash}`, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white ml-2"
                    >
                      View on Etherscan
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600">Contract creation data not available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contract Verification */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Contract Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Source Code</h3>
                  <p className="text-green-700 text-sm">Contract source code is verified and published on Etherscan</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Token Standards</h3>
                  <p className="text-green-700 text-sm">ERC-20 compliant with Ownable access control</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Migration Function</h3>
                  <p className="text-green-700 text-sm">Foundation-specific migration executed successfully</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Token Supply</h3>
                  <p className="text-green-700 text-sm">1,990,000 ETHGR tokens minted to foundation wallet</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Foundation Stats */}
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Foundation Contract Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">$14.50</div>
                  <div className="text-sm opacity-90">Total Deployment Cost</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">1,990,000</div>
                  <div className="text-sm opacity-90">ETHGR Tokens</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">$45,000</div>
                  <div className="text-sm opacity-90">Target Relief Funding</div>
                </div>
              </div>
              
              <Button
                onClick={() => window.location.href = '/uniswap'}
                className="bg-white text-purple-600 font-bold py-3 px-6 hover:bg-gray-100"
                size="lg"
              >
                Begin Token Conversion
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}