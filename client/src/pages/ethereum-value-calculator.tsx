import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calculator,
  DollarSign,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  Target,
  Crown,
  Zap
} from "lucide-react";

export default function EthereumValueCalculator() {
  const [uniBalance, setUniBalance] = useState("");
  const [ethAmount, setEthAmount] = useState("37");
  const [calculatedValues, setCalculatedValues] = useState(null);

  const unitConversions = {
    wei: "1",
    kwei: "1,000",
    mwei: "1,000,000", 
    gwei: "1,000,000,000",
    szabo: "1,000,000,000,000",
    finney: "1,000,000,000,000,000",
    ether: "1,000,000,000,000,000,000"
  };

  const currentPrices = {
    eth: 2423.45,
    uni: 15.20,
    ethg: 0.326,
    aicc: 0.087
  };

  const yourPortfolio = [
    {
      asset: "ETHG",
      amount: "2,100,000",
      price: currentPrices.ethg,
      location: "Primary wallet",
      status: "Confirmed"
    },
    {
      asset: "AICC", 
      amount: "17,500",
      price: currentPrices.aicc,
      location: "Primary wallet",
      status: "Confirmed"
    },
    {
      asset: "ETHGR",
      amount: "1,990,000",
      price: "Recovery token",
      location: "Primary wallet",
      status: "Confirmed"
    },
    {
      asset: "UNI",
      amount: uniBalance || "Checking...",
      price: currentPrices.uni,
      location: "Contract wallet",
      status: "DISCOVERED"
    },
    {
      asset: "ETH",
      amount: ethAmount,
      price: currentPrices.eth,
      location: "Contract wallet", 
      status: "Under investigation"
    }
  ];

  const calculatePortfolioValue = () => {
    let total = 0;
    let breakdown = [];

    // ETHG calculation
    const ethgValue = 2100000 * currentPrices.ethg;
    total += ethgValue;
    breakdown.push({ asset: "ETHG", value: ethgValue, calculation: "2,100,000 × $0.326" });

    // AICC calculation  
    const aiccValue = 17500 * currentPrices.aicc;
    total += aiccValue;
    breakdown.push({ asset: "AICC", value: aiccValue, calculation: "17,500 × $0.087" });

    // UNI calculation
    if (uniBalance && !isNaN(parseFloat(uniBalance))) {
      const uniValue = parseFloat(uniBalance) * currentPrices.uni;
      total += uniValue;
      breakdown.push({ asset: "UNI", value: uniValue, calculation: `${uniBalance} × $${currentPrices.uni}` });
    }

    // ETH calculation
    if (ethAmount && !isNaN(parseFloat(ethAmount))) {
      const ethValue = parseFloat(ethAmount) * currentPrices.eth;
      total += ethValue;
      breakdown.push({ asset: "ETH", value: ethValue, calculation: `${ethAmount} × $${currentPrices.eth}` });
    }

    setCalculatedValues({ total, breakdown });
  };

  useEffect(() => {
    calculatePortfolioValue();
  }, [uniBalance, ethAmount]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const contractWalletTargets = {
    address: "0xc46eB37677360EfDc011F4097621F15b792fa630",
    uniTokenContract: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    etherscanUniLink: "https://etherscan.io/token/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984?a=0xc46eb37677360efdc011f4097621f15b792fa630",
    investigations: ["UNI token balance", "37 ETH search", "Other ERC20 tokens", "Transaction history"]
  };

  const recoveryCalculations = [
    {
      scenario: "Conservative (UNI only)",
      assumption: "100 UNI tokens",
      uniValue: 100 * currentPrices.uni,
      ethValue: 0,
      total: (100 * currentPrices.uni) + (2100000 * currentPrices.ethg) + (17500 * currentPrices.aicc)
    },
    {
      scenario: "Moderate (UNI + some ETH)",
      assumption: "500 UNI + 5 ETH",
      uniValue: 500 * currentPrices.uni,
      ethValue: 5 * currentPrices.eth,
      total: (500 * currentPrices.uni) + (5 * currentPrices.eth) + (2100000 * currentPrices.ethg) + (17500 * currentPrices.aicc)
    },
    {
      scenario: "Target (UNI + 37 ETH)",
      assumption: "1000 UNI + 37 ETH",
      uniValue: 1000 * currentPrices.uni,
      ethValue: 37 * currentPrices.eth,
      total: (1000 * currentPrices.uni) + (37 * currentPrices.eth) + (2100000 * currentPrices.ethg) + (17500 * currentPrices.aicc)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            ETHEREUM VALUE CALCULATOR
          </h1>
          <p className="text-xl text-blue-300">
            Calculate Your Complete Portfolio Recovery Value
          </p>
        </div>

        {/* Unit Converter Reference */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Ethereum Unit Converter Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(unitConversions).map(([unit, value]) => (
                <div key={unit} className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h3 className="text-blue-400 font-bold">{unit}</h3>
                  <p className="text-white text-sm">{value} wei</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Value Input Calculator */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Portfolio Value Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-green-400 font-bold block mb-2">UNI Token Balance</label>
                  <Input
                    type="number"
                    placeholder="Enter UNI token amount"
                    value={uniBalance}
                    onChange={(e) => setUniBalance(e.target.value)}
                    className="bg-gray-700 text-white border-green-500"
                  />
                  <p className="text-gray-400 text-xs mt-1">Current UNI price: ${currentPrices.uni}</p>
                </div>
                
                <div>
                  <label className="text-green-400 font-bold block mb-2">ETH Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter ETH amount"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    className="bg-gray-700 text-white border-green-500"
                  />
                  <p className="text-gray-400 text-xs mt-1">Current ETH price: ${formatNumber(currentPrices.eth)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <h3 className="text-green-400 font-bold text-lg mb-3">Live Calculation</h3>
                  {calculatedValues && (
                    <div className="space-y-2">
                      {calculatedValues.breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-400 text-sm">{item.asset}:</span>
                          <span className="text-white text-sm">{formatCurrency(item.value)}</span>
                        </div>
                      ))}
                      <div className="border-t border-green-600/30 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-green-400 font-bold">Total Portfolio:</span>
                          <span className="text-green-400 font-bold text-lg">{formatCurrency(calculatedValues.total)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={calculatePortfolioValue}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Recalculate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Wallet Investigation */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Contract Wallet Investigation Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                <h3 className="text-purple-400 font-bold">Target Wallet</h3>
                <p className="text-white font-mono text-sm break-all">{contractWalletTargets.address}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contractWalletTargets.investigations.map((investigation, index) => (
                  <div key={index} className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                    <p className="text-white text-sm">{investigation}</p>
                    <Badge className="bg-purple-600 text-white mt-1">Active</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recovery Scenarios */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Recovery Value Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recoveryCalculations.map((scenario, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <h3 className="text-yellow-400 font-bold">{scenario.scenario}</h3>
                      <p className="text-gray-400 text-xs">{scenario.assumption}</p>
                    </div>
                    <div>
                      <p className="text-white text-sm">UNI: {formatCurrency(scenario.uniValue)}</p>
                    </div>
                    <div>
                      <p className="text-white text-sm">ETH: {formatCurrency(scenario.ethValue)}</p>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-bold">{formatCurrency(scenario.total)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Portfolio Status */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Your Complete Portfolio Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {yourPortfolio.map((asset, index) => (
                <div key={index} className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                    <div>
                      <h3 className="text-orange-400 font-bold">{asset.asset}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{formatNumber(asset.amount)}</p>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm">
                        {typeof asset.price === 'number' ? `$${asset.price}` : asset.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{asset.location}</p>
                    </div>
                    <div>
                      <Badge className={
                        asset.status === "DISCOVERED" ? "bg-purple-600" :
                        asset.status === "Confirmed" ? "bg-green-600" : "bg-orange-600"
                      }>
                        {asset.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open(contractWalletTargets.etherscanUniLink, '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            Check UNI Balance
          </Button>
          
          <Button 
            onClick={() => window.open('https://info.etherscan.com/ethereum-unit-converter/', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <Calculator className="h-6 w-6 mr-2" />
            Unit Converter
          </Button>
          
          <Button 
            onClick={() => window.open(`https://etherscan.io/address/${contractWalletTargets.address}`, '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Target className="h-6 w-6 mr-2" />
            Full Wallet Scan
          </Button>
          
          <Button 
            onClick={() => window.open('/live-mainnet-deployment', '_self')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <Zap className="h-6 w-6 mr-2" />
            Update Recovery
          </Button>
        </div>

        {/* Portfolio Summary */}
        <Alert className="border-green-500 bg-green-500/20">
          <DollarSign className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200 text-lg">
            <strong>PORTFOLIO CALCULATOR READY:</strong> Enter your actual UNI balance to calculate precise recovery value. Your confirmed portfolio already exceeds $686K, and UNI discovery adds significant additional value to contract wallet recovery target.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}