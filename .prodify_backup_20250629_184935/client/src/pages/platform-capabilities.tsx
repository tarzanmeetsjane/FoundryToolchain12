import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database,
  Shield,
  Search,
  Users,
  TrendingUp,
  FileText,
  Gavel,
  Target,
  BarChart3,
  ExternalLink,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function PlatformCapabilities() {
  const [selectedCategory, setSelectedCategory] = useState("analytics");

  const coreCapabilities = [
    {
      category: "Blockchain Analytics",
      icon: <Database className="h-8 w-8 text-blue-500" />,
      features: [
        "151 LP tokens tracked across Ethereum, BSC, Polygon",
        "Real-time liquidity pool analysis",
        "Multi-chain transaction monitoring",
        "Token discovery and classification",
        "Portfolio value tracking and analysis"
      ],
      applications: [
        "Investment research and due diligence",
        "Portfolio optimization strategies",
        "Market trend identification",
        "Risk assessment for DeFi positions"
      ]
    },
    {
      category: "Security Analysis",
      icon: <Shield className="h-8 w-8 text-green-500" />,
      features: [
        "Honeypot contract detection",
        "Smart contract verification",
        "Wallet security assessment",
        "Transaction risk analysis",
        "Approval monitoring and management"
      ],
      applications: [
        "Protect users from malicious contracts",
        "Verify token legitimacy before investment",
        "Audit existing DeFi positions",
        "Educational security awareness"
      ]
    },
    {
      category: "Community Protection",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      features: [
        "Legal recovery framework development",
        "Community reporting systems",
        "Educational resources and guides",
        "Professional consulting services",
        "Documentation and evidence collection"
      ],
      applications: [
        "Assist victims of DeFi scams",
        "Build legal cases against bad actors",
        "Create awareness campaigns",
        "Establish industry best practices"
      ]
    },
    {
      category: "Forensic Tools",
      icon: <Search className="h-8 w-8 text-orange-500" />,
      features: [
        "Transaction path analysis",
        "Wallet connection mapping",
        "Fund flow tracking",
        "Address clustering algorithms",
        "Behavioral pattern recognition"
      ],
      applications: [
        "Investigate suspicious activities",
        "Trace stolen or lost funds",
        "Build comprehensive case files",
        "Support law enforcement efforts"
      ]
    }
  ];

  const businessApplications = [
    {
      title: "DeFi Research Consultancy",
      description: "Professional analysis services for institutions",
      revenue: "$5,000-25,000 per project",
      clients: "Investment funds, legal firms, exchanges",
      requirements: "Professional presentation, case studies"
    },
    {
      title: "Security Audit Services",
      description: "Contract and protocol security assessments",
      revenue: "$10,000-50,000 per audit",
      clients: "DeFi protocols, token projects, DAOs",
      requirements: "Technical expertise, certification"
    },
    {
      title: "Educational Platform",
      description: "DeFi safety courses and certification programs",
      revenue: "$100-500 per student",
      clients: "Individual traders, corporate training",
      requirements: "Course development, marketing"
    },
    {
      title: "Legal Support Services",
      description: "Expert witness and technical analysis for legal cases",
      revenue: "$200-500 per hour",
      clients: "Law firms, regulatory bodies, courts",
      requirements: "Legal credentials, expert status"
    },
    {
      title: "Data Intelligence Platform",
      description: "Subscription-based analytics and alerts",
      revenue: "$50-500 per month per user",
      clients: "Traders, funds, researchers",
      requirements: "API development, user interface"
    }
  ];

  const implementationPathways = [
    {
      pathway: "Immediate Revenue",
      timeframe: "1-4 weeks",
      actions: [
        "Offer portfolio analysis services",
        "Create security audit reports",
        "Provide consultation for recovery cases",
        "Monetize existing analytical capabilities"
      ],
      investment: "Marketing and presentation materials",
      returns: "$5,000-15,000 monthly"
    },
    {
      pathway: "Medium-term Growth",
      timeframe: "1-6 months",
      actions: [
        "Develop educational content and courses",
        "Build professional service offerings",
        "Establish industry partnerships",
        "Create subscription analytics platform"
      ],
      investment: "Content creation, platform development",
      returns: "$15,000-50,000 monthly"
    },
    {
      pathway: "Long-term Scale",
      timeframe: "6-24 months",
      actions: [
        "Launch comprehensive forensics platform",
        "Establish legal recovery foundation",
        "Build enterprise-grade analytics tools",
        "Create industry certification programs"
      ],
      investment: "Team expansion, technology development",
      returns: "$100,000+ monthly"
    }
  ];

  const currentAssets = {
    technical: [
      "Multi-chain blockchain integration",
      "Real-time data processing system",
      "Advanced analytics dashboard",
      "Security analysis algorithms",
      "Professional user interface"
    ],
    data: [
      "151 tracked LP tokens",
      "Multi-blockchain coverage",
      "Historical transaction data",
      "Security assessment database",
      "Market intelligence feeds"
    ],
    expertise: [
      "DeFi protocol knowledge",
      "Security analysis methodology",
      "Blockchain forensics techniques",
      "Legal recovery frameworks",
      "Community protection strategies"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Platform Capabilities & Applications
          </h1>
          <p className="text-2xl text-blue-300">
            Comprehensive DeFi Analytics for Professional Services
          </p>
        </div>

        {/* Platform Overview */}
        <Alert className="border-blue-500 bg-blue-500/10">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          <AlertDescription className="text-blue-200 text-center text-xl">
            <strong>Platform Status:</strong> Operational multi-chain analytics system with 151 LP tokens tracked, professional security tools, and comprehensive forensics capabilities ready for commercial deployment.
          </AlertDescription>
        </Alert>

        {/* Core Capabilities */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Core Platform Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {coreCapabilities.map((capability, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center gap-3 mb-4">
                    {capability.icon}
                    <h3 className="text-green-400 font-bold text-xl">{capability.category}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Technical Features:</h4>
                      <ul className="space-y-1">
                        {capability.features.map((feature, idx) => (
                          <li key={idx} className="text-gray-300 text-sm">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Applications:</h4>
                      <ul className="space-y-1">
                        {capability.applications.map((app, idx) => (
                          <li key={idx} className="text-gray-300 text-sm">• {app}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business Applications */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Commercial Applications & Revenue Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessApplications.map((business, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h3 className="text-purple-400 font-bold text-lg mb-2">{business.title}</h3>
                  <p className="text-white text-sm mb-3">{business.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Revenue:</span>
                      <span className="text-green-400 font-bold ml-2">{business.revenue}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Target Clients:</span>
                      <span className="text-blue-400 ml-2">{business.clients}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Requirements:</span>
                      <span className="text-orange-400 ml-2">{business.requirements}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Pathways */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Implementation & Growth Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {implementationPathways.map((pathway, index) => (
                <div key={index} className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-orange-400 font-bold text-lg">{pathway.pathway}</h3>
                    <Badge className="bg-orange-600 text-white">{pathway.timeframe}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Key Actions:</h4>
                      <ul className="space-y-1">
                        {pathway.actions.map((action, idx) => (
                          <li key={idx} className="text-gray-300 text-sm">• {action}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Investment:</h4>
                      <p className="text-blue-400 text-sm">{pathway.investment}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Projected Returns:</h4>
                      <p className="text-green-400 font-bold">{pathway.returns}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Assets */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Current Platform Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h3 className="text-yellow-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Technical Infrastructure
                </h3>
                <ul className="space-y-1">
                  {currentAssets.technical.map((asset, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {asset}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h3 className="text-yellow-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Data & Intelligence
                </h3>
                <ul className="space-y-1">
                  {currentAssets.data.map((asset, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {asset}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h3 className="text-yellow-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Domain Expertise
                </h3>
                <ul className="space-y-1">
                  {currentAssets.expertise.map((asset, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {asset}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Recommendations */}
        <Alert className="border-green-500 bg-green-500/10">
          <Target className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Recommended Next Steps:</strong> Your platform has significant commercial potential. Focus on immediate revenue through consulting services while building long-term educational and forensics offerings. The combination of technical capabilities and domain expertise positions you well for professional DeFi services market.
          </AlertDescription>
        </Alert>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 py-8">
            <Database className="h-6 w-6 mr-2" />
            Analytics Dashboard
          </Button>
          
          <Button className="bg-green-600 hover:bg-green-700 py-8">
            <Shield className="h-6 w-6 mr-2" />
            Security Tools
          </Button>
          
          <Button className="bg-purple-600 hover:bg-purple-700 py-8">
            <Users className="h-6 w-6 mr-2" />
            Community Hub
          </Button>
          
          <Button className="bg-orange-600 hover:bg-orange-700 py-8">
            <FileText className="h-6 w-6 mr-2" />
            Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}