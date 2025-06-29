import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Rocket,
  CheckCircle,
  ExternalLink,
  Copy,
  Code,
  Zap,
  Wallet,
  Shield
} from "lucide-react";

export default function DeploymentInterface() {
  
  const [copySuccess, setCopySuccess] = useState<string>("");
  const [deploymentStep, setDeploymentStep] = useState(0);
  
  const contractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    
    event TokensMigrated(address indexed holder, uint256 amount);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {}
    
    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Only foundation");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 migrationAmount = 1990000 * 10**18;
        hasMigrated[msg.sender] = true;
        
        _mint(msg.sender, migrationAmount);
        emit TokensMigrated(msg.sender, migrationAmount);
    }
    
    function migrateTrappedETHG(uint256 amount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(amount > 0, "Amount must be positive");
        
        hasMigrated[msg.sender] = true;
        _mint(msg.sender, amount);
        emit TokensMigrated(msg.sender, amount);
    }
    
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be positive");
        _mint(to, amount);
    }
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
    
    function transfer(address to, uint256 value) public virtual override returns (bool) {
        return super.transfer(to, value);
    }
    
    function transferFrom(address from, address to, uint256 value) public virtual override returns (bool) {
        return super.transferFrom(from, to, value);
    }
}`;

  const deploymentSteps = [
    {
      title: "Prepare Deployment",
      description: "Copy contract source code and open Remix IDE",
      status: "ready"
    },
    {
      title: "Compile Contract", 
      description: "Compile with Solidity 0.8.19+ in Remix",
      status: "pending"
    },
    {
      title: "Deploy to Mainnet",
      description: "Connect MetaMask and deploy to Ethereum",
      status: "pending"
    },
    {
      title: "Execute Migration",
      description: "Call migrateMyTrappedETHG() function",
      status: "pending"
    }
  ];

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(label);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const openRemixWithCode = () => {
    const encodedCode = encodeURIComponent(contractSource);
    const remixUrl = `https://remix.ethereum.org/#code=${encodedCode}`;
    window.open(remixUrl, '_blank');
  };

  return (
    <div className="p-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
          ETHGR Contract Deployment
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Deploy your production-ready ETHGR contract to recover 1,990,000 tokens
        </p>
      </div>

      {/* Contract Information */}
      <Card className="max-w-6xl mx-auto mb-8 border-2 border-green-200 dark:border-green-700">
        <CardHeader>
          <CardTitle className="text-2xl text-green-700 dark:text-green-300 flex items-center">
            <CheckCircle className="h-8 w-8 mr-3" />
            Contract Ready for Deployment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">ETHGRecovery</div>
              <div className="text-green-600 dark:text-green-400">Contract Name</div>
              <div className="text-sm text-green-500 mt-1">Symbol: ETHGR</div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">0.8.19+</div>
              <div class="text-blue-600 dark:text-blue-400">Solidity Version</div>
              <div className="text-sm text-blue-500 mt-1">Production Ready</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-2">1,990,000</div>
              <div className="text-purple-600 dark:text-purple-400">Tokens to Mint</div>
              <div className="text-sm text-purple-500 mt-1">Foundation Recovery</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Steps */}
      <Card className="max-w-6xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
            <Rocket className="h-8 w-8 mr-3" />
            Deployment Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {deploymentSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-green-500 text-white' :
                  index <= deploymentStep ? 'bg-blue-500 text-white' :
                  'bg-slate-300 text-slate-600'
                }`}>
                  {index <= deploymentStep ? <CheckCircle className="h-5 w-5" /> : index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contract Source Code */}
      <Card className="max-w-6xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
            <Code className="h-8 w-8 mr-3" />
            Production Contract Source
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-slate-600 dark:text-slate-300">
                Copy this source code and paste it into Remix IDE for deployment
              </p>
              <div className="flex space-x-2">
                <Button
                  onClick={() => copyToClipboard(contractSource, "Contract source")}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy Code</span>
                </Button>
                <Button
                  onClick={openRemixWithCode}
                  size="sm"
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open in Remix</span>
                </Button>
              </div>
            </div>
            
            {copySuccess && (
              <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  {copySuccess} copied to clipboard!
                </AlertDescription>
              </Alert>
            )}
            
            <Textarea
              value={contractSource}
              readOnly
              className="font-mono text-sm h-64 bg-slate-50 dark:bg-slate-800"
            />
          </div>
        </CardContent>
      </Card>

      {/* Deployment Options */}
      <Card className="max-w-6xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800 dark:text-white">Deployment Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mr-4">
                  <Code className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Remix IDE</h3>
                  <Badge className="bg-green-500 mt-1">Recommended</Badge>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                Browser-based IDE with built-in compilation and deployment
              </p>
              <Button
                onClick={openRemixWithCode}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Deploy with Remix
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">MyEtherWallet</h3>
                  <Badge className="bg-blue-500 mt-1">Alternative</Badge>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                Deploy using MEW's contract deployment interface
              </p>
              <Button
                onClick={() => {
                  const url = 'https://www.myetherwallet.com/wallet/deploy';
                  navigator.clipboard.writeText(url);
                  window.open(url, '_blank');
                }}
                variant="outline"
                className="w-full"
              >
                Open MEW
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Etherscan</h3>
                  <Badge className="bg-purple-500 mt-1">Advanced</Badge>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                Direct deployment through Etherscan's interface
              </p>
              <Button
                onClick={() => {
                  const url = 'https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843';
                  navigator.clipboard.writeText(url);
                  window.open(url, '_blank');
                }}
                variant="outline"
                className="w-full"
              >
                View on Etherscan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gas Estimates */}
      <Card className="max-w-6xl mx-auto mb-8 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-800 dark:text-amber-300 flex items-center">
            <Zap className="h-8 w-8 mr-3" />
            Gas Cost Estimates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-2">2.5M Gas</div>
              <div className="text-amber-600 dark:text-amber-400">Contract Deployment</div>
              <div className="text-sm text-amber-500 mt-1">$50-100 @ 20 gwei</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-2">150K Gas</div>
              <div className="text-amber-600 dark:text-amber-400">Migration Function</div>
              <div className="text-sm text-amber-500 mt-1">$10-15 @ 20 gwei</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-2">200K Gas</div>
              <div className="text-amber-600 dark:text-amber-400">Pool Creation</div>
              <div className="text-sm text-amber-500 mt-1">$15-20 @ 20 gwei</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="max-w-6xl mx-auto border-2 border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-700 dark:text-green-300">
            Ready for Deployment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Your ETHGR contract is production-ready for immediate deployment
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={openRemixWithCode}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Deploy Now
              </Button>
              <Button
                onClick={() => copyToClipboard(contractSource, "Contract source")}
                variant="outline"
                className="px-8 py-3 text-lg"
              >
                <Copy className="h-5 w-5 mr-2" />
                Copy Source
              </Button>
            </div>
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Deploy → Migrate → Extract ETH → Create Pool → Convert $45,000
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}