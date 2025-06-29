import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  LogOut,
  ExternalLink,
  Wallet,
  Shield,
  RefreshCw,
  Eye,
  AlertTriangle
} from "lucide-react";
import { Link } from "wouter";

export default function SushiSwapLogoutGuide() {
  const [logoutStep, setLogoutStep] = useState(0);

  const logoutMethods = [
    {
      method: "SushiSwap Disconnect",
      steps: [
        "Go to sushi.com",
        "Click your wallet address (top right)",
        "Click 'Disconnect' or 'Logout'",
        "Confirm disconnection"
      ],
      description: "Disconnect from SushiSwap interface",
      security: "Interface only - wallet still accessible"
    },
    {
      method: "MetaMask Disconnect",
      steps: [
        "Open MetaMask extension",
        "Click the three dots (...)",
        "Go to 'Connected sites'",
        "Find sushi.com and click 'Disconnect'"
      ],
      description: "Remove SushiSwap permission from MetaMask",
      security: "Revokes all SushiSwap access permissions"
    },
    {
      method: "Complete Wallet Lock",
      steps: [
        "Open MetaMask",
        "Click the account menu",
        "Select 'Lock'",
        "MetaMask will require password to reopen"
      ],
      description: "Lock entire wallet",
      security: "Full security - no app can access wallet"
    }
  ];

  const securityConsiderations = [
    {
      concern: "Portfolio Visibility",
      description: "Your $686K portfolio remains on blockchain",
      action: "Disconnecting only affects interface access",
      level: "INFO"
    },
    {
      concern: "Active Transactions",
      description: "Any pending transactions will still process",
      action: "Check pending transactions before disconnecting",
      level: "WARNING"
    },
    {
      concern: "Recovery Access",
      description: "ETH recovery operations can continue",
      action: "Reconnect when needed for recovery functions",
      level: "INFO"
    },
    {
      concern: "Address Investigation",
      description: "0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb analysis continues",
      action: "Investigation doesn't require active connection",
      level: "INFO"
    }
  ];

  const quickDisconnectSteps = [
    {
      step: 1,
      action: "Open SushiSwap",
      detail: "Navigate to sushi.com in your browser"
    },
    {
      step: 2,
      action: "Find Wallet Connection",
      detail: "Look for your wallet address in top right corner"
    },
    {
      step: 3,
      action: "Click Disconnect",
      detail: "Click wallet address, then 'Disconnect' option"
    },
    {
      step: 4,
      action: "Confirm Logout",
      detail: "Confirm disconnection in popup dialog"
    }
  ];

  const reconnectionInfo = {
    whenNeeded: "When you need to access portfolio or execute transactions",
    process: "Click 'Connect Wallet' and select MetaMask",
    portfolio: "Your $686K tokens remain safe on blockchain",
    recovery: "37 ETH investigation continues regardless"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            SUSHISWAP LOGOUT GUIDE
          </h1>
          <p className="text-xl text-blue-300">
            Safe Disconnection Methods
          </p>
        </div>

        {/* Quick Steps Alert */}
        <Alert className="border-blue-500 bg-blue-500/20 border-2">
          <LogOut className="h-8 w-8 text-blue-500" />
          <AlertDescription className="text-blue-200 text-lg">
            <strong>QUICK LOGOUT:</strong> Go to sushi.com → Click your wallet address (top right) → Click "Disconnect" → Confirm. Your portfolio remains safe on blockchain.
          </AlertDescription>
        </Alert>

        {/* Logout Methods */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Disconnection Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {logoutMethods.map((method, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="mb-4">
                    <h3 className="text-green-400 font-bold text-lg">{method.method}</h3>
                    <p className="text-gray-400 text-sm">{method.description}</p>
                    <Badge className="mt-2 bg-blue-600 text-white">{method.security}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {method.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{stepIndex + 1}</span>
                        </div>
                        <p className="text-white text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Disconnect Process */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Quick Disconnect Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {quickDisconnectSteps.map((step, index) => (
                <div key={index} className="p-3 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-blue-400 font-bold text-sm mb-2">{step.action}</h3>
                  <p className="text-gray-400 text-xs">{step.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Considerations */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Security & Portfolio Considerations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityConsiderations.map((consideration, index) => (
                <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-yellow-400 font-bold">{consideration.concern}</h3>
                      <p className="text-white text-sm mb-1">{consideration.description}</p>
                      <p className="text-gray-400 text-xs">{consideration.action}</p>
                    </div>
                    <Badge className={
                      consideration.level === "WARNING" ? "bg-orange-600" : "bg-blue-600"
                    }>
                      {consideration.level}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Safety */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Your Portfolio Remains Safe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-purple-400 font-bold">What Stays Safe</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-purple-600/10 border border-purple-600/30 rounded">
                    <p className="text-white text-sm">ETHG: 2,100,000 tokens ($632,618.30)</p>
                  </div>
                  <div className="p-2 bg-purple-600/10 border border-purple-600/30 rounded">
                    <p className="text-white text-sm">AICC: 17,500 tokens ($1,527.50)</p>
                  </div>
                  <div className="p-2 bg-purple-600/10 border border-purple-600/30 rounded">
                    <p className="text-white text-sm">ETHGR: 1,990,000 recovery tokens</p>
                  </div>
                  <div className="p-2 bg-purple-600/10 border border-purple-600/30 rounded">
                    <p className="text-white text-sm">ETH: All confirmed transactions</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-purple-400 font-bold">Ongoing Operations</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                    <p className="text-white text-sm">37 ETH investigation continues</p>
                  </div>
                  <div className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                    <p className="text-white text-sm">Address 0x0c54FcCd analysis active</p>
                  </div>
                  <div className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                    <p className="text-white text-sm">Twitter announcement preparation</p>
                  </div>
                  <div className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                    <p className="text-white text-sm">Dark pool verification ready</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reconnection Info */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Reconnection Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                <h3 className="text-orange-400 font-bold mb-2">When to Reconnect</h3>
                <p className="text-white text-sm">{reconnectionInfo.whenNeeded}</p>
              </div>
              <div className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                <h3 className="text-orange-400 font-bold mb-2">How to Reconnect</h3>
                <p className="text-white text-sm">{reconnectionInfo.process}</p>
              </div>
              <div className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                <h3 className="text-orange-400 font-bold mb-2">Portfolio Status</h3>
                <p className="text-white text-sm">{reconnectionInfo.portfolio}</p>
              </div>
              <div className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                <h3 className="text-orange-400 font-bold mb-2">Recovery Operations</h3>
                <p className="text-white text-sm">{reconnectionInfo.recovery}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://sushi.com/', '_blank')}
            className="bg-pink-600 hover:bg-pink-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            Open SushiSwap
          </Button>
          
          <Button 
            onClick={() => window.open('chrome://extensions/', '_blank')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <Shield className="h-6 w-6 mr-2" />
            MetaMask Settings
          </Button>
          
          <Link href="/address-investigation">
            <Button className="bg-purple-600 hover:bg-purple-700 py-8 w-full">
              <Eye className="h-6 w-6 mr-2" />
              Check New Address
            </Button>
          </Link>
          
          <Link href="/dark-pool-liquidity-analysis">
            <Button className="bg-blue-600 hover:bg-blue-700 py-8 w-full">
              <RefreshCw className="h-6 w-6 mr-2" />
              Continue Recovery
            </Button>
          </Link>
        </div>

        {/* Safety Confirmation */}
        <Alert className="border-green-500 bg-green-500/20">
          <Shield className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>SAFETY CONFIRMED:</strong> Disconnecting from SushiSwap only affects the interface. Your $686K portfolio, ETH recovery operations, and address investigations continue running independently on the blockchain.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}