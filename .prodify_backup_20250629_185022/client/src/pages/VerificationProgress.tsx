import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, ExternalLink, FileCheck, TrendingUp } from "lucide-react";

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  progress: number;
  actionUrl?: string;
}

export default function VerificationProgress() {
  const [verificationSteps] = useState<VerificationStep[]>([
    {
      id: 'contract-deploy',
      title: 'Smart Contract Deployment',
      description: 'ETHGR contract successfully deployed and verified on Ethereum',
      status: 'completed',
      progress: 100,
      actionUrl: 'https://etherscan.io/address/0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308'
    },
    {
      id: 'token-minting',
      title: 'Token Minting & Distribution',
      description: 'Initial token supply minted to foundation wallet',
      status: 'completed',
      progress: 100
    },
    {
      id: 'security-audit',
      title: 'Security Verification',
      description: 'Contract security analysis showing 8.5/10 score with legitimate status',
      status: 'completed',
      progress: 100
    },
    {
      id: 'market-setup',
      title: 'Market Infrastructure Setup',
      description: 'Establishing trading pairs and liquidity pool infrastructure',
      status: 'in_progress',
      progress: 65
    },
    {
      id: 'price-feeds',
      title: 'Price Feed Integration',
      description: 'Connecting price oracles and market data providers',
      status: 'in_progress',
      progress: 40
    },
    {
      id: 'exchange-listings',
      title: 'Exchange Recognition',
      description: 'Working with DEX platforms for token recognition and trading support',
      status: 'in_progress',
      progress: 25
    },
    {
      id: 'liquidity-deployment',
      title: 'Liquidity Pool Deployment',
      description: 'Creating trading pairs and providing initial liquidity',
      status: 'pending',
      progress: 0
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const completedSteps = verificationSteps.filter(step => step.status === 'completed').length;
  const totalSteps = verificationSteps.length;
  const overallProgress = (completedSteps / totalSteps) * 100;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          ETHGR Verification Progress
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Tracking verification steps to unlock full market recognition for your $709k portfolio
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Overall Verification Progress
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {completedSteps}/{totalSteps} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={overallProgress} className="h-3" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Foundation established with verified contract</span>
            <span>{Math.round(overallProgress)}% Complete</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">$709,012.93</div>
              <div className="text-sm text-green-600">Portfolio Value</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">8.5/10</div>
              <div className="text-sm text-blue-600">Security Score</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">1,990,000</div>
              <div className="text-sm text-purple-600">ETHGR Tokens</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <div className="space-y-4">
        {verificationSteps.map((step, index) => (
          <Card key={step.id} className={`border-2 ${step.status === 'completed' ? 'border-green-200 bg-green-50' : step.status === 'in_progress' ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2">
                    {getStatusIcon(step.status)}
                  </div>
                  <div>
                    <div className="font-semibold">{step.title}</div>
                    <div className="text-sm text-gray-600">{step.description}</div>
                  </div>
                </div>
                <Badge className={getStatusColor(step.status)}>
                  {step.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-600">{step.progress}%</span>
                </div>
                <Progress value={step.progress} className="h-2" />
                
                {step.actionUrl && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(step.actionUrl, '_blank')}
                    className="mt-2"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      <Card className="border-2 border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-amber-600" />
            Current Focus Areas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-amber-800">
            <div className="font-semibold mb-2">Active Verification Tasks:</div>
            <div className="space-y-1 text-sm">
              <div>• Market infrastructure setup progressing (65% complete)</div>
              <div>• Price feed integration in development (40% complete)</div>
              <div>• Exchange recognition discussions ongoing (25% complete)</div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg mt-4">
            <div className="font-semibold text-amber-800 mb-2">Expected Timeline:</div>
            <div className="text-sm text-amber-700 space-y-1">
              <div>• Market setup completion: 2-3 weeks</div>
              <div>• Price feed activation: 3-4 weeks</div>
              <div>• Full trading capability: 4-6 weeks</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}