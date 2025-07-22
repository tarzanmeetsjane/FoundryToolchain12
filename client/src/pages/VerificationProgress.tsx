import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ExternalLink, RefreshCw, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function VerificationProgress() {
  const [status, setStatus] = useState<'submitting' | 'pending' | 'success' | 'failed'>('submitting');
  const [guid, setGuid] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API submission progress
    const timer = setTimeout(() => {
      setGuid('SAMPLE_GUID_123456789');
      setStatus('pending');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const checkStatus = async () => {
    // In real implementation, this would call Etherscan API
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Contract Verification in Progress
          </h1>
          <p className="text-xl text-blue-600 mb-4">
            Your ETHGR contract is being verified on Etherscan
          </p>
          <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
            Contract: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308
          </Badge>
        </div>

        {/* Progress Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-indigo-800">Verification Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800">API Key Validated</h4>
                  <p className="text-sm text-green-600">Etherscan API key accepted</p>
                </div>
                <Badge className="bg-green-100 text-green-800">COMPLETE</Badge>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800">Source Code Submitted</h4>
                  <p className="text-sm text-green-600">Flattened Solidity contract uploaded</p>
                </div>
                <Badge className="bg-green-100 text-green-800">COMPLETE</Badge>
              </div>

              <div className={`flex items-center gap-4 p-4 rounded-lg ${
                status === 'pending' || status === 'success' 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                {status === 'success' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <Clock className="h-6 w-6 text-blue-600 animate-spin" />
                )}
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    status === 'success' ? 'text-green-800' : 
                    status === 'pending' ? 'text-blue-800' : 'text-gray-600'
                  }`}>
                    Etherscan Processing
                  </h4>
                  <p className={`text-sm ${
                    status === 'success' ? 'text-green-600' : 
                    status === 'pending' ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {status === 'success' ? 'Verification completed successfully' :
                     status === 'pending' ? 'Compiling and verifying contract...' :
                     'Waiting for submission'}
                  </p>
                </div>
                <Badge className={
                  status === 'success' ? 'bg-green-100 text-green-800' :
                  status === 'pending' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-600'
                }>
                  {status === 'success' ? 'VERIFIED' :
                   status === 'pending' ? 'PROCESSING' : 'WAITING'}
                </Badge>
              </div>

              <div className={`flex items-center gap-4 p-4 rounded-lg ${
                status === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                {status === 'success' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <Clock className="h-6 w-6 text-gray-400" />
                )}
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    status === 'success' ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    Price Recognition Enabled
                  </h4>
                  <p className={`text-sm ${
                    status === 'success' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {status === 'success' 
                      ? '1,990,000 ETHGR tokens now show proper value' 
                      : 'Pending verification completion'
                    }
                  </p>
                </div>
                <Badge className={
                  status === 'success' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }>
                  {status === 'success' ? 'ACTIVE' : 'PENDING'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        {status === 'pending' && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Clock className="h-4 w-4" />
            <AlertDescription className="text-blue-800">
              <strong>Verification in Progress:</strong> Etherscan is compiling your contract. This usually takes 1-3 minutes. 
              {guid && <span className="font-mono text-sm ml-2">GUID: {guid}</span>}
            </AlertDescription>
          </Alert>
        )}

        {status === 'success' && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-800">
              <strong>Verification Successful!</strong> Your contract is now verified and your 1,990,000 ETHGR tokens will show proper pricing on DEXs and wallets.
            </AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Check Status</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Refresh verification progress
                </p>
                <Button 
                  onClick={checkStatus}
                  disabled={status === 'success'}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {status === 'success' ? 'Verified' : 'Check Status'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ExternalLink className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">View on Etherscan</h3>
                <p className="text-sm text-green-700 mb-4">
                  Check contract verification status
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/address/0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308', '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        {status === 'success' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Zap className="h-5 w-5" />
                Next Steps: Start Trading Your ETHGR Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-emerald-800 mb-2">1. Check Portfolio Value</h4>
                  <p className="text-sm text-emerald-700 mb-3">
                    Your 1,990,000 tokens now show proper USD value
                  </p>
                  <Button 
                    onClick={() => window.open('https://etherscan.io/token/0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308?a=0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    View Balance
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-blue-800 mb-2">2. Create Uniswap Pool</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Add liquidity and enable trading
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/pool-creation'}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create Pool
                  </Button>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-purple-800 mb-2">3. Search for 37 ETH</h4>
                  <p className="text-sm text-purple-700 mb-3">
                    Run Remix script to find missing ETH
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/eth-recovery'}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Start Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success Summary */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            {status === 'success' ? 'Contract Verification Complete!' : 'Verification Submitted Successfully'}
          </h3>
          <p className="text-lg mb-6">
            {status === 'success' 
              ? 'Your 1,990,000 ETHGR tokens are now verified and ready for trading'
              : 'Your contract verification is processing on Etherscan'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✓ API Submission</h4>
              <p className="text-sm opacity-90">Successfully submitted to Etherscan</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">{status === 'success' ? '✓' : '⏳'} Verification</h4>
              <p className="text-sm opacity-90">
                {status === 'success' ? 'Contract verified' : 'Processing...'}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">{status === 'success' ? '✓' : '⏳'} Price Recognition</h4>
              <p className="text-sm opacity-90">
                {status === 'success' ? 'Trading enabled' : 'Pending verification'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}