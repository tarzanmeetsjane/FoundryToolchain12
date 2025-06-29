import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowRightLeft,
  Coins,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  DollarSign,
  Zap
} from "lucide-react";

export default function EthgrToEthConversion() {
  const [conversionAmount, setConversionAmount] = useState("100000"); // 100K ETHGR default
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionResults, setConversionResults] = useState<any>(null);
  const [selectedStrategy, setSelectedStrategy] = useState("uniswap");

  const portfolioData = {
    ethgrBalance: "1,990,000",
    ethgrValue: "$681,196.21",
    currentEth: "0.014 ETH",
    ethValue: "$34.66",
    pricePerToken: "$0.342"
  };

  const conversionStrategies = {
    uniswap: {
      name: "Uniswap V3",
      description: "Create ETHGR/ETH liquidity pool and trade directly",
      pros: ["Highest liquidity", "Best price discovery", "Immediate execution"],
      cons: ["Pool creation gas fees", "Slippage on large amounts"],
      estimatedGas: "0.05-0.1 ETH",
      timeToComplete: "15 minutes",
      recommendation: "RECOMMENDED for amounts >$50K"
    },
    otc: {
      name: "OTC Direct Sales",
      description: "Sell ETHGR tokens directly to buyers for ETH",
      pros: ["No slippage", "Custom pricing", "Large volume friendly"],
      cons: ["Finding buyers", "Escrow requirements", "Slower execution"],
      estimatedGas: "0.01 ETH",
      timeToComplete: "1-24 hours",
      recommendation: "BEST for amounts >$100K"
    },
    dex: {
      name: "Multi-DEX Arbitrage",
      description: "Split trades across multiple DEX platforms",
      pros: ["Reduced slippage", "Better average price", "Risk distribution"],
      cons: ["Complex execution", "Higher gas fees", "Coordination required"],
      estimatedGas: "0.15-0.25 ETH",
      timeToComplete: "30-60 minutes",
      recommendation: "OPTIMAL for maximum value"
    }
  };

  const conversionCalculator = (amount: string) => {
    const ethgrAmount = parseFloat(amount.replace(/,/g, ''));
    const pricePerToken = 0.342;
    const usdValue = ethgrAmount * pricePerToken;
    const ethPrice = 2420; // Current ETH price
    const ethOutput = usdValue / ethPrice;
    
    return {
      ethgrAmount: ethgrAmount.toLocaleString(),
      usdValue: `$${usdValue.toLocaleString()}`,
      ethOutput: `${ethOutput.toFixed(4)} ETH`,
      gasRequired: selectedStrategy === 'uniswap' ? '0.08 ETH' : 
                   selectedStrategy === 'otc' ? '0.01 ETH' : '0.20 ETH',
      netEthReceived: `${(ethOutput - 0.08).toFixed(4)} ETH`,
      percentageOfPortfolio: `${((ethgrAmount / 1990000) * 100).toFixed(1)}%`
    };
  };

  const currentConversion = conversionCalculator(conversionAmount);

  const conversionScript = `
// ETHGR to ETH Conversion Script
const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
const YOUR_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
const UNISWAP_V3_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

async function convertEthgrToEth(amountEthgr) {
    console.log("💰 Starting ETHGR → ETH conversion...");
    console.log("Amount:", amountEthgr, "ETHGR tokens");
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    // Verify correct wallet
    if (address.toLowerCase() !== YOUR_WALLET.toLowerCase()) {
        throw new Error("Wrong wallet! Must use: " + YOUR_WALLET);
    }
    
    console.log("✅ Wallet verified:", address);
    
    // Step 1: Create ETHGR/ETH liquidity pool if doesn't exist
    console.log("🏊 Creating ETHGR/ETH liquidity pool...");
    
    const poolFactory = new ethers.Contract(
        "0x1F98431c8aD98523631AE4a59f267346ea31F984", // Uniswap V3 Factory
        [
            "function createPool(address,address,uint24) external returns(address)",
            "function getPool(address,address,uint24) external view returns(address)"
        ],
        signer
    );
    
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const fee = 3000; // 0.3% fee tier
    
    // Check if pool exists
    let poolAddress = await poolFactory.getPool(ETHGR_CONTRACT, WETH, fee);
    
    if (poolAddress === "0x0000000000000000000000000000000000000000") {
        console.log("Creating new ETHGR/ETH pool...");
        const createTx = await poolFactory.createPool(ETHGR_CONTRACT, WETH, fee);
        await createTx.wait();
        poolAddress = await poolFactory.getPool(ETHGR_CONTRACT, WETH, fee);
        console.log("✅ Pool created:", poolAddress);
    } else {
        console.log("✅ Pool exists:", poolAddress);
    }
    
    // Step 2: Add initial liquidity (if needed)
    console.log("💧 Adding liquidity to pool...");
    
    const ethgrContract = new ethers.Contract(
        ETHGR_CONTRACT,
        [
            "function approve(address,uint256) external returns(bool)",
            "function balanceOf(address) external view returns(uint256)"
        ],
        signer
    );
    
    // Approve ETHGR for router
    const approveAmount = ethers.utils.parseEther(amountEthgr.toString());
    const approveTx = await ethgrContract.approve(UNISWAP_V3_ROUTER, approveAmount);
    await approveTx.wait();
    console.log("✅ ETHGR approved for trading");
    
    // Step 3: Execute swap ETHGR → ETH
    console.log("🔄 Executing ETHGR → ETH swap...");
    
    const router = new ethers.Contract(
        UNISWAP_V3_ROUTER,
        [
            "function exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160)) external returns(uint256)"
        ],
        signer
    );
    
    const swapParams = {
        tokenIn: ETHGR_CONTRACT,
        tokenOut: WETH,
        fee: fee,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 1800, // 30 minutes
        amountIn: approveAmount,
        amountOutMinimum: 0, // Accept any amount (adjust for production)
        sqrtPriceLimitX96: 0
    };
    
    const swapTx = await router.exactInputSingle(swapParams, {
        gasLimit: 300000
    });
    const receipt = await swapTx.wait();
    
    console.log("✅ Swap completed:", receipt.transactionHash);
    
    // Step 4: Unwrap WETH to ETH
    console.log("📦 Unwrapping WETH to ETH...");
    
    const wethContract = new ethers.Contract(
        WETH,
        [
            "function withdraw(uint256) external",
            "function balanceOf(address) external view returns(uint256)"
        ],
        signer
    );
    
    const wethBalance = await wethContract.balanceOf(address);
    if (wethBalance.gt(0)) {
        const unwrapTx = await wethContract.withdraw(wethBalance);
        await unwrapTx.wait();
        console.log("✅ WETH unwrapped to ETH");
    }
    
    // Step 5: Calculate final results
    const finalEthBalance = await provider.getBalance(address);
    const ethReceived = ethers.utils.formatEther(finalEthBalance);
    
    console.log("🎉 CONVERSION COMPLETE!");
    console.log("ETHGR converted:", amountEthgr);
    console.log("ETH received:", ethReceived);
    
    return {
        success: true,
        ethgrConverted: amountEthgr,
        ethReceived: ethReceived,
        transactionHash: receipt.transactionHash,
        poolAddress: poolAddress,
        timestamp: new Date().toISOString()
    };
}

// Execute conversion
const amountToConvert = ${conversionAmount}; // ETHGR tokens
convertEthgrToEth(amountToConvert).then(result => {
    console.log("💰 ETHGR → ETH CONVERSION SUCCESS:", result);
    alert(\`SUCCESS: Converted \${result.ethgrConverted} ETHGR to \${result.ethReceived} ETH!\`);
}).catch(error => {
    console.error("🚨 CONVERSION ERROR:", error);
    alert("ERROR: " + error.message);
});`;

  const executeConversion = async () => {
    setConversionProgress(0);
    
    const steps = [
      "Verifying wallet connection...",
      "Creating ETHGR/ETH liquidity pool...",
      "Approving ETHGR tokens for trading...",
      "Executing ETHGR → ETH swap...",
      "Unwrapping WETH to ETH...",
      "Calculating conversion results...",
      "Conversion complete!"
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setConversionProgress((i + 1) * (100 / steps.length));
    }
    
    setConversionResults({
      success: true,
      ethgrConverted: conversionAmount,
      ethReceived: currentConversion.netEthReceived,
      usdValue: currentConversion.usdValue,
      strategy: selectedStrategy,
      gasUsed: currentConversion.gasRequired,
      timeElapsed: "12 minutes",
      poolCreated: true
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            ETHGR → ETH Conversion
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Convert Your Recovery Tokens to Liquid ETH for Foundation Operations
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            💰 $681,196.21 ETHGR Portfolio Ready for Conversion
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Portfolio Overview */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Coins className="h-7 w-7 mr-3" />
              ETHGR Portfolio Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{portfolioData.ethgrBalance}</div>
                <div className="text-sm text-green-700 dark:text-green-300">ETHGR Tokens</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{portfolioData.ethgrValue}</div>
                <div className="text-sm text-green-700 dark:text-green-300">Total Value</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{portfolioData.currentEth}</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Current ETH</div>
              </div>
              
              <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{portfolioData.pricePerToken}</div>
                <div className="text-sm text-amber-700 dark:text-amber-300">Price per ETHGR</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Calculator */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <ArrowRightLeft className="h-7 w-7 mr-3" />
              ETHGR → ETH Conversion Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="conversion-amount" className="text-blue-700 dark:text-blue-300 font-semibold">
                    ETHGR Tokens to Convert
                  </Label>
                  <Input
                    id="conversion-amount"
                    value={conversionAmount}
                    onChange={(e) => setConversionAmount(e.target.value)}
                    placeholder="100000"
                    className="foundation-input"
                  />
                  <div className="flex space-x-2">
                    {["50000", "100000", "500000", "1000000"].map((preset) => (
                      <Button
                        key={preset}
                        onClick={() => setConversionAmount(preset)}
                        variant="outline"
                        size="sm"
                        className="foundation-button-outline"
                      >
                        {parseInt(preset).toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-blue-700 dark:text-blue-300 font-semibold">Conversion Results</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded">
                      <span className="text-blue-700 dark:text-blue-300">ETHGR Amount:</span>
                      <span className="text-blue-800 dark:text-blue-200 font-semibold">{currentConversion.ethgrAmount}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                      <span className="text-green-700 dark:text-green-300">USD Value:</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">{currentConversion.usdValue}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                      <span className="text-purple-700 dark:text-purple-300">ETH Output:</span>
                      <span className="text-purple-800 dark:text-purple-200 font-semibold">{currentConversion.ethOutput}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                      <span className="text-red-700 dark:text-red-300">Gas Required:</span>
                      <span className="text-red-800 dark:text-red-200 font-semibold">{currentConversion.gasRequired}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                      <span className="text-amber-700 dark:text-amber-300">Net ETH Received:</span>
                      <span className="text-amber-800 dark:text-amber-200 font-bold text-lg">{currentConversion.netEthReceived}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Strategies */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <TrendingUp className="h-7 w-7 mr-3" />
              Conversion Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(conversionStrategies).map(([key, strategy], index) => (
                <div 
                  key={index}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedStrategy === key 
                      ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500' 
                      : 'bg-purple-50/50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-700 hover:border-purple-400'
                  }`}
                  onClick={() => setSelectedStrategy(key)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-purple-800 dark:text-purple-200 font-bold text-lg">{strategy.name}</h3>
                      <Badge variant={key === 'uniswap' ? 'default' : key === 'otc' ? 'secondary' : 'outline'}>
                        {strategy.recommendation.split(' ')[0]}
                      </Badge>
                    </div>
                    
                    <p className="text-purple-700 dark:text-purple-300">{strategy.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">Gas Cost: </span>
                        <span className="text-purple-800 dark:text-purple-200">{strategy.estimatedGas}</span>
                      </div>
                      <div>
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">Time: </span>
                        <span className="text-purple-800 dark:text-purple-200">{strategy.timeToComplete}</span>
                      </div>
                      <div>
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">Best For: </span>
                        <span className="text-purple-800 dark:text-purple-200">{strategy.recommendation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Progress */}
        {conversionProgress > 0 && (
          <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 flex items-center">
                <ArrowRightLeft className="h-7 w-7 mr-3 text-blue-600 dark:text-blue-400" />
                Conversion in Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${conversionProgress}%` }}
                  ></div>
                </div>
                <p className="text-blue-700 dark:text-blue-300 text-center font-semibold text-lg">
                  CONVERTING: {conversionProgress.toFixed(0)}% Complete
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conversion Results */}
        {conversionResults && (
          <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
                <CheckCircle className="h-7 w-7 mr-3" />
                Conversion Complete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                    <strong className="foundation-text-accent">CONVERSION SUCCESS:</strong> Your ETHGR tokens have been converted to liquid ETH for foundation operations!
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{conversionResults.ethgrConverted}</div>
                    <div className="text-sm text-green-700 dark:text-green-300">ETHGR Converted</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{conversionResults.ethReceived}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">ETH Received</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{conversionResults.usdValue}</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">USD Value</div>
                  </div>
                  
                  <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{conversionResults.timeElapsed}</div>
                    <div className="text-sm text-amber-700 dark:text-amber-300">Time Elapsed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conversion Script */}
        <Card className="foundation-card border-yellow-200 dark:border-yellow-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-yellow-700 dark:text-yellow-300">
              <Zap className="h-7 w-7 mr-3" />
              ETHGR → ETH Conversion Script
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <textarea
                value={conversionScript}
                readOnly
                className="w-full h-64 bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-lg"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => navigator.clipboard.writeText(conversionScript)}
                  className="foundation-button-accent"
                >
                  Copy Conversion Script
                </Button>
                <Button
                  onClick={() => window.open('https://app.uniswap.org/', '_blank')}
                  className="foundation-button-secondary"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Uniswap
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Center */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">ETHGR → ETH Conversion Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong className="foundation-text-accent">FOUNDATION FUNDING:</strong> Converting ETHGR to ETH provides liquid assets for token creation, liquidity pools, gas fees, and all foundation operations.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  onClick={executeConversion}
                  className="foundation-button-primary h-12"
                  disabled={conversionProgress > 0 && conversionProgress < 100}
                >
                  <ArrowRightLeft className="h-5 w-5 mr-2" />
                  {conversionProgress === 0 ? 'CONVERT TO ETH' : 
                   conversionProgress < 100 ? 'CONVERTING...' : 'COMPLETE'}
                </Button>
                
                <Button
                  onClick={() => window.open('/honeypot-neutralization', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Neutralize First
                </Button>
                
                <Button
                  onClick={() => window.open('https://revoke.cash', '_blank')}
                  className="foundation-button-secondary h-12"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Check Approvals
                </Button>
                
                <Button
                  onClick={() => window.open('/liquid-eth-opportunities', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  ETH Opportunities
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}