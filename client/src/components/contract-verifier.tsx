import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Copy,
  FileCode,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

interface ContractInfo {
  address: string;
  isVerified: boolean;
  sourcecode: string;
  contractName: string;
  compilerVersion: string;
  optimization: boolean;
  runs: number;
  constructorArguments?: string;
  evmVersion: string;
  licenseType: string;
  proxy: boolean;
  implementation?: string;
}

export function ContractVerifier() {
  const [contractAddress, setContractAddress] = useState("");
  const [compilerVersion, setCompilerVersion] = useState("v0.8.19+commit.7dd6d404");
  const [optimization, setOptimization] = useState(true);
  const [runs, setRuns] = useState(200);
  const [sourceCode, setSourceCode] = useState("");
  const [constructorArgs, setConstructorArgs] = useState("");
  const [contractName, setContractName] = useState("");
  const [licenseType, setLicenseType] = useState("MIT");
  const [evmVersion, setEvmVersion] = useState("default");
  const { toast } = useToast();

  // Fetch contract verification status
  const { data: contractInfo, isLoading } = useQuery({
    queryKey: ['/api/contract/verify-status', contractAddress],
    queryFn: async () => {
      if (!contractAddress || contractAddress.length !== 42) return null;
      
      const response = await fetch(`/api/contract/verify-status/${contractAddress}`);
      if (!response.ok) throw new Error('Failed to fetch contract info');
      return response.json();
    },
    enabled: !!contractAddress && contractAddress.length === 42,
    refetchInterval: 30000
  });

  const checkContractStatus = async () => {
    if (!contractAddress || contractAddress.length !== 42) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Ethereum contract address",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Checking Status",
      description: "Fetching contract verification status from Etherscan..."
    });
  };

  const submitForVerification = async () => {
    if (!contractAddress || !sourceCode || !contractName) {
      toast({
        title: "Missing Information",
        description: "Please provide contract address, source code, and contract name",
        variant: "destructive"
      });
      return;
    }

    const verificationData = {
      address: contractAddress,
      sourceCode,
      contractName,
      compilerVersion,
      optimization,
      runs: optimization ? runs : 0,
      constructorArguments: constructorArgs,
      evmVersion,
      licenseType
    };

    try {
      const response = await fetch('/api/contract/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(verificationData)
      });

      if (!response.ok) {
        throw new Error('Verification submission failed');
      }

      const result = await response.json();
      
      toast({
        title: "Verification Submitted",
        description: "Contract verification request has been sent to Etherscan. Check status in a few minutes."
      });

    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Unable to submit verification request. Please check your data.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Content copied to clipboard"
    });
  };

  const openInEtherscan = () => {
    if (contractAddress) {
      window.open(`https://etherscan.io/address/${contractAddress}`, '_blank');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Contract Verification
        </CardTitle>
        <CardDescription>
          Verify smart contracts on Etherscan using source code and compilation settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Contract address (0x...)"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="font-mono"
            />
            <Button onClick={checkContractStatus} disabled={isLoading}>
              <Search className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={openInEtherscan}
              disabled={!contractAddress}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          {contractInfo && (
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Verification Status:</span>
                    <Badge variant={contractInfo.isVerified ? "default" : "secondary"}>
                      {contractInfo.isVerified ? (
                        <><CheckCircle className="w-3 h-3 mr-1" /> Verified</>
                      ) : (
                        <><AlertCircle className="w-3 h-3 mr-1" /> Not Verified</>
                      )}
                    </Badge>
                  </div>
                  
                  {contractInfo.isVerified && (
                    <>
                      <div className="flex items-center justify-between">
                        <span>Contract Name:</span>
                        <span className="font-mono text-sm">{contractInfo.contractName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Compiler:</span>
                        <span className="font-mono text-sm">{contractInfo.compilerVersion}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Optimization:</span>
                        <Badge variant="outline">
                          {contractInfo.optimization ? `Enabled (${contractInfo.runs} runs)` : 'Disabled'}
                        </Badge>
                      </div>
                      {contractInfo.proxy && (
                        <div className="flex items-center justify-between">
                          <span>Proxy Contract:</span>
                          <Badge variant="default">Yes</Badge>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="verify" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="verify">Verify Contract</TabsTrigger>
            <TabsTrigger value="guide">Verification Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="verify" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Contract Name</label>
                <Input
                  placeholder="MyContract"
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                />
              </div>

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
                    <SelectItem value="v0.8.16+commit.07c72cc5">v0.8.16+commit.07c72cc5</SelectItem>
                    <SelectItem value="v0.8.15+commit.e14f2714">v0.8.15+commit.e14f2714</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Optimization</label>
                <Select value={optimization.toString()} onValueChange={(v) => setOptimization(v === "true")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Enabled</SelectItem>
                    <SelectItem value="false">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {optimization && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Optimization Runs</label>
                  <Input
                    type="number"
                    value={runs}
                    onChange={(e) => setRuns(parseInt(e.target.value))}
                    placeholder="200"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">EVM Version</label>
                <Select value={evmVersion} onValueChange={setEvmVersion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="berlin">Berlin</SelectItem>
                    <SelectItem value="istanbul">Istanbul</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="BSD-3-Clause">BSD-3-Clause</SelectItem>
                    <SelectItem value="Unlicense">Unlicense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Source Code</label>
              <Textarea
                placeholder="Paste your Solidity source code here..."
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                className="font-mono text-xs h-40"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Constructor Arguments (ABI-encoded)</label>
              <Textarea
                placeholder="0x000000000000000000000000..."
                value={constructorArgs}
                onChange={(e) => setConstructorArgs(e.target.value)}
                className="font-mono text-xs h-20"
              />
            </div>

            <Button onClick={submitForVerification} className="w-full">
              Submit for Verification
            </Button>
          </TabsContent>

          <TabsContent value="guide" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileCode className="w-5 h-5" />
                    Verification Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">1. Prepare Source Code</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensure your source code is flattened if using multiple files. Remove any unused imports.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">2. Match Compilation Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the exact compiler version, optimization settings, and EVM version used during deployment.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">3. Constructor Arguments</h4>
                    <p className="text-sm text-muted-foreground">
                      If your contract has constructor parameters, provide the ABI-encoded arguments.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">4. Submit & Wait</h4>
                    <p className="text-sm text-muted-foreground">
                      Verification typically takes 1-2 minutes. Check status on Etherscan after submission.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Remix Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    You can also verify contracts directly from Remix IDE:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>1. Deploy your contract in Remix</p>
                    <p>2. Go to the "File Explorer" plugin</p>
                    <p>3. Right-click on your contract file</p>
                    <p>4. Select "Verify on Etherscan"</p>
                    <p>5. Follow the plugin prompts</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-3"
                    onClick={() => window.open('https://docs.etherscan.io/etherscan-v2/contract-verification/verify-with-remix', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Remix Verification Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}