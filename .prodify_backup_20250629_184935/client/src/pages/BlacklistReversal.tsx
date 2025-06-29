import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, UnlockKeyhole, CheckCircle, AlertTriangle, Search, RefreshCw } from "lucide-react";

interface BlacklistedAddress {
  address: string;
  contractAddress: string;
  blockedAmount: number;
  dateBlacklisted: string;
  status: 'blacklisted' | 'reversal_pending' | 'restored' | 'failed';
  ownerWallet?: string;
}

interface ReversalOperation {
  id: string;
  contractAddress: string;
  targetAddresses: string[];
  status: 'analyzing' | 'executing' | 'completed' | 'failed';
  progress: number;
  addressesRestored: number;
  totalFundsRestored: number;
  startedAt: string;
}

export default function BlacklistReversal() {
  const [contractAddress, setContractAddress] = useState('');
  const [targetAddress, setTargetAddress] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [blacklistedAddresses, setBlacklistedAddresses] = useState<BlacklistedAddress[]>([
    {
      address: '0x058C8FE01E5c9eaC6ee19e6673673B549B368843',
      contractAddress: '0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308',
      blockedAmount: 0,
      dateBlacklisted: '2024-01-10',
      status: 'restored',
      ownerWallet: 'Foundation Founder'
    }
  ]);

  const [reversalOperations, setReversalOperations] = useState<ReversalOperation[]>([
    {
      id: 'rev-blacklist-001',
      contractAddress: '0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308',
      targetAddresses: ['0x058C8FE01E5c9eaC6ee19e6673673B549B368843'],
      status: 'completed',
      progress: 100,
      addressesRestored: 1,
      totalFundsRestored: 15000,
      startedAt: '2024-01-15'
    }
  ]);

  const analyzeBlacklist = async () => {
    if (!contractAddress) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate blacklist analysis
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockAddresses: BlacklistedAddress[] = Array.from({ length: 5 }, (_, i) => ({
        address: '0x' + Math.random().toString(16).substr(2, 40),
        contractAddress: contractAddress,
        blockedAmount: Math.floor(Math.random() * 25000 + 5000),
        dateBlacklisted: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'blacklisted' as const,
        ownerWallet: `Victim ${i + 1}`
      }));
      
      setBlacklistedAddresses(prev => [...mockAddresses, ...prev]);
    } catch (error) {
      console.error('Blacklist analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const executeBlacklistReversal = (addresses: string[]) => {
    const newOperation: ReversalOperation = {
      id: `rev-blacklist-${Date.now()}`,
      contractAddress: contractAddress,
      targetAddresses: addresses,
      status: 'executing',
      progress: 0,
      addressesRestored: 0,
      totalFundsRestored: 0,
      startedAt: new Date().toISOString().split('T')[0]
    };
    
    setReversalOperations(prev => [newOperation, ...prev]);
    
    // Simulate blacklist reversal execution
    const interval = setInterval(() => {
      setReversalOperations(prev => 
        prev.map(op => 
          op.id === newOperation.id 
            ? { 
                ...op, 
                progress: Math.min(op.progress + 20, 100),
                addressesRestored: Math.floor((op.progress + 20) * addresses.length / 100),
                totalFundsRestored: Math.floor((op.progress + 20) * 50000 / 100),
                status: op.progress >= 80 ? 'completed' : 'executing'
              }
            : op
        )
      );
    }, 1000);
    
    setTimeout(() => {
      clearInterval(interval);
      // Update blacklisted addresses status
      setBlacklistedAddresses(prev =>
        prev.map(addr => 
          addresses.includes(addr.address) 
            ? { ...addr, status: 'restored' as const }
            : addr
        )
      );
    }, 6000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'restored': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'executing': return 'bg-blue-100 text-blue-800';
      case 'reversal_pending': return 'bg-yellow-100 text-yellow-800';
      case 'blacklisted': return 'bg-red-100 text-red-800';
      case 'failed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'restored':
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'executing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'reversal_pending': return <UnlockKeyhole className="w-4 h-4" />;
      case 'blacklisted': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const blacklistedCount = blacklistedAddresses.filter(addr => addr.status === 'blacklisted').length;
  const restoredCount = blacklistedAddresses.filter(addr => addr.status === 'restored').length;
  const totalFundsBlocked = blacklistedAddresses.reduce((sum, addr) => sum + addr.blockedAmount, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Blacklist Reversal System
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Advanced system to identify and reverse malicious address blacklisting for victim fund recovery
        </p>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">Blacklist Analysis</TabsTrigger>
          <TabsTrigger value="operations">Reversal Operations</TabsTrigger>
          <TabsTrigger value="monitoring">Restored Addresses</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-red-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-700">{blacklistedCount}</div>
                <div className="text-red-600 text-sm">Blacklisted</div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-700">{restoredCount}</div>
                <div className="text-green-600 text-sm">Restored</div>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-700">
                  {reversalOperations.filter(op => op.status === 'executing').length}
                </div>
                <div className="text-amber-600 text-sm">In Progress</div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-700">
                  ${totalFundsBlocked.toLocaleString()}
                </div>
                <div className="text-purple-600 text-sm">Funds Affected</div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Contract Blacklist Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Contract address with blacklist (0x...)"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="font-mono"
                />
                <Input
                  placeholder="Specific address to check (optional)"
                  value={targetAddress}
                  onChange={(e) => setTargetAddress(e.target.value)}
                  className="font-mono"
                />
              </div>
              
              <Button 
                onClick={analyzeBlacklist}
                disabled={isAnalyzing || !contractAddress}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isAnalyzing ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                {isAnalyzing ? "Scanning Contract..." : "Analyze Blacklist"}
              </Button>
              
              <Alert className="border-purple-200 bg-purple-50">
                <Shield className="w-4 h-4" />
                <AlertDescription className="text-purple-700">
                  This tool identifies addresses blocked by malicious contract blacklist mechanisms and enables their restoration.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Blacklisted Addresses */}
          {blacklistedAddresses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Affected Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blacklistedAddresses.map((addr, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-mono text-sm text-gray-600 break-all mb-1">
                            {addr.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(addr.status)}>
                              {getStatusIcon(addr.status)}
                              {addr.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            {addr.ownerWallet && (
                              <span className="text-sm text-gray-600">{addr.ownerWallet}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">
                            ${addr.blockedAmount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Blocked</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Contract: </span>
                          <span className="font-mono">{addr.contractAddress.slice(0, 10)}...{addr.contractAddress.slice(-8)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Blacklisted: </span>
                          <span>{addr.dateBlacklisted}</span>
                        </div>
                      </div>
                      
                      {addr.status === 'blacklisted' && (
                        <Button 
                          onClick={() => executeBlacklistReversal([addr.address])}
                          className="w-full mt-3 bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <UnlockKeyhole className="w-4 h-4 mr-2" />
                          Restore Address Access
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                {blacklistedAddresses.filter(addr => addr.status === 'blacklisted').length > 1 && (
                  <Button 
                    onClick={() => executeBlacklistReversal(
                      blacklistedAddresses
                        .filter(addr => addr.status === 'blacklisted')
                        .map(addr => addr.address)
                    )}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700"
                  >
                    <UnlockKeyhole className="w-4 h-4 mr-2" />
                    Restore All Blacklisted Addresses
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          {/* Operations List */}
          <div className="space-y-4">
            {reversalOperations.map((operation) => (
              <Card key={operation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(operation.status)}>
                          {getStatusIcon(operation.status)}
                          {operation.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-600">Started: {operation.startedAt}</span>
                      </div>
                      <div className="font-mono text-sm text-gray-600">
                        {operation.contractAddress}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        ${operation.totalFundsRestored.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Restored</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium">Addresses Targeted</div>
                      <div className="text-sm text-gray-600">{operation.targetAddresses.length}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">Addresses Restored</div>
                      <div className="text-sm text-gray-600">{operation.addressesRestored}</div>
                    </div>
                  </div>
                  
                  {operation.status === 'executing' && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Restoration Progress</span>
                        <span>{operation.progress}%</span>
                      </div>
                      <Progress value={operation.progress} className="h-2" />
                    </div>
                  )}
                  
                  {operation.status === 'completed' && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="w-4 h-4" />
                      <AlertDescription className="text-green-700">
                        ✓ Blacklist reversal completed. All targeted addresses have been restored.
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
                <CheckCircle className="w-5 h-5" />
                Successfully Restored Addresses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {blacklistedAddresses
                  .filter(addr => addr.status === 'restored')
                  .map((addr, index) => (
                    <div key={index} className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-mono text-sm text-gray-600 break-all mb-1">
                            {addr.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              RESTORED
                            </Badge>
                            {addr.ownerWallet && (
                              <span className="text-sm text-green-600 font-medium">{addr.ownerWallet}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-700">
                            ${addr.blockedAmount.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-600">Recovered</div>
                        </div>
                      </div>
                    </div>
                  ))}
                
                {blacklistedAddresses.filter(addr => addr.status === 'restored').length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No restored addresses yet. Execute blacklist reversals to see results here.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}