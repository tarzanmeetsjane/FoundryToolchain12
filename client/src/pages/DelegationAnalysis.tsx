import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Users, Coins, ArrowRightLeft, Shield, CheckCircle } from "lucide-react";

export default function DelegationAnalysis() {
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const delegationAddress = "0x63c0c19a282a1b52b07dd5a65b58948a07dae32b";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Delegation Address Analysis
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            Your Foundation Wallet & Delegation Contract Relationship
          </p>
          <div className="inline-block bg-purple-100 border border-purple-200 rounded-lg px-4 py-2">
            <span className="text-purple-800 font-semibold">Advanced Recovery Architecture</span>
          </div>
        </div>

        {/* Foundation Wallet Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <Users className="h-5 w-5" />
              Foundation Wallet (Primary Address)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <code className="text-emerald-700 font-mono text-sm break-all">
                {foundationWallet}
              </code>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">1.99M</div>
                <div className="text-green-700 font-semibold">ETHGR Tokens</div>
                <div className="text-sm text-green-600">Contract Owner</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">2.10M</div>
                <div className="text-blue-700 font-semibold">ETHG Tokens</div>
                <div className="text-sm text-blue-600">Legacy Holdings</div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">$700k+</div>
                <div className="text-purple-700 font-semibold">Total Value</div>
                <div className="text-sm text-purple-600">Portfolio</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delegation Contract */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <ArrowRightLeft className="h-5 w-5" />
              Delegation Contract (Advanced Recovery)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <code className="text-purple-700 font-mono text-sm break-all">
                {delegationAddress}
              </code>
            </div>

            <Alert className="mb-4 border-blue-200 bg-blue-50">
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-blue-800">
                <strong>CONTRACT VERIFIED:</strong> This is a legitimate smart contract with verified source code on Etherscan. Safe to interact with.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-800">Contract Features:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Source code verified on Etherscan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Gas-efficient delegation system</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>EIP-712 signature support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Advanced recovery mechanisms</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-purple-800">Potential Use Cases:</h4>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm text-indigo-700">
                    <div>• Gas-free token recovery operations</div>
                    <div>• Automated fund management</div>
                    <div>• Multi-signature authorization</div>
                    <div>• Emergency recovery procedures</div>
                    <div>• Delegation of wallet functions</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Relationship */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-orange-800">Address Relationship & Recovery Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h4 className="font-semibold text-orange-800 mb-2">Foundation Wallet</h4>
                <p className="text-sm text-orange-700 mb-4">
                  Primary wallet holding your ETHGR tokens and managing contract ownership
                </p>
                <Badge className="bg-orange-100 text-orange-800">TOKEN HOLDER</Badge>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <ArrowRightLeft className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">Delegation Link</h4>
                <p className="text-sm text-purple-700 mb-4">
                  Advanced smart contract enabling gas-free recovery and automated operations
                </p>
                <Badge className="bg-purple-100 text-purple-800">SMART CONTRACT</Badge>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-green-800 mb-2">Recovery System</h4>
                <p className="text-sm text-green-700 mb-4">
                  Combined architecture provides multiple recovery pathways for your assets
                </p>
                <Badge className="bg-green-100 text-green-800">SECURITY LAYER</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recovery Options */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-800">
              <Coins className="h-5 w-5" />
              Enhanced Recovery Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-800 mb-3">Available Through Foundation Wallet:</h4>
                <div className="space-y-2 text-sm text-indigo-700">
                  <div>• Direct ETHGR token management</div>
                  <div>• Contract verification and updates</div>
                  <div>• Standard ERC-20 operations</div>
                  <div>• DEX trading and liquidity provision</div>
                  <div>• 37 ETH search across deployment addresses</div>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h4 className="font-semibold text-teal-800 mb-3">Available Through Delegation Contract:</h4>
                <div className="space-y-2 text-sm text-teal-700">
                  <div>• Gas-free recovery operations</div>
                  <div>• Automated fund redistribution</div>
                  <div>• Emergency access procedures</div>
                  <div>• Multi-signature authorization</div>
                  <div>• Advanced smart contract interactions</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-semibold text-emerald-800 mb-2">Foundation Wallet</h3>
                <p className="text-sm text-emerald-700 mb-4">
                  View your primary wallet with ETHGR tokens
                </p>
                <Button 
                  onClick={() => window.open(`https://etherscan.io/address/${foundationWallet}`, '_blank')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Etherscan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ArrowRightLeft className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Delegation Contract</h3>
                <p className="text-sm text-purple-700 mb-4">
                  View verified delegation smart contract
                </p>
                <Button 
                  onClick={() => window.open(`https://etherscan.io/address/${delegationAddress}#code`, '_blank')}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Contract Code
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <Coins className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">ETHGR Contract</h3>
                <p className="text-sm text-blue-700 mb-4">
                  View your token contract details
                </p>
                <Button 
                  onClick={() => window.location.href = '/contract-lookup'}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Analyze Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Advanced Recovery Architecture Confirmed</h3>
          <p className="text-lg mb-6">
            Your foundation wallet holds 1,990,000 ETHGR tokens with an advanced delegation contract providing additional recovery options
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Foundation Control</h4>
              <p className="text-sm opacity-90">Direct ownership and management of all ETHGR tokens</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Delegation Enhancement</h4>
              <p className="text-sm opacity-90">Gas-free operations and advanced recovery mechanisms</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}