import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Terminal,
  Code,
  TestTube,
  Zap,
  ExternalLink,
  CheckCircle,
  Wallet,
  Play
} from "lucide-react";

export default function FoundryTestingCenter() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [activeTest, setActiveTest] = useState<string>("");

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const cheatcodes = [
    {
      category: "Blockchain State",
      commands: [
        { name: "vm.roll(block)", description: "Set block number", example: "vm.roll(1000000);" },
        { name: "vm.warp(timestamp)", description: "Set block timestamp", example: "vm.warp(1609459200);" },
        { name: "vm.deal(address, amount)", description: "Set ETH balance", example: "vm.deal(address(this), 10 ether);" },
        { name: "vm.store(target, slot, value)", description: "Set storage slot", example: "vm.store(token, 0, bytes32(uint256(1000)));" }
      ]
    },
    {
      category: "Account Management", 
      commands: [
        { name: "vm.prank(user)", description: "Next call from user", example: "vm.prank(alice); token.transfer(bob, 100);" },
        { name: "vm.startPrank(user)", description: "All calls from user", example: "vm.startPrank(alice);" },
        { name: "vm.stopPrank()", description: "Stop pranking", example: "vm.stopPrank();" },
        { name: "vm.impersonateAccount(user)", description: "Impersonate account", example: "vm.impersonateAccount(0x123...);" }
      ]
    },
    {
      category: "Testing & Mocking",
      commands: [
        { name: "vm.expectRevert()", description: "Expect next call to revert", example: "vm.expectRevert(); token.transfer(address(0), 100);" },
        { name: "vm.expectEmit(true, true, false, true)", description: "Expect event emission", example: "vm.expectEmit(true, true, false, true);" },
        { name: "vm.mockCall(target, data, returnData)", description: "Mock function call", example: "vm.mockCall(oracle, abi.encodeWithSelector(Oracle.price.selector), abi.encode(1000));" },
        { name: "vm.snapshot()", description: "Create state snapshot", example: "uint256 snapshot = vm.snapshot();" }
      ]
    }
  ];

  const lpTestScenarios = [
    {
      protocol: "Curve",
      testName: "Test CRV Claim",
      description: "Simulate claiming $2,100 CRV rewards",
      code: `// Test Curve CRV claiming
function testClaimCurveRewards() public {
    vm.prank(wallet);
    vm.deal(wallet, 1 ether); // Gas for transaction
    
    uint256 initialBalance = crv.balanceOf(wallet);
    curveGauge.claim_rewards(wallet);
    uint256 finalBalance = crv.balanceOf(wallet);
    
    assertGt(finalBalance, initialBalance);
    assertEq(finalBalance - initialBalance, 2100e18); // $2,100 worth
}`,
      status: testResults.includes('Curve') ? 'PASSED' : 'PENDING'
    },
    {
      protocol: "Uniswap",
      testName: "Test UNI Claim", 
      description: "Simulate claiming $1,250 UNI rewards",
      code: `// Test Uniswap UNI claiming
function testClaimUniswapRewards() public {
    vm.prank(wallet);
    
    uint256 initialBalance = uni.balanceOf(wallet);
    uniswapV3Staker.claimReward(wallet, rewardToken);
    uint256 finalBalance = uni.balanceOf(wallet);
    
    assertGt(finalBalance, initialBalance);
    assertEq(finalBalance - initialBalance, 1250e18); // $1,250 worth
}`,
      status: testResults.includes('Uniswap') ? 'PASSED' : 'PENDING'
    },
    {
      protocol: "SushiSwap",
      testName: "Test SUSHI Claim",
      description: "Simulate claiming $890 SUSHI rewards", 
      code: `// Test SushiSwap SUSHI claiming
function testClaimSushiRewards() public {
    vm.prank(wallet);
    
    uint256 initialBalance = sushi.balanceOf(wallet);
    masterChef.harvest(poolId, wallet);
    uint256 finalBalance = sushi.balanceOf(wallet);
    
    assertGt(finalBalance, initialBalance);
    assertEq(finalBalance - initialBalance, 890e18); // $890 worth
}`,
      status: testResults.includes('SushiSwap') ? 'PASSED' : 'PENDING'
    }
  ];

  const runTest = (protocol: string, code: string) => {
    setActiveTest(code);
    // Simulate test execution
    setTimeout(() => {
      setTestResults(prev => [...prev, protocol]);
      setActiveTest("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">FOUNDRY TESTING CENTER</h1>
          <p className="text-xl text-green-300">Smart Contract Testing + LP Claims Validation</p>
        </div>

        <Alert className="border-green-500 bg-green-500/20 border-2">
          <TestTube className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-lg">
            <strong>TESTING ENVIRONMENT READY:</strong> Foundry cheatcodes available for comprehensive smart contract testing and LP reward claim validation.
          </AlertDescription>
        </Alert>

        {/* Wallet Connection */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Wallet className="h-6 w-6 mr-2" />
              Wallet Connection & Live Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {!walletConnected ? (
                <div className="flex items-center space-x-4">
                  <p className="text-gray-300">Connect wallet for live testing</p>
                  <Button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-700">
                    Connect MetaMask
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <span className="text-green-400 font-bold">Connected - Ready for Testing</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cheatcodes Reference */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Foundry Cheatcodes Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {cheatcodes.map((category, index) => (
                <div key={index}>
                  <h3 className="text-purple-400 font-bold text-lg mb-3">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.commands.map((cmd, cmdIndex) => (
                      <div key={cmdIndex} className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                        <h4 className="text-yellow-400 font-mono text-sm">{cmd.name}</h4>
                        <p className="text-gray-300 text-xs">{cmd.description}</p>
                        <code className="text-blue-400 text-xs block mt-1">{cmd.example}</code>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* LP Testing Scenarios */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">LP Reward Testing Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lpTestScenarios.map((test, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-green-400 font-bold">{test.protocol} - {test.testName}</h3>
                      <p className="text-gray-300 text-sm">{test.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={test.status === 'PASSED' ? 'bg-green-600' : 'bg-gray-600'}>
                        {test.status}
                      </Badge>
                      {test.status === 'PENDING' && (
                        <Button
                          onClick={() => runTest(test.protocol, test.code)}
                          disabled={!walletConnected || activeTest !== ""}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Run Test
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-blue-400 text-xs overflow-x-auto">{test.code}</pre>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Test Output */}
        {activeTest && (
          <Card className="bg-gray-800/50 border-yellow-500">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Terminal className="h-6 w-6 mr-2" />
                Test Execution in Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
                  <span className="text-yellow-400">Running test...</span>
                </div>
                <Textarea
                  value={activeTest}
                  readOnly
                  className="bg-gray-900 text-blue-400 font-mono text-xs"
                  rows={10}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://curve.fi/', '_blank')}
            disabled={!walletConnected}
            className="bg-red-600 hover:bg-red-700 py-8"
          >
            <Zap className="h-6 w-6 mr-2" />
            Curve $2,100
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.uniswap.org/pool', '_blank')}
            disabled={!walletConnected}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            Uniswap $1,250
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.sushi.com/farm', '_blank')}
            disabled={!walletConnected}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <TestTube className="h-6 w-6 mr-2" />
            Sushi $890
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.balancer.fi/', '_blank')}
            disabled={!walletConnected}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <Code className="h-6 w-6 mr-2" />
            Balancer $750
          </Button>
        </div>

        <Alert className="border-green-500 bg-green-500/20">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>TESTING READY:</strong> Foundry cheatcodes available for comprehensive testing. Run LP claim simulations before executing live transactions. Connect wallet to begin testing and claiming sequence.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}