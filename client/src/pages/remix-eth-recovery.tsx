import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search,
  ExternalLink,
  Copy,
  Target,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Wallet,
  Code,
  History
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RemixETHRecovery() {
  const [remixConnected, setRemixConnected] = useState(false);
  const [executedCommands, setExecutedCommands] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    checkRemixConnection();
  }, []);

  const checkRemixConnection = () => {
    const currentUrl = window.location.href;
    const hasRemixTab = document.referrer.includes('remix.ethereum.org');
    setRemixConnected(hasRemixTab || currentUrl.includes('remix'));
  };

  const copyCommand = (command: string, label: string) => {
    navigator.clipboard.writeText(command);
    setExecutedCommands([...executedCommands, label]);
    toast({
      title: "Copied to Clipboard",
      description: `${label} - paste into Remix IDE terminal`
    });
  };

  const recoveryCommands = [
    {
      title: "Check Deployment History",
      description: "Find your recent contract deployments",
      command: `// Get deployment instances and transaction history
remix.call('udapp', 'getInstanceList').then(console.log)
remix.call('udapp', 'getTransactionHistory').then(console.log)
remix.call('fileManager', 'getCurrentWorkspace').then(console.log)`,
      critical: true
    },
    {
      title: "Check Key Wallet Balances", 
      description: "Verify ETH in your recovery target wallets",
      command: `// Check wallet balances for 37 ETH
web3.eth.getBalance('0xc46eB37677360EfDc011F4097621F15b792fa630').then(bal => console.log('Remix Wallet:', web3.utils.fromWei(bal, 'ether'), 'ETH'))
web3.eth.getBalance('0x8b99Bb520235F502158bA026A7CfEB59a69E6c18').then(bal => console.log('New Wallet:', web3.utils.fromWei(bal, 'ether'), 'ETH'))
web3.eth.getBalance('0xd816c710dc011db6d357e2b1210eafc60177338f').then(bal => console.log('Proxy Contract:', web3.utils.fromWei(bal, 'ether'), 'ETH'))`,
      critical: true
    },
    {
      title: "Investigate Proxy Contract Functions",
      description: "Check if proxy contract has recoverable ETH",
      command: `// Investigate proxy contract at 0xd816c710dc011db6d357e2b1210eafc60177338f
const proxyAddr = '0xd816c710dc011db6d357e2b1210eafc60177338f'
web3.eth.getCode(proxyAddr).then(code => {
  console.log('Contract Code Length:', code.length)
  console.log('Has Code:', code !== '0x')
})

// Check for standard proxy functions
const proxyABI = [
  {"inputs":[],"name":"admin","outputs":[{"type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"implementation","outputs":[{"type":"address"}],"stateMutability":"view","type":"function"}
]
const proxyContract = new web3.eth.Contract(proxyABI, proxyAddr)
proxyContract.methods.admin().call().then(admin => console.log('Proxy Admin:', admin)).catch(e => console.log('No admin function'))
proxyContract.methods.implementation().call().then(impl => console.log('Implementation:', impl)).catch(e => console.log('No implementation function'))`,
      critical: true
    },
    {
      title: "Search Transaction History",
      description: "Look for large ETH movements in your transactions",
      command: `// Search for large ETH transfers in transaction history
const targetWallets = [
  '0xc46eB37677360EfDc011F4097621F15b792fa630',
  '0x8b99Bb520235F502158bA026A7CfEB59a69E6c18',
  '0x058C8FE01E5c9eaC6ee19e6673673B549B368843'
]

targetWallets.forEach(wallet => {
  web3.eth.getTransactionCount(wallet).then(count => 
    console.log(\`\${wallet}: \${count} transactions\`)
  )
})`,
      critical: false
    },
    {
      title: "Check Browser Local Storage",
      description: "Access Remix stored deployment data",
      command: `// Check browser storage for deployment records
Object.keys(localStorage).filter(key => 
  key.includes('remix') || key.includes('deploy') || key.includes('instance')
).forEach(key => {
  console.log(\`\${key}:\`, localStorage.getItem(key))
})

// Check for wallet connections
Object.keys(localStorage).filter(key => 
  key.includes('wallet') || key.includes('account')
).forEach(key => {
  console.log(\`Wallet Storage \${key}:\`, localStorage.getItem(key))
})`,
      critical: false
    }
  ];

  const quickRecoverySteps = [
    "Open Remix IDE in a new tab (https://remix.ethereum.org/)",
    "Open the terminal panel (bottom of screen)",
    "Copy and paste each command below one by one",
    "Look for any wallet showing 30+ ETH balance",
    "Check proxy contract admin functions for recovery access",
    "Document any large ETH amounts found"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">37 ETH Recovery Mission</h1>
          <p className="text-muted-foreground">
            Execute recovery commands in Remix IDE to locate your 37 ETH
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => window.open('https://remix.ethereum.org/', '_blank')}
            variant="default"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Remix IDE
          </Button>
        </div>
      </div>

      <Alert className="border-red-500 bg-red-50">
        <Target className="h-4 w-4" />
        <AlertDescription>
          <strong>MISSION CRITICAL:</strong> You saw 37 ETH ($89,614) in Remix IDE bottom left after deployment. 
          This recovery interface provides exact commands to locate and access those funds.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Recovery Command Sequence
              </CardTitle>
              <CardDescription>
                Execute these commands in Remix IDE terminal to find your ETH
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recoveryCommands.map((cmd, index) => (
                <div key={index} className={`p-4 border rounded-lg ${cmd.critical ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={cmd.critical ? "destructive" : "outline"}>
                          Step {index + 1}
                        </Badge>
                        <h4 className="font-semibold">{cmd.title}</h4>
                        {executedCommands.includes(cmd.title) && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{cmd.description}</p>
                    </div>
                  </div>
                  
                  <Textarea 
                    value={cmd.command}
                    readOnly
                    className="h-32 text-xs font-mono mb-3"
                  />
                  
                  <Button 
                    size="sm"
                    onClick={() => copyCommand(cmd.command, cmd.title)}
                    variant={cmd.critical ? "destructive" : "outline"}
                    className="w-full"
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy & Execute in Remix
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Quick Recovery Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickRecoverySteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-0.5">
                      {index + 1}
                    </Badge>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Target Wallets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-xs">
                <div className="p-2 bg-yellow-50 rounded">
                  <div className="font-semibold">Remix Deployment Wallet</div>
                  <div className="font-mono break-all">0xc46eB37677360EfDc011F4097621F15b792fa630</div>
                  <div className="text-muted-foreground">Where you saw 37 ETH</div>
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <div className="font-semibold">New Discovery Wallet</div>
                  <div className="font-mono break-all">0x8b99Bb520235F502158bA026A7CfEB59a69E6c18</div>
                  <div className="text-muted-foreground">Recently provided</div>
                </div>
                <div className="p-2 bg-red-50 rounded">
                  <div className="font-semibold">Proxy Contract</div>
                  <div className="font-mono break-all">0xd816c710dc011db6d357e2b1210eafc60177338f</div>
                  <div className="text-muted-foreground">Potential ETH trap</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                What to Look For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Wallet balance showing 30+ ETH</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Proxy admin functions you control</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Contract with recoverable ETH</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Large ETH transfer transactions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Recovery Success Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded">
              <div className="font-semibold text-green-700">If ETH Found in Wallet</div>
              <div className="text-sm mt-2">
                • Immediately transfer to secure wallet
                • Document transaction hash
                • Update portfolio value to $1.503M
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded">
              <div className="font-semibold text-yellow-700">If ETH in Proxy Contract</div>
              <div className="text-sm mt-2">
                • Check admin functions access
                • Execute withdrawal if possible
                • May need proxy upgrade process
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <div className="font-semibold text-blue-700">Continue Investigation</div>
              <div className="text-sm mt-2">
                • Trace transaction history
                • Check implementation contracts
                • Analyze deployment patterns
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <Button onClick={() => window.open('/million-dollar-strategy', '_blank')}>
              Return to Strategy
            </Button>
            <Button variant="outline" onClick={() => window.open('/wallet-analyzer', '_blank')}>
              Wallet Tools
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}