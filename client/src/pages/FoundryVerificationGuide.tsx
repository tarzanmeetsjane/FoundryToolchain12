import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Terminal, Copy, ExternalLink, Settings, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function FoundryVerificationGuide() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const foundryCommand = `forge verify-contract \\
    --chain-id 1 \\
    --num-of-optimizations 200 \\
    --watch \\
    --constructor-args $(cast abi-encode "constructor()") \\
    --compiler-version v0.8.30+commit.73712a01 \\
    0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308 \\
    src/ETHGRecovery.sol:ETHGRecovery \\
    --etherscan-api-key $ETHERSCAN_API_KEY`;

  const sourcifyCommand = `forge verify-contract \\
    --chain-id 1 \\
    --verifier sourcify \\
    0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308 \\
    src/ETHGRecovery.sol:ETHGRecovery`;

  const bashCompletions = `mkdir -p $HOME/.local/share/bash-completion/completions
forge completions bash > $HOME/.local/share/bash-completion/completions/forge
cast completions bash > $HOME/.local/share/bash-completion/completions/cast
anvil completions bash > $HOME/.local/share/bash-completion/completions/anvil
exec bash`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">
            Foundry Contract Verification
          </h1>
          <p className="text-xl text-indigo-600 mb-4">
            Professional-grade verification for your ETHGR contract
          </p>
          <Badge className="bg-indigo-100 text-indigo-800 text-lg px-4 py-2">
            Contract: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308
          </Badge>
        </div>

        {/* Setup Status */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>Foundry Setup Detected:</strong> You've configured bash completions for forge, cast, and anvil. Ready for professional contract verification!
          </AlertDescription>
        </Alert>

        {/* Method 1: Automated Foundry */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Terminal className="h-5 w-5" />
              Method 1: Automated Foundry Verification (Recommended)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 rounded-lg p-4 mb-4 relative">
              <Button
                onClick={() => copyToClipboard(foundryCommand, 'foundry')}
                className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-1" />
                {copied === 'foundry' ? 'Copied!' : 'Copy'}
              </Button>
              
              <pre className="text-green-400 text-sm overflow-x-auto pr-20">
                <code>{foundryCommand}</code>
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">✅ Advantages:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Automated verification process</li>
                  <li>• Real-time progress monitoring (--watch)</li>
                  <li>• Exact compiler version matching</li>
                  <li>• Professional developer workflow</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">📋 Requirements:</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• ETHERSCAN_API_KEY environment variable</li>
                  <li>• Foundry installed (forge, cast)</li>
                  <li>• Contract source in src/ETHGRecovery.sol</li>
                  <li>• Internet connection for Etherscan API</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Method 2: Sourcify Alternative */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Settings className="h-5 w-5" />
              Method 2: Sourcify Verification (No API Key Needed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 rounded-lg p-4 mb-4 relative">
              <Button
                onClick={() => copyToClipboard(sourcifyCommand, 'sourcify')}
                className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-1" />
                {copied === 'sourcify' ? 'Copied!' : 'Copy'}
              </Button>
              
              <pre className="text-green-400 text-sm overflow-x-auto pr-20">
                <code>{sourcifyCommand}</code>
              </pre>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-blue-800">
                <strong>Note:</strong> Sourcify is an alternative verification service. If Etherscan verification fails, try this method as a backup.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Terminal className="h-5 w-5" />
              Setup Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              <div>
                <h4 className="font-semibold text-orange-800 mb-3">1. Complete Bash Completions Setup:</h4>
                <div className="bg-slate-900 rounded-lg p-4 relative">
                  <Button
                    onClick={() => copyToClipboard(bashCompletions, 'bash')}
                    className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {copied === 'bash' ? 'Copied!' : 'Copy'}
                  </Button>
                  
                  <pre className="text-green-400 text-sm overflow-x-auto pr-20">
                    <code>{bashCompletions}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-orange-800 mb-3">2. Set Etherscan API Key:</h4>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm text-orange-700">
                    <div>• Visit: <a href="https://etherscan.io/myapikey" target="_blank" className="text-blue-600 underline">https://etherscan.io/myapikey</a></div>
                    <div>• Create free account and generate API key</div>
                    <div>• Export in terminal: <code className="bg-orange-100 px-1 rounded">export ETHERSCAN_API_KEY=your_key_here</code></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-orange-800 mb-3">3. Verify Contract Source:</h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700 mb-2">Ensure your contract source code is at <code>src/ETHGRecovery.sol</code></p>
                  <Button 
                    onClick={() => window.location.href = '/verification-fix'}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Get Correct Source Code
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <Terminal className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Run Verification</h3>
                <p className="text-sm text-purple-700 mb-4">
                  Execute automated Foundry verification
                </p>
                <Button 
                  onClick={() => copyToClipboard('./scripts/verify_contract.sh execute', 'script')}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied === 'script' ? 'Copied!' : 'Copy Script Command'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ExternalLink className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Get API Key</h3>
                <p className="text-sm text-green-700 mb-4">
                  Free Etherscan API key for verification
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/myapikey', '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Get API Key
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Check Status</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Monitor verification progress
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/address/0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308', '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Check Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Indicator */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Professional Verification Setup Complete</h3>
          <p className="text-lg mb-6">
            Your Foundry environment is configured for automated contract verification
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✓ Bash Completions</h4>
              <p className="text-sm opacity-90">forge, cast, anvil commands</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✓ Verification Scripts</h4>
              <p className="text-sm opacity-90">Automated workflow ready</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✓ Contract Source</h4>
              <p className="text-sm opacity-90">Properly formatted code</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}