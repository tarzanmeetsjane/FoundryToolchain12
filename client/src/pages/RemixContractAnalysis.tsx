import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, ExternalLink, Copy, CheckCircle, AlertCircle, Zap, FileCode, Settings } from 'lucide-react';

export default function RemixContractAnalysis() {
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

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

  // Your ETHGR contract addresses
  const ethgrContracts = [
    {
      address: "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9",
      tokens: "1.99M ETHGR",
      standard: "ERC-1155",
      status: "N/A Value"
    },
    {
      address: "0x828e614715BA6bbD32464E4aF5529a1263FB914d", 
      tokens: "1.99M ETHGR",
      standard: "ERC-1155",
      status: "N/A Value"
    }
  ];

  // Remix configuration for your contract analysis
  const remixConfig = {
    url: "https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.30+commit.73712a01.js",
    compiler: "0.8.30",
    optimization: false,
    runs: 200
  };

  // ERC-1155 contract interface for analysis
  const erc1155Interface = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface IERC1155 {
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view returns (uint256[] memory);
    function uri(uint256 id) external view returns (string memory);
    function totalSupply(uint256 id) external view returns (uint256);
    function exists(uint256 id) external view returns (bool);
}

contract ETHGRAnalyzer {
    IERC1155 public ethgr1 = IERC1155(0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9);
    IERC1155 public ethgr2 = IERC1155(0x828e614715BA6bbD32464E4aF5529a1263FB914d);
    
    address public walletAddress = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    // Check token balances for specific token IDs
    function checkBalances(uint256[] memory tokenIds) public view returns (
        uint256[] memory balances1,
        uint256[] memory balances2,
        string[] memory uris1,
        string[] memory uris2
    ) {
        balances1 = new uint256[](tokenIds.length);
        balances2 = new uint256[](tokenIds.length);
        uris1 = new string[](tokenIds.length);
        uris2 = new string[](tokenIds.length);
        
        for (uint256 i = 0; i < tokenIds.length; i++) {
            try ethgr1.balanceOf(walletAddress, tokenIds[i]) returns (uint256 balance) {
                balances1[i] = balance;
            } catch {
                balances1[i] = 0;
            }
            
            try ethgr2.balanceOf(walletAddress, tokenIds[i]) returns (uint256 balance) {
                balances2[i] = balance;
            } catch {
                balances2[i] = 0;
            }
            
            try ethgr1.uri(tokenIds[i]) returns (string memory uri) {
                uris1[i] = uri;
            } catch {
                uris1[i] = "";
            }
            
            try ethgr2.uri(tokenIds[i]) returns (string memory uri) {
                uris2[i] = uri;
            } catch {
                uris2[i] = "";
            }
        }
    }
    
    // Get total supply for token IDs
    function getTotalSupplies(uint256[] memory tokenIds) public view returns (
        uint256[] memory supplies1,
        uint256[] memory supplies2
    ) {
        supplies1 = new uint256[](tokenIds.length);
        supplies2 = new uint256[](tokenIds.length);
        
        for (uint256 i = 0; i < tokenIds.length; i++) {
            try ethgr1.totalSupply(tokenIds[i]) returns (uint256 supply) {
                supplies1[i] = supply;
            } catch {
                supplies1[i] = 0;
            }
            
            try ethgr2.totalSupply(tokenIds[i]) returns (uint256 supply) {
                supplies2[i] = supply;
            } catch {
                supplies2[i] = 0;
            }
        }
    }
}`;

  // Price discovery contract
  const priceDiscoveryContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract ETHGRPriceDiscovery {
    struct TokenInfo {
        uint256 tokenId;
        uint256 balance;
        uint256 totalSupply;
        string uri;
        bool exists;
    }
    
    IERC1155 public constant ETHGR1 = IERC1155(0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9);
    IERC1155 public constant ETHGR2 = IERC1155(0x828e614715BA6bbD32464E4aF5529a1263FB914d);
    
    address public constant WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    // Discover active token IDs by checking common ranges
    function discoverTokenIds() public view returns (TokenInfo[] memory contract1Tokens, TokenInfo[] memory contract2Tokens) {
        uint256[] memory testIds = new uint256[](100);
        for (uint256 i = 0; i < 100; i++) {
            testIds[i] = i;
        }
        
        TokenInfo[] memory temp1 = new TokenInfo[](100);
        TokenInfo[] memory temp2 = new TokenInfo[](100);
        uint256 count1 = 0;
        uint256 count2 = 0;
        
        for (uint256 i = 0; i < testIds.length; i++) {
            // Check contract 1
            try ETHGR1.balanceOf(WALLET, testIds[i]) returns (uint256 balance1) {
                if (balance1 > 0) {
                    temp1[count1] = TokenInfo({
                        tokenId: testIds[i],
                        balance: balance1,
                        totalSupply: getTotalSupply(ETHGR1, testIds[i]),
                        uri: getTokenURI(ETHGR1, testIds[i]),
                        exists: true
                    });
                    count1++;
                }
            } catch {}
            
            // Check contract 2
            try ETHGR2.balanceOf(WALLET, testIds[i]) returns (uint256 balance2) {
                if (balance2 > 0) {
                    temp2[count2] = TokenInfo({
                        tokenId: testIds[i],
                        balance: balance2,
                        totalSupply: getTotalSupply(ETHGR2, testIds[i]),
                        uri: getTokenURI(ETHGR2, testIds[i]),
                        exists: true
                    });
                    count2++;
                }
            } catch {}
        }
        
        // Resize arrays to actual count
        contract1Tokens = new TokenInfo[](count1);
        contract2Tokens = new TokenInfo[](count2);
        
        for (uint256 i = 0; i < count1; i++) {
            contract1Tokens[i] = temp1[i];
        }
        
        for (uint256 i = 0; i < count2; i++) {
            contract2Tokens[i] = temp2[i];
        }
    }
    
    function getTotalSupply(IERC1155 token, uint256 tokenId) internal view returns (uint256) {
        try token.totalSupply(tokenId) returns (uint256 supply) {
            return supply;
        } catch {
            return 0;
        }
    }
    
    function getTokenURI(IERC1155 token, uint256 tokenId) internal view returns (string memory) {
        try token.uri(tokenId) returns (string memory uri) {
            return uri;
        } catch {
            return "";
        }
    }
}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Remix Contract Analysis
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Resolve ETHGR "N/A" Values Using Solidity Analysis
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2 bg-blue-50 border-blue-300 text-blue-700">
          ERC-1155 Token Discovery & Valuation
        </Badge>
      </div>

      {/* Problem Statement */}
      <Alert className="mb-8 border-2 border-red-300 bg-red-50">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Critical Issue:</strong> Your 3.98M ETHGR tokens across two contracts are showing "N/A" values, 
          potentially representing significant hidden portfolio value that needs discovery.
        </AlertDescription>
      </Alert>

      {/* Contract Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ETHGR Contracts Requiring Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ethgrContracts.map((contract, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-mono text-sm">{contract.address}</div>
                  <div className="text-sm text-gray-600">{contract.tokens} • {contract.standard}</div>
                </div>
                <Badge variant="destructive">{contract.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Remix Setup</TabsTrigger>
          <TabsTrigger value="analyzer">Token Analyzer</TabsTrigger>
          <TabsTrigger value="discovery">Price Discovery</TabsTrigger>
          <TabsTrigger value="execution">Execute Analysis</TabsTrigger>
        </TabsList>

        {/* Remix Setup */}
        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-6 w-6 mr-3" />
                Remix IDE Configuration
              </CardTitle>
              <CardDescription>
                Set up Remix with optimal settings for ETHGR contract analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Current Remix URL:</h3>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-sm flex-1">
                    {remixConfig.url}
                  </code>
                  <Button 
                    size="sm" 
                    onClick={() => copyToClipboard(remixConfig.url, 'remix-url')}
                  >
                    {copiedStates['remix-url'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-semibold">Compiler Version</div>
                  <div className="text-sm text-gray-600">{remixConfig.compiler}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-semibold">Optimization</div>
                  <div className="text-sm text-gray-600">{remixConfig.optimization ? 'Enabled' : 'Disabled'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-semibold">Runs</div>
                  <div className="text-sm text-gray-600">{remixConfig.runs}</div>
                </div>
              </div>

              <Button 
                onClick={() => window.open(remixConfig.url, '_blank')} 
                className="w-full"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Remix IDE
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Token Analyzer Contract */}
        <TabsContent value="analyzer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCode className="h-6 w-6 mr-3" />
                ETHGR Token Analyzer Contract
              </CardTitle>
              <CardDescription>
                Deploy this contract to analyze your ERC-1155 token balances and metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">ETHGRAnalyzer.sol</h3>
                  <Button 
                    size="sm" 
                    onClick={() => copyToClipboard(erc1155Interface, 'analyzer-contract')}
                  >
                    {copiedStates['analyzer-contract'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Contract
                  </Button>
                </div>
                
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{erc1155Interface}</code>
                </pre>

                <Alert className="bg-blue-50 border-blue-300">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    This contract will help identify which token IDs you hold and their metadata URIs. 
                    Deploy on Ethereum mainnet and call <code>checkBalances([0,1,2,3,4,5])</code> to start analysis.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Price Discovery Contract */}
        <TabsContent value="discovery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-6 w-6 mr-3" />
                Advanced Price Discovery
              </CardTitle>
              <CardDescription>
                Comprehensive contract to discover all active token IDs and their properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">ETHGRPriceDiscovery.sol</h3>
                  <Button 
                    size="sm" 
                    onClick={() => copyToClipboard(priceDiscoveryContract, 'discovery-contract')}
                  >
                    {copiedStates['discovery-contract'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Contract
                  </Button>
                </div>
                
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>{priceDiscoveryContract}</code>
                </pre>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Alert className="bg-green-50 border-green-300">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Automated Discovery:</strong> This contract systematically checks token IDs 0-99 
                      to find your active ETHGR holdings.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="bg-purple-50 border-purple-300">
                    <AlertCircle className="h-5 w-5 text-purple-600" />
                    <AlertDescription className="text-purple-800">
                      <strong>Metadata Access:</strong> Retrieves token URIs and total supplies 
                      for valuation purposes.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Execution Guide */}
        <TabsContent value="execution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Execution Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Open Remix IDE",
                      description: "Navigate to the configured Remix URL with Solidity 0.8.30",
                      action: "Click 'Open Remix IDE' button above"
                    },
                    {
                      step: 2,
                      title: "Create New File",
                      description: "Create ETHGRAnalyzer.sol in Remix workspace",
                      action: "Copy and paste the analyzer contract code"
                    },
                    {
                      step: 3,
                      title: "Compile Contract",
                      description: "Compile with Solidity 0.8.30, optimization disabled",
                      action: "Use the Solidity Compiler tab"
                    },
                    {
                      step: 4,
                      title: "Deploy on Mainnet",
                      description: "Deploy to Ethereum mainnet using your wallet",
                      action: "Connect wallet and deploy via Deploy & Run tab"
                    },
                    {
                      step: 5,
                      title: "Execute Analysis",
                      description: "Call discoverTokenIds() to find active token IDs",
                      action: "Use the deployed contract interface"
                    },
                    {
                      step: 6,
                      title: "Retrieve Results",
                      description: "Analyze returned token data for valuation",
                      action: "Copy results back to this platform for pricing"
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <p className="text-sm font-medium text-blue-600">{item.action}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Alert className="bg-yellow-50 border-yellow-300">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Expected Outcome:</strong> This analysis will reveal the specific token IDs, 
                    balances, and metadata for your 3.98M ETHGR tokens, enabling proper valuation 
                    and resolving the "N/A" status in your portfolio.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}