import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { 
  Code, 
  Shield,
  ExternalLink,
  Check,
  AlertTriangle,
  Copy,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContractInfo {
  address: string;
  isVerified: boolean;
  contractName: string;
  compilerVersion: string;
  sourceCode: string;
  abi: string;
  constructorArgs: string;
  optimizationEnabled: boolean;
  runs: number;
  licenseType: string;
}

export function ContractVerifier() {
  const [contractAddress, setContractAddress] = useState("0x3fc29836e84e471a053d2d9e80494a867d670ead");
  const [sourceCode, setSourceCode] = useState("");
  const [compilerVersion, setCompilerVersion] = useState("v0.8.19+commit.7dd6d404");
  const [optimizationEnabled, setOptimizationEnabled] = useState(true);
  const [runs, setRuns] = useState(200);
  const [contractName, setContractName] = useState("");
  const [constructorArgs, setConstructorArgs] = useState("");
  const [licenseType, setLicenseType] = useState("MIT");
  const { toast } = useToast();

  const { data: contractInfo, isLoading } = useQuery({
    queryKey: ['/api/contract/info', contractAddress],
    queryFn: async () => {
      if (!contractAddress || contractAddress.length !== 42) return null;
      
      const response = await fetch(`/api/contract/info?address=${contractAddress}`);
      if (!response.ok) throw new Error('Failed to fetch contract info');
      return response.json();
    },
    enabled: !!contractAddress && contractAddress.length === 42
  });

  const handleVerifyContract = async () => {
    try {
      const response = await fetch('/api/contract/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: contractAddress,
          sourceCode,
          compilerVersion,
          optimizationEnabled,
          runs,
          contractName,
          constructorArgs,
          licenseType
        })
      });

      if (!response.ok) throw new Error('Verification failed');
      
      const result = await response.json();
      toast({
        title: "Verification Submitted",
        description: "Contract verification request sent to Etherscan"
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Unable to submit verification request",
        variant: "destructive"
      });
    }
  };

  const generateSampleContract = () => {
    const sampleCode = `// SPDX-License-Identifier: ${licenseType}
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${contractName || 'MyToken'} is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        require(initialSupply <= MAX_SUPPLY, "Initial supply exceeds maximum");
        _mint(msg.sender, initialSupply);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    // Transparent transfer function - no hidden restrictions
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        return super.transferFrom(from, to, amount);
    }
}`;
    setSourceCode(sampleCode);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Smart Contract Verifier & Generator
        </CardTitle>
        <CardDescription>
          Verify existing contracts or generate transparent, auditable smart contracts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analyze">Analyze Contract</TabsTrigger>
            <TabsTrigger value="generate">Generate Contract</TabsTrigger>
            <TabsTrigger value="verify">Verify Contract</TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter contract address (0x...)"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button variant="outline" asChild>
                  <a 
                    href={`https://etherscan.io/address/${contractAddress}#code`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              {contractInfo && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className={`font-medium ${contractInfo.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                        {contractInfo.isVerified ? (
                          <>
                            <Check className="w-4 h-4 inline mr-1" />
                            VERIFIED
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 inline mr-1" />
                            UNVERIFIED
                          </>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">Status</div>
                    </div>
                    
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium">{contractInfo.contractName || 'Unknown'}</div>
                      <div className="text-xs text-muted-foreground">Contract Name</div>
                    </div>
                    
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium">{contractInfo.compilerVersion || 'Unknown'}</div>
                      <div className="text-xs text-muted-foreground">Compiler</div>
                    </div>
                    
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium">{contractInfo.licenseType || 'Unknown'}</div>
                      <div className="text-xs text-muted-foreground">License</div>
                    </div>
                  </div>

                  {!contractInfo.isVerified && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-red-800 mb-1">Unverified Contract Warning</p>
                          <ul className="text-red-700 space-y-1">
                            <li>• Source code is not publicly available</li>
                            <li>• Cannot verify contract behavior or security</li>
                            <li>• High risk of hidden functions or restrictions</li>
                            <li>• May contain honeypot or rug pull mechanisms</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {contractInfo.sourceCode && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Source Code</label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(contractInfo.sourceCode, "Source code")}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <Textarea
                        value={contractInfo.sourceCode}
                        readOnly
                        className="font-mono text-xs h-64"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">ETHG Token Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Contract:</span>
                    <span className="font-mono">0x3fc29...70ead</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verification Status:</span>
                    <Badge variant="destructive">UNVERIFIED</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Assessment:</span>
                    <Badge variant="destructive">HONEYPOT SUSPECTED</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Recommendation:</span>
                    <span className="text-orange-600">Do not attempt transfers</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="generate" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contract Name</label>
                  <Input
                    placeholder="MyToken"
                    value={contractName}
                    onChange={(e) => setContractName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">License Type</label>
                  <Select value={licenseType} onValueChange={setLicenseType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MIT">MIT</SelectItem>
                      <SelectItem value="GPL-3.0">GPL-3.0</SelectItem>
                      <SelectItem value="Apache-2.0">Apache-2.0</SelectItem>
                      <SelectItem value="BSD-2-Clause">BSD-2-Clause</SelectItem>
                      <SelectItem value="Unlicense">Unlicense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={generateSampleContract} className="w-full">
                <Code className="w-4 h-4 mr-2" />
                Generate Transparent ERC-20 Contract
              </Button>

              {sourceCode && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Generated Contract</label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(sourceCode, "Contract code")}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const blob = new Blob([sourceCode], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${contractName || 'MyToken'}.sol`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={sourceCode}
                    onChange={(e) => setSourceCode(e.target.value)}
                    className="font-mono text-xs h-96"
                  />
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-800 mb-1">Why This Contract is Safe vs ETHG</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="font-medium text-green-800">✓ Transparent Contract</p>
                        <ul className="text-green-700 space-y-1 text-xs">
                          <li>• Source code will be verified</li>
                          <li>• Standard ERC-20 functions</li>
                          <li>• No hidden restrictions</li>
                          <li>• OpenZeppelin security</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-red-800">✗ ETHG Problems</p>
                        <ul className="text-red-700 space-y-1 text-xs">
                          <li>• Unverified source code</li>
                          <li>• Transfer functions blocked</li>
                          <li>• Honeypot mechanism</li>
                          <li>• Funds permanently trapped</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href="https://remix.ethereum.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Test in Remix
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href="https://docs.openzeppelin.com/contracts/4.x/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          OpenZeppelin Docs
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="verify" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Contract Address</label>
                <Input
                  placeholder="0x..."
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Compiler Version</label>
                  <Select value={compilerVersion} onValueChange={setCompilerVersion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v0.8.19+commit.7dd6d404">v0.8.19+commit.7dd6d404</SelectItem>
                      <SelectItem value="v0.8.18+commit.87f61d96">v0.8.18+commit.87f61d96</SelectItem>
                      <SelectItem value="v0.8.17+commit.8df45f5f">v0.8.17+commit.8df45f5f</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contract Name</label>
                  <Input
                    placeholder="MyContract"
                    value={contractName}
                    onChange={(e) => setContractName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Source Code</label>
                <Textarea
                  placeholder="Paste your Solidity source code here..."
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                  className="font-mono text-xs h-64"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Constructor Arguments (ABI-encoded)</label>
                <Input
                  placeholder="0x000000000000000000000000..."
                  value={constructorArgs}
                  onChange={(e) => setConstructorArgs(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>

              <Button onClick={handleVerifyContract} className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Submit for Verification
              </Button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm">
                  <p className="font-medium text-blue-800 mb-1">Development Workflow</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Use Remix IDE to compile and test your contracts</li>
                    <li>• Deploy to testnet first for thorough testing</li>
                    <li>• Submit verification here after mainnet deployment</li>
                    <li>• Verified contracts build user trust and transparency</li>
                  </ul>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href="https://remix.ethereum.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Open Remix IDE
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href="https://docs.etherscan.io/etherscan-v2/contract-verification"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Verification Guide
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}