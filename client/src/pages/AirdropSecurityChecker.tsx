import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, CheckCircle, X, ExternalLink, Search } from 'lucide-react';

export default function AirdropSecurityChecker() {
  const [airdropAddress, setAirdropAddress] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAirdropSecurity = async () => {
    if (!airdropAddress) return;
    
    setLoading(true);
    
    // Simulate security analysis
    setTimeout(() => {
      const riskFactors = [];
      const safetyFeatures = [];
      
      // Common scam patterns
      if (airdropAddress.toLowerCase().includes('claim') || 
          airdropAddress.toLowerCase().includes('airdrop') ||
          airdropAddress.toLowerCase().includes('free')) {
        riskFactors.push('Suspicious domain keywords detected');
      }
      
      // Check for HTTPS
      if (airdropAddress.startsWith('http://')) {
        riskFactors.push('Non-encrypted connection (HTTP)');
      } else if (airdropAddress.startsWith('https://')) {
        safetyFeatures.push('Encrypted connection (HTTPS)');
      }
      
      // Known safe domains
      const safeDomains = ['coinbase.com', 'binance.com', 'uniswap.org', 'opensea.io'];
      const isSafeDomain = safeDomains.some(domain => airdropAddress.includes(domain));
      
      if (isSafeDomain) {
        safetyFeatures.push('Known legitimate platform');
      }
      
      const riskLevel = riskFactors.length > safetyFeatures.length ? 'HIGH' : 
                       riskFactors.length > 0 ? 'MEDIUM' : 'LOW';
      
      setAnalysisResult({
        url: airdropAddress,
        riskLevel,
        riskFactors,
        safetyFeatures,
        recommendation: riskLevel === 'HIGH' ? 'DO NOT PROCEED' : 
                       riskLevel === 'MEDIUM' ? 'PROCEED WITH EXTREME CAUTION' : 
                       'APPEARS SAFER BUT VERIFY'
      });
      setLoading(false);
    }, 2000);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-800 mb-2 flex items-center justify-center gap-2">
            <Shield className="w-8 h-8" />
            Airdrop Security Checker
          </h1>
          <p className="text-red-600 text-lg">
            Protect yourself from airdrop scams and wallet drains
          </p>
        </div>

        {/* Emergency Warning */}
        <Alert className="border-red-300 bg-red-100 mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>CRITICAL WARNING:</strong> Most airdrops are scams designed to steal your cryptocurrency. 
            Never connect your main wallet or sign transactions without thorough verification.
          </AlertDescription>
        </Alert>

        {/* Airdrop Checker */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Analyze Airdrop URL or Contract
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Enter airdrop website URL or contract address..."
                value={airdropAddress}
                onChange={(e) => setAirdropAddress(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={checkAirdropSecurity}
                disabled={loading || !airdropAddress}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Analyzing...' : 'Check Security'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Security Analysis Results</span>
                <Badge className={getRiskColor(analysisResult.riskLevel)}>
                  {analysisResult.riskLevel} RISK
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Recommendation */}
              <Alert className={`border-2 ${
                analysisResult.riskLevel === 'HIGH' ? 'border-red-300 bg-red-50' :
                analysisResult.riskLevel === 'MEDIUM' ? 'border-yellow-300 bg-yellow-50' :
                'border-green-300 bg-green-50'
              }`}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className={
                  analysisResult.riskLevel === 'HIGH' ? 'text-red-800' :
                  analysisResult.riskLevel === 'MEDIUM' ? 'text-yellow-800' :
                  'text-green-800'
                }>
                  <strong>RECOMMENDATION:</strong> {analysisResult.recommendation}
                </AlertDescription>
              </Alert>

              {/* Risk Factors */}
              {analysisResult.riskFactors.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <X className="w-4 h-4" />
                    Risk Factors Detected:
                  </h4>
                  <ul className="space-y-1">
                    {analysisResult.riskFactors.map((risk, index) => (
                      <li key={index} className="text-red-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Safety Features */}
              {analysisResult.safetyFeatures.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Safety Features Found:
                  </h4>
                  <ul className="space-y-1">
                    {analysisResult.safetyFeatures.map((feature, index) => (
                      <li key={index} className="text-green-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Security Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Red Flags */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Airdrop Red Flags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Asks you to send ETH or tokens first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Requires connecting your main wallet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Claims you won tokens you never heard of</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Urgent time pressure ("claim now!")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Suspicious URLs or misspelled domains</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Requests private keys or seed phrases</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Safety Precautions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Use a separate wallet with small amounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Verify through official project channels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Check contract addresses on Etherscan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Research the project thoroughly first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Never approve unlimited token spending</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>If unsure, don't proceed</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Actions */}
        <Card className="mt-6 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-700">If You Already Interacted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-orange-800 font-medium">Take these steps immediately:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-orange-700">
                <li>Disconnect your wallet from all websites</li>
                <li>Revoke all token approvals at revoke.cash</li>
                <li>Move remaining funds to a new wallet</li>
                <li>Monitor your wallet for unauthorized transactions</li>
                <li>Report the scam to relevant authorities</li>
              </ol>
              <Button 
                className="mt-4 bg-orange-600 hover:bg-orange-700"
                onClick={() => window.open('https://revoke.cash', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Revoke Token Approvals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}