import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wallet,
  DollarSign,
  Lock,
  Eye,
  ArrowRight
} from "lucide-react";

export default function SecurityAssessmentCenter() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const securityOptions = [
    {
      id: "do_nothing",
      title: "Do Nothing (Safest)",
      risk: "MINIMAL",
      riskColor: "green",
      description: "Keep existing tokens, avoid all deployment risks",
      pros: [
        "No additional security risks",
        "Existing ETHGR tokens remain safe at 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
        "1,990,000 ETHGR tokens worth $706,450 already secured",
        "No gas costs or wallet interactions needed"
      ],
      cons: [
        "No additional ETHR tokens",
        "Delegation remains but doesn't affect existing tokens"
      ],
      outcome: "Keep current $706,450 value, no additional risks"
    },
    {
      id: "new_wallet_only",
      title: "New Wallet Strategy",
      risk: "LOW",
      riskColor: "blue",
      description: "Create fresh wallet, transfer existing tokens, avoid compromised wallet entirely",
      pros: [
        "Complete separation from compromised wallet",
        "All future transactions are secure",
        "Can deploy ETHR safely from clean wallet",
        "Delegation cannot affect new wallet"
      ],
      cons: [
        "Gas costs to transfer existing tokens (~$20-50)",
        "Need to manage two wallets",
        "Some complexity in token transfers"
      ],
      outcome: "Full security, can deploy additional ETHR tokens safely"
    },
    {
      id: "bypass_deployment",
      title: "Bypass Deployment",
      risk: "MEDIUM",
      riskColor: "yellow",
      description: "Deploy from clean wallet but mint to compromised address",
      pros: [
        "Tokens delivered to original wallet",
        "No need to transfer existing assets",
        "Delegation can't affect deployment process",
        "Gets additional 1,990,000 ETHR tokens"
      ],
      cons: [
        "Tokens land in compromised wallet",
        "Future transfers from compromised wallet risky",
        "Delegation persists on received tokens"
      ],
      outcome: "Additional tokens but in compromised environment"
    },
    {
      id: "direct_from_compromised",
      title: "Deploy from Compromised Wallet",
      risk: "HIGH",
      riskColor: "red",
      description: "Use original wallet despite delegation",
      pros: [
        "Simplest approach",
        "No wallet management complexity"
      ],
      cons: [
        "High risk of ETH theft during deployment",
        "Delegation may interfere with transactions",
        "Potential loss of deployment gas (~$30)",
        "Unpredictable behavior"
      ],
      outcome: "High risk of fund loss, not recommended"
    }
  ];

  const walletAnalysis = {
    compromised: {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      delegation: "0x710fad1041f0ee79916bb1a6adef662303bb8b6e (CrimeEnjoyor)",
      risk: "ETH sent to this wallet will be automatically stolen",
      existingTokens: "ETHGR tokens safe (already minted, not affected by delegation)",
      recommendation: "Use for receiving only, not for sending ETH"
    },
    clean: {
      description: "Fresh MetaMask wallet with no delegation",
      risk: "No security issues",
      purpose: "Safe for all transactions and deployments",
      cost: "~$30 ETH needed for gas"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Security Assessment Center
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Complete analysis of all options with risk assessment
          </p>
        </div>

        {/* Current Situation */}
        <Alert className="border-blue-500 bg-blue-500/10">
          <Eye className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-200">
            <strong>Current Status:</strong> You have 1,990,000 ETHGR tokens worth $706,450 already safely deployed. The delegation only affects new ETH transactions, not existing tokens.
          </AlertDescription>
        </Alert>

        {/* Wallet Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-red-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Compromised Wallet Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                <h4 className="text-red-400 font-medium">Address</h4>
                <p className="text-gray-300 text-sm font-mono break-all">{walletAnalysis.compromised.address}</p>
              </div>
              <div className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                <h4 className="text-orange-400 font-medium">Delegation Risk</h4>
                <p className="text-gray-300 text-sm">{walletAnalysis.compromised.risk}</p>
              </div>
              <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium">Existing Tokens</h4>
                <p className="text-gray-300 text-sm">{walletAnalysis.compromised.existingTokens}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Clean Wallet Option
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium">Security</h4>
                <p className="text-gray-300 text-sm">{walletAnalysis.clean.risk}</p>
              </div>
              <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium">Purpose</h4>
                <p className="text-gray-300 text-sm">{walletAnalysis.clean.purpose}</p>
              </div>
              <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h4 className="text-yellow-400 font-medium">Cost</h4>
                <p className="text-gray-300 text-sm">{walletAnalysis.clean.cost}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Options */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Complete Options Analysis</CardTitle>
            <CardDescription className="text-gray-400">
              Click any option to see detailed analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedOption === option.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 bg-gray-700/20 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">{option.title}</h4>
                    <Badge className={`${
                      option.riskColor === 'green' ? 'bg-green-600' :
                      option.riskColor === 'blue' ? 'bg-blue-600' :
                      option.riskColor === 'yellow' ? 'bg-yellow-600' :
                      'bg-red-600'
                    } text-white`}>
                      {option.risk}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{option.description}</p>
                  <p className="text-gray-400 text-xs">{option.outcome}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        {selectedOption && (
          <Card className="bg-gray-800/50 border-blue-500">
            <CardHeader>
              <CardTitle className="text-white">
                Detailed Analysis: {securityOptions.find(o => o.id === selectedOption)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-green-400 font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Advantages
                  </h4>
                  <ul className="space-y-2">
                    {securityOptions.find(o => o.id === selectedOption)?.pros.map((pro, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    Disadvantages
                  </h4>
                  <ul className="space-y-2">
                    {securityOptions.find(o => o.id === selectedOption)?.cons.map((con, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Security Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">Safest Option: Do Nothing</h4>
                <p className="text-gray-300 text-sm">
                  You already have $706,450 in ETHGR tokens that are completely safe. The delegation doesn't affect existing tokens, only new ETH transactions.
                </p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Balanced Option: New Wallet Strategy</h4>
                <p className="text-gray-300 text-sm">
                  Create a fresh wallet, transfer existing tokens, and deploy ETHR from the clean environment. Highest security for future operations.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h4 className="text-yellow-400 font-medium mb-2">Not Recommended: Bypass or Direct Deployment</h4>
                <p className="text-gray-300 text-sm">
                  While technically possible, these approaches involve unnecessary risks when you already have substantial value secured.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Value Summary */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-400" />
              Your Current Secure Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">ETHGR Tokens</h4>
                <p className="text-white text-2xl font-bold">1,990,000</p>
                <p className="text-gray-400 text-sm">Already Safe</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Current Value</h4>
                <p className="text-white text-2xl font-bold">$706,450</p>
                <p className="text-gray-400 text-sm">Secured & Transferable</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h4 className="text-purple-400 font-medium mb-2">Risk Level</h4>
                <p className="text-white text-2xl font-bold">ZERO</p>
                <p className="text-gray-400 text-sm">For Existing Tokens</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Recommendation */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Recommended Action:</strong> Your $706,450 in ETHGR tokens are completely safe. Consider keeping them as-is (no risk) or transferring to a new wallet for maximum future security. Avoid deployment risks when you already have substantial secured value.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}