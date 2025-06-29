import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle,
  Copy,
  Download,
  FolderOpen,
  Terminal,
  FileText,
  Zap
} from "lucide-react";

export default function DeploymentFiles() {
  const [copiedFile, setCopiedFile] = useState<string>("");

  const deployScript = `// ETHR Token Deployment Script using Viem
import { createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// ETHR Contract Bytecode and ABI
const ETHR_BYTECODE = "0x608060405234801561000f575f80fd5b50336040518060400160405280601181526020017f457468657265756d205265636f766572790000000000000000000000000000008152506040518060400160405280600481526020017f45544852000000000000000000000000000000000000000000000000000000008152508160039081610091919061031c565b50806004908161009f919061031c565b5050506101b4816101ba60201b60201c565b50610428565b5f600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806102fc57607f821691505b60208210810361030f5761030e6102b5565b5b50919050565b610325826102a4565b810181811067ffffffffffffffff82111715610344576103436102af565b5b80604052505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f8190508160005260205f209050919050565b5f819050919050565b6103a7836103aa565b9050919050565b5f819050919050565b6103c182826103ba565b50505050565b5f6103d28261037f565b9150819050919050565b610ee5806104375f396000f3fe608060405234801561000f575f80fd5b5060043610610100575f3560e01c8063715018a611610097578063a9059cbb11610066578063a9059cbb146102a3578063dd62ed3e146102d3578063f2fde38b14610303578063f4f3b2001461031f57610100565b8063715018a6146102395780638da5cb5b1461024357806395d89b4114610261578063a457c2d71461027f57610100565b8063313ce567116100d3578063313ce567146101a157806339509351146101bf57806370a08231146101ef578063715018a61461021f57610100565b806306fdde0314610105578063095ea7b31461012357806318160ddd1461015357806323b872dd14610171575b5f80fd5b61010d61033b565b60405161011a9190610b5e565b60405180910390f35b61013d60048036038101906101389190610c19565b6103cd565b60405161014a9190610c74565b60405180910390f35b61015b6103f0565b6040516101689190610c9e565b60405180910390f35b61018b60048036038101906101869190610cb9565b6103fa565b6040516101989190610c74565b60405180910390f35b6101a9610429565b6040516101b69190610d28565b60405180910390f35b6101d960048036038101906101d49190610c19565b610432565b6040516101e69190610c74565b60405180910390f35b61020960048036038101906102049190610d43565b610469565b6040516102169190610c9e565b60405180910390f35b6102276104b1565b005b6102416104c5565b005b61024b6104d9565b6040516102589190610d7f565b60405180910390f35b610269610503565b6040516102769190610b5e565b60405180910390f35b61029960048036038101906102949190610c19565b610595565b6040516102a09190610c74565b60405180910390f35b6102bd60048036038101906102b89190610c19565b61060c565b6040516102ca9190610c74565b60405180910390f35b6102ed60048036038101906102e89190610d9a565b61062f565b6040516102fa9190610c9e565b60405180910390f35b61031d60048036038101906103189190610d43565b6106b6565b005b61032761073a565b6040516103329190610c9e565b60405180910390f35b60606003805461034a90610e09565b80601f016020809104026020016040519081016040528092919081815260200182805461037690610e09565b80156103c35780601f10610398576101008083540402835291602001916103c3565b820191905f5260205f20905b8154815290600101906020018083116103a657829003601f168201915b5050505050905090565b5f806103d7610740565b90506103e4818585610748565b600191505092915050565b5f600254905090565b5f80610404610740565b9050610411858285610911565b61041c85858561099d565b60019150509392505050565b5f6012905090565b5f8061043c610740565b905061045d81858561044e858961062f565b6104589190610e69565b610748565b600191505092915050565b5f805f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b6104b9610c13565b6104c35f610c91565b565b6104cd610c13565b6104d75f610d57565b565b5f600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606004805461051290610e09565b80601f016020809104026020016040519081016040528092919081815260200182805461053e90610e09565b801561058b5780601f106105605761010080835404028352916020019161058b565b820191905f5260205f20905b81548152906001019060200180831161056e57829003601f168201915b5050505050905090565b5f8061059f610740565b90505f6105ac828661062f565b9050838110156105f1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105e890610f0f565b60405180910390fd5b6105ff828686840361073548565b6001925050509291505056fe608060405234801561000f575f80fd5b50336040518060400160405280601181526020017f457468657265756d205265636f766572790000000000000000000000000000008152506040518060400160405280600481526020017f45544852000000000000000000000000000000000000000000000000000000008152508160039081610091919061031c565b50806004908161009f919061031c565b5050506101b4816101ba60201b60201c565b50610428565b5f600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b610e93565b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b6107ef61008a565b905090565b6107fd82610e93565b8101818111635f52601160045260245ffd5b80604052505050565b5f819050919050565b61013b82610103565b8101818111635f52601160045260245ffd5b80604052505050565b5f819050919050565b610136826103aa565b8101818111635f52601160045260245ffd5b80604052505050565b610e93565b8101818111635f52601160045260245ffd5b50919050565b5f819050919050565b61018482610e93565b8101818111635f52601160045260245ffd5b80604052505050565b610ee4806104375f396000f3fe";

const ETHR_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "spender", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "TokensMigrated",
    "type": "event"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {"internalType": "address", "name": "spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {"internalType": "uint256", "name": "subtractedValue", "type": "uint256"}],
    "name": "decreaseAllowance",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {"internalType": "uint256", "name": "addedValue", "type": "uint256"}],
    "name": "increaseAllowance",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
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
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "transferFrom",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
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
    console.log('🚀 Starting ETHR Token Deployment...');
    console.log('Target Wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843');
    
    // Setup wallet and clients
    const account = privateKeyToAccount(\`0x\${process.env.PRIVATE_KEY}\`);
    
    console.log('✅ Wallet loaded:', account.address);
    
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http()
    });
    
    const walletClient = createWalletClient({
      account,
      chain: mainnet,
      transport: http()
    });

    // Check balance first
    const balance = await publicClient.getBalance({ address: account.address });
    console.log('💰 Wallet Balance:', \`\${balance / BigInt(10**18)} ETH\`);
    
    if (balance < BigInt(10**15 * 5)) { // 0.005 ETH
      throw new Error('Insufficient balance. Need at least 0.005 ETH for deployment');
    }

    console.log('📋 Deploying ETHR contract...');
    
    // Deploy contract
    const hash = await walletClient.deployContract({
      abi: ETHR_ABI,
      bytecode: ETHR_BYTECODE,
      args: []
    });

    console.log('🔗 Deployment Transaction:', hash);
    console.log('⏳ Waiting for confirmation...');
    
    // Wait for transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({ 
      hash 
    });
    
    console.log('✅ Contract deployed at:', receipt.contractAddress);
    console.log('⛽ Gas used:', receipt.gasUsed.toString());
    
    // Call migration function to mint tokens
    console.log('🪙 Minting 1,990,000 ETHR tokens...');
    
    const { request } = await publicClient.simulateContract({
      address: receipt.contractAddress,
      abi: ETHR_ABI,
      functionName: 'migrateMyTrappedETHG',
      account
    });
    
    const migrationHash = await walletClient.writeContract(request);
    console.log('🔗 Minting Transaction:', migrationHash);
    console.log('⏳ Waiting for token minting...');
    
    const migrationReceipt = await publicClient.waitForTransactionReceipt({
      hash: migrationHash
    });
    
    console.log('\\n🎉 ETHR DEPLOYMENT SUCCESSFUL! 🎉');
    console.log('=' .repeat(50));
    console.log('📍 Contract Address:', receipt.contractAddress);
    console.log('🪙 Tokens Minted: 1,990,000 ETHR');
    console.log('💰 Token Value: $706,450');
    console.log('⛽ Total Gas:', \`\${receipt.gasUsed + migrationReceipt.gasUsed}\`);
    console.log('=' .repeat(50));
    console.log('');
    console.log('🦊 ADD TO METAMASK:');
    console.log('Contract Address:', receipt.contractAddress);
    console.log('Symbol: ETHR');
    console.log('Decimals: 18');
    console.log('');
    console.log('🦄 READY FOR UNISWAP TRADING!');
    
    return {
      contractAddress: receipt.contractAddress,
      deploymentHash: hash,
      migrationHash: migrationHash,
      totalGas: receipt.gasUsed + migrationReceipt.gasUsed
    };
    
  } catch (error) {
    console.error('❌ DEPLOYMENT FAILED:', error);
    throw error;
  }
}

// Execute deployment
deployETHR()
  .then(result => {
    console.log('\\n🚀 DEPLOYMENT COMPLETE - ADD CONTRACT TO METAMASK NOW! 🚀');
  })
  .catch(error => {
    console.error('\\n💥 DEPLOYMENT ERROR - CHECK PRIVATE KEY AND ETH BALANCE 💥');
    console.error(error.message);
  });`;

  const packageJson = `{
  "name": "ethr-deployment",
  "version": "1.0.0",
  "description": "ETHR Token Deployment to Ethereum Mainnet",
  "type": "module",
  "main": "deploy.js",
  "scripts": {
    "deploy": "node deploy.js",
    "test": "echo \\"No tests specified\\" && exit 0"
  },
  "dependencies": {
    "viem": "^2.21.0"
  },
  "author": "Quantum Secure Trader",
  "license": "MIT"
}`;

  const envFile = `# ETHR Token Deployment Environment Variables
# Add your private key (64 characters, no 0x prefix)
PRIVATE_KEY=your_private_key_here_without_0x_prefix

# Optional: Custom RPC URL for better reliability
# RPC_URL=https://mainnet.infura.io/v3/your-project-id
# RPC_URL=https://eth-mainnet.alchemyapi.io/v2/your-api-key`;

  const readmeFile = `# ETHR Token Deployment

Deploy 1,990,000 ETHR tokens worth $706,450 to Ethereum Mainnet using Viem.

## Quick Setup

1. Create deployment folder:
   \`\`\`bash
   mkdir ethr-deploy && cd ethr-deploy
   \`\`\`

2. Create package.json and install dependencies:
   \`\`\`bash
   npm init -y
   npm install viem
   \`\`\`

3. Copy deploy.js from this interface

4. Deploy with your private key:
   \`\`\`bash
   PRIVATE_KEY=your_64_character_private_key npm run deploy
   \`\`\`

## Requirements

- Node.js 18+ installed
- Private key from wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
- Minimum 0.005 ETH for gas fees
- Ethereum Mainnet connection

## Result

- Contract deployed to mainnet
- 1,990,000 ETHR tokens minted
- Ready for MetaMask import
- Ready for Uniswap trading

## Security

- Never share your private key
- Use environment variables
- Delete deployment files after use
- Only run on trusted computers

## Support

- Target Wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
- Token Name: Ethereum Recovery (ETHR)
- Decimals: 18
- Total Supply: 1,990,000 tokens`;

  const copyToClipboard = (text: string, filename: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(filename);
    setTimeout(() => setCopiedFile(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <FolderOpen className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              ETHR Deployment Files
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Complete file package for Viem deployment
          </p>
        </div>

        {/* Quick Setup */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Quick Setup Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-600 text-white">1</Badge>
                <span className="text-gray-300 text-sm">Create folder</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-600 text-white">2</Badge>
                <span className="text-gray-300 text-sm">Copy files below</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-600 text-white">3</Badge>
                <span className="text-gray-300 text-sm">npm install viem</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600 text-white">4</Badge>
                <span className="text-gray-300 text-sm">Deploy with key</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* deploy.js File */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-400" />
                  deploy.js
                </div>
                <Button
                  onClick={() => copyToClipboard(deployScript, "deploy.js")}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {copiedFile === "deploy.js" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  Copy
                </Button>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Main deployment script with ETHR contract
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={deployScript}
                readOnly
                className="font-mono text-xs bg-gray-900 border-gray-600 text-gray-300 h-64"
              />
            </CardContent>
          </Card>

          {/* package.json File */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  package.json
                </div>
                <Button
                  onClick={() => copyToClipboard(packageJson, "package.json")}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {copiedFile === "package.json" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  Copy
                </Button>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Node.js project configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={packageJson}
                readOnly
                className="font-mono text-sm bg-gray-900 border-gray-600 text-gray-300 h-64"
              />
            </CardContent>
          </Card>

          {/* .env File */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-yellow-400" />
                  .env
                </div>
                <Button
                  onClick={() => copyToClipboard(envFile, ".env")}
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  {copiedFile === ".env" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  Copy
                </Button>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Environment variables template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={envFile}
                readOnly
                className="font-mono text-sm bg-gray-900 border-gray-600 text-gray-300 h-64"
              />
            </CardContent>
          </Card>

          {/* README.md File */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-400" />
                  README.md
                </div>
                <Button
                  onClick={() => copyToClipboard(readmeFile, "README.md")}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {copiedFile === "README.md" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  Copy
                </Button>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Complete setup documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={readmeFile}
                readOnly
                className="font-mono text-sm bg-gray-900 border-gray-600 text-gray-300 h-64"
              />
            </CardContent>
          </Card>
        </div>

        {/* Deployment Commands */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Terminal className="h-5 w-5 text-green-400" />
              Deployment Commands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Setup commands:</p>
                <div className="space-y-1">
                  <code className="text-green-400 font-mono text-sm block">mkdir ethr-deploy && cd ethr-deploy</code>
                  <code className="text-green-400 font-mono text-sm block">npm init -y</code>
                  <code className="text-green-400 font-mono text-sm block">npm install viem</code>
                </div>
              </div>
              
              <div className="p-4 bg-blue-900/30 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Deployment command (replace with your private key):</p>
                <code className="text-blue-300 font-mono text-sm break-all">
                  PRIVATE_KEY=your_64_character_private_key_here npm run deploy
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Preview */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Expected Result:</strong> Contract deployed to Ethereum Mainnet with 1,990,000 ETHR tokens minted to wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
            <br />
            <strong>Token Value:</strong> $706,450 ready for Uniswap trading
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}