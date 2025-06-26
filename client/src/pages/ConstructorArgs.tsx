import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, AlertTriangle, Info } from "lucide-react";

export default function ConstructorArgs() {
  const contractDetails = {
    address: "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308",
    name: "ETHG Recovery",
    symbol: "ETHGR",
    initialSupply: "1,990,000"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Info className="w-8 h-8 text-blue-600" />
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Constructor Arguments Guide
            </Badge>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Constructor Arguments for Verification
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Important: Your ETHGR contract requires NO constructor arguments for Etherscan verification
          </p>
        </div>

        {/* Key Alert */}
        <Alert className="border-emerald-200 bg-emerald-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-emerald-800">
            <strong>Critical Information:</strong> Leave the "Constructor Arguments ABI-encoded" field completely EMPTY when verifying your contract on Etherscan.
          </AlertDescription>
        </Alert>

        {/* Contract Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Your Contract Constructor Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
              <pre className="text-sm">
{`constructor() {
    name = "ETHG Recovery";
    symbol = "ETHGR";
    decimals = 18;
    owner = msg.sender;
    
    // Initial mint to contract deployer
    _mint(msg.sender, 1990000 * 10**decimals);
}`}
              </pre>
            </div>
            
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your contract constructor takes <strong>zero parameters</strong>. All values (name, symbol, supply) are hardcoded in the contract, not passed as arguments.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Verification Form Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Correct Settings */}
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Correct Verification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="text-sm font-medium">Contract Address:</span>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">{contractDetails.address}</code>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="text-sm font-medium">Compiler Version:</span>
                  <code className="text-xs">v0.8.19+commit.7dd6d404</code>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="text-sm font-medium">License Type:</span>
                  <span className="text-xs">MIT License</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="text-sm font-medium">Optimization:</span>
                  <span className="text-xs">Yes (200 runs)</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-emerald-100 border border-emerald-300 rounded">
                  <span className="text-sm font-bold">Constructor Arguments:</span>
                  <span className="text-xs font-bold text-emerald-700">LEAVE EMPTY</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Common Verification Mistakes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="p-2 bg-red-100 border border-red-300 rounded">
                  <span className="text-sm font-medium text-red-700">❌ Wrong:</span>
                  <p className="text-xs text-red-600">Entering "ETHG Recovery" as constructor argument</p>
                </div>
                
                <div className="p-2 bg-red-100 border border-red-300 rounded">
                  <span className="text-sm font-medium text-red-700">❌ Wrong:</span>
                  <p className="text-xs text-red-600">Entering "ETHGR" as constructor argument</p>
                </div>
                
                <div className="p-2 bg-red-100 border border-red-300 rounded">
                  <span className="text-sm font-medium text-red-700">❌ Wrong:</span>
                  <p className="text-xs text-red-600">Entering "1990000" as constructor argument</p>
                </div>
                
                <div className="p-2 bg-red-100 border border-red-300 rounded">
                  <span className="text-sm font-medium text-red-700">❌ Wrong:</span>
                  <p className="text-xs text-red-600">Using different compiler version</p>
                </div>
                
                <div className="p-2 bg-emerald-100 border border-emerald-300 rounded">
                  <span className="text-sm font-medium text-emerald-700">✅ Correct:</span>
                  <p className="text-xs text-emerald-600">Leave constructor arguments field completely empty</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contract Behavior Explanation */}
        <Card>
          <CardHeader>
            <CardTitle>Why No Constructor Arguments?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">Hardcoded Values</div>
                <p className="text-sm text-blue-700">Token name, symbol, and decimals are set directly in the contract code</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">Auto-Mint</div>
                <p className="text-sm text-green-700">1,990,000 tokens automatically minted to deployer address</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">Owner Set</div>
                <p className="text-sm text-purple-700">Contract deployer automatically becomes owner</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => window.open('/contract-source', '_blank')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              View Complete Source Code
            </Button>
            <Button 
              onClick={() => window.open(`https://etherscan.io/verifyContract?a=${contractDetails.address}`, '_blank')}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Start Etherscan Verification <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Final Reminder */}
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-amber-800">
            <strong>Remember:</strong> The constructor arguments field must be left empty. Your contract's constructor takes no parameters, and entering any values will cause verification to fail.
          </AlertDescription>
        </Alert>

      </div>
    </div>
  );
}