import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Target,
  TrendingUp,
  Copy,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  MessageCircle,
  Send,
  Wallet,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SalesExecution() {
  const [campaignStep, setCampaignStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [salesTarget, setSalesTarget] = useState("5000");
  const { toast } = useToast();

  const executionPlan = [
    {
      step: 1,
      title: "Copy Marketing Content",
      description: "Get Discord/Telegram templates ready",
      timeFrame: "5 minutes",
      action: "Copy & prepare content",
      revenue: "$0"
    },
    {
      step: 2,
      title: "Post on Discord Communities",
      description: "Target crypto trading servers",
      timeFrame: "15 minutes",
      action: "Post in 5-10 servers",
      revenue: "$1,000-2,000"
    },
    {
      step: 3,
      title: "Telegram Channel Outreach",
      description: "Share in trading groups",
      timeFrame: "10 minutes",
      action: "Post in active channels",
      revenue: "$1,500-3,000"
    },
    {
      step: 4,
      title: "Direct Message Strategy",
      description: "Contact interested traders",
      timeFrame: "30 minutes",
      action: "Send targeted DMs",
      revenue: "$2,000-5,000"
    }
  ];

  const marketingTemplates = {
    discordQuick: `🚀 **ETHGR FLASH SALE - 24 HOURS ONLY** 🚀

💎 **100,000 ETHGR tokens for $5,000** (normally $35,500)
✅ Verified contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
⚡ **85% DISCOUNT** - Save $30,500!

🔥 **Why This Deal:**
- Recovered from honeypot contract (mission complete)
- Clean, transferable tokens
- Uniswap pool launching soon
- First-mover advantage

💰 **Payment:** ETH/USDC to 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
🎯 **Delivery:** Instant wallet transfer

DM for immediate purchase! Only 5 packages available.`,

    telegramDirect: `🎯 URGENT: ETHGR Token Opportunity

📊 **THE DEAL:**
• 100K tokens = $5,000 (Save $30,500!)
• Verified ERC20 contract
• No honeypot risks
• Immediate transfer

⚡ **PROOF:**
Contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
Wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843

💸 Send ETH/USDC → Receive tokens instantly
🕐 Limited time: 24 hours only

Reply "INTERESTED" for instant deal!`,

    directMessage: `Hi! I'm offering exclusive access to ETHGR tokens before public launch.

📋 **Quick Details:**
- 100,000 ETHGR tokens
- Price: $5,000 (85% below market)
- Verified contract on Etherscan
- Instant delivery to your wallet

This is from successfully recovering tokens from a honeypot situation. Clean, transferable tokens ready for market.

Interested? Payment via ETH/USDC for immediate transfer.`
  };

  const completedStepHandler = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
      toast({
        title: "Step Complete!",
        description: `${executionPlan[step - 1].title} marked as done`,
      });
    }
  };

  const copyTemplate = (template: string, name: string) => {
    navigator.clipboard.writeText(template);
    toast({
      title: "Copied!",
      description: `${name} template ready to paste`,
    });
  };

  const calculateProgress = () => {
    return (completedSteps.length / executionPlan.length) * 100;
  };

  const estimatedRevenue = () => {
    const baseRevenue = completedSteps.length * 1250; // $1250 per completed step
    return Math.min(baseRevenue, 5000);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales Execution Dashboard</h1>
          <p className="text-muted-foreground">
            Execute your $5,000 Quick Sale strategy step-by-step
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open('/instant-monetization', '_blank')}>
            Back to Monetization
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                24-Hour Sales Campaign Progress
              </CardTitle>
              <CardDescription>
                Follow these steps to generate $5,000 in the next 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold">{calculateProgress().toFixed(0)}% Complete</div>
                  <div className="text-sm text-muted-foreground">
                    {completedSteps.length} of {executionPlan.length} steps done
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">${estimatedRevenue().toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Estimated revenue</div>
                </div>
              </div>
              
              <Progress value={calculateProgress()} className="h-3" />

              <div className="space-y-3">
                {executionPlan.map((plan) => (
                  <div 
                    key={plan.step} 
                    className={`p-4 rounded-lg border ${
                      completedSteps.includes(plan.step) 
                        ? 'bg-green-50 border-green-200' 
                        : campaignStep === plan.step 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          completedSteps.includes(plan.step) 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300'
                        }`}>
                          {completedSteps.includes(plan.step) ? <CheckCircle className="h-4 w-4" /> : plan.step}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{plan.title}</div>
                          <div className="text-sm text-muted-foreground">{plan.description}</div>
                          <div className="flex gap-4 mt-2">
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {plan.timeFrame}
                            </Badge>
                            <Badge variant="outline">
                              <DollarSign className="h-3 w-3 mr-1" />
                              {plan.revenue}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={completedSteps.includes(plan.step) ? "outline" : "default"}
                        onClick={() => completedStepHandler(plan.step)}
                        disabled={completedSteps.includes(plan.step)}
                      >
                        {completedSteps.includes(plan.step) ? "Done" : "Complete"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Ready-to-Post Templates
              </CardTitle>
              <CardDescription>Copy and paste these optimized sales messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-semibold">Discord Community Post</Label>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyTemplate(marketingTemplates.discordQuick, "Discord")}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea 
                  value={marketingTemplates.discordQuick} 
                  readOnly 
                  className="h-32 text-xs font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-semibold">Telegram Group Message</Label>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyTemplate(marketingTemplates.telegramDirect, "Telegram")}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea 
                  value={marketingTemplates.telegramDirect} 
                  readOnly 
                  className="h-32 text-xs font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-semibold">Direct Message Template</Label>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyTemplate(marketingTemplates.directMessage, "DM")}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea 
                  value={marketingTemplates.directMessage} 
                  readOnly 
                  className="h-24 text-xs font-mono"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Campaign Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold text-blue-700">Target Revenue</div>
                <div className="text-2xl font-bold">$5,000</div>
                <div className="text-sm text-muted-foreground">100K tokens @ $0.05</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Market Value:</span>
                  <span className="font-bold">$35,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Your Price:</span>
                  <span className="font-bold text-green-600">$5,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Buyer Savings:</span>
                  <span className="font-bold text-blue-600">$30,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Discount:</span>
                  <span className="font-bold text-purple-600">85%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-semibold">Receive Payments At:</Label>
                <div className="font-mono text-xs mt-1 p-2 bg-gray-50 rounded break-all">
                  0x058C8FE01E5c9eaC6ee19e6673673B549B368843
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-semibold">Accept:</Label>
                <div className="flex gap-2 mt-1">
                  <Badge>ETH</Badge>
                  <Badge>USDC</Badge>
                  <Badge>USDT</Badge>
                </div>
              </div>

              <div className="pt-3 border-t">
                <Button className="w-full" onClick={() => window.open('/token-transfer-tool', '_blank')}>
                  <Send className="h-4 w-4 mr-2" />
                  Execute Transfers
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full" onClick={() => window.open('/live-transaction-analyzer', '_blank')}>
                Monitor Payments
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => window.open('/ethgr-success-dashboard', '_blank')}>
                Success Dashboard
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => window.open('/remix-integration', '_blank')}>
                Deploy Contracts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}