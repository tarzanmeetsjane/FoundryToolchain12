import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, CheckCircle, Info, Zap, Layers, TrendingUp } from 'lucide-react';

export default function ERC1155TokenAnalysis() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const contractAddress = "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9";
  const etherscanUrl = `https://optimistic.etherscan.io/token/${contractAddress}`;

  const erc1155Benefits = [
    {
      title: "Multi-Token Support",
      description: "Single contract manages multiple token types simultaneously",
      icon: <Layers className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Batch Operations", 
      description: "Transfer multiple tokens in one transaction",
      icon: <Zap className="h-5 w-5 text-green-500" />
    },
    {
      title: "Gas Efficiency",
      description: "Lower costs for complex token operations",
      icon: <TrendingUp className="h-5 w-5 text-orange-500" />
    },
    {
      title: "Advanced Metadata",
      description: "Rich token properties and detailed information",
      icon: <Info className="h-5 w-5 text-purple-500" />
    }
  ];

  const tradingImplications = [
    "Batch transfers explain your 120,000+ token movements",
    "Advanced approval mechanisms for DEX interactions",
    "Sophisticated pricing structures possible",
    "Enhanced wallet integration requirements",
    "Multi-token portfolio management capabilities"
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          ERC-1155 Token Analysis
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Advanced Multi-Token Standard Discovery for ETHGR
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2 bg-green-50 border-green-300">
          Contract Type: ERC-1155 Multi-Token
        </Badge>
      </div>

      {/* Contract Information */}
      <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Info className="h-6 w-6 mr-3" />
            ETHGR Contract Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Contract Address:</h3>
              <div className="flex items-center gap-2 p-3 bg-white rounded border">
                <span className="font-mono text-sm flex-1">{contractAddress}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(contractAddress, "address")}
                >
                  {copied === "address" ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Network:</h3>
              <Badge className="bg-red-500 text-white">Optimism</Badge>
              <div className="mt-3">
                <Button
                  onClick={() => window.open(etherscanUrl, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View on Optimism Etherscan
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ERC-1155 Benefits */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-green-700">ERC-1155 Standard Advantages</CardTitle>
          <CardDescription>
            Understanding why your ETHGR tokens use advanced multi-token functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {erc1155Benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                {benefit.icon}
                <div>
                  <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Implications */}
      <Card className="mb-8 border-2 border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800">Trading & Management Implications</CardTitle>
          <CardDescription>
            How ERC-1155 explains your token behavior and capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tradingImplications.map((implication, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{implication}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ERC-1155 vs ERC-20 Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left">Feature</th>
                  <th className="border border-gray-300 p-3 text-left">ERC-20</th>
                  <th className="border border-gray-300 p-3 text-left">ERC-1155 (Your ETHGR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">Token Types</td>
                  <td className="border border-gray-300 p-3">Single token per contract</td>
                  <td className="border border-gray-300 p-3 text-green-600 font-medium">Multiple tokens per contract</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">Batch Operations</td>
                  <td className="border border-gray-300 p-3">Individual transfers only</td>
                  <td className="border border-gray-300 p-3 text-green-600 font-medium">Batch transfers supported</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">Gas Efficiency</td>
                  <td className="border border-gray-300 p-3">Standard</td>
                  <td className="border border-gray-300 p-3 text-green-600 font-medium">Optimized for bulk operations</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">Metadata</td>
                  <td className="border border-gray-300 p-3">Basic token info</td>
                  <td className="border border-gray-300 p-3 text-green-600 font-medium">Rich metadata support</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Impact */}
      <Alert className="border-2 border-green-300 bg-green-50">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Portfolio Impact:</strong> Your 3,980,000 ETHGR tokens benefit from ERC-1155's advanced functionality, 
          explaining the sophisticated trading patterns and wallet integration capabilities you've experienced. 
          This standard enables more efficient token management and enhanced DeFi interactions.
        </AlertDescription>
      </Alert>
    </div>
  );
}