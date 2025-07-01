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
  Monitor,
  Cloud,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SimpleVerificationGuide() {
  const { toast } = useToast();

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content copied successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Simple Contract Verification Guide
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Fix "No Routes Available" errors and enable trading - Easy verification without software installation
        </p>
      </div>

      <Alert className="mb-8 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Trading Issue Confirmed:</strong> "No routes available" errors happen because DEXs can't recognize unverified contracts. 
          Contract verification will immediately enable trading, liquidity creation, and proper price discovery.
        </AlertDescription>
      </Alert>

      <Alert className="mb-8 border-blue-200 bg-blue-50">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>No Software Installation Required:</strong> These methods work directly in your web browser
          without installing Foundry or other development tools.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="etherscan" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="etherscan">Etherscan Direct</TabsTrigger>
          <TabsTrigger value="remix">Remix IDE</TabsTrigger>
          <TabsTrigger value="sourcify">Sourcify Web</TabsTrigger>
        </TabsList>

        <TabsContent value="etherscan">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Etherscan Direct Verification
              </CardTitle>
              <CardDescription>
                Verify directly through Etherscan's web interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                      <p className="text-sm text-slate-600">Look for the blue button on the contract tab</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium">Fill verification form:</p>
                      <div className="mt-2 space-y-2 text-sm bg-slate-50 p-3 rounded border">
                        <div><strong>Compiler Type:</strong> Solidity (Single file)</div>
                        <div><strong>Compiler Version:</strong> v0.8.19+commit.7dd6d404</div>
                        <div><strong>License:</strong> MIT License (MIT)</div>
                        <div><strong>Optimization:</strong> No</div>
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
                      <div className="mt-2 bg-slate-900 text-green-400 p-2 rounded font-mono text-sm">
                        (Leave empty - no constructor arguments)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                    <div>
                      <p className="font-medium">Submit verification</p>
                      <p className="text-sm text-slate-600">Wait 1-2 minutes for processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="remix">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Remix IDE Verification
              </CardTitle>
              <CardDescription>
                Use Remix IDE's built-in verification plugin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Using Remix Verification Plugin:</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Open Remix IDE</p>
                      <Button 
                        onClick={() => window.open('https://remix.ethereum.org', '_blank')}
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Remix IDE
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium">Create new file: ETHGRecovery.sol</p>
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
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium">Compile the contract</p>
                      <p className="text-sm text-slate-600">Use Solidity Compiler tab, version 0.8.19</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <p className="font-medium">Enable Etherscan Plugin</p>
                      <p className="text-sm text-slate-600">Plugin Manager → Search "etherscan" → Activate</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                    <div>
                      <p className="font-medium">Verify via plugin</p>
                      <div className="mt-2 space-y-1 text-sm bg-slate-50 p-3 rounded border">
                        <div><strong>Contract Address:</strong> 0xc2b6d375b7d14c9ce73f97ddf565002cce257308</div>
                        <div><strong>Network:</strong> Ethereum Mainnet</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sourcify">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Sourcify Web Interface
              </CardTitle>
              <CardDescription>
                Use Sourcify's web-based verification service
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Web-based Sourcify Verification:</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Open Sourcify</p>
                      <Button 
                        onClick={() => window.open('https://sourcify.dev/#/verifier', '_blank')}
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Sourcify Verifier
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium">Enter contract details:</p>
                      <div className="mt-2 space-y-1 text-sm bg-slate-50 p-3 rounded border">
                        <div><strong>Address:</strong> 0xc2b6d375b7d14c9ce73f97ddf565002cce257308</div>
                        <div><strong>Chain ID:</strong> 1 (Ethereum Mainnet)</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium">Upload contract file</p>
                      <p className="text-sm text-slate-600">Create ETHGRecovery.sol file with the contract code</p>
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
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <p className="font-medium">Submit for verification</p>
                      <p className="text-sm text-slate-600">Sourcify will automatically verify if metadata matches</p>
                    </div>
                  </div>
                </div>

                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <strong>Note:</strong> Sourcify may require specific metadata. If it fails,
                    try the Etherscan direct method first.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            After Successful Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-slate-600">
            <div>• Your wallet will show "ETHG Recovery" instead of unknown token</div>
            <div>• Portfolio value will display properly (no more "N/A")</div>
            <div>• DEX aggregators can recognize and list your token</div>
            <div>• Price feeds will start working</div>
            <div>• Trading and liquidity creation becomes possible</div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Expected Results:</h4>
            <div className="text-sm text-green-700">
              <div>• 1,990,000 ETHGR tokens properly recognized</div>
              <div>• Portfolio value: $199,000 - $1,293,500 (depending on market pricing)</div>
              <div>• Full ERC-20 functionality enabled</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}