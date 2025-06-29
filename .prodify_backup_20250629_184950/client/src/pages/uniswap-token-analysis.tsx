
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ExternalLink,
  Shield,
  CheckCircle,
  TrendingUp,
  Users,
  Coins,
  Globe,
  Info
} from "lucide-react";
import { useState, useEffect } from "react";
import AddressValidator from "@/lib/address-validator";

export default function UniswapTokenAnalysis() {
  const uniswapAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const [tokenData, setTokenData] = useState<any>(null);
  const [validationResult, setValidationResult] = useState<any>(null);

  useEffect(() => {
    // Validate the address
    const validation = AddressValidator.validateWalletAddress(uniswapAddress, 1);
    setValidationResult(validation);

    // Set known Uniswap token data
    setTokenData({
      name: "Uniswap",
      symbol: "UNI",
      decimals: 18,
      totalSupply: "1,000,000,000",
      description: "Governance token for the Uniswap protocol",
      website: "https://uniswap.org",
      launched: "September 2020",
      category: "DeFi Governance Token"
    });
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(uniswapAddress);
  };

  const openEtherscan = () => {
    window.open(`https://etherscan.io/token/${uniswapAddress}`, '_blank');
  };

  const openUniswap = () => {
    window.open(`https://app.uniswap.org/#/swap?outputCurrency=${uniswapAddress}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Coins className="h-8 w-8 text-pink-500" />
        <div>
          <h1 className="text-3xl font-bold">Uniswap Token Analysis</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of the UNI governance token
          </p>
        </div>
      </div>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Contract Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono break-all">{uniswapAddress}</code>
                <Button onClick={copyAddress} size="sm" variant="outline">
                  Copy
                </Button>
              </div>
            </div>

            {validationResult && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Valid Address</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{validationResult.walletType}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      validationResult.riskLevel === 'LOW' ? 'default' :
                      validationResult.riskLevel === 'MEDIUM' ? 'secondary' : 'destructive'
                    }
                  >
                    {validationResult.riskLevel} Risk
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Token Information */}
      {tokenData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Token Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-semibold">{tokenData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Symbol:</span>
                  <span className="font-semibold">{tokenData.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Decimals:</span>
                  <span className="font-semibold">{tokenData.decimals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply:</span>
                  <span className="font-semibold">{tokenData.totalSupply} UNI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-semibold">{tokenData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Launched:</span>
                  <span className="font-semibold">{tokenData.launched}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Protocol Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    UNI is the governance token for Uniswap, the largest decentralized exchange (DEX) protocol on Ethereum.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h4 className="font-semibold">Key Features:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Governance voting rights</li>
                    <li>Protocol fee collection rights</li>
                    <li>Liquidity mining rewards</li>
                    <li>Treasury management participation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Security Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Security Strengths</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Multiple security audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Time-tested contract (3+ years)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Open source and verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Large ecosystem support</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">Usage Guidelines</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Always verify contract address before interacting</p>
                <p>• Use official Uniswap interface for trading</p>
                <p>• Check for sufficient liquidity before large trades</p>
                <p>• Be aware of governance proposals if holding UNI</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={openEtherscan} className="w-full" variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Etherscan
            </Button>
            <Button onClick={openUniswap} className="w-full" variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Trade on Uniswap
            </Button>
            <Button 
              onClick={() => window.open('https://gov.uniswap.org/', '_blank')} 
              className="w-full" 
              variant="outline"
            >
              <Users className="h-4 w-4 mr-2" />
              Governance Forum
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Relationship to Your Project */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This UNI token address analysis shows a completely legitimate and well-established DeFi token. 
          If you're working with UNI tokens in your recovery system, this is a safe and verified contract to interact with.
        </AlertDescription>
      </Alert>
    </div>
  );
}
