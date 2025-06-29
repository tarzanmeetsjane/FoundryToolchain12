import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText,
  DollarSign,
  Search,
  Target,
  CheckCircle,
  ExternalLink,
  Calculator,
  TrendingUp
} from "lucide-react";

export default function TokenRecoveryAnalysis() {
  const [originalToken, setOriginalToken] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  const currentSituation = {
    recoveryContract: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
    recoveredTokens: "1,990,000 ETHGR",
    license: "MIT",
    status: "Contract deployed, tokens minted",
    needsVerification: true,
    needsMarket: true
  };

  const platformOptions = [
    {
      platform: "Uniswap V2/V3",
      suitability: "Standard ERC20 trading",
      requirements: "ETH for liquidity pool creation",
      fees: "0.3% trading fee",
      timeframe: "Immediate after liquidity"
    },
    {
      platform: "Recovery/Migration Specialists",
      suitability: "Custom token recovery situations",
      requirements: "Verification of original purchase",
      fees: "Varies by service",
      timeframe: "Days to weeks"
    },
    {
      platform: "OTC (Over-the-Counter)",
      suitability: "Direct buyer-seller matching",
      requirements: "Find interested buyers",
      fees: "Negotiable",
      timeframe: "Variable"
    },
    {
      platform: "Centralized Exchanges",
      suitability: "After establishing trading history",
      requirements: "Volume and legitimacy proof",
      fees: "Listing fees + trading fees",
      timeframe: "Weeks to months"
    }
  ];

  const keyQuestions = [
    "What was the original token contract address?",
    "What price did you pay for the original tokens?",
    "How many original tokens did you purchase?",
    "What platform was the original token traded on?",
    "Do you have transaction records of the purchase?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Target className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">
              Token Recovery Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Understanding your original investment to find the right monetization platform
          </p>
        </div>

        {/* Current Recovery Status */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Recovery Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h5 className="text-green-400 font-medium mb-2">Recovery Contract</h5>
                <p className="text-white text-sm font-mono break-all">{currentSituation.recoveryContract}</p>
                <Badge className="bg-green-600 text-white mt-2">Deployed</Badge>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h5 className="text-blue-400 font-medium mb-2">Recovered Tokens</h5>
                <p className="text-white text-xl font-bold">{currentSituation.recoveredTokens}</p>
                <Badge className="bg-blue-600 text-white mt-2">Confirmed</Badge>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h5 className="text-purple-400 font-medium mb-2">License</h5>
                <p className="text-white text-xl font-bold">{currentSituation.license}</p>
                <Badge className="bg-purple-600 text-white mt-2">Standard</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Original Token Information */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Original Token Details</CardTitle>
            <CardDescription className="text-gray-400">
              Help us understand your original investment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="originalToken" className="text-gray-300">Original Token Contract/Symbol</Label>
                  <Input
                    id="originalToken"
                    value={originalToken}
                    onChange={(e) => setOriginalToken(e.target.value)}
                    placeholder="e.g., ETHG or 0x..."
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="purchasePrice" className="text-gray-300">Purchase Price (USD or ETH)</Label>
                  <Input
                    id="purchasePrice"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="e.g., $2,500 or 1.5 ETH"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="tokenAmount" className="text-gray-300">Amount of Original Tokens</Label>
                <Input
                  id="tokenAmount"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="e.g., 1,990,000"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Questions */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">Key Information Needed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {keyQuestions.map((question, index) => (
                <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <p className="text-gray-300">{question}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Options */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white">Potential Monetization Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformOptions.map((option, index) => (
                <div key={index} className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-orange-400 font-medium">{option.platform}</h5>
                    <Badge className="bg-orange-600 text-white">{option.timeframe}</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{option.suitability}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <span className="text-gray-400">Requirements: {option.requirements}</span>
                    <span className="text-gray-400">Fees: {option.fees}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Analysis */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white">Investment Recovery Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h5 className="text-purple-400 font-medium mb-2">Original Investment</h5>
                <p className="text-white text-lg">{purchasePrice || "Pending input"}</p>
                <p className="text-gray-400 text-sm">Amount you paid</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h5 className="text-blue-400 font-medium mb-2">Recovery Target</h5>
                <p className="text-white text-lg">1,990,000 ETHGR</p>
                <p className="text-gray-400 text-sm">Tokens recovered</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h5 className="text-green-400 font-medium mb-2">Market Strategy</h5>
                <p className="text-white text-lg">Platform TBD</p>
                <p className="text-gray-400 text-sm">Best monetization route</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-lg py-8"
            onClick={() => window.open('/contract-verification-guide', '_self')}
          >
            <FileText className="h-6 w-6 mr-2" />
            Verify Contract
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-lg py-8"
            onClick={() => window.open('https://dextools.io/app/en/ether/pool-explorer', '_blank')}
          >
            <Search className="h-6 w-6 mr-2" />
            Research Platforms
          </Button>
          
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-lg py-8"
            onClick={() => window.open('https://app.uniswap.org/#/add/v2', '_blank')}
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            Create Pool
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-lg py-8"
            onClick={() => window.open(`https://etherscan.io/address/${currentSituation.recoveryContract}`, '_blank')}
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            View Contract
          </Button>
        </div>

        {/* Next Steps */}
        <Alert className="border-green-500 bg-green-500/10">
          <Calculator className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center">
            <strong>Next:</strong> Share details about your original token purchase so we can identify the best platform for monetizing your recovered ETHGR tokens.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}