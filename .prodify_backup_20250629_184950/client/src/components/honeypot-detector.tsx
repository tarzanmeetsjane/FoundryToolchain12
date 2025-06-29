import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  AlertTriangle, 
  Shield,
  ExternalLink,
  Search,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HoneypotAnalysis {
  contractAddress: string;
  tokenName: string;
  tokenSymbol: string;
  isHoneypot: boolean;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  issues: string[];
  canBuy: boolean;
  canSell: boolean;
  isVerified: boolean;
  hasLiquidity: boolean;
  liquidityUSD: number;
  warnings: string[];
}

export function HoneypotDetector() {
  const [contractAddress, setContractAddress] = useState("0x3fc29836e84e471a053d2d9e80494a867d670ead");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const { toast } = useToast();

  const { data: analysis, isLoading, error } = useQuery({
    queryKey: ['/api/honeypot/analyze', contractAddress, searchTrigger],
    queryFn: async () => {
      if (!contractAddress || contractAddress.length !== 42) return null;
      
      const response = await fetch(`/api/honeypot/analyze?contract=${contractAddress}`);
      if (!response.ok) throw new Error('Failed to analyze contract');
      return response.json();
    },
    enabled: !!contractAddress && contractAddress.length === 42 && searchTrigger > 0,
    refetchInterval: false
  });

  const handleAnalyze = () => {
    setSearchTrigger(prev => prev + 1);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Honeypot & Scam Token Detector
        </CardTitle>
        <CardDescription>
          Analyze token contracts for transfer restrictions, honeypots, and scam indicators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter token contract address (0x...)"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="font-mono text-sm"
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={isLoading || !contractAddress}
            size="icon"
          >
            <Search className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Analyzing contract security...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-500" />
            <p className="text-red-600">Failed to analyze contract</p>
          </div>
        )}

        {analysis && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{analysis.tokenName} ({analysis.tokenSymbol})</h3>
                <p className="text-sm text-muted-foreground font-mono">
                  {analysis.contractAddress}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge className={getRiskColor(analysis.riskLevel)}>
                  {analysis.riskLevel} RISK
                </Badge>
                {analysis.isHoneypot && (
                  <Badge variant="destructive">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    HONEYPOT
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className={`font-medium ${analysis.canBuy ? 'text-green-600' : 'text-red-600'}`}>
                  {analysis.canBuy ? 'CAN BUY' : 'CANNOT BUY'}
                </div>
                <div className="text-xs text-muted-foreground">Buy Status</div>
              </div>
              
              <div className="text-center p-3 border rounded-lg">
                <div className={`font-medium ${analysis.canSell ? 'text-green-600' : 'text-red-600'}`}>
                  {analysis.canSell ? 'CAN SELL' : 'CANNOT SELL'}
                </div>
                <div className="text-xs text-muted-foreground">Sell Status</div>
              </div>
              
              <div className="text-center p-3 border rounded-lg">
                <div className={`font-medium ${analysis.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                  {analysis.isVerified ? 'VERIFIED' : 'UNVERIFIED'}
                </div>
                <div className="text-xs text-muted-foreground">Contract</div>
              </div>
              
              <div className="text-center p-3 border rounded-lg">
                <div className={`font-medium ${analysis.hasLiquidity ? 'text-green-600' : 'text-red-600'}`}>
                  ${analysis.liquidityUSD.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Liquidity</div>
              </div>
            </div>

            {analysis.warnings.length > 0 && (
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  Security Warnings
                </h4>
                <ul className="space-y-1 text-sm">
                  {analysis.warnings.map((warning: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.issues.length > 0 && (
              <div className="border-l-4 border-red-500 bg-red-50 p-4">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  Critical Issues
                </h4>
                <ul className="space-y-1 text-sm">
                  {analysis.issues.map((issue: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-center">
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={`https://etherscan.io/address/${analysis.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View on Etherscan
                </a>
              </Button>
            </div>
          </div>
        )}

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Pre-loaded Analysis: ETHG Token</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Contract:</span>
              <span className="font-mono">0x3fc29...70ead</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge variant="destructive">SUSPECTED HONEYPOT</Badge>
            </div>
            <div className="flex justify-between">
              <span>Can Transfer:</span>
              <span className="text-red-600">NO - Transfers Blocked</span>
            </div>
            <div className="flex justify-between">
              <span>Verification:</span>
              <span className="text-red-600">Unverified Contract</span>
            </div>
            <div className="flex justify-between">
              <span>Market Data:</span>
              <span className="text-red-600">Not Listed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}