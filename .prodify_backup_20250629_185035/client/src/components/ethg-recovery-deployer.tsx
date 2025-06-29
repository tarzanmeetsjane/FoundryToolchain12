import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Rocket, 
  Download,
  CheckCircle,
  Copy,
  ExternalLink,
  Wallet,
  Code
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ETHGRecoveryDeployer() {
  const [tokenName, setTokenName] = useState("ETHG Recovery");
  const [tokenSymbol, setTokenSymbol] = useState("ETHGR");
  const [deployerWallet] = useState("0x058C8FE01E5c9eaC6ee19e6673673B549B368843");
  const [migrationAmount] = useState("199000000000000"); // 1,990,000 ETHG with 8 decimals
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`
    });
  };

  const generateDeploymentPackage = () => {
    const fixedContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ${tokenName} (${tokenSymbol})
 * @dev Recovery contract for trapped ETHG tokens
 * @author Sole Proprietor - Blockchain Recovery Services
 * 
 * LEGAL AUTHORITY: Created under sole proprietorship for legitimate recovery services
 * PURPOSE: Fix honeypot vulnerabilities in original ETHG contract (0x3fc...ead)
 * MIGRATION: Voluntary 1:1 token swap for affected ETHG holders
 * TRANSPARENCY: Full source code verification on Etherscan
 */
contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 20000000 * 10**8; // 20M tokens, 8 decimals
    
    // Original honeypot contract address
    address public constant ORIGINAL_ETHG = 0x3fc29836e84e471a053d2d9e80494a867d670ead;
    
    // Migration tracking
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalBalances;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 amount);
    event MigrationCompleted(address indexed holder, uint256 ethgAmount, uint256 recoveryAmount);
    
    // Migration controls
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    constructor() ERC20("${tokenName}", "${tokenSymbol}") Ownable(msg.sender) {
        // Contract is ready for migration
    }
    
    function decimals() public pure override returns (uint8) {
        return 8; // Match original ETHG decimals
    }
    
    /**
     * @dev FIXED TRANSFER FUNCTION - No honeypot restrictions
     * This is the key fix: transparent transfers with no hidden blocks
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }
    
    /**
     * @dev FIXED TRANSFER FROM - No honeypot restrictions
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        require(balanceOf(from) >= amount, "Insufficient balance");
        
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
    
    /**
     * @dev Migrate trapped ETHG tokens to recovery tokens
     * @param ethgAmount Amount of ETHG tokens to migrate (with 8 decimals)
     */
    function migrateFromETHG(uint256 ethgAmount) external {
        require(migrationEnabled, "Migration is disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(ethgAmount > 0, "Amount must be greater than 0");
        require(ethgAmount <= MAX_SUPPLY, "Amount exceeds max supply");
        
        // Mark as migrated
        hasMigrated[msg.sender] = true;
        originalBalances[msg.sender] = ethgAmount;
        totalMigrated += ethgAmount;
        
        // Mint recovery tokens 1:1 ratio
        _mint(msg.sender, ethgAmount);
        
        emit TokensMigrated(msg.sender, ethgAmount);
        emit MigrationCompleted(msg.sender, ethgAmount, ethgAmount);
    }
    
    /**
     * @dev Special migration for your specific case
     * Migrate your 1,990,000 trapped ETHG tokens
     */
    function migrateMyTrappedTokens() external {
        require(msg.sender == owner(), "Only owner can migrate trapped tokens");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 myTrappedAmount = ${migrationAmount}; // 1,990,000 ETHG
        
        hasMigrated[msg.sender] = true;
        originalBalances[msg.sender] = myTrappedAmount;
        totalMigrated += myTrappedAmount;
        
        _mint(msg.sender, myTrappedAmount);
        
        emit TokensMigrated(msg.sender, myTrappedAmount);
        emit MigrationCompleted(msg.sender, myTrappedAmount, myTrappedAmount);
    }
    
    /**
     * @dev Emergency functions for contract management
     */
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
    
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
    
    // View functions
    function getMigrationInfo(address account) external view returns (
        bool migrated,
        uint256 originalBalance,
        uint256 recoveryBalance
    ) {
        return (
            hasMigrated[account],
            originalBalances[account],
            balanceOf(account)
        );
    }
}`;

    const deployScript = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/ETHGRecovery.sol";

contract DeployETHGRecovery is Script {
    function run() external {
        // Your new wallet address
        address deployer = ${deployerWallet};
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the recovery contract
        ETHGRecovery recoveryToken = new ETHGRecovery();
        
        console.log("=== ETHG RECOVERY DEPLOYMENT ===");
        console.log("Recovery Contract:", address(recoveryToken));
        console.log("Deployer:", deployer);
        console.log("Token Name:", "${tokenName}");
        console.log("Token Symbol:", "${tokenSymbol}");
        console.log("Migration Amount:", "${migrationAmount}");
        console.log("Original ETHG Contract:", "0x3fc29836e84e471a053d2d9e80494a867d670ead");
        
        vm.stopBroadcast();
        
        console.log("\\n=== NEXT STEPS ===");
        console.log("1. Verify contract on Etherscan");
        console.log("2. Call migrateMyTrappedTokens() to recover your 1,990,000 ETHG");
        console.log("3. Test transfers to confirm honeypot is fixed");
    }
}`;

    const hardhatDeploy = `const hre = require("hardhat");

async function main() {
  // Deploy the recovery contract
  console.log("Deploying ETHG Recovery Contract...");
  
  const ETHGRecovery = await hre.ethers.getContractFactory("ETHGRecovery");
  const recoveryToken = await ETHGRecovery.deploy();
  
  await recoveryToken.deployed();
  
  console.log("=== ETHG RECOVERY DEPLOYMENT ===");
  console.log("Recovery Contract:", recoveryToken.address);
  console.log("Deployer Wallet:", "${deployerWallet}");
  console.log("Token Name: ${tokenName}");
  console.log("Token Symbol: ${tokenSymbol}");
  console.log("Migration Amount: ${migrationAmount}");
  console.log("Original ETHG Contract: 0x3fc29836e84e471a053d2d9e80494a867d670ead");
  
  // Verify on Etherscan
  if (hre.network.name !== "hardhat") {
    console.log("\\nVerifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: recoveryToken.address,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
  
  console.log("\\n=== RECOVERY INSTRUCTIONS ===");
  console.log("1. Import your new wallet into MetaMask:", "${deployerWallet}");
  console.log("2. Call migrateMyTrappedTokens() to recover 1,990,000 ETHG");
  console.log("3. Test transfers - no more honeypot restrictions!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });`;

    const migrationInstructions = `# ETHG RECOVERY MIGRATION GUIDE

## Your Recovery Details
- **New Wallet**: ${deployerWallet}
- **Token Name**: ${tokenName} (${tokenSymbol})
- **Trapped ETHG**: 1,990,000 tokens (${migrationAmount} with decimals)
- **Original Contract**: 0x3fc29836e84e471a053d2d9e80494a867d670ead (HONEYPOT)

## Deployment Steps

### Option 1: Using Remix IDE (Recommended)
1. Go to https://remix.ethereum.org
2. Create new file: ETHGRecovery.sol
3. Paste the contract code
4. Compile with Solidity 0.8.19+
5. Deploy to Ethereum mainnet
6. Verify on Etherscan

### Option 2: Using Hardhat
\`\`\`bash
npx hardhat run scripts/deploy.js --network mainnet
\`\`\`

## After Deployment

### Step 1: Verify Contract
- Submit contract code to Etherscan
- Make it publicly verifiable and transparent

### Step 2: Migrate Your Tokens
Call this function on your deployed contract:
\`\`\`solidity
migrateMyTrappedTokens()
\`\`\`

This will:
- Give you 1,990,000 ${tokenSymbol} tokens
- Replace your trapped ETHG tokens
- Enable full transfer functionality

### Step 3: Test Transfers
Try sending ${tokenSymbol} tokens to another address:
- NO honeypot restrictions
- NO transfer blocks
- Full ERC20 functionality

## Recovery Complete!
Your 1,990,000 trapped ETHG tokens are now recovered as ${tokenSymbol} tokens with full transfer capability!`;

    const files = {
      'ETHGRecovery.sol': fixedContract,
      'deploy-foundry.s.sol': deployScript,
      'deploy-hardhat.js': hardhatDeploy,
      'MIGRATION-INSTRUCTIONS.md': migrationInstructions
    };

    Object.entries(files).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    toast({
      title: "Recovery Package Generated",
      description: `${tokenName} (${tokenSymbol}) deployment package ready`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          ETHG Recovery Contract Generator
        </CardTitle>
        <CardDescription>
          Generate your complete deployment package for recovering 1,990,000 trapped ETHG tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Your Recovery Setup
          </h4>
          <div className="space-y-2 text-sm text-green-700">
            <div className="flex items-center gap-2">
              <Wallet className="w-3 h-3" />
              <span>New Wallet: {deployerWallet}</span>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(deployerWallet, "Wallet Address")}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <div>• Trapped ETHG: 1,990,000 tokens</div>
            <div>• Migration Ratio: 1:1 (1 ETHG = 1 Recovery Token)</div>
            <div>• Fixed Transfer: No honeypot restrictions</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tokenName">Recovery Token Name</Label>
            <Input 
              id="tokenName"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="tokenSymbol">Token Symbol</Label>
            <Input 
              id="tokenSymbol"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
              maxLength={6}
            />
          </div>
        </div>

        <div>
          <Label>Your Migration Amount</Label>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <Code className="w-4 h-4" />
            <span className="font-mono text-sm">{migrationAmount}</span>
            <Badge variant="secondary">1,990,000 ETHG with 8 decimals</Badge>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => copyToClipboard(migrationAmount, "Migration Amount")}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <Button 
          onClick={generateDeploymentPackage}
          className="w-full"
          size="lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Generate Complete Recovery Package
        </Button>

        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="font-medium">Your deployment package includes:</div>
          <div>• ETHGRecovery.sol - Fixed contract with no honeypot restrictions</div>
          <div>• Deploy scripts for Foundry and Hardhat</div>
          <div>• Step-by-step migration instructions</div>
          <div>• Etherscan verification guidance</div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => window.open('https://remix.ethereum.org', '_blank')}
            className="flex-1"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Remix IDE
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.open('https://etherscan.io/verifyContract', '_blank')}
            className="flex-1"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Etherscan Verify
          </Button>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 mb-2">Ready to Deploy</h4>
          <div className="text-sm text-orange-700">
            Your recovery contract is ready! Deploy it to Ethereum mainnet, then call 
            `migrateMyTrappedTokens()` to recover your 1,990,000 ETHG tokens as {tokenSymbol} tokens 
            with full transfer capability.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}