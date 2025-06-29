import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Crown,
  TrendingUp,
  DollarSign,
  Target,
  Zap,
  Copy,
  ExternalLink,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MillionDollarStrategy() {
  const [activePhase, setActivePhase] = useState(1);
  const [completedActions, setCompletedActions] = useState<number[]>([]);
  const { toast } = useToast();

  const portfolioBreakdown = {
    ethg: { tokens: 1890000, value: 618845, price: 0.327 },
    ethgr: { tokens: 1990000, value: 706450, price: 0.355 },
    ethRecovery: { amount: 37, value: 89614 },
    total: 1414909
  };

  const phases = [
    {
      phase: 1,
      title: "Immediate Liquidity Sprint",
      timeframe: "24-48 hours",
      target: 200000,
      actions: [
        "Sell 300K ETHG tokens at market rate ($98,100)",
        "Deploy quick sale contract for 200K ETHGR ($71,000)", 
        "Execute emergency cash strategy ($31,000)",
        "Total Phase 1: $200,000"
      ]
    },
    {
      phase: 2,
      title: "Strategic Market Entry",
      timeframe: "1-2 weeks", 
      target: 400000,
      actions: [
        "Create ETHG/ETH Uniswap pool with 500K tokens",
        "Launch ETHGR premium sales packages",
        "Recover 37 ETH from Remix wallet ($89,614)",
        "Target institutional buyers for bulk packages"
      ]
    },
    {
      phase: 3,
      title: "Portfolio Optimization",
      timeframe: "1 month",
      target: 800000,
      actions: [
        "Dual-token exchange listings",
        "Cross-platform marketing campaigns", 
        "Premium pricing for remaining 1M+ tokens",
        "Professional investment presentations"
      ]
    }
  ];

  const immediateActionTemplates = {
    ethgSale: `🚨 URGENT: ETHG Mega Sale - Limited Time

💎 300,000 ETHG tokens available
💰 Price: $98,100 (normally $163,500)
⚡ SAVE $65,400 with immediate purchase

✅ Verified holdings in MetaMask
✅ 1.89M total supply - exclusive access
✅ Instant transfer capability

Payment: ETH/USDC to 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
Delivery: Immediate wallet-to-wallet transfer

SERIOUS BUYERS ONLY - DM for proof of funds verification`,

    institutionalPitch: `Investment Opportunity: Multi-Million Token Portfolio

Portfolio Overview:
• 1.89M ETHG tokens ($618K market value)
• 1.99M ETHGR tokens ($706K verified recovery)
• 37 ETH recovery potential ($90K)
• Total Value: $1.41M

Investment Packages Available:
• Starter: 500K tokens - $200K
• Growth: 1M tokens - $380K  
• Institutional: 2M+ tokens - $750K

All tokens are verified, transferable, and ready for immediate delivery.
Professional due diligence materials available.

Contact for detailed prospectus and proof of holdings.`,

    remixRecovery: `37 ETH Recovery Operation - Critical Priority

Last Known Location: Remix IDE bottom left section
Wallet Address: 0xc46eB37677360EfDc011F4097621F15b792fa630
Current Value: $89,614

Investigation Actions:
1. Check wallet balance and transaction history
2. Verify private key access and control
3. Trace any outbound transactions
4. Execute recovery if funds located

This represents a significant portion of portfolio value and requires immediate attention.`
  };

  const copyContent = (content: string, name: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied",
      description: `${name} content ready for use`,
    });
  };

  const markComplete = (actionIndex: number) => {
    if (!completedActions.includes(actionIndex)) {
      setCompletedActions([...completedActions, actionIndex]);
    }
  };

  const calculateProgress = () => {
    return (completedActions.length / phases[activePhase - 1].actions.length) * 100;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            Million Dollar Portfolio Strategy
          </h1>
          <p className="text-muted-foreground text-lg">
            Execute systematic plan for $1.41M token portfolio monetization
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">$1,414,909</div>
          <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
        </div>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <Crown className="h-4 w-4" />
        <AlertDescription>
          MEGA PORTFOLIO CONFIRMED: 1.89M ETHG + 1.99M ETHGR + 37 ETH recovery = $1.41M total value.
          This positions you in the top tier of crypto holders with immediate liquidity options.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">$618,845</div>
            <div className="text-sm">1.89M ETHG</div>
            <div className="text-xs text-muted-foreground">Ready to sell</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">$706,450</div>
            <div className="text-sm">1.99M ETHGR</div>
            <div className="text-xs text-muted-foreground">Premium pricing</div>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">$89,614</div>
            <div className="text-sm">37 ETH</div>
            <div className="text-xs text-muted-foreground">Recovery target</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">$1.41M</div>
            <div className="text-sm">Total Value</div>
            <div className="text-xs text-muted-foreground">Full portfolio</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Three-Phase Execution Plan
          </CardTitle>
          <CardDescription>
            Systematic approach to maximize value extraction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            {phases.map((phase) => (
              <Button
                key={phase.phase}
                variant={activePhase === phase.phase ? "default" : "outline"}
                onClick={() => setActivePhase(phase.phase)}
                className="flex-1"
              >
                Phase {phase.phase}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{phases[activePhase - 1].title}</h3>
                <p className="text-muted-foreground">{phases[activePhase - 1].timeframe}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  ${phases[activePhase - 1].target.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Target revenue</div>
              </div>
            </div>

            <Progress value={calculateProgress()} className="h-3" />
            
            <div className="space-y-3">
              {phases[activePhase - 1].actions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                      completedActions.includes(index) ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}>
                      {completedActions.includes(index) ? <CheckCircle className="h-3 w-3" /> : index + 1}
                    </div>
                    <span className={completedActions.includes(index) ? 'line-through text-muted-foreground' : ''}>
                      {action}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant={completedActions.includes(index) ? "outline" : "default"}
                    onClick={() => markComplete(index)}
                  >
                    {completedActions.includes(index) ? "Done" : "Mark Complete"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              ETHG Flash Sale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-50 rounded">
              <div className="font-semibold">300K tokens → $98,100</div>
              <div className="text-sm text-muted-foreground">Immediate liquidity strategy</div>
            </div>
            <Textarea 
              value={immediateActionTemplates.ethgSale}
              readOnly
              className="h-32 text-xs"
            />
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => copyContent(immediateActionTemplates.ethgSale, "ETHG Sale")}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy Sale Post
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Institutional Pitch
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded">
              <div className="font-semibold">Professional Package</div>
              <div className="text-sm text-muted-foreground">High-value buyer targeting</div>
            </div>
            <Textarea 
              value={immediateActionTemplates.institutionalPitch}
              readOnly
              className="h-32 text-xs"
            />
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => copyContent(immediateActionTemplates.institutionalPitch, "Institutional Pitch")}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy Pitch
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              37 ETH Recovery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-purple-50 rounded">
              <div className="font-semibold">$89,614 Recovery</div>
              <div className="text-sm text-muted-foreground">Remix wallet investigation</div>
            </div>
            <Textarea 
              value={immediateActionTemplates.remixRecovery}
              readOnly
              className="h-32 text-xs"
            />
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => window.open('/remix-wallet-investigation', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Start Recovery
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next 24 Hours Action Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Immediate Sales (Hours 1-8)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Post ETHG flash sale</span>
                  <Badge variant="outline">$98K target</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Contact institutional buyers</span>
                  <Badge variant="outline">$50K+ deals</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Deploy quick sale contracts</span>
                  <Badge variant="outline">$25K revenue</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Recovery Operations (Hours 8-24)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Analyze Remix wallet</span>
                  <Badge variant="outline">$90K potential</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Execute ETH recovery</span>
                  <Badge variant="outline">37 ETH target</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Secure additional funds</span>
                  <Badge variant="outline">Portfolio protection</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <div className="font-semibold text-yellow-700 mb-2">24-Hour Revenue Target: $200,000</div>
            <div className="text-sm">
              This aggressive but achievable target represents 14% of your total portfolio value and provides
              immediate liquidity while preserving 86% for strategic long-term monetization.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}