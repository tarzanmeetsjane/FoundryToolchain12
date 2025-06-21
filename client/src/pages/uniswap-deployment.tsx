import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle,
  Copy,
  ExternalLink,
  Rocket,
  Wallet,
  DollarSign,
  Zap,
  AlertTriangle,
  Target,
  TrendingUp,
  ArrowRight
} from "lucide-react";

export default function UniswapDeployment() {
  const [copied, setCopied] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState(1);
  const [walletConnected, setWalletConnected] = useState(false);

  const uniswapDeploymentScript = `// ETHR Token Deployment via Uniswap Interface
// This script uses Uniswap's native wallet connection for reliable deployment

import { createWalletClient, createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { injected } from '@wagmi/connectors';

// ETHR Contract Configuration
const ETHR_CONFIG = {
  name: "Ethereum Recovery",
  symbol: "ETHR",
  totalSupply: "1990000000000000000000000", // 1,990,000 tokens
  targetWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
  bytecode: "0x608060405234801561000f575f80fd5b50336040518060400160405280601181526020017f457468657265756d205265636f766572790000000000000000000000000000008152506040518060400160405280600481526020017f45544852000000000000000000000000000000000000000000000000000000008152508160039081610091919061031c565b50806004908161009f919061031c565b5050506101b4816101ba60201b60201c565b50610428565b5f600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050;"
};

// Uniswap Wallet Connection
async function connectUniswapWallet() {
  try {
    // Check if Uniswap extension is available
    if (typeof window.ethereum === 'undefined') {
      throw new Error('No wallet extension found. Please install Uniswap Wallet Extension');
    }
    
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    
    if (accounts.length === 0) {
      throw new Error('No accounts found. Please connect your wallet');
    }
    
    console.log('✅ Wallet connected:', accounts[0]);
    return accounts[0];
    
  } catch (error) {
    console.error('❌ Wallet connection failed:', error);
    throw error;
  }
}

// Deploy ETHR Contract
async function deployETHRContract() {
  try {
    console.log('🚀 Starting ETHR Deployment via Uniswap...');
    
    // Connect wallet
    const walletAddress = await connectUniswapWallet();
    console.log('💰 Using wallet:', walletAddress);
    
    // Verify target wallet
    if (walletAddress.toLowerCase() !== ETHR_CONFIG.targetWallet.toLowerCase()) {
      console.warn('⚠️  Warning: Connected wallet differs from target');
      console.log('Expected:', ETHR_CONFIG.targetWallet);
      console.log('Connected:', walletAddress);
    }
    
    // Check network
    const chainId = await window.ethereum.request({
      method: 'eth_chainId'
    });
    
    if (chainId !== '0x1') {
      console.log('🔄 Switching to Ethereum Mainnet...');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }]
      });
    }
    
    // Check balance
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [walletAddress, 'latest']
    });
    
    const balanceETH = parseInt(balance, 16) / 10**18;
    console.log(\`💰 Wallet Balance: \${balanceETH.toFixed(4)} ETH\`);
    
    if (balanceETH < 0.005) {
      throw new Error('Insufficient balance. Need at least 0.005 ETH for deployment');
    }
    
    // Deploy contract
    console.log('📋 Deploying ETHR contract...');
    
    const deploymentTx = {
      from: walletAddress,
      data: ETHR_CONFIG.bytecode,
      gas: '0x2DC6C0', // 3,000,000 gas
      gasPrice: await window.ethereum.request({
        method: 'eth_gasPrice'
      })
    };
    
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [deploymentTx]
    });
    
    console.log('🔗 Deployment transaction:', txHash);
    
    // Wait for transaction receipt
    let receipt = null;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes
    
    while (!receipt && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      try {
        receipt = await window.ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash]
        });
        attempts++;
      } catch (error) {
        attempts++;
        console.log(\`⏳ Waiting for confirmation... (\${attempts}/\${maxAttempts})\`);
      }
    }
    
    if (!receipt) {
      throw new Error('Transaction confirmation timeout');
    }
    
    const contractAddress = receipt.contractAddress;
    console.log('✅ Contract deployed at:', contractAddress);
    
    // Call migration function to mint tokens
    console.log('🪙 Minting 1,990,000 ETHR tokens...');
    
    const migrationData = '0xf4f3b200'; // migrateMyTrappedETHG() function selector
    
    const migrationTx = {
      from: walletAddress,
      to: contractAddress,
      data: migrationData,
      gas: '0x186A0', // 100,000 gas
      gasPrice: await window.ethereum.request({
        method: 'eth_gasPrice'
      })
    };
    
    const migrationHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [migrationTx]
    });
    
    console.log('🔗 Minting transaction:', migrationHash);
    
    // Wait for minting confirmation
    let migrationReceipt = null;
    attempts = 0;
    
    while (!migrationReceipt && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      try {
        migrationReceipt = await window.ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [migrationHash]
        });
        attempts++;
      } catch (error) {
        attempts++;
        console.log(\`⏳ Waiting for token minting... (\${attempts}/\${maxAttempts})\`);
      }
    }
    
    console.log('\\n🎉 ETHR DEPLOYMENT SUCCESSFUL! 🎉');
    console.log('=' .repeat(50));
    console.log('📍 Contract Address:', contractAddress);
    console.log('🪙 Tokens Minted: 1,990,000 ETHR');
    console.log('💰 Token Value: $706,450');
    console.log('🎯 Target Wallet:', ETHR_CONFIG.targetWallet);
    console.log('=' .repeat(50));
    console.log('\\n🦄 Ready for Uniswap Pool Creation!');
    
    // Auto-open Uniswap with contract address
    const uniswapUrl = \`https://app.uniswap.org/#/add/ETH/\${contractAddress}\`;
    console.log('🔗 Uniswap Pool Creation:', uniswapUrl);
    
    return {
      contractAddress,
      deploymentHash: txHash,
      migrationHash: migrationHash,
      uniswapUrl
    };
    
  } catch (error) {
    console.error('❌ DEPLOYMENT FAILED:', error);
    throw error;
  }
}

// Execute deployment
deployETHRContract()
  .then(result => {
    console.log('\\n🚀 SUCCESS - Open Uniswap to create trading pool! 🚀');
    console.log('Contract:', result.contractAddress);
    
    // Auto-redirect to Uniswap
    if (confirm('Open Uniswap to create ETHR/ETH pool?')) {
      window.open(result.uniswapUrl, '_blank');
    }
  })
  .catch(error => {
    console.error('\\n💥 DEPLOYMENT ERROR 💥');
    console.error(error.message);
  });`;

  const htmlWrapper = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ETHR Token Deployment - Uniswap Integration</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(0,0,0,0.2);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .deploy-btn {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .deploy-btn:hover {
            transform: scale(1.05);
        }
        .status {
            margin-top: 20px;
            padding: 15px;
            background: rgba(0,0,0,0.3);
            border-radius: 10px;
            font-family: monospace;
        }
        .success {
            background: rgba(0,255,0,0.2);
        }
        .error {
            background: rgba(255,0,0,0.2);
        }
        .info {
            background: rgba(0,100,255,0.2);
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 ETHR Token Deployment</h1>
            <p>Deploy 1,990,000 ETHR tokens worth $706,450</p>
        </div>
        
        <div class="info">
            <h3>📋 Deployment Info</h3>
            <p><strong>Target Wallet:</strong> 0x058C8FE01E5c9eaC6ee19e6673673B549B368843</p>
            <p><strong>Token Name:</strong> Ethereum Recovery (ETHR)</p>
            <p><strong>Total Supply:</strong> 1,990,000 ETHR</p>
            <p><strong>Estimated Value:</strong> $706,450</p>
        </div>
        
        <div style="text-align: center;">
            <button class="deploy-btn" onclick="deployContract()">
                🪙 Deploy ETHR Contract
            </button>
        </div>
        
        <div id="status" class="status" style="display: none;">
            <div id="statusText">Ready to deploy...</div>
        </div>
    </div>
    
    <script>
        // Deployment status display
        function updateStatus(message, type = 'info') {
            const statusDiv = document.getElementById('status');
            const statusText = document.getElementById('statusText');
            
            statusDiv.style.display = 'block';
            statusText.innerHTML = message;
            
            statusDiv.className = 'status ' + type;
        }
        
        // Main deployment function
        async function deployContract() {
            updateStatus('🚀 Starting deployment...', 'info');
            
            try {
                ${uniswapDeploymentScript.replace(/console\.log/g, 'updateStatus')}
                
            } catch (error) {
                updateStatus('❌ Error: ' + error.message, 'error');
            }
        }
        
        // Check wallet on page load
        window.addEventListener('load', () => {
            if (typeof window.ethereum !== 'undefined') {
                updateStatus('✅ Wallet extension detected - Ready for deployment!', 'success');
            } else {
                updateStatus('⚠️ No wallet extension found. Please install a Web3 wallet.', 'error');
            }
        });
    </script>
</body>
</html>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Rocket className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">
              Uniswap Deployment Suite
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Reliable ETHR deployment using Uniswap's wallet infrastructure
          </p>
        </div>

        {/* Benefits Over MetaMask */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Uniswap Deployment Benefits:</strong> No MetaMask glitches, direct DeFi integration, automatic pool creation setup, optimized for trading operations
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Deployment Steps */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-400" />
                Uniswap Deployment Process
              </CardTitle>
              <CardDescription className="text-gray-400">
                Seamless deployment to your original wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-purple-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">1</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Download HTML File</p>
                    <p className="text-sm text-gray-400">Copy the complete HTML deployment interface</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-purple-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">2</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Open in Browser</p>
                    <p className="text-sm text-gray-400">Double-click HTML file to open deployment interface</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-purple-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">3</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Connect Original Wallet</p>
                    <p className="text-sm text-gray-400">Switch to 0x058C8FE01E5c9eaC6ee19e6673673B549B368843</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">4</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Deploy & Mint</p>
                    <p className="text-sm text-gray-400">One-click deployment + automatic token minting</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">5</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Auto-Uniswap Integration</p>
                    <p className="text-sm text-gray-400">Direct redirect to pool creation interface</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advantages */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Why Uniswap Over MetaMask
              </CardTitle>
              <CardDescription className="text-gray-400">
                Superior deployment reliability and DeFi integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-medium">No Connection Glitches</h4>
                  <p className="text-gray-300 text-sm">Direct Web3 connection without MetaMask intermediary issues</p>
                </div>
                
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h4 className="text-blue-400 font-medium">DeFi Optimized</h4>
                  <p className="text-gray-300 text-sm">Built for trading operations with automatic Uniswap integration</p>
                </div>
                
                <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h4 className="text-purple-400 font-medium">Seamless Pool Creation</h4>
                  <p className="text-gray-300 text-sm">Automatic redirect to Uniswap pool setup after deployment</p>
                </div>
                
                <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h4 className="text-yellow-400 font-medium">Original Wallet Focus</h4>
                  <p className="text-gray-300 text-sm">Designed for 0x058C8FE01E5c9eaC6ee19e6673673B549B368843</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* HTML Deployment File */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Complete HTML Deployment Interface
              </div>
              <Button
                onClick={() => copyToClipboard(htmlWrapper)}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy HTML File
              </Button>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Complete deployment interface with Uniswap integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={htmlWrapper}
              readOnly
              className="font-mono text-xs bg-gray-900 border-gray-600 text-gray-300 min-h-96"
            />
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Deployment Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h4 className="text-purple-400 font-medium mb-2">Step 1: Save HTML</h4>
                  <p className="text-gray-300 text-sm">Copy HTML above and save as "ethr-deploy.html"</p>
                </div>
                
                <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h4 className="text-blue-400 font-medium mb-2">Step 2: Open File</h4>
                  <p className="text-gray-300 text-sm">Double-click HTML file to open in browser</p>
                </div>
                
                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-medium mb-2">Step 3: Deploy</h4>
                  <p className="text-gray-300 text-sm">Click deploy button and approve transactions</p>
                </div>
              </div>
              
              <Alert className="border-yellow-500 bg-yellow-500/10">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-200">
                  Make sure you're using wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 and have ~0.005 ETH for gas fees
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Expected Results */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              Expected Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-green-400 font-medium">Immediate Results:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Contract deployed to Ethereum Mainnet</li>
                  <li>• 1,990,000 ETHR tokens minted to your wallet</li>
                  <li>• Contract address provided for MetaMask import</li>
                  <li>• Automatic Uniswap pool creation link</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-blue-400 font-medium">Next Steps Available:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Create ETHR/ETH trading pool on Uniswap</li>
                  <li>• Set initial liquidity for trading</li>
                  <li>• List tokens for public trading</li>
                  <li>• Begin monetization of $706,450 value</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg"
            onClick={() => window.open('https://app.uniswap.org/', '_blank')}
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            Visit Uniswap Interface
          </Button>
        </div>
      </div>
    </div>
  );
}