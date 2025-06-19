import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Shield, AlertTriangle, CheckCircle, Download, Users, Activity, Copy, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ContractAnalyzerPage() {
  const [contractAddress, setContractAddress] = useState("0x7da0aef1b75035cbf364a690411bcca7e7859df8");
  const [activeTab, setActiveTab] = useState("analysis");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Mock data for Etherscan
  const etherscanData = {
      tokenDetails: {
          name: "ExampleToken",
          symbol: "EXM",
          decimals: 18,
          totalSupply: "1000000",
      }
  };

  const verificationData = {
      isVerified: true,
      contractName: "ExampleContract",
      compilerVersion: "v0.8.0",
      optimization: true,
      runs: 200,
      licenseType: "MIT",
      proxy: false,
      sourcecode: `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract ExampleContract {\n uint public value;\n\n function setValue(uint _value) public {\n value = _value;\n }\n}`
  };

  const honeypotData = {
      riskLevel: "MEDIUM",
      canBuy: true,
      canSell: false,
      hasLiquidity: true,
      liquidityUSD: 10000,
      isHoneypot: true,
      issues: ["High initial buy tax", "Possible centralisation"],
      warnings: ["Low trading volume"]
  };
  const isLoading = false;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Contract Security Analyzer</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of smart contracts and security assessment
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contract Analysis</CardTitle>
          <CardDescription>
            Enter a contract address to analyze its security, verification status, and potential risks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter contract address (e.g., 0x7da0aef...)"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')}
              variant="outline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Etherscan
            </Button>
          </div>

          {contractAddress && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded">
              <span className="text-sm font-mono">{contractAddress}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(contractAddress)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {contractAddress && (
        <Card>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="analysis">Overview</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="source">Source Code</TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Verification Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="animate-pulse h-6 bg-muted rounded" />
                      ) : (
                        <div className="flex items-center gap-2">
                          {verificationData?.isVerified ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <Badge variant="default">Verified</Badge>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <Badge variant="destructive">Unverified</Badge>
                            </>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Contract Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="animate-pulse h-6 bg-muted rounded" />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          <span className="text-sm">
                            {etherscanData?.tokenDetails ? 'Token Contract' : 'Smart Contract'}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Security Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="animate-pulse h-6 bg-muted rounded" />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <Badge 
                            variant={honeypotData?.riskLevel === 'LOW' ? 'default' : 
                                   honeypotData?.riskLevel === 'MEDIUM' ? 'secondary' : 'destructive'}
                          >
                            {honeypotData?.riskLevel || 'Unknown'}
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {etherscanData?.tokenDetails && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Token Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>
                          <span className="ml-2 font-mono">{etherscanData.tokenDetails.name}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Symbol:</span>
                          <span className="ml-2 font-mono">{etherscanData.tokenDetails.symbol}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Decimals:</span>
                          <span className="ml-2 font-mono">{etherscanData.tokenDetails.decimals}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Supply:</span>
                          <span className="ml-2 font-mono">{etherscanData.tokenDetails.totalSupply}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {honeypotData && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Can Buy:</span>
                            <Badge variant={honeypotData.canBuy ? "default" : "destructive"}>
                              {honeypotData.canBuy ? "Yes" : "No"}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Can Sell:</span>
                            <Badge variant={honeypotData.canSell ? "default" : "destructive"}>
                              {honeypotData.canSell ? "Yes" : "No"}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Has Liquidity:</span>
                            <Badge variant={honeypotData.hasLiquidity ? "default" : "destructive"}>
                              {honeypotData.hasLiquidity ? "Yes" : "No"}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Liquidity (USD):</span>
                            <span className="text-sm font-mono">${honeypotData.liquidityUSD?.toLocaleString() || 0}</span>
                          </div>
                        </div>
                      </div>

                      {honeypotData.issues?.length > 0 && (
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <div className="space-y-1">
                              <p className="font-semibold">Security Issues:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {honeypotData.issues.map((issue: string, index: number) => (
                                  <li key={index} className="text-sm">{issue}</li>
                                ))}
                              </ul>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                      {honeypotData.warnings?.length > 0 && (
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <div className="space-y-1">
                              <p className="font-semibold">Warnings:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {honeypotData.warnings.map((warning: string, index: number) => (
                                  <li key={index} className="text-sm">{warning}</li>
                                ))}
                              </ul>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="verification" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Verification Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-2">
                        <div className="animate-pulse h-4 bg-muted rounded w-3/4" />
                        <div className="animate-pulse h-4 bg-muted rounded w-1/2" />
                        <div className="animate-pulse h-4 bg-muted rounded w-2/3" />
                      </div>
                    ) : verificationData ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Contract Name:</span>
                            <span className="ml-2 font-mono">{verificationData.contractName || 'Unknown'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Compiler Version:</span>
                            <span className="ml-2 font-mono">{verificationData.compilerVersion || 'Unknown'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Optimization:</span>
                            <Badge variant={verificationData.optimization ? "default" : "secondary"}>
                              {verificationData.optimization ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Runs:</span>
                            <span className="ml-2 font-mono">{verificationData.runs || 0}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">License:</span>
                            <span className="ml-2 font-mono">{verificationData.licenseType || 'Unknown'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Proxy:</span>
                            <Badge variant={verificationData.proxy ? "secondary" : "default"}>
                              {verificationData.proxy ? "Yes" : "No"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No verification data available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-2">
                        <div className="animate-pulse h-4 bg-muted rounded w-full" />
                        <div className="animate-pulse h-4 bg-muted rounded w-3/4" />
                      </div>
                    ) : honeypotData ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 p-4 rounded-lg border">
                          {honeypotData.isHoneypot ? (
                            <>
                              <AlertTriangle className="h-6 w-6 text-red-600" />
                              <div>
                                <p className="font-semibold text-red-600">HONEYPOT DETECTED</p>
                                <p className="text-sm text-muted-foreground">This contract shows honeypot characteristics</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-6 w-6 text-green-600" />
                              <div>
                                <p className="font-semibold text-green-600">NO HONEYPOT DETECTED</p>
                                <p className="text-sm text-muted-foreground">Contract appears to be safe</p>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold">Trading Capabilities</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Can Buy:</span>
                                <Badge variant={honeypotData.canBuy ? "default" : "destructive"}>
                                  {honeypotData.canBuy ? "✓" : "✗"}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Can Sell:</span>
                                <Badge variant={honeypotData.canSell ? "default" : "destructive"}>
                                  {honeypotData.canSell ? "✓" : "✗"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold">Contract Status</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Verified:</span>
                                <Badge variant={honeypotData.isVerified ? "default" : "secondary"}>
                                  {honeypotData.isVerified ? "✓" : "✗"}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Has Liquidity:</span>
                                <Badge variant={honeypotData.hasLiquidity ? "default" : "destructive"}>
                                  {honeypotData.hasLiquidity ? "✓" : "✗"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No security analysis available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="source" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Source Code</CardTitle>
                    <CardDescription>
                      {verificationData?.isVerified ? 
                        "Contract source code is verified and available" : 
                        "Contract source code is not verified"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {verificationData?.sourcecode ? (
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                            {verificationData.sourcecode.slice(0, 2000)}
                            {verificationData.sourcecode.length > 2000 && '...'}
                          </pre>
                        </div>
                        <Button
                          onClick={() => window.open(`https://etherscan.io/address/${contractAddress}#code`, '_blank')}
                          variant="outline"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Full Source on Etherscan
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Source code not available or not verified</p>
                        <Button
                          onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')}
                          variant="outline"
                          className="mt-4"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Etherscan
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {!contractAddress && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Enter a contract address to begin analysis</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}