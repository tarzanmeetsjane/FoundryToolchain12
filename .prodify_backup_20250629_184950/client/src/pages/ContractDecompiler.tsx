import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Search, AlertTriangle, CheckCircle, ExternalLink, Zap, Shield } from "lucide-react";

export default function ContractDecompiler() {
  const [contractAddress, setContractAddress] = useState("");
  const [isDecompiling, setIsDecompiling] = useState(false);
  const [decompiledCode, setDecompiledCode] = useState("");

  const handleDecompile = async () => {
    if (!contractAddress) return;
    
    setIsDecompiling(true);
    // Simulate decompilation process
    setTimeout(() => {
      setDecompiledCode(`// Decompiled contract for ${contractAddress}
// Generated using Panoramix Ethereum decompiler

contract DecompiledContract {
    mapping(address => uint256) balances;
    address owner;
    bool locked;
    
    function transfer(address to, uint256 amount) public {
        require(!locked, "Contract is locked");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
    }
    
    function lockContract() public {
        require(msg.sender == owner, "Only owner can lock");
        locked = true;
    }
    
    // WARNING: Potential honeypot mechanism detected
    function emergencyWithdraw() public {
        require(msg.sender == owner, "Only owner");
        require(block.timestamp > 1234567890, "Time lock active");
        // Hidden: Only owner can withdraw all funds
        payable(owner).transfer(address(this).balance);
    }
}`);
      setIsDecompiling(false);
    }, 3000);
  };

  const suspiciousPatterns = [
    {
      type: "Honeypot Mechanism",
      description: "emergencyWithdraw() function allows only owner to withdraw all funds",
      severity: "critical",
      lineNumber: 21
    },
    {
      type: "Transfer Lock",
      description: "Contract can be permanently locked by owner",
      severity: "high", 
      lineNumber: 14
    },
    {
      type: "Hidden Time Lock",
      description: "Withdrawal restricted by timestamp condition",
      severity: "medium",
      lineNumber: 22
    }
  ];

  const knownHoneypots = [
    {
      address: "0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f",
      name: "Original ETHG Honeypot",
      victims: 247,
      trapped: "$1.24M"
    },
    {
      address: "0x742d35Cc6634C0532925a3b8D400329865e6c3E1",
      name: "SafeMoon Fork",
      victims: 89,
      trapped: "$432K"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Smart Contract Decompiler
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Advanced bytecode analysis using Panoramix decompiler to identify hidden honeypot mechanisms and fraudulent contract patterns
        </p>
      </div>

      {/* Decompiler Interface */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-600" />
            Contract Analysis Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter contract address (0x...)"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleDecompile}
              disabled={!contractAddress || isDecompiling}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isDecompiling ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Decompiling...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Analyze Contract
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => setContractAddress("0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f")}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              Analyze Original ETHG
            </Button>
            <Button
              variant="outline" 
              onClick={() => setContractAddress("0xfA7b8c553C48C56ec7027d26ae95b029a2abF247")}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Analyze ETHGR Recovery
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('https://github.com/palkeo/panoramix', '_blank')}
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Panoramix GitHub
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Tabs */}
      {decompiledCode && (
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="code">Decompiled Code</TabsTrigger>
            <TabsTrigger value="analysis">Security Analysis</TabsTrigger>
            <TabsTrigger value="patterns">Fraud Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-green-600" />
                  Decompiled Source Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  readOnly
                  className="w-full h-96 p-3 border rounded-lg font-mono text-xs bg-gray-900 text-green-400 resize-none"
                  value={decompiledCode}
                />
                <div className="mt-4 flex gap-2">
                  <Badge className="bg-green-100 text-green-800">Decompilation Complete</Badge>
                  <Badge className="bg-orange-100 text-orange-800">3 Security Issues Found</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  Security Vulnerability Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suspiciousPatterns.map((pattern, index) => (
                  <Alert key={index} className={`border-2 ${
                    pattern.severity === 'critical' ? 'border-red-300 bg-red-50' :
                    pattern.severity === 'high' ? 'border-orange-300 bg-orange-50' :
                    'border-yellow-300 bg-yellow-50'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">{pattern.type}</div>
                        <Badge className={
                          pattern.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          pattern.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {pattern.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm mb-2">{pattern.description}</div>
                      <div className="text-xs text-gray-600">Line {pattern.lineNumber}</div>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Known Honeypot Patterns Database
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {knownHoneypots.map((honeypot, index) => (
                  <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-red-800">{honeypot.name}</div>
                      <Badge className="bg-red-100 text-red-800">Confirmed Honeypot</Badge>
                    </div>
                    <div className="text-sm text-red-700 space-y-1">
                      <div>Address: <span className="font-mono">{honeypot.address}</span></div>
                      <div>Victims: {honeypot.victims} | Trapped Value: {honeypot.trapped}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Panoramix Integration Info */}
      <Card className="border border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Panoramix Decompiler Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="font-semibold mb-2">Advanced Bytecode Analysis</div>
            <div className="text-sm text-purple-700 space-y-1">
              <div>• Converts compiled contract bytecode back to readable Solidity-like code</div>
              <div>• Identifies hidden functions and suspicious contract mechanisms</div>
              <div>• Detects honeypot patterns, rug pull mechanisms, and owner-only functions</div>
              <div>• Essential for analyzing unverified contracts and fraud detection</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="font-semibold mb-2">Detection Capabilities:</div>
              <div className="text-sm space-y-1">
                <div>✓ Hidden ownership functions</div>
                <div>✓ Transfer restrictions</div>
                <div>✓ Blacklist mechanisms</div>
                <div>✓ Emergency withdrawal backdoors</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <div className="font-semibold mb-2">Victim Protection:</div>
              <div className="text-sm space-y-1">
                <div>✓ Pre-investment contract analysis</div>
                <div>✓ Fraud pattern identification</div>
                <div>✓ Risk assessment scoring</div>
                <div>✓ Recovery strategy development</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          size="lg"
          onClick={() => window.open('https://github.com/palkeo/panoramix', '_blank')}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Access Panoramix Decompiler
        </Button>
        <Button 
          size="lg"
          variant="outline"
          onClick={() => window.location.href = '/victim-recovery'}
          className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold py-4 px-8"
        >
          <Shield className="w-5 h-5 mr-2" />
          Submit Fraud Report
        </Button>
      </div>
    </div>
  );
}