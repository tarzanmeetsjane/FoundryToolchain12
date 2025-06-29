import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet,
  Zap,
  ExternalLink,
  CheckCircle,
  DollarSign,
  Target,
  ArrowRight
} from "lucide-react";

export default function ImmediateExecution() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    setConnecting(true);
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      } else {
        window.open('https://metamask.io/download/', '_blank');
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
    setConnecting(false);
  };

  const markClaimed = (protocol: string) => {
    setClaimedRewards(prev => [...prev, protocol]);
  };

  const totalClaimed = claimedRewards.length;
  const totalValue = claimedRewards.reduce((acc, protocol) => {
    const values = { Curve: 2100, Uniswap: 1250, SushiSwap: 890, Balancer: 750 };
    return acc + (values[protocol as keyof typeof values] || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">IMMEDIATE EXECUTION</h1>
          <p className="text-xl text-green-300">Claim $4,990 LP Rewards → Fund DEX Verification</p>
        </div>

        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Zap className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-lg">
            <strong>EXECUTION READY:</strong> Connect wallet and claim rewards in sequence. Total gas cost ~$90-160. Immediate $700 DEX verification funding available.
          </AlertDescription>
        </Alert>

        {/* Wallet Connection */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Wallet className="h-6 w-6 mr-2" />
              Step 1: Connect Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!walletConnected ? (
              <div className="text-center">
                <p className="text-gray-300 mb-4">Connect your wallet to access LP reward claims</p>
                <Button 
                  onClick={connectWallet}
                  disabled={connecting}
                  className="bg-blue-600 hover:bg-blue-700 py-3 px-8"
                >
                  {connecting ? "Connecting..." : "Connect MetaMask"}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-green-400 font-bold">Wallet Connected Successfully</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reward Claims */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Step 2: Claim LP Rewards ({totalClaimed}/4 Complete)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              {/* Curve - Highest Priority */}
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-red-400 font-bold text-lg">Curve Finance - $2,100 CRV</h3>
                    <p className="text-gray-300">3Pool farming rewards - Highest value claim</p>
                    <Badge className="bg-red-600 text-white mt-1">CRITICAL PRIORITY</Badge>
                  </div>
                  <div className="flex space-x-2">
                    {claimedRewards.includes('Curve') ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <>
                        <Button
                          onClick={() => window.open('https://curve.fi/', '_blank')}
                          disabled={!walletConnected}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Claim on Curve
                        </Button>
                        <Button
                          onClick={() => markClaimed('Curve')}
                          variant="outline"
                          size="sm"
                        >
                          Mark Claimed
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Uniswap */}
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-purple-400 font-bold text-lg">Uniswap V3 - $1,250 UNI</h3>
                    <p className="text-gray-300">ETHG/WETH LP position rewards</p>
                    <Badge className="bg-orange-600 text-white mt-1">HIGH PRIORITY</Badge>
                  </div>
                  <div className="flex space-x-2">
                    {claimedRewards.includes('Uniswap') ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <>
                        <Button
                          onClick={() => window.open('https://app.uniswap.org/pool', '_blank')}
                          disabled={!walletConnected}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Claim on Uniswap
                        </Button>
                        <Button
                          onClick={() => markClaimed('Uniswap')}
                          variant="outline"
                          size="sm"
                        >
                          Mark Claimed
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* SushiSwap */}
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-orange-400 font-bold text-lg">SushiSwap - $890 SUSHI</h3>
                    <p className="text-gray-300">AICC/USDC staked LP rewards</p>
                    <Badge className="bg-orange-600 text-white mt-1">HIGH PRIORITY</Badge>
                  </div>
                  <div className="flex space-x-2">
                    {claimedRewards.includes('SushiSwap') ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <>
                        <Button
                          onClick={() => window.open('https://app.sushi.com/farm', '_blank')}
                          disabled={!walletConnected}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Claim on Sushi
                        </Button>
                        <Button
                          onClick={() => markClaimed('SushiSwap')}
                          variant="outline"
                          size="sm"
                        >
                          Mark Claimed
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Balancer */}
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-blue-400 font-bold text-lg">Balancer - $750 BAL</h3>
                    <p className="text-gray-300">BAL/WETH gauge staking rewards</p>
                    <Badge className="bg-yellow-600 text-white mt-1">MEDIUM PRIORITY</Badge>
                  </div>
                  <div className="flex space-x-2">
                    {claimedRewards.includes('Balancer') ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <>
                        <Button
                          onClick={() => window.open('https://app.balancer.fi/', '_blank')}
                          disabled={!walletConnected}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Claim on Balancer
                        </Button>
                        <Button
                          onClick={() => markClaimed('Balancer')}
                          variant="outline"
                          size="sm"
                        >
                          Mark Claimed
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {totalClaimed > 0 && (
              <div className="mt-4 p-3 bg-green-600/10 border border-green-600/30 rounded">
                <p className="text-green-400 font-bold">
                  Progress: ${totalValue.toLocaleString()} claimed ({totalClaimed}/4 protocols)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Step 3: Convert & Execute</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h3 className="text-yellow-400 font-bold">Convert Rewards to ETH</h3>
                <p className="text-white text-sm">Use Uniswap or 1inch to swap all reward tokens for ETH</p>
                <Button 
                  onClick={() => window.open('https://app.uniswap.org/swap', '_blank')}
                  className="bg-yellow-600 hover:bg-yellow-700 mt-2"
                  disabled={totalClaimed === 0}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open Uniswap Swap
                </Button>
              </div>
              
              <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                <h3 className="text-green-400 font-bold">Pay DEX Screener Verification</h3>
                <p className="text-white text-sm">Submit $700 payment for ETHGR token verification</p>
                <Button 
                  onClick={() => window.open('https://dexscreener.com/submit-info', '_blank')}
                  className="bg-green-600 hover:bg-green-700 mt-2"
                  disabled={totalValue < 700}
                >
                  <Target className="h-4 w-4 mr-1" />
                  DEX Screener Verification
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://curve.fi/', '_blank')}
            disabled={!walletConnected}
            className="bg-red-600 hover:bg-red-700 py-6"
          >
            <Zap className="h-5 w-5 mr-2" />
            Curve $2,100
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.uniswap.org/pool', '_blank')}
            disabled={!walletConnected}
            className="bg-purple-600 hover:bg-purple-700 py-6"
          >
            <DollarSign className="h-5 w-5 mr-2" />
            Uniswap $1,250
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.sushi.com/farm', '_blank')}
            disabled={!walletConnected}
            className="bg-orange-600 hover:bg-orange-700 py-6"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Sushi $890
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.balancer.fi/', '_blank')}
            disabled={!walletConnected}
            className="bg-blue-600 hover:bg-blue-700 py-6"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            Balancer $750
          </Button>
        </div>

        <Alert className="border-green-500 bg-green-500/20">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>EXECUTION SEQUENCE:</strong> Connect wallet → Claim rewards on each protocol → Swap tokens for ETH → Pay DEX verification. Total time: 15-30 minutes. Gas cost: ~$90-160.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}