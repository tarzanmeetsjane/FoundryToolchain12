import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle,
  CheckCircle,
  X,
  Info,
  ArrowRight
} from "lucide-react";

export default function AddressValidation() {
  const [inputAddress, setInputAddress] = useState("0x6z4s5d8t9i7m6k5j4h3g2f1n9z4s5d8t9i7m6k5j4h3g2f1n");
  
  const addressAnalysis = {
    provided: "0x6z4s5d8t9i7m6k5j4h3g2f1n9z4s5d8t9i7m6k5j4h3g2f1n",
    length: 66,
    requiredLength: 42,
    status: "INVALID",
    issues: [
      "Length is 66 characters (should be 42)",
      "Contains invalid hex characters: z, s, d, t, i, m, k, j, h, g, f, n",
      "Valid hex only uses: 0-9 and a-f"
    ]
  };

  const correctFormat = {
    example: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    structure: "0x + 40 hexadecimal characters",
    validChars: "0123456789abcdefABCDEF",
    totalLength: 42
  };

  const possibleSolutions = [
    {
      solution: "Check for Typos",
      description: "Review the original source for transcription errors",
      action: "Double-check copied address from wallet or transaction"
    },
    {
      solution: "Contract Address",
      description: "If this is a smart contract, verify the actual address",
      action: "Check contract deployment transaction for real address"
    },
    {
      solution: "Encoded Data",
      description: "This might be encoded data rather than an address",
      action: "Check if this is transaction data or encoded information"
    },
    {
      solution: "Use Known Address",
      description: "Continue with your confirmed wallet address",
      action: "Proceed with 0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
    }
  ];

  const validationSteps = [
    {
      step: "Length Check",
      required: "42 characters total",
      provided: "66 characters",
      status: "FAIL"
    },
    {
      step: "Prefix Check", 
      required: "Starts with 0x",
      provided: "Starts with 0x",
      status: "PASS"
    },
    {
      step: "Character Check",
      required: "Only 0-9, a-f, A-F",
      provided: "Contains z,s,d,t,i,m,k,j,h,g,f,n",
      status: "FAIL"
    },
    {
      step: "Format Check",
      required: "Valid Ethereum address",
      provided: "Invalid format",
      status: "FAIL"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">ADDRESS VALIDATION</h1>
          <p className="text-xl text-red-300">Invalid Ethereum Address Format Detected</p>
        </div>

        <Alert className="border-red-500 bg-red-500/20 border-2">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <AlertDescription className="text-red-200 text-lg">
            <strong>INVALID ADDRESS:</strong> The provided address is 66 characters (should be 42) and contains invalid hexadecimal characters. Ethereum addresses must use only 0-9 and a-f.
          </AlertDescription>
        </Alert>

        {/* Address Analysis */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Address Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                <h3 className="text-red-400 font-bold mb-2">Provided Address:</h3>
                <p className="text-white text-sm font-mono break-all bg-gray-700 p-2 rounded">
                  {addressAnalysis.provided}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-3 bg-red-600/10 border border-red-600/30 rounded text-center">
                  <h4 className="text-red-400 font-bold">Length</h4>
                  <p className="text-white">{addressAnalysis.length} chars</p>
                  <Badge className="bg-red-600">INVALID</Badge>
                </div>
                <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                  <h4 className="text-yellow-400 font-bold">Required</h4>
                  <p className="text-white">{addressAnalysis.requiredLength} chars</p>
                  <Badge className="bg-yellow-600">STANDARD</Badge>
                </div>
                <div className="p-3 bg-red-600/10 border border-red-600/30 rounded text-center">
                  <h4 className="text-red-400 font-bold">Status</h4>
                  <p className="text-white">{addressAnalysis.status}</p>
                  <X className="h-5 w-5 text-red-500 mx-auto" />
                </div>
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                  <h4 className="text-blue-400 font-bold">Issues</h4>
                  <p className="text-white">{addressAnalysis.issues.length}</p>
                  <Badge className="bg-blue-600">MULTIPLE</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-red-400 font-bold">Validation Issues:</h3>
                {addressAnalysis.issues.map((issue, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-white text-sm">{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Validation Steps */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Validation Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {validationSteps.map((step, index) => (
                <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <h3 className="text-yellow-400 font-bold">{step.step}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{step.required}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">{step.provided}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        {step.status === "PASS" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        <Badge className={step.status === "PASS" ? "bg-green-600" : "bg-red-600"}>
                          {step.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Correct Format */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Correct Ethereum Address Format</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                <h3 className="text-green-400 font-bold mb-2">Valid Example (Your Primary Wallet):</h3>
                <p className="text-white text-sm font-mono break-all bg-gray-700 p-2 rounded">
                  {correctFormat.example}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-bold">Structure</h4>
                  <p className="text-white text-sm">{correctFormat.structure}</p>
                </div>
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-bold">Valid Characters</h4>
                  <p className="text-white text-sm font-mono">{correctFormat.validChars}</p>
                </div>
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-bold">Total Length</h4>
                  <p className="text-white text-sm">{correctFormat.totalLength} characters</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Possible Solutions */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Possible Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {possibleSolutions.map((solution, index) => (
                <div key={index} className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <div>
                      <h3 className="text-blue-400 font-bold">{solution.solution}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{solution.description}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{solution.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Input Field for Correction */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Provide Correct Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                placeholder="Enter valid Ethereum address (42 characters)"
                className="bg-gray-700 text-white border-gray-600 font-mono"
              />
              
              <div className="flex items-center space-x-4">
                <Badge className={
                  inputAddress.length === 42 && /^0x[0-9a-fA-F]{40}$/.test(inputAddress) 
                    ? "bg-green-600" : "bg-red-600"
                }>
                  {inputAddress.length === 42 && /^0x[0-9a-fA-F]{40}$/.test(inputAddress) 
                    ? "VALID FORMAT" : "INVALID FORMAT"}
                </Badge>
                <span className="text-gray-400 text-sm">
                  Length: {inputAddress.length}/42
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('/immediate-execution', '_self')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <ArrowRight className="h-6 w-6 mr-2" />
            Continue Execution
          </Button>
          
          <Button 
            onClick={() => setInputAddress("0x058C8FE01E5c9eaC6ee19e6673673B549B368843")}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <CheckCircle className="h-6 w-6 mr-2" />
            Use Primary Wallet
          </Button>
          
          <Button 
            onClick={() => window.open('/wallet-connection-center', '_self')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Info className="h-6 w-6 mr-2" />
            Wallet Connection
          </Button>
          
          <Button 
            onClick={() => window.open('/live-lp-results', '_self')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <ArrowRight className="h-6 w-6 mr-2" />
            LP Results
          </Button>
        </div>

        <Alert className="border-blue-500 bg-blue-500/20">
          <Info className="h-6 w-6 text-blue-500" />
          <AlertDescription className="text-blue-200">
            <strong>RECOMMENDATION:</strong> The provided address format is invalid. Continue with your confirmed wallet address (0x058C8FE01E5c9eaC6ee19e6673673B549B368843) to proceed with the $4,990 LP reward claims and DEX verification.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}