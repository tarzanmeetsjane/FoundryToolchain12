import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, RefreshCw, AlertTriangle, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function VerificationStatus() {
  const [latestGuid, setLatestGuid] = useState<string>('ezaacgtu2umfj1sxmuedm8cgw3ywcq1fd2ivabetjsecyzd74w');
  const [status, setStatus] = useState<string>('checking');
  const [attempts, setAttempts] = useState(6);

  const checkCurrentStatus = async () => {
    try {
      const response = await fetch(`https://api.etherscan.io/api?module=contract&action=checkverifystatus&guid=${latestGuid}&apikey=IRSDN3CM3AMG2Y2S2SBAISZ3HF7SV6TAG3`);
      const data = await response.json();
      setStatus(data.result || 'Unknown');
    } catch (error) {
      setStatus('Error checking status');
    }
  };

  useEffect(() => {
    checkCurrentStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Contract Verification Status
          </h1>
          <p className="text-xl text-blue-600 mb-4">
            Monitoring ETHGR contract verification attempts
          </p>
          <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
            Attempt #{attempts} - Compiler v0.8.17
          </Badge>
        </div>

        {/* Current Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-purple-800">Latest Verification Attempt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-purple-800">Current Attempt Details:</h4>
                  <Button onClick={checkCurrentStatus} size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-purple-700">GUID:</span>
                    <div className="font-mono text-purple-800 break-all">{latestGuid}</div>
                  </div>
                  <div>
                    <span className="text-purple-700">Compiler:</span>
                    <div className="font-mono text-purple-800">v0.8.17+commit.8df45f5f</div>
                  </div>
                  <div>
                    <span className="text-purple-700">Status:</span>
                    <div className={`font-semibold ${
                      status.includes('Pass') ? 'text-green-600' : 
                      status.includes('Fail') ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {status}
                    </div>
                  </div>
                  <div>
                    <span className="text-purple-700">Contract:</span>
                    <div className="font-mono text-purple-800 text-xs">0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308</div>
                  </div>
                </div>
              </div>

              {status.includes('Pass') && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-green-800">
                    <strong>Success!</strong> Contract verification completed. Your 1,990,000 ETHGR tokens now show proper pricing.
                  </AlertDescription>
                </Alert>
              )}

              {status.includes('Fail') && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-red-800">
                    <strong>Verification Failed:</strong> {status}. Trying next supported compiler version.
                  </AlertDescription>
                </Alert>
              )}

              {!status.includes('Pass') && !status.includes('Fail') && (
                <Alert className="border-blue-200 bg-blue-50">
                  <RefreshCw className="h-4 w-4" />
                  <AlertDescription className="text-blue-800">
                    <strong>Processing:</strong> Verification in progress. Status: {status}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Previous Attempts Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-blue-800">Verification Attempt History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              
              <div className="flex justify-between items-center bg-red-50 border border-red-200 rounded p-3">
                <div>
                  <span className="font-semibold text-red-800">Attempt #1:</span>
                  <span className="text-red-700 ml-2">v0.8.30 - Invalid compiler version</span>
                </div>
                <Badge className="bg-red-100 text-red-800">FAILED</Badge>
              </div>

              <div className="flex justify-between items-center bg-red-50 border border-red-200 rounded p-3">
                <div>
                  <span className="font-semibold text-red-800">Attempt #2:</span>
                  <span className="text-red-700 ml-2">v0.8.19 - Invalid compiler version</span>
                </div>
                <Badge className="bg-red-100 text-red-800">FAILED</Badge>
              </div>

              <div className="flex justify-between items-center bg-red-50 border border-red-200 rounded p-3">
                <div>
                  <span className="font-semibold text-red-800">Attempt #3:</span>
                  <span className="text-red-700 ml-2">v0.8.26 - Invalid compiler version</span>
                </div>
                <Badge className="bg-red-100 text-red-800">FAILED</Badge>
              </div>

              <div className="flex justify-between items-center bg-red-50 border border-red-200 rounded p-3">
                <div>
                  <span className="font-semibold text-red-800">Attempt #4:</span>
                  <span className="text-red-700 ml-2">v0.8.24 - Invalid compiler version</span>
                </div>
                <Badge className="bg-red-100 text-red-800">FAILED</Badge>
              </div>

              <div className="flex justify-between items-center bg-red-50 border border-red-200 rounded p-3">
                <div>
                  <span className="font-semibold text-red-800">Attempt #5:</span>
                  <span className="text-red-700 ml-2">v0.8.20 - Invalid compiler version</span>
                </div>
                <Badge className="bg-red-100 text-red-800">FAILED</Badge>
              </div>

              <div className={`flex justify-between items-center rounded p-3 ${
                status.includes('Pass') ? 'bg-green-50 border border-green-200' : 
                status.includes('Fail') ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
              }`}>
                <div>
                  <span className={`font-semibold ${
                    status.includes('Pass') ? 'text-green-800' : 
                    status.includes('Fail') ? 'text-red-800' : 'text-blue-800'
                  }`}>Attempt #6:</span>
                  <span className={`ml-2 ${
                    status.includes('Pass') ? 'text-green-700' : 
                    status.includes('Fail') ? 'text-red-700' : 'text-blue-700'
                  }`}>v0.8.17 - {status}</span>
                </div>
                <Badge className={
                  status.includes('Pass') ? 'bg-green-100 text-green-800' : 
                  status.includes('Fail') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }>
                  {status.includes('Pass') ? 'SUCCESS' : 
                   status.includes('Fail') ? 'FAILED' : 'PROCESSING'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Check Status</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Refresh verification progress
                </p>
                <Button 
                  onClick={checkCurrentStatus}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ExternalLink className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">View Contract</h3>
                <p className="text-sm text-purple-700 mb-4">
                  Check contract on Etherscan
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/address/0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308', '_blank')}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Etherscan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <Zap className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Start Trading</h3>
                <p className="text-sm text-green-700 mb-4">
                  Convert to ETH regardless
                </p>
                <Button 
                  onClick={() => window.location.href = '/direct-eth-swap'}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Convert to ETH
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Persistent Verification Efforts</h3>
          <p className="text-lg mb-6">
            Testing multiple compiler versions to find the correct match for your deployed contract
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✓ Environment Updated</h4>
              <p className="text-sm opacity-90">API keys configured</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✓ Multiple Attempts</h4>
              <p className="text-sm opacity-90">6 compiler versions tested</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✓ Trading Ready</h4>
              <p className="text-sm opacity-90">Extension-free conversion</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">⏳ Verification</h4>
              <p className="text-sm opacity-90">
                {status.includes('Pass') ? 'Completed' : 'In progress'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}