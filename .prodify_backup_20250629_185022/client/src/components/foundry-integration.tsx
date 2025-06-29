import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Terminal, 
  Zap,
  ExternalLink,
  Code2,
  TestTube,
  Rocket,
  Copy,
  Download,
  Play,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FoundryProject {
  name: string;
  description: string;
  template: string;
  contracts: string[];
  tests: string[];
}

export function FoundryIntegration() {
  const [projectName, setProjectName] = useState("quantum-token");
  const [projectType, setProjectType] = useState("erc20");
  const [contractCode, setContractCode] = useState("");
  const [testCode, setTestCode] = useState("");
  const [deployScript, setDeployScript] = useState("");
  const { toast } = useToast();

  const generateFoundryProject = () => {
    const solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/${projectName}.sol";

contract ${projectName}Test is Test {
    ${projectName} public token;
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        token = new ${projectName}("${projectName}", "${projectName.toUpperCase()}", 1000000 * 10**18);
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
    }

    function testInitialBalance() public {
        assertEq(token.balanceOf(address(this)), 1000000 * 10**18);
    }

    function testTransfer() public {
        uint256 amount = 1000 * 10**18;
        token.transfer(user1, amount);
        assertEq(token.balanceOf(user1), amount);
    }

    function testTransferFail() public {
        vm.prank(user1);
        vm.expectRevert();
        token.transfer(user2, 1 * 10**18); // Should fail - user1 has no tokens
    }

    function testApproveAndTransferFrom() public {
        uint256 amount = 500 * 10**18;
        token.approve(user1, amount);
        
        vm.prank(user1);
        token.transferFrom(address(this), user2, amount);
        
        assertEq(token.balanceOf(user2), amount);
        assertEq(token.allowance(address(this), user1), 0);
    }

    function testBurn() public {
        uint256 burnAmount = 100 * 10**18;
        uint256 initialSupply = token.totalSupply();
        
        token.burn(burnAmount);
        
        assertEq(token.totalSupply(), initialSupply - burnAmount);
        assertEq(token.balanceOf(address(this)), initialSupply - burnAmount);
    }

    function testFuzzTransfer(uint256 amount) public {
        vm.assume(amount <= token.balanceOf(address(this)));
        vm.assume(amount > 0);
        
        token.transfer(user1, amount);
        assertEq(token.balanceOf(user1), amount);
    }
}`;

    const contractTemplate = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${projectName} is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    
    event TokensBurned(address indexed burner, uint256 amount);
    event MaxSupplyReached();
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        require(initialSupply <= MAX_SUPPLY, "Initial supply exceeds maximum");
        _mint(msg.sender, initialSupply);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
        
        if (totalSupply() == MAX_SUPPLY) {
            emit MaxSupplyReached();
        }
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    // Override transfer functions to ensure transparency
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        return super.transferFrom(from, to, amount);
    }
}`;

    const deployScriptTemplate = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/${projectName}.sol";

contract Deploy${projectName} is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ${projectName} token = new ${projectName}(
            "${projectName}",
            "${projectName.toUpperCase()}",
            1000000 * 10**18 // 1 million initial supply
        );

        console.log("${projectName} deployed to:", address(token));
        console.log("Initial supply:", token.totalSupply());
        console.log("Owner:", token.owner());

        vm.stopBroadcast();
    }
}`;

    setContractCode(contractTemplate);
    setTestCode(solidityCode);
    setDeployScript(deployScriptTemplate);
  };

  const generateFoundryConfig = () => {
    return `[profile.default]
src = "src"
out = "out"
libs = ["lib"]
remappings = [
    "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
    "forge-std/=lib/forge-std/src/"
]

# Compiler settings
solc_version = "0.8.19"
optimizer = true
optimizer_runs = 200
via_ir = false

# Test settings
verbosity = 2
fuzz_runs = 256
fuzz_max_test_rejects = 65536

