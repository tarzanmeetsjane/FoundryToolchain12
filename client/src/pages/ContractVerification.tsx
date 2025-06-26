import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, Copy, ArrowRight, Shield, FileText, Clock } from "lucide-react";
import { useState } from "react";

export default function ContractVerification() {
  const [copiedField, setCopiedField] = useState<string>("");

  const contractDetails = {
    address: "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308",
    name: "ETHG Recovery",
    symbol: "ETHGR",
    compiler: "0.8.19",
    license: "MIT",
    optimization: "Yes",
    runs: 200
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const verificationSteps = [
    {
      step: 1,
      title: "Go to Etherscan Verification",
      description: "Navigate to the contract verification page",
      action: "Open Etherscan",
      url: `https://etherscan.io/verifyContract?a=${contractDetails.address}`,
      status: "ready"
    },
    {
      step: 2,
      title: "Enter Contract Details",
      description: "Fill in the basic contract information",
      status: "pending"
    },
    {
      step: 3,
      title: "Upload Source Code",
      description: "Paste the corrected contract source code",
      status: "pending"
    },
    {
      step: 4,
      title: "Submit for Verification",
      description: "Wait for Etherscan to process verification",
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-8 h-8 text-emerald-600" />
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Contract Verification System
            </Badge>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Get Your Tokens Price Recognition
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Verify your ETHGR contract on Etherscan to enable price tracking services and wallet value display
          </p>
        </div>

        {/* Current Status */}
        <Alert className="border-amber-200 bg-amber-50">
          <Clock className="h-4 w-4" />
          <AlertDescription className="text-amber-800">
            <strong>Current Issue:</strong> Your 1.99M ETHGR tokens show "N/A" price because tracking services haven't recognized your contract address yet.
          </AlertDescription>
        </Alert>

        {/* Contract Details Card */}
        <Card className="border-emerald-200 bg-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Contract Details</span>
              <Badge className="bg-emerald-600">Ready for Verification</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Contract Address:</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{contractDetails.address}</code>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(contractDetails.address, "address")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Token Name:</span>
                  <span className="font-mono">{contractDetails.name}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Symbol:</span>
                  <span className="font-mono">{contractDetails.symbol}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Compiler:</span>
                  <span className="font-mono">{contractDetails.compiler}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">License:</span>
                  <span className="font-mono">{contractDetails.license}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Optimization:</span>
                  <span className="font-mono">{contractDetails.optimization} ({contractDetails.runs} runs)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {verificationSteps.map((step) => (
            <Card key={step.step} className={`relative ${
              step.status === 'ready' ? 'border-emerald-300 bg-emerald-50' : 
              step.status === 'pending' ? 'border-gray-200 bg-white' : 
              'border-green-300 bg-green-50'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.status === 'ready' ? 'bg-emerald-600 text-white' :
                    step.status === 'pending' ? 'bg-gray-300 text-gray-600' :
                    'bg-green-600 text-white'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : step.step}
                  </div>
                  {step.status === 'ready' && (
                    <Badge variant="secondary" className="text-xs">Start Here</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                {step.url && (
                  <Button 
                    onClick={() => window.open(step.url, '_blank')} 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    {step.action} <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Source Code Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Contract Source Code Ready</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="border-blue-200 bg-blue-50 mb-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                I have your corrected contract source code ready for Etherscan verification. Click the button below to access the complete source code.
              </AlertDescription>
            </Alert>
            
            <div className="flex space-x-4">
              <Button 
                onClick={() => window.open('/contract-source', '_blank')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                View Complete Source Code
              </Button>
              <Button 
                variant="outline"
                onClick={() => copyToClipboard("// Contract source code available in platform", "source")}
              >
                Copy Instructions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Expected Results */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Expected Results After Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Etherscan shows "Contract Source Code Verified"</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Price tracking services can recognize your contract</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Your wallet shows actual dollar value instead of "N/A"</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Can submit to CoinGecko and CoinMarketCap for broader recognition</span>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription>
            <strong>Need Help?</strong> The verification process typically takes 1-3 days. Once verified, it may take an additional 1-2 weeks for price services to fully recognize and index your contract.
          </AlertDescription>
        </Alert>

      </div>
    </div>
  );
}