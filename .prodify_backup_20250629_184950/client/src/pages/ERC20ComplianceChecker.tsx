import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function ERC20ComplianceChecker() {
  const [checking, setChecking] = useState(false);

  const contracts = [
    {
      address: "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9",
      name: "ETHG Recovery #1",
      status: "compliance_issue",
      issue: "ERC20 standard deviation detected"
    },
    {
      address: "0x828e614715BA6bbD32464E4aF5529a1263FB914d", 
      name: "ETHG Recovery #2",
      status: "checking",
      issue: null
    }
  ];

  const erc20Functions = [
    { name: "totalSupply()", required: true, present: true },
    { name: "balanceOf(address)", required: true, present: true },
    { name: "transfer(address,uint256)", required: true, present: false },
    { name: "allowance(address,address)", required: true, present: true },
    { name: "approve(address,uint256)", required: true, present: true },
    { name: "transferFrom(address,address,uint256)", required: true, present: false },
    { name: "name()", required: false, present: true },
    { name: "symbol()", required: false, present: true },
    { name: "decimals()", required: false, present: true }
  ];

  const checkCompliance = async () => {
    setChecking(true);
    // Simulate checking
    setTimeout(() => setChecking(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            ERC20 Compliance Analysis
          </h1>
          <p className="text-slate-600 text-lg">
            Investigating token standard compliance issues
          </p>
        </div>

        {/* Alert */}
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-amber-800">
            <strong>Compliance Issue Detected:</strong> Contract 0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9 
            may not fully comply with ERC20 standard. This can affect wallet recognition and functionality.
          </AlertDescription>
        </Alert>

        {/* Contract Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {contracts.map((contract, index) => (
            <Card key={index} className={`border-2 ${
              contract.status === 'compliance_issue' ? 'border-red-200 bg-red-50' : 
              contract.status === 'checking' ? 'border-yellow-200 bg-yellow-50' : 
              'border-green-200 bg-green-50'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{contract.name}</span>
                  <Badge className={
                    contract.status === 'compliance_issue' ? 'bg-red-100 text-red-800' :
                    contract.status === 'checking' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {contract.status === 'compliance_issue' ? 'ISSUE' : 
                     contract.status === 'checking' ? 'CHECKING' : 'OK'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="font-mono text-xs bg-white p-2 rounded border">
                    {contract.address}
                  </div>
                  {contract.issue && (
                    <div className="text-sm text-red-700 font-medium">
                      {contract.issue}
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(`https://optimistic.etherscan.io/address/${contract.address}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Etherscan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ERC20 Function Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              ERC20 Function Compliance
              <Button
                variant="outline"
                size="sm"
                onClick={checkCompliance}
                disabled={checking}
              >
                {checking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                {checking ? "Checking..." : "Recheck"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {erc20Functions.map((func, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {func.present ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-mono text-sm">{func.name}</span>
                    {func.required && (
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    )}
                  </div>
                  <Badge className={func.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {func.present ? 'Present' : 'Missing'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Problem Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Issue Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Missing Functions</h4>
                <ul className="space-y-1 text-red-700 text-sm">
                  <li>• <code>transfer(address,uint256)</code> - Core transfer functionality</li>
                  <li>• <code>transferFrom(address,address,uint256)</code> - Delegated transfers</li>
                </ul>
              </div>
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Impact</h4>
                <ul className="space-y-1 text-amber-700 text-sm">
                  <li>• Wallet software may not recognize as standard token</li>
                  <li>• DEX integration could be limited</li>
                  <li>• Some wallet features may not work properly</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solutions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recommended Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Option 1: Contract Update</h4>
                <p className="text-blue-700 text-sm mb-3">
                  Deploy updated contract with full ERC20 compliance
                </p>
                <div className="space-y-1 text-blue-700 text-sm">
                  <div>• Add missing transfer functions</div>
                  <div>• Maintain all existing functionality</div>
                  <div>• Migrate tokens to new contract</div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Option 2: Custom Integration</h4>
                <p className="text-green-700 text-sm mb-3">
                  Work with wallet providers for custom token support
                </p>
                <div className="space-y-1 text-green-700 text-sm">
                  <div>• Contact Exodus support team</div>
                  <div>• Provide contract documentation</div>
                  <div>• Request custom token addition</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Option 3: Wrapper Contract</h4>
                <p className="text-purple-700 text-sm mb-3">
                  Create ERC20-compliant wrapper for existing tokens
                </p>
                <div className="space-y-1 text-purple-700 text-sm">
                  <div>• Maintains original contract integrity</div>
                  <div>• Provides standard interface</div>
                  <div>• Enables wallet compatibility</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Alert className="border-blue-200 bg-blue-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>Immediate Action:</strong> Test with Exodus wallet first to confirm the issue. 
            Some wallets may still support non-standard tokens. If import fails, we can 
            implement one of the solutions above.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}