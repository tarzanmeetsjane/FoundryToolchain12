import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Copy, CheckCircle, Code2, GitBranch } from 'lucide-react';
import { useState } from 'react';

export default function RemixIntegration() {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  // Available Solidity contracts in the project
  const contracts = [
    {
      name: "ETHG Recovery Contract",
      file: "EXACT_VERIFICATION_CONTRACT.sol",
      description: "Verified ERC20 token contract for victim assistance",
      remixUrl: "https://remix.ethereum.org/replit/ETHGR-Foundation-Project/blob/main/EXACT_VERIFICATION_CONTRACT.sol",
      type: "verified"
    },
    {
      name: "ETHGRecovery Main",
      file: "ETHGRecovery.sol", 
      description: "Original recovery contract implementation",
      remixUrl: "https://remix.ethereum.org/replit/ETHGR-Foundation-Project/blob/main/ETHGRecovery.sol",
      type: "main"
    },
    {
      name: "Corrected ETHG Recovery",
      file: "CORRECTED_ETHG_RECOVERY.sol",
      description: "Updated contract with fixes",
      remixUrl: "https://remix.ethereum.org/replit/ETHGR-Foundation-Project/blob/main/CORRECTED_ETHG_RECOVERY.sol",
      type: "corrected"
    },
    {
      name: "Final Verification Contract",
      file: "FINAL_VERIFICATION_CONTRACT.sol",
      description: "Ready-to-deploy verification contract",
      remixUrl: "https://remix.ethereum.org/replit/ETHGR-Foundation-Project/blob/main/FINAL_VERIFICATION_CONTRACT.sol",
      type: "final"
    },
    {
      name: "Gasless Recovery",
      file: "GASLESS_RECOVERY_CONTRACT.sol",
      description: "Gas-optimized recovery operations",
      remixUrl: "https://remix.ethereum.org/replit/ETHGR-Foundation-Project/blob/main/GASLESS_RECOVERY_CONTRACT.sol",
      type: "optimized"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Remix IDE Integration
          </h1>
          <p className="text-slate-600 text-lg">
            Load ETHGR contracts directly into Remix IDE
          </p>
        </div>

        {/* How It Works */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <GitBranch className="w-5 h-5" />
              GitHub to Remix Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Click any "Open in Remix" button below</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Contract loads directly in Remix IDE from GitHub</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>Compile, deploy, or modify as needed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Contracts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {contracts.map((contract, index) => (
            <Card key={index} className={`border-2 ${
              contract.type === 'verified' ? 'border-green-200 bg-green-50' :
              contract.type === 'main' ? 'border-blue-200 bg-blue-50' :
              contract.type === 'final' ? 'border-purple-200 bg-purple-50' :
              'border-amber-200 bg-amber-50'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-sm">{contract.name}</span>
                  <Badge className={
                    contract.type === 'verified' ? 'bg-green-100 text-green-800' :
                    contract.type === 'main' ? 'bg-blue-100 text-blue-800' :
                    contract.type === 'final' ? 'bg-purple-100 text-purple-800' :
                    'bg-amber-100 text-amber-800'
                  }>
                    {contract.type.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{contract.description}</p>
                  
                  <div className="bg-white p-2 rounded border">
                    <div className="text-xs text-gray-500 mb-1">File:</div>
                    <div className="font-mono text-xs">{contract.file}</div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      onClick={() => window.open(contract.remixUrl, '_blank')}
                    >
                      <Code2 className="w-4 h-4 mr-2" />
                      Open in Remix
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => copyToClipboard(contract.remixUrl, `remix-${index}`)}
                    >
                      {copied === `remix-${index}` ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      Copy Remix URL
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Manual URL Construction */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Manual URL Construction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">GitHub URL Format:</h4>
                <div className="font-mono text-sm bg-white p-2 rounded border break-all">
                  https://github.com/replit/ETHGR-Foundation-Project/blob/main/[CONTRACT].sol
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Remix URL Format:</h4>
                <div className="font-mono text-sm bg-white p-2 rounded border break-all">
                  https://remix.ethereum.org/replit/ETHGR-Foundation-Project/blob/main/[CONTRACT].sol
                </div>
              </div>

              <Alert>
                <ExternalLink className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pro Tip:</strong> Replace "github.com" with "remix.ethereum.org" in any GitHub Solidity file URL 
                  to open it directly in Remix IDE. This works for all public repositories.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Additional Features */}
        <Card>
          <CardHeader>
            <CardTitle>Remix IDE Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700">Development Tools:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Syntax highlighting and error detection</li>
                  <li>• Built-in Solidity compiler</li>
                  <li>• Gas estimation and optimization</li>
                  <li>• Deployment to test networks</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-700">Testing & Debugging:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• JavaScript VM for quick testing</li>
                  <li>• Contract interaction interface</li>
                  <li>• Transaction debugging tools</li>
                  <li>• Multiple account simulation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}