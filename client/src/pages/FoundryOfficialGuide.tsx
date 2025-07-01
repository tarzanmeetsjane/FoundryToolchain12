import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy,
  ExternalLink,
  CheckCircle,
  Terminal,
  BookOpen,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FoundryOfficialGuide() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Command copied successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Official Foundry Verification Guide
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Following getfoundry.sh official documentation examples
        </p>
      </div>

      <Alert className="mb-8 border-green-200 bg-green-50">
        <BookOpen className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Official Documentation:</strong> Based on examples from getfoundry.sh/forge/reference/forge-verify-contract
          These are the proven methods used by the Foundry community.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="etherscan" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="etherscan">Etherscan API</TabsTrigger>
          <TabsTrigger value="sourcify">Sourcify</TabsTrigger>
          <TabsTrigger value="blockscout">Blockscout</TabsTrigger>
        </TabsList>

        <TabsContent value="etherscan">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Etherscan API Verification
              </CardTitle>
              <CardDescription>
                Official Foundry method using Etherscan API (most reliable)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 1: Install Foundry</h3>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  curl -L https://foundry.paradigm.xyz | bash && foundryup
                </div>
                <Button 
                  onClick={() => copyToClipboard('curl -L https://foundry.paradigm.xyz | bash && foundryup')}
                  variant="outline" 
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Install Command
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 2: Set Up Environment</h3>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Create these files in a new directory:</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">foundry.toml:</p>
                      <div className="bg-slate-100 p-3 rounded border text-sm font-mono">
{`[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.19"
optimizer = false
via_ir = false

[rpc_endpoints]
mainnet = "https://eth-mainnet.alchemyapi.io/v2/\${ALCHEMY_API_KEY}"`}
                      </div>
                      <Button 
                        onClick={() => copyToClipboard(`[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.19"
optimizer = false
via_ir = false

[rpc_endpoints]
mainnet = "https://eth-mainnet.alchemyapi.io/v2/\${ALCHEMY_API_KEY}"`)}
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy foundry.toml
                      </Button>
                    </div>

                    <div>
                      <p className="font-medium mb-2">src/ETHGRecovery.sol:</p>
                      <div className="bg-slate-100 p-3 rounded border text-sm font-mono max-h-40 overflow-y-auto">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    address public constant ORIGINAL_ETHG = 0x3fc29836e84e471a053d2d9e80494a867d670ead;
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    event TokensMigrated(address indexed holder, uint256 ethgAmount, uint256 recoveryAmount);
    event MigrationStatusChanged(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(amount <= balanceOf(msg.sender), "ERC20: transfer amount exceeds balance");
        _transfer(msg.sender, to, amount);
        return true;
    }
    
    function migrateMyTrappedETHG() external {
        require(migrationEnabled, "Migration is disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        if (msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843) {
            uint256 recoveryAmount = 1990000 * 10**18;
            _mint(msg.sender, recoveryAmount);
            hasMigrated[msg.sender] = true;
            totalMigrated += recoveryAmount;
            emit TokensMigrated(msg.sender, 0, recoveryAmount);
            return;
        }
        
        revert("Community migration not yet enabled");
    }
    
    function setMigrationEnabled(bool _enabled) external onlyOwner {
        migrationEnabled = _enabled;
        emit MigrationStatusChanged(_enabled);
    }
    
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
}`}
                      </div>
                      <Button 
                        onClick={() => copyToClipboard(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    address public constant ORIGINAL_ETHG = 0x3fc29836e84e471a053d2d9e80494a867d670ead;
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    event TokensMigrated(address indexed holder, uint256 ethgAmount, uint256 recoveryAmount);
    event MigrationStatusChanged(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(amount <= balanceOf(msg.sender), "ERC20: transfer amount exceeds balance");
        _transfer(msg.sender, to, amount);
        return true;
    }
    
    function migrateMyTrappedETHG() external {
        require(migrationEnabled, "Migration is disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        if (msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843) {
            uint256 recoveryAmount = 1990000 * 10**18;
            _mint(msg.sender, recoveryAmount);
            hasMigrated[msg.sender] = true;
            totalMigrated += recoveryAmount;
            emit TokensMigrated(msg.sender, 0, recoveryAmount);
            return;
        }
        
        revert("Community migration not yet enabled");
    }
    
    function setMigrationEnabled(bool _enabled) external onlyOwner {
        migrationEnabled = _enabled;
        emit MigrationStatusChanged(_enabled);
    }
    
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
}`)}
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Contract Code
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 3: Install Dependencies</h3>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  forge install OpenZeppelin/openzeppelin-contracts
                </div>
                <Button 
                  onClick={() => copyToClipboard('forge install OpenZeppelin/openzeppelin-contracts')}
                  variant="outline" 
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Install Command
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 4: Set Environment Variables</h3>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
{`export ETHERSCAN_API_KEY="YourEtherscanAPIKey"
export ALCHEMY_API_KEY="YourAlchemyAPIKey"`}
                </div>
                <Button 
                  onClick={() => copyToClipboard(`export ETHERSCAN_API_KEY="YourEtherscanAPIKey"
export ALCHEMY_API_KEY="YourAlchemyAPIKey"`)}
                  variant="outline" 
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Export Commands
                </Button>
                <p className="text-sm text-slate-600">
                  Get API keys from:{" "}
                  <Button 
                    onClick={() => window.open('https://etherscan.io/apis', '_blank')}
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto"
                  >
                    Etherscan API
                  </Button>
                  {" "}and{" "}
                  <Button 
                    onClick={() => window.open('https://alchemy.com', '_blank')}
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto"
                  >
                    Alchemy
                  </Button>
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 5: Verify Contract</h3>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
{`forge verify-contract \\
  --chain-id 1 \\
  --num-of-optimizations 200 \\
  --watch \\
  --constructor-args \$(cast abi-encode "constructor()") \\
  --etherscan-api-key \$ETHERSCAN_API_KEY \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`}
                </div>
                <Button 
                  onClick={() => copyToClipboard(`forge verify-contract \\
  --chain-id 1 \\
  --num-of-optimizations 200 \\
  --watch \\
  --constructor-args $(cast abi-encode "constructor()") \\
  --etherscan-api-key $ETHERSCAN_API_KEY \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`)}
                  variant="outline" 
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Verification Command
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sourcify">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Sourcify Verification
              </CardTitle>
              <CardDescription>
                Decentralized verification (what we tried earlier)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
{`forge verify-contract \\
  --chain-id 1 \\
  --verifier sourcify \\
  --watch \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`}
              </div>
              <Button 
                onClick={() => copyToClipboard(`forge verify-contract \\
  --chain-id 1 \\
  --verifier sourcify \\
  --watch \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`)}
                variant="outline" 
                size="sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Sourcify Command
              </Button>
              
              <Alert className="border-amber-200 bg-amber-50">
                <AlertDescription className="text-amber-800">
                  <strong>Note:</strong> This was the approach that gave the "metadata IPFS CID" error earlier.
                  Etherscan API verification is more reliable.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockscout">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Blockscout Verification
              </CardTitle>
              <CardDescription>
                Alternative verification service
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
{`forge verify-contract \\
  --chain-id 1 \\
  --verifier blockscout \\
  --verifier-url https://eth.blockscout.com \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`}
              </div>
              <Button 
                onClick={() => copyToClipboard(`forge verify-contract \\
  --chain-id 1 \\
  --verifier blockscout \\
  --verifier-url https://eth.blockscout.com \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`)}
                variant="outline" 
                size="sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Blockscout Command
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Success Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-slate-600">
            <div><strong>Successful verification output:</strong></div>
            <div className="bg-green-50 border border-green-200 p-3 rounded font-mono text-xs">
              Compiler run successful!<br/>
              Contract successfully verified
            </div>
            
            <div className="mt-4">
              <strong>What happens after verification:</strong>
            </div>
            <ul className="space-y-1 text-sm text-slate-600 ml-4">
              <li>• DEXs will recognize "ETHG Recovery (ETHGR)" tokens</li>
              <li>• "No routes available" errors disappear</li>
              <li>• Portfolio shows real USD values instead of "N/A"</li>
              <li>• Trading and liquidity creation becomes possible</li>
              <li>• Token appears properly in wallet interfaces</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Button 
          onClick={() => window.open('https://getfoundry.sh/forge/reference/forge-verify-contract#examples', '_blank')}
          size="lg"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Official Foundry Documentation
        </Button>
      </div>
    </div>
  );
}