import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink,
  Users,
  TrendingUp,
  MessageCircle,
  Target,
  Copy
} from "lucide-react";

export default function CommunityTargets() {
  const discordCommunities = [
    {
      name: "DeFi Pulse Community",
      members: "45,000+",
      focus: "DeFi protocols and token trading",
      activity: "Very High",
      tokenSales: "Common",
      approach: "Professional presentation with recovery story",
      invite: "https://discord.gg/defipulse"
    },
    {
      name: "Uniswap Community",
      members: "35,000+", 
      focus: "DEX trading and liquidity provision",
      activity: "High",
      tokenSales: "Moderate",
      approach: "Focus on future pool creation plans",
      invite: "https://discord.gg/uniswap"
    },
    {
      name: "1inch Network",
      members: "25,000+",
      focus: "DEX aggregation and token swaps",
      activity: "High",
      tokenSales: "Common",
      approach: "Emphasize bulk trading opportunities",
      invite: "https://discord.gg/1inch"
    },
    {
      name: "SushiSwap",
      members: "30,000+",
      focus: "AMM and DeFi ecosystem",
      activity: "Moderate",
      tokenSales: "Occasional",
      approach: "Recovery story with liquidity plans",
      invite: "https://discord.gg/sushiswap"
    }
  ];

  const telegramGroups = [
    {
      name: "DeFi Traders",
      members: "50,000+",
      focus: "Active DeFi token trading",
      language: "English",
      rules: "Token sales allowed with verification",
      bestTime: "8-12 PM UTC"
    },
    {
      name: "Crypto Trading Signals",
      members: "75,000+",
      focus: "Trading signals and opportunities",
      language: "English",
      rules: "OTC sales permitted",
      bestTime: "2-6 PM UTC"
    },
    {
      name: "Token Hunters",
      members: "40,000+",
      focus: "New token discoveries",
      language: "English",
      rules: "Recovery stories welcome",
      bestTime: "10 AM - 2 PM UTC"
    },
    {
      name: "DeFi Yield Farmers",
      members: "35,000+",
      focus: "Yield farming strategies",
      language: "English",
      rules: "Bulk token sales accepted",
      bestTime: "6-10 PM UTC"
    }
  ];

  const salesTemplate = `🚀 ETHGR Token Recovery Sale - Verified & Transferable 🚀

💎 AUTHENTIC RECOVERY STORY
• Rescued 1,990,000 tokens from honeypot contract
• New verified contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
• Etherscan verified ✅ | 0% tax ✅ | Transferable ✅

📊 BULK SALE OFFER
• Available: 100,000 ETHGR tokens
• Price: $0.05/token (85% below $0.355 market rate)
• Total: $5,000 (≈2 ETH)
• Payment: ETH/USDC to verified wallet

🔍 VERIFICATION LINKS
• Contract: https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
• Minting TX: https://etherscan.io/tx/0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c01240c169
• Honeypot Check: https://honeypot.is (0% tax confirmed)

⚡ WHY THIS PRICE?
• Support legitimate recovery effort
• Bulk discount from market rate
• Limited availability (1.99M total supply)
• Immediate transfer capability

📞 CONTACT: [Your Contact Info Here]

#DeFi #ETHGR #TokenSale #Recovery #Verified`;

  const copyTemplate = () => {
    navigator.clipboard.writeText(salesTemplate);
    alert("Sales template copied! Add your contact info and you're ready to post.");
  };

  const openCommunity = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Target Communities & Sales Strategy</h1>
        <p className="text-muted-foreground">
          Specific Discord servers and Telegram groups where token sales are active and welcomed
        </p>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <Target className="h-4 w-4" />
        <AlertDescription>
          <strong>SALES STRATEGY:</strong> These communities actively trade tokens and welcome verified projects. 
          Your recovery story and verified contract give you credibility advantage.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Copy className="h-5 w-5" />
            Ready-to-Use Sales Template
          </CardTitle>
          <CardDescription>
            Copy this message and add your contact info - ready to post immediately
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <pre className="text-xs whitespace-pre-wrap">{salesTemplate}</pre>
          </div>
          <Button 
            onClick={copyTemplate}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy Sales Template
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Discord Communities (Priority)
            </CardTitle>
            <CardDescription>
              High-activity Discord servers with token trading channels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {discordCommunities.map((community, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold">{community.name}</div>
                    <div className="text-sm text-muted-foreground">{community.focus}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{community.members}</Badge>
                    <div className="text-xs text-muted-foreground mt-1">{community.activity}</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm mb-3">
                  <div>
                    <span className="font-bold">Token Sales:</span> {community.tokenSales}
                  </div>
                  <div>
                    <span className="font-bold">Approach:</span> {community.approach}
                  </div>
                </div>

                <Button 
                  size="sm"
                  onClick={() => openCommunity(community.invite)}
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Join Community
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Telegram Groups (High Volume)
            </CardTitle>
            <CardDescription>
              Active Telegram channels with token trading and OTC sales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {telegramGroups.map((group, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold">{group.name}</div>
                    <div className="text-sm text-muted-foreground">{group.focus}</div>
                  </div>
                  <Badge variant="outline">{group.members}</Badge>
                </div>
                
                <div className="space-y-2 text-sm mb-3">
                  <div>
                    <span className="font-bold">Rules:</span> {group.rules}
                  </div>
                  <div>
                    <span className="font-bold">Best Time:</span> {group.bestTime}
                  </div>
                  <div>
                    <span className="font-bold">Language:</span> {group.language}
                  </div>
                </div>

                <Button 
                  size="sm"
                  onClick={() => openCommunity("https://t.me")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Search on Telegram
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Execution Plan</CardTitle>
          <CardDescription>
            Exactly what to do to start generating sales today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <div className="font-bold">Copy Sales Template</div>
                <div className="text-sm text-muted-foreground">
                  Use the template above and add your Discord/Telegram contact info
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <div className="font-bold">Join 2-3 Discord Communities</div>
                <div className="text-sm text-muted-foreground">
                  Start with DeFi Pulse and Uniswap - highest activity and token trading
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <div className="font-bold">Post in Trading Channels</div>
                <div className="text-sm text-muted-foreground">
                  Look for #trading, #otc-sales, or #token-discussion channels
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <div className="font-bold">Respond to Inquiries</div>
                <div className="text-sm text-muted-foreground">
                  Share Etherscan links and answer questions about verification
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                5
              </div>
              <div>
                <div className="font-bold">Execute Fast Transfers</div>
                <div className="text-sm text-muted-foreground">
                  Once payment confirmed, transfer tokens immediately to build reputation
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-orange-500 bg-orange-50">
        <TrendingUp className="h-4 w-4" />
        <AlertDescription>
          <strong>SUCCESS TIP:</strong> Your authentic recovery story is a major advantage. 
          People buy from verified projects with real stories, not anonymous token dumps.
        </AlertDescription>
      </Alert>
    </div>
  );
}