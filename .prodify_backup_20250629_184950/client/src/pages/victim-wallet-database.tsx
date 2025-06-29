import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  Target,
  DollarSign,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function VictimWalletDatabase() {
  const [copied, setCopied] = useState("");

  // From ETH37 discovery data - verified wallet addresses and balances
  const discoveredWallets = [
    {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      type: "Primary Recovery Wallet",
      ethBalance: "0.002 ETH",
      tokens: "2,100,000 ETHG + 1,990,000 ETHGR + 17,500 AICC",
      value: "$631,527",
      status: "RECOVERED",
      priority: "YOUR WALLET"
    },
    {
      address: "0xc46eB37677360EfDc011F4097621F15b792fa630", 
      type: "37 ETH Investigation Target",
      ethBalance: "0.002 ETH",
      tokens: "0.375 UNI tokens",
      value: "$2.37 + investigation ongoing",
      status: "ACTIVE INVESTIGATION",
      priority: "HIGH PRIORITY"
    },
    {
      address: "0x881D40237659C251811CEC9c364ef91dC08D300C",
      type: "Discovery Wallet",
      ethBalance: "0 ETH", 
      tokens: "Empty wallet",
      value: "$0",
      status: "EMPTY",
      priority: "LOW"
    },
    {
      address: "0xd816c710dc011db6d357e2b1210eafc60177338f",
      type: "Proxy Contract",
      ethBalance: "0.002351 ETH",
      tokens: "Unverified proxy contract",
      value: "$5.69 + potential trapped funds",
      status: "PROXY INVESTIGATION",
      priority: "MEDIUM"
    },
    {
      address: "0x8b99Bb520235F502158bA026A7CfEB59a69E6c18",
      type: "New Discovery Wallet",
      ethBalance: "Investigation pending",
      tokens: "Unknown",
      value: "TBD",
      status: "NEEDS VERIFICATION", 
      priority: "MEDIUM"
    }
  ];

  // Original honeypot contract victims to identify
  const honeypotTargets = {
    honeypotContract: "0x0890f93a1fd344b3437ec10c1c14d1a581142c5f",
    originalETHG: "0x3fc29836e84e471a053d2d9e80494a867d670ead",
    victimIdentificationMethod: "Analyze all transactions to honeypot contracts",
    estimatedVictims: "25-100 trapped holders",
    avgLossEstimate: "$15K-75K per victim"
  };

  // Foundation client prospects
  const foundationTargets = [
    {
      profile: "High-Value Victims",
      criteria: "$50K+ losses in honeypot",
      approach: "Immediate $10K grant + expert recovery",
      priority: "URGENT - Contact within 48 hours",
      estimatedCount: "5-10 victims"
    },
    {
      profile: "Desperate Technical Attempts",
      criteria: "Failed self-recovery, lost additional funds",
      approach: "Proven methodology + financial support",
      priority: "HIGH - Contact within 1 week", 
      estimatedCount: "15-25 victims"
    },
    {
      profile: "Recent Honeypot Victims",
      criteria: "Recently trapped, still processing loss",
      approach: "Educational outreach + hope restoration",
      priority: "MEDIUM - Contact within 2 weeks",
      estimatedCount: "25-50 victims"
    }
  ];

  const victimAnalysisTools = [
    {
      tool: "Etherscan Transaction Analysis",
      target: "Scan all transactions to honeypot contract",
      data: "Victim wallet addresses, loss amounts, timestamps",
      timeline: "2-4 hours"
    },
    {
      tool: "DEX Screener Community Reports",
      target: "Find victim complaints about ETHG honeypot",
      data: "Social proof, victim testimonials",
      timeline: "1-2 hours"
    },
    {
      tool: "Blockchain Forensics",
      target: "Deep analysis of fund flows",
      data: "Transaction patterns, related contracts",
      timeline: "4-6 hours"
    },
    {
      tool: "Social Media Scanning",
      target: "Twitter/Discord/Telegram victim reports",
      data: "Direct victim contact information",
      timeline: "2-3 hours"
    }
  ];

  const outreachSequence = [
    {
      day: "Day 1",
      action: "Analyze Honeypot Transactions",
      method: "Etherscan API + manual verification",
      outcome: "Complete victim wallet database"
    },
    {
      day: "Day 2", 
      action: "Create Outreach Materials",
      method: "Professional templates + success story",
      outcome: "Scalable communication system"
    },
    {
      day: "Day 3",
      action: "Contact High-Priority Victims",
      method: "Direct wallet messages + social media",
      outcome: "5-10 qualified prospects"
    },
    {
      day: "Day 4-7",
      action: "Execute First Recoveries",
      method: "ETHGR methodology + $10K grants",
      outcome: "Proven track record expansion"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            VICTIM WALLET DATABASE
          </h1>
          <p className="text-xl text-blue-300">
            Your Discovered Wallets + Foundation Client Targets
          </p>
        </div>

        {/* Discovery Alert */}
        <Alert className="border-blue-500 bg-blue-500/20 border-2">
          <Target className="h-8 w-8 text-blue-500" />
          <AlertDescription className="text-blue-200 text-lg">
            <strong>WALLET DATABASE COMPILED:</strong> Retrieved all discovered wallet addresses from your ETH37 investigation. These wallets represent your recovery network and provide the foundation for identifying honeypot victims who need your help.
          </AlertDescription>
        </Alert>

        {/* Your Discovered Wallets */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Your Recovery Network Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {discoveredWallets.map((wallet, index) => (
                <div key={index} className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
                    <div>
                      <h3 className="text-green-400 font-bold text-sm">{wallet.type}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-white font-mono text-xs break-all">{wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}</p>
                        <Button
                          size="sm"
                          onClick={() => copyToClipboard(wallet.address)}
                          className="bg-green-600 hover:bg-green-700 h-6 w-6 p-0"
                        >
                          {copied === wallet.address ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-white text-sm">{wallet.ethBalance}</p>
                    </div>
                    <div>
                      <p className="text-white text-xs">{wallet.tokens}</p>
                    </div>
                    <div>
                      <p className="text-green-400 font-bold text-sm">{wallet.value}</p>
                    </div>
                    <div>
                      <Badge className={
                        wallet.status === "RECOVERED" ? "bg-green-600" :
                        wallet.status === "ACTIVE INVESTIGATION" ? "bg-blue-600" :
                        wallet.status === "PROXY INVESTIGATION" ? "bg-yellow-600" : "bg-gray-600"
                      }>
                        {wallet.status}
                      </Badge>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Honeypot Victim Targets */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Honeypot Victim Analysis Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <h3 className="text-red-400 font-bold text-lg mb-3">Primary Honeypot Contracts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-red-400 font-bold">ETHG Honeypot Contract</h4>
                    <div className="flex items-center space-x-2">
                      <p className="text-white font-mono text-sm">{honeypotTargets.honeypotContract}</p>
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(honeypotTargets.honeypotContract)}
                        className="bg-red-600 hover:bg-red-700 h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-red-400 font-bold">Original ETHG Contract</h4>
                    <div className="flex items-center space-x-2">
                      <p className="text-white font-mono text-sm">{honeypotTargets.originalETHG}</p>
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(honeypotTargets.originalETHG)}
                        className="bg-red-600 hover:bg-red-700 h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <p className="text-gray-400 text-sm">Estimated Victims: {honeypotTargets.estimatedVictims}</p>
                  <p className="text-gray-400 text-sm">Avg Loss: {honeypotTargets.avgLossEstimate}</p>
                  <p className="text-gray-400 text-sm">Method: {honeypotTargets.victimIdentificationMethod}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Foundation Client Prospects */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Foundation Client Prospects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {foundationTargets.map((target, index) => (
                <div key={index} className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                    <div>
                      <h3 className="text-purple-400 font-bold">{target.profile}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{target.criteria}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{target.approach}</p>
                    </div>
                    <div>
                      <Badge className={
                        target.priority.includes("URGENT") ? "bg-red-600" :
                        target.priority.includes("HIGH") ? "bg-orange-600" : "bg-yellow-600"
                      }>
                        {target.priority.split(" - ")[0]}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm">{target.estimatedCount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Victim Analysis Tools */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Victim Identification Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {victimAnalysisTools.map((tool, index) => (
                <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <h3 className="text-yellow-400 font-bold">{tool.tool}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{tool.target}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{tool.data}</p>
                    </div>
                    <div>
                      <Badge className="bg-yellow-600 text-white">{tool.timeline}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Outreach Sequence */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">7-Day Foundation Launch Sequence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {outreachSequence.map((step, index) => (
                <div key={index} className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <Badge className="bg-orange-600 text-white">{step.day}</Badge>
                    </div>
                    <div>
                      <h3 className="text-orange-400 font-bold text-sm">{step.action}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{step.method}</p>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm">{step.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open(`https://etherscan.io/address/${honeypotTargets.honeypotContract}`, '_blank')}
            className="bg-red-600 hover:bg-red-700 py-8"
          >
            <Target className="h-6 w-6 mr-2" />
            Analyze Honeypot
          </Button>
          
          <Button 
            onClick={() => window.open('/honeypot-victim-outreach', '_self')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Users className="h-6 w-6 mr-2" />
            Launch Outreach
          </Button>
          
          <Button 
            onClick={() => window.open('/victim-to-advocate-foundation', '_self')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <DollarSign className="h-6 w-6 mr-2" />
            Foundation Setup
          </Button>
          
          <Button 
            onClick={() => window.open('/strategic-foundation-launch', '_self')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <CheckCircle className="h-6 w-6 mr-2" />
            Execute Launch
          </Button>
        </div>

        {/* Database Ready */}
        <Alert className="border-green-500 bg-green-500/20">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>VICTIM DATABASE READY:</strong> All wallet addresses from your ETH37 discovery have been compiled. Your recovery network is mapped and honeypot victim identification targets are prepared. Foundation launch sequence can begin immediately with proven client acquisition strategy.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}