import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Copy, Save, Search } from "lucide-react";
import { AddressValidator } from "@/lib/address-validator";
import { useToast } from "@/hooks/use-toast";

interface ValidationResult {
  isValid: boolean;
  confidence: number;
  walletType: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  features: string[];
  securityScore: number;
  address: string;
  timestamp: string;
}

export default function WalletValidationPanel() {
  const [address, setAddress] = useState("");
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [savedResults, setSavedResults] = useState<ValidationResult[]>([]);
  const { toast } = useToast();

  const validateWallet = async () => {
    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter a wallet address to validate",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    try {
      const result = AddressValidator.validateWalletAddress(address.trim(), 1);
      const validationResult: ValidationResult = {
        ...result,
        address: address.trim(),
        timestamp: new Date().toISOString()
      };
      
      setValidationResult(validationResult);
      
      toast({
        title: "Validation Complete",
        description: `Address analyzed with ${result.confidence}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Validation Failed",
        description: "Error analyzing the wallet address",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const saveResult = () => {
    if (validationResult && !savedResults.find(r => r.address === validationResult.address)) {
      setSavedResults(prev => [validationResult, ...prev]);
      toast({
        title: "Result Saved",
        description: "Validation result saved to your collection",
      });
    }
  };

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    toast({
      title: "Copied",
      description: "Address copied to clipboard",
    });
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'MEDIUM': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'HIGH': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW': return <CheckCircle className="h-4 w-4" />;
      case 'MEDIUM': return <AlertTriangle className="h-4 w-4" />;
      case 'HIGH': return <Shield className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Validation Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Wallet Security Analysis
          </CardTitle>
          <CardDescription>
            Analyze any wallet address for security patterns, risk assessment, and detailed insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter wallet address (0x...)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="font-mono text-sm"
            />
            <Button 
              onClick={validateWallet}
              disabled={isValidating}
              className="min-w-[100px]"
            >
              {isValidating ? "Analyzing..." : <><Search className="h-4 w-4 mr-1" /> Validate</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      {validationResult && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Validation Results</CardTitle>
              <Button onClick={saveResult} variant="outline" size="sm">
                <Save className="h-4 w-4 mr-1" />
                Save Result
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Address Info */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Address</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyAddress(validationResult.address)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <code className="text-sm break-all">{validationResult.address}</code>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {validationResult.confidence}%
                </div>
                <div className="text-sm text-muted-foreground">Confidence</div>
              </div>
              
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {validationResult.securityScore}
                </div>
                <div className="text-sm text-muted-foreground">Security Score</div>
              </div>
              
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <Badge variant="secondary" className="text-xs">
                  {validationResult.walletType.replace(/_/g, ' ')}
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">Wallet Type</div>
              </div>
              
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <Badge className={getRiskColor(validationResult.riskLevel)}>
                  {getRiskIcon(validationResult.riskLevel)}
                  <span className="ml-1">{validationResult.riskLevel}</span>
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">Risk Level</div>
              </div>
            </div>

            {/* Security Features */}
            <div>
              <h4 className="font-medium mb-2">Security Features Detected</h4>
              <div className="flex flex-wrap gap-2">
                {validationResult.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            {validationResult.riskLevel === 'HIGH' && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>High Risk Detected:</strong> This address shows patterns that may indicate security concerns. 
                  Verify carefully before any transactions.
                </AlertDescription>
              </Alert>
            )}

            {validationResult.riskLevel === 'LOW' && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Low Risk:</strong> This address appears to have good security characteristics 
                  and follows standard patterns.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Saved Results */}
      {savedResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Validation Results</CardTitle>
            <CardDescription>
              Your collection of analyzed wallet addresses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <code className="text-sm">{result.address.slice(0, 20)}...</code>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {result.confidence}% confidence
                      </Badge>
                      <Badge className={`text-xs ${getRiskColor(result.riskLevel)}`}>
                        {result.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setValidationResult(result)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyAddress(result.address)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}