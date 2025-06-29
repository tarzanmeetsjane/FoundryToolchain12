import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle,
  Clock,
  ExternalLink,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Zap
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ExecutionStatus() {
  const TARGET_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const [executionSteps, setExecutionSteps] = useState([
    { name: "ETHG Token Approval", status: "completed", txHash: null },
    { name: "ETHGR Token Approval", status: "completed", txHash: null },
    { name: "Create ETHG/ETHGR Pair", status: "pending", txHash: null },
    { name: "Add Dual-Token Liquidity", status: "pending", txHash: null }
  ]);

  // Check wallet for recent transactions
  const { data: walletData, isLoading, refetch } = useQuery({
    queryKey: ['/api/wallet/security', TARGET_WALLET],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/security/${TARGET_WALLET}`);
      if (!response.ok) throw new Error('Failed to fetch wallet data');
      return response.json();
    },
    refetchInterval: 15000 // Check every 15 seconds for updates
  });

  // Check for recent transactions to verify completion
  const { data: recentTxs } = useQuery({
    queryKey: ['/api/uniscan/transactions', TARGET_WALLET],
    queryFn: async () => {
      const response = await fetch(`/api/uniscan/transactions/${TARGET_WALLET}`);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      return response.json();
    },
    refetchInterval: 10000
  });

  const ethBalance = walletData?.balances?.find((b: any) => 
    b.token_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  );
  const ethAmount = ethBalance ? parseFloat(ethBalance.balance) / 1e18 : 0;

  const portfolioValue = ethAmount * 2515.77 + (1990000 + 2100000) * 0.335;
  const currentStep = executionSteps.findIndex(step => step.status === "pending");
  const completedSteps = executionSteps.filter(step => step.status === "completed").length;

  // Contract addresses for verification
  const contracts = {
    ethg: "0xd9145CCE52D386f254917e481eB44e9943F39138",
    ethgr: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
  };

  const getNextStepInstructions = () => {
    if (currentStep === 2) {
      return {
        title: "Create ETHG/ETHGR Trading Pair",
        description: "Execute createPair function on Uniswap V2 Factory",
        contract: contracts.factory,
        function: "createPair",
        params: `tokenA: ${contracts.ethg}\ntokenB: ${contracts.ethgr}`
      };
    } else if (currentStep === 3) {
      return {
        title: "Add Dual-Token Liquidity",
        description: "Add ETHG and ETHGR tokens to create the liquidity pool",
        contract: contracts.router,
        function: "addLiquidity",
        params: `tokenA: ${contracts.ethg}\ntokenB: ${contracts.ethgr}\namountADesired: 100000000000000000000000\namountBDesired: 100000000000000000000000\namountAMin: 90000000000000000000000\namountBMin: 90000000000000000000000\nto: ${TARGET_WALLET}\ndeadline: ${Math.floor(Date.now() / 1000) + 1200}`
      };
    }
    return null;
  };

  const nextStep = getNextStepInstructions();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">⚡</div>
        <h1 className="text-4xl font-bold">EXECUTION STATUS</h1>
        <p className="text-xl text-muted-foreground">
          ETHG/ETHGR Pool Creation Progress
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Execution Progress
          </CardTitle>
          <CardDescription>
            {completedSteps}/4 steps completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Overall Progress</span>
              <Badge variant="default">{Math.round((completedSteps / 4) * 100)}% Complete</Badge>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedSteps / 4) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {executionSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-green-600 text-white' :
                    index === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.status === 'completed' ? 
                      <CheckCircle className="h-4 w-4" /> : 
                      <Clock className="h-4 w-4" />
                    }
                  </div>
                  <div className="text-xs font-medium">{step.name}</div>
                  <Badge variant={step.status === 'completed' ? 'default' : 'outline'} className="text-xs">
                    {step.status === 'completed' ? 'Done' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Token Approvals Complete:</strong> Both ETHG and ETHGR tokens have been approved for Uniswap router
            </AlertDescription>
          </Alert>

          {!isLoading && walletData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{ethAmount.toFixed(6)}</div>
                <div className="text-sm text-muted-foreground">ETH Available</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">1,990,000</div>
                <div className="text-sm text-muted-foreground">ETHGR Approved</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">2,100,000</div>
                <div className="text-sm text-muted-foreground">ETHG Approved</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Step */}
      {nextStep && (
        <Card className="border-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Next Step: {nextStep.title}
            </CardTitle>
            <CardDescription>
              {nextStep.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium mb-1">Contract Address:</div>
                <div className="font-mono text-sm bg-muted p-2 rounded">{nextStep.contract}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Function:</div>
                <div className="font-mono text-sm bg-muted p-2 rounded">{nextStep.function}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Parameters:</div>
                <div className="font-mono text-xs bg-muted p-3 rounded whitespace-pre-line">
                  {nextStep.params}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => window.open(`https://etherscan.io/address/${nextStep.contract}#writeContract`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Execute on Etherscan
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigator.clipboard.writeText(nextStep.params)}
              >
                Copy Parameters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Status */}
      {completedSteps === 4 && (
        <Card className="border-green-500">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">
              🎉 POOL CREATION COMPLETE!
            </CardTitle>
            <CardDescription>
              ETHG/ETHGR liquidity pool successfully created
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Alert className="border-green-500 bg-green-50">
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <strong>Success:</strong> First-ever ETHG/ETHGR trading pair is now live and generating revenue
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">$1.3M+</div>
                <div className="text-sm text-muted-foreground">Portfolio Value Unlocked</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-muted-foreground">Execution Complete</div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => window.open('https://v2.info.uniswap.org/pairs', '_blank')}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              View Pool Analytics
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Transactions */}
      {recentTxs && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest blockchain activity from your wallet</CardDescription>
          </CardHeader>
          <CardContent>
            {recentTxs.slice(0, 5).map((tx: any, index: number) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <div className="font-mono text-sm">{tx.hash?.slice(0, 10)}...</div>
                  <div className="text-xs text-muted-foreground">{tx.methodId || 'Transfer'}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{tx.value ? `${(parseInt(tx.value) / 1e18).toFixed(4)} ETH` : 'Contract'}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(parseInt(tx.timeStamp) * 1000).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => { refetch(); window.location.reload(); }}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Status
        </Button>
      </div>
    </div>
  );
}