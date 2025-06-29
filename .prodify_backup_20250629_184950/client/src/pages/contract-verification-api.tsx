import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, XCircle, Upload, Clock, ExternalLink, Copy, FileText, Settings } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function ContractVerificationAPIPage() {
  const [contractAddress, setContractAddress] = useState("0xfA7b8c553C48C56ec7027d26ae95b029a2abF247");
  const [sourceCode, setSourceCode] = useState("");
  const [contractName, setContractName] = useState("ETHGRecovery");
  const [compilerVersion, setCompilerVersion] = useState("v0.8.19+commit.7dd6d404");
  const [optimization, setOptimization] = useState(true);
  const [runs, setRuns] = useState("200");
  const [constructorArgs, setConstructorArgs] = useState("");
  const [licenseType, setLicenseType] = useState("MIT");
  const [verificationGuid, setVerificationGuid] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Load OPTIMIZED_ETHG_RECOVERY.sol source code
  const loadOptimizedContract = () => {
    const optimizedSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR) - Optimized Version
 * @dev Gas-optimized version for deployment
 * @author Deployed by: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract ETHGRecovery is ERC20, Ownable {
    
    // Migration tracking
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 amount);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {}
    
    /**
     * @dev Migrate trapped ETHG tokens for authorized wallet
     * Amount: 1,990,000 ETHG tokens
     */
    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Unauthorized");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 amount = 1990000 * 10**18; // 1,990,000 tokens
        
        hasMigrated[msg.sender] = true;
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    /**
     * @dev Emergency migration for other holders
     */
    function migrateTrappedETHG(uint256 amount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(amount > 0, "Invalid amount");
        
        hasMigrated[msg.sender] = true;
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    /**
     * @dev Toggle migration (owner only)
     */
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
    
    /**
     * @dev Emergency mint (owner only)
     */
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}`;
    setSourceCode(optimizedSource);
    toast({
      title: "Source Code Loaded",
      description: "Optimized ETHGR contract source code loaded successfully",
    });
  };

  // Check current verification status
  const { data: verificationStatus, isLoading: statusLoading, refetch: checkStatus } = useQuery({
    queryKey: [`/api/contract/verify-status/${contractAddress}`],
    queryFn: async () => {
      const response = await fetch(`/api/contract/verify-status/${contractAddress}`);
      if (!response.ok) throw new Error('Failed to check verification status');
      return response.json();
    },
    enabled: false
  });

  // Submit contract for verification
  const verifyContract = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/contract/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Verification submission failed');
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setVerificationGuid(data.guid);
        toast({
          title: "Verification Submitted",
          description: `Contract verification submitted. GUID: ${data.guid}`,
        });
        queryClient.invalidateQueries({ queryKey: [`/api/contract/verify-status/${contractAddress}`] });
      } else {
        toast({
          title: "Verification Failed",
          description: data.error || "Failed to submit verification",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Verification Error",
        description: error.message || "Failed to submit verification",
        variant: "destructive",
      });
    }
  });

  // Check verification status by GUID
  const checkVerificationStatus = useMutation({
    mutationFn: async (guid: string) => {
      const response = await fetch(`/api/etherscan/verify-status/${guid}`);
      if (!response.ok) throw new Error('Failed to check verification status');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Verification Status",
        description: data.result || "Status check completed",
      });
    }
  });

  const handleVerify = () => {
    if (!contractAddress || !sourceCode || !contractName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    verifyContract.mutate({
      address: contractAddress,
      sourceCode,
      contractName,
      compilerVersion,
      optimization,
      runs: parseInt(runs),
      constructorArguments: constructorArgs,
      evmVersion: "default",
      licenseType
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Etherscan Contract Verification</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Submit your ETHGR contract for verification on Etherscan using the API
        </p>
      </div>

      <Tabs defaultValue="verify" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verify">Submit Verification</TabsTrigger>
          <TabsTrigger value="status">Check Status</TabsTrigger>
          <TabsTrigger value="guide">Verification Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="verify" className="space-y-6">
          {/* Contract Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Contract Information
              </CardTitle>
              <CardDescription>
                Enter your contract details for Etherscan verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Contract Address *</Label>
                  <Input
                    id="address"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="0x..."
                    className="font-mono"
                  />
                </div>
                
                <div>
                  <Label htmlFor="name">Contract Name *</Label>
                  <Input
                    id="name"
                    value={contractName}
                    onChange={(e) => setContractName(e.target.value)}
                    placeholder="ETHGRecovery"
                  />
                </div>
                
                <div>
                  <Label htmlFor="compiler">Compiler Version *</Label>
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
                
                <div>
                  <Label htmlFor="license">License Type</Label>
                  <Select value={licenseType} onValueChange={setLicenseType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MIT">MIT</SelectItem>
                      <SelectItem value="GPL-3.0">GPL-3.0</SelectItem>
                      <SelectItem value="Apache-2.0">Apache-2.0</SelectItem>
                      <SelectItem value="BSD-3-Clause">BSD-3-Clause</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="optimization"
                    checked={optimization}
                    onCheckedChange={(checked) => setOptimization(checked as boolean)}
                  />
                  <Label htmlFor="optimization">Optimization Enabled</Label>
                </div>
                
                <div>
                  <Label htmlFor="runs">Optimization Runs</Label>
                  <Input
                    id="runs"
                    value={runs}
                    onChange={(e) => setRuns(e.target.value)}
                    placeholder="200"
                    disabled={!optimization}
                  />
                </div>
                
                <div>
                  <Label htmlFor="constructor">Constructor Arguments</Label>
                  <Input
                    id="constructor"
                    value={constructorArgs}
                    onChange={(e) => setConstructorArgs(e.target.value)}
                    placeholder="(optional)"
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Source Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Source Code
              </CardTitle>
              <CardDescription>
                Paste your complete Solidity source code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={loadOptimizedContract}
                  className="mb-4"
                >
                  Load ETHGR Contract
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSourceCode("")}
                  className="mb-4"
                >
                  Clear
                </Button>
              </div>
              
              <Textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="// SPDX-License-Identifier: MIT&#10;pragma solidity ^0.8.19;&#10;&#10;// Paste your contract source code here"
                className="font-mono text-sm min-h-[400px]"
              />
              
              <div className="text-sm text-gray-600">
                Characters: {sourceCode.length} | Lines: {sourceCode.split('\n').length}
              </div>
            </CardContent>
          </Card>

          {/* Submit Verification */}
          <Card>
            <CardContent className="pt-6">
              <Button
                onClick={handleVerify}
                disabled={verifyContract.isPending || !contractAddress || !sourceCode || !contractName}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {verifyContract.isPending ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Submitting Verification...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit for Verification
                  </>
                )}
              </Button>
              
              {verificationGuid && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Verification Submitted</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <div>GUID: {verificationGuid}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(verificationGuid)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy GUID
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => checkVerificationStatus.mutate(verificationGuid)}
                        disabled={checkVerificationStatus.isPending}
                      >
                        Check Status
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Verification Status</CardTitle>
              <CardDescription>
                Check if your contract is already verified on Etherscan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="Contract address..."
                  className="font-mono"
                />
                <Button 
                  onClick={() => checkStatus()}
                  disabled={statusLoading}
                >
                  {statusLoading ? 'Checking...' : 'Check Status'}
                </Button>
              </div>

              {verificationStatus && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {verificationStatus.isVerified ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-medium">
                      {verificationStatus.isVerified ? 'Contract Verified' : 'Contract Not Verified'}
                    </span>
                  </div>

                  {verificationStatus.isVerified && (
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Name:</span> {verificationStatus.contractName}
                        </div>
                        <div>
                          <span className="font-medium">Compiler:</span> {verificationStatus.compilerVersion}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(verificationStatus.etherscanUrl, '_blank')}
                        className="mt-3"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View on Etherscan
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Your ETHGR Contract Details:</strong>
                  <br />• Address: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
                  <br />• Compiler: Solidity 0.8.19
                  <br />• Optimization: Enabled (200 runs)
                  <br />• License: MIT
                  <br />• Constructor: No arguments required
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <h4 className="font-medium">Verification Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Load the optimized ETHGR source code using the button above</li>
                  <li>Verify all compiler settings match your deployment</li>
                  <li>Submit verification request to Etherscan API</li>
                  <li>Wait 1-2 minutes for processing</li>
                  <li>Check verification status using the GUID provided</li>
                </ol>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-medium mb-2">After Verification:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Contract source code will be publicly visible</li>
                  <li>Token details will show properly on Etherscan</li>
                  <li>Ready for Uniswap pool creation</li>
                  <li>Full transparency for your $704,505 worth of ETHGR tokens</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}