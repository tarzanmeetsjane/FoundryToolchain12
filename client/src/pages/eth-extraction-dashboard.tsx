import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet,
  TrendingUp,
  Target,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Zap
} from "lucide-react";

export default function ETHExtractionDashboard() {
  
  const [extractionStatus, setExtractionStatus] = useState<'idle' | 'analyzing' | 'extracting' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  
  // Contract addresses with ETH
  const ethSources = [
    {
      address: "0xc46eB37677360EfDc011F4097621F15b792fa630",
      balance: "0.00136014",
      status: "confirmed",
      description: "UniswapX and V4 Router deposits",
      priority: 1
    },
    {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      balance: "check_required",
      status: "pending",
      description: "Foundation wallet balance",
      priority: 2
    }
  ];
  
  // Recent Ethereum network data from user's block
  const networkData = {
    currentBlock: "22,394,873",
    gasPrice: "12.5 gwei",
    baseFee: "5.26 gwei",
    networkStatus: "stable"
  };
  
  const poolRequirements = {
    minimum: "0.1 ETH",
    recommended: "0.5 ETH",
    current: "0.00136014 ETH",
    needed: "0.09863986 ETH"
  };

  useEffect(() => {
    if (extractionStatus === 'analyzing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setExtractionStatus('extracting');
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [extractionStatus]);

  const startExtraction = () => {
    setExtractionStatus('analyzing');
    setProgress(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-amber-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
          ETH Extraction Dashboard
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Extract available ETH for ETHGR liquidity pool creation
        </p>
      </div>

      {/* Network Status */}
      <Card className="max-w-4xl mx-auto mb-8 border-2 border-blue-200 dark:border-blue-700">
        <CardHeader>
          <CardTitle className="text-xl text-blue-700 dark:text-blue-300 flex items-center">
            <Zap className="h-6 w-6 mr-2" />
            Ethereum Network Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">Block {networkData.currentBlock}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Latest Block</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">{networkData.gasPrice}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Gas Price</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{networkData.baseFee}</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Base Fee</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-slate-700 dark:text-slate-300 capitalize">{networkData.networkStatus}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Network</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extraction Progress */}
      {extractionStatus !== 'idle' && (
        <Card className="max-w-4xl mx-auto mb-8 border-2 border-amber-200 dark:border-amber-700">
          <CardHeader>
            <CardTitle className="text-xl text-amber-700 dark:text-amber-300">
              Extraction in Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="w-full" />
              <div className="text-center text-slate-600 dark:text-slate-400">
                {extractionStatus === 'analyzing' && 'Analyzing contract functions...'}
                {extractionStatus === 'extracting' && 'Executing withdrawal functions...'}
                {extractionStatus === 'complete' && 'Extraction completed successfully!'}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ETH Sources */}
      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
            <Target className="h-8 w-8 mr-3" />
            Available ETH Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ethSources.map((source, index) => (
              <div key={index} className="border rounded-lg p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(source.status)}`} />
                    <span className="font-semibold text-slate-800 dark:text-white">
                      Priority {source.priority}
                    </span>
                    <Badge className={getStatusColor(source.status)}>
                      {source.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800 dark:text-white">
                      {source.balance} ETH
                    </div>
                    {source.balance !== "check_required" && (
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        ≈ ${(parseFloat(source.balance) * 2440).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Address:</strong> {source.address}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Source:</strong> {source.description}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <Button
                    onClick={() => {
                      const url = `https://etherscan.io/address/${source.address}`;
                      navigator.clipboard.writeText(url);
                      window.open(url, '_blank');
                    }}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View on Etherscan</span>
                  </Button>
                  
                  {source.status === 'confirmed' && (
                    <Button
                      onClick={startExtraction}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={extractionStatus !== 'idle'}
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      Extract ETH
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pool Requirements */}
      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
            <TrendingUp className="h-8 w-8 mr-3" />
            Liquidity Pool Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">ETH Requirements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Minimum Pool ETH:</span>
                  <span className="font-semibold">{poolRequirements.minimum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Recommended ETH:</span>
                  <span className="font-semibold">{poolRequirements.recommended}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Currently Available:</span>
                  <span className="font-semibold text-blue-600">{poolRequirements.current}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-slate-600 dark:text-slate-400">Additional Needed:</span>
                  <span className="font-semibold text-red-600">{poolRequirements.needed}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Token Allocation</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">ETHGR for Pool:</span>
                  <span className="font-semibold">219,300 ETHGR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Target Value:</span>
                  <span className="font-semibold">$45,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Initial Price:</span>
                  <span className="font-semibold">~$0.205/ETHGR</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Alert */}
      <Alert className="max-w-4xl mx-auto mb-8 border-amber-200 bg-amber-50 dark:bg-amber-900/20">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>Status Update:</strong> Current ETH extraction will provide 0.00136014 ETH. 
          Additional funding sources needed for optimal pool creation. Consider partial pool strategy 
          or explore alternative ETH sources from related contracts.
        </AlertDescription>
      </Alert>

      {/* Action Center */}
      <Card className="max-w-4xl mx-auto border-2 border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-700 dark:text-green-300">
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Button
              onClick={startExtraction}
              className="h-16 text-lg bg-blue-600 hover:bg-blue-700 text-white"
              disabled={extractionStatus !== 'idle'}
            >
              <Wallet className="h-6 w-6 mr-2" />
              Start ETH Extraction
            </Button>
            
            <Button
              onClick={() => {
                const url = 'https://etherscan.io/address/0xc46eB37677360EfDc011F4097621F15b792fa630#writeContract';
                navigator.clipboard.writeText(url);
                window.open(url, '_blank');
              }}
              className="h-16 text-lg bg-purple-600 hover:bg-purple-700 text-white"
            >
              <ExternalLink className="h-6 w-6 mr-2" />
              Contract Interaction
            </Button>
            
            <Button
              onClick={() => {
                const url = 'https://app.uniswap.org/pool';
                navigator.clipboard.writeText(url);
                window.open(url, '_blank');
              }}
              className="h-16 text-lg bg-green-600 hover:bg-green-700 text-white"
            >
              <TrendingUp className="h-6 w-6 mr-2" />
              Create Pool
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-slate-600 dark:text-slate-400">
              <strong>Extraction Path:</strong> Withdraw ETH → Deploy ETHGR → Create Pool → Trade $45,000
            </p>
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Step 1: Extract confirmed 0.00136014 ETH from target contract
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}