import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Wallet, 
  Copy,
  Eye,
  EyeOff,
  Download,
  Shield,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletData {
  address: string;
  privateKey: string;
  mnemonic: string;
  publicKey: string;
  derivationPath: string;
}

export function SmartWalletGenerator() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  const generateWallet = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/wallet/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error('Failed to generate wallet');
      
      const walletData = await response.json();
      setWallet(walletData);
      setSaved(false);
      
      toast({
        title: "New Wallet Generated",
        description: "Secure your private key and mnemonic phrase immediately"
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`
    });
  };

  const downloadWalletData = () => {
    if (!wallet) return;
    
    const walletInfo = {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic,
      derivationPath: wallet.derivationPath,
      generated: new Date().toISOString(),
      warning: "KEEP THIS SECURE - Never share your private key or mnemonic"
    };
    
    const blob = new Blob([JSON.stringify(walletInfo, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wallet-${wallet.address.slice(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSaved(true);
    toast({
      title: "Wallet Downloaded",
      description: "Secure wallet file saved. Store it safely offline."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Smart Wallet Generator
        </CardTitle>
        <CardDescription>
          Generate a fresh, secure Ethereum wallet to start over clean
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!wallet ? (
          <div className="text-center space-y-4">
            <div className="p-6 border-2 border-dashed rounded-lg">
              <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Generate New Wallet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a completely fresh wallet to avoid any contract restrictions or honeypot tokens
              </p>
              <Button 
                onClick={generateWallet} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating Secure Wallet...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Generate New Wallet
                  </>
                )}
              </Button>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 mb-1">About Your Current Wallet Issue</p>
                  <p className="text-amber-700">
                    Your ETHG tokens are likely in a honeypot contract that allows receiving but blocks sending. 
                    A fresh wallet will let you start clean without these restrictions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">New Wallet Generated</h3>
              <div className="flex gap-2">
                {saved ? (
                  <Badge variant="secondary">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Saved
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Not Saved
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Wallet Address</label>
                <div className="flex gap-2">
                  <Input
                    value={wallet.address}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(wallet.address, "Wallet address")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Private Key</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                  >
                    {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    type={showPrivateKey ? "text" : "password"}
                    value={wallet.privateKey}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(wallet.privateKey, "Private key")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Mnemonic Phrase (12 words)</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMnemonic(!showMnemonic)}
                  >
                    {showMnemonic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    value={wallet.mnemonic}
                    readOnly
                    className={`font-mono text-sm resize-none ${!showMnemonic ? 'text-transparent bg-gray-100' : ''}`}
                    rows={2}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(wallet.mnemonic, "Mnemonic phrase")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Derivation Path</label>
                <Input
                  value={wallet.derivationPath}
                  readOnly
                  className="font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={downloadWalletData}
                className="flex-1"
                variant={saved ? "secondary" : "default"}
              >
                <Download className="w-4 h-4 mr-2" />
                {saved ? "Download Again" : "Download Wallet File"}
              </Button>
              <Button 
                onClick={generateWallet}
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Another
              </Button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-red-800 mb-1">Critical Security Warning</p>
                  <ul className="text-red-700 space-y-1">
                    <li>• Never share your private key or mnemonic with anyone</li>
                    <li>• Store these credentials offline in a secure location</li>
                    <li>• Anyone with access to these can control your wallet</li>
                    <li>• Download and save the wallet file before closing this page</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-800 mb-1">Next Steps</p>
                  <ul className="text-green-700 space-y-1">
                    <li>• Import this wallet into MetaMask or your preferred wallet</li>
                    <li>• Add ETH for gas fees to start transacting</li>
                    <li>• This clean wallet won't have any honeypot tokens</li>
                    <li>• Test small amounts before large transactions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}