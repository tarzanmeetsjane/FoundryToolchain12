import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Search, DollarSign, Info, ExternalLink, Copy } from "lucide-react";
import { AddressValidator } from "@/lib/address-validator";

// WETH ABI from the user's file
const WETH_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "spender", "type": "address"},
      {"name": "value", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "from", "type": "address"},
      {"name": "to", "type": "address"},
      {"name": "value", "type": "uint256"}
    ],
    "name": "transferFrom",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{"name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "value", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {"name": "owner", "type": "address"},
      {"name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "from", "type": "address"},
      {"indexed": true, "name": "to", "type": "address"},
      {"indexed": false, "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "owner", "type": "address"},
      {"indexed": true, "name": "spender", "type": "address"},
      {"indexed": false, "name": "value", "type": "uint256"}
    ],
    "name": "Approval",
    "type": "event"
  }
];

interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  isWETH: boolean;
}

interface FunctionCall {
  name: string;
  inputs: any[];
  outputs: any[];
  stateMutability: string;
  description: string;
}

export default function TokenContractAnalyzer() {
  const [contractAddress, setContractAddress] = useState("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [selectedFunction, setSelectedFunction] = useState<string>("");

  const isWETHContract = contractAddress.toLowerCase() === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

  const availableFunctions: FunctionCall[] = [
    {
      name: "balanceOf",
      inputs: [{"name": "owner", "type": "address"}],
      outputs: [{"name": "", "type": "uint256"}],
      stateMutability: "view",
      description: "Check token balance of any address"
    },
    {
      name: "allowance",
      inputs: [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"}],
      outputs: [{"name": "", "type": "uint256"}],
      stateMutability: "view",
      description: "Check approved spending allowance"
    },
    {
      name: "totalSupply",
      inputs: [],
      outputs: [{"name": "", "type": "uint256"}],
      stateMutability: "view",
      description: "Get total token supply"
    },
    {
      name: "name",
      inputs: [],
      outputs: [{"name": "", "type": "string"}],
      stateMutability: "view",
      description: "Get token name"
    },
    {
      name: "symbol",
      inputs: [],
      outputs: [{"name": "", "type": "string"}],
      stateMutability: "view",
      description: "Get token symbol"
    },
    {
      name: "decimals",
      inputs: [],
      outputs: [{"name": "", "type": "uint8"}],
      stateMutability: "view",
      description: "Get token decimal places"
    }
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatABI = () => {
    return JSON.stringify(WETH_ABI, null, 2);
  };

  const generateFunctionCall = (funcName: string) => {
    const func = WETH_ABI.find(f => f.name === funcName && f.type === 'function');
    if (!func) return '';

    const inputs = func.inputs.map(input => `${input.type} ${input.name}`).join(', ');
    return `${func.name}(${inputs})`;
  };

  const generateWeb3Code = () => {
    return `// Web3.js Example for WETH Contract
import Web3 from 'web3';

const web3 = new Web3('YOUR_RPC_ENDPOINT');
const contractAddress = '${contractAddress}';
const abi = ${JSON.stringify(WETH_ABI, null, 2)};

const contract = new web3.eth.Contract(abi, contractAddress);

// Example: Check WETH balance
async function checkBalance(walletAddress) {
  try {
    const balance = await contract.methods.balanceOf(walletAddress).call();
    const decimals = await contract.methods.decimals().call();
    const formattedBalance = balance / Math.pow(10, decimals);
    console.log(\`WETH Balance: \${formattedBalance} WETH\`);
    return formattedBalance;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example: Get token info
async function getTokenInfo() {
  const name = await contract.methods.name().call();
  const symbol = await contract.methods.symbol().call();
  const decimals = await contract.methods.decimals().call();
  const totalSupply = await contract.methods.totalSupply().call();
  
  return { name, symbol, decimals, totalSupply };
}`;
  };

  const generateEthersCode = () => {
    return `// Ethers.js Example for WETH Contract
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_ENDPOINT');
const contractAddress = '${contractAddress}';
const abi = ${JSON.stringify(WETH_ABI, null, 2)};

const contract = new ethers.Contract(contractAddress, abi, provider);

// Example: Check WETH balance
async function checkBalance(walletAddress) {
  try {
    const balance = await contract.balanceOf(walletAddress);
    const decimals = await contract.decimals();
    const formattedBalance = ethers.utils.formatUnits(balance, decimals);
    console.log(\`WETH Balance: \${formattedBalance} WETH\`);
    return formattedBalance;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example: Get token info
async function getTokenInfo() {
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply()
  ]);
  
  return { 
    name, 
    symbol, 
    decimals, 
    totalSupply: ethers.utils.formatUnits(totalSupply, decimals)
  };
}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Token Contract Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Contract Address</label>
            <div className="flex gap-2">
              <Input
                placeholder="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="flex-1 font-mono"
              />
              <Button
                variant="outline"
                onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            {isWETHContract && (
              <div className="flex items-center gap-2">
                <Badge variant="default">✓ WETH Contract Detected</Badge>
                <span className="text-sm text-muted-foreground">ABI loaded and ready</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="functions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="functions">Contract Functions</TabsTrigger>
          <TabsTrigger value="abi">ABI Data</TabsTrigger>
          <TabsTrigger value="code">Integration Code</TabsTrigger>
        </TabsList>

        <TabsContent value="functions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Available Functions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {availableFunctions.map((func, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={func.stateMutability === 'view' ? 'secondary' : 'default'}>
                          {func.stateMutability === 'view' ? 'READ' : 'WRITE'}
                        </Badge>
                        <span className="font-mono font-medium">{func.name}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generateFunctionCall(func.name))}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{func.description}</p>
                    <code className="text-xs bg-muted p-2 rounded block">
                      {generateFunctionCall(func.name)}
                    </code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Contract ABI
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(formatABI())}
                >
                  <Copy className="h-4 w-4" />
                  Copy ABI
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Contract Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Address:</strong> {contractAddress}</p>
                    <p><strong>Type:</strong> ERC-20 Token Contract</p>
                    <p><strong>Functions:</strong> {WETH_ABI.filter(item => item.type === 'function').length}</p>
                    <p><strong>Events:</strong> {WETH_ABI.filter(item => item.type === 'event').length}</p>
                  </div>
                </div>

                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-96">
                  <code>{formatABI()}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="web3" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="web3">Web3.js</TabsTrigger>
                  <TabsTrigger value="ethers">Ethers.js</TabsTrigger>
                </TabsList>

                <TabsContent value="web3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Web3.js Implementation</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generateWeb3Code())}
                      >
                        <Copy className="h-4 w-4" />
                        Copy Code
                      </Button>
                    </div>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-96">
                      <code>{generateWeb3Code()}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="ethers">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Ethers.js Implementation</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generateEthersCode())}
                      >
                        <Copy className="h-4 w-4" />
                        Copy Code
                      </Button>
                    </div>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-96">
                      <code>{generateEthersCode()}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}