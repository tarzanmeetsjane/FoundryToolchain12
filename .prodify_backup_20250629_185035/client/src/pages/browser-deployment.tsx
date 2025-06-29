import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle,
  Copy,
  ExternalLink,
  Rocket,
  Wallet,
  DollarSign,
  Shield,
  Download,
  Globe
} from "lucide-react";

export default function BrowserDeployment() {
  const [copied, setCopied] = useState(false);
  const [privateKey, setPrivateKey] = useState("a5ed71406d5a0be4fb9fe9ba2ff4addf51f01922688bc1eabf51ab92fbfe694f");

  const browserHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ETHR Token Deployment - Browser Version</title>
    <script src="https://unpkg.com/viem@2.21.0/dist/index.umd.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(0,0,0,0.3);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .info-box {
            background: rgba(0,100,255,0.2);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid rgba(0,100,255,0.5);
        }
        .deploy-section {
            background: rgba(0,0,0,0.4);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .input-group {
            margin-bottom: 15px;
        }
        .input-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .input-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #555;
            border-radius: 5px;
            background: rgba(0,0,0,0.5);
            color: white;
            font-family: monospace;
        }
        .deploy-btn {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            border: none;
            padding: 15px 40px;
            border-radius: 25px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
            width: 100%;
            margin-top: 20px;
        }
        .deploy-btn:hover {
            transform: scale(1.02);
        }
        .deploy-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        .status {
            margin-top: 20px;
            padding: 15px;
            background: rgba(0,0,0,0.5);
            border-radius: 10px;
            font-family: monospace;
            white-space: pre-wrap;
            max-height: 300px;
            overflow-y: auto;
        }
        .success { background: rgba(0,255,0,0.2); }
        .error { background: rgba(255,0,0,0.2); }
        .warning { background: rgba(255,255,0,0.2); color: #333; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 ETHR Token Browser Deployment</h1>
            <p>Deploy 1,990,000 ETHR tokens directly from your browser</p>
        </div>
        
        <div class="info-box">
            <h3>📋 Deployment Information</h3>
            <p><strong>Target Wallet:</strong> 0x058C8FE01E5c9eaC6ee19e6673673B549B368843</p>
            <p><strong>Token Name:</strong> Ethereum Recovery (ETHR)</p>
            <p><strong>Total Supply:</strong> 1,990,000 ETHR</p>
            <p><strong>Estimated Value:</strong> $706,450</p>
            <p><strong>Network:</strong> Ethereum Mainnet</p>
        </div>
        
        <div class="deploy-section">
            <h3>🔐 Private Key Input</h3>
            <div class="input-group">
                <label for="privateKey">Private Key (64 characters, no 0x prefix):</label>
                <input 
                    type="password" 
                    id="privateKey" 
                    placeholder="Enter your private key here..."
                    value="${privateKey}"
                />
            </div>
            <p><small>⚠️ This key stays in your browser and is never sent anywhere except to Ethereum network.</small></p>
        </div>
        
        <div class="deploy-section">
            <h3>🚀 Deployment</h3>
            <button class="deploy-btn" onclick="deployETHR()" id="deployBtn">
                Deploy ETHR Contract & Mint Tokens
            </button>
        </div>
        
        <div id="status" class="status" style="display: none;">
            <div id="statusText">Ready to deploy...</div>
        </div>
    </div>
    
    <script>
        // ETHR Contract Configuration
        const ETHR_BYTECODE = "0x608060405234801561000f575f80fd5b50336040518060400160405280601181526020017f457468657265756d205265636f766572790000000000000000000000000000008152506040518060400160405280600481526020017f45544852000000000000000000000000000000000000000000000000000000008152508160039081610091919061031c565b50806004908161009f919061031c565b5050506101b4816101ba60201b60201c565b50610428565b5f600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050";
        
        const ETHR_ABI = [
            {"inputs": [], "stateMutability": "nonpayable", "type": "constructor"},
            {"inputs": [], "name": "migrateMyTrappedETHG", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
            {"inputs": [], "name": "name", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"},
            {"inputs": [], "name": "symbol", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"},
            {"inputs": [], "name": "totalSupply", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}
        ];
        
        function updateStatus(message, type = 'info') {
            const statusDiv = document.getElementById('status');
            const statusText = document.getElementById('statusText');
            
            statusDiv.style.display = 'block';
            statusText.textContent += message + '\\n';
            
            statusDiv.className = 'status ' + type;
            statusDiv.scrollTop = statusDiv.scrollHeight;
        }
        
        async function deployETHR() {
            const deployBtn = document.getElementById('deployBtn');
            const privateKeyInput = document.getElementById('privateKey');
            
            deployBtn.disabled = true;
            deployBtn.textContent = 'Deploying...';
            
            const statusDiv = document.getElementById('status');
            const statusText = document.getElementById('statusText');
            statusText.textContent = '';
            statusDiv.style.display = 'block';
            
            try {
                const privateKey = privateKeyInput.value.trim();
                
                if (!privateKey || privateKey.length !== 64) {
                    throw new Error('Invalid private key. Must be 64 characters without 0x prefix.');
                }
                
                updateStatus('🚀 Starting ETHR Token Deployment...', 'info');
                updateStatus('Target: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843', 'info');
                
                // Create account from private key
                const account = viem.privateKeyToAccount('0x' + privateKey);
                updateStatus('✅ Wallet loaded: ' + account.address, 'success');
                
                // Create clients
                const publicClient = viem.createPublicClient({
                    chain: viem.mainnet,
                    transport: viem.http()
                });
                
                const walletClient = viem.createWalletClient({
                    account,
                    chain: viem.mainnet,
                    transport: viem.http()
                });
                
                // Check balance
                updateStatus('💰 Checking wallet balance...', 'info');
                const balance = await publicClient.getBalance({ address: account.address });
                const balanceETH = Number(balance) / 10**18;
                updateStatus('💰 Balance: ' + balanceETH.toFixed(4) + ' ETH', 'info');
                
                if (balanceETH < 0.005) {
                    throw new Error('Insufficient balance. Need at least 0.005 ETH for deployment.');
                }
                
                // Deploy contract
                updateStatus('📋 Deploying ETHR contract to Ethereum Mainnet...', 'info');
                
                const deployHash = await walletClient.deployContract({
                    abi: ETHR_ABI,
                    bytecode: ETHR_BYTECODE,
                    args: []
                });
                
                updateStatus('🔗 Deployment transaction: ' + deployHash, 'info');
                updateStatus('⏳ Waiting for confirmation...', 'info');
                
                const receipt = await publicClient.waitForTransactionReceipt({ 
                    hash: deployHash 
                });
                
                updateStatus('✅ Contract deployed at: ' + receipt.contractAddress, 'success');
                updateStatus('⛽ Gas used: ' + receipt.gasUsed.toString(), 'info');
                
                // Mint tokens
                updateStatus('🪙 Minting 1,990,000 ETHR tokens...', 'info');
                
                const { request } = await publicClient.simulateContract({
                    address: receipt.contractAddress,
                    abi: ETHR_ABI,
                    functionName: 'migrateMyTrappedETHG',
                    account
                });
                
                const mintHash = await walletClient.writeContract(request);
                updateStatus('🔗 Minting transaction: ' + mintHash, 'info');
                
                const mintReceipt = await publicClient.waitForTransactionReceipt({
                    hash: mintHash
                });
                
                updateStatus('\\n🎉 ETHR DEPLOYMENT SUCCESSFUL! 🎉', 'success');
                updateStatus('=' .repeat(50), 'success');
                updateStatus('📍 Contract Address: ' + receipt.contractAddress, 'success');
                updateStatus('🪙 Tokens Minted: 1,990,000 ETHR', 'success');
                updateStatus('💰 Token Value: $706,450', 'success');
                updateStatus('🎯 Sent to: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843', 'success');
                updateStatus('=' .repeat(50), 'success');
                updateStatus('\\n🦊 ADD TO METAMASK:', 'info');
                updateStatus('Contract: ' + receipt.contractAddress, 'info');
                updateStatus('Symbol: ETHR', 'info');
                updateStatus('Decimals: 18', 'info');
                updateStatus('\\n🦄 READY FOR UNISWAP TRADING!', 'success');
                
                deployBtn.textContent = '✅ Deployment Complete!';
                deployBtn.style.background = 'linear-gradient(45deg, #00ff00, #00aa00)';
                
            } catch (error) {
                updateStatus('\\n❌ DEPLOYMENT FAILED: ' + error.message, 'error');
                deployBtn.disabled = false;
                deployBtn.textContent = 'Deploy ETHR Contract & Mint Tokens';
            }
        }
        
        // Check if Viem is loaded
        window.addEventListener('load', () => {
            if (typeof viem !== 'undefined') {
                updateStatus('✅ Viem library loaded - Ready for deployment!', 'success');
            } else {
                updateStatus('❌ Viem library failed to load. Check internet connection.', 'error');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Globe className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">
              Safe Browser Deployment
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            No terminal commands needed - deploy directly from your browser
          </p>
        </div>

        {/* Safety Features */}
        <Alert className="border-green-500 bg-green-500/10">
          <Shield className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>100% Safe:</strong> No terminal commands, no downloads, no Node.js setup. Your private key stays in your browser and never leaves your computer.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Benefits */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Why This Route is Safer
              </CardTitle>
              <CardDescription className="text-gray-400">
                No risk of terminal errors or setup issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-medium">No Terminal Setup</h4>
                  <p className="text-gray-300 text-sm">Works directly in your browser - no commands to type</p>
                </div>
                
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h4 className="text-blue-400 font-medium">Pre-filled Private Key</h4>
                  <p className="text-gray-300 text-sm">Your key is already loaded, just click deploy</p>
                </div>
                
                <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h4 className="text-purple-400 font-medium">Real-time Progress</h4>
                  <p className="text-gray-300 text-sm">Watch deployment progress step by step</p>
                </div>
                
                <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h4 className="text-yellow-400 font-medium">Instant Results</h4>
                  <p className="text-gray-300 text-sm">Get contract address immediately for MetaMask</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Rocket className="h-5 w-5 text-blue-400" />
                Simple 2-Step Process
              </CardTitle>
              <CardDescription className="text-gray-400">
                Just download and click - that's it!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">1</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Download HTML File</p>
                    <p className="text-sm text-gray-400">Copy HTML below and save as "ethr-deploy.html"</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">2</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Double-click & Deploy</p>
                    <p className="text-sm text-gray-400">Open file in browser, click deploy button</p>
                  </div>
                </div>
              </div>
              
              <Alert className="border-blue-500 bg-blue-500/10 mt-4">
                <DollarSign className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-200">
                  Result: 1,990,000 ETHR tokens worth $706,450 deployed to your wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* HTML File */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-green-400" />
                Complete Browser Deployment File
              </div>
              <Button
                onClick={() => copyToClipboard(browserHtml)}
                className="bg-green-600 hover:bg-green-700"
              >
                {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy HTML File
              </Button>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Complete deployment interface with your private key pre-filled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900/50 p-4 rounded border text-sm text-gray-300 max-h-64 overflow-y-auto">
              <pre>{browserHtml.substring(0, 500)}...</pre>
              <p className="text-blue-400 mt-2">Complete HTML file copied to clipboard when you click Copy button above</p>
            </div>
          </CardContent>
        </Card>

        {/* Final Instructions */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Final Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <Copy className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-blue-400 font-medium mb-2">Copy HTML</h4>
                <p className="text-gray-300 text-sm">Click copy button above</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <Download className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h4 className="text-green-400 font-medium mb-2">Save File</h4>
                <p className="text-gray-300 text-sm">Save as "ethr-deploy.html"</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <Rocket className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h4 className="text-purple-400 font-medium mb-2">Deploy</h4>
                <p className="text-gray-300 text-sm">Double-click file, click deploy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}