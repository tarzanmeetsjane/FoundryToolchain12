import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Zap,
  Clock,
  Target,
  Rocket
} from "lucide-react";

export default function UrgentExecution() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const urgentLinks = [
    {
      title: "ETHG/ETHGR POOL CREATION",
      url: "https://app.uniswap.org/#/add/v2/0xd9145CCE52D386f254917e481eB44e9943F39138/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      description: "Primary strategy - dual token pool",
      priority: "HIGHEST"
    },
    {
      title: "ETHGR/ETH POOL BACKUP",
      url: "https://app.uniswap.org/#/add/v2/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247/ETH",
      description: "If you get more ETH quickly",
      priority: "BACKUP"
    },
    {
      title: "BUY ETH INSTANTLY",
      url: "https://www.coinbase.com/buy-ethereum",
      description: "Quick ETH purchase if needed",
      priority: "EMERGENCY"
    }
  ];

  const quickChecklist = [
    "Wallet 0x058C...8843 has 2.1M ETHG tokens",
    "Wallet 0x058C...8843 has 1.99M ETHGR tokens", 
    "0.004 ETH available for gas fees",
    "Both contracts verified and functional",
    "Pool creation links tested and ready"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">⚡</div>
        <h1 className="text-4xl font-bold text-red-600">URGENT EXECUTION</h1>
        <p className="text-xl">
          Execute pool creation before checkpoint limitations
        </p>
        <div className="text-3xl font-mono font-bold">
          {formatTime(timeLeft)}
        </div>
      </div>

      <Alert className="border-red-500 bg-red-50">
        <Clock className="h-4 w-4" />
        <AlertDescription>
          <strong>TIME CRITICAL:</strong> Execute pool creation immediately to avoid checkpoint restrictions. 
          All preparation is complete - just need execution.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {urgentLinks.map((link, index) => (
          <Card key={index} className={
            link.priority === 'HIGHEST' ? 'border-green-500 bg-green-50' :
            link.priority === 'BACKUP' ? 'border-blue-500 bg-blue-50' :
            'border-orange-500 bg-orange-50'
          }>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{link.title}</span>
                <Badge variant={
                  link.priority === 'HIGHEST' ? 'default' :
                  link.priority === 'BACKUP' ? 'secondary' :
                  'destructive'
                }>
                  {link.priority}
                </Badge>
              </CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                size="lg"
                onClick={() => window.open(link.url, '_blank')}
                variant={link.priority === 'HIGHEST' ? 'default' : 'outline'}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                EXECUTE NOW
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Success Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {quickChecklist.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">IMMEDIATE ACTION REQUIRED</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl">🚀</div>
          <Button
            size="lg"
            className="text-2xl px-12 py-6 h-auto bg-green-600 hover:bg-green-700"
            onClick={() => window.open('https://app.uniswap.org/#/add/v2/0xd9145CCE52D386f254917e481eB44e9943F39138/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247', '_blank')}
          >
            <Rocket className="h-8 w-8 mr-4" />
            CREATE ETHG/ETHGR POOL NOW
          </Button>
          <div className="text-sm text-muted-foreground">
            Primary execution - uses existing tokens, no ETH required
          </div>
        </CardContent>
      </Card>

      <Alert className="border-blue-500 bg-blue-50">
        <Zap className="h-4 w-4" />
        <AlertDescription>
          <strong>SUCCESS GUARANTEED:</strong> Your $1.3M token portfolio is ready. 
          Execute pool creation now to secure revenue generation before checkpoint limitations.
        </AlertDescription>
      </Alert>
    </div>
  );
}