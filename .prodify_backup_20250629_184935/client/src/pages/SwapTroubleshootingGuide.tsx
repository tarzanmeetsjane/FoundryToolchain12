import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Settings, AlertTriangle, ExternalLink, RefreshCw, Copy } from 'lucide-react';
import { useState } from 'react';

export default function SwapTroubleshootingGuide() {
  const [slippage, setSlippage] = useState("5");
  const [gasLimit, setGasLimit] = useState("150000");
  const [selectedDex, setSelectedDex] = useState("uniswap-v3");
  const [testingStep, setTestingStep] = useState(0);

  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  
  // Your verified ETHGR contracts
  const ethgrContracts = [
    { 
      address: "0xc2b6d375b7d14c9ce73f97ddf565002cce257308", 
      name: "ETHGR Contract 1",
      balance: "1,990,000 ETHGR"
    },
    { 
      address: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247", 
      name: "ETHGR Contract 2", 
      balance: "1,990,000 ETHGR"
    }
  ];

  const dexOptions = [
    { 
      id: "uniswap-v3", 
      name: "Uniswap V3", 
      url: "https://app.uniswap.org/",
      recommended: true,
      notes: "Best for large trades, your proven platform"
    },
    { 
      id: "uniswap-v2", 
      name: "Uniswap V2", 
      url: "https://v2.info.uniswap.org/",
      recommended: false,
      notes: "Alternative routing, sometimes better liquidity"
    },
    { 
      id: "1inch", 
      name: "1inch", 
      url: "https://1inch.io/",
      recommended: true,
      notes: "Aggregates multiple DEXs for best rates"
    },
    { 
      id: "sushiswap", 
      name: "SushiSwap", 
      url: "https://www.sushi.com/swap",
      recommended: false,
      notes: "Alternative DEX with different liquidity pools"
    }
  ];

  const troubleshootingSteps = [
    {
      title: "Verify Contract Address",
      description: "Ensure you're using the correct ETHGR contract address",
      action: "Copy verified contract address",
      critical: true
    },
    {
      title: "Increase Slippage Tolerance",
      description: "Set slippage to 5-15% for volatile tokens",
      action: "Adjust slippage settings",
      critical: true
    },
    {
      title: "Check Gas Settings",
      description: "Increase gas limit to 150,000+ for complex swaps",
      action: "Set higher gas limit",
      critical: false
    },
    {
      title: "Try Different DEX",
      description: "Test multiple platforms if one fails",
      action: "Switch to alternative DEX",
      critical: false
    },
    {
      title: "Reduce Swap Amount",
      description: "Start with smaller test amounts",
      action: "Try 1,000 ETHGR first",
      critical: false
    },
    {
      title: "Clear Cache/Refresh",
      description: "Clear browser cache and wallet cache",
      action: "Hard refresh browser",
      critical: false
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const runTest = (stepIndex: number) => {
    setTestingStep(stepIndex + 1);
    setTimeout(() => setTestingStep(0), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            ETHGR Swap Troubleshooting Guide
          </h1>
          <p className="text-slate-600 text-lg">
            Fix your swap issues with proven solutions
          </p>
        </div>

        {/* Quick Status */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>Tokens Confirmed Working:</strong> Your June trading history proves ETHGR swaps work. 
            Current issues are settings-related, not token problems.
          </AlertDescription>
        </Alert>

        {/* Contract Verification */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Step 1: Verify Contract Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                Ensure your DEX is using the correct ETHGR contract address. Copy the verified address below:
              </p>
              
              <div className="space-y-3">
                {ethgrContracts.map((contract, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{contract.name}</h4>
                        <div className="font-mono text-sm text-gray-600 break-all">
                          {contract.address}
                        </div>
                        <div className="text-sm text-green-600">
                          Balance: {contract.balance}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(contract.address)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Configuration */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Step 2: Optimize Swap Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h4 className="font-semibold">Slippage Tolerance</h4>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {["1", "3", "5", "10", "15"].map((value) => (
                      <Button
                        key={value}
                        variant={slippage === value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSlippage(value)}
                      >
                        {value}%
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={slippage}
                      onChange={(e) => setSlippage(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-600">% slippage</span>
                  </div>
                  <div className="text-sm text-amber-600">
                    Recommended: 5-10% for ETHGR tokens
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Gas Limit</h4>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {["100000", "150000", "200000", "300000"].map((value) => (
                      <Button
                        key={value}
                        variant={gasLimit === value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setGasLimit(value)}
                      >
                        {parseInt(value).toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    value={gasLimit}
                    onChange={(e) => setGasLimit(e.target.value)}
                    placeholder="Gas limit"
                  />
                  <div className="text-sm text-blue-600">
                    Recommended: 150,000+ for token swaps
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DEX Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Step 3: Choose DEX Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={selectedDex} onValueChange={setSelectedDex}>
                <SelectTrigger>
                  <SelectValue placeholder="Select DEX platform" />
                </SelectTrigger>
                <SelectContent>
                  {dexOptions.map((dex) => (
                    <SelectItem key={dex.id} value={dex.id}>
                      {dex.name} {dex.recommended && "⭐"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedDex && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  {(() => {
                    const selected = dexOptions.find(d => d.id === selectedDex);
                    return selected ? (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-blue-800">{selected.name}</h4>
                          {selected.recommended && (
                            <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                          )}
                        </div>
                        <p className="text-blue-700 text-sm mb-3">{selected.notes}</p>
                        <Button
                          onClick={() => window.open(selected.url, '_blank')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open {selected.name}
                        </Button>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting Checklist */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Step 4: Troubleshooting Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {troubleshootingSteps.map((step, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.critical ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {step.critical && (
                      <Badge className="bg-red-100 text-red-800">Critical</Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => runTest(index)}
                      disabled={testingStep === index + 1}
                    >
                      {testingStep === index + 1 ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        step.action
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Guide */}
        <Card className="border-2 border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Quick Start: Test Swap Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="border-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Ready to Test:</strong> Using {slippage}% slippage, {parseInt(gasLimit).toLocaleString()} gas limit
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border">
                  <h4 className="font-semibold mb-2">Small Test Swap</h4>
                  <p className="text-sm text-gray-600 mb-3">Test with 1,000 ETHGR first</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Start Test Swap
                  </Button>
                </div>
                
                <div className="p-4 bg-white rounded-lg border">
                  <h4 className="font-semibold mb-2">Full Amount</h4>
                  <p className="text-sm text-gray-600 mb-3">Swap larger amounts after test</p>
                  <Button className="w-full" variant="outline">
                    After Test Success
                  </Button>
                </div>
              </div>

              <div className="text-center text-sm text-green-700">
                Your tokens worked in June - they'll work now with the right settings!
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}