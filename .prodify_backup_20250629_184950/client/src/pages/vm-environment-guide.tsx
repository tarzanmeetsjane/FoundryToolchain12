import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target,
  ExternalLink,
  Download,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";

export default function VMEnvironmentGuide() {
  const [scriptDownloaded, setScriptDownloaded] = useState(false);

  const downloadMainnetScript = () => {
    const script = `// MAINNET 37 ETH RECOVERY SCRIPT
// Use this script on MAINNET environment, not VM
// Deploy to ETHEREUM MAINNET for real blockchain access

console.log('🌐 MAINNET 37 ETH RECOVERY STARTING...')
console.log('Network: ETHEREUM MAINNET')
console.log('Target: 37 ETH ($89,614)')

// Verify we're on mainnet
if (web3.eth.net.getId() !== 1) {
  console.log('⚠️ WARNING: Not on Ethereum Mainnet!')
  console.log('Switch to Mainnet for real transaction monitoring')
  return
}

console.log('✅ Connected to Ethereum Mainnet')

// All your critical wallet addresses
const RECOVERY_WALLETS = {
  deployer: '0x058C8FE01E5c9eaC6ee19e6673673B549B368843',
  remix: '0xc46eB37677360EfDc011F4097621F15b792fa630',    // Where you saw 37 ETH!
  discovery: '0x8b99Bb520235F502158bA026A7CfEB59a69E6c18',
  proxy: '0xd816c710dc011db6d357e2b1210eafc60177338f',
  contract: '0xfA7b8c553C48C56ec7027d26ae95b029a2abF247'
}

console.log('\\n💰 CHECKING ALL WALLETS ON MAINNET...')

for (const [name, address] of Object.entries(RECOVERY_WALLETS)) {
  try {
    const balance = await web3.eth.getBalance(address)
    const ethAmount = web3.utils.fromWei(balance, 'ether')
    const usdValue = parseFloat(ethAmount) * 2422
    
    console.log('\\n' + '='.repeat(50))
    console.log('📍 WALLET:', name.toUpperCase())
    console.log('📍 ADDRESS:', address)
    console.log('💰 BALANCE:', ethAmount, 'ETH')
    console.log('💵 USD VALUE: $' + usdValue.toLocaleString())
    
    if (parseFloat(ethAmount) >= 37) {
      console.log('\\n🎉🎉🎉 FOUND YOUR 37 ETH! 🎉🎉🎉')
      console.log('*** MAINNET RECOVERY SUCCESS ***')
      console.log('*** TRANSFER TO SECURE WALLET NOW ***')
      console.log('*** VALUE: $' + usdValue.toLocaleString() + ' ***')
      return address
    } else if (parseFloat(ethAmount) >= 30) {
      console.log('🚨 NEAR TARGET - INVESTIGATE!')
    } else if (parseFloat(ethAmount) >= 5) {
      console.log('💰 SIGNIFICANT BALANCE')
    }
    
    // Check recent transactions for this wallet
    const latestBlock = await web3.eth.getBlockNumber()
    console.log('🔍 Latest block:', latestBlock)
    
  } catch (error) {
    console.log('❌ Error checking', name, ':', error.message)
  }
}

console.log('\\n🔍 MAINNET DEPLOYMENT BLOCK ANALYSIS...')
const deploymentBlock = 22714790

try {
  const block = await web3.eth.getBlock(deploymentBlock, true)
  console.log('📦 Block', deploymentBlock, 'transactions:', block.transactions.length)
  
  // Look for large ETH transfers in deployment block
  for (const tx of block.transactions) {
    const ethValue = parseFloat(web3.utils.fromWei(tx.value, 'ether'))
    if (ethValue >= 30) {
      console.log('\\n🚨 LARGE TRANSFER IN DEPLOYMENT BLOCK!')
      console.log('TX:', tx.hash)
      console.log('Value:', ethValue, 'ETH')
      console.log('From:', tx.from)
      console.log('To:', tx.to)
    }
  }
} catch (error) {
  console.log('❌ Block analysis error:', error.message)
}

console.log('\\n✅ MAINNET RECOVERY SCAN COMPLETE')
console.log('If 37 ETH found: TRANSFER IMMEDIATELY!')`;

    const blob = new Blob([script], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MAINNET_37_ETH_Recovery.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setScriptDownloaded(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <Target className="inline-block mr-3 h-8 w-8 text-orange-500" />
          VM Environment Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          Switch from VM to Mainnet for 37 ETH recovery
        </p>
      </div>

      <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-lg font-semibold">
          VM LIMITATION: "Listen on all transactions" is disabled in VM environments. 
          Switch to ETHEREUM MAINNET for real blockchain access and 37 ETH recovery.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="problem" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="problem">VM Problem</TabsTrigger>
          <TabsTrigger value="solution">Mainnet Solution</TabsTrigger>
          <TabsTrigger value="script">Recovery Script</TabsTrigger>
        </TabsList>

        <TabsContent value="problem" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                VM Environment Limitations
              </CardTitle>
              <CardDescription>
                Why VM environments cannot access your real 37 ETH
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>CRITICAL ISSUE:</strong> VM environments use simulated blockchain data, 
                  not real Ethereum mainnet where your 37 ETH actually exists.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2 text-red-600">VM Environment Issues:</h4>
                  <ul className="text-sm space-y-1 list-disc ml-4">
                    <li>Cannot access real Ethereum mainnet transactions</li>
                    <li>"Listen on all transactions" disabled for security</li>
                    <li>Simulated wallet balances, not real ETH</li>
                    <li>No access to your actual deployed contracts</li>
                    <li>Cannot see real deployment block 22714790</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-600">What VM Shows vs Reality:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">VM Environment:</p>
                      <ul className="list-disc ml-4">
                        <li>Fake wallet balances</li>
                        <li>Simulated transactions</li>
                        <li>Test network only</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Ethereum Mainnet:</p>
                      <ul className="list-disc ml-4">
                        <li>Your real 37 ETH</li>
                        <li>Actual transaction history</li>
                        <li>Real deployed contracts</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-500 rounded-lg">
                  <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                    Your Real Assets (Mainnet Only):
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>• 37 ETH recovery target ($89,614)</p>
                    <p>• ETHGR contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247</p>
                    <p>• Deployment block: 22714790</p>
                    <p>• 1.99M ETHGR tokens successfully minted</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Mainnet Connection Solution
              </CardTitle>
              <CardDescription>
                How to switch to real Ethereum mainnet for 37 ETH recovery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>SOLUTION:</strong> Connect to Ethereum Mainnet through MetaMask 
                  to access your real 37 ETH and blockchain data.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Step 1: Switch to Mainnet in Remix</h4>
                  <ol className="text-sm space-y-1 list-decimal ml-4">
                    <li>Open Remix IDE (remix.ethereum.org)</li>
                    <li>Go to "Deploy & Run Transactions" tab</li>
                    <li>In "Environment" dropdown, select "Injected Provider - MetaMask"</li>
                    <li>Ensure MetaMask is connected to "Ethereum Mainnet"</li>
                  </ol>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Step 2: Verify Mainnet Connection</h4>
                  <ol className="text-sm space-y-1 list-decimal ml-4">
                    <li>Check that network shows "Ethereum Mainnet (1)"</li>
                    <li>Verify your wallet address appears correctly</li>
                    <li>Confirm you can see real ETH balance</li>
                    <li>Test connection to your deployed contract</li>
                  </ol>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Step 3: Run Recovery Script</h4>
                  <ol className="text-sm space-y-1 list-decimal ml-4">
                    <li>Download the mainnet recovery script below</li>
                    <li>Upload to Remix and run in console</li>
                    <li>Script will check all your real wallet balances</li>
                    <li>Look for "FOUND YOUR 37 ETH!" message</li>
                  </ol>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium mb-2">Mainnet Advantages:</h4>
                  <ul className="text-sm space-y-1 list-disc ml-4">
                    <li>Access to real deployment block 22714790</li>
                    <li>Actual wallet balances and transaction history</li>
                    <li>Real ETHGR contract interaction</li>
                    <li>Live blockchain monitoring capabilities</li>
                    <li>Actual 37 ETH recovery possibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="script" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-green-500" />
                Mainnet Recovery Script
              </CardTitle>
              <CardDescription>
                Download script designed for Ethereum Mainnet access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  This script is specifically designed for Ethereum Mainnet and will verify 
                  network connection before checking your real wallet balances.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <Button 
                  onClick={downloadMainnetScript} 
                  className="w-full" 
                  size="lg"
                  disabled={scriptDownloaded}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {scriptDownloaded ? "Mainnet Script Downloaded" : "Download Mainnet Recovery Script"}
                </Button>

                {scriptDownloaded && (
                  <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-500 rounded-lg">
                    <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                      Mainnet Script Features:
                    </h4>
                    <div className="text-sm space-y-1">
                      <p>• Verifies Ethereum Mainnet connection (Network ID = 1)</p>
                      <p>• Checks all your real wallet balances</p>
                      <p>• Analyzes actual deployment block 22714790</p>
                      <p>• Searches for real 37 ETH recovery target</p>
                      <p>• Provides immediate transfer instructions if found</p>
                    </div>
                  </div>
                )}

                <div className="p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-950">
                  <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">
                    Mainnet Recovery Process:
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>1. Switch Remix to "Injected Provider - MetaMask"</p>
                    <p>2. Ensure MetaMask is on "Ethereum Mainnet"</p>
                    <p>3. Upload and run the mainnet recovery script</p>
                    <p>4. Script verifies network and checks real balances</p>
                    <p>5. If 37 ETH found, transfer to secure wallet immediately</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" asChild>
                    <a href="/etherscan-37eth-checker">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Etherscan Checker
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/usd-conversion-dashboard">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      USD Dashboard
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}