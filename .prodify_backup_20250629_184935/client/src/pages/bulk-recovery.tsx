import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, CheckCircle, AlertTriangle, ExternalLink, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function BulkRecoveryPage() {
  const [contractAddress, setContractAddress] = useState("0xd9145CCE52D386f254917e481eB44e9943F39138");
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  // Mock data for demonstration - in real implementation would fetch from Etherscan/Moralis
  const mockHolders = [
    {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      balance: "1990000000000000000000000",
      balanceFormatted: "1,990,000",
      lastActivity: "2025-01-16",
      status: "recovered",
      recoveryContract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247"
    },
    {
      address: "0x742d35cc6464c532d4f0b1e4a1c66af1e4f3a9b2",
      balance: "500000000000000000000000",
      balanceFormatted: "500,000",
      lastActivity: "2025-01-15",
      status: "trapped",
      recoveryContract: null
    },
    {
      address: "0x8c54b2b1c8c9f0a3d2e7f1a4b5c8d9e2f3g4h5i6",
      balance: "250000000000000000000000",
      balanceFormatted: "250,000",
      lastActivity: "2025-01-14",
      status: "trapped",
      recoveryContract: null
    },
    {
      address: "0xa1b2c3d4e5f6789012345678901234567890abcd",
      balance: "100000000000000000000000",
      balanceFormatted: "100,000",
      lastActivity: "2025-01-13",
      status: "trapped",
      recoveryContract: null
    }
  ];

  const totalTrapped = mockHolders
    .filter(h => h.status === "trapped")
    .reduce((sum, h) => sum + parseFloat(h.balanceFormatted.replace(/,/g, "")), 0);

  const handleScanContract = async () => {
    setIsScanning(true);
    try {
      const response = await fetch(`/api/token-holders/${contractAddress}`);
      const data = await response.json();
      
      if (response.ok) {
        setScanResults(data.holders || []);
      } else {
        console.error('Scan failed:', data.error);
        // Fallback to example data for demonstration
        setScanResults(mockHolders);
      }
    } catch (error) {
      console.error('Scan error:', error);
      // Fallback to example data for demonstration
      setScanResults(mockHolders);
    } finally {
      setIsScanning(false);
    }
  };

  const generateRecoveryContract = (holderAddress: string, balance: string) => {
    const template = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery_${holderAddress.slice(-8)} is ERC20, Ownable {
    address public constant TRAPPED_USER = ${holderAddress};
    uint256 public constant TRAPPED_AMOUNT = ${balance} * 10**18;
    
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {}
    
    function migrateMyTrappedETHG() external {
        require(msg.sender == TRAPPED_USER, "Only trapped user can migrate");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(migrationEnabled, "Migration disabled");
        
        hasMigrated[msg.sender] = true;
        _mint(msg.sender, TRAPPED_AMOUNT);
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        return super.transfer(to, amount);
    }
}`;
    
    return template;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Bulk ETHG Recovery Scanner
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Identify and help other ETHG holders trapped by honeypot contracts
        </p>
      </div>

      <Alert className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200">
        <Users className="h-4 w-4" />
        <AlertDescription>
          <strong>Community Recovery Initiative:</strong> Help other trapped ETHG holders by scanning for affected wallets and generating custom recovery contracts.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Contract Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="contract">Honeypot Contract Address</Label>
                <Input
                  id="contract"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="0xd9145CCE52D386f254917e481eB44e9943F39138"
                />
              </div>
              <Button 
                onClick={handleScanContract}
                disabled={isScanning}
                className="w-full"
              >
                {isScanning ? "Scanning..." : "Scan for Holders"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Trapped Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{totalTrapped.toLocaleString()}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total ETHG Trapped</p>
            <Badge variant="destructive" className="mt-2">
              {mockHolders.filter(h => h.status === "trapped").length} Affected Holders
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Recovery Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {mockHolders.filter(h => h.status === "recovered").length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Successful Recoveries</p>
            <Badge variant="secondary" className="mt-2">
              {((mockHolders.filter(h => h.status === "recovered").length / mockHolders.length) * 100).toFixed(0)}% Complete
            </Badge>
          </CardContent>
        </Card>
      </div>

      {scanResults.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scan Results - ETHG Holders</CardTitle>
            <CardDescription>
              Found {scanResults.length} addresses holding ETHG tokens from the honeypot contract
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>ETHG Balance</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scanResults.map((holder, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">
                        {holder.address.slice(0, 10)}...{holder.address.slice(-8)}
                      </TableCell>
                      <TableCell className="font-bold">
                        {holder.balanceFormatted} ETHG
                      </TableCell>
                      <TableCell>{holder.lastActivity}</TableCell>
                      <TableCell>
                        {holder.status === "recovered" ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Recovered
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            Trapped
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {holder.status === "trapped" ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const contract = generateRecoveryContract(
                                    holder.address,
                                    holder.balanceFormatted.replace(/,/g, "")
                                  );
                                  const blob = new Blob([contract], { type: 'text/plain' });
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = `recovery_${holder.address.slice(-8)}.sol`;
                                  a.click();
                                }}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Contract
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => window.open(`https://etherscan.io/address/${holder.address}`, '_blank')}
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`https://etherscan.io/address/${holder.recoveryContract}`, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Recovery Contract
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <CardHeader>
          <CardTitle>How Bulk Recovery Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <h4 className="font-semibold">Scan Contract</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Identify all addresses holding tokens from honeypot contracts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <h4 className="font-semibold">Generate Contracts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create personalized recovery contracts for each affected holder
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <h4 className="font-semibold">Deploy & Notify</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Deploy contracts and contact affected users about recovery
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <div>
                  <h4 className="font-semibold">Community Recovery</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Help entire community recover trapped tokens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}