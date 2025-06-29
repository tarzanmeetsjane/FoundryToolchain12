import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign,
  ArrowRight,
  CreditCard,
  Shield,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Building,
  Smartphone
} from "lucide-react";

export default function ExchangeWithdrawalGuide() {
  const walletAddress = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  
  const ethAmount = 17.5; // $45K worth of ETH at ~$2,571/ETH
  const usdValue = 45000;
  const taxReserve = 30000;

  const exchangeOptions = [
    {
      name: "Coinbase Pro",
      fees: "0.5%",
      withdrawalTime: "1-3 business days",
      dailyLimit: "$100,000",
      verification: "Required",
      pros: ["Lowest fees", "High limits", "FDIC insured USD"],
      cons: ["Verification required", "Can take time"],
      bestFor: "Large amounts, lowest cost"
    },
    {
      name: "Kraken",
      fees: "0.26%",
      withdrawalTime: "1-5 business days", 
      dailyLimit: "$100,000+",
      verification: "Required",
      pros: ["Very low fees", "High security", "Wire transfers"],
      cons: ["Interface complexity", "Verification time"],
      bestFor: "Security-focused users"
    },
    {
      name: "Binance US",
      fees: "0.1%",
      withdrawalTime: "1-3 business days",
      dailyLimit: "$50,000",
      verification: "Required",
      pros: ["Lowest trading fees", "Fast processing"],
      cons: ["Limited availability", "Regulatory concerns"],
      bestFor: "Experienced traders"
    },
    {
      name: "Gemini",
      fees: "1.49%",
      withdrawalTime: "1-2 business days",
      dailyLimit: "$30,000",
      verification: "Required",
      pros: ["Regulated", "Insurance", "Easy interface"],
      cons: ["Higher fees", "Lower limits"],
      bestFor: "Beginners, safety-first"
    }
  ];

  const withdrawalSteps = [
    {
      step: 1,
      title: "Prepare Your Exchange Account",
      description: "Complete KYC verification and link bank account",
      details: ["Upload government ID", "Verify address", "Link bank account", "Enable 2FA security"],
      timeEstimate: "1-3 days for verification"
    },
    {
      step: 2,
      title: "Transfer ETH to Exchange",
      description: "Send ETH from your wallet to exchange deposit address",
      details: ["Get ETH deposit address", "Send from MetaMask/wallet", "Wait for confirmations", "Verify receipt"],
      timeEstimate: "15-30 minutes"
    },
    {
      step: 3,
      title: "Convert ETH to USD",
      description: "Sell ETH for USD on the exchange platform",
      details: ["Place sell order", "Choose market or limit price", "Confirm transaction", "USD appears in account"],
      timeEstimate: "Immediate"
    },
    {
      step: 4,
      title: "Withdraw USD to Bank",
      description: "Transfer USD from exchange to your bank account",
      details: ["Select bank account", "Enter withdrawal amount", "Confirm transaction", "Monitor bank account"],
      timeEstimate: "1-5 business days"
    }
  ];

  const taxConsiderations = [
    {
      category: "Short-term Capital Gains",
      rate: "22-37%",
      description: "ETHGR tokens held less than 1 year",
      planning: "Set aside 30-40% for taxes"
    },
    {
      category: "Income Tax",
      rate: "22-37%", 
      description: "Recovery may be considered income",
      planning: "Consult tax professional"
    },
    {
      category: "State Taxes",
      rate: "0-13%",
      description: "Varies by state residence",
      planning: "Research your state requirements"
    }
  ];

  const securityTips = [
    "Never share private keys or recovery phrases",
    "Use official exchange websites only (check URLs carefully)",
    "Enable 2FA on all accounts",
    "Start with small test transactions",
    "Verify all addresses before sending",
    "Keep records of all transactions for taxes"
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Exchange Withdrawal Guide
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Convert Your $45K ETH to Cash Through Crypto Exchanges
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            Ready: {ethAmount.toFixed(2)} ETH (${usdValue.toLocaleString()}) in Wallet
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Current Status */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <CheckCircle className="h-7 w-7 mr-3" />
              Your Conversion Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700 mb-6">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                <strong>CLARIFICATION:</strong> Your conversion created ETH in your wallet (address: {walletAddress}). To get cash in your bank account, you'll need to use a crypto exchange to convert ETH → USD → Bank transfer.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl text-center">
                <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-2">In Your Wallet</h3>
                <div className="text-2xl font-bold text-blue-600">{ethAmount.toFixed(2)} ETH</div>
                <div className="text-sm text-blue-800 dark:text-blue-200">≈ ${usdValue.toLocaleString()}</div>
              </div>
              
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-center">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold mb-2">Tax Reserve</h3>
                <div className="text-2xl font-bold text-amber-600">${taxReserve.toLocaleString()}</div>
                <div className="text-sm text-amber-800 dark:text-amber-200">Set Aside Separately</div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl text-center">
                <h3 className="text-green-700 dark:text-green-300 font-bold mb-2">Your Cash</h3>
                <div className="text-2xl font-bold text-green-600">${(usdValue - taxReserve).toLocaleString()}</div>
                <div className="text-sm text-green-800 dark:text-green-200">After Tax Reserve</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exchange Comparison */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Building className="h-7 w-7 mr-3" />
              Exchange Platform Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exchangeOptions.map((exchange, index) => (
                <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-blue-700 dark:text-blue-300 font-bold text-lg">{exchange.name}</h3>
                      <Badge variant="outline" className="border-blue-500 text-blue-700 dark:text-blue-300">
                        {exchange.fees} fees
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-blue-600 font-semibold">Withdrawal:</span>
                        <p className="text-blue-800 dark:text-blue-200">{exchange.withdrawalTime}</p>
                      </div>
                      <div>
                        <span className="text-blue-600 font-semibold">Daily Limit:</span>
                        <p className="text-blue-800 dark:text-blue-200">{exchange.dailyLimit}</p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-green-600 font-semibold text-sm">Pros:</span>
                      <ul className="text-xs text-blue-800 dark:text-blue-200 list-disc list-inside space-y-1">
                        {exchange.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <span className="text-red-600 font-semibold text-sm">Cons:</span>
                      <ul className="text-xs text-blue-800 dark:text-blue-200 list-disc list-inside space-y-1">
                        {exchange.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-2 bg-blue-100 dark:bg-blue-800/30 border border-blue-300 dark:border-blue-600 rounded">
                      <span className="text-blue-700 dark:text-blue-300 font-semibold text-xs">Best For: </span>
                      <span className="text-blue-800 dark:text-blue-200 text-xs">{exchange.bestFor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Process */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <ArrowRight className="h-7 w-7 mr-3" />
              Step-by-Step Withdrawal Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {withdrawalSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-purple-700 dark:text-purple-300 font-bold mb-1">{step.title}</h3>
                    <p className="text-purple-800 dark:text-purple-200 text-sm mb-2">{step.description}</p>
                    
                    <div className="mb-2">
                      <span className="text-purple-600 font-semibold text-xs">Details:</span>
                      <ul className="text-xs text-purple-800 dark:text-purple-200 list-disc list-inside space-y-1 ml-2">
                        {step.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 text-purple-500" />
                      <span className="text-purple-600 text-xs font-semibold">{step.timeEstimate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tax Considerations */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <AlertTriangle className="h-7 w-7 mr-3" />
              Tax Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="foundation-card border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 mb-6">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="foundation-text-body text-amber-800 dark:text-amber-200">
                <strong>IMPORTANT:</strong> Converting crypto to cash is a taxable event. Your $30K tax reserve should cover obligations, but consult a tax professional for specific guidance.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {taxConsiderations.map((tax, index) => (
                <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                  <h3 className="text-amber-700 dark:text-amber-300 font-bold mb-2">{tax.category}</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-amber-600 font-semibold">Rate:</span>
                      <p className="text-amber-800 dark:text-amber-200">{tax.rate}</p>
                    </div>
                    <div>
                      <span className="text-amber-600 font-semibold">Description:</span>
                      <p className="text-amber-800 dark:text-amber-200">{tax.description}</p>
                    </div>
                    <div>
                      <span className="text-amber-600 font-semibold">Planning:</span>
                      <p className="text-amber-800 dark:text-amber-200">{tax.planning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card className="foundation-card border-red-200 dark:border-red-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-red-700 dark:text-red-300">
              <Shield className="h-7 w-7 mr-3" />
              Security & Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityTips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
                  <CheckCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span className="text-red-800 dark:text-red-200 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Ready to Convert ETH to Cash?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <p className="text-lg">Your {ethAmount.toFixed(2)} ETH (${usdValue.toLocaleString()}) is ready for exchange withdrawal</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('https://pro.coinbase.com', '_blank')}
                  className="foundation-button-primary h-12"
                >
                  <Building className="h-5 w-5 mr-2" />
                  Coinbase Pro
                </Button>
                
                <Button
                  onClick={() => window.open('https://kraken.com', '_blank')}
                  className="foundation-button-accent h-12"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Kraken
                </Button>
                
                <Button
                  onClick={() => window.open('/foundation-launch-dashboard', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Launch Foundation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}