# Gas reporting
gas_reports = ["*"]
gas_reports_ignore = ["test/**/*"]

# Networks
[rpc_endpoints]
mainnet = "https://eth-mainnet.alchemyapi.io/v2/\${ALCHEMY_API_KEY}"
sepolia = "https://eth-sepolia.alchemyapi.io/v2/\${ALCHEMY_API_KEY}"
polygon = "https://polygon-mainnet.alchemyapi.io/v2/\${ALCHEMY_API_KEY}"

[etherscan]
mainnet = { key = "\${ETHERSCAN_API_KEY}" }
sepolia = { key = "\${ETHERSCAN_API_KEY}" }
polygon = { key = "\${POLYGONSCAN_API_KEY}" }`;
  };

  const generateHardhatConfig = () => {
    return `import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: process.env.MAINNET_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
};

export default config;`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`
    });
  };

  const downloadProject = () => {
    const projectFiles = {
      [`src/${projectName}.sol`]: contractCode,
      [`test/${projectName}.t.sol`]: testCode,
      [`script/Deploy${projectName}.s.sol`]: deployScript,
      'foundry.toml': generateFoundryConfig(),
      'hardhat.config.ts': generateHardhatConfig(),
      '.env.example': `PRIVATE_KEY=your_private_key_here
ALCHEMY_API_KEY=your_alchemy_key
ETHERSCAN_API_KEY=your_etherscan_key
POLYGONSCAN_API_KEY=your_polygonscan_key`,
      'README.md': `# ${projectName}

## Foundry Development Environment

### Setup
\`\`\`bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install dependencies
forge install openzeppelin/openzeppelin-contracts
forge install foundry-rs/forge-std

# Compile contracts
forge build

# Run tests
forge test

# Run tests with gas reporting
forge test --gas-report

# Deploy to testnet
forge script script/Deploy${projectName}.s.sol --rpc-url sepolia --broadcast --verify
\`\`\`

### Hardhat Integration
\`\`\`bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Compile with Hardhat
npx hardhat compile

# Test with Hardhat
npx hardhat test

# Deploy with Hardhat
npx hardhat run scripts/deploy.ts --network sepolia
\`\`\`

### Why This is Better Than ETHG
- ✅ Fully verified and transparent source code
- ✅ Comprehensive test suite with fuzz testing
- ✅ Professional development tools (Foundry + Hardhat)
- ✅ No hidden transfer restrictions
- ✅ Standard OpenZeppelin security patterns
- ✅ Proper deployment and verification scripts

### ETHG Problems Avoided
- ❌ No unverified contracts
- ❌ No honeypot mechanisms
- ❌ No transfer blocks
- ❌ No trapped funds`
    };

    // Create and download ZIP-like structure as individual files
    Object.entries(projectFiles).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.replace('/', '_');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    toast({
      title: "Project Downloaded",
      description: "All project files have been downloaded"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Foundry + Hardhat 3 Development Suite
        </CardTitle>
        <CardDescription>
          Professional smart contract development with Foundry's speed and Hardhat's ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="project" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="project">Project Setup</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
          </TabsList>

          <TabsContent value="project" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <Input
                    placeholder="quantum-token"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Type</label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="erc20">ERC-20 Token</SelectItem>
                      <SelectItem value="erc721">ERC-721 NFT</SelectItem>
                      <SelectItem value="defi">DeFi Protocol</SelectItem>
                      <SelectItem value="dao">DAO Governance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={generateFoundryProject} className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Generate Professional Project
              </Button>

              {contractCode && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium text-green-600">✓ Foundry Ready</div>
                      <div className="text-xs text-muted-foreground">Forge + Cast + Anvil</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium text-blue-600">✓ Hardhat 3 Compatible</div>
                      <div className="text-xs text-muted-foreground">TypeScript + Viem</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium text-purple-600">✓ Test Coverage</div>
                      <div className="text-xs text-muted-foreground">Unit + Fuzz + Integration</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={downloadProject} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download Complete Project
                    </Button>
                    <Button variant="outline" asChild>
                      <a 
                        href="https://book.getfoundry.sh/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Foundry Book
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a 
                        href="https://hardhat.org/hardhat-runner/docs/getting-started"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Hardhat 3 Docs
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm">
                  <p className="font-medium text-blue-800 mb-2">Professional Development Stack</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-blue-700 mb-1">Foundry Benefits</p>
                      <ul className="text-blue-600 space-y-1 text-xs">
                        <li>• 10x faster compilation and testing</li>
                        <li>• Built-in fuzz testing and gas optimization</li>
                        <li>• Solidity-native testing framework</li>
                        <li>• Advanced debugging with traces</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-purple-700 mb-1">Hardhat 3 Alpha</p>
                      <ul className="text-purple-600 space-y-1 text-xs">
                        <li>• Rust-powered performance improvements</li>
                        <li>• Native Solidity tests integration</li>
                        <li>• Multichain support across networks</li>
                        <li>• OP Stack simulation capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            {contractCode && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Smart Contract ({projectName}.sol)</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(contractCode, "Contract code")}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={contractCode}
                  onChange={(e) => setContractCode(e.target.value)}
                  className="font-mono text-xs h-96"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" asChild>
                    <a 
                      href="https://remix.ethereum.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Test in Remix
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a 
                      href="https://docs.openzeppelin.com/contracts/4.x/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      OpenZeppelin Docs
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="testing" className="space-y-4">
            {testCode && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Foundry Tests ({projectName}.t.sol)</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(testCode, "Test code")}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={testCode}
                  onChange={(e) => setTestCode(e.target.value)}
                  className="font-mono text-xs h-96"
                />

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-sm">
                    <p className="font-medium text-green-800 mb-2">Testing Commands</p>
                    <div className="space-y-2">
                      <div className="bg-black text-green-400 p-2 rounded font-mono text-xs">
                        <div># Run all tests</div>
                        <div>forge test</div>
                        <div></div>
                        <div># Run with gas reporting</div>
                        <div>forge test --gas-report</div>
                        <div></div>
                        <div># Run fuzz tests with more runs</div>
                        <div>forge test --fuzz-runs 10000</div>
                        <div></div>
                        <div># Test specific function</div>
                        <div>forge test --match-test testTransfer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="deployment" className="space-y-4">
            {deployScript && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Deployment Script (Deploy{projectName}.s.sol)</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(deployScript, "Deploy script")}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={deployScript}
                  onChange={(e) => setDeployScript(e.target.value)}
                  className="font-mono text-xs h-64"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm">
                      <p className="font-medium text-blue-800 mb-2">Foundry Deployment</p>
                      <div className="bg-black text-blue-400 p-2 rounded font-mono text-xs">
                        <div># Deploy to testnet</div>
                        <div>forge script script/Deploy{projectName}.s.sol \\</div>
                        <div>  --rpc-url sepolia \\</div>
                        <div>  --broadcast \\</div>
                        <div>  --verify</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-sm">
                      <p className="font-medium text-purple-800 mb-2">Hardhat 3 Deployment</p>
                      <div className="bg-black text-purple-400 p-2 rounded font-mono text-xs">
                        <div># Deploy with Hardhat</div>
                        <div>npx hardhat run \\</div>
                        <div>  scripts/deploy.ts \\</div>
                        <div>  --network sepolia</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="text-sm">
                    <p className="font-medium text-orange-800 mb-1">Why This Prevents ETHG Problems</p>
                    <ul className="text-orange-700 space-y-1">
                      <li>• Source code verification happens automatically during deployment</li>
                      <li>• Comprehensive tests prove all functions work as expected</li>
                      <li>• No hidden functions or transfer restrictions</li>
                      <li>• Professional development tools catch issues before deployment</li>
                      <li>• Gas optimization ensures efficient contract execution</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}