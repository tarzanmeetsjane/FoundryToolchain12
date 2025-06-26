import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Bot, Wallet, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, DollarSign, Target, BarChart3 } from "lucide-react";

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            ETHGR Foundation Recovery Platform
          </h1>
          <p className="text-2xl text-slate-600 mb-6">
            Authentic Blockchain Recovery • Base L2 Integration • Zero-Config Automation
          </p>
          <div className="inline-block bg-green-100 border-2 border-green-300 px-8 py-4 rounded-xl pulse-green">
            <span className="text-green-800 font-bold text-xl">
              ✓ 1,990,000 ETHGR TOKENS READY FOR BASE L2 DEPLOYMENT
            </span>
          </div>
          
          {/* Quick Access to Bot Dashboard */}
          <div className="mt-6">
            <Link href="/bot-dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                <BarChart3 className="mr-2 h-5 w-5" />
                Zero-Config Bot Revenue Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Current Status Summary */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 slide-up">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Current Foundation Status</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">Token Holdings</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">ETHGR Tokens:</span>
                  <span className="font-bold text-green-800">1,990,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Contract Address:</span>
                  <span className="font-bold text-green-800 text-sm">0xc2B6...7308</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Deployment Status:</span>
                  <span className="font-bold text-green-600">✓ Live</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Available Funding</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Foundation ETH:</span>
                  <span className="font-bold text-blue-800">$20.61</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Bot Network Value:</span>
                  <span className="font-bold text-blue-800">$250+ Est.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Base L2 Target:</span>
                  <span className="font-bold text-amber-600">$140-240</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Discovery Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-700">Wallet Addresses:</span>
                  <span className="font-bold text-purple-800">1,436</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">LP Positions:</span>
                  <span className="font-bold text-purple-800">171</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Active Bots:</span>
                  <span className="font-bold text-green-600">Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/bot-dashboard">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-200 hover:border-blue-400">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Bot className="mr-2 h-6 w-6" />
                  Bot Revenue Dashboard
                </CardTitle>
                <CardDescription>
                  Track automated trading bot performance and funding sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Discovered Bots:</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>LP Positions:</span>
                    <span className="font-semibold">171 Found</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Funding Analysis:</span>
                    <span className="font-semibold text-green-600">$250+ Est.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Wallet className="mr-2 h-6 w-6" />
                Foundation Wallet
              </CardTitle>
              <CardDescription>
                Main wallet with verified ETHGR token holdings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>ETH Balance:</span>
                  <span className="font-semibold">0.008588 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span>USD Value:</span>
                  <span className="font-semibold">$20.61</span>
                </div>
                <div className="flex justify-between">
                  <span>ETHGR Tokens:</span>
                  <span className="font-semibold text-green-600">1,990,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Target className="mr-2 h-6 w-6" />
                Base L2 Deployment
              </CardTitle>
              <CardDescription>
                90% cost reduction strategy for optimal deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Target Cost:</span>
                  <span className="font-semibold">$140-240</span>
                </div>
                <div className="flex justify-between">
                  <span>vs Mainnet:</span>
                  <span className="font-semibold text-green-600">90% Savings</span>
                </div>
                <div className="flex justify-between">
                  <span>Readiness:</span>
                  <Badge variant="outline" className="border-purple-400 text-purple-700">
                    Analyzing
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Foundation Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center border-2 border-blue-200">
              <div className="text-3xl font-bold text-blue-700 mb-2">1,436</div>
              <div className="text-blue-600">Wallet Addresses</div>
              <div className="text-sm text-blue-500 mt-1">From trading bot analysis</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 text-center border-2 border-green-200">
              <div className="text-3xl font-bold text-green-700 mb-2">171</div>
              <div className="text-green-600">LP Positions</div>
              <div className="text-sm text-green-500 mt-1">Across multiple protocols</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6 text-center border-2 border-purple-200">
              <div className="text-3xl font-bold text-purple-700 mb-2">90%</div>
              <div className="text-purple-600">Cost Reduction</div>
              <div className="text-sm text-purple-500 mt-1">Base L2 vs Ethereum</div>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-6 text-center border-2 border-amber-200">
              <div className="text-3xl font-bold text-amber-700 mb-2">$45K</div>
              <div className="text-amber-600">Target Conversion</div>
              <div className="text-sm text-amber-500 mt-1">Foundation relief fund</div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Next Steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Immediate Actions</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-300" />
                  <span>Monitor bot revenue dashboard</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-300" />
                  <span>Verify LP position values</span>
                </li>
                <li className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-300" />
                  <span>Execute funding liquidation</span>
                </li>
                <li className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-blue-300" />
                  <span>Deploy on Base L2</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Strategic Goals</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-green-300" />
                  <span>Generate $45,000 foundation relief</span>
                </li>
                <li className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5 text-blue-300" />
                  <span>Maintain $605,570 reserve</span>
                </li>
                <li className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-purple-300" />
                  <span>Enable victim assistance operations</span>
                </li>
                <li className="flex items-center">
                  <Bot className="mr-2 h-5 w-5 text-orange-300" />
                  <span>Automate revenue generation</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/bot-dashboard">
              <Button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
                <BarChart3 className="mr-2 h-6 w-6" />
                Access Bot Revenue Dashboard
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}