import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Clock,
  CheckCircle,
  ExternalLink,
  FileText,
  Send,
  Target,
  Calendar,
  DollarSign,
  Shield,
  Download
} from "lucide-react";

export default function FreeTokenSubmission() {
  const [submissionStep, setSubmissionStep] = useState(1);
  const [submissionData, setSubmissionData] = useState<any>({});

  const ethgrSubmissionData = {
    contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    name: "ETHGR Recovery Token",
    symbol: "ETHGR",
    decimals: 18,
    totalSupply: "1,990,000",
    description: "Recovery token for ETHG honeypot victims - foundation operations for blockchain victim assistance",
    website: window.location.origin,
    documentation: "Victim recovery and foundation operations token",
    socialMedia: {
      twitter: "Foundation updates and victim assistance",
      telegram: "Community support for honeypot victims",
      discord: "Technical recovery assistance"
    }
  };

  const freeSubmissionPlatforms = [
    {
      platform: "CoinGecko",
      url: "https://www.coingecko.com/en/coins/new",
      requirements: ["Token contract", "Project description", "Logo image", "Social links"],
      processingTime: "7-14 days",
      cost: "FREE",
      priority: "HIGH",
      benefits: ["Price tracking", "Market data", "Legitimacy boost"]
    },
    {
      platform: "DEX Screener",
      url: "https://dexscreener.com/ethereum/new",
      requirements: ["Contract address", "Pool creation", "Trading activity"],
      processingTime: "3-7 days", 
      cost: "FREE",
      priority: "HIGH",
      benefits: ["Trading charts", "Pool analytics", "Investor discovery"]
    },
    {
      platform: "Etherscan Token Tracker",
      url: "https://etherscan.io/token-search",
      requirements: ["Contract verification", "Token metadata"],
      processingTime: "1-3 days",
      cost: "FREE",
      priority: "MEDIUM",
      benefits: ["Official token page", "Transaction tracking", "Contract transparency"]
    },
    {
      platform: "CoinMarketCap",
      url: "https://coinmarketcap.com/request/",
      requirements: ["Active trading", "Community engagement", "Documentation"],
      processingTime: "14-30 days",
      cost: "FREE",
      priority: "MEDIUM", 
      benefits: ["Major exposure", "Institutional visibility", "Price feeds"]
    }
  ];

  const submissionTimeline = {
    immediate: [
      "Prepare token information and documentation",
      "Create professional logo and branding assets",
      "Set up foundation website and social media"
    ],
    week1: [
      "Submit to DEX Screener and Etherscan",
      "Create initial liquidity pools for trading data",
      "Begin CoinGecko application process"
    ],
    week2: [
      "Follow up on DEX Screener submission",
      "Submit to CoinMarketCap",
      "Engage community for social proof"
    ],
    month1: [
      "All major platforms should list ETHGR",
      "Foundation operations fully visible",
      "Victim outreach with legitimate token status"
    ]
  };

  const submissionTemplates = {
    coingecko: {
      title: "ETHGR - Honeypot Victim Recovery Token",
      description: "ETHGR is a recovery token designed to assist victims of the ETHG honeypot scam (0x0890f93a1fd344b3437ec10c1c14d1a581142c5f). The token supports a victim assistance foundation that provides recovery services, educational resources, and financial support to blockchain scam victims. The foundation operates on a revenue-sharing model where 80% of proceeds go directly to victim assistance and 20% funds operations.",
      category: "Utility Token",
      useCase: "Victim Recovery & Education"
    },
    dexscreener: {
      title: "ETHGR Recovery Foundation",
      description: "Supporting honeypot victims through blockchain recovery services",
      tags: ["Recovery", "Foundation", "Victim Support", "Education"]
    }
  };

  const preparationChecklist = [
    {
      item: "Contract Address Verification",
      description: "Confirm ETHGR contract is deployed and verified",
      status: "COMPLETE",
      action: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247 verified"
    },
    {
      item: "Token Logo Creation", 
      description: "Professional 256x256 PNG logo for platforms",
      status: "NEEDED",
      action: "Create ETHGR foundation logo"
    },
    {
      item: "Foundation Website",
      description: "Professional website explaining token purpose",
      status: "READY",
      action: "Use current Replit platform as foundation site"
    },
    {
      item: "Social Media Setup",
      description: "Twitter, Telegram, Discord for community",
      status: "NEEDED", 
      action: "Create foundation social accounts"
    },
    {
      item: "Documentation Package",
      description: "Whitepaper, tokenomics, foundation mission",
      status: "READY",
      action: "Use existing platform documentation"
    },
    {
      item: "Initial Trading Activity",
      description: "Small liquidity pool for DEX recognition",
      status: "PENDING",
      action: "Deploy 100 ETHGR test pool"
    }
  ];

  const foundationStoryTemplate = `
# ETHGR Recovery Foundation

## Mission Statement
The ETHGR Recovery Foundation was created to assist victims of the ETHG honeypot contract (0x0890f93a1fd344b3437ec10c1c14d1a581142c5f) and other blockchain scams. Our founder, having personally lost $15,000 to this scam, developed technical expertise to recover trapped funds and is now dedicated to helping other victims.

## How ETHGR Works
- **Victim Recovery Services**: Direct assistance with honeypot and scam recovery
- **Educational Resources**: Teaching victims how to identify and avoid future scams  
- **Community Support**: Peer support network for financial recovery
- **Intelligence Network**: Proactive honeypot identification and warnings

## Revenue Sharing Model
- **80% to Victims**: Direct financial assistance and recovery services
- **20% to Operations**: Platform maintenance, development, and scaling

## Token Utility
- **Service Access**: ETHGR tokens required for premium recovery services
- **Governance Rights**: Token holders vote on foundation priorities
- **Reward System**: Investigators earn ETHGR for honeypot discoveries
- **Foundation Membership**: Lifetime access to protection and support services

## Legitimacy & Transparency
- **Verified Contract**: Fully transparent smart contract with no hidden functions
- **Proven Track Record**: Successful recovery of $708,015 for founder
- **Open Source**: All recovery methods and tools publicly available
- **Real Impact**: Helping 247 identified ETHG victims worth $1.24M trapped value
`;

  const downloadSubmissionPackage = () => {
    const package_data = {
      token_information: ethgrSubmissionData,
      platform_submissions: freeSubmissionPlatforms,
      foundation_story: foundationStoryTemplate,
      preparation_checklist: preparationChecklist,
      submission_templates: submissionTemplates,
      timeline: submissionTimeline
    };
    
    const blob = new Blob([JSON.stringify(package_data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ethgr-free-submission-package-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">FREE TOKEN SUBMISSION SYSTEM</h1>
          <p className="text-xl text-green-300">No Cost Registration + Longer Processing Timeline</p>
        </div>

        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Clock className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-lg">
            <strong>FREE SUBMISSION STRATEGY:</strong> Submit ETHGR token information to all major platforms at no cost. Processing takes 1-4 weeks but creates legitimate foundation presence for victim outreach.
          </AlertDescription>
        </Alert>

        {/* ETHGR Submission Data */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              ETHGR Token Submission Package
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h3 className="text-blue-400 font-bold mb-3">Token Technical Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Contract:</span>
                      <code className="text-blue-400 text-xs">{ethgrSubmissionData.contract}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Name:</span>
                      <span className="text-white">{ethgrSubmissionData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Symbol:</span>
                      <span className="text-white">{ethgrSubmissionData.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Supply:</span>
                      <span className="text-white">{ethgrSubmissionData.totalSupply}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <h3 className="text-green-400 font-bold mb-3">Foundation Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-300">
                      <strong>Mission:</strong> Honeypot victim recovery and assistance
                    </div>
                    <div className="text-gray-300">
                      <strong>Website:</strong> Current Replit platform
                    </div>
                    <div className="text-gray-300">
                      <strong>Category:</strong> Utility/Recovery Token
                    </div>
                    <div className="text-gray-300">
                      <strong>Target:</strong> 247 ETHG victims, $1.24M trapped value
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-900/50 rounded">
                <h3 className="text-white font-bold mb-2">Foundation Description</h3>
                <p className="text-gray-300 text-sm">{ethgrSubmissionData.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Free Submission Platforms */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Free Submission Platforms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {freeSubmissionPlatforms.map((platform, index) => (
                  <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-green-400 font-bold text-lg">{platform.platform}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={platform.priority === 'HIGH' ? 'destructive' : 'secondary'}>
                            {platform.priority}
                          </Badge>
                          <Badge variant="default">{platform.cost}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-300">Timeline: </span>
                          <span className="text-blue-400">{platform.processingTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-300">Cost: </span>
                          <span className="text-green-400 font-bold">{platform.cost}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-gray-300 text-sm font-semibold">Requirements:</div>
                        {platform.requirements.map((req, rIndex) => (
                          <div key={rIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-gray-300 text-xs">{req}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-gray-300 text-sm font-semibold">Benefits:</div>
                        {platform.benefits.map((benefit, bIndex) => (
                          <div key={bIndex} className="text-blue-400 text-xs">• {benefit}</div>
                        ))}
                      </div>
                      
                      <Button
                        onClick={() => window.open(platform.url, '_blank')}
                        className="bg-green-600 hover:bg-green-700 w-full"
                        size="sm"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Submit to {platform.platform}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Timeline */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Calendar className="h-6 w-6 mr-2" />
              Free Submission Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(submissionTimeline).map(([timeframe, tasks], index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="space-y-3">
                    <h3 className="text-purple-400 font-bold text-lg capitalize">{timeframe.replace(/([0-9])/g, ' $1')}</h3>
                    <div className="space-y-2">
                      {tasks.map((task, tIndex) => (
                        <div key={tIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-gray-300 text-sm">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Alert className="border-purple-500 bg-purple-500/20">
                <Calendar className="h-4 w-4" />
                <AlertDescription className="text-purple-200">
                  <strong>TIMELINE ADVANTAGE:</strong> Free submissions take longer but create legitimate token presence across all major platforms, building credibility for foundation operations.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Preparation Checklist */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Submission Preparation Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {preparationChecklist.map((item, index) => (
                <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-yellow-400 font-bold">{item.item}</h3>
                    <Badge variant={item.status === 'COMPLETE' ? 'default' : item.status === 'READY' ? 'secondary' : 'destructive'}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                  <div className="p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                    <span className="text-blue-400 text-sm font-semibold">Action: </span>
                    <span className="text-gray-300 text-sm">{item.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Foundation Story Template */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              Foundation Story for Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={foundationStoryTemplate}
                readOnly
                className="bg-gray-900 text-gray-300 font-mono text-sm h-64"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h3 className="text-green-400 font-bold mb-2">CoinGecko Template</h3>
                  <div className="text-sm">
                    <div className="text-gray-300"><strong>Title:</strong> {submissionTemplates.coingecko.title}</div>
                    <div className="text-gray-300 mt-2"><strong>Category:</strong> {submissionTemplates.coingecko.category}</div>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h3 className="text-blue-400 font-bold mb-2">DEX Screener Template</h3>
                  <div className="text-sm">
                    <div className="text-gray-300"><strong>Title:</strong> {submissionTemplates.dexscreener.title}</div>
                    <div className="text-gray-300 mt-2"><strong>Tags:</strong> {submissionTemplates.dexscreener.tags.join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Center */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Send className="h-6 w-6 mr-2" />
              Free Submission Action Center
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-500/20">
                <DollarSign className="h-4 w-4" />
                <AlertDescription className="text-green-200">
                  <strong>FREE STRATEGY READY:</strong> All submission templates and documentation prepared. Begin free submissions to establish legitimate ETHGR token presence for foundation operations.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={downloadSubmissionPackage}
                  className="bg-green-600 hover:bg-green-700 flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Complete Package
                </Button>
                
                <Button
                  onClick={() => window.open('https://www.coingecko.com/en/coins/new', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Start CoinGecko Submission
                </Button>
                
                <Button
                  onClick={() => window.open('https://dexscreener.com/ethereum/new', '_blank')}
                  className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Start DEX Screener Submission
                </Button>
              </div>

              <div className="p-4 bg-gray-900/50 rounded">
                <h3 className="text-white font-bold mb-2">Expected Timeline Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-blue-400 font-bold">1-3 Days</div>
                    <div className="text-gray-400">Etherscan Recognition</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold">3-7 Days</div>
                    <div className="text-gray-400">DEX Screener Listing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold">7-14 Days</div>
                    <div className="text-gray-400">CoinGecko Approval</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-bold">14-30 Days</div>
                    <div className="text-gray-400">Full Platform Coverage</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}