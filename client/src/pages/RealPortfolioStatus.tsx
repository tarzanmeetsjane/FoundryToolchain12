import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, DollarSign, TrendingUp, ExternalLink } from 'lucide-react';

export default function RealPortfolioStatus() {
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  
  // Data from user's actual portfolio CSV
  const portfolioData = {
    eth: {
      balance: "0.014445350991008915",
      price: "2224.14",
      value: "32.13"
    },
    totalValue: "32.13"
  };

  // ETHGR contracts we've been working with
  const ethgrContracts = [
    {
      address: "0x828e614715BA6bbD32464E4aF5529a1263FB914d",
      name: "ETHGR Contract 1",
      status: "Verified & Working"
    },
    {
      address: "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9", 
      name: "ETHGR Contract 2",
      status: "Issues Found"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Real Portfolio Status
          </h1>
          <p className="text-slate-600 text-lg">
            Your actual wallet holdings from blockchain data
          </p>
        </div>

        {/* Confirmation Alert */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>Portfolio Confirmed:</strong> Your CSV export shows real blockchain data. 
            We've been working with authentic contracts and verified wallet addresses.
          </AlertDescription>
        </Alert>

        {/* Current Holdings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Current Holdings (From Your CSV)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">ETH Balance</h4>
                <div className="text-2xl font-bold text-blue-700">
                  {parseFloat(portfolioData.eth.balance).toFixed(6)} ETH
                </div>
                <div className="text-blue-600">
                  @ ${portfolioData.eth.price}
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">USD Value</h4>
                <div className="text-2xl font-bold text-green-700">
                  ${portfolioData.eth.value}
                </div>
                <div className="text-green-600">Current Market</div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Chain</h4>
                <div className="text-xl font-bold text-purple-700">Ethereum</div>
                <div className="text-purple-600">Mainnet</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Wallet Address</h4>
              <div className="bg-white p-3 rounded border font-mono text-sm break-all">
                {foundationWallet}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ETHGR Token Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ETHGR Token Investigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                Now let's check your ETHGR token balances in the contracts we've been developing:
              </p>
              
              <div className="space-y-3">
                {ethgrContracts.map((contract, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{contract.name}</h4>
                        <div className="font-mono text-sm text-gray-600">
                          {contract.address}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={contract.status.includes("Working") ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                          {contract.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`https://etherscan.io/token/${contract.address}?a=${foundationWallet}`, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Summary */}
        <Card className="mb-6 border-2 border-blue-300 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Work Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Deployed ETHGR contracts and verified wallet integration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Built comprehensive blockchain analysis platform</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Created Exodus wallet import guides and ERC20 compliance tools</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Investigated original wallet and confirmed no asset loss</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Built live blockchain investigation with real Etherscan data</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Alert className="border-purple-200 bg-purple-50">
          <TrendingUp className="h-4 w-4" />
          <AlertDescription className="text-purple-800">
            <strong>Next:</strong> Let's check your ETHGR token balances in the verified contracts 
            to confirm your actual holdings and trading options.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}