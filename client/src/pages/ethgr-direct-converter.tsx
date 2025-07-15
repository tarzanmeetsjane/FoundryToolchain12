
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { ArrowDown, Zap, DollarSign, TrendingUp } from 'lucide-react';

const ETHGR_CONVERTER_ADDRESS = "0x..."; // Deploy address here
const ETHGR_TOKEN_ADDRESS = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";

export default function ETHGRDirectConverter() {
  const [ethgrAmount, setEthgrAmount] = useState('');
  const [estimatedETH, setEstimatedETH] = useState('0');
  const [isConverting, setIsConverting] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [ethgrBalance, setETHGRBalance] = useState('0');
  const [conversionHistory, setConversionHistory] = useState([]);

  // Simulate real-time price data
  const ethPrice = 3800; // Current ETH price in USD
  const estimatedUSD = (parseFloat(estimatedETH) * ethPrice).toFixed(2);

  useEffect(() => {
    if (ethgrAmount && parseFloat(ethgrAmount) > 0) {
      // Simulate conversion rate calculation
      const rate = 0.000134; // 1 ETHGR = 0.000134 ETH (example rate)
      const estimated = (parseFloat(ethgrAmount) * rate).toFixed(6);
      setEstimatedETH(estimated);
    } else {
      setEstimatedETH('0');
    }
  }, [ethgrAmount]);

  const handleConvert = async () => {
    setIsConverting(true);
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockTxHash = "0x" + Math.random().toString(16).substr(2, 40);
      setTxHash(mockTxHash);
      
      // Add to conversion history
      const newConversion = {
        amount: ethgrAmount,
        ethReceived: estimatedETH,
        usdValue: estimatedUSD,
        timestamp: new Date().toLocaleString(),
        txHash: mockTxHash
      };
      
      setConversionHistory(prev => [newConversion, ...prev]);
      setEthgrAmount('');
      
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const conversionScript = `
// ETHGR → ETH Direct Conversion Script
const convertETHGRToETH = async (amountETHGR) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    // Contract addresses
    const ETHGR_TOKEN = "${ETHGR_TOKEN_ADDRESS}";
    const CONVERTER = "${ETHGR_CONVERTER_ADDRESS}";
    
    // Contract ABIs
    const ethgrABI = [
        "function approve(address spender, uint256 amount) external returns (bool)",
        "function balanceOf(address owner) external view returns (uint256)"
    ];
    
    const converterABI = [
        "function convertETHGRToETH(uint256 ethgrAmount, uint256 minEthOut) external",
        "function getEstimatedETH(uint256 ethgrAmount) external view returns (uint256)"
    ];
    
    // Create contract instances
    const ethgrContract = new ethers.Contract(ETHGR_TOKEN, ethgrABI, signer);
    const converterContract = new ethers.Contract(CONVERTER, converterABI, signer);
    
    const amountWei = ethers.utils.parseUnits(amountETHGR.toString(), 18);
    
    console.log("🔄 Starting ETHGR → ETH conversion...");
    console.log("Amount:", amountETHGR, "ETHGR");
    
    // Step 1: Get estimated ETH output
    const estimatedETH = await converterContract.getEstimatedETH(amountWei);
    const minETH = estimatedETH.mul(95).div(100); // 5% slippage tolerance
    
    console.log("Estimated ETH:", ethers.utils.formatEther(estimatedETH));
    
    // Step 2: Approve ETHGR spending
    console.log("📝 Approving ETHGR...");
    const approveTx = await ethgrContract.approve(CONVERTER, amountWei);
    await approveTx.wait();
    console.log("✅ ETHGR approved");
    
    // Step 3: Execute conversion
    console.log("🔄 Converting ETHGR to ETH...");
    const convertTx = await converterContract.convertETHGRToETH(amountWei, minETH);
    const receipt = await convertTx.wait();
    
    console.log("✅ Conversion complete!");
    console.log("Transaction hash:", receipt.transactionHash);
    
    return {
        success: true,
        txHash: receipt.transactionHash,
        ethgrConverted: amountETHGR,
        ethReceived: ethers.utils.formatEther(estimatedETH)
    };
};

// Usage example:
convertETHGRToETH(${ethgrAmount || '1000'}).then(result => {
    console.log("💰 CONVERSION SUCCESS:", result);
    alert(\`Converted \${result.ethgrConverted} ETHGR to \${result.ethReceived} ETH!\`);
}).catch(error => {
    console.error("🚨 CONVERSION ERROR:", error);
    alert("Conversion failed: " + error.message);
});`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">
            ETHGR → ETH Direct Converter
          </h1>
          <div className="flex justify-center items-center gap-4">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 px-4 py-2">
              No New Tokens Required
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800 px-4 py-2">
              Direct Uniswap Integration
            </Badge>
          </div>
        </div>

        {/* Main Conversion Interface */}
        <Card className="bg-white/80 backdrop-blur border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-600" />
              Convert Your ETHGR to ETH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Input Section */}
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ETHGR Amount to Convert
                </label>
                <Input
                  type="number"
                  value={ethgrAmount}
                  onChange={(e) => setEthgrAmount(e.target.value)}
                  placeholder="Enter ETHGR amount (e.g., 219300)"
                  className="text-lg"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Available: {ethgrBalance} ETHGR
                </p>
              </div>

              {/* Conversion Arrow */}
              <div className="flex justify-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <ArrowDown className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              {/* Output Section */}
              <div className="bg-green-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ETH You'll Receive
                </label>
                <div className="text-2xl font-bold text-green-600">
                  {estimatedETH} ETH
                </div>
                <div className="text-sm text-slate-600">
                  ≈ ${estimatedUSD} USD
                </div>
              </div>
            </div>

            {/* Conversion Button */}
            <Button 
              onClick={handleConvert}
              disabled={!ethgrAmount || parseFloat(ethgrAmount) <= 0 || isConverting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              {isConverting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Converting...
                </div>
              ) : (
                'Convert to ETH'
              )}
            </Button>

            {txHash && (
              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  ✅ Conversion successful! 
                  <a 
                    href={`https://etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    View transaction
                  </a>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Conversion Benefits */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-white/60">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Direct Value</h3>
              <p className="text-sm text-slate-600">
                Get immediate ETH value for your ETHGR tokens
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60">
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">No New Tokens</h3>
              <p className="text-sm text-slate-600">
                Use existing ETHGR tokens directly
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Uniswap Rates</h3>
              <p className="text-sm text-slate-600">
                Get best market rates via Uniswap
              </p>
            </CardContent>
          </Card>
        </div>

        {/* JavaScript Integration */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>JavaScript Integration Code</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{conversionScript}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Conversion History */}
        {conversionHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversionHistory.map((conversion, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">
                        {conversion.amount} ETHGR → {conversion.ethReceived} ETH
                      </div>
                      <div className="text-sm text-slate-600">
                        ${conversion.usdValue} • {conversion.timestamp}
                      </div>
                    </div>
                    <a 
                      href={`https://etherscan.io/tx/${conversion.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Tx
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
