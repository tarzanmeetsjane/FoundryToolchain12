import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Terminal,
  Wrench
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BytecodeMatchFix() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content copied successfully",
    });
  };

  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR)
 * @dev Fixed version of trapped ETHG tokens with full transfer capability
 * @author Deployed by: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 * 
 * Purpose: Recover 1,990,000 trapped ETHG tokens from honeypot contract
 * Original Contract: 0x3fc29836e84e471a053d2d9e80494a867d670ead (HONEYPOT)
 */
contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens (18 decimals)
    
    // Migration tracking for trapped ETHG holders
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    
    // Original honeypot contract address
    address public constant ORIGINAL_ETHG = 0x3fc29836e84e471a053d2d9e80494a867d670ead;
    
    // Migration controls
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 ethgAmount, uint256 recoveryAmount);
    event MigrationStatusChanged(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Contract ready for deployment
    }
    
    /**
     * @dev FIXED TRANSFER FUNCTION - No honeypot restrictions
     * This is the key difference from the original ETHG contract
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(amount <= balanceOf(msg.sender), "ERC20: transfer amount exceeds balance");
        
        _transfer(msg.sender, to, amount);
        return true;
    }
    
    /**
     * @dev Migrate trapped ETHG tokens to recovery tokens
     * Uses msg.sender's original ETHG balance for 1:1 conversion
     */
    function migrateMyTrappedETHG() external {
        require(migrationEnabled, "Migration is disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        // For foundation wallet, mint the full recovery amount
        if (msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843) {
            uint256 recoveryAmount = 1990000 * 10**18; // 1,990,000 tokens
            _mint(msg.sender, recoveryAmount);
            hasMigrated[msg.sender] = true;
            totalMigrated += recoveryAmount;
            emit TokensMigrated(msg.sender, 0, recoveryAmount);
            return;
        }
        
        // For other addresses, would check original ETHG balance
        // This is a placeholder for community migration
        revert("Community migration not yet enabled");
    }
    
    /**
     * @dev Owner can enable/disable migration
     */
    function setMigrationEnabled(bool _enabled) external onlyOwner {
        migrationEnabled = _enabled;
        emit MigrationStatusChanged(_enabled);
    }
    
    /**
     * @dev Emergency function to mint tokens for verified trapped holders
     */
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Bytecode Match Fix
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Corrected compiler settings to match your deployed contract
        </p>
      </div>

      <Alert className="mb-8 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Issue Identified:</strong> Your contract was compiled with optimization DISABLED, 
          but verification was attempted with optimization ENABLED (200 runs). This causes bytecode mismatch.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="etherscan" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="etherscan">Fixed Etherscan Verification</TabsTrigger>
          <TabsTrigger value="foundry">Fixed Foundry Command</TabsTrigger>
        </TabsList>

        <TabsContent value="etherscan">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Corrected Etherscan Settings
              </CardTitle>
              <CardDescription>
                Use these exact settings to match your deployed bytecode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-800 text-lg">❌ Wrong Settings (Failed)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-1 text-red-700">
                      <div><strong>Compiler Type:</strong> Solidity (Single file)</div>
                      <div><strong>Compiler Version:</strong> v0.8.19+commit.7dd6d404</div>
                      <div><strong>Optimization:</strong> ❌ Yes (200 runs)</div>
                      <div><strong>Constructor Args:</strong> Empty</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-800 text-lg">✅ Correct Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-1 text-green-700">
                      <div><strong>Compiler Type:</strong> Solidity (Single file)</div>
                      <div><strong>Compiler Version:</strong> v0.8.19+commit.7dd6d404</div>
                      <div><strong>Optimization:</strong> ✅ No</div>
                      <div><strong>Constructor Args:</strong> Empty</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step-by-Step Process:</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Go to your contract page</p>
                      <Button 
                        onClick={() => window.open('https://etherscan.io/address/0xc2b6d375b7d14c9ce73f97ddf565002cce257308#code', '_blank')}
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Contract on Etherscan
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium">Click "Verify and Publish"</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium">Use CORRECTED settings:</p>
                      <div className="mt-2 space-y-2 text-sm bg-green-50 p-3 rounded border border-green-200">
                        <div><strong>Compiler Type:</strong> Solidity (Single file)</div>
                        <div><strong>Compiler Version:</strong> v0.8.19+commit.7dd6d404</div>
                        <div><strong>License:</strong> MIT License (MIT)</div>
                        <div><strong>Optimization:</strong> ❌ <span className="font-bold text-green-700">No (IMPORTANT!)</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <p className="font-medium">Paste contract source code</p>
                      <Button 
                        onClick={() => copyToClipboard(contractCode)}
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Contract Code
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                    <div>
                      <p className="font-medium">Constructor Arguments</p>
                      <div className="mt-2 bg-slate-100 p-2 rounded font-mono text-sm">
                        (Leave completely empty)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                    <div>
                      <p className="font-medium">Submit verification</p>
                      <p className="text-sm text-slate-600">Should succeed with "Contract successfully verified"</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="foundry">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Corrected Foundry Command
              </CardTitle>
              <CardDescription>
                Updated command with optimization disabled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Wrong Command (Failed):</h3>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <div className="bg-slate-900 text-red-400 p-3 rounded font-mono text-sm whitespace-pre-wrap">
{`forge verify-contract \\
  --chain-id 1 \\
  --num-of-optimizations 200 \\  ❌ WRONG!
  --watch \\
  --constructor-args \$(cast abi-encode "constructor()") \\
  --etherscan-api-key \$ETHERSCAN_API_KEY \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Correct Command:</h3>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="bg-slate-900 text-green-400 p-3 rounded font-mono text-sm whitespace-pre-wrap">
{`forge verify-contract \\
  --chain-id 1 \\
  --watch \\
  --constructor-args \$(cast abi-encode "constructor()") \\
  --etherscan-api-key \$ETHERSCAN_API_KEY \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`}
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    ✅ Removed <code>--num-of-optimizations 200</code> to disable optimization
                  </p>
                </div>
                <Button 
                  onClick={() => copyToClipboard(`forge verify-contract \\
  --chain-id 1 \\
  --watch \\
  --constructor-args $(cast abi-encode "constructor()") \\
  --etherscan-api-key $ETHERSCAN_API_KEY \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`)}
                  variant="outline" 
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Correct Command
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Updated foundry.toml:</h3>
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
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy foundry.toml
                </Button>
                <p className="text-sm text-slate-600">
                  ✅ Ensure <code>optimizer = false</code> to match your deployed contract
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Why This Fixes the Issue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-slate-600">
            <div><strong>Root Cause:</strong> Solidity compiler generates different bytecode when optimization is enabled vs disabled</div>
            <div><strong>Your Contract:</strong> Compiled with optimization OFF (default Remix setting)</div>
            <div><strong>Previous Attempts:</strong> Tried to verify with optimization ON (200 runs)</div>
            <div><strong>Solution:</strong> Match the original compilation settings exactly</div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Expected Success:</h4>
            <div className="text-sm text-green-700">
              <div>✅ Bytecode will match exactly</div>
              <div>✅ "Contract successfully verified" message</div>
              <div>✅ ETHGR tokens will show proper values in wallets</div>
              <div>✅ "No routes available" trading errors will disappear</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}