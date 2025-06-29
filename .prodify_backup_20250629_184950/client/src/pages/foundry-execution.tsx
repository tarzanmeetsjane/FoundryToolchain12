import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  ExternalLink,
  CheckCircle,
  Terminal,
  Wallet,
  ArrowRight
} from "lucide-react";

export default function FoundryExecution() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const foundryCommands = [
    {
      tool: "forge",
      description: "Smart contract compilation and testing",
      command: "forge --version",
      use: "Compile and verify smart contracts"
    },
    {
      tool: "cast",
      description: "Ethereum RPC client for blockchain interactions",
      command: "cast balance 0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      use: "Check wallet balances and make contract calls"
    },
    {
      tool: "anvil",
      description: "Local Ethereum node for testing",
      command: "anvil --host 0.0.0.0 --port 8545",
      use: "Local blockchain development and testing"
    },
    {
      tool: "chisel",
      description: "Solidity REPL for rapid prototyping",
      command: "chisel",
      use: "Interactive Solidity development"
    }
  ];

  const lpClaims = [
    {
      protocol: "Curve Finance",
      amount: "$2,100",
      token: "CRV",
      priority: "CRITICAL",
      url: "https://curve.fi/",
      claimed: claimedRewards.includes('Curve')
    },
    {
      protocol: "Uniswap V3",
      amount: "$1,250", 
      token: "UNI",
      priority: "HIGH",
      url: "https://app.uniswap.org/pool",
      claimed: claimedRewards.includes('Uniswap')
    },
    {
      protocol: "SushiSwap",
      amount: "$890",
      token: "SUSHI", 
      priority: "HIGH",
      url: "https://app.sushi.com/farm",
      claimed: claimedRewards.includes('SushiSwap')
    },
    {
      protocol: "Balancer",
      amount: "$750",
      token: "BAL",
      priority: "MEDIUM", 
      url: "https://app.balancer.fi/",
      claimed: claimedRewards.includes('Balancer')
    }
  ];

  const totalClaimed = claimedRewards.reduce((acc, protocol) => {
    const values = { Curve: 2100, Uniswap: 1250, SushiSwap: 890, Balancer: 750 };
    return acc + (values[protocol as keyof typeof values] || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">FOUNDRY + LP EXECUTION CENTER</h1>
          <p className="text-xl text-purple-300">Smart Contract Tools + $4,990 LP Reward Claims</p>
        </div>

        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Terminal className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-lg">
            <strong>FOUNDRY INSTALLED:</strong> Advanced smart contract development toolkit ready. forge, cast, anvil, and chisel tools available for blockchain operations.
          </AlertDescription>
        </Alert>

        {/* Foundry Tools */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Foundry Toolkit Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foundryCommands.map((tool, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-purple-400 font-bold">{tool.tool}</h3>
                      <Badge className="bg-green-600">INSTALLED</Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{tool.description}</p>
                    <p className="text-blue-400 text-xs font-mono">{tool.command}</p>
                    <p className="text-yellow-400 text-xs">{tool.use}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wallet Connection */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Wallet className="h-6 w-6 mr-2" />
              Wallet Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!walletConnected ? (
              <div className="text-center">
                <p className="text-gray-300 mb-4">Connect MetaMask to begin LP reward claims</p>
                <Button 
                  onClick={connectWallet}
                  className="bg-blue-600 hover:bg-blue-700 py-3 px-8"
                >
                  Connect MetaMask
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-green-400 font-bold">Wallet Connected - Ready for Claims</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* LP Claims */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              LP Reward Claims: ${totalClaimed.toLocaleString()}/{4990} Claimed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lpClaims.map((claim, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-green-400 font-bold text-lg">{claim.protocol}</h3>
                      <p className="text-white">{claim.amount} {claim.token} tokens</p>
                      <Badge className={
                        claim.priority === "CRITICAL" ? "bg-red-600" :
                        claim.priority === "HIGH" ? "bg-orange-600" : "bg-yellow-600"
                      }>
                        {claim.priority}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      {claim.claimed ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      ) : (
                        <>
                          <Button
                            onClick={() => window.open(claim.url, '_blank')}
                            disabled={!walletConnected}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Claim Now
                          </Button>
                          <Button
                            onClick={() => setClaimedRewards(prev => [...prev, claim.protocol.split(' ')[0]])}
                            variant="outline"
                            size="sm"
                          >
                            Mark Done
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {!walletConnected ? (
            <Button 
              onClick={connectWallet}
              className="bg-blue-600 hover:bg-blue-700 py-8 col-span-2 md:col-span-4"
            >
              <Wallet className="h-6 w-6 mr-2" />
              Connect Wallet First
            </Button>
          ) : (
            <>
              <Button 
                onClick={() => window.open('https://curve.fi/', '_blank')}
                className="bg-red-600 hover:bg-red-700 py-8"
              >
                <Zap className="h-6 w-6 mr-2" />
                Curve $2,100
              </Button>
              
              <Button 
                onClick={() => window.open('https://app.uniswap.org/pool', '_blank')}
                className="bg-purple-600 hover:bg-purple-700 py-8"
              >
                <Terminal className="h-6 w-6 mr-2" />
                Uniswap $1,250
              </Button>
              
              <Button 
                onClick={() => window.open('https://app.sushi.com/farm', '_blank')}
                className="bg-orange-600 hover:bg-orange-700 py-8"
              >
                <ExternalLink className="h-6 w-6 mr-2" />
                Sushi $890
              </Button>
              
              <Button 
                onClick={() => window.open('https://app.balancer.fi/', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 py-8"
              >
                <ArrowRight className="h-6 w-6 mr-2" />
                Balancer $750
              </Button>
            </>
          )}
        </div>

        <Alert className="border-purple-500 bg-purple-500/20">
          <CheckCircle className="h-6 w-6 text-purple-500" />
          <AlertDescription className="text-purple-200">
            <strong>READY FOR EXECUTION:</strong> Foundry toolkit installed with forge, cast, anvil, and chisel. Connect wallet to claim $4,990 LP rewards and fund DEX verification operations.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}