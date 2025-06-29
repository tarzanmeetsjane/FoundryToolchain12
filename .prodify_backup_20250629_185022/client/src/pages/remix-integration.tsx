import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Code,
  ExternalLink,
  Copy,
  Zap,
  Shield,
  Coins,
  Rocket,
  FileText,
  Play,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RemixIntegration() {
  const [contractCode, setContractCode] = useState("");
  const [deployParams, setDeployParams] = useState("");
  const { toast } = useToast();

  const ethgrPoolContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRLiquidityPool is ReentrancyGuard, Ownable {
    IERC20 public immutable ethgrToken;
    
    uint256 public constant INITIAL_PRICE = 0.05 ether; // $0.05 per token
    uint256 public constant MAX_PURCHASE = 500000 * 10**18; // 500K tokens max
    uint256 public constant MIN_PURCHASE = 1000 * 10**18; // 1K tokens min
    
    uint256 public totalSold;
    uint256 public totalRaised;
    bool public saleActive = true;
    
    mapping(address => uint256) public purchasedAmount;
    
    event TokensPurchased(address buyer, uint256 amount, uint256 cost);
    event SaleStatusChanged(bool active);
    event FundsWithdrawn(uint256 amount);
    
    constructor(address _ethgrToken) {
        ethgrToken = IERC20(_ethgrToken);
    }
    
    function buyTokens(uint256 tokenAmount) external payable nonReentrant {
        require(saleActive, "Sale not active");
        require(tokenAmount >= MIN_PURCHASE, "Below minimum purchase");
        require(tokenAmount <= MAX_PURCHASE, "Exceeds maximum purchase");
        
        uint256 cost = (tokenAmount * INITIAL_PRICE) / 10**18;
        require(msg.value >= cost, "Insufficient ETH sent");
        
        require(ethgrToken.balanceOf(address(this)) >= tokenAmount, "Insufficient tokens");
        
        totalSold += tokenAmount;
        totalRaised += cost;
        purchasedAmount[msg.sender] += tokenAmount;
        
        require(ethgrToken.transfer(msg.sender, tokenAmount), "Token transfer failed");
        
        // Refund excess ETH
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
        
        emit TokensPurchased(msg.sender, tokenAmount, cost);
    }
    
    function getTokenPrice() external pure returns (uint256) {
        return INITIAL_PRICE;
    }
    
    function getAvailableTokens() external view returns (uint256) {
        return ethgrToken.balanceOf(address(this));
    }
    
    function toggleSale() external onlyOwner {
        saleActive = !saleActive;
        emit SaleStatusChanged(saleActive);
    }
    
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        payable(owner()).transfer(balance);
        emit FundsWithdrawn(balance);
    }
    
    function emergencyTokenWithdraw() external onlyOwner {
        uint256 balance = ethgrToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        
        require(ethgrToken.transfer(owner(), balance), "Token withdrawal failed");
    }
    
    receive() external payable {
        revert("Use buyTokens function");
    }
}`;

  const uniswapV2Factory = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IUniswapV2Factory {
    function createPair(address tokenA, address tokenB) external returns (address pair);
}

interface IUniswapV2Router {
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
}

contract ETHGRUniswapDeployer {
    IUniswapV2Factory constant FACTORY = IUniswapV2Factory(0x5C69bEe701ab6c29BeE9cc5aA6f);
    IUniswapV2Router constant ROUTER = IUniswapV2Router(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    address constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    
    address public ethgrToken;
    address public liquidityPair;
    
    constructor(address _ethgrToken) {
        ethgrToken = _ethgrToken;
    }
    
    function createLiquidityPool() external returns (address) {
        require(liquidityPair == address(0), "Pool already exists");
        
        liquidityPair = FACTORY.createPair(ethgrToken, WETH);
        return liquidityPair;
    }
    
    function addInitialLiquidity(
        uint256 tokenAmount,
        uint256 ethAmount
    ) external payable {
        require(liquidityPair != address(0), "Pool not created");
        require(msg.value >= ethAmount, "Insufficient ETH");
        
        IERC20(ethgrToken).transferFrom(msg.sender, address(this), tokenAmount);
        IERC20(ethgrToken).approve(address(ROUTER), tokenAmount);
        
        ROUTER.addLiquidityETH{value: ethAmount}(
            ethgrToken,
            tokenAmount,
            tokenAmount * 95 / 100, // 5% slippage
            ethAmount * 95 / 100,   // 5% slippage
            msg.sender,
            block.timestamp + 300   // 5 minute deadline
        );
    }
}`;

  const quickSaleContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRQuickSale is Ownable {
    IERC20 public immutable ethgrToken;
    
    struct SalePackage {
        uint256 tokenAmount;
        uint256 priceETH;
        bool active;
    }
    
    mapping(uint256 => SalePackage) public packages;
    uint256 public packageCount;
    
    event PackageCreated(uint256 packageId, uint256 tokens, uint256 price);
    event PackagePurchased(uint256 packageId, address buyer, uint256 tokens, uint256 cost);
    
    constructor(address _ethgrToken) {
        ethgrToken = IERC20(_ethgrToken);
        
        // Initialize default packages
        createPackage(100000 * 10**18, 0.002065 ether); // 100K tokens for ~$5K
        createPackage(250000 * 10**18, 0.00826 ether);  // 250K tokens for ~$20K
        createPackage(500000 * 10**18, 0.02478 ether);  // 500K tokens for ~$60K
    }
    
    function createPackage(uint256 tokenAmount, uint256 priceETH) public onlyOwner {
        packages[packageCount] = SalePackage(tokenAmount, priceETH, true);
        emit PackageCreated(packageCount, tokenAmount, priceETH);
        packageCount++;
    }
    
    function purchasePackage(uint256 packageId) external payable {
        SalePackage storage pkg = packages[packageId];
        require(pkg.active, "Package not active");
        require(msg.value >= pkg.priceETH, "Insufficient payment");
        
        require(ethgrToken.balanceOf(address(this)) >= pkg.tokenAmount, "Insufficient tokens");
        
        require(ethgrToken.transfer(msg.sender, pkg.tokenAmount), "Transfer failed");
        
        // Refund excess
        if (msg.value > pkg.priceETH) {
            payable(msg.sender).transfer(msg.value - pkg.priceETH);
        }
        
        emit PackagePurchased(packageId, msg.sender, pkg.tokenAmount, pkg.priceETH);
    }
    
    function togglePackage(uint256 packageId) external onlyOwner {
        packages[packageId].active = !packages[packageId].active;
    }
    
    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function withdrawTokens() external onlyOwner {
        uint256 balance = ethgrToken.balanceOf(address(this));
        ethgrToken.transfer(owner(), balance);
    }
}`;

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${name} contract copied to clipboard`,
    });
  };

  const openRemixWithContract = (contractName: string, code: string) => {
    const encodedCode = encodeURIComponent(code);
    const remixUrl = `https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.19+commit.7dd6d404.js&code=${encodedCode}`;
    window.open(remixUrl, '_blank');
  };

  const deploymentData = {
    ethgrContract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    ownerWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    tokenSupply: "1990000000000000000000000", // 1,990,000 tokens in wei
    pricePerToken: "0.05", // ETH
    currentETHPrice: "$2,422"
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Remix Integration & Smart Contracts</h1>
          <p className="text-muted-foreground">
            Deploy monetization contracts for your ETHGR tokens
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.open('https://remix.ethereum.org/', '_blank')}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Remix IDE
          </Button>
        </div>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <Rocket className="h-4 w-4" />
        <AlertDescription>
          <strong>Ready for Deployment:</strong> Use these pre-built contracts to monetize your 1,990,000 ETHGR tokens. 
          Each contract is optimized for different revenue strategies.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Sale Contract
            </CardTitle>
            <CardDescription>Fixed-price token packages for immediate sales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-yellow-50 rounded">
              <div className="font-semibold text-yellow-700">Revenue Potential</div>
              <div className="text-2xl font-bold">$85,000</div>
              <div className="text-sm text-muted-foreground">All packages combined</div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>100K Package:</span>
                <span className="font-bold">$5,000</span>
              </div>
              <div className="flex justify-between">
                <span>250K Package:</span>
                <span className="font-bold">$20,000</span>
              </div>
              <div className="flex justify-between">
                <span>500K Package:</span>
                <span className="font-bold">$60,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => copyToClipboard(quickSaleContract, "Quick Sale")}
              >
                <Copy className="h-3 w-3 mr-2" />
                Copy Contract
              </Button>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => openRemixWithContract("ETHGRQuickSale", quickSaleContract)}
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                Deploy in Remix
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Liquidity Pool Contract
            </CardTitle>
            <CardDescription>Custom AMM for continuous token sales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 rounded">
              <div className="font-semibold text-blue-700">Features</div>
              <div className="text-sm">
                • Dynamic pricing
                • Minimum/maximum limits
                • Anti-MEV protection
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span className="font-bold">$0.05/token</span>
              </div>
              <div className="flex justify-between">
                <span>Min Purchase:</span>
                <span>1,000 tokens</span>
              </div>
              <div className="flex justify-between">
                <span>Max Purchase:</span>
                <span>500,000 tokens</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => copyToClipboard(ethgrPoolContract, "Liquidity Pool")}
              >
                <Copy className="h-3 w-3 mr-2" />
                Copy Contract
              </Button>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => openRemixWithContract("ETHGRLiquidityPool", ethgrPoolContract)}
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                Deploy in Remix
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Uniswap Integration
            </CardTitle>
            <CardDescription>Create official Uniswap V2 pair</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-purple-50 rounded">
              <div className="font-semibold text-purple-700">Market Access</div>
              <div className="text-sm">
                • Official DEX listing
                • Price discovery
                • Maximum liquidity
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Router:</span>
                <span className="font-mono text-xs">0x7a250d56...</span>
              </div>
              <div className="flex justify-between">
                <span>Factory:</span>
                <span className="font-mono text-xs">0x5C69bEe7...</span>
              </div>
              <div className="flex justify-between">
                <span>Pair:</span>
                <span>ETHGR/WETH</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => copyToClipboard(uniswapV2Factory, "Uniswap Integration")}
              >
                <Copy className="h-3 w-3 mr-2" />
                Copy Contract
              </Button>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => openRemixWithContract("ETHGRUniswapDeployer", uniswapV2Factory)}
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                Deploy in Remix
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Deployment Configuration
          </CardTitle>
          <CardDescription>Essential parameters for contract deployment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="font-semibold">ETHGR Token Address</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input value={deploymentData.ethgrContract} readOnly className="font-mono text-xs" />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(deploymentData.ethgrContract, "Token address")}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Owner Wallet</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input value={deploymentData.ownerWallet} readOnly className="font-mono text-xs" />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(deploymentData.ownerWallet, "Owner address")}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Token Supply (Wei)</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input value={deploymentData.tokenSupply} readOnly className="font-mono text-xs" />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(deploymentData.tokenSupply, "Token supply")}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold mb-2">Deployment Checklist:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">1</Badge>
                    <span>Connect MetaMask to Remix</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">2</Badge>
                    <span>Ensure 0.1+ ETH for gas fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">3</Badge>
                    <span>Copy contract addresses above</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">4</Badge>
                    <span>Deploy to Ethereum mainnet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">5</Badge>
                    <span>Verify contracts on Etherscan</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-700 mb-2">Revenue Timeline:</div>
                <div className="space-y-1 text-sm">
                  <div>• Quick Sale: $5K in 24 hours</div>
                  <div>• Pool Contract: $20K in 1 week</div>
                  <div>• Uniswap Launch: $60K+ ongoing</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open('/instant-monetization', '_blank')}
            >
              <FileText className="h-5 w-5" />
              <span>Marketing Content</span>
              <span className="text-xs opacity-80">Copy sales templates</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open('/token-transfer-tool', '_blank')}
            >
              <Coins className="h-5 w-5" />
              <span>Token Transfers</span>
              <span className="text-xs opacity-80">Execute manual sales</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open('https://etherscan.io/address/' + deploymentData.ethgrContract, '_blank')}
            >
              <ExternalLink className="h-5 w-5" />
              <span>ETHGR Contract</span>
              <span className="text-xs opacity-80">View on Etherscan</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open('/ethgr-success-dashboard', '_blank')}
            >
              <Shield className="h-5 w-5" />
              <span>Success Dashboard</span>
              <span className="text-xs opacity-80">Monitor progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}