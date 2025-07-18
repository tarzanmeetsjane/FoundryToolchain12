
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, ExternalLink, Wallet, Zap, DollarSign } from 'lucide-react';

const BitGetWalletIntegration: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState<string>('');
  const [ethgrBalance, setEthgrBalance] = useState<string>('0');

  // BitGet Wallet connection
  const connectBitGetWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        
        // Check if on Optimism
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId === '0xa') {
          setCurrentNetwork('Optimism');
        } else {
          // Switch to Optimism
          await switchToOptimism();
        }
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  // Switch to Optimism network
  const switchToOptimism = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa' }], // Optimism mainnet
      });
      setCurrentNetwork('Optimism');
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to BitGet
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xa',
                chainName: 'Optimism',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://mainnet.optimism.io'],
                blockExplorerUrls: ['https://optimistic.etherscan.io'],
              },
            ],
          });
          setCurrentNetwork('Optimism');
        } catch (addError) {
          console.error('Failed to add Optimism network:', addError);
        }
      }
    }
  };

  // Add ETHGR token to wallet
  const addETHGRToken = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308', // Your ETHGR contract
            symbol: 'ETHGR',
            decimals: 18,
            image: 'https://via.placeholder.com/64x64.png?text=ETHGR',
          },
        },
      });
    } catch (error) {
      console.error('Failed to add token:', error);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-green-600">BitGet Wallet + Optimism</h1>
        <p className="text-gray-600">Convert ETHGR to ETH with 90% lower fees!</p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <Button onClick={connectBitGetWallet} className="w-full">
              Connect BitGet Wallet
            </Button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Connected to BitGet Wallet</span>
              </div>
              <Badge variant={currentNetwork === 'Optimism' ? 'default' : 'secondary'}>
                Network: {currentNetwork || 'Unknown'}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Network Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Optimism Benefits
          </CardTitle>
          <CardDescription>
            Why BitGet Wallet + Optimism is perfect for your ETHGR conversion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold">90% Lower Fees</h3>
              <p className="text-sm text-gray-600">
                Conversion costs pennies instead of dollars
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold">Instant Transactions</h3>
              <p className="text-sm text-gray-600">
                No more waiting minutes for confirmations
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold">Better Price Recognition</h3>
              <p className="text-sm text-gray-600">
                Faster integration with price tracking services
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Token Setup */}
      <Card>
        <CardHeader>
          <CardTitle>ETHGR Token Setup</CardTitle>
          <CardDescription>
            Add your ETHGR tokens to BitGet Wallet for easy management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={addETHGRToken} variant="outline" className="w-full">
            Add ETHGR Token to Wallet
          </Button>
          
          <Alert>
            <AlertDescription>
              <strong>Contract Address:</strong> 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308
              <br />
              <strong>Symbol:</strong> ETHGR
              <br />
              <strong>Decimals:</strong> 18
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Converter Interface */}
      <Card>
        <CardHeader>
          <CardTitle>ETHGR → ETH Converter</CardTitle>
          <CardDescription>
            Convert your ETHGR tokens directly to ETH with minimal fees
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Ready to Convert!</h3>
            <p className="text-green-700 text-sm mb-3">
              Once the converter contract is deployed, you'll be able to:
            </p>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Convert any amount of ETHGR to ETH instantly</li>
              <li>• Pay only 0.5% conversion fee (vs 3-5% on other platforms)</li>
              <li>• Get slippage protection and price guarantees</li>
              <li>• Use the same security as Ethereum mainnet</li>
            </ul>
          </div>
          
          <Button 
            className="w-full" 
            onClick={() => window.open('https://optimistic.etherscan.io', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Optimism Explorer
          </Button>
        </CardContent>
      </Card>

      {/* Deployment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              <strong>Next Step:</strong> Deploy the converter contract to Optimism using the command below.
              This will enable direct ETHGR → ETH conversion with BitGet Wallet integration.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 p-3 bg-gray-100 rounded-lg font-mono text-sm">
            forge script script/DeployOptimismConverter.s.sol --rpc-url optimism --broadcast --verify
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BitGetWalletIntegration;
