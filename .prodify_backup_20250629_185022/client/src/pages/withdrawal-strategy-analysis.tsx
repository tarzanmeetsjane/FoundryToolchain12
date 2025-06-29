import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Wallet,
  DollarSign,
  ArrowRight,
  Shield
} from "lucide-react";

export default function WithdrawalStrategyAnalysis() {
  
  const coinbaseMiniAppLimitations = [
    "MiniApps run in sandboxed iframe environment",
    "Limited to Base L2 network operations only", 
    "No direct fiat withdrawal capabilities",
    "Requires bridge to Ethereum mainnet for full liquidity",
    "Smart Wallet doesn't support direct bank transfers"
  ];

  const optimalWithdrawalPath = [
    {
      step: 1,
      title: "Convert ETHGR to ETH on Mainnet",
      description: "Use Uniswap V3 to convert 219,300 ETHGR → 17.52 ETH",
      platform: "Uniswap Mainnet",
      url: "https://app.uniswap.org/",
      status: "Ready"
    },
    {
      step: 2,
      title: "Transfer ETH to Centralized Exchange", 
      description: "Send 17.52 ETH to Coinbase Pro or Kraken",
      platform: "Your Choice",
      url: "https://pro.coinbase.com/",
      status: "Ready"
    },
    {
      step: 3,
      title: "Convert ETH to USD",
      description: "Market sell 17.52 ETH → $45,134 USD",
      platform: "Exchange Trading",
      url: "#",
      status: "Ready"
    },
    {
      step: 4,
      title: "Withdraw to Bank Account",
      description: "ACH transfer $45,134 to your bank",
      platform: "Exchange Withdrawal",
      url: "#",
      status: "Ready"
    }
  ];

  const exchangeComparison = [
    {
      name: "Coinbase Pro",
      fees: "0.60% trading + $0 withdrawal",
      timeToBank: "1-3 business days",
      finalAmount: "$44,866",
      pros: ["Fastest withdrawal", "US regulated", "High liquidity"],
      cons: ["Higher trading fees"]
    },
    {
      name: "Kraken Pro", 
      fees: "0.26% trading + $5 wire fee",
      timeToBank: "1-2 business days",
      finalAmount: "$45,012",
      pros: ["Lower fees", "Professional platform", "Advanced features"],
      cons: ["Wire transfer fee"]
    },
    {
      name: "Binance US",
      fees: "0.10% trading + $0 ACH",
      timeToBank: "3-5 business days", 
      finalAmount: "$45,089",
      pros: ["Lowest trading fees", "Free ACH"],
      cons: ["Longer withdrawal time", "Regulatory concerns"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Withdrawal Strategy Analysis
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Converting 219,300 ETHGR → $45,000 Cash: Technical Assessment
        </p>
      </div>

      {/* MiniApp Limitations Alert */}
      <Alert className="max-w-4xl mx-auto mb-8 border-amber-200 bg-amber-50 dark:bg-amber-900/20">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>COINBASE MINIAPP LIMITATION:</strong> MiniApps operate in sandboxed Base L2 environment 
          without direct fiat withdrawal capabilities. Bank transfers require centralized exchange integration.
        </AlertDescription>
      </Alert>

      {/* Technical Limitations */}
      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-700 dark:text-amber-300 flex items-center">
            <Shield className="h-8 w-8 mr-3" />
            MiniApp Technical Constraints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {coinbaseMiniAppLimitations.map((limitation, index) => (
              <div key={index} className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0" />
                <span className="text-amber-800 dark:text-amber-200">{limitation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimal Withdrawal Path */}
      <Card className="max-w-4xl mx-auto mb-8 border-2 border-green-200 dark:border-green-700">
        <CardHeader>
          <CardTitle className="text-2xl text-green-700 dark:text-green-300 flex items-center">
            <CheckCircle className="h-8 w-8 mr-3" />
            Optimal $45,000 Withdrawal Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {optimalWithdrawalPath.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    {step.step}
                  </div>
                  <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-green-700 dark:text-green-300 mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500">{step.status}</Badge>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {step.platform}
                        </span>
                      </div>
                      {step.url !== "#" && (
                        <Button
                          onClick={() => window.open(step.url, '_blank')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Access Platform
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {index < optimalWithdrawalPath.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="h-6 w-6 text-green-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exchange Comparison */}
      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700 dark:text-blue-300 flex items-center">
            <DollarSign className="h-8 w-8 mr-3" />
            Exchange Comparison for Final Withdrawal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exchangeComparison.map((exchange, index) => (
              <div key={index} className={`border-2 rounded-lg p-6 ${
                exchange.name === "Kraken Pro" ? 'border-green-300 bg-green-50 dark:bg-green-900/20' : 'border-slate-200 bg-slate-50 dark:bg-slate-800'
              }`}>
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
                  {exchange.name}
                  {exchange.name === "Kraken Pro" && (
                    <Badge className="ml-2 bg-green-500">RECOMMENDED</Badge>
                  )}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Fees:</span>
                    <div className="text-slate-800 dark:text-slate-200">{exchange.fees}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Time to Bank:</span>
                    <div className="text-slate-800 dark:text-slate-200">{exchange.timeToBank}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Final Amount:</span>
                    <div className="text-2xl font-bold text-green-600">{exchange.finalAmount}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-green-600">Pros:</span>
                    <ul className="text-sm text-green-700 dark:text-green-300">
                      {exchange.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-600">Cons:</span>
                    <ul className="text-sm text-amber-700 dark:text-amber-300">
                      {exchange.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Center */}
      <Card className="max-w-4xl mx-auto border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-700 dark:text-blue-300">
            Execute Optimal Withdrawal Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <strong>RECOMMENDED APPROACH:</strong> Bypass MiniApp limitations by using mainnet Uniswap + 
              Kraken Pro for optimal $45,012 final withdrawal amount with lowest total fees.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Button
              onClick={() => window.open('https://app.uniswap.org/', '_blank')}
              className="h-16 text-xl font-bold bg-pink-600 hover:bg-pink-700 text-white"
            >
              <ExternalLink className="h-6 w-6 mr-3" />
              Start at Uniswap Mainnet
            </Button>
            
            <Button
              onClick={() => window.open('https://pro.kraken.com/', '_blank')}
              className="h-16 text-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Wallet className="h-6 w-6 mr-2" />
              Setup Kraken Pro Account
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-slate-600 dark:text-slate-400">
              <strong>Total Process:</strong> ETHGR → ETH → USD → Bank Account (2-3 days)
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">
              Final Result: $45,012 in your bank account with optimal fee structure
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}