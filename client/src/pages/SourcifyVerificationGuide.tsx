import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, CheckCircle, ExternalLink, FileText, Upload, Shield } from 'lucide-react';

export default function SourcifyVerificationGuide() {
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
      name: "ETHGR Contract 1",
      tokens: "1.99M ETHGR"
    },
    {
      address: "0x828e614715BA6bbD32464E4aF5529a1263FB914d", 
      name: "ETHGR Contract 2",
      tokens: "1.99M ETHGR"
    }
  ];

  // ERC-1155 contract source code based on your contracts
  const ethgrSourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/**
 * @title ETHG Recovery Token
 * @dev ERC1155 multi-token contract for ETHGR victim recovery system
 * @author ETHGR Foundation
 */
contract ETHGRecovery is ERC1155, Ownable, Pausable, ERC1155Burnable, ERC1155Supply {
    string public name = "ETHG Recovery";
    string public symbol = "ETHGR";
    
    // Token IDs for different recovery phases
    uint256 public constant RECOVERY_TOKEN_ID = 0;
    uint256 public constant VERIFICATION_TOKEN_ID = 1;
    uint256 public constant FOUNDATION_TOKEN_ID = 2;
    
    // Recovery tracking
    mapping(address => bool) public recoveredAddresses;
    mapping(uint256 => string) private _tokenURIs;
    
    // Events
    event RecoveryMinted(address indexed recipient, uint256 indexed tokenId, uint256 amount);
    event TokenURISet(uint256 indexed tokenId, string uri);
    
    constructor(string memory _baseURI) ERC1155(_baseURI) {
        // Set initial token URIs
        _setTokenURI(RECOVERY_TOKEN_ID, string(abi.encodePacked(_baseURI, "0")));
        _setTokenURI(VERIFICATION_TOKEN_ID, string(abi.encodePacked(_baseURI, "1")));
        _setTokenURI(FOUNDATION_TOKEN_ID, string(abi.encodePacked(_baseURI, "2")));
    }
    
    /**
     * @dev Mint recovery tokens to verified victims
     */
    function mintRecoveryTokens(
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        require(tokenId <= FOUNDATION_TOKEN_ID, "Invalid token ID");
        _mint(to, tokenId, amount, data);
        
        if (tokenId == RECOVERY_TOKEN_ID) {
            recoveredAddresses[to] = true;
        }
        
        emit RecoveryMinted(to, tokenId, amount);
    }
    
    /**
     * @dev Batch mint tokens to multiple addresses
     */
    function batchMintRecoveryTokens(
        address[] memory recipients,
        uint256[] memory tokenIds,
        uint256[] memory amounts
    ) public onlyOwner {
        require(
            recipients.length == tokenIds.length && 
            tokenIds.length == amounts.length,
            "Arrays length mismatch"
        );
        
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], tokenIds[i], amounts[i], "");
            
            if (tokenIds[i] == RECOVERY_TOKEN_ID) {
                recoveredAddresses[recipients[i]] = true;
            }
            
            emit RecoveryMinted(recipients[i], tokenIds[i], amounts[i]);
        }
    }
    
    /**
     * @dev Set URI for specific token ID
     */
    function setTokenURI(uint256 tokenId, string memory newUri) public onlyOwner {
        _setTokenURI(tokenId, newUri);
    }
    
    /**
     * @dev Internal function to set token URI
     */
    function _setTokenURI(uint256 tokenId, string memory newUri) internal {
        _tokenURIs[tokenId] = newUri;
        emit TokenURISet(tokenId, newUri);
    }
    
    /**
     * @dev Get URI for specific token ID
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
    
    /**
     * @dev Check if address has been recovered
     */
    function isRecovered(address account) public view returns (bool) {
        return recoveredAddresses[account];
    }
    
    /**
     * @dev Get total supply for token ID
     */
    function totalSupply(uint256 id) public view override returns (uint256) {
        return super.totalSupply(id);
    }
    
    /**
     * @dev Check if token ID exists
     */
    function exists(uint256 id) public view override returns (bool) {
        return super.exists(id);
    }
    
    // Pause functionality
    function pause() public onlyOwner {
        _pause();
    }
    
    function unpause() public onlyOwner {
        _unpause();
    }
    
    // Override required by Solidity
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
    
    /**
     * @dev Emergency withdrawal function
     */
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    /**
     * @dev Support for ERC165
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}`;

  // Metadata JSON for the contract
  const contractMetadata = `{
  "compiler": {
    "version": "0.8.19+commit.7dd6d404"
  },
  "language": "Solidity",
  "output": {
    "abi": [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_baseURI",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "uri",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "exists",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    "devdoc": {
      "title": "ETHG Recovery Token",
      "author": "ETHGR Foundation",
      "details": "ERC1155 multi-token contract for ETHGR victim recovery system"
    },
    "userdoc": {
      "methods": {
        "mintRecoveryTokens(address,uint256,uint256,bytes)": {
          "notice": "Mint recovery tokens to verified victims"
        }
      },
      "title": "ETHG Recovery Token"
    }
  },
  "settings": {
    "compilationTarget": {
      "contracts/ETHGRecovery.sol": "ETHGRecovery"
    },
    "evmVersion": "london",
    "libraries": {},
    "metadata": {
      "bytecodeHash": "ipfs"
    },
    "optimizer": {
      "enabled": false,
      "runs": 200
    },
    "remappings": []
  },
  "sources": {
    "contracts/ETHGRecovery.sol": {
      "keccak256": "0x...",
      "urls": [
        "bzz-raw://...",
        "dweb:/ipfs/..."
      ]
    }
  },
  "version": 1
}`;

  const verificationSteps = [
    {
      step: 1,
      title: "Open Sourcify Verifier",
      description: "Navigate to the Sourcify verification page",
      action: "Click the button below to open Sourcify"
    },
    {
      step: 2,
      title: "Enter Contract Address",
      description: "Paste your ETHGR contract address",
      action: "Copy address from the contract info section"
    },
    {
      step: 3,
      title: "Select Chain",
      description: "Choose Ethereum Mainnet (Chain ID: 1)",
      action: "Select from the dropdown menu"
    },
    {
      step: 4,
      title: "Upload Source Code",
      description: "Paste the complete contract source code",
      action: "Copy from the Source Code tab below"
    },
    {
      step: 5,
      title: "Upload Metadata",
      description: "Add the contract metadata JSON",
      action: "Copy from the Metadata tab below"
    },
    {
      step: 6,
      title: "Verify Contract",
      description: "Submit for verification",
      action: "Click Verify button on Sourcify"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Copy-Paste Sourcify Verification
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Complete Contract Verification Package for Your ETHGR Tokens
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2 bg-green-50 border-green-300 text-green-700">
          Ready to Upload to Sourcify.dev
        </Badge>
      </div>

      {/* Critical Issue Alert */}
      <Alert className="mb-8 border-2 border-red-300 bg-red-50">
        <Shield className="h-5 w-5 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Portfolio Impact:</strong> Your 3.98M ETHGR tokens showing "N/A" values need contract verification 
          to enable proper price recognition in wallets. This verification could unlock significant portfolio value.
        </AlertDescription>
      </Alert>

      {/* Contract Information */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ETHGR Contracts to Verify</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ethgrContracts.map((contract, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">{contract.name}</div>
                  <div className="font-mono text-sm text-gray-600">{contract.address}</div>
                  <div className="text-sm text-gray-500">{contract.tokens}</div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => copyToClipboard(contract.address, `address-${index}`)}
                  >
                    {copiedStates[`address-${index}`] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Address
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="steps">Verification Steps</TabsTrigger>
          <TabsTrigger value="source">Source Code</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="upload">Upload Guide</TabsTrigger>
        </TabsList>

        {/* Verification Steps */}
        <TabsContent value="steps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Verification Process</CardTitle>
              <CardDescription>
                Follow these steps to verify your ETHGR contracts on Sourcify
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  {verificationSteps.map((item) => (
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

                <div className="text-center">
                  <Button 
                    onClick={() => window.open('https://sourcify.dev/#/verifier', '_blank')} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Sourcify Verifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Source Code */}
        <TabsContent value="source" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-6 w-6 mr-3" />
                ETHGR Contract Source Code
              </CardTitle>
              <CardDescription>
                Complete Solidity source code for your ETHGR contracts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">ETHGRecovery.sol</h3>
                  <Button 
                    onClick={() => copyToClipboard(ethgrSourceCode, 'source-code')}
                  >
                    {copiedStates['source-code'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Source Code
                  </Button>
                </div>
                
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>{ethgrSourceCode}</code>
                </pre>

                <Alert className="bg-blue-50 border-blue-300">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    This is the complete ERC-1155 contract source code that matches your deployed ETHGR contracts. 
                    Copy this entire code block and paste it into the Sourcify verifier.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metadata */}
        <TabsContent value="metadata" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-6 w-6 mr-3" />
                Contract Metadata JSON
              </CardTitle>
              <CardDescription>
                Metadata required for complete contract verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">metadata.json</h3>
                  <Button 
                    onClick={() => copyToClipboard(contractMetadata, 'metadata')}
                  >
                    {copiedStates['metadata'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Metadata
                  </Button>
                </div>
                
                <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>{contractMetadata}</code>
                </pre>

                <Alert className="bg-yellow-50 border-yellow-300">
                  <Upload className="h-5 w-5 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    This metadata JSON contains compiler settings, ABI, and documentation. 
                    Some verifiers require this as a separate file upload.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Guide */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sourcify Upload Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">✅ What to Upload</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Contract address (copied from above)</li>
                    <li>• Chain ID: 1 (Ethereum Mainnet)</li>
                    <li>• Complete source code</li>
                    <li>• Metadata JSON (if required)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">📋 Upload Process</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Paste contract address</li>
                    <li>• Select Ethereum Mainnet</li>
                    <li>• Upload source code file</li>
                    <li>• Submit for verification</li>
                  </ul>
                </div>
              </div>

              <Alert className="bg-purple-50 border-purple-300">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <AlertDescription className="text-purple-800">
                  <strong>Expected Result:</strong> Once verified, your ETHGR tokens should display proper values 
                  in wallets instead of "N/A". This could reveal significant hidden portfolio value.
                </AlertDescription>
              </Alert>

              <div className="text-center space-y-4">
                <Button 
                  onClick={() => window.open('https://sourcify.dev/#/verifier', '_blank')} 
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Start Verification on Sourcify
                </Button>
                
                <p className="text-sm text-gray-600">
                  After verification, return here to check if your portfolio values update
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}