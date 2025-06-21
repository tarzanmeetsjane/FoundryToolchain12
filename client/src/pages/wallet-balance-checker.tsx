import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Wallet,
  RefreshCw,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Activity
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function WalletBalanceChecker() {
  const [copied, setCopied] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");

  const wallets = [
    {
      name: "Primary Wallet",
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      description: "Main recovery wallet with ETHGR tokens",
      status: "active"
    },
    {
      name: "37 ETH Investigation", 
      address: "0xc46eB37677360EfDc011F4097621F15b792fa630",
      description: "Wallet where user saw 37 ETH in Remix",
      status: "investigating"
    },
    {
      name: "Secondary Discovery",
      address: "0x881D40237659C251811CEC9c364ef91dC08D300C", 
      description: "Additional wallet provided by user",
      status: "checking"
    }
  ];

  const { data: balanceData, isLoading, refetch } = useQuery({
    queryKey: ['/api/wallet/balance', selectedWallet],
    queryFn: async () => {
      if (!selectedWallet) return null;
      const response = await fetch(`/api/wallet/balance/${selectedWallet}`);
      if (!response.ok) throw new Error('Failed to fetch balance');
      return response.json();
    },
    enabled: !!selectedWallet,
    refetchInterval: 30000
  });

  const { data: tokenData } = useQuery({
    queryKey: ['/api/wallet/tokens', selectedWallet],
    queryFn: async () => {
      if (!selectedWallet) return null;
      const response = await fetch(`/api/wallet/tokens/${selectedWallet}`);
      if (!response.ok) throw new Error('Failed to fetch tokens');
      return response.json();
    },
    enabled: !!selectedWallet
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const weiToEth = (wei: string) => {
    if (!wei) return "0";
    const ethValue = parseFloat(wei) / 1000000000000000000;
    return ethValue.toFixed(6);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const ethPrice = 2420; // Current ETH price approximation

  useEffect(() => {
    if (wallets.length > 0) {
      setSelectedWallet(wallets[0].address);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Live Wallet Balance Checker
          </h1>
          <p className="text-xl text-blue-300">
            Real-time balance verification for your recovery wallets
          </p>
        </div>

        {/* Wallet Selection */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Select Wallet to Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {wallets.map((wallet, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedWallet(wallet.address)}
                  className={`p-4 border rounded cursor-pointer transition-all ${
                    selectedWallet === wallet.address 
                      ? 'border-blue-500 bg-blue-600/20' 
                      : 'border-gray-600 bg-gray-700/20 hover:border-blue-400'
                  }`}
                >
                  <h3 className="text-white font-bold">{wallet.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{wallet.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge className={`${
                      wallet.status === 'active' ? 'bg-green-600' :
                      wallet.status === 'investigating' ? 'bg-yellow-600' : 'bg-gray-600'
                    } text-white`}>
                      {wallet.status}
                    </Badge>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(wallet.address);
                      }}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {copied === wallet.address ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 font-mono">{wallet.address}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Balance Display */}
        {selectedWallet && (
          <Card className="bg-gray-800/50 border-green-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Live Balance - {wallets.find(w => w.address === selectedWallet)?.name}</CardTitle>
                <Button 
                  onClick={() => refetch()}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-300">Fetching live balance...</p>
                </div>
              ) : balanceData ? (
                <div className="space-y-6">
                  {/* ETH Balance */}
                  <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-green-400 font-bold text-xl">ETH Balance</h3>
                      <Badge className="bg-green-600 text-white">Live Data</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">ETH Amount</p>
                        <p className="text-white font-bold text-2xl">
                          {balanceData.eth ? weiToEth(balanceData.eth) : "0.000000"} ETH
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">USD Value</p>
                        <p className="text-green-400 font-bold text-2xl">
                          {formatCurrency((parseFloat(weiToEth(balanceData.eth || "0")) * ethPrice))}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Wei Amount</p>
                        <p className="text-blue-400 font-mono text-sm">
                          {balanceData.eth || "0"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Token Balances */}
                  {tokenData && tokenData.tokens && tokenData.tokens.length > 0 && (
                    <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                      <h3 className="text-purple-400 font-bold text-xl mb-4">Token Balances</h3>
                      <div className="space-y-3">
                        {tokenData.tokens.map((token, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded">
                            <div>
                              <p className="text-white font-medium">{token.symbol || 'Unknown'}</p>
                              <p className="text-gray-400 text-sm">{token.name || 'Unknown Token'}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold">{token.balance || '0'}</p>
                              <p className="text-gray-400 text-sm">{token.contract}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => window.open(`https://etherscan.io/address/${selectedWallet}`, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Etherscan
                    </Button>
                    
                    <Button 
                      onClick={() => copyToClipboard(selectedWallet)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {copied === selectedWallet ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      Copy Address
                    </Button>
                  </div>
                </div>
              ) : (
                <Alert className="border-yellow-500 bg-yellow-500/10">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-200">
                    Unable to fetch balance data. Check network connection or try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* ETH Unit Converter */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">ETH Unit Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <p className="text-yellow-400 font-bold">Wei</p>
                <p className="text-white text-sm">10^-18 ETH</p>
                <p className="text-gray-400 text-xs">Smallest unit</p>
              </div>
              
              <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <p className="text-yellow-400 font-bold">Gwei</p>
                <p className="text-white text-sm">10^-9 ETH</p>
                <p className="text-gray-400 text-xs">Gas prices</p>
              </div>
              
              <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <p className="text-yellow-400 font-bold">Finney</p>
                <p className="text-white text-sm">10^-3 ETH</p>
                <p className="text-gray-400 text-xs">0.001 ETH</p>
              </div>
              
              <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <p className="text-yellow-400 font-bold">Ether</p>
                <p className="text-white text-sm">1 ETH</p>
                <p className="text-gray-400 text-xs">Standard unit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Status Summary */}
        <Alert className="border-blue-500 bg-blue-500/10">
          <Activity className="h-6 w-6 text-blue-500" />
          <AlertDescription className="text-blue-200 text-center">
            <strong>Live Balance Tracking:</strong> Monitor your wallet balances in real-time to track recovery progress and available funds for operations. Data updates every 30 seconds.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}