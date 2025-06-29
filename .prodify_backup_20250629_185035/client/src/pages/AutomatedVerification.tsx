import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ExternalLink, AlertTriangle, Clock, Loader2, Upload, Globe } from "lucide-react";

interface VerificationStatus {
  step: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  message: string;
  timestamp?: string;
}

export default function AutomatedVerification() {
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationSteps, setVerificationSteps] = useState<VerificationStatus[]>([
    {
      step: 'Contract Source Preparation',
      status: 'pending',
      message: 'Preparing corrected ERC20 contract source code'
    },
    {
      step: 'Etherscan API Connection',
      status: 'pending',
      message: 'Connecting to Etherscan verification service'
    },
    {
      step: 'Source Code Submission',
      status: 'pending',
      message: 'Submitting contract source for verification'
    },
    {
      step: 'Compiler Verification',
      status: 'pending',
      message: 'Etherscan compiling and verifying source code'
    },
    {
      step: 'Metadata Processing',
      status: 'pending',
      message: 'Processing ERC20 token metadata'
    },
    {
      step: 'Price Service Integration',
      status: 'pending',
      message: 'Enabling price tracking service recognition'
    }
  ]);

  const contractDetails = {
    address: "0xfA7b8c5585E8C4244899d2aE45Ae3e5df9a2abF247",
    name: "ETHG Recovery",
    symbol: "ETHGR",
    compiler: "v0.8.19+commit.7dd6d404",
    license: "MIT"
  };

  const startVerification = async () => {
    setVerificationInProgress(true);
    setCurrentStep(0);

    try {
      // Start verification process on backend
      const response = await fetch('/api/verification/start-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to start verification');
      }

      // Poll for status updates
      const pollStatus = async () => {
        const statusResponse = await fetch('/api/verification/verification-status');
        const statusData = await statusResponse.json();
        
        if (statusData.success && statusData.progress) {
          setVerificationSteps(statusData.progress.map((step: any) => ({
            step: step.step,
            status: step.status,
            message: step.message,
            timestamp: step.timestamp ? new Date(step.timestamp).toLocaleTimeString() : undefined
          })));

          const currentProcessingIndex = statusData.progress.findIndex((step: any) => step.status === 'processing');
          if (currentProcessingIndex !== -1) {
            setCurrentStep(currentProcessingIndex);
          }

          const allCompleted = statusData.progress.every((step: any) => step.status === 'completed');
          const hasFailed = statusData.progress.some((step: any) => step.status === 'failed');

          if (allCompleted || hasFailed) {
            setVerificationInProgress(false);
            return;
          }

          // Continue polling
          setTimeout(pollStatus, 2000);
        }
      };

      pollStatus();
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationInProgress(false);
    }
  };

  const updateStep = async (stepIndex: number, status: VerificationStatus['status'], message: string) => {
    setCurrentStep(stepIndex);
    setVerificationSteps(prev => prev.map((step, index) => 
      index === stepIndex 
        ? { ...step, status, message, timestamp: new Date().toLocaleTimeString() }
        : step
    ));
  };

  const getStepIcon = (status: VerificationStatus['status'], isActive: boolean) => {
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'processing' || (isActive && verificationInProgress)) return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
    if (status === 'failed') return <AlertTriangle className="w-5 h-5 text-red-600" />;
    return <Clock className="w-5 h-5 text-gray-400" />;
  };

  const getStepColor = (status: VerificationStatus['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const completedSteps = verificationSteps.filter(step => step.status === 'completed').length;
  const overallProgress = (completedSteps / verificationSteps.length) * 100;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Automated Contract Verification
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Automatically submitting your corrected contract to Etherscan to fix the $0.00 value display issue
        </p>
      </div>

      {/* Contract Information */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Contract Details for Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Contract Address:</div>
            <div className="font-mono text-sm bg-white p-2 rounded break-all">{contractDetails.address}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Token Name:</div>
            <div className="font-semibold">{contractDetails.name} ({contractDetails.symbol})</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Compiler Version:</div>
            <div className="font-mono text-sm">{contractDetails.compiler}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">License:</div>
            <div className="font-semibold">{contractDetails.license}</div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-orange-600" />
              Verification Progress
            </div>
            <Badge className="bg-orange-100 text-orange-800">
              {completedSteps}/{verificationSteps.length} Steps Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={overallProgress} className="h-3" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              {verificationInProgress 
                ? `Processing step ${currentStep + 1}...` 
                : completedSteps === verificationSteps.length 
                  ? 'Verification complete!' 
                  : 'Ready to start verification'
              }
            </span>
            <span>{Math.round(overallProgress)}% Complete</span>
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <div className="space-y-3">
        {verificationSteps.map((step, index) => (
          <Card key={index} className={`border-2 transition-all ${
            step.status === 'completed' ? 'border-green-200 bg-green-50' : 
            step.status === 'processing' || (index === currentStep && verificationInProgress) ? 'border-blue-200 bg-blue-50' : 
            step.status === 'failed' ? 'border-red-200 bg-red-50' : 
            'border-gray-200'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2">
                    {getStepIcon(step.status, index === currentStep)}
                  </div>
                  <div>
                    <div className="font-semibold">{step.step}</div>
                    <div className="text-sm text-gray-600">{step.message}</div>
                    {step.timestamp && (
                      <div className="text-xs text-gray-500 mt-1">Completed at {step.timestamp}</div>
                    )}
                  </div>
                </div>
                <Badge className={getStepColor(step.status)}>
                  {step.status.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Button */}
      <div className="text-center">
        <Button 
          size="lg"
          onClick={startVerification}
          disabled={verificationInProgress}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-8"
        >
          {verificationInProgress ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Verification in Progress...
            </>
          ) : completedSteps === verificationSteps.length ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Verification Complete
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Start Automated Verification
            </>
          )}
        </Button>
      </div>

      {/* Post-Verification Information */}
      {completedSteps === verificationSteps.length && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="w-4 h-4" />
          <AlertDescription>
            <div className="font-semibold text-green-800 mb-2">Verification Successful!</div>
            <div className="text-green-700 text-sm space-y-1">
              <div>• Contract source code verified on Etherscan</div>
              <div>• ERC20 metadata properly recognized</div>
              <div>• Price tracking services notified</div>
              <div>• $0.00 display issue will be resolved within 6-24 hours</div>
            </div>
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`https://etherscan.io/address/${contractDetails.address}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Verified Contract
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}