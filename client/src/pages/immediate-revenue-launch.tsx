import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Rocket,
  DollarSign,
  Target,
  Clock,
  Users,
  Shield,
  BarChart3,
  FileText,
  ExternalLink,
  Copy,
  CheckCircle,
  TrendingUp
} from "lucide-react";

export default function ImmediateRevenueLaunch() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const serviceOfferings = [
    {
      service: "DeFi Portfolio Audit",
      price: "$2,500 - $5,000",
      duration: "3-5 days",
      deliverable: "Comprehensive security and performance analysis",
      targetClients: "Individual investors, family offices",
      description: "Complete analysis of DeFi positions, risk assessment, and optimization recommendations"
    },
    {
      service: "Protocol Security Analysis",
      price: "$10,000 - $25,000", 
      duration: "1-2 weeks",
      deliverable: "Technical security report with recommendations",
      targetClients: "DeFi protocols, token projects",
      description: "Deep dive analysis of smart contracts, tokenomics, and protocol security"
    },
    {
      service: "Investment Due Diligence",
      price: "$5,000 - $15,000",
      duration: "1 week",
      deliverable: "Investment risk assessment report",
      targetClients: "VC funds, investment firms",
      description: "Comprehensive analysis of DeFi projects for investment decisions"
    },
    {
      service: "Incident Investigation",
      price: "$200 - $500/hour",
      duration: "Variable",
      deliverable: "Forensic analysis and recovery recommendations",
      targetClients: "Legal firms, affected users",
      description: "Blockchain forensics for hack recovery and legal proceedings"
    }
  ];

  const marketingTemplates = {
    linkedIn: `🔍 Professional DeFi Analytics & Security Consulting Now Available

With 151 LP tokens analyzed across Ethereum, BSC, and Polygon, I offer comprehensive blockchain forensics and security analysis services.

Services:
• DeFi Portfolio Security Audits ($2.5K-$5K)
• Protocol Security Analysis ($10K-$25K)
• Investment Due Diligence ($5K-$15K)
• Blockchain Forensics & Recovery ($200-$500/hr)

Technical capabilities include multi-chain analysis, smart contract verification, and real-time risk assessment.

Contact for professional DeFi consulting services.

#DeFi #Blockchain #Security #Analytics #Consulting`,

    twitter: `🚀 Launching professional DeFi consulting services

✅ 151 LP tokens analyzed
✅ Multi-chain security expertise  
✅ Real-time risk assessment
✅ Blockchain forensics capabilities

Services: Portfolio audits, protocol analysis, due diligence, incident investigation

DM for consulting inquiries

#DeFi #Blockchain #Security`,

    email: `Subject: Professional DeFi Analytics & Security Consulting Services

Dear [Client Name],

I'm reaching out to introduce comprehensive DeFi analytics and security consulting services, backed by analysis of 151 LP tokens across multiple blockchain networks.

Service Offerings:

1. DeFi Portfolio Security Audits ($2,500-$5,000)
   - Complete risk assessment of DeFi positions
   - Security vulnerability identification
   - Performance optimization recommendations

2. Protocol Security Analysis ($10,000-$25,000)
   - Smart contract security review
   - Tokenomics analysis
   - Technical due diligence

3. Investment Due Diligence ($5,000-$15,000)
   - Comprehensive project analysis
   - Risk assessment for investment decisions
   - Market positioning evaluation

4. Blockchain Forensics & Recovery ($200-$500/hour)
   - Transaction analysis and fund tracing
   - Security incident investigation
   - Legal support and expert testimony

Technical Capabilities:
- Multi-chain analysis (Ethereum, BSC, Polygon)
- Real-time security monitoring
- Advanced forensics tools
- Professional reporting

I would welcome the opportunity to discuss how these services can benefit your organization.

Best regards,
[Your Name]
Professional DeFi Analyst & Security Consultant`
  };

  const immediateActions = [
    {
      action: "Create Professional LinkedIn Profile",
      timeframe: "1 hour",
      description: "Update LinkedIn with DeFi consulting services and capabilities",
      priority: "High"
    },
    {
      action: "Develop Service Packages",
      timeframe: "2 hours", 
      description: "Create detailed service descriptions, pricing, and deliverables",
      priority: "High"
    },
    {
      action: "Launch Marketing Campaign",
      timeframe: "1 day",
      description: "Post on LinkedIn, Twitter, and relevant DeFi communities",
      priority: "High"
    },
    {
      action: "Direct Outreach",
      timeframe: "1 week",
      description: "Contact 50 potential clients via email and LinkedIn",
      priority: "Medium"
    },
    {
      action: "Create Portfolio Website",
      timeframe: "3 days",
      description: "Professional website showcasing capabilities and case studies",
      priority: "Medium"
    }
  ];

  const targetClients = [
    {
      category: "Individual Investors",
      prospects: "DeFi users with $100K+ portfolios",
      approach: "Portfolio security audits and optimization",
      channels: "Twitter, Discord, DeFi communities"
    },
    {
      category: "Investment Firms",
      prospects: "VCs and funds investing in DeFi",
      approach: "Due diligence and risk assessment services",
      channels: "LinkedIn, direct email, industry events"
    },
    {
      category: "DeFi Protocols",
      prospects: "New and existing protocols needing security analysis",
      approach: "Technical security audits and consulting",
      channels: "GitHub, Discord, direct outreach"
    },
    {
      category: "Legal Firms",
      prospects: "Firms handling DeFi-related cases",
      approach: "Expert witness and forensics services", 
      channels: "Legal directories, Bar associations"
    }
  ];

  const week1Goals = [
    { goal: "Complete 3 portfolio audits", revenue: "$7,500-$15,000", clients: "Individual investors" },
    { goal: "Secure 1 protocol analysis contract", revenue: "$10,000-$25,000", clients: "DeFi protocol" },
    { goal: "Land 2 due diligence projects", revenue: "$10,000-$30,000", clients: "Investment firms" },
    { goal: "Provide 20 hours forensics consulting", revenue: "$4,000-$10,000", clients: "Legal/recovery cases" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Immediate Revenue Launch Strategy
          </h1>
          <p className="text-2xl text-blue-300">
            Start Generating $10K+ Monthly Within 2 Weeks
          </p>
        </div>

        {/* Launch Status */}
        <Alert className="border-green-500 bg-green-500/10">
          <Rocket className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Ready to Launch:</strong> Your platform capabilities are sufficient to begin professional consulting services immediately. Follow this step-by-step plan to generate revenue within 2 weeks.
          </AlertDescription>
        </Alert>

        {/* Service Offerings */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Professional Service Offerings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceOfferings.map((service, index) => (
                <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-blue-400 font-bold text-lg">{service.service}</h3>
                    <Badge className="bg-green-600 text-white text-lg px-3 py-1">{service.price}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <span className="text-gray-400">Duration:</span>
                      <p className="text-white">{service.duration}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Target Clients:</span>
                      <p className="text-orange-400">{service.targetClients}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Deliverable:</span>
                      <p className="text-yellow-400">{service.deliverable}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Marketing Templates */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Ready-to-Use Marketing Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(marketingTemplates).map(([platform, content], index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-purple-400 font-bold text-lg capitalize">{platform} Post</h3>
                    <Button 
                      onClick={() => copyToClipboard(content, platform)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {copied === platform ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      Copy Template
                    </Button>
                  </div>
                  
                  <Textarea 
                    value={content}
                    readOnly
                    className="bg-gray-700 text-white border-gray-600 min-h-[150px]"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Immediate Actions */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Launch Actions - Start Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {immediateActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="flex-1">
                    <h3 className="text-orange-400 font-bold text-lg">{action.action}</h3>
                    <p className="text-gray-300">{action.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${action.priority === 'High' ? 'bg-red-600' : 'bg-yellow-600'} text-white mb-2`}>
                      {action.priority}
                    </Badge>
                    <p className="text-white font-medium">{action.timeframe}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Target Clients */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Target Client Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {targetClients.map((client, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h3 className="text-yellow-400 font-bold text-lg mb-2">{client.category}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Prospects:</span>
                      <p className="text-white">{client.prospects}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Approach:</span>
                      <p className="text-green-400">{client.approach}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Channels:</span>
                      <p className="text-blue-400">{client.channels}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Week 1 Revenue Goals */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Week 1 Revenue Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {week1Goals.map((goal, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div>
                    <h3 className="text-green-400 font-bold">{goal.goal}</h3>
                    <p className="text-gray-300 text-sm">{goal.clients}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-lg">{goal.revenue}</p>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-gray-600 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-xl">Total Week 1 Target:</h3>
                  <p className="text-green-400 font-bold text-2xl">$31,500 - $80,000</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 py-8">
            <Users className="h-6 w-6 mr-2" />
            Update LinkedIn
          </Button>
          
          <Button className="bg-purple-600 hover:bg-purple-700 py-8">
            <FileText className="h-6 w-6 mr-2" />
            Create Services Page
          </Button>
          
          <Button className="bg-orange-600 hover:bg-orange-700 py-8">
            <Target className="h-6 w-6 mr-2" />
            Start Outreach
          </Button>
          
          <Button className="bg-green-600 hover:bg-green-700 py-8">
            <TrendingUp className="h-6 w-6 mr-2" />
            Track Revenue
          </Button>
        </div>

        {/* Success Alert */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <DollarSign className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Launch Ready:</strong> Your platform provides all necessary capabilities for immediate consulting services. Start with LinkedIn updates and direct outreach today. Target: First client within 48 hours, $10K+ revenue within 2 weeks.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}