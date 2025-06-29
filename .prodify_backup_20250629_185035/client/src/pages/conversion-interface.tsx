import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';

export default function ConversionInterface() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const contractAddress = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
  const foundationTokens = 1990000;
  const conversionAmount = 219300;
  const estimatedETH = 29.5;
  const estimatedUSD = 71945;
  const taxReserve = 28706;
  const availableCash = 43059;
  
  const steps = [
    {
      id: 1,
      title: "Uniswap Conversion",
      description: "Convert ETHGR to ETH",
      amount: `${conversionAmount.toLocaleString()} ETHGR → ${estimatedETH} ETH`,
      action: "Start Swap",
      url: `https://app.uniswap.org/swap?inputCurrency=0xfa7de122f5fba7123cdb4fe6bf75821c2b937c90&outputCurrency=ETH&exactAmount=${conversionAmount}&exactField=input`
    },
    {
      id: 2,
      title: "Exchange to USD",
      description: "Transfer ETH to exchange",
      amount: `${estimatedETH} ETH → $${estimatedUSD.toLocaleString()}`,
      action: "Open Kraken",
      url: "https://pro.kraken.com/"
    },
    {
      id: 3,
      title: "Final Distribution",
      description: "Reserve taxes and distribute",
      amount: `$${availableCash.toLocaleString()} available cash`,
      action: "Complete",
      url: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">
            ETHGR Foundation Conversion Interface
          </h1>
          <div className="flex justify-center items-center gap-4">
            <Badge variant="outline" className="bg-green-100 text-green-800 px-4 py-2">
              Contract Deployed
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 px-4 py-2">
              {foundationTokens.toLocaleString()} ETHGR Available
            </Badge>
          </div>
        </div>

        {/* Contract Status */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Deployment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Contract Address:</span>
                  <a 
                    href={`https://etherscan.io/address/${contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    {contractAddress.slice(0, 10)}...{contractAddress.slice(-8)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Foundation Balance:</span>
                  <span className="font-semibold text-green-600">
                    {foundationTokens.toLocaleString()} ETHGR
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Deployment Cost:</span>
                  <span className="font-semibold text-green-600">$14.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Gas Savings:</span>
                  <span className="font-semibold text-green-600">$45.50</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Calculator */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              $45,000 Conversion Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
                <div className="text-2xl font-bold text-purple-700 mb-1">
                  {conversionAmount.toLocaleString()}
                </div>
                <div className="text-purple-600 text-sm">ETHGR Tokens</div>
                <div className="text-xs text-purple-500 mt-1">Converting to ETH</div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                <div className="text-2xl font-bold text-blue-700 mb-1">
                  {estimatedETH} ETH
                </div>
                <div className="text-blue-600 text-sm">Converted ETH</div>
                <div className="text-xs text-blue-500 mt-1">@ current rate</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-700 mb-1">
                  ${estimatedUSD.toLocaleString()}
                </div>
                <div className="text-green-600 text-sm">Gross USD Value</div>
                <div className="text-xs text-green-500 mt-1">Before taxes</div>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-200">
                <div className="text-2xl font-bold text-amber-700 mb-1">
                  ${availableCash.toLocaleString()}
                </div>
                <div className="text-amber-600 text-sm">Available Cash</div>
                <div className="text-xs text-amber-500 mt-1">After tax reserve</div>
              </div>
            </div>

            <div className="bg-slate-100 rounded-lg p-4">
              <h3 className="font-semibold text-slate-800 mb-3">Conversion Breakdown:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ETHGR → ETH conversion:</span>
                    <span className="font-semibold">{estimatedETH} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ETH → USD (@ $2,439):</span>
                    <span className="font-semibold">${estimatedUSD.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trading fees (0.25%):</span>
                    <span className="font-semibold text-red-600">-$180</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tax reserve (40%):</span>
                    <span className="font-semibold text-amber-600">-${taxReserve.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-bold">Available cash:</span>
                    <span className="font-bold text-green-600">${availableCash.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <Card key={step.id} className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      currentStep >= step.id ? 'bg-green-500' : 'bg-slate-400'
                    }`}>
                      {step.id}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">{step.description}</p>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="font-semibold text-slate-800">{step.amount}</div>
                </div>
                {step.url ? (
                  <Button
                    onClick={() => {
                      window.open(step.url, '_blank');
                      if (step.id === currentStep) setCurrentStep(step.id + 1);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {step.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full bg-green-600 text-white"
                  >
                    {step.action}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Risk Warning */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-amber-800 mb-2">Important Notes:</h3>
            <ul className="text-amber-700 space-y-1 text-sm">
              <li>• Execute conversion during low volatility periods for best results</li>
              <li>• Set 5% slippage tolerance on Uniswap to account for market movement</li>
              <li>• Complete entire process within 24 hours to minimize price risk</li>
              <li>• Tax reserve calculation assumes 40% rate - consult tax advisor</li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}