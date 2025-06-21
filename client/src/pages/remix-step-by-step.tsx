import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Copy,
  ExternalLink,
  ArrowDown,
  CheckCircle,
  Target,
  Terminal,
  Eye,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RemixStepByStep() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { toast } = useToast();

  const copyCommand = (command: string, stepIndex: number) => {
    navigator.clipboard.writeText(command);
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    toast({
      title: "Copied!",
      description: "Command copied - now paste it in Remix terminal"
    });
  };

  const steps = [
    {
      title: "Open Remix IDE Terminal",
      description: "First, we need to access the terminal in Remix IDE",
      instructions: [
        "Open Remix IDE (https://remix.ethereum.org/)",
        "Look at the bottom of the screen",
        "Click on the 'Terminal' tab (bottom panel)",
        "You'll see a command prompt with a > symbol"
      ],
      command: null,
      image: "terminal-location"
    },
    {
      title: "Check Your Deployment History",
      description: "Find contracts you deployed that might contain your 37 ETH",
      instructions: [
        "Copy the command below",
        "Paste it into the Remix terminal",
        "Press Enter",
        "Look for any contract addresses in the results"
      ],
      command: `remix.call('udapp', 'getInstanceList').then(instances => {
  console.log('=== YOUR DEPLOYED CONTRACTS ===')
  console.log(instances)
  return instances
})`,
      expected: "List of contracts you've deployed"
    },
    {
      title: "Check Remix Wallet Balance",
      description: "See if your 37 ETH is still in the Remix deployment wallet",
      instructions: [
        "Copy this command",
        "Paste in terminal and press Enter",
        "Look for the ETH balance result",
        "If you see 30+ ETH, that's your missing funds!"
      ],
      command: `web3.eth.getBalance('0xc46eB37677360EfDc011F4097621F15b792fa630').then(balance => {
  const ethAmount = web3.utils.fromWei(balance, 'ether')
  console.log('=== REMIX WALLET BALANCE ===')
  console.log('Address: 0xc46eB37677360EfDc011F4097621F15b792fa630')
  console.log('Balance:', ethAmount, 'ETH')
  console.log('USD Value: $' + (parseFloat(ethAmount) * 2422).toLocaleString())
  if (parseFloat(ethAmount) > 30) {
    console.log('🎉 FOUND YOUR 37 ETH! 🎉')
  }
  return balance
})`,
      expected: "ETH balance (hopefully 37+ ETH!)"
    },
    {
      title: "Check New Discovery Wallet",
      description: "Check the wallet address you recently provided",
      instructions: [
        "This checks the new wallet you mentioned",
        "Copy and paste the command",
        "Look for any significant ETH balance"
      ],
      command: `web3.eth.getBalance('0x8b99Bb520235F502158bA026A7CfEB59a69E6c18').then(balance => {
  const ethAmount = web3.utils.fromWei(balance, 'ether')
  console.log('=== NEW DISCOVERY WALLET ===')
  console.log('Address: 0x8b99Bb520235F502158bA026A7CfEB59a69E6c18')
  console.log('Balance:', ethAmount, 'ETH')
  return balance
})`,
      expected: "ETH balance of new wallet"
    },
    {
      title: "Check Proxy Contract",
      description: "Investigate the proxy contract that might be holding your ETH",
      instructions: [
        "This checks the proxy contract for trapped ETH",
        "Look for balance and admin functions",
        "Admin functions might give you access to recover funds"
      ],
      command: `const proxyAddr = '0xd816c710dc011db6d357e2b1210eafc60177338f'
web3.eth.getBalance(proxyAddr).then(balance => {
  const ethAmount = web3.utils.fromWei(balance, 'ether')
  console.log('=== PROXY CONTRACT ANALYSIS ===')
  console.log('Address:', proxyAddr)
  console.log('Balance:', ethAmount, 'ETH')
  
  // Check if it has code (is a contract)
  return web3.eth.getCode(proxyAddr)
}).then(code => {
  console.log('Has Contract Code:', code !== '0x')
  console.log('Code Length:', code.length)
})`,
      expected: "Proxy contract balance and code info"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">37 ETH Recovery - Step by Step</h1>
          <p className="text-muted-foreground">
            Simple instructions to find your 37 ETH using Remix IDE
          </p>
        </div>
        <Button onClick={() => window.open('https://remix.ethereum.org/', '_blank')}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Open Remix IDE
        </Button>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <Target className="h-4 w-4" />
        <AlertDescription>
          <strong>Don't worry!</strong> These commands are completely safe. They only READ information - they cannot spend or move any funds. 
          We're just looking for where your 37 ETH went.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {steps.map((step, index) => (
            <Card key={index} className={`${currentStep === index ? 'border-blue-500 bg-blue-50' : ''} ${completedSteps.includes(index) ? 'border-green-500' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={completedSteps.includes(index) ? "default" : currentStep === index ? "secondary" : "outline"}>
                      Step {index + 1}
                    </Badge>
                    <span>{step.title}</span>
                    {completedSteps.includes(index) && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentStep(index)}
                  >
                    {currentStep === index ? "Current" : "Select"}
                  </Button>
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Instructions:</h4>
                    <div className="space-y-1">
                      {step.instructions.map((instruction, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {i + 1}
                          </Badge>
                          <span>{instruction}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {step.command && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        Command to Copy:
                      </h4>
                      <Textarea 
                        value={step.command}
                        readOnly
                        className="h-32 text-xs font-mono bg-gray-50"
                      />
                      <Button 
                        className="w-full mt-2"
                        onClick={() => copyCommand(step.command!, index)}
                        variant={completedSteps.includes(index) ? "default" : "secondary"}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {completedSteps.includes(index) ? "Copied ✓" : "Copy Command"}
                      </Button>
                    </div>
                  )}

                  {step.expected && (
                    <div className="p-3 bg-yellow-50 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <Eye className="h-4 w-4" />
                        <span className="font-semibold text-sm">What to look for:</span>
                      </div>
                      <div className="text-sm">{step.expected}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      completedSteps.includes(index) ? 'bg-green-500 text-white' :
                      currentStep === index ? 'bg-blue-500 text-white' :
                      'bg-gray-200'
                    }`}>
                      {completedSteps.includes(index) ? '✓' : index + 1}
                    </div>
                    <span className="text-sm">{step.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Terminal Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="font-semibold mb-2">Where to paste commands:</div>
                  <div className="space-y-1">
                    <div>1. Bottom of Remix IDE screen</div>
                    <div>2. Look for "Terminal" tab</div>
                    <div>3. Find the prompt with ">" symbol</div>
                    <div>4. Paste command and press Enter</div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded">
                  <div className="font-semibold text-green-700">Success Signs:</div>
                  <div className="text-xs">
                    • Balance showing 30+ ETH<br/>
                    • Contract addresses listed<br/>
                    • No error messages
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recovery Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current Portfolio:</span>
                  <span className="font-bold">$1.325M</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Recovery:</span>
                  <span className="font-bold text-green-600">37 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span>Recovery Value:</span>
                  <span className="font-bold">$89,614</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span>Total Potential:</span>
                  <span className="font-bold text-blue-600">$1.414M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-semibold mb-2">What we're doing:</div>
              <div className="text-sm space-y-1">
                <div>• Checking wallet balances (safe, read-only)</div>
                <div>• Finding your deployed contracts</div>
                <div>• Looking for trapped ETH in proxy contracts</div>
                <div>• Identifying recovery opportunities</div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2">What to expect:</div>
              <div className="text-sm space-y-1">
                <div>• Commands return balance information</div>
                <div>• Contract addresses will be displayed</div>
                <div>• Large ETH amounts will be highlighted</div>
                <div>• No funds will be moved or spent</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}