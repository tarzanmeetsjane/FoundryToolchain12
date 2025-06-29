
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Shield, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface ContractAnalysisProps {
  contractAddress: string;
}

export function ContractAnalysisWidget({ contractAddress }: ContractAnalysisProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeContract = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch contract verification status
        const verificationResponse = await fetch(`/api/contract/verify-status/${contractAddress}`);
        const verificationData = await verificationResponse.json();
        
        // Fetch contract info from Etherscan
        const etherscanResponse = await fetch(`/api/etherscan/contract/${contractAddress}`);
        const etherscanData = await etherscanResponse.json();
        
        // Fetch honeypot analysis
        const honeypotResponse = await fetch(`/api/honeypot/analyze?contract=${contractAddress}`);
        const honeypotData = await honeypotResponse.json();

        setAnalysis({
          verification: verificationData,
          etherscan: etherscanData,
          honeypot: honeypotData
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to analyze contract');
      } finally {
        setLoading(false);
      }
    };

    if (contractAddress) {
      analyzeContract();
    }
  }, [contractAddress]);

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <span className="ml-2 text-white">Analyzing contract...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert className="border-red-500 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Analysis Error:</strong> {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!analysis) return null;

  const { verification, etherscan, honeypot } = analysis;

  return (
    <Card className="bg-white/10 backdrop-blur border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Contract Analysis: {contractAddress.slice(0, 8)}...
        </CardTitle>
        <CardDescription className="text-blue-200">
          Security and verification analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Verification Status */}
        <div className="space-y-2">
          <h4 className="font-semibold text-white flex items-center gap-2">
            {verification?.isVerified ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            )}
            Verification Status
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-200">Status:</span>
              <Badge 
                variant={verification?.isVerified ? "default" : "secondary"}
                className={verification?.isVerified ? "bg-green-600 ml-2" : "bg-yellow-600 ml-2"}
              >
                {verification?.isVerified ? "Verified" : "Not Verified"}
              </Badge>
            </div>
            <div>
              <span className="text-blue-200">Name:</span>
              <span className="text-white font-mono ml-2">
                {verification?.contractName || etherscan?.contractName || "Unknown"}
              </span>
            </div>
            {verification?.compilerVersion && (
              <div>
                <span className="text-blue-200">Compiler:</span>
                <span className="text-white font-mono ml-2">{verification.compilerVersion}</span>
              </div>
            )}
            {verification?.optimization !== undefined && (
              <div>
                <span className="text-blue-200">Optimized:</span>
                <span className="text-white ml-2">{verification.optimization ? "Yes" : "No"}</span>
              </div>
            )}
          </div>
        </div>

        {/* Security Analysis */}
        {honeypot && (
          <div className="space-y-2">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security Analysis
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Honeypot Risk:</span>
                <Badge 
                  variant={honeypot.isHoneypot ? "destructive" : "default"}
                  className={honeypot.isHoneypot ? "bg-red-600" : "bg-green-600"}
                >
                  {honeypot.isHoneypot ? "HIGH RISK" : "LOW RISK"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Can Sell:</span>
                <span className={`font-semibold ${honeypot.canSell ? "text-green-400" : "text-red-400"}`}>
                  {honeypot.canSell ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Risk Level:</span>
                <Badge 
                  variant="secondary"
                  className={`${
                    honeypot.riskLevel === 'LOW' ? 'bg-green-600' :
                    honeypot.riskLevel === 'MEDIUM' ? 'bg-yellow-600' :
                    honeypot.riskLevel === 'HIGH' ? 'bg-orange-600' : 'bg-red-600'
                  }`}
                >
                  {honeypot.riskLevel}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Token Details */}
        {etherscan?.tokenDetails && (
          <div className="space-y-2">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Info className="h-4 w-4" />
              Token Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-200">Symbol:</span>
                <span className="text-white font-mono ml-2">{etherscan.tokenDetails.symbol}</span>
              </div>
              <div>
                <span className="text-blue-200">Decimals:</span>
                <span className="text-white font-mono ml-2">{etherscan.tokenDetails.decimals}</span>
              </div>
              <div className="col-span-2">
                <span className="text-blue-200">Total Supply:</span>
                <span className="text-white font-mono ml-2">{etherscan.tokenDetails.totalSupply}</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button 
              size="sm"
              variant="outline" 
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`)}
            >
              View on Etherscan
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
            <Button 
              size="sm"
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              onClick={() => window.open(`https://dexscreener.com/ethereum/${contractAddress}`)}
            >
              Check DexScreener
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Issues and Warnings */}
        {honeypot?.issues?.length > 0 && (
          <Alert className="border-red-500 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Security Issues:</strong>
              <ul className="list-disc list-inside mt-1">
                {honeypot.issues.map((issue: string, idx: number) => (
                  <li key={idx} className="text-sm">{issue}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {honeypot?.warnings?.length > 0 && (
          <Alert className="border-yellow-500 bg-yellow-50">
            <Info className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Warnings:</strong>
              <ul className="list-disc list-inside mt-1">
                {honeypot.warnings.map((warning: string, idx: number) => (
                  <li key={idx} className="text-sm">{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
