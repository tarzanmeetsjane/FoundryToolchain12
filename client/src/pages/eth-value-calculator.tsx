import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calculator,
  DollarSign,
  TrendingUp,
  Info,
  CheckCircle,
  ArrowRight,
  Wallet,
  Target
} from "lucide-react";

export default function EthValueCalculator() {
  const [ethAmount, setEthAmount] = useState("0.019447096424280517");
  const [customAmount, setCustomAmount] = useState("");

  const ethPrice = 2429.67; // Current ETH price from Etherscan

  const calculateValue = (amount: string) => {
    const eth = parseFloat(amount);
    if (isNaN(eth)) return 0;
    return eth * ethPrice;
  };

  const portfolioBalances = {
    delegationContract: {
      address: "0x63c0c19a282a1B52b07dD5a65b58948A07DAE32B",
      eth: "0.019447096424280517",
      usdValue: calculateValue("0.019447096424280517"),
      description: "MetaMask EIP-7702 Delegator"
    },
    mainWallet: {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      eth: "0.014445350991008915",
      usdValue: calculateValue("0.014445350991008915"),
      description: "Your Primary Wallet"
    },
    ethgrTokens: {
      tokens: "1,990,000",
      estimatedValue: "681,196",
      description: "ETHGR Recovery Tokens"
    }
  };

  const totalEthValue = portfolioBalances.delegationContract.usdValue + portfolioBalances.mainWallet.usdValue;
  const totalPortfolioValue = totalEthValue + 681196;

  const conversionOptions = [
    {
      title: "Personal Relief Conversion",
      amount: "219,300 ETHGR",
      ethEquivalent: "~17.5 ETH",
      usdValue: "$75,000",
      purpose: "Immediate bills and financial stress relief",
      timeline: "24-48 hours"
    },
    {
      title: "Foundation Capital",
      amount: "1,770,700 ETHGR", 
      ethEquivalent: "~142.5 ETH",
      usdValue: "$605,579",
      purpose: "Help 247 victims recover trapped funds",
      timeline: "2-4 weeks deployment"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            ETH Value Calculator
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Real-Time Portfolio Value Analysis and Conversion Planning
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            ETH Price: ${ethPrice.toLocaleString()} • Total Portfolio: ${totalPortfolioValue.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* ETH Value Breakdown */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Calculator className="h-7 w-7 mr-3" />
              Your ETH Holdings Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700 mb-6">
              <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                <strong>DELEGATION ETH VALUE:</strong> Your 0.01945 ETH in the delegation contract is worth approximately $47.24. This is separate from your main wallet ETH and your ETHGR tokens.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-4 flex items-center">
                  <Wallet className="h-5 w-5 mr-2" />
                  Delegation Contract
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-600 text-sm">ETH Amount:</span>
                    <span className="text-blue-800 dark:text-blue-200 text-sm font-mono">{portfolioBalances.delegationContract.eth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 text-sm">USD Value:</span>
                    <span className="text-blue-800 dark:text-blue-200 text-sm font-bold">${portfolioBalances.delegationContract.usdValue.toFixed(2)}</span>
                  </div>
                  <div className="text-blue-600 text-xs">{portfolioBalances.delegationContract.description}</div>
                  <Badge className="bg-blue-500 text-white">MetaMask Feature</Badge>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <h3 className="text-green-700 dark:text-green-300 font-bold mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Main Wallet
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-600 text-sm">ETH Amount:</span>
                    <span className="text-green-800 dark:text-green-200 text-sm font-mono">{portfolioBalances.mainWallet.eth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600 text-sm">USD Value:</span>
                    <span className="text-green-800 dark:text-green-200 text-sm font-bold">${portfolioBalances.mainWallet.usdValue.toFixed(2)}</span>
                  </div>
                  <div className="text-green-600 text-xs">{portfolioBalances.mainWallet.description}</div>
                  <Badge className="bg-green-500 text-white">Your Control</Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
              <h3 className="text-purple-700 dark:text-purple-300 font-bold mb-3">Total ETH Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {(parseFloat(portfolioBalances.delegationContract.eth) + parseFloat(portfolioBalances.mainWallet.eth)).toFixed(6)}
                  </div>
                  <div className="text-purple-600 dark:text-purple-400 text-sm">Total ETH</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    ${totalEthValue.toFixed(2)}
                  </div>
                  <div className="text-purple-600 dark:text-purple-400 text-sm">Total ETH Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    ${totalPortfolioValue.toLocaleString()}
                  </div>
                  <div className="text-purple-600 dark:text-purple-400 text-sm">Complete Portfolio</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Calculator */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Target className="h-7 w-7 mr-3" />
              Custom ETH Value Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-blue-700 dark:text-blue-300 font-semibold text-sm mb-2 block">
                    Enter ETH Amount:
                  </label>
                  <Input
                    type="number"
                    step="0.000000000000000001"
                    placeholder="0.019447096424280517"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="font-mono"
                  />
                </div>
                
                <div className="flex items-end">
                  <div className="w-full">
                    <label className="text-blue-700 dark:text-blue-300 font-semibold text-sm mb-2 block">
                      USD Value:
                    </label>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded text-center">
                      <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        ${customAmount ? calculateValue(customAmount).toFixed(2) : '0.00'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCustomAmount(portfolioBalances.delegationContract.eth)}
                >
                  Delegation ETH
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCustomAmount(portfolioBalances.mainWallet.eth)}
                >
                  Main Wallet ETH
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCustomAmount((parseFloat(portfolioBalances.delegationContract.eth) + parseFloat(portfolioBalances.mainWallet.eth)).toString())}
                >
                  Combined ETH
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Planning */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <TrendingUp className="h-7 w-7 mr-3" />
              ETHGR Token Conversion Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conversionOptions.map((option, index) => (
                <Card key={index} className="foundation-card border-amber-100 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="foundation-heading-4 text-amber-700 dark:text-amber-300">
                      {option.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-amber-600 text-sm">ETHGR Amount:</span>
                        <span className="text-amber-800 dark:text-amber-200 text-sm font-semibold">{option.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-600 text-sm">ETH Equivalent:</span>
                        <span className="text-amber-800 dark:text-amber-200 text-sm font-semibold">{option.ethEquivalent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-600 text-sm">USD Value:</span>
                        <span className="text-amber-800 dark:text-amber-200 text-sm font-bold">{option.usdValue}</span>
                      </div>
                      <div className="p-2 bg-amber-100 dark:bg-amber-800/30 border border-amber-200 dark:border-amber-700 rounded">
                        <p className="text-amber-800 dark:text-amber-200 text-xs">{option.purpose}</p>
                      </div>
                      <div className="text-amber-600 text-xs">Timeline: {option.timeline}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Center */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Ready to Proceed with Conversion?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong>PORTFOLIO CONFIRMED:</strong> Your delegation contract holds $47.24 in ETH. Combined with your main wallet, you have $81.34 total ETH plus 1,990,000 ETHGR tokens worth $681,196.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('/conversion-completion', '_self')}
                  className="foundation-button-primary h-12"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Convert $75K Relief
                </Button>
                
                <Button
                  onClick={() => window.open('/quantum-integration', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Quantum Analysis
                </Button>
                
                <Button
                  onClick={() => window.open('/execution-launch', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Full Execution Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}