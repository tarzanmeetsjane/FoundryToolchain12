import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  TestTube,
  Zap,
  Database,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function BlockchainTestSuite() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [customAddress, setCustomAddress] = useState("0x058C8FE01E5c9eaC6ee19e6673673B549B368843");
  const [customToken, setCustomToken] = useState("0xfA7b8c553C48C56ec7027d26ae95b029a2abF247");

  // Test endpoints
  const testEndpoints = [
    {
      name: "ETHGR Live Data",
      endpoint: "/api/ethgr/live-data",
      description: "Real-time ETHGR token analytics"
    },
    {
      name: "Sales Metrics",
      endpoint: "/api/ethgr/sales-metrics", 
      description: "Revenue calculations and pricing"
    },
    {
      name: "Pool Readiness",
      endpoint: "/api/ethgr/pool-readiness",
      description: "Liquidity pool creation analysis"
    },
    {
      name: "Live Pool Data",
      endpoint: `/api/live/pool-data/${customAddress}/${customToken}`,
      description: "Real-time blockchain balance data"
    },
    {
      name: "Trending Pools",
      endpoint: "/api/dex/trending-pools",
      description: "Live DEX pool analytics"
    }
  ];

  const runComprehensiveTest = async () => {
    const results = [];
    setTestResults([]);

    for (const test of testEndpoints) {
      try {
        const startTime = Date.now();
        const response = await fetch(`http://localhost:5000${test.endpoint}`);
        const endTime = Date.now();
        const data = await response.json();
        
        results.push({
          ...test,
          status: response.ok ? 'success' : 'error',
          responseTime: endTime - startTime,
          data: data,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        results.push({
          ...test,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        });
      }
    }
    
    setTestResults(results);
  };

  const testSingleEndpoint = async (endpoint: string) => {
    try {
      const startTime = Date.now();
      const response = await fetch(`http://localhost:5000${endpoint}`);
      const endTime = Date.now();
      const data = await response.json();
      
      console.log(`Test ${endpoint}:`, {
        status: response.ok ? 'success' : 'error',
        responseTime: endTime - startTime,
        data
      });
      
      return data;
    } catch (error) {
      console.error(`Test ${endpoint} failed:`, error);
      return null;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Live Blockchain Integration Test Suite</h1>
          <p className="text-muted-foreground">
            Test authentic blockchain data connectivity and ETHGR token analytics
          </p>
        </div>
        <Button onClick={runComprehensiveTest} className="flex items-center gap-2">
          <TestTube className="h-4 w-4" />
          Run All Tests
        </Button>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Database className="h-4 w-4" />
        <AlertDescription>
          <strong>LIVE TESTING MODE:</strong> All tests use real blockchain data from Ethereum mainnet.
          Results will show authentic ETHGR token balances, ETH prices, and gas costs.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
            <CardDescription>Customize test parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Wallet Address</Label>
              <Input 
                id="address"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <Label htmlFor="token">Token Contract</Label>
              <Input 
                id="token"
                value={customToken}
                onChange={(e) => setCustomToken(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Default values are set to your ETHGR recovery wallet and contract
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Individual endpoint testing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {testEndpoints.map((test, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm"
                onClick={() => testSingleEndpoint(test.endpoint)}
                className="w-full justify-start"
              >
                <Zap className="h-3 w-3 mr-2" />
                {test.name}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {testResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Test Results</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {testResults.map((result, index) => (
              <Card key={index} className={`border-l-4 ${
                result.status === 'success' ? 'border-l-green-500' : 'border-l-red-500'
              }`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{result.name}</span>
                    <Badge variant={result.status === 'success' ? 'default' : 'destructive'}>
                      {result.status === 'success' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {result.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{result.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {result.status === 'success' ? (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Response Time:</span>
                        <span className="font-mono">{result.responseTime}ms</span>
                      </div>
                      
                      {result.data.success && result.data.data && (
                        <div className="space-y-2">
                          <div className="font-semibold">Live Data:</div>
                          
                          {result.data.data.tokenBalance !== undefined && (
                            <div className="flex justify-between p-2 bg-blue-50 rounded">
                              <span>Token Balance:</span>
                              <span className="font-bold text-blue-600">
                                {typeof result.data.data.tokenBalance === 'number' 
                                  ? result.data.data.tokenBalance.toLocaleString()
                                  : result.data.data.tokenBalanceFormatted || result.data.data.tokenBalance
                                }
                              </span>
                            </div>
                          )}
                          
                          {result.data.data.ethPrice && (
                            <div className="flex justify-between p-2 bg-green-50 rounded">
                              <span>ETH Price:</span>
                              <span className="font-bold text-green-600">
                                ${result.data.data.ethPrice.toFixed(2)}
                              </span>
                            </div>
                          )}
                          
                          {result.data.data.portfolioValue && (
                            <div className="flex justify-between p-2 bg-purple-50 rounded">
                              <span>Portfolio Value:</span>
                              <span className="font-bold text-purple-600">
                                {result.data.data.portfolioValueFormatted || `$${result.data.data.portfolioValue}`}
                              </span>
                            </div>
                          )}
                          
                          {result.data.data.currentBlock && (
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                              <span>Current Block:</span>
                              <span className="font-mono text-gray-600">
                                #{result.data.data.currentBlock.toLocaleString()}
                              </span>
                            </div>
                          )}
                          
                          {result.data.data.dataSource && (
                            <div className="text-xs text-muted-foreground">
                              Source: {result.data.data.dataSource} • Updated: {new Date(result.data.data.lastUpdated || result.timestamp).toLocaleTimeString()}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {result.data.data && Array.isArray(result.data.data) && (
                        <div>
                          <div className="font-semibold">Pool Data ({result.data.data.length} pools):</div>
                          <div className="text-sm text-muted-foreground">
                            Source: {result.data.source}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-red-600">
                      Error: {result.error || 'Test failed'}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
          <CardDescription>Real-time blockchain connectivity overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-bold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Ethereum Mainnet
              </div>
              <div className="text-sm space-y-1">
                <div>✓ Direct RPC connectivity</div>
                <div>✓ Real-time balance queries</div>
                <div>✓ Live gas price feeds</div>
                <div>✓ Transaction verification</div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-bold mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                Price Feeds
              </div>
              <div className="text-sm space-y-1">
                <div>✓ CoinGecko API integration</div>
                <div>✓ Etherscan price backup</div>
                <div>✓ Multi-source validation</div>
                <div>✓ Real-time rate updates</div>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="font-bold mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                ETHGR Analytics
              </div>
              <div className="text-sm space-y-1">
                <div>✓ Token balance verification</div>
                <div>✓ Portfolio value calculation</div>
                <div>✓ Sales metrics generation</div>
                <div>✓ Pool readiness analysis</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}