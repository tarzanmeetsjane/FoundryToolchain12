import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  Eye,
  EyeOff,
  Copy,
  AlertTriangle,
  Key,
  Wallet,
  Lock
} from "lucide-react";

export default function PrivateKeyGuide() {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Key className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">
              Private Key Extraction Guide
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Safely extract your private key for Viem deployment
          </p>
        </div>

        {/* Security Warning */}
        <Alert className="border-red-500 bg-red-500/10">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-200">
            <strong>SECURITY WARNING:</strong> Never share your private key with anyone. Only use it for deployment scripts on your own computer.
            Your private key controls all funds in your wallet.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* MetaMask Method */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="h-5 w-5 text-orange-400" />
                MetaMask Private Key
              </CardTitle>
              <CardDescription className="text-gray-400">
                Extract private key from your MetaMask wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => setShowSteps(!showSteps)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                {showSteps ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showSteps ? 'Hide Steps' : 'Show Extraction Steps'}
              </Button>
              
              {showSteps && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-orange-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">1</Badge>
                    <div className="text-gray-300">
                      <p className="font-medium">Open MetaMask Extension</p>
                      <p className="text-sm text-gray-400">Click the MetaMask fox icon in your browser</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge className="bg-orange-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">2</Badge>
                    <div className="text-gray-300">
                      <p className="font-medium">Account Menu</p>
                      <p className="text-sm text-gray-400">Click the 3 dots (...) in the top right</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge className="bg-orange-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">3</Badge>
                    <div className="text-gray-300">
                      <p className="font-medium">Account Details</p>
                      <p className="text-sm text-gray-400">Select "Account details" from dropdown</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge className="bg-orange-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">4</Badge>
                    <div className="text-gray-300">
                      <p className="font-medium">Export Private Key</p>
                      <p className="text-sm text-gray-400">Click "Export Private Key" button</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge className="bg-orange-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">5</Badge>
                    <div className="text-gray-300">
                      <p className="font-medium">Enter Password</p>
                      <p className="text-sm text-gray-400">Type your MetaMask password to confirm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge className="bg-green-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">6</Badge>
                    <div className="text-gray-300">
                      <p className="font-medium">Copy Private Key</p>
                      <p className="text-sm text-gray-400">Copy the long string (without the 0x prefix)</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Alternative Methods */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                Alternative Sources
              </CardTitle>
              <CardDescription className="text-gray-400">
                Other ways to get your private key
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h4 className="text-blue-400 font-medium">Seed Phrase Recovery</h4>
                  <p className="text-gray-300 text-sm">Use your 12/24 word seed phrase to derive private key</p>
                  <p className="text-gray-400 text-xs mt-1">Tools: Ian Coleman BIP39 tool (offline)</p>
                </div>
                
                <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h4 className="text-purple-400 font-medium">Hardware Wallet</h4>
                  <p className="text-gray-300 text-sm">Export from Ledger/Trezor if available</p>
                  <p className="text-gray-400 text-xs mt-1">Check device documentation</p>
                </div>
                
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-medium">Existing Records</h4>
                  <p className="text-gray-300 text-sm">Check if you saved it during wallet creation</p>
                  <p className="text-gray-400 text-xs mt-1">Look in secure password managers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Format Information */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Private Key Format</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-medium mb-2">Correct Format</h4>
                  <code className="text-green-300 text-sm break-all">
                    a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890
                  </code>
                  <p className="text-gray-400 text-xs mt-2">64 characters, no 0x prefix</p>
                </div>
                
                <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                  <h4 className="text-red-400 font-medium mb-2">Wrong Format</h4>
                  <code className="text-red-300 text-sm break-all">
                    0xa1b2c3d4e5f6789012345678901234567890123456789012345678901234567890
                  </code>
                  <p className="text-gray-400 text-xs mt-2">Remove the 0x prefix for Viem</p>
                </div>
              </div>
              
              <Alert className="border-yellow-500 bg-yellow-500/10">
                <Key className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-200">
                  For Viem deployment, use the private key WITHOUT the "0x" prefix. 
                  The script will add it automatically.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Usage Example */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Deployment Command</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-gray-300">Once you have your private key, use this command:</p>
              
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <code className="text-green-400 font-mono text-sm">
                  PRIVATE_KEY=your_64_character_private_key_here npm run deploy
                </code>
              </div>
              
              <div className="p-4 bg-blue-900/30 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">Example with fake key:</h4>
                <code className="text-blue-300 font-mono text-sm break-all">
                  PRIVATE_KEY=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef npm run deploy
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Best Practices */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-400" />
              Security Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-green-400 font-medium">DO:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Use private key only on your computer</li>
                  <li>• Delete deployment files after use</li>
                  <li>• Use environment variables</li>
                  <li>• Keep private key secure</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-red-400 font-medium">DON'T:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Share private key with anyone</li>
                  <li>• Store in plain text files</li>
                  <li>• Upload to cloud/git</li>
                  <li>• Use on untrusted computers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}