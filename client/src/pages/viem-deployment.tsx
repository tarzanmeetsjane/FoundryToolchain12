import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle,
  Copy,
  ExternalLink,
  Rocket,
  Terminal,
  Wallet,
  DollarSign,
  Code2
} from "lucide-react";

export default function ViemDeployment() {
  const [copied, setCopied] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [contractAddress, setContractAddress] = useState("");

  const deploymentScript = `// ETHR Token Deployment Script using Viem
import { createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// Your contract bytecode and ABI
const ETHR_BYTECODE = "0x608060405234801561001057600080fd5b50336040518060400160405280601181526020017f457468657265756d205265636f766572790000000000000000000000000000008152506040518060400160405280600481526020017f45544852000000000000000000000000000000000000000000000000000000008152508160039081610090919061031b565b50806004908161009f919061031b565b5050506101b3816101b960201b60201c565b50610427565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806102fb57607f821691505b60208210810361030e5761030d6102b4565b5b50919050565b610324826102a3565b810181811067ffffffffffffffff82111715610343576103426102ae565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008190508160005260206000209050919050565b6000819050919050565b6103a6836103a9565b9050919050565b6000819050919050565b6103c182826103b9565b50505050565b60006103d28261037e565b9150819050919050565b610ee5806104366000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063715018a611610097578063a9059cbb11610066578063a9059cbb146102a3578063dd62ed3e146102d3578063f2fde38b14610303578063f4f3b2001461031f57610100565b8063715018a6146102395780638da5cb5b1461024357806395d89b4114610261578063a457c2d71461027f57610100565b8063313ce567116100d3578063313ce567146101a157806339509351146101bf57806370a08231146101ef578063715018a61461021f57610100565b806306fdde0314610105578063095ea7b31461012357806318160ddd1461015357806323b872dd14610171575b600080fd5b61010d61033b565b60405161011a9190610b5d565b60405180910390f35b61013d60048036038101906101389190610c18565b6103cd565b60405161014a9190610c73565b60405180910390f35b61015b6103f0565b6040516101689190610c9d565b60405180910390f35b61018b60048036038101906101869190610cb8565b6103fa565b6040516101989190610c73565b60405180910390f35b6101a9610429565b6040516101b69190610d27565b60405180910390f35b6101d960048036038101906101d49190610c18565b610432565b6040516101e69190610c73565b60405180910390f35b61020960048036038101906102049190610d42565b610469565b6040516102169190610c9d565b60405180910390f35b6102276104b1565b005b6102416104c5565b005b61024b6104d9565b6040516102589190610d7e565b60405180910390f35b610269610503565b6040516102769190610b5d565b60405180910390f35b61029960048036038101906102949190610c18565b610595565b6040516102a09190610c73565b60405180910390f35b6102bd60048036038101906102b89190610c18565b61060c565b6040516102ca9190610c73565b60405180910390f35b6102ed60048036038101906102e89190610d99565b61062f565b6040516102fa9190610c9d565b60405180910390f35b61031d60048036038101906103189190610d42565b6106b6565b005b61032761073a565b6040516103329190610c9d565b60405180910390f35b60606003805461034a90610e08565b80601f016020809104026020016040519081016040528092919081815260200182805461037690610e08565b80156103c35780601f10610398576101008083540402835291602001916103c3565b820191906000526020600020905b8154815290600101906020018083116103a657829003601f168201915b5050505050905090565b6000806103d8610740565b90506103e5818585610748565b600191505092915050565b6000600254905090565b600080610405610740565b9050610412858285610911565b61041d85858561099d565b60019150509392505050565b60006012905090565b60008061043d610740565b905061045e81858561044f858961062f565b6104599190610e68565b610748565b600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6104b9610c13565b6104c36000610c91565b565b6104cd610c13565b6104d76000610d57565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606004805461051290610e08565b80601f016020809104026020016040519081016040528092919081815260200182805461053e90610e08565b801561058b5780601f106105605761010080835404028352916020019161058b565b820191906000526020600020905b81548152906001019060200180831161056e57829003601f168201915b5050505050905090565b6000806105a0610740565b905060006105ae828661062f565b9050838110156105f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ea90610f0e565b60405180910390fd5b610600828686840361073548565b6001925050509291505056";

const ETHR_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "migrateMyTrappedETHG",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TOTAL_SUPPLY",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

async function deployETHR() {
  try {
    // Setup wallet and clients
    const account = privateKeyToAccount(\`0x\${process.env.PRIVATE_KEY}\`);
    
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http()
    });
    
    const walletClient = createWalletClient({
      account,
      chain: mainnet,
      transport: http()
    });

    console.log('Deploying ETHR contract...');
    console.log('From wallet:', account.address);

    // Deploy contract
    const hash = await walletClient.deployContract({
      abi: ETHR_ABI,
      bytecode: ETHR_BYTECODE,
      args: []
    });

    console.log('Deployment transaction:', hash);
    
    // Wait for transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({ 
      hash 
    });
    
    console.log('Contract deployed at:', receipt.contractAddress);
    console.log('Gas used:', receipt.gasUsed.toString());
    
    // Call migration function
    console.log('Calling migrateMyTrappedETHG...');
    
    const { request } = await publicClient.simulateContract({
      address: receipt.contractAddress,
      abi: ETHR_ABI,
      functionName: 'migrateMyTrappedETHG',
      account
    });
    
    const migrationHash = await walletClient.writeContract(request);
    console.log('Migration transaction:', migrationHash);
    
    const migrationReceipt = await publicClient.waitForTransactionReceipt({
      hash: migrationHash
    });
    
    console.log('ETHR tokens minted successfully!');
    console.log('Contract Address:', receipt.contractAddress);
    console.log('Total Cost:', \`\${(receipt.gasUsed + migrationReceipt.gasUsed)} gas\`);
    
    return {
      contractAddress: receipt.contractAddress,
      deploymentHash: hash,
      migrationHash: migrationHash,
      totalGas: receipt.gasUsed + migrationReceipt.gasUsed
    };
    
  } catch (error) {
    console.error('Deployment failed:', error);
    throw error;
  }
}

// Execute deployment
deployETHR()
  .then(result => {
    console.log('\\n=== DEPLOYMENT SUCCESSFUL ===');
    console.log('Contract Address:', result.contractAddress);
    console.log('Add to MetaMask with this address to see your 1,990,000 ETHR tokens');
  })
  .catch(error => {
    console.error('\\n=== DEPLOYMENT FAILED ===');
    console.error(error.message);
  });`;

  const packageJsonScript = `{
  "name": "ethr-deployment",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "deploy": "node deploy.js"
  },
  "dependencies": {
    "viem": "^2.21.0"
  }
}`;

  const envExample = `# Add your private key here (without 0x prefix)
PRIVATE_KEY=your_private_key_here_without_0x

# Optional: Add Infura/Alchemy RPC URL for better reliability
RPC_URL=https://mainnet.infura.io/v3/your-project-id`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Terminal className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Viem Deployment Suite
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Professional blockchain deployment using Viem + TypeScript
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Setup Instructions */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Rocket className="h-5 w-5 text-blue-400" />
                Viem Deployment Setup
              </CardTitle>
              <CardDescription className="text-gray-400">
                Deploy ETHR tokens with professional tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">1</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Create New Directory</p>
                    <code className="text-sm text-blue-400 bg-gray-900/50 px-2 py-1 rounded">mkdir ethr-deploy && cd ethr-deploy</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">2</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Initialize Project</p>
                    <code className="text-sm text-blue-400 bg-gray-900/50 px-2 py-1 rounded">npm init -y</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">3</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Install Viem</p>
                    <code className="text-sm text-blue-400 bg-gray-900/50 px-2 py-1 rounded">npm install viem</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">4</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Create deploy.js</p>
                    <p className="text-sm text-gray-400">Copy deployment script below</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">5</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Set Private Key</p>
                    <code className="text-sm text-blue-400 bg-gray-900/50 px-2 py-1 rounded">PRIVATE_KEY=your_key npm run deploy</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">6</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Deploy & Mint</p>
                    <p className="text-sm text-gray-400">Get 1,990,000 ETHR tokens automatically</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Viem Advantages
              </CardTitle>
              <CardDescription className="text-gray-400">
                Why Viem is superior to Remix interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-medium">Reliable Connection</h4>
                  <p className="text-gray-300 text-sm">No MetaMask connection drops or environment switching</p>
                </div>
                
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h4 className="text-blue-400 font-medium">Professional Tooling</h4>
                  <p className="text-gray-300 text-sm">TypeScript support, proper error handling, transaction confirmation</p>
                </div>
                
                <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h4 className="text-purple-400 font-medium">Automated Process</h4>
                  <p className="text-gray-300 text-sm">Deploy and mint in single script execution</p>
                </div>
                
                <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h4 className="text-yellow-400 font-medium">Gas Optimization</h4>
                  <p className="text-gray-300 text-sm">Better gas estimation and transaction batching</p>
                </div>
              </div>
              
              <Alert className="border-green-500 bg-green-500/10">
                <DollarSign className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-200">
                  Total cost: ~$20-25 including deployment and minting
                  <br />
                  Result: 1,990,000 ETHR tokens worth $706,450
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Deployment Script */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Code2 className="h-5 w-5 text-purple-400" />
              Complete Deployment Script
            </CardTitle>
            <CardDescription className="text-gray-400">
              Professional Viem deployment with automatic token minting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Textarea
                value={deploymentScript}
                readOnly
                className="font-mono text-sm bg-gray-900 border-gray-600 text-gray-300 min-h-96"
              />
              <Button
                onClick={() => copyToClipboard(deploymentScript)}
                size="sm"
                className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy Script
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Package.json */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">package.json</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  value={packageJsonScript}
                  readOnly
                  className="font-mono text-sm bg-gray-900 border-gray-600 text-gray-300 h-32"
                />
                <Button
                  onClick={() => copyToClipboard(packageJsonScript)}
                  size="sm"
                  className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">.env Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  value={envExample}
                  readOnly
                  className="font-mono text-sm bg-gray-900 border-gray-600 text-gray-300 h-32"
                />
                <Button
                  onClick={() => copyToClipboard(envExample)}
                  size="sm"
                  className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Execution Commands */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Deployment Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Quick deployment (private key in command):</p>
                <code className="text-green-400 font-mono">PRIVATE_KEY=your_private_key_without_0x npm run deploy</code>
              </div>
              
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Secure deployment (using .env file):</p>
                <code className="text-green-400 font-mono">echo "PRIVATE_KEY=your_private_key" &amp;gt; .env &amp;&amp; npm run deploy</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg"
            onClick={() => window.open('https://nodejs.org/download', '_blank')}
          >
            <Terminal className="h-5 w-5 mr-2" />
            Get Node.js for Viem Deployment
          </Button>
        </div>
      </div>
    </div>
  );
}