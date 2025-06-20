import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet,
  ExternalLink,
  DollarSign,
  Zap,
  TrendingUp,
  Copy,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function ETHGRPoolCreation() {
  const [ethAmount, setEthAmount] = useState("0.1");
  const [ethgrAmount, setEthgrAmount] = useState("100000");
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const ethgrContract = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const uniswapV2Factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
  const uniswapV2Router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      } else {
        alert("Please install MetaMask to connect your wallet");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const addETHGRToken = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: ethgrContract,
              symbol: 'ETHGR',
              decimals: 18,
              image: 'https://via.placeholder.com/64x64.png?text=ETHGR',
            },
          },
        });
      } catch (error) {
        console.error('Error adding token:', error);
      }
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  const openUniswap = () => {
    window.open('https://app.uniswap.org/#/add/v2', '_blank');
  };

  const openEtherscan = () => {
    window.open(`https://etherscan.io/address/${ethgrContract}`, '_blank');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🚀</div>
        <h1 className="text-4xl font-bold">ETHGR Pool Creation</h1>
        <p className="text-xl text-muted-foreground">
          Create ETHGR/ETH liquidity pool and start monetizing your recovered tokens
        </p>
      </div>

      <Alert className="border-orange-500 bg-orange-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>ETH REQUIRED:</strong> Pool creation requires minimum 0.1 ETH. If you need more ETH, 
          check out alternative monetization strategies first.
          <Button 
            variant="link" 
            className="p-0 h-auto ml-2 text-orange-600"
            onClick={() => window.location.href = '/ethgr-monetization'}
          >
            View Alternatives →
          </Button>
        </AlertDescription>
      </Alert>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connection
          </CardTitle>
          <CardDescription>
            Connect your wallet to access your ETHGR tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!walletConnected ? (
            <div className="text-center space-y-4">
              <Button 
                onClick={connectWallet}
                disabled={isConnecting}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isConnecting ? "Connecting..." : "Connect MetaMask Wallet"}
              </Button>
              <p className="text-sm text-muted-foreground">
                Make sure you're connected to Ethereum Mainnet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Wallet connected successfully! You can now add ETHGR token and create liquidity.
                </AlertDescription>
              </Alert>

              <Button 
                onClick={addETHGRToken}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Add ETHGR Token to MetaMask
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            ETHGR Contract Details
          </CardTitle>
          <CardDescription>
            Your verified ETHGR token contract information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm font-bold mb-2">Contract Address:</div>
              <div className="font-mono text-xs break-all">{ethgrContract}</div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(ethgrContract, "Contract Address")}
                className="mt-2"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm font-bold mb-2">Token Details:</div>
              <div className="text-sm space-y-1">
                <div>Symbol: ETHGR</div>
                <div>Decimals: 18</div>
                <div>Supply: 1,990,000 tokens</div>
                <div>Status: Fully transferable</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={openEtherscan}
              variant="outline"
              className="border-purple-500"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Etherscan
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Pool Creation Calculator
          </CardTitle>
          <CardDescription>
            Calculate your initial liquidity pool parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eth-amount">ETH Amount</Label>
              <Input
                id="eth-amount"
                type="number"
                step="0.01"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                placeholder="0.1"
              />
              <div className="text-xs text-muted-foreground">
                ${(parseFloat(ethAmount || "0") * 2500).toFixed(2)} USD value
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ethgr-amount">ETHGR Amount</Label>
              <Input
                id="ethgr-amount"
                type="number"
                value={ethgrAmount}
                onChange={(e) => setEthgrAmount(e.target.value)}
                placeholder="100000"
              />
              <div className="text-xs text-muted-foreground">
                Initial price: 1 ETHGR = {(parseFloat(ethAmount || "0") / parseFloat(ethgrAmount || "1")).toFixed(8)} ETH
              </div>
            </div>
          </div>

          <Alert className="border-orange-500 bg-orange-50">
            <AlertDescription>
              <strong>Pool Strategy:</strong> Start with {ethAmount} ETH + {ethgrAmount} ETHGR to establish initial liquidity.
              You can add more liquidity later as trading volume increases.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Create Pool on Uniswap
          </CardTitle>
          <CardDescription>
            Step-by-step pool creation process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Badge variant="secondary">1</Badge>
              <div className="flex-1">
                <div className="font-bold">Connect Wallet</div>
                <div className="text-sm text-muted-foreground">Connect your MetaMask wallet to Uniswap</div>
              </div>
              {walletConnected && <CheckCircle className="h-5 w-5 text-green-600" />}
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Badge variant="secondary">2</Badge>
              <div className="flex-1">
                <div className="font-bold">Add ETHGR Token</div>
                <div className="text-sm text-muted-foreground">Import ETHGR token using contract address</div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Badge variant="secondary">3</Badge>
              <div className="flex-1">
                <div className="font-bold">Create Pool</div>
                <div className="text-sm text-muted-foreground">Select ETHGR/ETH pair and add initial liquidity</div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <Badge variant="secondary">4</Badge>
              <div className="flex-1">
                <div className="font-bold">Start Earning</div>
                <div className="text-sm text-muted-foreground">Earn 0.3% fees from all ETHGR/ETH trades</div>
              </div>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <Button
              onClick={openUniswap}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Uniswap V2 (Add Liquidity)
            </Button>

            <p className="text-sm text-muted-foreground">
              This will open Uniswap in a new tab where you can create your ETHGR/ETH pool
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
          <CardDescription>
            Contract addresses you'll need for pool creation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-bold">ETHGR Token:</div>
              <div className="font-mono text-xs break-all">{ethgrContract}</div>
            </div>
            <div>
              <div className="font-bold">WETH Token:</div>
              <div className="font-mono text-xs break-all">{wethAddress}</div>
            </div>
            <div>
              <div className="font-bold">Uniswap V2 Router:</div>
              <div className="font-mono text-xs break-all">{uniswapV2Router}</div>
            </div>
            <div>
              <div className="font-bold">Uniswap V2 Factory:</div>
              <div className="font-mono text-xs break-all">{uniswapV2Factory}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}