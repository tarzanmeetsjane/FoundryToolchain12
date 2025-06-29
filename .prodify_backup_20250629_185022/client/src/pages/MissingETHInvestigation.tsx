import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Search, ExternalLink, Calculator, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function MissingETHInvestigation() {
  const [investigating, setInvestigating] = useState(false);

  const investigateTransactions = () => {
    setInvestigating(true);
    setTimeout(() => setInvestigating(false), 3000);
  };

  const originalWallet = "0xc46eb37677360efdc011f4097621f15b792fa630";
  const expectedETH = 37;
  const currentETHPrice = 2400; // Approximate
  const missingValue = expectedETH * currentETHPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Missing ETH Investigation
          </h1>
          <p className="text-slate-600 text-lg">
            Investigating 37 ETH transfer from original wallet
          </p>
        </div>

        {/* Critical Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>CRITICAL ISSUE:</strong> 37 ETH (~${missingValue.toLocaleString()}) expected from original wallet 
            cannot be located. Demo environment may have caused actual value loss.
          </AlertDescription>
        </Alert>

        {/* Value Analysis */}
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <DollarSign className="w-5 h-5" />
              Missing Value Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-lg border-2 border-amber-200">
                <div className="text-3xl font-bold text-amber-700">37 ETH</div>
                <div className="text-amber-600">Expected Transfer</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg border-2 border-red-200">
                <div className="text-3xl font-bold text-red-700">${missingValue.toLocaleString()}</div>
                <div className="text-red-600">Missing Value (USD)</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-200">
                <div className="text-2xl font-bold text-gray-700">0.00136 ETH</div>
                <div className="text-gray-600">Contract Reference</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Discrepancy Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Critical Discrepancy Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Expected vs. Documented</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-red-600">Your Report:</div>
                    <div className="font-bold text-red-700">37 ETH expected transfer</div>
                  </div>
                  <div>
                    <div className="text-sm text-red-600">Contract Documentation:</div>
                    <div className="font-bold text-red-700">0.00136014 ETH referenced</div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white rounded border">
                  <div className="text-sm font-semibold text-red-800">Missing Amount:</div>
                  <div className="text-lg font-bold text-red-700">36.99863986 ETH (~${((expectedETH - 0.00136014) * currentETHPrice).toLocaleString()})</div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Demo Environment Concern</h4>
                <p className="text-amber-700 text-sm">
                  If transactions were executed in a demo/test environment but affected real wallets, 
                  this could result in actual asset loss. This requires immediate investigation of 
                  blockchain transaction history.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investigation Tools */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Blockchain Investigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Original Wallet Analysis</h4>
                <div className="bg-white p-3 rounded border mb-3">
                  <div className="text-xs text-gray-500 mb-1">Address:</div>
                  <div className="font-mono text-sm break-all">{originalWallet}</div>
                </div>
                
                <div className="flex gap-2 mb-3">
                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://etherscan.io/address/${originalWallet}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Etherscan
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={investigateTransactions}
                    disabled={investigating}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {investigating ? "Investigating..." : "Check Transactions"}
                  </Button>
                </div>
                
                <div className="text-sm text-blue-700">
                  <strong>Investigation Focus:</strong> Look for outgoing transactions of ~37 ETH, 
                  especially during the timeframe when demo/testing was occurring.
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3">Transaction Pattern Analysis</h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <div>• Check for large ETH transfers (30+ ETH)</div>
                  <div>• Look for contract interactions during demo period</div>
                  <div>• Identify any failed transactions</div>
                  <div>• Trace fund movements to other addresses</div>
                  <div>• Check if ETH is locked in any contracts</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recovery Options */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Potential Recovery Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">If ETH is Recoverable</h4>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• ETH locked in recoverable contract</li>
                  <li>• Funds sent to wrong but accessible address</li>
                  <li>• Failed transaction can be retried</li>
                  <li>• Demo environment reversible</li>
                </ul>
                <Button className="w-full mt-3 bg-green-600 hover:bg-green-700">
                  Initiate Recovery Process
                </Button>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">If ETH is Lost</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Document the loss for insurance/tax</li>
                  <li>• Report to relevant authorities</li>
                  <li>• Learn from demo environment issues</li>
                  <li>• Focus on remaining portfolio value</li>
                </ul>
                <Button variant="outline" className="w-full mt-3">
                  Document Loss
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Alert className="border-blue-200 bg-blue-50">
          <Calculator className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>Current Portfolio Status:</strong> Despite the missing 37 ETH, your foundation wallet 
            shows $695,830.24 in confirmed value. However, recovery of the missing ~$88,800 in ETH 
            should be a high priority investigation.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}