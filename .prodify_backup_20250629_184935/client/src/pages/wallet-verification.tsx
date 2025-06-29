import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Target,
  CheckCircle,
  AlertTriangle,
  Copy,
  ExternalLink,
  Wallet,
  Search
} from "lucide-react";

export default function WalletVerification() {
  const [connectedWallet, setConnectedWallet] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [isCorrectWallet, setIsCorrectWallet] = useState<boolean | null>(null);

  // Your known wallet addresses
  const targetWallets = {
    deployer: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    remix: "0xc46eB37677360EfDc011F4097621F15b792fa630",
    discovery: "0x8b99Bb520235F502158bA026A7CfEB59a69E6c18"
  };

  const checkWalletConnection = () => {
    // In real implementation, this would check MetaMask connection
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setConnectedWallet(accounts[0]);
            checkIfCorrectWallet(accounts[0]);
          }
        });
    }
  };

  const checkIfCorrectWallet = (wallet: string) => {
    const walletLower = wallet.toLowerCase();
    const isTarget = Object.values(targetWallets).some(addr => 
      addr.toLowerCase() === walletLower
    );
    setIsCorrectWallet(isTarget);
  };

  const getWalletName = (address: string) => {
    const addressLower = address.toLowerCase();
    for (const [name, addr] of Object.entries(targetWallets)) {
      if (addr.toLowerCase() === addressLower) {
        return name.toUpperCase();
      }
    }
    return "UNKNOWN";
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const openEtherscan = (address: string) => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <Wallet className="inline-block mr-3 h-8 w-8 text-blue-500" />
          Wallet Verification Center
        </h1>
        <p className="text-xl text-muted-foreground">
          Verify MetaMask connection before 37 ETH search
        </p>
      </div>

      <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-lg font-semibold">
          IMPORTANT: Verify you're connected to the correct wallet before searching for 37 ETH. 
          Wrong wallet = no access to your funds.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              MetaMask Connection Check
            </CardTitle>
            <CardDescription>
              Verify you're connected to the right wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={checkWalletConnection} className="w-full">
              <Wallet className="h-4 w-4 mr-2" />
              Check MetaMask Connection
            </Button>

            {connectedWallet && (
              <div className="space-y-3">
                <div>
                  <Label>Connected Wallet</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input value={connectedWallet} readOnly className="font-mono text-xs" />
                    <Button size="sm" variant="outline" onClick={() => copyAddress(connectedWallet)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {isCorrectWallet !== null && (
                  <Alert className={`${isCorrectWallet ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'}`}>
                    {isCorrectWallet ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                    <AlertDescription>
                      {isCorrectWallet ? (
                        <div>
                          <strong>CORRECT WALLET DETECTED!</strong>
                          <br />
                          Wallet Type: {getWalletName(connectedWallet)}
                          <br />
                          You can proceed with 37 ETH search.
                        </div>
                      ) : (
                        <div>
                          <strong>WRONG WALLET!</strong>
                          <br />
                          This wallet is not in your recovery list.
                          <br />
                          Switch to a target wallet in MetaMask.
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Wallet Addresses</CardTitle>
            <CardDescription>
              Your known wallets that may contain 37 ETH
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(targetWallets).map(([name, address]) => (
              <div key={name} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{name.toUpperCase()} WALLET</span>
                  {name === 'remix' && (
                    <Badge variant="destructive">37 ETH SEEN HERE</Badge>
                  )}
                  {name === 'deployer' && (
                    <Badge className="bg-green-500 text-white">VERIFIED OWNER</Badge>
                  )}
                  {name === 'discovery' && (
                    <Badge variant="secondary">NEW TARGET</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Input value={address} readOnly className="font-mono text-xs" />
                  <Button size="sm" variant="outline" onClick={() => copyAddress(address)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button size="sm" onClick={() => openEtherscan(address)}>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                {name === 'remix' && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    ⚠️ This is where you saw 37 ETH in Remix IDE
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            37 ETH Search Status
          </CardTitle>
          <CardDescription>
            Current status of your 37 ETH recovery mission
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
            <Target className="h-4 w-4" />
            <AlertDescription>
              <strong>SEARCH STATUS:</strong> No confirmed location of 37 ETH yet found in our analysis. 
              You reported seeing 37 ETH in Remix wallet (0xc46e...), but we need to verify on mainnet.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 border rounded">
              <div className="text-lg font-bold text-orange-500">SEARCHING</div>
              <div className="text-sm text-muted-foreground">Current Status</div>
            </div>
            <div className="p-3 border rounded">
              <div className="text-lg font-bold text-blue-500">$89,614</div>
              <div className="text-sm text-muted-foreground">Target USD Value</div>
            </div>
            <div className="p-3 border rounded">
              <div className="text-lg font-bold text-green-500">MAINNET</div>
              <div className="text-sm text-muted-foreground">Required Network</div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-500 rounded-lg">
            <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">
              Next Steps for 37 ETH Recovery:
            </h4>
            <div className="text-sm space-y-1">
              <p>1. ✅ Verify correct wallet connection (do this first)</p>
              <p>2. 🔄 Switch MetaMask to Ethereum Mainnet</p>
              <p>3. 🔍 Run mainnet recovery script to check real balances</p>
              <p>4. 🎯 Focus on Remix wallet (0xc46e...) where you saw 37 ETH</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" asChild>
              <a href="/vm-environment-guide">
                <ExternalLink className="h-4 w-4 mr-2" />
                Mainnet Setup Guide
              </a>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <a href="/etherscan-37eth-checker">
                <Search className="h-4 w-4 mr-2" />
                Start ETH Search
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}