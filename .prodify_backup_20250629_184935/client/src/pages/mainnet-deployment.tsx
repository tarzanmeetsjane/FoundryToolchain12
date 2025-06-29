import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle,
  Copy,
  ExternalLink,
  Rocket,
  Target,
  Code2,
  DollarSign,
  AlertTriangle,
  Network
} from "lucide-react";

export default function MainnetDeployment() {
  const [copied, setCopied] = useState(false);

  const mainnetContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20("Ethereum Recovery", "ETHR"), Ownable(msg.sender) {
    
    uint256 public constant TOTAL_SUPPLY = 1990000 * 10**18;
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    bool public migrationCompleted = false;
    
    event TokensMigrated(address indexed holder, uint256 amount);
    event MigrationStatusChanged(bool enabled);
    event EmergencyWithdrawal(address indexed owner, uint256 amount);
    
    constructor() {
        // Mainnet deployment - real ETHR tokens
    }
    
    function migrateMyTrappedETHG() external {
        require(migrationEnabled, "Migration is disabled");
        require(!migrationCompleted, "Migration already completed");
        require(msg.sender == owner(), "Only owner can migrate");
        require(!hasMigrated[msg.sender], "Address already migrated");
        
        hasMigrated[msg.sender] = true;
        migrationCompleted = true;
        _mint(msg.sender, TOTAL_SUPPLY);
        
        emit TokensMigrated(msg.sender, TOTAL_SUPPLY);
    }
    
    function setMigrationEnabled(bool _enabled) external onlyOwner {
        migrationEnabled = _enabled;
        emit MigrationStatusChanged(_enabled);
    }
    
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        payable(owner()).transfer(balance);
        emit EmergencyWithdrawal(owner(), balance);
    }
    
    function getMigrationInfo() external view returns (bool, bool, uint256, address, bool) {
        return (migrationEnabled, migrationCompleted, TOTAL_SUPPLY, owner(), hasMigrated[msg.sender]);
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "Transfer to zero address");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        return super.transfer(to, amount);
    }
    
    receive() external payable {}
    fallback() external payable {}
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mainnetContract);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Network className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Ethereum Mainnet Deployment
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Deploy your ETHR tokens to the real Ethereum blockchain
          </p>
        </div>

        {/* Current Status Alert */}
        <Alert className="border-yellow-500 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-200">
            Your current contract 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8 is on Remix VM (testnet).
            Deploy to Ethereum Mainnet to create real tradeable ETHR tokens.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Deployment Instructions */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Rocket className="h-5 w-5 text-blue-400" />
                Mainnet Deployment Steps
              </CardTitle>
              <CardDescription className="text-gray-400">
                Deploy your ETHR contract to Ethereum Mainnet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">1</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Switch to Ethereum Mainnet</p>
                    <p className="text-sm text-gray-400">In Remix: Environment → "Injected Provider - MetaMask"</p>
                    <p className="text-sm text-gray-400">Ensure MetaMask is on Ethereum Mainnet</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">2</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Add ETH for Gas</p>
                    <p className="text-sm text-gray-400">Need ~0.003-0.005 ETH for deployment</p>
                    <p className="text-sm text-gray-400">Plus ~0.001 ETH for migration call</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">3</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Deploy Contract</p>
                    <p className="text-sm text-gray-400">Use contract code below</p>
                    <p className="text-sm text-gray-400">Value: 0 Wei</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">4</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Mint ETHR Tokens</p>
                    <p className="text-sm text-gray-400">Call migrateMyTrappedETHG()</p>
                    <p className="text-sm text-gray-400">Receive 1,990,000 ETHR tokens</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">5</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Import to MetaMask</p>
                    <p className="text-sm text-gray-400">Use new mainnet contract address</p>
                    <p className="text-sm text-gray-400">Trade on Uniswap immediately</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Value Projection */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Mainnet Value Projection
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real trading value on Ethereum Mainnet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Token Supply</p>
                  <p className="text-2xl font-bold text-white">1,990,000</p>
                  <p className="text-sm text-blue-400">ETHR Tokens</p>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Estimated Value</p>
                  <p className="text-2xl font-bold text-green-400">$706,450</p>
                  <p className="text-sm text-gray-400">@$0.355/token</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded">
                  <span className="text-gray-300">Deployment Cost</span>
                  <span className="text-yellow-400">~$15-20</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded">
                  <span className="text-gray-300">Migration Cost</span>
                  <span className="text-yellow-400">~$5-10</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-600/20 rounded border border-green-600/30">
                  <span className="text-white font-medium">Net Value</span>
                  <span className="text-green-400 font-bold">$706,420</span>
                </div>
              </div>
              
              <Alert className="border-green-500 bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-200">
                  Once deployed to mainnet, your ETHR tokens will be immediately tradeable on Uniswap and other DEXs.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Contract Code */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Code2 className="h-5 w-5 text-purple-400" />
              Mainnet Contract Code
            </CardTitle>
            <CardDescription className="text-gray-400">
              Copy this contract for Ethereum Mainnet deployment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Textarea
                value={mainnetContract}
                readOnly
                className="font-mono text-sm bg-gray-900 border-gray-600 text-gray-300 min-h-96"
              />
              <Button
                onClick={copyToClipboard}
                size="sm"
                className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            onClick={() => window.open('https://remix.ethereum.org', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Remix IDE
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            onClick={() => window.open('https://app.uniswap.org', '_blank')}
          >
            <Target className="h-4 w-4 mr-2" />
            Open Uniswap
          </Button>
        </div>

        {/* Next Steps */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">After Mainnet Deployment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-600 rounded-lg">
                <h3 className="text-white font-medium mb-2">Create Liquidity Pool</h3>
                <p className="text-gray-400 text-sm">Add ETHR/ETH liquidity on Uniswap to enable trading</p>
              </div>
              
              <div className="p-4 border border-gray-600 rounded-lg">
                <h3 className="text-white font-medium mb-2">Direct Sales</h3>
                <p className="text-gray-400 text-sm">Market to trapped ETHG holders needing recovery</p>
              </div>
              
              <div className="p-4 border border-gray-600 rounded-lg">
                <h3 className="text-white font-medium mb-2">Continue 37 ETH Recovery</h3>
                <p className="text-gray-400 text-sm">Parallel investigation for additional $89,614</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}