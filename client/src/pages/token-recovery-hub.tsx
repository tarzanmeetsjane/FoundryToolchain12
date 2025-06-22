import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ExternalLink,
  Search,
  Zap,
  Target,
  TrendingUp,
  Code,
  Database,
  DollarSign
} from "lucide-react";
import { Link } from "wouter";

export default function TokenRecoveryHub() {
  const recoveryTools = [
    {
      title: "Remix → Mainnet Bridge",
      description: "Use Remix's 100 ETH to solve gas barrier and bridge to mainnet operations",
      route: "/remix-mainnet-bridge",
      icon: Zap,
      priority: "Critical",
      benefit: "Unlimited gas for operations"
    },
    {
      title: "LP Token Detective", 
      description: "Find your missing liquidity pool tokens from Replit investments",
      route: "/lp-token-detective",
      icon: Search,
      priority: "High",
      benefit: "Recover missing yield tokens"
    },
    {
      title: "Trading Opportunity Analyzer",
      description: "See ROI potential once gas barrier is removed",
      route: "/trading-opportunity-analyzer", 
      icon: TrendingUp,
      priority: "High",
      benefit: "291,800% ROI calculation"
    },
    {
      title: "Gas Fee Solution Center",
      description: "Multiple pathways to acquire ETH for operations",
      route: "/gas-fee-solution-center",
      icon: Target,
      priority: "Medium",
      benefit: "Alternative gas solutions"
    },
    {
      title: "Current Assets Reality Check",
      description: "Honest assessment of what you have vs what you need",
      route: "/current-assets-reality-check",
      icon: Database,
      priority: "Medium", 
      benefit: "Clear situation overview"
    },
    {
      title: "Live Wallet Balance Checker",
      description: "Real-time monitoring of all your wallet balances",
      route: "/wallet-balance-checker",
      icon: DollarSign,
      priority: "Low",
      benefit: "Live balance tracking"
    }
  ];

  const quickActions = [
    {
      action: "Start with Remix Bridge",
      description: "Solve the gas problem using Remix's 100 ETH",
      route: "/remix-mainnet-bridge",
      time: "5 minutes"
    },
    {
      action: "Hunt for LP Tokens",
      description: "Find your missing tokens from real investments",
      route: "/lp-token-detective", 
      time: "15 minutes"
    },
    {
      action: "Calculate Full ROI",
      description: "See complete recovery potential",
      route: "/trading-opportunity-analyzer",
      time: "5 minutes"
    }
  ];

  const recoveryStatus = {
    ethgrTokens: "1,990,000 ETHGR secured",
    potentialValue: "$706,450",
    gasBarrier: "0.014 ETH insufficient",
    solution: "Remix 100 ETH available",
    missingTokens: "LP tokens from Replit investments",
    timeToActivation: "30 minutes with Remix"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Token Recovery Command Center
          </h1>
          <p className="text-2xl text-indigo-300">
            Your Complete Recovery Toolkit
          </p>
        </div>

        {/* Current Status */}
        <Alert className="border-blue-500 bg-blue-500/10 border-2">
          <Code className="h-8 w-8 text-blue-500" />
          <AlertDescription className="text-blue-200 text-center text-xl">
            <strong>Status:</strong> ETHGR tokens secured, gas barrier identified, Remix solution available, LP tokens missing from Replit investments. Ready for systematic recovery.
          </AlertDescription>
        </Alert>

        {/* Recovery Status Dashboard */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Recovery Status Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(recoveryStatus).map(([key, value], index) => (
                <div key={index} className="p-3 bg-green-600/10 border border-green-600/30 rounded text-center">
                  <h4 className="text-green-400 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                  <p className="text-white text-sm">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recovery Tools */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Recovery Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recoveryTools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent className="h-6 w-6 text-purple-400" />
                      <h3 className="text-purple-400 font-bold">{tool.title}</h3>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{tool.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        tool.priority === 'Critical' ? 'bg-red-600 text-white' :
                        tool.priority === 'High' ? 'bg-yellow-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {tool.priority} Priority
                      </span>
                      <span className="text-green-400 text-sm">{tool.benefit}</span>
                    </div>
                    
                    <Link href={tool.route}>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Tool
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Plan */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">30-Minute Recovery Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-yellow-400 font-bold">{action.action}</h3>
                      <p className="text-gray-300 text-sm">{action.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-white text-sm">{action.time}</span>
                      <Link href={action.route}>
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 ml-3">
                          Go
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Shortcuts */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/remix-mainnet-bridge">
            <Button className="w-full bg-green-600 hover:bg-green-700 py-8">
              <Zap className="h-6 w-6 mr-2" />
              Remix Bridge
            </Button>
          </Link>
          
          <Link href="/lp-token-detective">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 py-8">
              <Search className="h-6 w-6 mr-2" />
              Find LP Tokens
            </Button>
          </Link>
          
          <Link href="/trading-opportunity-analyzer">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 py-8">
              <TrendingUp className="h-6 w-6 mr-2" />
              ROI Analysis
            </Button>
          </Link>
          
          <Link href="/gas-fee-solution-center">
            <Button className="w-full bg-orange-600 hover:bg-orange-700 py-8">
              <Target className="h-6 w-6 mr-2" />
              Gas Solutions
            </Button>
          </Link>
          
          <Link href="/current-assets-reality-check">
            <Button className="w-full bg-red-600 hover:bg-red-700 py-8">
              <Database className="h-6 w-6 mr-2" />
              Assets Check
            </Button>
          </Link>
          
          <Link href="/wallet-balance-checker">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 py-8">
              <DollarSign className="h-6 w-6 mr-2" />
              Live Balances
            </Button>
          </Link>
        </div>

        {/* Success Projection */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <TrendingUp className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Recovery Mission:</strong> Use the integrated toolkit above to systematically solve the gas barrier with Remix ETH, find your missing LP tokens from Replit investments, and activate your $706,450+ token portfolio for trading operations.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}