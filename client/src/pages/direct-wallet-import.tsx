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
import { useState, useEffect } from "react";

export default function DirectWalletImport() {
  const [activeKeyIndex, setActiveKeyIndex] = useState(0);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [wallets, setWallets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const privateKeys = [
    "0x25d770597d6e446666b63712b6fdbc31e66a6587463e66caa8b19246d1256855",
    "0xa5ed71406d5a0be4fb9fe9ba2ff4addf51f01922688bc1eabf51ab92fbfe694f"
  ];

  const expectedAddress = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const ethgrContract = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  // Auto-import both private keys
  useEffect(() => {
    importAllWallets();
  }, []);

  const importAllWallets = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const { ethers } = await import('ethers');
      const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
      
      const walletData = [];
      
      for (let i = 0; i < privateKeys.length; i++) {
        try {
          const key = privateKeys[i];
          const importedWallet = new ethers.Wallet(key);
          const connectedWallet = importedWallet.connect(provider);
          
          // Get ETH balance
          const ethBalance = await provider.getBalance(importedWallet.address);
          const formattedBalance = ethers.formatEther(ethBalance);
          
          // Get contract ETH balance
          const contractETH = await provider.getBalance(ethgrContract);
          const contractFormatted = ethers.formatEther(contractETH);
          
          // Check if this wallet is the contract owner
          let isOwner = false;
          try {
            const abi = ["function owner() view returns (address)"];
            const contract = new ethers.Contract(ethgrContract, abi, connectedWallet);
            const owner = await contract.owner();
            isOwner = owner.toLowerCase() === importedWallet.address.toLowerCase();
          } catch (err) {
            console.log("Could not check ownership for", importedWallet.address);
          }
          
          walletData.push({
            wallet: connectedWallet,
            address: importedWallet.address,
            balance: formattedBalance,
            contractBalance: contractFormatted,
            isOwner,
            keyIndex: i
          });
          
        } catch (err) {
          console.log(`Failed to import wallet ${i}:`, err);
        }
      }
      
      setWallets(walletData);
      
      // Set active wallet to the one that's the contract owner or has most ETH
      const ownerWallet = walletData.find(w => w.isOwner);
      if (ownerWallet) {
        setActiveKeyIndex(ownerWallet.keyIndex);
      } else {
        const richestWallet = walletData.reduce((prev, current) => 
          parseFloat(prev.balance) > parseFloat(current.balance) ? prev : current
        );
        setActiveKeyIndex(richestWallet.keyIndex);
      }
      
    } catch (err) {
      setError(`Failed to import wallets: ${err}`);
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

  const executeEmergencyWithdraw = async (walletIndex: number) => {
    const walletData = wallets[walletIndex];
    if (!walletData) return;
    
    try {
      setIsLoading(true);
      setError("");
      
      const { ethers } = await import('ethers');
      
      // ETHGR contract ABI for emergencyWithdraw
      const abi = [
        "function emergencyWithdraw() external",
        "function owner() view returns (address)",
        "function balanceOf(address) view returns (uint256)"
      ];
      
      const contract = new ethers.Contract(ethgrContract, abi, walletData.wallet);
      
      // Check if wallet is owner
      if (!walletData.isOwner) {
        setError("This wallet is not the contract owner");
        return;
      }
      
      // Get contract ETH balance
      const contractETHBalance = await walletData.wallet.provider.getBalance(ethgrContract);
      const contractETH = ethers.formatEther(contractETHBalance);
      
      if (parseFloat(contractETH) < 0.001) {
        setError(`Contract only has ${contractETH} ETH. The 37 ETH might be elsewhere.`);
        return;
      }
      
      // Execute emergency withdraw
      const tx = await contract.emergencyWithdraw({
        gasLimit: 500000,
        gasPrice: ethers.parseUnits('20', 'gwei')
      });
      const receipt = await tx.wait();
      
      // Refresh all wallet data
      importAllWallets();
      
      alert(`Success! Recovered ${contractETH} ETH. Transaction: ${receipt.transactionHash}`);
      
    } catch (err) {
      setError(`Withdrawal failed: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🔑</div>
        <h1 className="text-4xl font-bold">MULTI-WALLET ANALYSIS</h1>
        <p className="text-xl text-muted-foreground">
          Analyzing both private keys to find your 37 ETH
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Key className="h-4 w-4" />
        <AlertDescription>
          <strong>MULTI-WALLET SCAN:</strong> Checking both provided private keys to locate 
          the 37 ETH and identify the ETHGR contract owner.
        </AlertDescription>
      </Alert>

      {wallets.length === 0 ? (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm font-bold mb-2">Wallet Address:</div>
                  <div className="font-mono text-xs break-all">{wallet.address}</div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm font-bold mb-2">Wallet ETH:</div>
                  <div className="text-2xl font-bold text-blue-600">{parseFloat(balance).toFixed(6)} ETH</div>
                  <div className="text-sm text-muted-foreground">${(parseFloat(balance) * 2500).toFixed(2)} USD</div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm font-bold mb-2">Contract ETH:</div>
                  <div className="text-2xl font-bold text-purple-600">{parseFloat(contractBalance).toFixed(6)} ETH</div>
                  <div className="text-sm text-muted-foreground">${(parseFloat(contractBalance) * 2500).toFixed(2)} USD</div>
                </div>
              </div>

              <Alert className={`border-${totalETH > 30 ? 'green' : contractHasETH ? 'orange' : 'red'}-500 bg-${totalETH > 30 ? 'green' : contractHasETH ? 'orange' : 'red'}-50`}>
                {totalETH > 30 ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                <AlertDescription>
                  <strong>TOTAL ETH ANALYSIS:</strong>
                  <br />Wallet: {parseFloat(balance).toFixed(6)} ETH (${(parseFloat(balance) * 2500).toFixed(2)})
                  <br />Contract: {parseFloat(contractBalance).toFixed(6)} ETH (${(parseFloat(contractBalance) * 2500).toFixed(2)})
                  <br />Total: {totalETH.toFixed(6)} ETH (${(totalETH * 2500).toFixed(2)})
                  <br />
                  {totalETH > 30 ? "✓ Sufficient funds for massive liquidity pool!" : 
                   contractHasETH ? "⚠ Use emergency withdrawal to recover contract ETH" : 
                   "✗ 37 ETH not found in wallet or contract"}
                </AlertDescription>
              </Alert>
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
                disabled={isLoading || !contractHasETH}
                className={`w-full ${contractHasETH ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-400'}`}
              >
                {isLoading ? "Executing..." : 
                 contractHasETH ? `Withdraw ${parseFloat(contractBalance).toFixed(6)} ETH from Contract` : 
                 "No ETH in Contract to Withdraw"}
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