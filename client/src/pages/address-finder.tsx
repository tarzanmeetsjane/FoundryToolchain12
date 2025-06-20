import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search,
  FileText,
  AlertTriangle,
  CheckCircle,
  Copy,
  ExternalLink,
  Zap
} from "lucide-react";

export default function AddressFinder() {
  const [searchText, setSearchText] = useState("");
  const [foundAddresses, setFoundAddresses] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchForAddresses = () => {
    setIsSearching(true);
    
    // Extract Ethereum addresses from text
    const addressRegex = /0x[a-fA-F0-9]{40}/g;
    const found = searchText.match(addressRegex) || [];
    
    setFoundAddresses([...new Set(found)]); // Remove duplicates
    setIsSearching(false);
  };

  const checkAddress = async (address: string) => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    alert(`Copied: ${address}`);
  };

  const knownAddresses = [
    {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      name: "Your Main Wallet",
      status: "Active",
      balance: "~$35"
    },
    {
      address: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247", 
      name: "ETHGR Recovery Contract",
      status: "Deployed",
      balance: "0 ETH"
    },
    {
      address: "0xd9145CCE52D386f254917e481eB44e9943F39138",
      name: "Original ETHG (Honeypot)",
      status: "Malicious",
      balance: "Unknown"
    },
    {
      address: "0x742d35cc6464c532d4f0b1e4a1c66af1e4f3a9b2",
      name: "Recovery Template e4f3a9b2",
      status: "Template",
      balance: "0 ETH"
    }
  ];

  const possibleSources = [
    "MetaMask transaction history from June 15",
    "Browser history showing Etherscan links",
    "Screenshots of transaction confirmations",
    "Email receipts from MetaMask or wallet apps",
    "Text files with transaction hashes",
    "Remix IDE deployment logs",
    "Discord/Telegram chat logs with contract addresses",
    "Any documents mentioning 0xd914..."
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Contract Address Finder</h1>
        <p className="text-muted-foreground">
          Search through text, files, and transaction history to find the missing 0xd914... contract
        </p>
      </div>

      <Alert className="border-orange-500 bg-orange-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>TARGET:</strong> Looking for the complete contract address starting with 0xd914 
          from your June 15 transactions. This contract may contain the missing 37 ETH.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Text Address Extractor
          </CardTitle>
          <CardDescription>
            Paste any text containing Ethereum addresses to extract them automatically
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search-text">Paste Text Here</Label>
            <Textarea
              id="search-text"
              placeholder="Paste transaction receipts, MetaMask history, Etherscan pages, or any text containing Ethereum addresses..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              rows={8}
            />
          </div>

          <Button 
            onClick={searchForAddresses}
            disabled={!searchText || isSearching}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Search className="h-4 w-4 mr-1" />
            {isSearching ? "Searching..." : "Extract Ethereum Addresses"}
          </Button>

          {foundAddresses.length > 0 && (
            <div className="space-y-3">
              <div className="font-bold text-green-600">Found Addresses:</div>
              {foundAddresses.map((address, index) => (
                <div key={index} className="p-3 border rounded-lg bg-green-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-mono text-sm break-all">{address}</div>
                      {address.toLowerCase().startsWith('0xd914') && (
                        <div className="text-xs text-red-600 font-bold">
                          🎯 POTENTIAL MATCH - This could be the 37 ETH contract!
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => copyAddress(address)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => checkAddress(address)}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Known Addresses Summary
          </CardTitle>
          <CardDescription>
            All identified contract addresses from your recovery operation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {knownAddresses.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="font-mono text-xs text-muted-foreground break-all">
                    {item.address}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{item.balance}</div>
                  <div className="text-xs text-muted-foreground">{item.status}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => copyAddress(item.address)}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button size="sm" onClick={() => checkAddress(item.address)}>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Etherscan
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Where to Look for 0xd914... Address</CardTitle>
          <CardDescription>
            Suggested places to find the complete contract address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {possibleSources.map((source, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <div className="text-sm">{source}</div>
                </div>
              </div>
            ))}
          </div>

          <Alert className="mt-4 border-green-500 bg-green-50">
            <Zap className="h-4 w-4" />
            <AlertDescription>
              <strong>PRIORITY ACTION:</strong> Check your MetaMask transaction history for June 15. 
              Click on any transaction involving a contract starting with 0xd914 and copy the complete address.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual Address Entry</CardTitle>
          <CardDescription>
            If you find the complete address, enter it here for immediate analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="manual-address">Complete Contract Address</Label>
            <Input
              id="manual-address"
              placeholder="0xd914... (paste complete 42-character address)"
              className="font-mono"
            />
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <Zap className="h-4 w-4 mr-1" />
            Analyze for 37 ETH Recovery
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}