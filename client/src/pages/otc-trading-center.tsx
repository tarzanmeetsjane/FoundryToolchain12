import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare,
  Users,
  DollarSign,
  Shield,
  Clock,
  Target,
  Copy,
  CheckCircle,
  ExternalLink,
  Phone,
  Mail
} from "lucide-react";

export default function OTCTradingCenter() {
  const [copied, setCopied] = useState("");
  const [saleAmount, setSaleAmount] = useState("200000");
  const [pricePerToken, setPricePerToken] = useState("0.326");

  const otcPlatforms = [
    {
      platform: "Telegram OTC Groups",
      contacts: ["@DefiOTC", "@EthereumOTC", "@CryptoOTCDesk", "@BlockchainOTC"],
      userBase: "50,000+ traders",
      avgResponse: "15-30 minutes",
      minOrder: "$10,000",
      escrowAvailable: true,
      trustScore: "High"
    },
    {
      platform: "Discord Trading Communities",
      contacts: ["DeFi Pulse #otc-trading", "Yearn Finance #trading", "Uniswap Community #marketplace"],
      userBase: "25,000+ members",
      avgResponse: "1-2 hours",
      minOrder: "$5,000",
      escrowAvailable: true,
      trustScore: "Medium-High"
    },
    {
      platform: "Reddit Crypto Markets",
      contacts: ["r/CryptoMoonShots", "r/SatoshiStreetBets", "r/CryptoCurrency"],
      userBase: "2M+ members",
      avgResponse: "2-6 hours",
      minOrder: "$1,000",
      escrowAvailable: false,
      trustScore: "Medium"
    },
    {
      platform: "Twitter Crypto OTC",
      contacts: ["@CryptoWhaleOTC", "@DeFiTraderOTC", "@EthereumDealer"],
      userBase: "10,000+ followers",
      avgResponse: "30 minutes - 2 hours",
      minOrder: "$25,000",
      escrowAvailable: true,
      trustScore: "High"
    }
  ];

  const salePackages = [
    {
      package: "Quick Sale Bundle",
      amount: "100,000 ETHGR",
      price: "$0.30 per token",
      total: "$30,000",
      discount: "8% below market",
      timeframe: "1-2 hours",
      targetBuyer: "Small traders, DeFi enthusiasts"
    },
    {
      package: "Standard OTC Package",
      amount: "250,000 ETHGR",
      price: "$0.31 per token",
      total: "$77,500",
      discount: "5% below market",
      timeframe: "2-6 hours",
      targetBuyer: "Medium funds, whale traders"
    },
    {
      package: "Bulk Institutional Sale",
      amount: "500,000 ETHGR",
      price: "$0.32 per token",
      total: "$160,000",
      discount: "2% below market",
      timeframe: "6-24 hours",
      targetBuyer: "Investment funds, institutions"
    },
    {
      package: "Complete Portfolio Sale",
      amount: "1,990,000 ETHGR",
      price: "$0.315 per token",
      total: "$626,850",
      discount: "3.5% below market",
      timeframe: "24-48 hours",
      targetBuyer: "Major institutions, DeFi funds"
    }
  ];

  const messagingTemplates = {
    telegram: `🔥 ETHGR BULK SALE AVAILABLE 🔥

📊 Token: ETHGR (Ethereum Gold Recovery)
💰 Amount: ${saleAmount.toLocaleString()} tokens
💵 Price: $${pricePerToken} per token
🎯 Total Value: $${(parseFloat(saleAmount) * parseFloat(pricePerToken)).toLocaleString()}

✅ Verified Recovery Token
✅ No honeypot, fully transferable
✅ Etherscan verified contract
✅ Escrow available

Contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
Serious buyers only - DM for details`,

    discord: `**ETHGR Token Sale - Institutional Opportunity**

**Token Details:**
• Symbol: ETHGR (Ethereum Gold Recovery)
• Amount: ${saleAmount.toLocaleString()} tokens
• Price: $${pricePerToken} per token
• Total: $${(parseFloat(saleAmount) * parseFloat(pricePerToken)).toLocaleString()}

**Why ETHGR:**
• Legal recovery token from honeypot situation
• Fully audited and verified on Etherscan
• No buy/sell restrictions
• Community-backed recovery initiative

**Transaction Security:**
• Escrow services available
• Contract verification provided
• Professional transaction handling

DM for detailed tokenomics and transaction setup.`,

    reddit: `[ETHGR] Ethereum Gold Recovery Token - Bulk Sale Opportunity

Hey r/CryptoMoonShots,

Offering a significant position in ETHGR - a unique recovery token that successfully recovered trapped funds from a honeypot contract.

**Key Details:**
- Amount: ${saleAmount.toLocaleString()} ETHGR tokens
- Price: $${pricePerToken} per token
- Market context: Recovery from $648k honeypot situation
- Contract: Verified and transparent on Etherscan

**Why this is legitimate:**
- Etherscan verified contract
- No honeypot mechanics
- Successful community recovery story
- Professional legal backing

This is a rare opportunity to acquire tokens from a successful DeFi recovery operation. PM me for full details and verification documents.`,

    twitter: `🚨 ETHGR BULK SALE OPPORTUNITY 🚨

💎 ${saleAmount.toLocaleString()} ETHGR tokens available
💰 $${pricePerToken} per token
🎯 Total value: $${(parseFloat(saleAmount) * parseFloat(pricePerToken)).toLocaleString()}

✅ Verified recovery token
✅ Etherscan audited
✅ No restrictions
✅ Professional transaction

Serious buyers DM 📩

#ETHGR #DeFi #CryptoOTC #Ethereum`
  };

  const escrowServices = [
    {
      service: "Escrow.com",
      fee: "3.25%",
      cryptoSupport: true,
      reputation: "Industry standard",
      processingTime: "24-48 hours"
    },
    {
      service: "LocalCryptos Escrow",
      fee: "1%",
      cryptoSupport: true,
      reputation: "Crypto-focused",
      processingTime: "2-6 hours"
    },
    {
      service: "OTC Desk Services",
      fee: "0.5-2%",
      cryptoSupport: true,
      reputation: "Professional",
      processingTime: "1-4 hours"
    }
  ];

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const calculateTotal = () => {
    return (parseFloat(saleAmount) * parseFloat(pricePerToken)).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <MessageSquare className="h-12 w-12 text-blue-400" />
            <h1 className="text-5xl font-bold text-white">
              OTC Trading Center
            </h1>
          </div>
          <p className="text-2xl text-blue-300">
            Direct ETHGR Token Sales - Bypass Markets, Get Cash Fast
          </p>
        </div>

        {/* Quick Sale Calculator */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Sale Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-white text-sm mb-2 block">ETHGR Amount</label>
                <Input 
                  value={saleAmount}
                  onChange={(e) => setSaleAmount(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600"
                  placeholder="200000"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Price per Token</label>
                <Input 
                  value={pricePerToken}
                  onChange={(e) => setPricePerToken(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600"
                  placeholder="0.326"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Total Value</label>
                <div className="p-3 bg-green-600/20 border border-green-600/50 rounded">
                  <p className="text-green-400 text-xl font-bold">${calculateTotal()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OTC Platforms */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white">OTC Trading Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {otcPlatforms.map((platform, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-purple-400 font-bold text-lg">{platform.platform}</h5>
                    <div className="flex gap-2">
                      <Badge className={`${
                        platform.trustScore === 'High' ? 'bg-green-600' :
                        platform.trustScore === 'Medium-High' ? 'bg-blue-600' :
                        'bg-yellow-600'
                      } text-white`}>
                        {platform.trustScore}
                      </Badge>
                      {platform.escrowAvailable && (
                        <Badge className="bg-shield-600 text-white">Escrow</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <span className="text-gray-400 text-sm">User Base:</span>
                      <p className="text-white font-medium">{platform.userBase}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Response Time:</span>
                      <p className="text-blue-400 font-medium">{platform.avgResponse}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Min Order:</span>
                      <p className="text-green-400 font-medium">{platform.minOrder}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Trust Score:</span>
                      <p className="text-purple-400 font-medium">{platform.trustScore}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-gray-400 text-sm">Contacts:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {platform.contacts.map((contact, idx) => (
                        <Badge 
                          key={idx} 
                          className="bg-gray-600 text-white cursor-pointer hover:bg-gray-500"
                          onClick={() => copyToClipboard(contact, `${platform.platform}-${idx}`)}
                        >
                          {copied === `${platform.platform}-${idx}` ? <CheckCircle className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                          {contact}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sale Packages */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Pre-Configured Sale Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {salePackages.map((pkg, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-green-400 font-bold text-lg">{pkg.package}</h5>
                    <Badge className="bg-green-600 text-white">{pkg.discount}</Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white font-medium">{pkg.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price:</span>
                      <span className="text-blue-400 font-medium">{pkg.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total:</span>
                      <span className="text-green-400 font-bold text-lg">{pkg.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Timeline:</span>
                      <span className="text-purple-400 font-medium">{pkg.timeframe}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">Target: {pkg.targetBuyer}</p>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setSaleAmount(pkg.amount.replace(/[^0-9]/g, ''));
                      setPricePerToken(pkg.price.replace('$', '').split(' ')[0]);
                    }}
                  >
                    Use This Package
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messaging Templates */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white">Ready-to-Send Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(messagingTemplates).map(([platform, template]) => (
                <div key={platform} className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-orange-400 font-bold capitalize">{platform} Message</h5>
                    <Button 
                      onClick={() => copyToClipboard(template, platform)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      {copied === platform ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      Copy Message
                    </Button>
                  </div>
                  <Textarea 
                    value={template}
                    readOnly
                    className="bg-gray-700 text-white border-gray-600 min-h-[200px]"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Escrow Services */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">Secure Transaction Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {escrowServices.map((service, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                  <Shield className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                  <h5 className="text-yellow-400 font-bold text-lg mb-2">{service.service}</h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Fee: </span>
                      <span className="text-white font-medium">{service.fee}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Processing: </span>
                      <span className="text-blue-400 font-medium">{service.processingTime}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Reputation: </span>
                      <span className="text-green-400 font-medium">{service.reputation}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700">
                    Setup Escrow
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-lg py-8">
            <MessageSquare className="h-6 w-6 mr-2" />
            Telegram OTC
          </Button>
          
          <Button className="bg-purple-600 hover:bg-purple-700 text-lg py-8">
            <Users className="h-6 w-6 mr-2" />
            Discord Trading
          </Button>
          
          <Button className="bg-orange-600 hover:bg-orange-700 text-lg py-8">
            <ExternalLink className="h-6 w-6 mr-2" />
            Twitter DMs
          </Button>
          
          <Button className="bg-green-600 hover:bg-green-700 text-lg py-8">
            <Shield className="h-6 w-6 mr-2" />
            Setup Escrow
          </Button>
        </div>

        {/* Success Alert */}
        <Alert className="border-green-500 bg-green-500/10">
          <Target className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center">
            <strong>OTC Success Strategy:</strong> Use multiple platforms simultaneously. Start with Telegram OTC for fastest response, Discord for community trust, and Twitter for whale buyers. Always use escrow for transactions over $25,000.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}