import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle,
  Copy,
  ExternalLink,
  Shield,
  AlertTriangle,
  Wallet,
  Code,
  Zap
} from "lucide-react";

export default function RevokeDelegationGuide() {
  const [copied, setCopied] = useState(false);

  const revokeFunction = `function revokeDelegate(address _delegate) public {
    require(msg.sender == owner);
    
    delegates[_delegate] = address(0); // Set to 0x00 to remove
    
    emit DelegateRevoked(_delegate, msg.sender);
}`;

  const interactionSteps = `Manual Contract Interaction Steps:

1. Go to Etherscan Contract Page:
   https://etherscan.io/address/0x710fad1041f0ee79916bb1a6adef662303bb8b6e#writeContract

2. Connect Your Wallet:
   - Click "Connect to Web3"
   - Select MetaMask
   - Use wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843

3. Find revokeDelegate Function:
   - Look for "revokeDelegate" in write functions
   - Input: 0x710fad1041f0ee79916bb1a6adef662303bb8b6e

4. Execute Transaction:
   - Click "Write"
   - Confirm in MetaMask
   - Pay gas fee (~$5-10)

5. Verify Removal:
   - Check delegates mapping
   - Should return 0x0000000000000000000000000000000000000000`;

  const remixInteraction = `// Alternative: Remix Contract Interaction
// 1. Open Remix IDE
// 2. Go to "Deploy & Run" tab
// 3. Under "At Address" paste: 0x710fad1041f0ee79916bb1a6adef662303bb8b6e
// 4. Select appropriate contract ABI
// 5. Call revokeDelegate(0x710fad1041f0ee79916bb1a6adef662303bb8b6e)

pragma solidity ^0.8.19;

interface IDelegationContract {
    function revokeDelegate(address _delegate) external;
    function delegates(address _delegator) external view returns (address);
}

contract DelegationRevoker {
    IDelegationContract constant DELEGATION_CONTRACT = 
        IDelegationContract(0x710fad1041f0ee79916bb1a6adef662303bb8b6e);
    
    function revokeMaliciousDelegate() external {
        // Revoke delegation to the malicious contract
        DELEGATION_CONTRACT.revokeDelegate(0x710fad1041f0ee79916bb1a6adef662303bb8b6e);
    }
    
    function checkDelegation(address _delegator) external view returns (address) {
        return DELEGATION_CONTRACT.delegates(_delegator);
    }
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">
              Revoke Delegation Guide
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Use revokeDelegate function to remove malicious delegation
          </p>
        </div>

        {/* Function Analysis */}
        <Alert className="border-green-500 bg-green-500/10">
          <Code className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Good Find!</strong> The revokeDelegate function can remove delegations by setting the delegate address to 0x00. This should work if you have owner permissions.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Function Code */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-400" />
                  revokeDelegate Function
                </div>
                <Button
                  onClick={() => copyToClipboard(revokeFunction)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Function
                </Button>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Function to remove delegate by setting to zero address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={revokeFunction}
                readOnly
                className="font-mono text-sm bg-gray-900 border-gray-600 text-gray-300 h-32"
              />
              <div className="mt-4 space-y-2">
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h4 className="text-blue-400 font-medium">Function Parameters</h4>
                  <p className="text-gray-300 text-sm">_delegate: 0x710fad1041f0ee79916bb1a6adef662303bb8b6e</p>
                </div>
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-medium">Access Control</h4>
                  <p className="text-gray-300 text-sm">require(msg.sender == owner) - you must be the owner</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interaction Methods */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-green-400" />
                  Interaction Methods
                </div>
                <Button
                  onClick={() => copyToClipboard(interactionSteps)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Steps
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                  <h4 className="text-orange-400 font-medium mb-2">Method 1: Etherscan</h4>
                  <p className="text-gray-300 text-sm">Direct contract interaction via Etherscan write functions</p>
                </div>
                
                <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h4 className="text-purple-400 font-medium mb-2">Method 2: Remix IDE</h4>
                  <p className="text-gray-300 text-sm">Load contract in Remix and call revokeDelegate function</p>
                </div>
                
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h4 className="text-blue-400 font-medium mb-2">Method 3: Custom Contract</h4>
                  <p className="text-gray-300 text-sm">Deploy helper contract to call revoke function</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Remix Helper Contract */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-400" />
                Remix Helper Contract
              </div>
              <Button
                onClick={() => copyToClipboard(remixInteraction)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Contract
              </Button>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Alternative contract-based approach for revocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={remixInteraction}
              readOnly
              className="font-mono text-xs bg-gray-900 border-gray-600 text-gray-300 h-80"
            />
          </CardContent>
        </Card>

        {/* Step-by-Step Process */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recommended Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <Badge className="bg-blue-600 text-white mb-2">Step 1</Badge>
                <h4 className="text-blue-400 font-medium mb-2">Check Contract</h4>
                <p className="text-gray-300 text-sm">Verify revokeDelegate function exists</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <Badge className="bg-green-600 text-white mb-2">Step 2</Badge>
                <h4 className="text-green-400 font-medium mb-2">Connect Wallet</h4>
                <p className="text-gray-300 text-sm">Use Etherscan or Remix to connect</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <Badge className="bg-purple-600 text-white mb-2">Step 3</Badge>
                <h4 className="text-purple-400 font-medium mb-2">Call Function</h4>
                <p className="text-gray-300 text-sm">Execute revokeDelegate with contract address</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded text-center">
                <Badge className="bg-orange-600 text-white mb-2">Step 4</Badge>
                <h4 className="text-orange-400 font-medium mb-2">Deploy ETHR</h4>
                <p className="text-gray-300 text-sm">Proceed with mainnet deployment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg mr-4"
            onClick={() => window.open('https://etherscan.io/address/0x710fad1041f0ee79916bb1a6adef662303bb8b6e#writeContract', '_blank')}
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Try Etherscan Method
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4"
            onClick={() => window.open('https://remix.ethereum.org', '_blank')}
          >
            <Code className="h-4 w-4 mr-2" />
            Try Remix Method
          </Button>
        </div>

        {/* Warning */}
        <Alert className="border-yellow-500 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-200">
            <strong>Owner Requirement:</strong> The revokeDelegate function requires msg.sender == owner. If you're not the owner of the delegation contract, this method won't work. In that case, use the bypass deployment method instead.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}