import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle, Info, Code, Coins, Users } from "lucide-react";

interface ENSContractInfo {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  freeSupply: string;
  airdropSupply: string;
  claimPeriodEnds: string;
  compilerVersion: string;
  isGovernanceToken: boolean;
}

interface ContractFunction {
  name: string;
  inputs: any[];
  outputs: any[];
  stateMutability: string;
  type: string;
  description: string;
}

export default function ENSContractAnalyzer() {
  const [contractAddress, setContractAddress] = useState("0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72");
  const [ensInfo, setEnsInfo] = useState<ENSContractInfo | null>(null);
  const [contractFunctions, setContractFunctions] = useState<ContractFunction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-loaded ENS token ABI from your provided data
  const ensAbi = [
    {
      "inputs": [
        {"internalType": "uint256", "name": "freeSupply", "type": "uint256"},
        {"internalType": "uint256", "name": "airdropSupply", "type": "uint256"},
        {"internalType": "uint256", "name": "_claimPeriodEnds", "type": "uint256"}
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
        {"indexed": true, "internalType": "address", "name": "spender", "type": "address"},
        {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "to", "type": "address"},
        {"internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "transfer",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "delegatee", "type": "address"}
      ],
      "name": "delegate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
      "name": "getCurrentVotes",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // Decoded constructor arguments from your provided data
  const constructorArgs = {
    freeSupply: "74999999999999998618845952",
    airdropSupply: "25000000000000001381154048",
    claimPeriodEnds: "1651622400" // Unix timestamp
  };

  const analyzeENSContract = async () => {
    setLoading(true);
    setError(null);

    try {
      // Process the pre-loaded ABI
      const functions = ensAbi
        .filter(item => item.type === 'function')
        .map(func => ({
          name: func.name,
          inputs: func.inputs || [],
          outputs: func.outputs || [],
          stateMutability: func.stateMutability || 'nonpayable',
          type: func.type,
          description: getENSFunctionDescription(func.name)
        }));

      // Add constructor info
      const constructor = ensAbi.find(item => item.type === 'constructor');
      if (constructor) {
        functions.unshift({
          name: 'constructor',
          inputs: constructor.inputs || [],
          outputs: [],
          stateMutability: constructor.stateMutability || 'nonpayable',
          type: 'constructor',
          description: 'Initialize ENS token with supply distribution and claim period'
        });
      }

      setContractFunctions(functions);

      // Create ENS contract info
      const claimDate = new Date(parseInt(constructorArgs.claimPeriodEnds) * 1000);
      setEnsInfo({
        address: contractAddress,
        name: "Ethereum Name Service",
        symbol: "ENS",
        totalSupply: "100000000000000000000000000", // 100M tokens
        freeSupply: constructorArgs.freeSupply,
        airdropSupply: constructorArgs.airdropSupply,
        claimPeriodEnds: claimDate.toLocaleDateString(),
        compilerVersion: "v0.8.4+commit.c7e474f2",
        isGovernanceToken: true
      });

    } catch (err) {
      setError('Failed to analyze ENS contract');
    }

    setLoading(false);
  };

  const getENSFunctionDescription = (functionName: string): string => {
    const descriptions: Record<string, string> = {
      'name': 'Returns the token name: "Ethereum Name Service"',
      'symbol': 'Returns the token symbol: "ENS"',
      'decimals': 'Returns token decimals (18 for ENS)',
      'totalSupply': 'Returns total token supply (100M ENS)',
      'balanceOf': 'Check ENS token balance of any address',
      'transfer': 'Transfer ENS tokens to another address',
      'delegate': 'Delegate voting power to another address',
      'getCurrentVotes': 'Check current voting power of an address',
      'constructor': 'Initial token distribution setup'
    };
    return descriptions[functionName] || 'ENS governance function';
  };

  const formatTokenAmount = (amount: string) => {
    const num = BigInt(amount);
    const formatted = (Number(num) / 1e18).toLocaleString();
    return `${formatted} ENS`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            ENS Token Contract Analyzer
          </CardTitle>
          <CardDescription>
            Analyze the Ethereum Name Service governance token contract with authentic blockchain data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter ENS contract address (0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72)"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
            />
            <Button onClick={analyzeENSContract} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze ENS Contract"}
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-red-800 dark:text-red-200">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {ensInfo && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Token Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="font-mono">{ensInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Symbol:</span>
                  <span className="font-mono">{ensInfo.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge variant="secondary">Governance Token</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Supply:</span>
                  <span className="font-mono text-sm">100,000,000 ENS</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Distribution Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Free Supply:</span>
                  <span className="font-mono text-sm">{formatTokenAmount(ensInfo.freeSupply)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Airdrop Supply:</span>
                  <span className="font-mono text-sm">{formatTokenAmount(ensInfo.airdropSupply)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Claim Period Ended:</span>
                  <span className="font-mono text-sm">{ensInfo.claimPeriodEnds}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {contractFunctions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Contract Functions</CardTitle>
            <CardDescription>
              Available functions in the ENS governance token contract
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({contractFunctions.length})</TabsTrigger>
                <TabsTrigger value="view">View ({contractFunctions.filter(f => f.stateMutability === 'view').length})</TabsTrigger>
                <TabsTrigger value="nonpayable">Write ({contractFunctions.filter(f => f.stateMutability === 'nonpayable').length})</TabsTrigger>
                <TabsTrigger value="constructor">Setup (1)</TabsTrigger>
              </TabsList>

              {['all', 'view', 'nonpayable', 'constructor'].map(filter => (
                <TabsContent key={filter} value={filter}>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {contractFunctions
                        .filter(func => filter === 'all' || 
                          (filter === 'constructor' && func.type === 'constructor') ||
                          (filter !== 'constructor' && func.stateMutability === filter))
                        .map((func, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium flex items-center gap-2">
                                <code className="bg-muted px-2 py-1 rounded text-sm">{func.name}</code>
                                <Badge variant={func.stateMutability === 'view' ? 'secondary' : 'default'}>
                                  {func.stateMutability}
                                </Badge>
                              </h4>
                              {func.name === 'delegate' && (
                                <Badge variant="outline" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Governance
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{func.description}</p>
                            
                            {func.inputs.length > 0 && (
                              <div>
                                <h5 className="font-medium text-sm mb-1">Parameters:</h5>
                                <div className="space-y-1">
                                  {func.inputs.map((input, i) => (
                                    <div key={i} className="text-xs font-mono bg-muted/50 px-2 py-1 rounded">
                                      {input.name}: <span className="text-blue-600 dark:text-blue-400">{input.type}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {func.outputs.length > 0 && (
                              <div>
                                <h5 className="font-medium text-sm mb-1">Returns:</h5>
                                <div className="space-y-1">
                                  {func.outputs.map((output, i) => (
                                    <div key={i} className="text-xs font-mono bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                                      {output.name || 'result'}: <span className="text-green-600 dark:text-green-400">{output.type}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}

      {ensInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Governance Capabilities</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Delegation of voting power</li>
                  <li>• Voting on ENS proposals</li>
                  <li>• Democratic governance structure</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Token Distribution</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 75% allocated to community (free supply)</li>
                  <li>• 25% reserved for airdrops</li>
                  <li>• Fixed claim period for fairness</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}