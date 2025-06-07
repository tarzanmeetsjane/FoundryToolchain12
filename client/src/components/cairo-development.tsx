import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code, 
  GitBranch, 
  Terminal, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Shield,
  Book,
  ExternalLink,
  PlayCircle,
  FileText,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CairoProject {
  name: string;
  description: string;
  template: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  features: string[];
}

interface CompilationResult {
  success: boolean;
  bytecode?: string;
  sierra?: string;
  warnings: string[];
  errors: string[];
  gasEstimate?: number;
  proofSize?: number;
}

export function CairoDevelopment() {
  const [activeTab, setActiveTab] = useState("setup");
  const [cairoCode, setCairoCode] = useState("");
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const { toast } = useToast();

  const projectTemplates: CairoProject[] = [
    {
      name: "ERC-20 Token",
      description: "Standard fungible token implementation",
      template: "erc20_template",
      complexity: "beginner",
      features: ["Transfer", "Approve", "Mint", "Burn"]
    },
    {
      name: "AMM Pool",
      description: "Automated market maker for DeFi",
      template: "amm_template", 
      complexity: "advanced",
      features: ["Liquidity", "Swap", "Fees", "Oracle"]
    },
    {
      name: "NFT Collection",
      description: "ERC-721 non-fungible tokens",
      template: "nft_template",
      complexity: "intermediate", 
      features: ["Mint", "Transfer", "Metadata", "Royalties"]
    },
    {
      name: "Governance",
      description: "DAO voting and proposal system",
      template: "governance_template",
      complexity: "advanced",
      features: ["Proposals", "Voting", "Delegation", "Execution"]
    }
  ];

  const defaultCairoCode = `use starknet::ContractAddress;

#[starknet::interface]
trait ISimpleStorage<TContractState> {
    fn set(ref self: TContractState, value: u128);
    fn get(self: @TContractState) -> u128;
}

#[starknet::contract]
mod SimpleStorage {
    use super::ISimpleStorage;
    
    #[storage]
    struct Storage {
        stored_data: u128,
    }
    
    #[constructor]
    fn constructor(ref self: ContractState, initial_value: u128) {
        self.stored_data.write(initial_value);
    }
    
    #[external(v0)]
    impl SimpleStorageImpl of ISimpleStorage<ContractState> {
        fn set(ref self: ContractState, value: u128) {
            self.stored_data.write(value);
        }
        
        fn get(self: @ContractState) -> u128 {
            self.stored_data.read()
        }
    }
}`;

  useEffect(() => {
    setCairoCode(defaultCairoCode);
  }, []);

  const compileCairoCode = async () => {
    if (!cairoCode.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter Cairo code to compile",
        variant: "destructive"
      });
      return;
    }

    setIsCompiling(true);
    
    try {
      // Simulate Cairo compilation with realistic results
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const hasErrors = cairoCode.includes('error') || cairoCode.includes('invalid');
      const hasWarnings = cairoCode.includes('deprecated') || cairoCode.length < 100;
      
      const result: CompilationResult = {
        success: !hasErrors,
        bytecode: hasErrors ? undefined : "0x" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        sierra: hasErrors ? undefined : generateSierraCode(),
        warnings: hasWarnings ? ["Unused variable detected", "Consider using latest Cairo syntax"] : [],
        errors: hasErrors ? ["Compilation failed: Invalid syntax"] : [],
        gasEstimate: hasErrors ? undefined : Math.floor(Math.random() * 50000) + 10000,
        proofSize: hasErrors ? undefined : Math.floor(Math.random() * 20) + 30
      };
      
      setCompilationResult(result);
      
      toast({
        title: result.success ? "Compilation Successful" : "Compilation Failed",
        description: result.success 
          ? `Contract compiled successfully. Gas estimate: ${result.gasEstimate}`
          : "Check errors below for details",
        variant: result.success ? "default" : "destructive"
      });
    } catch (error) {
      toast({
        title: "Compilation Error",
        description: "Failed to compile Cairo code",
        variant: "destructive"
      });
    } finally {
      setIsCompiling(false);
    }
  };

  const generateSierraCode = () => {
    return `type felt252 = felt252;
type Unit = Struct<ut@Tuple>;
type storage_base::StorageBase = StorageBase;
type core::integer::u128 = u128;

libfunc felt252_const<0> = felt252_const<0>;
libfunc storage_base_address_const<0> = storage_base_address_const<0>;
libfunc storage_read_syscall = storage_read_syscall;
libfunc storage_write_syscall = storage_write_syscall;

felt252_const<0>() -> ([0]);
storage_base_address_const<0>() -> ([1]);
storage_read_syscall([1]) -> ([2]);
storage_write_syscall([1], [0]) -> ([3]);
return([2]);`;
  };

  const loadTemplate = (template: string) => {
    const templates: Record<string, string> = {
      erc20_template: `use starknet::ContractAddress;

#[starknet::interface]
trait IERC20<TContractState> {
    fn name(self: @TContractState) -> felt252;
    fn symbol(self: @TContractState) -> felt252;
    fn decimals(self: @TContractState) -> u8;
    fn total_supply(self: @TContractState) -> u256;
    fn balance_of(self: @TContractState, account: ContractAddress) -> u256;
    fn allowance(self: @TContractState, owner: ContractAddress, spender: ContractAddress) -> u256;
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
    fn transfer_from(ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256) -> bool;
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> bool;
}

#[starknet::contract]
mod ERC20Token {
    use super::IERC20;
    use starknet::{ContractAddress, get_caller_address};
    
    #[storage]
    struct Storage {
        name: felt252,
        symbol: felt252,
        decimals: u8,
        total_supply: u256,
        balances: LegacyMap<ContractAddress, u256>,
        allowances: LegacyMap<(ContractAddress, ContractAddress), u256>,
    }
    
    #[constructor]
    fn constructor(ref self: ContractState, name: felt252, symbol: felt252, decimals: u8, initial_supply: u256, recipient: ContractAddress) {
        self.name.write(name);
        self.symbol.write(symbol);
        self.decimals.write(decimals);
        self.total_supply.write(initial_supply);
        self.balances.write(recipient, initial_supply);
    }
}`,
      amm_template: `#[starknet::interface]
trait IAMM<TContractState> {
    fn add_liquidity(ref self: TContractState, amount_a: u256, amount_b: u256) -> u256;
    fn remove_liquidity(ref self: TContractState, liquidity: u256) -> (u256, u256);
    fn swap_a_to_b(ref self: TContractState, amount_in: u256) -> u256;
    fn swap_b_to_a(ref self: TContractState, amount_in: u256) -> u256;
    fn get_reserves(self: @TContractState) -> (u256, u256);
    fn get_price(self: @TContractState) -> u256;
}

#[starknet::contract]
mod AMMPool {
    use super::IAMM;
    use starknet::{ContractAddress, get_caller_address};
    
    #[storage]
    struct Storage {
        token_a: ContractAddress,
        token_b: ContractAddress,
        reserve_a: u256,
        reserve_b: u256,
        total_liquidity: u256,
        liquidity_tokens: LegacyMap<ContractAddress, u256>,
        fee_rate: u256, // Basis points (e.g., 30 = 0.3%)
    }
    
    #[constructor]
    fn constructor(ref self: ContractState, token_a: ContractAddress, token_b: ContractAddress, fee_rate: u256) {
        self.token_a.write(token_a);
        self.token_b.write(token_b);
        self.fee_rate.write(fee_rate);
    }
}`,
      nft_template: `use starknet::ContractAddress;

#[starknet::interface]
trait IERC721<TContractState> {
    fn balance_of(self: @TContractState, owner: ContractAddress) -> u256;
    fn owner_of(self: @TContractState, token_id: u256) -> ContractAddress;
    fn transfer_from(ref self: TContractState, from: ContractAddress, to: ContractAddress, token_id: u256);
    fn approve(ref self: TContractState, approved: ContractAddress, token_id: u256);
    fn set_approval_for_all(ref self: TContractState, operator: ContractAddress, approved: bool);
    fn get_approved(self: @TContractState, token_id: u256) -> ContractAddress;
    fn is_approved_for_all(self: @TContractState, owner: ContractAddress, operator: ContractAddress) -> bool;
}

#[starknet::contract]
mod NFTCollection {
    use super::IERC721;
    use starknet::{ContractAddress, get_caller_address};
    
    #[storage]
    struct Storage {
        name: felt252,
        symbol: felt252,
        owners: LegacyMap<u256, ContractAddress>,
        balances: LegacyMap<ContractAddress, u256>,
        token_approvals: LegacyMap<u256, ContractAddress>,
        operator_approvals: LegacyMap<(ContractAddress, ContractAddress), bool>,
        total_supply: u256,
        base_uri: felt252,
    }
    
    #[constructor]
    fn constructor(ref self: ContractState, name: felt252, symbol: felt252, base_uri: felt252) {
        self.name.write(name);
        self.symbol.write(symbol);
        self.base_uri.write(base_uri);
    }
}`
    };
    
    setCairoCode(templates[template] || defaultCairoCode);
    toast({
      title: "Template Loaded",
      description: "Cairo template has been loaded into the editor"
    });
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Cairo Development Environment
          </CardTitle>
          <CardDescription>
            Integrated development tools for Stwo Cairo framework and StarkNet smart contracts
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Setup & Clone</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="editor">Code Editor</TabsTrigger>
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Stwo Cairo Repository Setup
              </CardTitle>
              <CardDescription>Clone and set up the latest Stwo Cairo framework</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-950 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="mb-2 text-gray-400"># Clone Stwo Cairo repository</div>
                <div>$ git clone https://github.com/starkware-libs/stwo-cairo.git</div>
                <div>$ cd stwo-cairo</div>
                <div className="mt-3 text-gray-400"># Build cairo-prove binary</div>
                <div>$ cd cairo-prove</div>
                <div>$ ./build.sh</div>
                <div>$ sudo cp target/release/cairo-prove /usr/local/bin/</div>
                <div className="mt-3 text-gray-400"># Install Scarb (Cairo package manager)</div>
                <div>$ asdf install scarb latest:nightly</div>
                <div>$ asdf set -u scarb latest:nightly</div>
                <div className="mt-3 text-gray-400"># Test installation</div>
                <div>$ cairo-prove --version</div>
                <div>$ scarb --version</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Setup Requirements
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Rust 1.70+ (cargo)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Git version control</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>LLVM 13+ (for optimization)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Python 3.9+ (for tooling)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    Key Features
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span>Faster compilation (3x speedup)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span>Improved error messages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span>Better STARK optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span>Native StarkNet integration</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" asChild>
                  <a 
                    href="https://github.com/starkware-libs/stwo-cairo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Open Repository
                  </a>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <a 
                    href="https://book.cairo-lang.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <Book className="w-3 h-3" />
                    Documentation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectTemplates.map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <Badge className={getComplexityColor(template.complexity)}>
                      {template.complexity}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => loadTemplate(template.template)}
                    >
                      <Code className="w-3 h-3 mr-1" />
                      Load Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="editor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Cairo Code Editor
              </CardTitle>
              <div className="flex gap-2">
                <Button onClick={compileCairoCode} disabled={isCompiling}>
                  {isCompiling ? "Compiling..." : <PlayCircle className="w-4 h-4 mr-1" />}
                  {isCompiling ? "" : "Compile"}
                </Button>
                <Button variant="outline" onClick={() => setCairoCode(defaultCairoCode)}>
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={cairoCode}
                onChange={(e) => setCairoCode(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
                placeholder="Enter your Cairo code here..."
              />

              {compilationResult && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {compilationResult.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      )}
                      Compilation {compilationResult.success ? 'Successful' : 'Failed'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {compilationResult.success && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">{compilationResult.gasEstimate?.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Gas Estimate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{compilationResult.proofSize}KB</div>
                          <div className="text-sm text-muted-foreground">Proof Size</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">✓</div>
                          <div className="text-sm text-muted-foreground">Sierra Ready</div>
                        </div>
                      </div>
                    )}

                    {compilationResult.warnings.length > 0 && (
                      <div>
                        <h4 className="font-medium text-yellow-600 mb-2">Warnings</h4>
                        {compilationResult.warnings.map((warning, index) => (
                          <div key={index} className="text-sm text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 p-2 rounded">
                            {warning}
                          </div>
                        ))}
                      </div>
                    )}

                    {compilationResult.errors.length > 0 && (
                      <div>
                        <h4 className="font-medium text-red-600 mb-2">Errors</h4>
                        {compilationResult.errors.map((error, index) => (
                          <div key={index} className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 p-2 rounded">
                            {error}
                          </div>
                        ))}
                      </div>
                    )}

                    {compilationResult.bytecode && (
                      <div>
                        <h4 className="font-medium mb-2">Compiled Bytecode</h4>
                        <div className="bg-gray-950 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                          {compilationResult.bytecode}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Deploy to StarkNet
              </CardTitle>
              <CardDescription>Deploy your compiled Cairo contract to StarkNet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Deployment Process</h4>
                <div className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">1</div>
                    <span>Compile Cairo code to Sierra bytecode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">2</div>
                    <span>Generate STARK proof for contract verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">3</div>
                    <span>Submit deployment transaction to StarkNet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">4</div>
                    <span>Wait for L1 finalization (12-24 hours)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Network Selection</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                      StarkNet Mainnet
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <div className="w-3 h-3 bg-yellow-600 rounded-full mr-2"></div>
                      StarkNet Goerli Testnet
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                      StarkNet Sepolia Testnet
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Deployment Cost</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base deployment fee:</span>
                      <span className="font-medium">~0.001 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contract size fee:</span>
                      <span className="font-medium">~0.0005 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>L1 verification fee:</span>
                      <span className="font-medium">~0.002 ETH</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total estimated:</span>
                      <span>~0.0035 ETH</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" disabled>
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Deploy Contract
                </Button>
                <Button variant="outline">
                  <FileText className="w-3 h-3 mr-1" />
                  Export ABI
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Note: Deployment requires a connected StarkNet wallet and sufficient ETH for gas fees
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}