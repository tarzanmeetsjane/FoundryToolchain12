import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  DollarSign,
  Zap,
  Copy,
  ExternalLink,
  TrendingUp,
  Users,
  MessageCircle,
  Send,
  Wallet,
  Target,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function InstantMonetization() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const { toast } = useToast();

  const salesPackages = [
    {
      id: "starter",
      name: "Starter Package",
      tokens: 100000,
      price: 0.05,
      total: 5000,
      timeframe: "24 hours",
      description: "Quick cash generation for immediate needs"
    },
    {
      id: "growth",
      name: "Growth Package", 
      tokens: 250000,
      price: 0.08,
      total: 20000,
      timeframe: "48 hours",
      description: "Balanced approach for steady revenue"
    },
    {
      id: "premium",
      name: "Premium Package",
      tokens: 500000,
      price: 0.12,
      total: 60000,
      timeframe: "1 week",
      description: "Maximum value extraction strategy"
    }
  ];

  const marketingContent = {
    discord: `🚀 **ETHGR Token Launch - Exclusive Early Access** 🚀

💎 **1,990,000 Verified ETHGR Tokens Available**
📊 Current Market Value: $0.355/token = $706,450 total value
✅ Contract Verified on Etherscan: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247

🔥 **FLASH SALE PRICING:**
• 100K tokens = $5,000 ($0.05/token) - 85% discount!
• 250K tokens = $20,000 ($0.08/token) - 77% discount!
• 500K tokens = $60,000 ($0.12/token) - 66% discount!

⚡ **Why ETHGR?**
- Recovery from blacklisted honeypot (mission accomplished)
- Clean, transferable ERC20 tokens
- Uniswap pool creation planned
- First-mover advantage on proven concept

💰 **Payment Methods:** ETH, USDC, PayPal, Bank Transfer
🎯 **ROI Potential:** 300-700% when market launches

DM for instant purchase! Limited quantities.`,

    telegram: `🎯 ETHGR TOKEN EXCLUSIVE OPPORTUNITY

🏆 Mission: Successfully recovered 1,990,000 tokens from honeypot contract
📈 Current Market Reference: $0.355/token
💼 Total Portfolio Value: $706,450

⚡ FLASH SALE - LIMITED TIME:
├─ Starter: 100K tokens → $5,000 (Save $30,500!)
├─ Growth: 250K tokens → $20,000 (Save $68,750!)  
└─ Premium: 500K tokens → $60,000 (Save $117,500!)

✅ VERIFIED BENEFITS:
• Clean ERC20 contract (no honeypot risks)
• Etherscan verified: 0xfA7b8c...abF247
• Immediate wallet transfer
• Pool creation funding secured

Contact @username for instant deals! 
Payment: ETH/USDC/Fiat accepted`,

    email: `Subject: ETHGR Token Investment Opportunity - 85% Discount Flash Sale

Dear Investor,

I'm offering exclusive access to my successfully recovered ETHGR token portfolio before public market launch.

OPPORTUNITY OVERVIEW:
• 1,990,000 verified ETHGR tokens recovered from blacklisted contract
• Current market reference: $0.355/token ($706,450 total value)
• Offering significant discount for early liquidity

INVESTMENT PACKAGES:
1. Starter (100K tokens): $5,000 instead of $35,500 (85% discount)
2. Growth (250K tokens): $20,000 instead of $88,750 (77% discount)  
3. Premium (500K tokens): $60,000 instead of $177,500 (66% discount)

WHY THIS OPPORTUNITY:
✓ Proven recovery success from honeypot situation
✓ Clean, transferable ERC20 tokens (no restrictions)
✓ Uniswap pool launch planned with sale proceeds
✓ First-mover advantage on authenticated project

PAYMENT: ETH, USDC, PayPal, or bank transfer
DELIVERY: Immediate wallet transfer upon payment

Reply within 24 hours for priority allocation.

Best regards,
ETHGR Recovery Team`
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} marketing content copied to clipboard`,
    });
  };

  const calculatePotentialRevenue = () => {
    const starterRevenue = 5000;
    const growthRevenue = 20000;
    const premiumRevenue = 60000;
    return { starterRevenue, growthRevenue, premiumRevenue };
  };

  const revenue = calculatePotentialRevenue();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Instant ETHGR Monetization</h1>
          <p className="text-muted-foreground">
            Convert 1,990,000 ETHGR tokens to immediate cash flow
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.open('/ethgr-success-dashboard', '_blank')}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Success Dashboard
          </Button>
        </div>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <DollarSign className="h-4 w-4" />
        <AlertDescription>
          <strong>READY TO MONETIZE:</strong> 1,990,000 verified ETHGR tokens worth $706,450 at market price. 
          Flash sale pricing offers 60-85% discounts for immediate liquidity.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {salesPackages.map((pkg) => (
          <Card key={pkg.id} className={`cursor-pointer transition-all hover:shadow-lg ${selectedPackage === pkg.id ? 'ring-2 ring-blue-500' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {pkg.name}
                <Badge variant="secondary">{pkg.timeframe}</Badge>
              </CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">${pkg.total.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    {pkg.tokens.toLocaleString()} tokens @ ${pkg.price}/token
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Market Value:</span>
                    <span>${(pkg.tokens * 0.355).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Your Price:</span>
                    <span className="font-bold">${pkg.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Buyer Savings:</span>
                    <span className="font-bold">${((pkg.tokens * 0.355) - pkg.total).toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  variant={selectedPackage === pkg.id ? "default" : "outline"}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Select Package
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Marketing Content
            </CardTitle>
            <CardDescription>Ready-to-post sales content for Discord, Telegram, Email</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Discord Message</Label>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(marketingContent.discord, "Discord")}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <Textarea 
                value={marketingContent.discord} 
                readOnly 
                className="h-32 text-xs font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Telegram Post</Label>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(marketingContent.telegram, "Telegram")}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <Textarea 
                value={marketingContent.telegram} 
                readOnly 
                className="h-32 text-xs font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Email Template</Label>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(marketingContent.email, "Email")}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <Textarea 
                value={marketingContent.email} 
                readOnly 
                className="h-40 text-xs font-mono"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Revenue Projections
            </CardTitle>
            <CardDescription>Expected returns from each sales strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-700 mb-2">24-Hour Target</div>
                <div className="text-2xl font-bold text-green-800">${revenue.starterRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Starter package sales</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-semibold">Week 1 Goal</div>
                    <div className="text-sm text-muted-foreground">Growth packages</div>
                  </div>
                  <div className="text-lg font-bold">${revenue.growthRevenue.toLocaleString()}</div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-semibold">Month 1 Target</div>
                    <div className="text-sm text-muted-foreground">Premium sales</div>
                  </div>
                  <div className="text-lg font-bold">${revenue.premiumRevenue.toLocaleString()}</div>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <div>
                    <div className="font-semibold">Total Potential</div>
                    <div className="text-sm text-muted-foreground">All packages combined</div>
                  </div>
                  <div className="text-lg font-bold text-blue-700">
                    ${(revenue.starterRevenue + revenue.growthRevenue + revenue.premiumRevenue).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Button className="w-full" onClick={() => window.open('/sales-execution', '_blank')}>
                  <Send className="h-4 w-4 mr-2" />
                  Execute Sales Strategy
                </Button>
                <Button variant="outline" className="w-full" onClick={() => window.open('/cash-out-dashboard', '_blank')}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Cash Out Tools
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Quick Action Plan
          </CardTitle>
          <CardDescription>Step-by-step monetization execution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-700 mb-2">1</div>
              <div className="font-semibold mb-1">Copy Content</div>
              <div className="text-sm text-muted-foreground">Use marketing templates above</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-700 mb-2">2</div>
              <div className="font-semibold mb-1">Post & Share</div>
              <div className="text-sm text-muted-foreground">Discord, Telegram, social media</div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-700 mb-2">3</div>
              <div className="font-semibold mb-1">Process Sales</div>
              <div className="text-sm text-muted-foreground">ETH/USDC payments via MetaMask</div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-700 mb-2">4</div>
              <div className="font-semibold mb-1">Transfer Tokens</div>
              <div className="text-sm text-muted-foreground">Direct wallet-to-wallet delivery</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold mb-2">Payment Wallet Address:</div>
            <div className="font-mono text-sm break-all">0x058C8FE01E5c9eaC6ee19e6673673B549B368843</div>
            <div className="text-xs text-muted-foreground mt-1">
              Accept ETH, USDC, or other ERC20 tokens at this address
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}