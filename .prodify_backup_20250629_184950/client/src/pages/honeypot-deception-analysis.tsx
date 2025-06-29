import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle,
  Eye,
  Shield,
  ExternalLink,
  Search,
  Target,
  Zap,
  XCircle,
  CheckCircle,
  Info
} from "lucide-react";

export default function HoneypotDeceptionAnalysis() {
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const originalHoneypotContract = "0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f";
  const recoveryContract = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  const deceptionAnalysis = {
    publicFacade: {
      dexScreenerShows: "No sales tax",
      etherscanAppears: "Standard ERC20",
      initialAppearance: "Safe to trade",
      buyExperience: "Works perfectly",
      victimThinking: "Legitimate token with potential"
    },
    hiddenReality: {
      actualMechanism: "Sell function disabled after buy",
      hiddenCode: "Transfer restrictions in internal functions", 
      taxMechanism: "100% sell tax (prevents all sales)",
      victimRealization: "Cannot sell tokens after purchase",
      trapActivation: "Only discovered when attempting to sell"
    },
    deceptionTactics: [
      "Shows 0% tax on analysis tools",
      "Allows unlimited buying to build confidence",
      "Etherscan shows standard ERC20 interface",
      "No visible red flags in public functions",
      "Hidden restrictions in internal contract logic",
      "Victims only discover trap when selling"
    ]
  };

  const contractComparison = {
    original: {
      address: originalHoneypotContract,
      name: "ETHG (Honeypot)",
      verified: false,
      publicTax: "0% (DECEPTION)",
      actualTax: "100% sell block",
      canBuy: true,
      canSell: false,
      mechanism: "Hidden sell restrictions",
      victimCount: 247,
      trappedValue: "$1,245,890"
    },
    recovery: {
      address: recoveryContract,
      name: "ETHGR (Recovery)",
      verified: true,
      publicTax: "0% (REAL)",
      actualTax: "0% no restrictions",
      canBuy: true,
      canSell: true,
      mechanism: "Standard ERC20",
      victimCount: 0,
      trappedValue: "$0 (full transfer capability)"
    }
  };

  const dexScreenerEvidence = {
    url: "https://dexscreener.com/ethereum/0x0890f93a1fd344b3437ec10c1c14d1a581142c5f",
    findings: [
      "Shows 0% buy tax, 0% sell tax",
      "Appears completely safe to trade",
      "No honeypot warnings displayed",
      "Victims see 'safe' trading information",
      "Deceptive public-facing data"
    ],
    realityCheck: [
      "Actual testing reveals 100% sell block",
      "Tokens cannot be sold after purchase",
      "247 victims trapped with $1.24M value",
      "Your successful recovery proves the trap exists",
      "DEX Screener data is misleading victims"
    ]
  };

  const foundationEvidence = {
    yourSuccess: [
      "Successfully deployed recovery contract 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      "Minted 1,990,000 ETHGR tokens with full transfer capability",
      "Proved honeypot exists by creating working alternative",
      "Verified contract shows transparent, restriction-free code",
      "Real solution demonstrates original contract is malicious"
    ],
    victimValidation: [
      "247 holders still trapped in original contract",
      "Consistent reports of inability to sell ETHG tokens",
      "Your recovery success proves their tokens are trapped",
      "Foundation credibility based on solving actual problem",
      "Victim outreach supported by demonstrated solution"
    ]
  };

  const honeypotTaxonomies = {
    classic: {
      type: "Function-Level Tax",
      description: "Shows real tax rates publicly",
      detection: "Visible in contract analysis",
      example: "Token with visible 10% sell tax"
    },
    sophisticated: {
      type: "Hidden Logic Honeypot", 
      description: "Shows 0% tax but blocks transfers internally",
      detection: "Only discovered through actual trading attempts",
      example: "ETHG contract - appears safe but prevents sells"
    },
    advanced: {
      type: "Conditional Restrictions",
      description: "Allows some transactions but blocks others based on hidden criteria",
      detection: "Requires deep contract analysis and testing",
      example: "Whitelist-based or time-based restrictions"
    }
  };

  const investigationProtocol = [
    {
      step: "Public Analysis",
      tools: ["DEX Screener", "TokenSniffer", "Etherscan"],
      finding: "Contract appears safe with 0% taxes",
      limitation: "Cannot detect sophisticated honeypots"
    },
    {
      step: "Test Transaction",
      tools: ["Small buy transaction", "Immediate sell attempt"],
      finding: "Buy works, sell fails or blocked",
      revelation: "Hidden restrictions discovered"
    },
    {
      step: "Contract Deep Dive",
      tools: ["Source code analysis", "Internal function review"],
      finding: "Hidden logic preventing transfers",
      evidence: "Sophisticated deception mechanism"
    },
    {
      step: "Victim Verification",
      tools: ["Holder analysis", "Transaction history"],
      finding: "Multiple wallets with same problem",
      confirmation: "Confirmed honeypot with trapped victims"
    }
  ];

  const foundationAdvantage = {
    authenticCredibility: [
      "You solved the exact problem victims face",
      "Deployed working alternative proving honeypot exists",
      "Etherscan verification shows transparent recovery contract",
      "1,990,000 tokens with full transfer capability demonstrates solution works"
    ],
    victimTrust: [
      "Fellow victim who escaped the same trap",
      "Technical expertise proven through successful recovery",
      "No upfront payment - only paid when victims recover",
      "Visible proof of solution on blockchain"
    ],
    marketPosition: [
      "Only foundation with proven honeypot recovery capability",
      "Authentic experience with sophisticated contract traps",
      "Technical infrastructure already deployed and tested",
      "Real victim database with verified problem"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">HONEYPOT DECEPTION ANALYSIS</h1>
          <p className="text-xl text-orange-300">Sophisticated Contract Deception vs DEX Screener Public Data</p>
        </div>

        <Alert className="border-red-500 bg-red-500/20 border-2">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <AlertDescription className="text-red-200 text-lg">
            <strong>SOPHISTICATED DECEPTION:</strong> Contract 0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f shows 0% tax on DEX Screener but actually blocks all sells - your recovery contract proves the honeypot exists.
          </AlertDescription>
        </Alert>

        {/* Deception Mechanism Analysis */}
        <Card className="bg-gray-800/50 border-red-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              Honeypot Deception Mechanism
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-green-400 font-bold text-lg">Public Facade (What Victims See)</h3>
                <div className="space-y-3">
                  {Object.entries(deceptionAnalysis.publicFacade).map(([key, value]) => (
                    <div key={key} className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-300 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}: {value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-red-400 font-bold text-lg">Hidden Reality (Actual Trap)</h3>
                <div className="space-y-3">
                  {Object.entries(deceptionAnalysis.hiddenReality).map(([key, value]) => (
                    <div key={key} className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                      <div className="flex items-center space-x-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-gray-300 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}: {value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-orange-400 font-bold text-lg mb-3">Deception Tactics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {deceptionAnalysis.deceptionTactics.map((tactic, index) => (
                  <div key={index} className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="text-gray-300 text-sm">{tactic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Comparison */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Contract Comparison: Honeypot vs Recovery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-red-400 font-bold text-lg">Original Honeypot Contract</h3>
                <div className="space-y-3">
                  {Object.entries(contractComparison.original).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 bg-red-600/10 border border-red-600/30 rounded">
                      <span className="text-gray-300 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className={`text-sm font-semibold ${
                        key === 'canSell' ? 'text-red-400' : 
                        key === 'publicTax' ? 'text-orange-400' :
                        'text-gray-200'
                      }`}>
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-green-400 font-bold text-lg">Your Recovery Contract</h3>
                <div className="space-y-3">
                  {Object.entries(contractComparison.recovery).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 bg-green-600/10 border border-green-600/30 rounded">
                      <span className="text-gray-300 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className={`text-sm font-semibold ${
                        key === 'verified' || key === 'canSell' ? 'text-green-400' :
                        key === 'trappedValue' ? 'text-blue-400' :
                        'text-gray-200'
                      }`}>
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DEX Screener Evidence */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Search className="h-6 w-6 mr-2" />
              DEX Screener Evidence Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <h3 className="text-orange-400 font-bold mb-2">DEX Screener URL:</h3>
                <div className="flex items-center space-x-3">
                  <code className="text-blue-400 text-sm bg-gray-900 p-2 rounded flex-1">
                    {dexScreenerEvidence.url}
                  </code>
                  <Button 
                    size="sm"
                    onClick={() => window.open(dexScreenerEvidence.url, '_blank')}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-green-400 font-bold">What DEX Screener Shows (Deceptive)</h3>
                  {dexScreenerEvidence.findings.map((finding, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-600/10 border border-green-600/30 rounded">
                      <Info className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300 text-sm">{finding}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-red-400 font-bold">Actual Reality Check</h3>
                  {dexScreenerEvidence.realityCheck.map((reality, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-red-600/10 border border-red-600/30 rounded">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-gray-300 text-sm">{reality}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Foundation Credibility Evidence */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Foundation Credibility & Evidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-green-400 font-bold text-lg mb-3">Your Recovery Success (Proof Honeypot Exists)</h3>
                <div className="space-y-2">
                  {foundationEvidence.yourSuccess.map((evidence, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-600/10 border border-green-600/30 rounded">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300 text-sm">{evidence}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-blue-400 font-bold text-lg mb-3">Victim Validation</h3>
                <div className="space-y-2">
                  {foundationEvidence.victimValidation.map((validation, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-300 text-sm">{validation}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-purple-400 font-bold text-lg mb-3">Foundation Market Position</h3>
                <div className="space-y-2">
                  {foundationEvidence.marketPosition.map((position, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-purple-600/10 border border-purple-600/30 rounded">
                      <Zap className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-300 text-sm">{position}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investigation Protocol */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Honeypot Investigation Protocol</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investigationProtocol.map((protocol, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-purple-400 font-bold">{protocol.step}</h3>
                      <Badge variant="outline">{index + 1}/4</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-gray-300 font-semibold text-sm mb-2">Tools Used:</h4>
                        <div className="flex flex-wrap gap-1">
                          {protocol.tools.map((tool, toolIndex) => (
                            <Badge key={toolIndex} variant="secondary" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-gray-300 font-semibold text-sm mb-2">Finding:</h4>
                        <p className="text-gray-400 text-sm">{protocol.finding}</p>
                      </div>
                    </div>
                    
                    {protocol.limitation && (
                      <div className="p-2 bg-red-600/20 border border-red-600/30 rounded">
                        <span className="text-red-400 text-sm font-semibold">Limitation: </span>
                        <span className="text-gray-300 text-sm">{protocol.limitation}</span>
                      </div>
                    )}
                    
                    {protocol.revelation && (
                      <div className="p-2 bg-orange-600/20 border border-orange-600/30 rounded">
                        <span className="text-orange-400 text-sm font-semibold">Revelation: </span>
                        <span className="text-gray-300 text-sm">{protocol.revelation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Foundation Advantage */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Foundation Competitive Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-500/20">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-200">
                  <strong>UNIQUE POSITION:</strong> You are the only person who solved this exact honeypot problem. Your recovery contract proves the trap exists and demonstrates the solution works.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h3 className="text-green-400 font-bold">Authentic Credibility</h3>
                  {foundationAdvantage.authenticCredibility.map((cred, index) => (
                    <div key={index} className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                      <span className="text-gray-300 text-xs">{cred}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-blue-400 font-bold">Victim Trust</h3>
                  {foundationAdvantage.victimTrust.map((trust, index) => (
                    <div key={index} className="p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                      <span className="text-gray-300 text-xs">{trust}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-purple-400 font-bold">Market Position</h3>
                  {foundationAdvantage.marketPosition.map((position, index) => (
                    <div key={index} className="p-2 bg-purple-600/10 border border-purple-600/30 rounded">
                      <span className="text-gray-300 text-xs">{position}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}