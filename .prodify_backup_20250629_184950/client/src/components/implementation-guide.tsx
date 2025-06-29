import { Code, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImplementationGuide() {
  const codeExamples = [
    {
      title: "1. Etherscan API Setup",
      code: `const API_URL = "https://api.etherscan.io/v2/api";
const POOL_ADDRESS = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";
const SWAP_TOPIC = "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67";`,
    },
    {
      title: "2. Fetch Swap Events",
      code: `const logs = await fetch(\`\${API_URL}?chainid=1&module=logs&action=getLogs&address=\${POOL_ADDRESS}&topic0=\${SWAP_TOPIC}&apikey=\${API_KEY}\`);`,
    },
    {
      title: "3. Decode with Ethers",
      code: `const pool = new ethers.Interface(abi);
const parsedLog = pool.parseLog(log);
const [,, amount0, amount1] = parsedLog.args;`,
    },
    {
      title: "4. Classify Trades",
      code: `const isBuy = amount0 > 0;
const tradeType = isBuy ? "BUY" : "SELL";
const price = Math.abs(amount0) / Math.abs(amount1);`,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Code className="text-primary mr-2 h-5 w-5" />
          Implementation Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {codeExamples.map((example) => (
            <div key={example.title}>
              <h3 className="text-md font-semibold mb-3 text-primary">{example.title}</h3>
              <div className="bg-background rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <pre className="text-muted-foreground">
                  <code>{example.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="text-primary mt-1 h-5 w-5" />
            <div>
              <h4 className="font-semibold text-primary mb-2">Implementation Notes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Rate limit: 5 requests per second for free tier</li>
                <li>• Use WebSocket connections for real-time updates</li>
                <li>• Implement proper error handling for API failures</li>
                <li>• Cache ABI data to reduce API calls</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
