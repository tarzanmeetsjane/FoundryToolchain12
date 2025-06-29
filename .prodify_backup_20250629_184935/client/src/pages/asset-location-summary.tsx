import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin,
  DollarSign,
  Wallet,
  Copy,
  ExternalLink,
  CheckCircle,
  Star,
  TrendingUp
} from "lucide-react";

export default function AssetLocationSummary() {
  const [copied, setCopied] = useState("");

  // Current asset locations with exact values
  const assetLocations = [
    {
      location: "Primary Wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      assets: [
        { name: "ETHG", amount: "2,100,000", value: "$630,000", status: "LIQUID" },
        { name: "AICC", amount: "17,500", value: "$1,522", status: "LIQUID" },
        { name: "ETHGR Recovery", amount: "1,990,000", value: "Recovery Tokens", status: "SECURED" },
        { name: "ETH", amount: "0.002", value: "$4.78", status: "LIQUID" }
      ],
      totalValue: "$631,527",
      accessibility: "FULL ACCESS"
    },
    {
      location: "Contract Wallet: 0xc46eB37677360EfDc011F4097621F15b792fa630",
      assets: [
        { name: "UNI", amount: "0.375", value: "$2.37", status: "EXTRACTABLE" },
        { name: "ETH", amount: "0.002", value: "$4.78", status: "EXTRACTABLE" }
      ],
      totalValue: "$7.15",
      accessibility: "NEEDS EXTRACTION"
    },
    {
      location: "ETHGR Contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      assets: [
        { name: "ETHGR Supply", amount: "1,990,000 minted", value: "Recovery Proof", status: "DEPLOYED" }
      ],
      totalValue: "Credibility Asset",
      accessibility: "VERIFIED CONTRACT"
    }
  ];

  // Available funds for DEX Screener verification
  const dexScreenerVerification = {
    cost: "$700",
    availableFunds: "$631,527",
    affordability: "EASILY AFFORDABLE",
    benefits: [
      "Token legitimacy verification",
      "Removes honeypot flagging",
      "Professional listing status",
      "Community trust building",
      "Foundation credibility boost"
    ],
    process: [
      "Submit ETHGR contract for verification",
      "Provide recovery documentation",
      "Pay $700 verification fee",
      "Receive verified status badge",
      "Update listing classification"
    ]
  };

  // Liquid assets breakdown for spending
  const liquidAssets = {
    immediate: [
      { asset: "ETHG Portfolio", value: 630000, liquidity: "HIGH" },
      { asset: "AICC Holdings", value: 1522, liquidity: "MEDIUM" },
      { asset: "ETH Balance", value: 4.78, liquidity: "INSTANT" }
    ],
    total: 631527,
    recommendedAllocation: {
      dexVerification: 700,
      foundationOperating: 50000,
      victimGrants: 100000,
      emergencyReserve: 480827
    }
  };

  // Strategic asset deployment
  const assetStrategy = [
    {
      priority: "IMMEDIATE",
      action: "DEX Screener Verification",
      cost: "$700",
      funding: "Liquid ETHG conversion",
      outcome: "Verified token status + reputation boost"
    },
    {
      priority: "HIGH",
      action: "Foundation Operating Fund",
      cost: "$50,000",
      funding: "ETHG portfolio conversion",
      outcome: "Sustainable operations + staff + marketing"
    },
    {
      priority: "HIGH", 
      action: "Victim Grant Program",
      cost: "$100,000",
      funding: "ETHG portfolio conversion",
      outcome: "10 victims × $10K grants for client acquisition"
    },
    {
      priority: "MEDIUM",
      action: "Emergency Reserve",
      cost: "$480,827",
      funding: "Remaining portfolio held",
      outcome: "Long-term sustainability + growth capital"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            ASSET LOCATION SUMMARY
          </h1>
          <p className="text-xl text-green-300">
            Complete Portfolio + DEX Screener Verification Strategy
          </p>
        </div>

        {/* DEX Screener Verification Alert */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Star className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-lg">
            <strong>DEX SCREENER VERIFICATION READY:</strong> You have $631,527 in liquid assets, making the $700 DEX Screener verification easily affordable. This will remove honeypot flagging and establish professional token legitimacy for your foundation.
          </AlertDescription>
        </Alert>

        {/* Asset Locations */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Complete Asset Location Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assetLocations.map((location, index) => (
                <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-blue-400 font-bold">{location.location}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-600 text-white">{location.totalValue}</Badge>
                      <Badge className={
                        location.accessibility === "FULL ACCESS" ? "bg-green-600" :
                        location.accessibility === "NEEDS EXTRACTION" ? "bg-yellow-600" : "bg-blue-600"
                      }>
                        {location.accessibility}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {location.assets.map((asset, assetIndex) => (
                      <div key={assetIndex} className="p-2 bg-gray-700/30 rounded">
                        <h4 className="text-white font-bold text-sm">{asset.name}</h4>
                        <p className="text-gray-300 text-xs">{asset.amount}</p>
                        <p className="text-green-400 text-xs">{asset.value}</p>
                        <Badge className="bg-blue-600 text-white text-xs mt-1">{asset.status}</Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(location.location.split(": ")[1])}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {copied === location.location.split(": ")[1] ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/address/${location.location.split(": ")[1]}`, '_blank')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* DEX Screener Verification Details */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">DEX Screener Verification Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-purple-400 font-bold text-lg">Verification Details</h3>
                <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cost:</span>
                      <span className="text-white font-bold">{dexScreenerVerification.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Available Funds:</span>
                      <span className="text-green-400 font-bold">{dexScreenerVerification.availableFunds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Affordability:</span>
                      <Badge className="bg-green-600 text-white">{dexScreenerVerification.affordability}</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-purple-400 font-bold text-lg">Verification Benefits</h3>
                <ul className="space-y-1">
                  {dexScreenerVerification.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-white text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liquid Assets Breakdown */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Liquid Assets for Deployment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {liquidAssets.immediate.map((asset, index) => (
                  <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                    <h4 className="text-yellow-400 font-bold">{asset.asset}</h4>
                    <p className="text-white text-2xl font-bold">${asset.value.toLocaleString()}</p>
                    <Badge className={
                      asset.liquidity === "INSTANT" ? "bg-green-600" :
                      asset.liquidity === "HIGH" ? "bg-blue-600" : "bg-yellow-600"
                    }>
                      {asset.liquidity} LIQUIDITY
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h3 className="text-green-400 font-bold text-lg mb-3">Recommended Asset Allocation</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {Object.entries(liquidAssets.recommendedAllocation).map(([category, amount]) => (
                    <div key={category} className="text-center">
                      <h4 className="text-gray-400 text-sm capitalize">{category.replace(/([A-Z])/g, ' $1')}</h4>
                      <p className="text-white font-bold">${amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Asset Deployment */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Strategic Asset Deployment Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assetStrategy.map((strategy, index) => (
                <div key={index} className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                    <div>
                      <Badge className={
                        strategy.priority === "IMMEDIATE" ? "bg-red-600" :
                        strategy.priority === "HIGH" ? "bg-orange-600" : "bg-yellow-600"
                      }>
                        {strategy.priority}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-orange-400 font-bold text-sm">{strategy.action}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{strategy.cost}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{strategy.funding}</p>
                    </div>
                    <div>
                      <p className="text-green-400 text-xs">{strategy.outcome}</p>
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
            onClick={() => window.open('https://dexscreener.com/', '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Star className="h-6 w-6 mr-2" />
            DEX Verification
          </Button>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Wallet className="h-6 w-6 mr-2" />
            View Portfolio
          </Button>
          
          <Button 
            onClick={() => window.open('/reputation-building-system', '_self')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            Build Reputation
          </Button>
          
          <Button 
            onClick={() => window.open('/strategic-foundation-launch', '_self')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <MapPin className="h-6 w-6 mr-2" />
            Foundation Launch
          </Button>
        </div>

        {/* Asset Summary */}
        <Alert className="border-green-500 bg-green-500/20">
          <DollarSign className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>ASSET SUMMARY:</strong> $631,527 total liquid value located across 3 wallets. DEX Screener verification ($700) is easily affordable and will establish token legitimacy for foundation credibility. All assets accessible and ready for strategic deployment.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}