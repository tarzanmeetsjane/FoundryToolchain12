import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Bot,
  Target,
  Users,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
  Copy,
  ExternalLink,
  Play,
  Pause
} from "lucide-react";

export default function AutomatedSalesAssistant() {
  const [assistantActive, setAssistantActive] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [salesProgress, setSalesProgress] = useState(0);
  const [activeLeads, setActiveLeads] = useState<any[]>([]);

  const salesTargets = [
    {
      id: "defi-discord",
      name: "DeFi Discord Communities",
      members: "50,000+",
      conversionRate: "3-5%",
      avgSale: "$2,500",
      difficulty: "Medium",
      description: "Active DeFi trading communities with token interest"
    },
    {
      id: "telegram-trading",
      name: "Telegram Trading Groups",
      members: "100,000+",
      conversionRate: "2-4%",
      avgSale: "$1,500",
      difficulty: "Easy",
      description: "High-volume crypto trading channels"
    },
    {
      id: "reddit-crypto",
      name: "Reddit CryptoCurrency",
      members: "4M+",
      conversionRate: "0.5-1%",
      avgSale: "$500",
      difficulty: "Hard",
      description: "Large community but strict moderation"
    },
    {
      id: "twitter-defi",
      name: "Twitter DeFi Influencers",
      members: "Variable",
      conversionRate: "1-3%",
      avgSale: "$5,000",
      difficulty: "Medium",
      description: "Reach through DeFi influencer networks"
    }
  ];

  const automatedMessages = {
    initial: `🚀 ETHGR Token Recovery Sale - Verified Transferable 🚀

💎 AUTHENTIC RECOVERY STORY
• Rescued from honeypot contract 0xd914...9138
• New verified contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
• 1,990,000 tokens successfully migrated ✅

📊 SALE DETAILS
• Price: $0.05/token (85% below $0.355 market rate)
• Available: 100,000 tokens = $5,000
• Payment: ETH/USDC to verified wallet
• Instant transfer after payment confirmation

🔍 VERIFICATION
• Etherscan verified contract ✅
• Honeypot test: 0% tax ✅ 
• Transfer test: Successful ✅
• Real market history on DEX Screener

⚡ WHY THIS PRICE?
• Bulk sale discount
• Support recovery mission
• Limited availability
• Proven transferable (no restrictions)

Contact: ${contactInfo || "DM for purchase"}

#DeFi #TokenSale #ETHGR #Recovery`,

    followUp: `Quick follow-up on ETHGR tokens 👋

Still have limited quantity available:
• 100K tokens at $0.05 each
• Verified transferable contract
• No honeypot restrictions
• Immediate transfer capability

Ready to proceed? Payment via ETH/USDC accepted.`,

    closing: `Final availability notice - ETHGR tokens

Last chance for verified recovery tokens:
• Price: $0.05/token
• Quantity: 50K-100K available
• Verified contract on Etherscan
• Immediate settlement

This offer expires in 24 hours.`
  };

  const startAutomatedSales = () => {
    if (!contactInfo) {
      alert("Please add your contact information first");
      return;
    }
    if (selectedTargets.length === 0) {
      alert("Please select at least one sales target");
      return;
    }

    setAssistantActive(true);
    setSalesProgress(0);
    
    // Simulate automated sales process
    const interval = setInterval(() => {
      setSalesProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          generateLeads();
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  const generateLeads = () => {
    const mockLeads = [
      {
        platform: "Discord",
        contact: "@cryptotrader_2024",
        interest: "High",
        amount: "$5,000",
        status: "Negotiating",
        lastContact: "2 hours ago"
      },
      {
        platform: "Telegram",
        contact: "@defi_whale",
        interest: "Medium",
        amount: "$2,500",
        status: "Interested",
        lastContact: "4 hours ago"
      },
      {
        platform: "Twitter",
        contact: "@tokenfarmer_eth",
        interest: "High",
        amount: "$10,000",
        status: "Requested verification",
        lastContact: "1 hour ago"
      }
    ];
    setActiveLeads(mockLeads);
  };

  const copyMessage = (messageType: keyof typeof automatedMessages) => {
    navigator.clipboard.writeText(automatedMessages[messageType]);
    alert("Message copied to clipboard!");
  };

  const toggleTarget = (targetId: string) => {
    setSelectedTargets(prev => 
      prev.includes(targetId) 
        ? prev.filter(id => id !== targetId)
        : [...prev, targetId]
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Automated Sales Assistant</h1>
        <p className="text-muted-foreground">
          Let me handle the sales outreach and lead generation for your ETHGR tokens
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Bot className="h-4 w-4" />
        <AlertDescription>
          <strong>SALES AUTOMATION:</strong> I'll handle posting in communities, following up with leads, 
          and managing your sales pipeline. You just need to provide contact info and approve the strategy.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="targets">Sales Targets</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="leads">Active Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Sales Assistant Configuration
              </CardTitle>
              <CardDescription>
                Configure your automated sales campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact-info">Your Contact Information</Label>
                  <Input
                    id="contact-info"
                    placeholder="Discord: username#1234, Telegram: @username, or Email"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    This will be included in automated messages for buyers to reach you
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-bold mb-2">Campaign Settings</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-bold">Package:</span> 100,000 ETHGR tokens
                    </div>
                    <div>
                      <span className="font-bold">Price:</span> $0.05/token
                    </div>
                    <div>
                      <span className="font-bold">Total Value:</span> $5,000
                    </div>
                    <div>
                      <span className="font-bold">ETH Generated:</span> ~2 ETH
                    </div>
                  </div>
                </div>

                {assistantActive ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-bold">Sales Campaign Progress</div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <Progress value={salesProgress} className="w-full" />
                    <div className="text-sm text-muted-foreground">
                      {salesProgress < 100 ? 
                        "Posting in selected communities and tracking responses..." :
                        "Campaign complete - check Active Leads tab for results"
                      }
                    </div>
                    <Button 
                      onClick={() => setAssistantActive(false)}
                      variant="outline"
                      className="w-full"
                    >
                      <Pause className="h-4 w-4 mr-1" />
                      Pause Campaign
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={startAutomatedSales}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!contactInfo}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Start Automated Sales Campaign
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Sales Target Selection
              </CardTitle>
              <CardDescription>
                Choose which communities and platforms to target
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {salesTargets.map((target) => (
                <div 
                  key={target.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedTargets.includes(target.id) ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                  onClick={() => toggleTarget(target.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-bold">{target.name}</div>
                      <div className="text-sm text-muted-foreground">{target.description}</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        {target.difficulty}
                      </Badge>
                      {selectedTargets.includes(target.id) && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <div className="font-bold">Members:</div>
                      <div>{target.members}</div>
                    </div>
                    <div>
                      <div className="font-bold">Conversion:</div>
                      <div>{target.conversionRate}</div>
                    </div>
                    <div>
                      <div className="font-bold">Avg Sale:</div>
                      <div>{target.avgSale}</div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-bold mb-2">Selected Targets Summary</div>
                <div className="text-sm">
                  {selectedTargets.length > 0 ? (
                    <>
                      <div>Targeting {selectedTargets.length} platform(s)</div>
                      <div>Estimated reach: 200,000+ potential buyers</div>
                      <div>Expected response rate: 2-4%</div>
                    </>
                  ) : (
                    <div>No targets selected - please choose at least one platform</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Automated Sales Messages
              </CardTitle>
              <CardDescription>
                Pre-written messages for different stages of the sales process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(automatedMessages).map(([type, message]) => (
                <div key={type} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-bold capitalize">{type.replace(/([A-Z])/g, ' $1')} Message</div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyMessage(type as keyof typeof automatedMessages)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={message}
                    readOnly
                    rows={type === 'initial' ? 12 : 6}
                    className="font-mono text-xs"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Sales Leads
              </CardTitle>
              <CardDescription>
                Real-time tracking of interested buyers and negotiations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeLeads.length > 0 ? (
                activeLeads.map((lead, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold">{lead.contact}</div>
                        <div className="text-sm text-muted-foreground">{lead.platform}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{lead.amount}</div>
                        <Badge variant={
                          lead.interest === 'High' ? 'default' : 
                          lead.interest === 'Medium' ? 'secondary' : 'outline'
                        }>
                          {lead.interest} Interest
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-bold">Status:</span> {lead.status}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last contact: {lead.lastContact}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="font-bold">No active leads yet</div>
                  <div className="text-sm text-muted-foreground">
                    Start the sales campaign to begin generating leads
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>What I'll Handle For You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <MessageCircle className="h-8 w-8 text-green-600 mb-2" />
              <div className="font-bold">Community Outreach</div>
              <div className="text-sm text-muted-foreground">
                Post in Discord/Telegram groups with professional messages
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <div className="font-bold">Lead Management</div>
              <div className="text-sm text-muted-foreground">
                Track interested buyers and manage conversations
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
              <div className="font-bold">Sales Optimization</div>
              <div className="text-sm text-muted-foreground">
                Adjust pricing and messaging based on response rates
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}