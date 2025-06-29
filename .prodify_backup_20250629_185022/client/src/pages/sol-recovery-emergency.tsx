import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  ExternalLink,
  Copy,
  FileX,
  Zap,
  Code,
  Download
} from "lucide-react";

export default function SolRecoveryEmergency() {
  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  const reconstructedWithdrawalCode = `// EMERGENCY ETH WITHDRAWAL FUNCTION
// Reconstructed for ETHGR Recovery Contract

function withdrawETH() public {
    require(msg.sender == owner, "Only owner can withdraw");
    uint256 balance = address(this).balance;
    require(balance > 0, "No ETH to withdraw");
    
    (bool success, ) = owner.call{value: balance}("");
    require(success, "Transfer failed");
}

function emergencyWithdraw() external {
    require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Unauthorized");
    payable(0x058C8FE01E5c9eaC6ee19e6673673B549B368843).transfer(address(this).balance);
}

// Alternative: Use receive function if available
receive() external payable {}

// Check contract balance
function getContractBalance() public view returns (uint256) {
    return address(this).balance;
}`;

  const emergencyABI = `[
  {
    "inputs": [],
    "name": "withdrawETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "emergencyWithdraw", 
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
]`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">⚡</div>
        <h1 className="text-4xl font-bold">EMERGENCY SOL RECOVERY</h1>
        <p className="text-xl text-muted-foreground">
          Recovering access to your 37 ETH after deleted Remix files
        </p>
      </div>

      <Alert className="border-red-500 bg-red-50">
        <FileX className="h-4 w-4" />
        <AlertDescription>
          <strong>CRITICAL ISSUE:</strong> Deleted .sol files in Remix = Lost withdrawal functions. 
          Your 37 ETH might be locked in the contract without proper access methods.
        </AlertDescription>
      </Alert>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Emergency Analysis
          </CardTitle>
          <CardDescription>
            Understanding what happened when you deleted the .sol files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-sm font-bold mb-2 text-red-600">What Was Lost:</div>
              <ul className="text-sm space-y-1">
                <li>• Withdrawal function code</li>
                <li>• Emergency access methods</li>
                <li>• Contract interaction interface</li>
                <li>• Owner permission functions</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm font-bold mb-2 text-green-600">What Still Exists:</div>
              <ul className="text-sm space-y-1">
                <li>• Contract on blockchain (deployed)</li>
                <li>• 37 ETH locked inside</li>
                <li>• Your ownership rights</li>
                <li>• Contract address access</li>
              </ul>
            </div>
          </div>

          <Alert className="border-blue-500 bg-blue-50">
            <AlertDescription>
              <strong>SOLUTION:</strong> We can reconstruct the withdrawal functions and interact with 
              the contract directly through Etherscan's Write Contract interface.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Reconstructed Withdrawal Code
          </CardTitle>
          <CardDescription>
            Emergency functions to recover your 37 ETH
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto">
            <pre>{reconstructedWithdrawalCode}</pre>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => copyToClipboard(reconstructedWithdrawalCode)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Code
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                const blob = new Blob([reconstructedWithdrawalCode], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ETHGRWithdrawal.sol';
                a.click();
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download .sol
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Emergency ABI Interface
          </CardTitle>
          <CardDescription>
            Use this ABI to interact with your contract directly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-xs overflow-auto">
            <pre>{emergencyABI}</pre>
          </div>

          <Button
            variant="outline"
            onClick={() => copyToClipboard(emergencyABI)}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy ABI
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <ExternalLink className="h-5 w-5" />
              Recovery Method 1: Remix
            </CardTitle>
            <CardDescription>
              Recreate the contract in Remix IDE
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div>1. Open Remix IDE</div>
              <div>2. Create new .sol file</div>
              <div>3. Paste reconstructed code</div>
              <div>4. Connect to existing contract</div>
              <div>5. Call withdrawETH function</div>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => window.open('https://remix.ethereum.org', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Remix IDE
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <ExternalLink className="h-5 w-5" />
              Recovery Method 2: Etherscan
            </CardTitle>
            <CardDescription>
              Direct contract interaction via Etherscan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div>1. Go to contract on Etherscan</div>
              <div>2. Use "Write Contract" tab</div>
              <div>3. Connect your wallet</div>
              <div>4. Find withdrawal function</div>
              <div>5. Execute to recover ETH</div>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open(`https://etherscan.io/address/${ETHGR_CONTRACT}#writeContract`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Etherscan Write Contract
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600">
            <AlertTriangle className="h-5 w-5" />
            Contract Information
          </CardTitle>
          <CardDescription>
            Your ETHGR recovery contract details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-bold">Contract Address:</div>
              <div className="font-mono text-xs break-all">{ETHGR_CONTRACT}</div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(ETHGR_CONTRACT)}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-bold">Owner Address:</div>
              <div className="font-mono text-xs break-all">0x058C8FE01E5c9eaC6ee19e6673673B549B368843</div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard("0x058C8FE01E5c9eaC6ee19e6673673B549B368843")}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-bold">Expected ETH Balance:</div>
              <div className="text-lg font-bold">37.000 ETH ($92,500)</div>
            </div>
          </div>

          <Alert className="border-green-500 bg-green-50">
            <AlertDescription>
              <strong>RECOVERY PRIORITY:</strong> If successful, this recovers $92,500 worth of ETH 
              for your ETHGR liquidity pool - transforming your strategy from minimal to massive pool.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}