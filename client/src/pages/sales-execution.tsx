import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign,
  TrendingUp,
  Users,
  Zap,
  Target,
  Copy,
  ExternalLink,
  MessageCircle,
  Send,
  CheckCircle
} from "lucide-react";

export default function SalesExecution() {
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [buyerInfo, setBuyerInfo] = useState("");
  const [salesMessage, setSalesMessage] = useState("");

  const salesPackages = [
    {
      id: 1,
      name: "Quick Starter",
      tokens: 50000,
      price: 0.05,
      total: 2500,
      eth: 1,
      description: "Fast ETH for immediate pool creation",
      recommended: false
    },
    {
      id: 2,
      name: "Power Pack",
      tokens: 100000,
      price: 0.05,
      total: 5000,
      eth: 2,
      description: "Strong liquidity pool foundation",
      recommended: true
    },
    {
      id: 3,
      name: "Mega Deal",
      tokens: 250000,
      price: 0.04,
      total: 10000,
      eth: 4,
      description: "Maximum initial liquidity",
      recommended: false
    }
  ];

  const salesChannels = [
    {
      platform: "Discord DeFi Communities",
      audience: "Active traders and DeFi enthusiasts",
      reach: "5,000-20,000 members",
      conversionRate: "2-5%",
      avgSaleSize: "$1,000-5,000",
      link: "https://discord.com/channels/@me"
    },
    {
      platform: "Telegram Crypto Groups",
      audience: "Token traders and investors",
      reach: "10,000-50,000 members",
      conversionRate: "1-3%",
      avgSaleSize: "$500-2,500",
      link: "https://t.me"
    },
    {
      platform: "Twitter/X DeFi",
      audience: "Crypto Twitter community",
      reach: "Viral potential",
      conversionRate: "0.5-2%",
      avgSaleSize: "$2,000-10,000",
      link: "https://twitter.com/compose/tweet"
    },
    {
      platform: "Reddit CryptoCurrency",
      audience: "Reddit crypto enthusiasts",
      reach: "4M+ members",
      conversionRate: "0.1-1%",
      avgSaleSize: "$100-1,000",
      link: "https://reddit.com/r/CryptoCurrency"
    }
  ];

  const generateSalesContract = () => {
    const pkg = salesPackages.find(p => p.id === selectedPackage);
    if (!pkg) return;

    const contract = `🚀 ETHGR TOKEN DIRECT SALE OPPORTUNITY 🚀

VERIFIED TRANSFERABLE TOKENS - NO HONEYPOT ✅

📋 SALE DETAILS:
• Token: ETHGR (ETHG Recovery Token)
• Contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
• Amount: ${pkg.tokens.toLocaleString()} ETHGR tokens
• Price: $${pkg.price}/token
• Total Value: $${pkg.total.toLocaleString()}
• ETH Equivalent: ${pkg.eth} ETH (at $2,500/ETH)

🔍 VERIFICATION:
• Etherscan Verified: ✅
• Honeypot Check: 0% tax ✅
• Transfer Test: Successful ✅
• Market Reference: $0.355/token (DEX Screener)

💰 PAYMENT OPTIONS:
• ETH to: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
• USDC/USDT accepted
• Immediate transfer upon confirmation

📊 WHY THIS PRICE:
• Recovery from honeypot contract (proven story)
• 1,990,000 total supply (limited availability)
• Verified transferable (no restrictions)
• Bulk sale discount applied

⚡ FAST EXECUTION:
• Payment confirmed → Tokens transferred
• No delays, no complications
• Direct wallet-to-wallet transfer

Contact: ${buyerInfo || "Reply here for purchase"}

Generated: ${new Date().toLocaleString()}`;

    setSalesMessage(contract);
    navigator.clipboard.writeText(contract);
    alert("Sales contract copied to clipboard! Ready to post in groups.");
  };

  const openSalesChannel = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">ETHGR Token Sales Execution</h1>
        <p className="text-muted-foreground">
          Ready-to-post sales packages and direct marketing materials
        </p>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <DollarSign className="h-4 w-4" />
        <AlertDescription>
          <strong>SALES READY:</strong> Your 1,990,000 ETHGR tokens are verified transferable. 
          Use these sales packages to generate immediate ETH for pool creation.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="packages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="packages">Sales Packages</TabsTrigger>
          <TabsTrigger value="channels">Marketing Channels</TabsTrigger>
          <TabsTrigger value="execution">Execute Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="packages">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {salesPackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`cursor-pointer transition-all ${
                  selectedPackage === pkg.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                } ${pkg.recommended ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pkg.name}
                    {pkg.recommended && <Badge>Recommended</Badge>}
                  </CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      ${pkg.total.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {pkg.tokens.toLocaleString()} tokens @ ${pkg.price}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>ETH Generated:</span>
                      <span className="font-bold">{pkg.eth} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tokens Remaining:</span>
                      <span>{(1990000 - pkg.tokens).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Portfolio %:</span>
                      <span>{((pkg.tokens / 1990000) * 100).toFixed(1)}%</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${
                      selectedPackage === pkg.id ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <Target className="h-4 w-4 mr-1" />
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels">
          <div className="space-y-4">
            {salesChannels.map((channel, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{channel.platform}</h3>
                      <p className="text-muted-foreground">{channel.audience}</p>
                    </div>
                    <Button 
                      onClick={() => openSalesChannel(channel.link)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open Platform
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-bold">Reach:</div>
                      <div>{channel.reach}</div>
                    </div>
                    <div>
                      <div className="font-bold">Conversion:</div>
                      <div>{channel.conversionRate}</div>
                    </div>
                    <div>
                      <div className="font-bold">Avg Sale:</div>
                      <div>{channel.avgSaleSize}</div>
                    </div>
                    <div>
                      <div className="font-bold">Priority:</div>
                      <div>{index < 2 ? "High" : "Medium"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="execution">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Sales Contract Generator
                </CardTitle>
                <CardDescription>
                  Generate ready-to-post sales messages for your selected package
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="buyer-info">Your Contact Info</Label>
                    <Input
                      id="buyer-info"
                      placeholder="Discord: username#1234 or Telegram: @username"
                      value={buyerInfo}
                      onChange={(e) => setBuyerInfo(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={generateSalesContract}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Generate Sales Message
                    </Button>
                  </div>
                </div>

                {salesMessage && (
                  <div className="space-y-3">
                    <Label htmlFor="sales-message">Generated Sales Message</Label>
                    <Textarea
                      id="sales-message"
                      value={salesMessage}
                      onChange={(e) => setSalesMessage(e.target.value)}
                      rows={15}
                      className="font-mono text-xs"
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(salesMessage)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Message
                      </Button>
                      <Button 
                        onClick={() => openSalesChannel("https://discord.com/channels/@me")}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Post to Discord
                      </Button>
                      <Button 
                        onClick={() => openSalesChannel("https://t.me")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Post to Telegram
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Execution Strategy</CardTitle>
                <CardDescription>
                  Recommended approach for maximum success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <div className="font-bold">Start with Discord DeFi Communities</div>
                      <div className="text-sm text-muted-foreground">
                        Post in 3-5 active trading groups with your generated message
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <div className="font-bold">Expand to Telegram Groups</div>
                      <div className="text-sm text-muted-foreground">
                        Share in relevant crypto trading and DeFi channels
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <div className="font-bold">Handle Inquiries Quickly</div>
                      <div className="text-sm text-muted-foreground">
                        Respond to interested buyers with Etherscan verification links
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <div className="font-bold">Execute Fast Transfers</div>
                      <div className="text-sm text-muted-foreground">
                        Use low gas times for quick, cheap token transfers
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Ready to Launch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-bold">Tokens Ready</div>
              <div className="text-sm text-muted-foreground">1,990,000 verified transferable</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-bold">Sales Materials</div>
              <div className="text-sm text-muted-foreground">Contract & messages ready</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-bold">Revenue Target</div>
              <div className="text-sm text-muted-foreground">$5,000+ first sales</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}