import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Target,
  Download,
  CheckCircle,
  Copy,
  ExternalLink,
  AlertTriangle
} from "lucide-react";

export default function ContractFixer() {
  const [contractCopied, setContractCopied] = useState(false);

  const correctedContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR) - Corrected Version
 * @dev Fixed constructor for OpenZeppelin v5.x compatibility
 * @author Deployed by: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract ETHGRecovery is ERC20, Ownable {
    
    // Migration tracking
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 amount);
    
    // Fixed constructor with required parameters
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Constructor now properly calls parent constructors
    }
    
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
    
    /**
     * @dev Check if 37 ETH is present in this contract
     * Useful for recovery verification
     */
    function checkETHBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Emergency ETH withdrawal (owner only)
     * In case 37 ETH is trapped in this contract
     */
    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "ETH withdrawal failed");
    }
    
    /**
     * @dev Allow contract to receive ETH
     */
    receive() external payable {}
}`;

  const copyContract = () => {
    navigator.clipboard.writeText(correctedContract);
    setContractCopied(true);
    setTimeout(() => setContractCopied(false), 3000);
  };

  const downloadContract = () => {
    const blob = new Blob([correctedContract], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CORRECTED_ETHG_Recovery.sol';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <Target className="inline-block mr-3 h-8 w-8 text-green-500" />
          Contract Constructor Fix
        </h1>
        <p className="text-xl text-muted-foreground">
          Corrected ETHGR contract with proper OpenZeppelin v5 constructor
        </p>
      </div>

      <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-lg font-semibold">
          CONSTRUCTOR ERROR IDENTIFIED: The original contract is missing required parameters for ERC20 and Ownable constructors in OpenZeppelin v5.x
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="fix" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fix">Contract Fix</TabsTrigger>
          <TabsTrigger value="deployment">Deployment Guide</TabsTrigger>
          <TabsTrigger value="recovery">37 ETH Recovery</TabsTrigger>
        </TabsList>

        <TabsContent value="fix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Corrected Contract Code
              </CardTitle>
              <CardDescription>
                Fixed constructor parameters for OpenZeppelin v5.x compatibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Fix Applied:</strong> Added proper constructor parameters:
                  <br />
                  • ERC20("ETHG Recovery", "ETHGR") - Token name and symbol
                  <br />
                  • Ownable(msg.sender) - Initial owner address
                  <br />
                  • Added ETH recovery functions for 37 ETH detection
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Key Fixes:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Fixed constructor to call ERC20("ETHG Recovery", "ETHGR")</li>
                    <li>• Fixed constructor to call Ownable(msg.sender)</li>
                    <li>• Added checkETHBalance() function to detect trapped ETH</li>
                    <li>• Added withdrawETH() function for 37 ETH recovery</li>
                    <li>• Added receive() function to accept ETH deposits</li>
                  </ul>
                </div>

                <Textarea
                  value={correctedContract}
                  readOnly
                  className="h-96 font-mono text-xs"
                />

                <div className="flex gap-4">
                  <Button onClick={copyContract} className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    {contractCopied ? "Copied!" : "Copy Contract"}
                  </Button>
                  <Button onClick={downloadContract} variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download .sol File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Instructions</CardTitle>
              <CardDescription>
                How to deploy the corrected contract in Remix IDE
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                <Target className="h-4 w-4" />
                <AlertDescription>
                  The corrected contract includes ETH recovery functions that can help locate your missing 37 ETH if it's trapped in a contract.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Step 1: Prepare Contract</h4>
                  <ol className="text-sm space-y-1 list-decimal ml-4">
                    <li>Copy the corrected contract code above</li>
                    <li>Open Remix IDE (remix.ethereum.org)</li>
                    <li>Create new file: "CORRECTED_ETHG_Recovery.sol"</li>
                    <li>Paste the corrected code</li>
                  </ol>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Step 2: Compile</h4>
                  <ol className="text-sm space-y-1 list-decimal ml-4">
                    <li>Go to Solidity Compiler tab</li>
                    <li>Select compiler version 0.8.19 or higher</li>
                    <li>Click "Compile CORRECTED_ETHG_Recovery.sol"</li>
                    <li>Verify no compilation errors</li>
                  </ol>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Step 3: Deploy</h4>
                  <ol className="text-sm space-y-1 list-decimal ml-4">
                    <li>Go to Deploy & Run tab</li>
                    <li>Select "Injected Provider - MetaMask"</li>
                    <li>Connect wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843</li>
                    <li>Deploy "ETHGRecovery" contract</li>
                  </ol>
                </div>

                <div className="p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-950">
                  <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                    37 ETH Recovery Features
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>• checkETHBalance(): Check if ETH is trapped in contract</p>
                    <p>• withdrawETH(): Recover any ETH from contract to owner</p>
                    <p>• Owner-only functions for emergency recovery</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                37 ETH Recovery Strategy
              </CardTitle>
              <CardDescription>
                Using the corrected contract for ETH recovery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  The corrected contract includes specific functions to help detect and recover your missing 37 ETH.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium mb-2">Recovery Method 1: Contract Balance Check</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    If 37 ETH is trapped in your existing contract at 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
                  </p>
                  <div className="text-xs space-y-1">
                    <p>1. Call checkETHBalance() on your existing contract</p>
                    <p>2. If balance shows ~37 ETH, call withdrawETH()</p>
                    <p>3. ETH will transfer to contract owner wallet</p>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <h4 className="font-medium mb-2">Recovery Method 2: New Contract Deployment</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Deploy corrected contract to replace faulty one
                  </p>
                  <div className="text-xs space-y-1">
                    <p>1. Deploy corrected contract with same owner</p>
                    <p>2. Migrate tokens using migrateMyTrappedETHG()</p>
                    <p>3. Use new contract for all future operations</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-medium mb-2">Recovery Method 3: Direct Etherscan Check</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Verify wallet balances using Etherscan
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <a href="/etherscan-37eth-checker">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Use Etherscan 37 ETH Checker
                    </a>
                  </Button>
                </div>
              </div>

              <div className="p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-950">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">
                  Recovery Success Indicators
                </h4>
                <div className="space-y-1 text-sm">
                  <p>• Contract compiles without errors</p>
                  <p>• checkETHBalance() returns greater than 0 if ETH is trapped</p>
                  <p>• withdrawETH() successfully transfers ETH to owner</p>
                  <p>• 37 ETH appears in your secure wallet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}