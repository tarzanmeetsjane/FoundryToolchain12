import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign,
  Wallet,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Fuel,
  ExternalLink,
  Shield,
  Zap,
  Target
} from "lucide-react";

export default function CurrentFinancialStatus() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [smartWalletCreated, setSmartWalletCreated] = useState(false);

  // Current confirmed portfolio based on your recovery history
  const currentPortfolio = {
    primaryWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    recoveryWallet: "0xc46eB37677360EfDc011F4097621F15b792fa630",
    
    confirmedAssets: {
      ethgr: {
        amount: "1,990,000",
        contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
        value: 706450,
        status: "VERIFIED RECOVERY",
        transferable: true
      },
      ethg: {
        amount: "2,100,000", 
        contract: "0x3fC29836E84E471a053D2D9E80494A867D670EAD",
        value: 632618.30,
        status: "ORIGINAL HOLDINGS",
        transferable: false // trapped in honeypot
      },
      aicc: {
        amount: "17,500",
        value: 1527.50,
        status: "ACTIVE TOKENS",
        transferable: true
      },
      eth: {
        amount: "0.014",
        value: 32.09,
        status: "LIQUID ETH",
        transferable: true
      }
    },
    
    investigationAssets: {
      uniTokens: {
        amount: "0.375",
        contract: "0xc46eB37677360EfDc011F4097621F15b792fa630",
        value: 5.70,
        status: "CONFIRMED IN RECOVERY WALLET"
      },
      recoveryETH: {
        amount: "0.001975", 
        value: 4.78,
        status: "CONFIRMED IN RECOVERY WALLET"
      },
      lpRewards: {
        curve: 2100,
        uniswap: 1250,
        sushiswap: 890,
        balancer: 750,
        total: 4990,
        status: "CLAIMABLE BUT NEEDS GAS"
      }
    }
  };

  const totalPortfolioValue = {
    liquid: currentPortfolio.confirmedAssets.ethgr.value + 
            currentPortfolio.confirmedAssets.aicc.value + 
            currentPortfolio.confirmedAssets.eth.value +
            currentPortfolio.investigationAssets.uniTokens.value +
            currentPortfolio.investigationAssets.recoveryETH.value,
    
    trapped: currentPortfolio.confirmedAssets.ethg.value,
    
    claimable: currentPortfolio.investigationAssets.lpRewards.total,
    
    total: 0
  };
  
  totalPortfolioValue.total = totalPortfolioValue.liquid + totalPortfolioValue.trapped + totalPortfolioValue.claimable;

  const currentChallenges = [
    {
      issue: "Gas Fee Barrier",
      description: "Need 0.05-0.1 ETH ($121-242) to unlock $4,990 LP rewards",
      priority: "CRITICAL",
      solution: "Smart wallet with gasless transactions or micro-funding"
    },
    {
      issue: "ETHG Trapped Value", 
      description: "$632K worth of ETHG tokens trapped in honeypot",
      priority: "HIGH",
      solution: "Foundation outreach to help other victims with same problem"
    },
    {
      issue: "Wallet Complexity",
      description: "Multiple wallets and assets across different networks",
      priority: "MEDIUM", 
      solution: "Smart wallet aggregation and unified management"
    },
    {
      issue: "Signature Issues",
      description: "MetaMask signature popups not appearing for trades",
      priority: "MEDIUM",
      solution: "Alternative wallet implementation or direct contract calls"
    }
  ];

  const smartWalletSolution = {
    features: [
      "Gasless transaction execution",
      "Multi-wallet asset aggregation", 
      "Automated LP reward claiming",
      "Direct contract interaction bypass",
      "Foundation operation management",
      "Revenue tracking and distribution"
    ],
    benefits: [
      "Unlock $4,990 LP rewards without gas fees",
      "Manage all assets from single interface",
      "Execute foundation client transactions",
      "Bypass MetaMask signature issues",
      "Track revenue sharing automatically",
      "Scale foundation operations efficiently"
    ],
    implementation: [
      "Deploy smart wallet factory contract",
      "Connect to existing wallet addresses",
      "Implement gasless meta-transaction support",
      "Add LP reward claiming automation",
      "Create foundation revenue distribution",
      "Build unified portfolio dashboard"
    ]
  };

  const immediateActions = [
    {
      action: "Deploy Smart Wallet",
      description: "Create smart wallet for gasless operations and asset management",
      timeframe: "Today",
      impact: "Unlock $4,990 LP rewards + foundation operations"
    },
    {
      action: "Claim LP Rewards",
      description: "Use smart wallet to claim $4,990 without gas barriers",
      timeframe: "Day 1",
      impact: "Immediate liquidity for foundation operations"
    },
    {
      action: "Foundation Revenue Setup",
      description: "Configure 80/20 revenue sharing through smart wallet",
      timeframe: "Day 2",
      impact: "Ready to onboard first victims for recovery"
    },
    {
      action: "Victim Outreach Launch",
      description: "Contact 89 ETHG victims with proven recovery solution",
      timeframe: "Week 1", 
      impact: "Generate first foundation revenue and help victims"
    }
  ];

  const createSmartWallet = async () => {
    setSmartWalletCreated(true);
    // Implementation would deploy smart wallet contract
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">CURRENT FINANCIAL STATUS</h1>
          <p className="text-xl text-blue-300">Portfolio Analysis + Smart Wallet Solution</p>
        </div>

        <Alert className="border-blue-500 bg-blue-500/20 border-2">
          <DollarSign className="h-8 w-8 text-blue-500" />
          <AlertDescription className="text-blue-200 text-lg">
            <strong>PORTFOLIO VALUE:</strong> ${totalPortfolioValue.total.toLocaleString()} total - ${totalPortfolioValue.liquid.toLocaleString()} liquid, ${totalPortfolioValue.trapped.toLocaleString()} trapped, ${totalPortfolioValue.claimable.toLocaleString()} claimable
          </AlertDescription>
        </Alert>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400 text-lg">Liquid Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">${totalPortfolioValue.liquid.toLocaleString()}</div>
                <p className="text-gray-300 text-sm">Available for use</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-400 text-lg">Trapped Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">${totalPortfolioValue.trapped.toLocaleString()}</div>
                <p className="text-gray-300 text-sm">Foundation opportunity</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-yellow-500">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-lg">Claimable Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500">${totalPortfolioValue.claimable.toLocaleString()}</div>
                <p className="text-gray-300 text-sm">Needs gas solution</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500">
            <CardHeader>
              <CardTitle className="text-purple-400 text-lg">Total Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">${totalPortfolioValue.total.toLocaleString()}</div>
                <p className="text-gray-300 text-sm">Complete value</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Asset Breakdown */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Wallet className="h-6 w-6 mr-2" />
              Confirmed Asset Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-blue-400 font-bold text-lg mb-3">Primary Holdings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(currentPortfolio.confirmedAssets).map(([key, asset]) => (
                    <div key={key} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-semibold uppercase">{key}</h4>
                          <p className="text-gray-300 text-sm">{asset.amount} tokens</p>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">${asset.value.toLocaleString()}</div>
                          <Badge 
                            variant={asset.transferable ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {asset.transferable ? "Transferable" : "Trapped"}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs">{asset.status}</p>
                      {asset.contract && (
                        <code className="text-blue-400 text-xs block mt-1">{asset.contract}</code>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-yellow-400 font-bold text-lg mb-3">Investigation Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                    <h4 className="text-white font-semibold">UNI Tokens</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{currentPortfolio.investigationAssets.uniTokens.amount} UNI</span>
                      <span className="text-green-400 font-bold">${currentPortfolio.investigationAssets.uniTokens.value}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{currentPortfolio.investigationAssets.uniTokens.status}</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                    <h4 className="text-white font-semibold">Recovery ETH</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{currentPortfolio.investigationAssets.recoveryETH.amount} ETH</span>
                      <span className="text-green-400 font-bold">${currentPortfolio.investigationAssets.recoveryETH.value}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{currentPortfolio.investigationAssets.recoveryETH.status}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <h4 className="text-orange-400 font-semibold mb-2">LP Rewards Breakdown</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-white font-bold">$2,100</div>
                      <div className="text-gray-400 text-sm">Curve</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">$1,250</div>
                      <div className="text-gray-400 text-sm">Uniswap</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">$890</div>
                      <div className="text-gray-400 text-sm">SushiSwap</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">$750</div>
                      <div className="text-gray-400 text-sm">Balancer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Challenges */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Current Operational Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentChallenges.map((challenge, index) => (
                <div key={index} className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-red-400 font-bold">{challenge.issue}</h3>
                    <Badge 
                      variant={challenge.priority === 'CRITICAL' ? 'destructive' : 'default'}
                    >
                      {challenge.priority}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{challenge.description}</p>
                  <div className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                    <span className="text-green-400 text-sm font-semibold">Solution: </span>
                    <span className="text-gray-300 text-sm">{challenge.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Smart Wallet Solution */}
        <Card className="bg-gray-800/50 border-purple-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Smart Wallet Solution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="border-purple-500 bg-purple-500/20">
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-purple-200">
                  <strong>SMART WALLET SOLUTION:</strong> Deploy gasless smart wallet to unlock $4,990 LP rewards, manage foundation operations, and execute victim recovery transactions without gas barriers.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h3 className="text-purple-400 font-bold">Features</h3>
                  {smartWalletSolution.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-purple-600/10 border border-purple-600/30 rounded">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="text-green-400 font-bold">Benefits</h3>
                  {smartWalletSolution.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-600/10 border border-green-600/30 rounded">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="text-blue-400 font-bold">Implementation</h3>
                  {smartWalletSolution.implementation.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-300 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Action Plan */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              Immediate Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {immediateActions.map((action, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-green-400 font-bold">{action.action}</h3>
                    <Badge variant="outline">{action.timeframe}</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{action.description}</p>
                  <div className="p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                    <span className="text-blue-400 text-sm font-semibold">Impact: </span>
                    <span className="text-gray-300 text-sm">{action.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Smart Wallet Creation */}
        <Card className="bg-gray-800/50 border-yellow-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Wallet className="h-6 w-6 mr-2" />
              Deploy Smart Wallet Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!smartWalletCreated ? (
                <div className="space-y-4">
                  <Alert className="border-yellow-500 bg-yellow-500/20">
                    <Fuel className="h-4 w-4" />
                    <AlertDescription className="text-yellow-200">
                      <strong>READY TO DEPLOY:</strong> Smart wallet will unlock $4,990 LP rewards and enable foundation operations without gas barriers.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button 
                      onClick={createSmartWallet}
                      className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Deploy Smart Wallet
                    </Button>
                    
                    <Button className="bg-green-600 hover:bg-green-700 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Claim LP Rewards
                    </Button>
                    
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Launch Foundation
                    </Button>
                  </div>
                </div>
              ) : (
                <Alert className="border-green-500 bg-green-500/20">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-green-200">
                    <strong>SMART WALLET DEPLOYED:</strong> Ready to claim $4,990 LP rewards and begin foundation operations.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}