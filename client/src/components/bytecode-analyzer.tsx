import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Search, 
  FileText,
  ExternalLink,
  Copy,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FunctionSelector {
  selector: string;
  signature?: string;
  description?: string;
}

interface BytecodeAnalysis {
  totalOpcodes: number;
  functionSelectors: FunctionSelector[];
  isProxy: boolean;
  hasConstructor: boolean;
  complexity: 'Low' | 'Medium' | 'High';
  patterns: string[];
}

export function BytecodeAnalyzer() {
  const [bytecode, setBytecode] = useState(`PUSH1 0x80
PUSH1 0x40
MSTORE
PUSH1 0x04
CALLDATASIZE
LT
PUSH2 0x004e
JUMPI
PUSH1 0x00
CALLDATALOAD
PUSH1 0xe0
SHR
DUP1
PUSH4 0x3659cfe6
EQ
PUSH2 0x0067
JUMPI
DUP1
PUSH4 0x4f1ef286
EQ
PUSH2 0x0090
JUMPI`);
  const [analysis, setAnalysis] = useState<BytecodeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const knownSelectors: Record<string, string> = {
    '0x3659cfe6': 'upgradeTo(address)',
    '0x4f1ef286': 'upgradeToAndCall(address,bytes)',
    '0x8f283970': 'changeAdmin(address)',
    '0xba8c65ae': 'admin()',
    '0xf851a440': 'implementation()',
    '0x5c60da1b': 'implementation()',
    '0xa4135818': 'isImplementation()',
    '0x06fdde03': 'name()',
    '0x95d89b41': 'symbol()',
    '0x18160ddd': 'totalSupply()',
    '0x70a08231': 'balanceOf(address)',
    '0xa9059cbb': 'transfer(address,uint256)',
    '0x23b872dd': 'transferFrom(address,address,uint256)',
    '0x095ea7b3': 'approve(address,uint256)',
    '0xdd62ed3e': 'allowance(address,address)'
  };

  const analyzeBytecode = () => {
    setIsAnalyzing(true);
    
    try {
      const lines = bytecode.split('\n').filter(line => line.trim());
      const opcodes = lines.map(line => line.trim()).filter(line => line);
      
      // Extract function selectors
      const selectors: FunctionSelector[] = [];
      const selectorPattern = /PUSH4 (0x[a-fA-F0-9]{8})/g;
      let match;
      
      while ((match = selectorPattern.exec(bytecode)) !== null) {
        const selector = match[1];
        const signature = knownSelectors[selector];
        selectors.push({
          selector,
          signature,
          description: signature ? getDescription(signature) : 'Unknown function'
        });
      }

      // Detect patterns
      const patterns: string[] = [];
      if (bytecode.includes('DELEGATECALL')) patterns.push('Proxy Pattern');
      if (bytecode.includes('SSTORE')) patterns.push('State Modification');
      if (bytecode.includes('SELFDESTRUCT')) patterns.push('Self Destruct');
      if (bytecode.includes('CREATE2')) patterns.push('Contract Creation');
      if (selectors.some(s => s.selector === '0x3659cfe6')) patterns.push('Upgradeable Contract');
      if (selectors.some(s => s.selector === '0xa9059cbb')) patterns.push('ERC-20 Token');

      // Determine complexity
      let complexity: 'Low' | 'Medium' | 'High' = 'Low';
      if (opcodes.length > 1000) complexity = 'High';
      else if (opcodes.length > 500) complexity = 'Medium';

      // Check if proxy
      const isProxy = patterns.includes('Proxy Pattern') || 
                     selectors.some(s => ['0x3659cfe6', '0x4f1ef286', '0x5c60da1b'].includes(s.selector));

      setAnalysis({
        totalOpcodes: opcodes.length,
        functionSelectors: selectors,
        isProxy,
        hasConstructor: bytecode.includes('CODECOPY'),
        complexity,
        patterns
      });

      toast({
        title: "Analysis Complete",
        description: `Found ${selectors.length} function selectors and ${patterns.length} contract patterns`
      });

    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Failed to analyze bytecode. Please check the format.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getDescription = (signature: string): string => {
    if (signature.includes('upgrade')) return 'Contract upgrade function';
    if (signature.includes('admin')) return 'Administrative function';
    if (signature.includes('implementation')) return 'Proxy implementation getter';
    if (signature.includes('transfer')) return 'Token transfer function';
    if (signature.includes('approve')) return 'Token approval function';
    if (signature.includes('balance')) return 'Balance query function';
    return 'Contract function';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Content copied to clipboard"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Smart Contract Bytecode Analyzer
        </CardTitle>
        <CardDescription>
          Analyze EVM bytecode to identify function selectors, patterns, and contract types
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Bytecode (Assembly or Hex)</label>
          <Textarea
            placeholder="Paste EVM bytecode here..."
            value={bytecode}
            onChange={(e) => setBytecode(e.target.value)}
            className="font-mono text-xs h-32"
          />
          <div className="flex gap-2">
            <Button onClick={analyzeBytecode} disabled={isAnalyzing}>
              {isAnalyzing ? "Analyzing..." : "Analyze Bytecode"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard(bytecode)}
              size="sm"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="functions">Functions</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{analysis.totalOpcodes}</div>
                      <div className="text-xs text-muted-foreground">Opcodes</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{analysis.functionSelectors.length}</div>
                      <div className="text-xs text-muted-foreground">Functions</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <Badge variant={analysis.complexity === 'High' ? 'destructive' : 
                                   analysis.complexity === 'Medium' ? 'default' : 'secondary'}>
                        {analysis.complexity}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">Complexity</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      {analysis.isProxy ? (
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-gray-400 mx-auto" />
                      )}
                      <div className="text-xs text-muted-foreground mt-1">
                        {analysis.isProxy ? 'Proxy' : 'Standard'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="functions" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Function Selectors</h3>
                {analysis.functionSelectors.length > 0 ? (
                  <div className="space-y-2">
                    {analysis.functionSelectors.map((func, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-mono text-sm">{func.selector}</div>
                          <div className="text-sm text-muted-foreground">
                            {func.signature || 'Unknown signature'}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{func.description}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No function selectors found</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Detected Patterns</h3>
                {analysis.patterns.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {analysis.patterns.map((pattern, index) => (
                      <Badge key={index} variant="secondary" className="justify-center p-2">
                        {pattern}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No specific patterns detected</p>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Contract Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Contract Type:</span>
                    <Badge variant={analysis.isProxy ? "default" : "secondary"}>
                      {analysis.isProxy ? "Upgradeable Proxy" : "Standard Contract"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Has Constructor:</span>
                    <Badge variant={analysis.hasConstructor ? "default" : "secondary"}>
                      {analysis.hasConstructor ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Complexity Level:</span>
                    <Badge variant={analysis.complexity === 'High' ? 'destructive' : 
                                   analysis.complexity === 'Medium' ? 'default' : 'secondary'}>
                      {analysis.complexity}
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}