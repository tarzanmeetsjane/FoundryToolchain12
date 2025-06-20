import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Zap
} from "lucide-react";
import { useState } from "react";
import { ethers } from "ethers";

export default function DirectWalletImport() {
  const [privateKey, setPrivateKey] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const expectedAddress = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const ethgrContract = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  const importFromPrivateKey = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      let key = privateKey.trim();
      if (!key.startsWith('0x')) {
        key = '0x' + key;
      }
      
      const importedWallet = new ethers.Wallet(key);
      
      if (importedWallet.address.toLowerCase() !== expectedAddress.toLowerCase()) {
        setError(`Wrong private key. Expected: ${expectedAddress}, Got: ${importedWallet.address}`);
        return;
      }
      
      // Connect to Ethereum mainnet
      const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
      const connectedWallet = importedWallet.connect(provider);
      
      // Get ETH balance
      const ethBalance = await provider.getBalance(importedWallet.address);
      const formattedBalance = ethers.formatEther(ethBalance);
      
      setWallet(connectedWallet);
      setBalance(formattedBalance);
      
    } catch (err) {
      setError(`Invalid private key: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const importFromSeedPhrase = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const mnemonic = seedPhrase.trim();
      const importedWallet = ethers.Wallet.fromPhrase(mnemonic);
      
      if (importedWallet.address.toLowerCase() !== expectedAddress.toLowerCase()) {
        setError(`Wrong seed phrase. Expected: ${expectedAddress}, Got: ${importedWallet.address}`);
        return;
      }
      
      // Connect to Ethereum mainnet
      const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
      const connectedWallet = importedWallet.connect(provider);
      
      // Get ETH balance
      const ethBalance = await provider.getBalance(importedWallet.address);
      const formattedBalance = ethers.formatEther(ethBalance);
      
      setWallet(connectedWallet);
      setBalance(formattedBalance);
      
    } catch (err) {
      setError(`Invalid seed phrase: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const executeEmergencyWithdraw = async () => {
    if (!wallet) return;
    
    try {
      setIsLoading(true);
      setError("");
      
      // ETHGR contract ABI for emergencyWithdraw
      const abi = [
        "function emergencyWithdraw() external",
        "function owner() view returns (address)",
        "function balanceOf(address) view returns (uint256)"
      ];
      
      const contract = new ethers.Contract(ethgrContract, abi, wallet);
      
      // Check if wallet is owner
      const owner = await contract.owner();
      if (owner.toLowerCase() !== wallet.address.toLowerCase()) {
        setError("Wallet is not the contract owner");
        return;
      }
      
      // Get contract ETH balance
      const contractBalance = await wallet.provider.getBalance(ethgrContract);
      const contractETH = ethers.formatEther(contractBalance);
      
      if (parseFloat(contractETH) < 1) {
        setError(`Contract only has ${contractETH} ETH, not the expected 37 ETH`);
        return;
      }
      
      // Execute emergency withdraw
      const tx = await contract.emergencyWithdraw();
      const receipt = await tx.wait();
      
      // Refresh balance
      const newBalance = await wallet.provider.getBalance(wallet.address);
      setBalance(ethers.formatEther(newBalance));
      
      alert(`Success! Transaction: ${receipt.transactionHash}`);
      
    } catch (err) {
      setError(`Withdrawal failed: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const hasSignificantETH = parseFloat(balance) > 30;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🔑</div>
        <h1 className="text-4xl font-bold">DIRECT WALLET IMPORT</h1>
        <p className="text-xl text-muted-foreground">
          Import your wallet directly using private key or seed phrase
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Key className="h-4 w-4" />
        <AlertDescription>
          <strong>SECURE IMPORT:</strong> Your private key stays in your browser and connects directly to Ethereum. 
          This bypasses ConnectKit connection issues.
        </AlertDescription>
      </Alert>

      {!wallet ? (
        <Tabs defaultValue="private-key" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="private-key">Private Key</TabsTrigger>
            <TabsTrigger value="seed-phrase">Seed Phrase</TabsTrigger>
          </TabsList>

          <TabsContent value="private-key">
            <Card className="border-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Import from Private Key
                </CardTitle>
                <CardDescription>
                  Enter your private key for wallet: {expectedAddress.slice(0, 10)}...{expectedAddress.slice(-8)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="private-key">Private Key</Label>
                  <div className="relative">
                    <Input
                      id="private-key"
                      type={showPrivateKey ? "text" : "password"}
                      placeholder="Enter your private key (with or without 0x prefix)"
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                    >
                      {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={importFromPrivateKey}
                  disabled={!privateKey || isLoading}
                  className="w-full"
                >
                  {isLoading ? "Importing..." : "Import Wallet"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seed-phrase">
            <Card className="border-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Import from Seed Phrase
                </CardTitle>
                <CardDescription>
                  Enter your 12-24 word recovery phrase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seed-phrase">Seed Phrase</Label>
                  <textarea
                    id="seed-phrase"
                    placeholder="Enter your 12-24 word recovery phrase separated by spaces"
                    value={seedPhrase}
                    onChange={(e) => setSeedPhrase(e.target.value)}
                    className="w-full p-3 border rounded-lg h-24 resize-none"
                  />
                </div>

                <Button
                  onClick={importFromSeedPhrase}
                  disabled={!seedPhrase || isLoading}
                  className="w-full"
                >
                  {isLoading ? "Importing..." : "Import Wallet"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-6">
          <Card className="border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Wallet Connected Successfully
              </CardTitle>
              <CardDescription>
                Your wallet is now connected and ready for ETH recovery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm font-bold mb-2">Wallet Address:</div>
                  <div className="font-mono text-xs break-all">{wallet.address}</div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm font-bold mb-2">ETH Balance:</div>
                  <div className="text-2xl font-bold text-blue-600">{parseFloat(balance).toFixed(6)} ETH</div>
                  <div className="text-sm text-muted-foreground">${(parseFloat(balance) * 2500).toFixed(2)} USD</div>
                </div>
              </div>

              {hasSignificantETH ? (
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>37+ ETH FOUND!</strong> Your wallet contains {parseFloat(balance).toFixed(6)} ETH. 
                    You can proceed directly to create the ETHGR/ETH pool.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-orange-500 bg-orange-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Check Contract:</strong> Your wallet has {parseFloat(balance).toFixed(6)} ETH. 
                    The 37 ETH might be locked in the ETHGR contract. Try emergency withdrawal.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card className="border-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Emergency ETH Recovery
              </CardTitle>
              <CardDescription>
                Execute emergencyWithdraw to recover ETH from ETHGR contract
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm font-bold mb-2">ETHGR Contract:</div>
                <div className="font-mono text-xs break-all">{ethgrContract}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  This contract may contain your 37 ETH from the recovery operation
                </div>
              </div>

              <Button
                onClick={executeEmergencyWithdraw}
                disabled={isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? "Executing..." : "Execute Emergency Withdrawal"}
              </Button>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://etherscan.io/address/${ethgrContract}#writeContract`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Alternative: Use Etherscan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {error && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Error:</strong> {error}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Security Notes</CardTitle>
          <CardDescription>
            Important information about wallet import security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div>• Your private key/seed phrase never leaves your browser</div>
            <div>• Connection is made directly to Ethereum mainnet</div>
            <div>• Clear browser data after use for security</div>
            <div>• This bypasses ConnectKit wallet connection issues</div>
            <div>• Expected wallet: {expectedAddress}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}