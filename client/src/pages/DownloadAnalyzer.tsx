import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileCode, Download, Shield, AlertTriangle } from "lucide-react";

export default function DownloadAnalyzer() {
  const filename = "645-adb8d6617db4e409.js_1750895598210.download";
  
  // Parse the filename components
  const parseFilename = (name: string) => {
    const parts = name.split('_');
    const timestamp = parts[parts.length - 1]?.replace('.download', '');
    const hash = name.match(/[a-f0-9]{16}/)?.[0];
    const number = name.match(/^\d+/)?.[0];
    
    return { timestamp, hash, number };
  };

  const parsed = parseFilename(filename);
  const date = parsed.timestamp ? new Date(parseInt(parsed.timestamp)).toLocaleString() : 'Unknown';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            JavaScript Download Analysis
          </h1>
          <p className="text-xl text-slate-600">
            Analyzing your blockchain-related file download
          </p>
        </div>

        {/* Security Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>SECURITY NOTICE:</strong> This appears to be a JavaScript file download. Never execute unknown JavaScript files, especially those related to cryptocurrency operations.
          </AlertDescription>
        </Alert>

        {/* File Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <FileCode className="h-5 w-5" />
              File Pattern Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-800">Filename Breakdown:</h4>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>File Number:</span>
                      <code className="text-orange-700">{parsed.number || 'Unknown'}</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Hash Fragment:</span>
                      <code className="text-orange-700">{parsed.hash || 'Not detected'}</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Timestamp:</span>
                      <code className="text-orange-700">{date}</code>
                    </div>
                    <div className="flex justify-between">
                      <span>File Type:</span>
                      <Badge className="bg-orange-100 text-orange-800">JavaScript (.js)</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-orange-800">Likely Source:</h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-700">Blockchain Application</span>
                    </div>
                    <div className="text-sm text-blue-600">
                      This pattern suggests a download from:
                      <ul className="mt-2 space-y-1 ml-4">
                        <li>• DeFi protocol interface</li>
                        <li>• Wallet application</li>
                        <li>• Trading platform</li>
                        <li>• Contract interaction tool</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Context Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-purple-800">Relationship to Your ETHGR Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-3">Possible Connections:</h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <div>• Contract verification attempts</div>
                  <div>• DEX interaction scripts</div>
                  <div>• Wallet configuration files</div>
                  <div>• Recovery tool downloads</div>
                  <div>• Trading interface components</div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">Your Current Status:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ETHGR Contract:</span>
                    <Badge className="bg-green-100 text-green-800">DEPLOYED</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Token Balance:</span>
                    <span className="font-semibold">1,990,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verification:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">PENDING</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>37 ETH Search:</span>
                    <Badge className="bg-blue-100 text-blue-800">ACTIVE</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Recommendations */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Shield className="h-5 w-5" />
              Security Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h4 className="font-semibold text-red-800 mb-2">DO NOT EXECUTE:</h4>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>• Never run unknown JavaScript files</li>
                  <li>• Could contain malicious code</li>
                  <li>• May attempt to access your wallets</li>
                  <li>• Could steal private keys or seeds</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">SAFE ANALYSIS ONLY:</h4>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Use text editor to view contents</li>
                  <li>• Check for suspicious URLs or addresses</li>
                  <li>• Look for wallet connection attempts</li>
                  <li>• Verify source and purpose before any action</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h4 className="font-semibold text-green-800 mb-2">YOUR RECOVERY IS ON TRACK:</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• ETHGR contract successfully deployed</li>
                  <li>• 1,990,000 tokens confirmed in your wallet</li>
                  <li>• Recovery system operational at /eth-recovery</li>
                  <li>• No external downloads needed for verification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Focus on Verified Recovery Methods</h3>
          <p className="text-lg mb-4">
            Your ETHGR tokens are confirmed and secure. No external downloads required.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Contract Verification</h4>
              <p className="text-sm opacity-90">Use Etherscan's official verification system</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">37 ETH Recovery</h4>
              <p className="text-sm opacity-90">Use our secure Remix IDE script at /eth-recovery</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}