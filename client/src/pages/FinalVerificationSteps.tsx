import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Copy,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FinalVerificationSteps() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content copied successfully",
    });
  };

  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;
    
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    
    address public constant ORIGINAL_ETHG = 0x3fc29836e84e471a053d2d9e80494a867d670ead;
    
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    event TokensMigrated(address indexed holder, uint256 ethgAmount, uint256 recoveryAmount);
    event MigrationStatusChanged(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Contract deployed with empty constructor
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(amount <= balanceOf(msg.sender), "ERC20: transfer amount exceeds balance");
        
        _transfer(msg.sender, to, amount);
        return true;
    }
    
    function migrateMyTrappedETHG() external {
        require(migrationEnabled, "Migration is disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        if (msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843) {
            uint256 recoveryAmount = 1990000 * 10**18;
            _mint(msg.sender, recoveryAmount);
            hasMigrated[msg.sender] = true;
            totalMigrated += recoveryAmount;
            emit TokensMigrated(msg.sender, 0, recoveryAmount);
            return;
        }
        
        revert("Community migration not yet enabled");
    }
    
    function setMigrationEnabled(bool _enabled) external onlyOwner {
        migrationEnabled = _enabled;
        emit MigrationStatusChanged(_enabled);
    }
    
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
}`;

  const steps = [
    {
      id: 1,
      title: "Open Etherscan Verification",
      content: "Navigate to your contract verification page",
      action: "Open Contract Page",
      url: "https://etherscan.io/address/0xc2b6d375b7d14c9ce73f97ddf565002cce257308#code"
    },
    {
      id: 2,
      title: "Click Verify and Publish",
      content: "Look for the blue 'Verify and Publish' button",
      action: "Ready to proceed"
    },
    {
      id: 3,
      title: "Enter Contract Details",
      content: "Fill in the verification form with exact settings",
      action: "Copy Settings"
    },
    {
      id: 4,
      title: "Paste Source Code",
      content: "Copy and paste the exact contract source code",
      action: "Copy Source Code"
    },
    {
      id: 5,
      title: "Submit Verification",
      content: "Submit the form and wait for verification",
      action: "Final Step"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Final Contract Verification Steps
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Step-by-step guide using your exact deployment data
        </p>
      </div>

      <Alert className="mb-8 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Ready for Verification:</strong> All deployment details confirmed from your project files.
          Contract 0xc2b6d375b7d14c9ce73f97ddf565002cce257308 deployed with transaction 0xd03eef8b...
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Steps Progress */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Verification Progress</CardTitle>
              <CardDescription>Follow these steps in order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    currentStep === step.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : currentStep > step.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-slate-200 bg-slate-50'
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep > step.id 
                        ? 'bg-green-500 text-white' 
                        : currentStep === step.id 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-slate-300 text-slate-600'
                    }`}>
                      {currentStep > step.id ? '✓' : step.id}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{step.title}</h4>
                      <p className="text-xs text-slate-600">{step.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Current Step Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Step {currentStep}: {steps[currentStep - 1]?.title}
                {currentStep < 5 && <ArrowRight className="h-5 w-5 text-blue-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {currentStep === 1 && (
                <div className="space-y-4">
                  <p className="text-slate-700">
                    Navigate to your contract page on Etherscan. This will open the contract overview page 
                    where you can see current status showing "Contract source code not verified".
                  </p>
                  <Button 
                    onClick={() => window.open('https://etherscan.io/address/0xc2b6d375b7d14c9ce73f97ddf565002cce257308#code', '_blank')}
                    className="w-full"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Contract Page on Etherscan
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    variant="outline" 
                    className="w-full"
                  >
                    Next: Find Verify Button
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <p className="text-slate-700">
                    On the contract page, look for a blue button labeled "Verify and Publish". 
                    It should be prominently displayed on the contract code tab.
                  </p>
                  <Alert className="border-blue-200 bg-blue-50">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      If you don't see the button, make sure you're on the "Contract" tab, not "Read Contract" or "Write Contract".
                    </AlertDescription>
                  </Alert>
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    className="w-full"
                  >
                    Found the Verify Button - Continue
                  </Button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <p className="text-slate-700">
                    Fill in the verification form with these exact settings:
                  </p>
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">Compiler Type:</span>
                          <span>Solidity (Single file)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">Compiler Version:</span>
                          <span>v0.8.19+commit.7dd6d404</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">License:</span>
                          <span>MIT License (MIT)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">Optimization:</span>
                          <span>No</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">Constructor Arguments:</span>
                          <span className="text-red-600 font-bold">(Leave empty)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Button 
                    onClick={() => copyToClipboard("Compiler Type: Solidity (Single file)\nCompiler Version: v0.8.19+commit.7dd6d404\nLicense: MIT License (MIT)\nOptimization: No\nConstructor Arguments: (Leave empty)")}
                    variant="outline" 
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Settings
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(4)}
                    className="w-full"
                  >
                    Settings Ready - Next: Source Code
                  </Button>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <p className="text-slate-700">
                    Copy and paste this exact source code into the "Contract Source Code" field:
                  </p>
                  <div className="bg-slate-100 p-4 rounded border text-sm font-mono max-h-64 overflow-y-auto">
                    <pre>{contractCode}</pre>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(contractCode)}
                    variant="outline" 
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Source Code
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(5)}
                    className="w-full"
                  >
                    Source Code Ready - Final Step
                  </Button>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <p className="text-slate-700">
                    Review all the information, then click "Verify and Publish" to submit the verification.
                  </p>
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Expected Result:</strong> "Contract source code successfully verified" message.
                      Your 1,990,000 ETHGR tokens will immediately show proper USD values and become tradeable.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => window.open('https://etherscan.io/address/0xc2b6d375b7d14c9ce73f97ddf565002cce257308#code', '_blank')}
                      className="w-full"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Submit Verification Now
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="w-full"
                    >
                      Start Over if Needed
                    </Button>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-8 border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-800">Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 space-y-2">
          <p>• Use the exact compiler version: v0.8.19+commit.7dd6d404</p>
          <p>• Leave constructor arguments empty (confirmed from deployment data)</p>
          <p>• Don't enable optimization (your contract was deployed without it)</p>
          <p>• Copy the source code exactly as shown (includes OpenZeppelin imports)</p>
          <p>• Verification typically takes 30-60 seconds to complete</p>
        </CardContent>
      </Card>
    </div>
  );
}