import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Copy, CheckCircle, Upload, FileText, Search, AlertTriangle } from 'lucide-react';

export default function DepositContractAnalysis() {
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const [uploadedCode, setUploadedCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Analyze uploaded contract code
  const analyzeContract = () => {
    if (!uploadedCode.trim()) return;

    const analysis = {
      standard: detectTokenStandard(uploadedCode),
      compiler: extractCompilerVersion(uploadedCode),
      functions: extractFunctions(uploadedCode),
      imports: extractImports(uploadedCode),
      license: extractLicense(uploadedCode),
      hasConstructor: uploadedCode.includes('constructor'),
      isVerificationReady: checkVerificationReadiness(uploadedCode)
    };

    setAnalysisResult(analysis);
  };

  const detectTokenStandard = (code: string) => {
    if (code.includes('ERC1155')) return 'ERC-1155';
    if (code.includes('ERC721')) return 'ERC-721';
    if (code.includes('ERC20')) return 'ERC-20';
    if (code.includes('interface IERC')) return 'ERC Interface';
    return 'Custom/Unknown';
  };

  const extractCompilerVersion = (code: string) => {
    const match = code.match(/pragma\s+solidity\s+([^;]+);/);
    return match ? match[1] : 'Not specified';
  };

  const extractFunctions = (code: string) => {
    const functionMatches = code.match(/function\s+(\w+)/g);
    return functionMatches ? functionMatches.map(f => f.replace('function ', '')) : [];
  };

  const extractImports = (code: string) => {
    const importMatches = code.match(/import\s+[^;]+;/g);
    return importMatches || [];
  };

  const extractLicense = (code: string) => {
    const match = code.match(/SPDX-License-Identifier:\s*([^\n\r]*)/);
    return match ? match[1].trim() : 'Not specified';
  };

  const checkVerificationReadiness = (code: string) => {
    const checks = {
      hasLicense: code.includes('SPDX-License-Identifier'),
      hasPragma: code.includes('pragma solidity'),
      hasContract: code.includes('contract '),
      validSyntax: !code.includes('undefined') && !code.includes('null')
    };
    return Object.values(checks).every(Boolean);
  };

  // Common DepositContract template for reference
  const depositContractTemplate = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DepositContract
 * @dev Secure deposit contract for handling token deposits and withdrawals
 */
contract DepositContract is ReentrancyGuard, Ownable {
    
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public depositTimestamp;
    
    uint256 public minimumDeposit = 0.001 ether;
    uint256 public lockPeriod = 24 hours;
    
    event Deposit(address indexed depositor, uint256 amount, uint256 timestamp);
    event Withdrawal(address indexed depositor, uint256 amount, uint256 timestamp);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Deposit ETH into the contract
     */
    function deposit() external payable nonReentrant {
        require(msg.value >= minimumDeposit, "Deposit amount too low");
        
        deposits[msg.sender] += msg.value;
        depositTimestamp[msg.sender] = block.timestamp;
        
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }
    
    /**
     * @dev Withdraw deposited funds after lock period
     */
    function withdraw(uint256 amount) external nonReentrant {
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        require(
            block.timestamp >= depositTimestamp[msg.sender] + lockPeriod,
            "Funds still locked"
        );
        
        deposits[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        
        emit Withdrawal(msg.sender, amount, block.timestamp);
    }
    
    /**
     * @dev Get depositor balance
     */
    function getBalance(address depositor) external view returns (uint256) {
        return deposits[depositor];
    }
    
    /**
     * @dev Emergency withdrawal (owner only)
     */
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          DepositContract Analysis
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Analyze and Compare DepositContract with Your ETHGR Verification
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2 bg-purple-50 border-purple-300 text-purple-700">
          Contract Comparison & Verification Tool
        </Badge>
      </div>

      {/* Context Alert */}
      <Alert className="mb-8 border-2 border-blue-300 bg-blue-50">
        <FileText className="h-5 w-5 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Purpose:</strong> This tool helps analyze DepositContract.sol files from Etherscan 
          and compare them with your ETHGR contract verification needs. Upload or paste any contract 
          code to analyze its structure and verification requirements.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload Contract</TabsTrigger>
          <TabsTrigger value="analysis">Analysis Results</TabsTrigger>
          <TabsTrigger value="template">Deposit Template</TabsTrigger>
          <TabsTrigger value="comparison">ETHGR Comparison</TabsTrigger>
        </TabsList>

        {/* Upload Contract */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-6 w-6 mr-3" />
                Upload DepositContract Source Code
              </CardTitle>
              <CardDescription>
                Paste the contract code from your workspace or Etherscan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contract Source Code
                </label>
                <Textarea
                  placeholder="Paste your DepositContract.sol source code here..."
                  value={uploadedCode}
                  onChange={(e) => setUploadedCode(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={analyzeContract}
                  disabled={!uploadedCode.trim()}
                  className="flex-1"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Analyze Contract
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setUploadedCode(depositContractTemplate)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Load Template
                </Button>
              </div>

              <Alert className="bg-yellow-50 border-yellow-300">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>File Path Reference:</strong> You mentioned 
                  <code className="bg-yellow-100 px-1 rounded">\WORKSPACE\Etherscan\DepositContract\DepositContract.sol</code>
                  - paste that contract's code above for analysis.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analysis Results */}
        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {analysisResult ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded border">
                      <h3 className="font-semibold mb-2">Token Standard</h3>
                      <Badge variant="outline">{analysisResult.standard}</Badge>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded border">
                      <h3 className="font-semibold mb-2">Compiler Version</h3>
                      <code className="text-sm">{analysisResult.compiler}</code>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded border">
                      <h3 className="font-semibold mb-2">License</h3>
                      <span className="text-sm">{analysisResult.license}</span>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded border">
                      <h3 className="font-semibold mb-2">Verification Ready</h3>
                      <Badge variant={analysisResult.isVerificationReady ? "default" : "destructive"}>
                        {analysisResult.isVerificationReady ? "Ready" : "Needs Fixes"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Functions Found ({analysisResult.functions.length})</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.functions.map((func: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {func}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Imports ({analysisResult.imports.length})</h3>
                      <div className="space-y-1">
                        {analysisResult.imports.map((imp: string, index: number) => (
                          <code key={index} className="block text-xs bg-gray-100 p-1 rounded">
                            {imp}
                          </code>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No analysis results yet. Upload and analyze a contract first.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deposit Template */}
        <TabsContent value="template" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-6 w-6 mr-3" />
                Standard DepositContract Template
              </CardTitle>
              <CardDescription>
                Reference implementation for secure deposit contracts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">DepositContract.sol</h3>
                  <Button 
                    onClick={() => copyToClipboard(depositContractTemplate, 'template')}
                  >
                    {copiedStates['template'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Template
                  </Button>
                </div>
                
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>{depositContractTemplate}</code>
                </pre>

                <Alert className="bg-green-50 border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <AlertDescription className="text-green-800">
                    This template includes security features like ReentrancyGuard, proper access control, 
                    and event logging - essential for secure deposit contracts.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ETHGR Comparison */}
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>DepositContract vs ETHGR Verification</CardTitle>
              <CardDescription>
                How this relates to your ETHGR contract verification needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3">Your ETHGR Contracts</h3>
                  <ul className="text-blue-700 space-y-2 text-sm">
                    <li>• ERC-20 Recovery tokens</li>
                    <li>• Address: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308</li>
                    <li>• Solidity 0.8.19</li>
                    <li>• Need verification for "N/A" values</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-3">DepositContract Benefits</h3>
                  <ul className="text-purple-700 space-y-2 text-sm">
                    <li>• Security pattern reference</li>
                    <li>• Verification best practices</li>
                    <li>• OpenZeppelin integration</li>
                    <li>• Event logging standards</li>
                  </ul>
                </div>
              </div>

              <Alert className="bg-yellow-50 border-yellow-300">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Verification Strategy:</strong> If you have a DepositContract from Etherscan, 
                  you can use its verified structure as a reference for improving your ETHGR contract 
                  verification. The security patterns and compiler settings may provide insights.
                </AlertDescription>
              </Alert>

              <div className="text-center">
                <Button 
                  onClick={() => window.location.href = '/existing-contracts'}
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Return to ETHGR Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}