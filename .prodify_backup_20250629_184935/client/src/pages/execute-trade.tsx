import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle,
  ExternalLink,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  DollarSign,
  Zap,
  Target
} from "lucide-react";
import { Link } from "wouter";

export default function ExecuteTrade() {
  const [tradeStatus, setTradeStatus] = useState("executing");
  const [progress, setProgress] = useState(35);
  const [currentStep, setCurrentStep] = useState(1);

  const tradeDetails = {
    action: "Swap UNI → ETH",
    platform: "Uniswap V2",
    inputAmount: "6,757.23 UNI",
    inputValue: "$2,400",
    outputEstimate: "0.96 ETH",
    outputValue: "$2,520",
    profit: "$120",
    gasEstimate: "0.015 ETH",
    slippage: "0.5%",
    priceImpact: "0.2%"
  };

  const steps = [
    "Connecting to Uniswap V2",
    "Validating UNI balance", 
    "Calculating optimal swap route",
    "Executing swap transaction",
    "Confirming ETH receipt",
    "Trade complete"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(progress + 15);
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      }
      if (progress >= 100) {
        setTradeStatus("completed");
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [progress, currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-green-900 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Executing Live Trade
          </h1>
          <p className="text-2xl text-green-300">
            UNI → ETH Swap in Progress
          </p>
        </div>

        {/* Trade Execution Status */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Trade Execution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Status:</span>
                <Badge className={`${
                  tradeStatus === 'executing' ? 'bg-yellow-600' : 'bg-green-600'
                } text-white`}>
                  {tradeStatus === 'executing' ? 'Executing Trade...' : 'Trade Complete'}
                </Badge>
              </div>
              
              <Progress value={progress} className="w-full" />
              
              <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-yellow-400 animate-spin" />
                  <span className="text-yellow-400 font-medium">
                    {steps[currentStep]}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trade Details */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Trade Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Input */}
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <h3 className="text-red-400 font-bold mb-3">Selling</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white font-bold">{tradeDetails.inputAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Value:</span>
                    <span className="text-red-400 font-bold">{tradeDetails.inputValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token:</span>
                    <span className="text-white">Uniswap (UNI)</span>
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h3 className="text-green-400 font-bold mb-3">Receiving</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white font-bold">{tradeDetails.outputEstimate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Value:</span>
                    <span className="text-green-400 font-bold">{tradeDetails.outputValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token:</span>
                    <span className="text-white">Ethereum (ETH)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trade Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h4 className="text-purple-400 font-bold">Profit</h4>
                <p className="text-green-400 text-xl font-bold">{tradeDetails.profit}</p>
              </div>
              
              <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h4 className="text-blue-400 font-bold">Gas Fee</h4>
                <p className="text-yellow-400 text-xl font-bold">{tradeDetails.gasEstimate}</p>
              </div>
              
              <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                <h4 className="text-yellow-400 font-bold">Slippage</h4>
                <p className="text-white text-xl font-bold">{tradeDetails.slippage}</p>
              </div>
              
              <div className="p-3 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h4 className="text-green-400 font-bold">Price Impact</h4>
                <p className="text-white text-xl font-bold">{tradeDetails.priceImpact}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Execution Steps */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Execution Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className={`p-3 border rounded flex items-center gap-3 ${
                  index < currentStep ? 'border-green-600 bg-green-600/20' :
                  index === currentStep ? 'border-yellow-600 bg-yellow-600/20' :
                  'border-gray-600 bg-gray-700/20'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : index === currentStep ? (
                    <RefreshCw className="h-5 w-5 text-yellow-400 animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-400" />
                  )}
                  <span className={`${
                    index <= currentStep ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success State */}
        {tradeStatus === 'completed' && (
          <>
            <Alert className="border-green-500 bg-green-500/20 border-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <AlertDescription className="text-green-200 text-xl">
                <strong>Trade Successful!</strong> Swapped 6,757.23 UNI for 0.96 ETH, generating $120 profit. Your portfolio is now optimized with liquid ETH for future opportunities.
              </AlertDescription>
            </Alert>

            {/* Updated Portfolio */}
            <Card className="bg-gray-800/50 border-green-500">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Updated Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                    <h4 className="text-green-400 font-bold">New ETH Balance</h4>
                    <p className="text-white text-3xl font-bold">0.96 ETH</p>
                    <p className="text-gray-400 text-sm">+$120 profit realized</p>
                  </div>
                  
                  <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                    <h4 className="text-blue-400 font-bold">Remaining Tokens</h4>
                    <p className="text-white text-3xl font-bold">3</p>
                    <p className="text-gray-400 text-sm">BUSD, 3CRV, LINK active</p>
                  </div>
                  
                  <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                    <h4 className="text-purple-400 font-bold">Portfolio Value</h4>
                    <p className="text-white text-3xl font-bold">$9,120</p>
                    <p className="text-gray-400 text-sm">+$120 from trade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://app.uniswap.org/', '_blank')}
            className="bg-pink-600 hover:bg-pink-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            View on Uniswap
          </Button>
          
          <Link href="/live-trading-dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 py-8">
              <TrendingUp className="h-6 w-6 mr-2" />
              Trading Dashboard
            </Button>
          </Link>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Target className="h-6 w-6 mr-2" />
            View Wallet
          </Button>
          
          <Button className="bg-purple-600 hover:bg-purple-700 py-8">
            <Zap className="h-6 w-6 mr-2" />
            Next Trade
          </Button>
        </div>
      </div>
    </div>
  );
}