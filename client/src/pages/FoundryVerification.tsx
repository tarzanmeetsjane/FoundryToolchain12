import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, CheckCircle, Terminal, Code, ExternalLink, Zap } from 'lucide-react';

export default function FoundryVerification() {
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

  // Foundry project structure
  const foundryToml = `[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.19"
optimizer = false
optimizer_runs = 200

[etherscan]
mainnet = { key = "\${ETHERSCAN_API_KEY}" }

[rpc_endpoints]
mainnet = "\${RPC_URL}"`;

  // Your contract for Foundry
  const contractSource = `// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    event TokensMigrated(address indexed holder, uint256 amount);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {}
    
    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Unauthorized");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 amount = 1990000 * 10**18;
        
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    function migrateTrappedETHG(uint256 amount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(amount > 0, "Invalid amount");
        
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
    
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}`;

  // Verification commands
  const verifyCommand = `# Verify your already deployed contract on Sourcify
forge verify-contract \\
  --chain-id 1 \\
  --num-of-optimizations 200 \\
  --watch \\
  --constructor-args $(cast abi-encode "constructor()") \\
  --etherscan-api-key $ETHERSCAN_API_KEY \\
  --verifier sourcify \\
  0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`;

  const etherscanVerifyCommand = `# Alternative: Verify on Etherscan
forge verify-contract \\
  --chain-id 1 \\
  --num-of-optimizations 200 \\
  --watch \\
  --constructor-args $(cast abi-encode "constructor()") \\
  --etherscan-api-key $ETHERSCAN_API_KEY \\
  --verifier etherscan \\
  0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`;

  const setupCommands = `# 1. Initialize Foundry project
forge init ethgr-verification
cd ethgr-verification

# 2. Install OpenZeppelin
forge install OpenZeppelin/openzeppelin-contracts

# 3. Create your contract
mkdir -p src
# (paste contract code into src/ETHGRecovery.sol)

# 4. Set environment variables
export ETHERSCAN_API_KEY="your_etherscan_api_key"
export RPC_URL="https://mainnet.infura.io/v3/your_project_id"

# 5. Compile to generate metadata
forge build

# 6. Verify existing contract
forge verify-contract \\
  --chain-id 1 \\
  --num-of-optimizations 200 \\
  --constructor-args $(cast abi-encode "constructor()") \\
  --etherscan-api-key $ETHERSCAN_API_KEY \\
  --verifier sourcify \\
  0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`;

  const envExample = `# .env file
ETHERSCAN_API_KEY=your_etherscan_api_key_here
RPC_URL=https://mainnet.infura.io/v3/your_infura_project_id
PRIVATE_KEY=your_private_key_if_needed`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Foundry Contract Verification
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Professional Solution for Sourcify Metadata Issues
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2 bg-purple-50 border-purple-300 text-purple-700">
          Command-Line Verification Tools
        </Badge>
      </div>

      {/* Benefits */}
      <Alert className="mb-8 border-2 border-green-300 bg-green-50">
        <Zap className="h-5 w-5 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Foundry Advantage:</strong> Automatically generates proper metadata with IPFS CID, 
          handles all compilation settings, and supports both Sourcify and Etherscan verification. 
          This solves your metadata error completely.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="setup">Quick Setup</TabsTrigger>
          <TabsTrigger value="verify">Verify Contract</TabsTrigger>
          <TabsTrigger value="commands">All Commands</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why Foundry Solves Your Problem</CardTitle>
              <CardDescription>
                Professional blockchain development toolkit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3">Foundry Benefits</h3>
                  <ul className="text-blue-700 space-y-2 text-sm">
                    <li>• Automatic metadata generation with IPFS CID</li>
                    <li>• Built-in Sourcify verification support</li>
                    <li>• Handles all compiler settings correctly</li>
                    <li>• One-command verification process</li>
                    <li>• Works with existing deployed contracts</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3">Your Current Issue</h3>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li>• Contract address: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308</li>
                    <li>• Sourcify error: "No metadata IPFS CID"</li>
                    <li>• Portfolio showing "N/A" values</li>
                    <li>• Need proper verification for price recognition</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-4">What Foundry Will Do</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-purple-700">
                  <div className="text-center">
                    <Code className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-medium">Compile with Metadata</div>
                    <div className="text-xs">Generates IPFS CID automatically</div>
                  </div>
                  <div className="text-center">
                    <Terminal className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-medium">Verify on Sourcify</div>
                    <div className="text-xs">One command verification</div>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-medium">Fix Portfolio Values</div>
                    <div className="text-xs">Enable price recognition</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Setup */}
        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Install and Setup Foundry</CardTitle>
              <CardDescription>
                5-minute setup for contract verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Step 1: Install Foundry</h3>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <code className="text-green-400">curl -L https://foundry.paradigm.xyz | bash</code>
                  <br />
                  <code className="text-green-400">foundryup</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Step 2: Project Configuration</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">foundry.toml</span>
                  <Button 
                    size="sm"
                    onClick={() => copyToClipboard(foundryToml, 'foundry-toml')}
                  >
                    {copiedStates['foundry-toml'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Config
                  </Button>
                </div>
                <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg text-sm">
                  <code>{foundryToml}</code>
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Step 3: Environment Variables</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">.env file</span>
                  <Button 
                    size="sm"
                    onClick={() => copyToClipboard(envExample, 'env-example')}
                  >
                    {copiedStates['env-example'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy .env
                  </Button>
                </div>
                <pre className="bg-gray-900 text-cyan-400 p-4 rounded-lg text-sm">
                  <code>{envExample}</code>
                </pre>
              </div>

              <Alert className="bg-yellow-50 border-yellow-300">
                <Terminal className="h-5 w-5 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>API Keys Required:</strong> You'll need an Etherscan API key (free) and Infura project ID (free) 
                  to run verification commands. Both can be obtained quickly from their respective websites.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verify */}
        <TabsContent value="verify" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verify Your Deployed Contract</CardTitle>
              <CardDescription>
                Single command to verify on Sourcify or Etherscan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Contract Source Code</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">src/ETHGRecovery.sol</span>
                  <Button 
                    size="sm"
                    onClick={() => copyToClipboard(contractSource, 'contract-source')}
                  >
                    {copiedStates['contract-source'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Contract
                  </Button>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-64">
                  <code>{contractSource}</code>
                </pre>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Sourcify Verification</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-green-600">Recommended - Fixes metadata error</span>
                    <Button 
                      size="sm"
                      onClick={() => copyToClipboard(verifyCommand, 'sourcify-command')}
                    >
                      {copiedStates['sourcify-command'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      Copy Command
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs">
                    <code>{verifyCommand}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Etherscan Verification</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-600">Alternative option</span>
                    <Button 
                      size="sm"
                      onClick={() => copyToClipboard(etherscanVerifyCommand, 'etherscan-command')}
                    >
                      {copiedStates['etherscan-command'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      Copy Command
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-blue-400 p-3 rounded-lg text-xs">
                    <code>{etherscanVerifyCommand}</code>
                  </pre>
                </div>
              </div>

              <Alert className="bg-green-50 border-green-300">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Expected Result:</strong> Successful verification will resolve the "metadata IPFS CID" error 
                  and enable proper price recognition for your ETHGR tokens, fixing the "N/A" values in your portfolio.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Commands */}
        <TabsContent value="commands" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complete Command Reference</CardTitle>
              <CardDescription>
                Copy-paste commands for full setup and verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Complete Setup Commands</h3>
                  <Button 
                    onClick={() => copyToClipboard(setupCommands, 'setup-commands')}
                  >
                    {copiedStates['setup-commands'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy All Commands
                  </Button>
                </div>
                <pre className="bg-gray-900 text-cyan-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{setupCommands}</code>
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded border">
                  <h4 className="font-semibold text-blue-800">Your Contract Details</h4>
                  <div className="text-sm mt-2 space-y-1">
                    <div><strong>Address:</strong> 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308</div>
                    <div><strong>Compiler:</strong> 0.8.19</div>
                    <div><strong>Optimization:</strong> Disabled (200 runs)</div>
                    <div><strong>Constructor:</strong> No arguments</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded border">
                  <h4 className="font-semibold text-purple-800">Links & Resources</h4>
                  <div className="space-y-2 mt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open('https://book.getfoundry.sh/forge/deploying', '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Foundry Deployment Guide
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open('https://sourcify.dev/', '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Sourcify.dev
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}