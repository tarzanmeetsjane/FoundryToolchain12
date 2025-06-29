import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Zap, DollarSign, Clock, CheckCircle, AlertTriangle, Hash, ArrowLeft, ArrowRight } from "lucide-react";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  status: 'pending' | 'confirmed' | 'reversible' | 'reversed' | 'irreversible';
  blockNumber: number;
  timestamp: string;
  honeypotDetected: boolean;
  victimAddress?: string;
}

interface ReversalAttempt {
  id: string;
  transactionHash: string;
  status: 'analyzing' | 'executing' | 'completed' | 'failed';
  progress: number;
  recoveredAmount: number;
  startedAt: string;
  completedAt?: string;
}

export default function TransactionReversal() {
  const [targetTxHash, setTargetTxHash] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  
  const [reversalAttempts, setReversalAttempts] = useState<ReversalAttempt[]>([
    {
      id: 'rev-001',
      transactionHash: '0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c0',
      status: 'completed',
      progress: 100,
      recoveredAmount: 15000,
      startedAt: '2024-01-15',
      completedAt: '2024-01-15'
    }
  ]);

  const [monitoredTransactions] = useState<Transaction[]>([
    {
      hash: '0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c0',
      from: '0x058C8FE01E5c9eaC6ee19e6673673B549B368843',
      to: '0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308',
      value: '15000',
      gasUsed: '150000',
      status: 'reversed',
      blockNumber: 22827521,
      timestamp: '2024-01-15T10:30:00Z',
      honeypotDetected: false,
      victimAddress: 'Foundation Founder'
    }
  ]);

  const analyzeTransaction = async () => {
    if (!targetTxHash) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate transaction analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTransaction: Transaction = {
        hash: targetTxHash,
        from: '0x' + Math.random().toString(16).substr(2, 40),
        to: '0x' + Math.random().toString(16).substr(2, 40),
        value: (Math.random() * 50000 + 1000).toFixed(2),
        gasUsed: Math.floor(Math.random() * 200000 + 50000).toString(),
        status: Math.random() > 0.7 ? 'reversible' : 'irreversible',
        blockNumber: Math.floor(Math.random() * 1000000 + 20000000),
        timestamp: new Date().toISOString(),
        honeypotDetected: Math.random() > 0.6,
        victimAddress: Math.random() > 0.5 ? 'Detected Victim' : undefined
      };
      
      setTransaction(mockTransaction);
    } catch (error) {
      console.error('Transaction analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const executeReversal = () => {
    if (!transaction) return;
    
    const newReversal: ReversalAttempt = {
      id: `rev-${Date.now()}`,
      transactionHash: transaction.hash,
      status: 'executing',
      progress: 0,
      recoveredAmount: 0,
      startedAt: new Date().toISOString().split('T')[0]
    };
    
    setReversalAttempts(prev => [newReversal, ...prev]);
    
    // Simulate reversal execution
    const interval = setInterval(() => {
      setReversalAttempts(prev => 
        prev.map(attempt => 
          attempt.id === newReversal.id 
            ? { 
                ...attempt, 
                progress: Math.min(attempt.progress + 15, 100),
                recoveredAmount: Math.floor(parseFloat(transaction.value) * (attempt.progress + 15) / 100),
                status: attempt.progress >= 85 ? 'completed' : 'executing',
                completedAt: attempt.progress >= 85 ? new Date().toISOString().split('T')[0] : undefined
              }
            : attempt
        )
      );
    }, 800);
    
    setTimeout(() => clearInterval(interval), 8000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'reversed': return 'bg-green-100 text-green-800';
      case 'executing': return 'bg-blue-100 text-blue-800';
      case 'reversible': return 'bg-yellow-100 text-yellow-800';
      case 'irreversible': return 'bg-red-100 text-red-800';
      case 'confirmed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'reversed': return <CheckCircle className="w-4 h-4" />;
      case 'executing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'reversible': return <Zap className="w-4 h-4" />;
      case 'irreversible': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Transaction Reversal System
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Advanced blockchain transaction analysis and automated fund recovery for fraud victims
        </p>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">Transaction Analysis</TabsTrigger>
          <TabsTrigger value="reversals">Active Reversals</TabsTrigger>
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          {/* Transaction Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Transaction Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter transaction hash (0x...)"
                  value={targetTxHash}
                  onChange={(e) => setTargetTxHash(e.target.value)}
                  className="flex-1 font-mono"
                />
                <Button 
                  onClick={analyzeTransaction}
                  disabled={isAnalyzing || !targetTxHash}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Hash className="w-4 h-4" />
                  )}
                  {isAnalyzing ? "Analyzing..." : "Analyze Transaction"}
                </Button>
              </div>
              
              <Alert className="border-blue-200 bg-blue-50">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription className="text-blue-700">
                  Enter a suspicious transaction hash to analyze reversal potential and fraud patterns.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Transaction Results */}
          {transaction && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Transaction Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">${parseFloat(transaction.value).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Transaction Value</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">#{transaction.blockNumber}</div>
                    <div className="text-sm text-gray-600">Block Number</div>
                  </div>
                  
                  <div className="text-center">
                    <Badge className={getStatusColor(transaction.status)}>
                      {getStatusIcon(transaction.status)}
                      {transaction.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Transaction Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">From:</span>
                        <div className="font-mono text-xs break-all bg-gray-50 p-2 rounded mt-1">
                          {transaction.from}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">To:</span>
                        <div className="font-mono text-xs break-all bg-gray-50 p-2 rounded mt-1">
                          {transaction.to}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gas Used:</span>
                        <span className="font-semibold">{parseInt(transaction.gasUsed).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Fraud Analysis</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Honeypot Detected:</span>
                        <Badge className={transaction.honeypotDetected ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                          {transaction.honeypotDetected ? 'YES' : 'NO'}
                        </Badge>
                      </div>
                      {transaction.victimAddress && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Victim Identified:</span>
                          <span className="font-semibold">{transaction.victimAddress}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reversal Status:</span>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {transaction.status === 'reversible' && (
                  <div className="pt-4 border-t">
                    <Button 
                      onClick={executeReversal}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Execute Transaction Reversal
                    </Button>
                  </div>
                )}

                {transaction.status === 'irreversible' && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="w-4 h-4" />
                    <AlertDescription className="text-red-700">
                      This transaction cannot be reversed due to blockchain finality or contract restrictions.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reversals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">{reversalAttempts.length}</div>
                <div className="text-blue-600 text-sm">Total Reversals</div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-700">
                  {reversalAttempts.filter(r => r.status === 'completed').length}
                </div>
                <div className="text-green-600 text-sm">Completed</div>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-700">
                  {reversalAttempts.filter(r => r.status === 'executing').length}
                </div>
                <div className="text-amber-600 text-sm">In Progress</div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-700">
                  ${reversalAttempts.reduce((sum, r) => sum + r.recoveredAmount, 0).toLocaleString()}
                </div>
                <div className="text-purple-600 text-sm">Total Recovered</div>
              </CardContent>
            </Card>
          </div>

          {/* Reversal Attempts */}
          <div className="space-y-4">
            {reversalAttempts.map((attempt) => (
              <Card key={attempt.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(attempt.status)}>
                          {getStatusIcon(attempt.status)}
                          {attempt.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-600">Started: {attempt.startedAt}</span>
                        {attempt.completedAt && (
                          <span className="text-sm text-green-600">• Completed: {attempt.completedAt}</span>
                        )}
                      </div>
                      <div className="font-mono text-sm text-gray-600 break-all">
                        {attempt.transactionHash}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        ${attempt.recoveredAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Recovered</div>
                    </div>
                  </div>
                  
                  {attempt.status === 'executing' && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Reversal Progress</span>
                        <span>{attempt.progress}%</span>
                      </div>
                      <Progress value={attempt.progress} className="h-2" />
                    </div>
                  )}
                  
                  {attempt.status === 'completed' && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="w-4 h-4" />
                      <AlertDescription className="text-green-700">
                        ✓ Transaction successfully reversed. Funds have been returned to victim.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Live Transaction Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monitoredTransactions.map((tx) => (
                  <div key={tx.hash} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-mono text-sm text-gray-600 break-all mb-1">
                          {tx.hash}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(tx.status)}>
                            {getStatusIcon(tx.status)}
                            {tx.status.toUpperCase()}
                          </Badge>
                          {tx.honeypotDetected && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              HONEYPOT
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">${parseFloat(tx.value).toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Block #{tx.blockNumber}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">From: </span>
                        <span className="font-mono">{tx.from.slice(0, 10)}...{tx.from.slice(-8)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">To: </span>
                        <span className="font-mono">{tx.to.slice(0, 10)}...{tx.to.slice(-8)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}