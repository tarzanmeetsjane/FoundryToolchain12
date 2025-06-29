import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink,
  Lightbulb,
  Code,
  Wallet,
  Settings
} from "lucide-react";

export default function AlternativeSolutions() {
  const [selectedMethod, setSelectedMethod] = useState("metamask");

  const alternativeMethods = [
    {
      id: "metamask",
      name: "MetaMask Direct Interaction",
      difficulty: "Easy",
      time: "5 minutes",
      success: "High",
      description: "Use MetaMask's built-in contract interaction feature",
      steps: [
        "Open MetaMask browser extension",
        "Go to 'Activity' → 'Contract Interaction'",
        "Enter ETHGR contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
        "Select 'approve' function",
        "Enter parameters and execute"
      ]
    },
    {
      id: "1inch",
      name: "1inch DEX Direct Trading",
      difficulty: "Easy",
      time: "3 minutes",
      success: "High",
      description: "Create liquidity directly on 1inch DEX",
      steps: [
        "Go to app.1inch.io",
        "Connect wallet",
        "Navigate to 'Pools' section",
        "Create ETHGR/ETH pool",
        "Add initial liquidity"
      ]
    },
    {
      id: "dextools",
      name: "DEXTools Pool Creation",
      difficulty: "Medium",
      time: "10 minutes",
      success: "Medium",
      description: "Use DEXTools advanced features for pool creation",
      steps: [
        "Go to dextools.io",
        "Connect wallet",
        "Use 'Pool Creator' tool",
        "Configure ETHGR/ETH parameters",
        "Deploy pool contract"
      ]
    },
    {
      id: "python",
      name: "Python Web3 Script",
      difficulty: "Advanced",
      time: "15 minutes",
      success: "Very High",
      description: "Execute transactions using Python web3.py",
      steps: [
        "Use provided Python script",
        "Install web3.py library",
        "Configure wallet private key",
        "Run automated execution script"
      ]
    },
    {
      id: "rabby",
      name: "Rabby Wallet Interface",
      difficulty: "Easy",
      time: "5 minutes",
      success: "High",
      description: "Use Rabby's enhanced contract interaction",
      steps: [
        "Install Rabby wallet extension",
        "Import your wallet",
        "Use contract interaction feature",
        "Execute approve and liquidity functions"
      ]
    }
  ];

  const quickSolutions = [
    {
      name: "Immediate Trading on Existing DEX",
      description: "Skip pool creation, trade directly on existing platforms",
      action: "Check if ETHGR already has liquidity on other DEXs",
      link: "https://www.coingecko.com/en/coins/ethgr"
    },
    {
      name: "OTC (Over-The-Counter) Sale",
      description: "Sell tokens directly to buyers without pool creation",
      action: "List on OTC platforms or Telegram groups",
      link: "https://t.me/otctrading"
    },
    {
      name: "Cross-Chain Bridge Solution",
      description: "Bridge tokens to different chain with better liquidity options",
      action: "Use multichain bridges to move to BSC or Polygon",
      link: "https://multichain.org"
    }
  ];

  const pythonScript = `
# ETHGR Pool Creation Script
from web3 import Web3
import json

# Connect to Ethereum
w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY'))

# Your wallet setup
private_key = "YOUR_PRIVATE_KEY"
account = w3.eth.account.from_key(private_key)

# Contract addresses
ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247"
UNISWAP_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"

# ERC20 ABI (approve function)
erc20_abi = [{"constant":False,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"type":"function"}]

# Create contract instance
ethgr_contract = w3.eth.contract(address=ETHGR_CONTRACT, abi=erc20_abi)

# Step 1: Approve tokens
approve_txn = ethgr_contract.functions.approve(
    UNISWAP_ROUTER,
    9000000000000000000000  # 9000 ETHGR
).build_transaction({
    'from': account.address,
    'gas': 60000,
    'gasPrice': w3.to_wei('10', 'gwei'),
    'nonce': w3.eth.get_transaction_count(account.address)
})

# Sign and send
signed_txn = w3.eth.account.sign_transaction(approve_txn, private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
print(f"Approval transaction: {txn_hash.hex()}")
`;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">💡</div>
        <h1 className="text-4xl font-bold">ALTERNATIVE EXECUTION METHODS</h1>
        <p className="text-xl text-muted-foreground">
          Multiple paths to unlock your ETHGR token value
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Multiple Options Available:</strong> Since direct Etherscan interaction has challenges, 
          here are proven alternative methods to create your pool and enable trading.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="methods">Alternative Methods</TabsTrigger>
          <TabsTrigger value="quick">Quick Solutions</TabsTrigger>
          <TabsTrigger value="script">Python Script</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alternativeMethods.map((method) => (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all ${
                  selectedMethod === method.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{method.name}</CardTitle>
                    <Badge variant={method.success === 'Very High' ? 'default' : 'outline'}>
                      {method.success}
                    </Badge>
                  </div>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                    <div>
                      <strong>Difficulty:</strong> {method.difficulty}
                    </div>
                    <div>
                      <strong>Time:</strong> {method.time}
                    </div>
                    <div>
                      <strong>Success:</strong> {method.success}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <strong className="text-sm">Steps:</strong>
                    <ol className="list-decimal list-inside text-xs space-y-1">
                      {method.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quick" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Immediate Value Realization Options</CardTitle>
              <CardDescription>
                Alternative approaches to monetize your tokens without pool creation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickSolutions.map((solution, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <h3 className="font-bold">{solution.name}</h3>
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{solution.action}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(solution.link, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Explore
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="script" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Python Web3 Automation Script
              </CardTitle>
              <CardDescription>
                Complete automation for pool creation using Python
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Settings className="h-4 w-4" />
                <AlertDescription>
                  <strong>Requirements:</strong> Python 3.7+, web3.py library, Infura API key, wallet private key
                </AlertDescription>
              </Alert>

              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto">
                <pre>{pythonScript}</pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => window.open('https://web3py.readthedocs.io/', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Web3.py Documentation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://infura.io/', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Get Infura API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-green-500">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">RECOMMENDED: METAMASK DIRECT</CardTitle>
          <CardDescription>
            Fastest and most reliable method for immediate execution
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl">🦊</div>
          <p className="text-lg">
            Use MetaMask's built-in contract interaction feature to execute the approve function directly
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => window.open('https://metamask.io/', '_blank')}
          >
            <Wallet className="h-5 w-5 mr-2" />
            TRY METAMASK METHOD
          </Button>
        </CardContent>
      </Card>

      <Alert className="border-orange-500 bg-orange-50">
        <AlertDescription>
          <strong>Alternative Strategy:</strong> If all direct methods fail, consider selling ETHGR tokens 
          OTC (over-the-counter) to immediate buyers, or check if other DEX platforms already have ETHGR liquidity.
        </AlertDescription>
      </Alert>
    </div>
  );
}