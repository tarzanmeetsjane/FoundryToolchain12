import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download,
  CheckCircle,
  Info,
  Building,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DBASetupGuide() {
  const [businessName, setBusinessName] = useState("");
  const [yourName, setYourName] = useState("");
  const [address, setAddress] = useState("");
  const [county, setCounty] = useState("");
  const [state, setState] = useState("");
  const [businessType, setBusinessType] = useState("");
  const { toast } = useToast();

  const generateDBADocuments = () => {
    if (!businessName || !yourName || !county || !state) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const dbaDeclaration = `D.B.A. DECLARATION FOR SMART CONTRACT DEVELOPMENT

Business Name: ${businessName}
Owner: ${yourName}
Business Address: ${address || "Same as owner address"}
County: ${county}
State: ${state}
Business Type: ${businessType || "Technology Services - Smart Contract Development"}

PURPOSE OF BUSINESS:
This D.B.A. is established for the legitimate business purpose of providing smart contract development and blockchain technology services, specifically including:

1. Smart contract remediation and bug fixes
2. Token migration services for defective contracts
3. Blockchain security analysis and improvement
4. Open-source smart contract development

SPECIFIC PROJECT AUTHORIZATION:
This D.B.A. authorizes the development and deployment of smart contracts for the purpose of fixing honeypot vulnerabilities and enabling legitimate token transfers, specifically:

- Contract Name: ETHGFixed
- Purpose: Remediate transfer restrictions in original ETHG contract
- Migration Function: Enable voluntary 1:1 token migration
- Transparency: Full source code verification on Etherscan

LEGAL COMPLIANCE:
- All smart contracts will be open source and verified
- No investment advice will be provided
- Migration is voluntary for token holders
- Full transparency and documentation provided
- Compliance with applicable securities and consumer protection laws

This business operates in good faith to provide legitimate technology services.

Signed: ${yourName}
Date: ${new Date().toLocaleDateString()}

---
NEXT STEPS TO FILE D.B.A.:
1. Take this declaration to your county clerk's office
2. File the D.B.A. registration (usually $10-50 fee)
3. Publish in local newspaper if required by your county
4. Keep filed D.B.A. certificate for your records

This D.B.A. provides legal authority to create contracts under your business name.`;

    const contractComments = `/**
 * Smart Contract Legal Header
 * 
 * Business Entity: ${businessName}
 * Owner: ${yourName}
 * D.B.A. Filed: ${county} County, ${state}
 * 
 * LEGAL BASIS FOR CONTRACT CREATION:
 * This smart contract is created under the authority of a properly filed
 * D.B.A. (Doing Business As) registration for legitimate business purposes.
 * 
 * PURPOSE: Fix honeypot vulnerabilities in ETHG token contract
 * MIGRATION: Voluntary 1:1 token swap for affected holders
 * TRANSPARENCY: Full source code verification and documentation
 * 
 * NO WARRANTY: This contract is provided "as is" without warranties
 * NO INVESTMENT ADVICE: Tokens have no guaranteed value
 * VOLUNTARY: Migration participation is entirely optional
 * 
 * Business operates in compliance with applicable laws and regulations.
 */`;

    const files = {
      'DBA-Declaration.txt': dbaDeclaration,
      'Contract-Legal-Header.sol': contractComments,
      'DBA-Filing-Instructions.md': `# How to File Your D.B.A.

## What You Need
- The D.B.A. Declaration (downloaded)
- Government ID
- Filing fee ($10-50 typically)
- Business address

## Where to File
1. **County Clerk's Office** in ${county} County, ${state}
2. **Online Filing** (check if your county offers this)
3. **Secretary of State** (some states)

## Steps
1. Bring declaration and ID to county clerk
2. Pay filing fee
3. Get stamped/certified copy
4. Publish in newspaper (if required)
5. Keep certificate safe

## Timeline
- Filing: Same day
- Newspaper publication: 1-4 weeks (if required)
- Full completion: 2-6 weeks

## After Filing
You can legally create smart contracts under "${businessName}" with proper authority and liability protection.

Your ETHG recovery contract will be legally authorized for deployment.`
    };

    Object.entries(files).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    toast({
      title: "D.B.A. Documents Generated",
      description: "Your legal framework is ready for filing"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          Quick D.B.A. Setup for ETHG Recovery
        </CardTitle>
        <CardDescription>
          File a simple D.B.A. to get legal authority for your contract creation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Business Structure Options (Pick What's Easiest)
          </h4>
          <div className="space-y-2 text-sm text-green-700">
            <div>• **Sole Proprietorship**: FREE - No filing required, create contracts as individual</div>
            <div>• **D.B.A.**: $10-50 - File business name, more professional appearance</div>
            <div>• **Both Work**: Either gives you legal authority to deploy ETHG recovery contract</div>
            <div>• **Recommendation**: Start with sole proprietorship (no cost, immediate)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessName">Your Business Name *</Label>
            <Input 
              id="businessName"
              placeholder="e.g. Quantum Secure Solutions"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <div className="text-xs text-muted-foreground mt-1">
              Pick any name for your tech business
            </div>
          </div>

          <div>
            <Label htmlFor="yourName">Your Legal Name *</Label>
            <Input 
              id="yourName"
              placeholder="Your full legal name"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="county">County *</Label>
            <Input 
              id="county"
              placeholder="e.g. Los Angeles"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="state">State *</Label>
            <Input 
              id="state"
              placeholder="e.g. California"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Business Address (Optional)</Label>
          <Textarea 
            id="address"
            placeholder="Can be your home address or leave blank"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="businessType">Business Description (Optional)</Label>
          <Input 
            id="businessType"
            placeholder="e.g. Technology Services, Smart Contract Development"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="w-5 h-5 text-blue-600" />
          <div className="text-sm">
            <div className="font-medium text-blue-800">Total Cost Estimate</div>
            <div className="text-blue-700">Filing Fee: $10-50 | Newspaper: $20-100 (if required) | Total: Usually under $150</div>
          </div>
        </div>

        <Button 
          onClick={generateDBADocuments}
          className="w-full"
          size="lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Generate D.B.A. Legal Package
        </Button>

        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="font-medium">After you download the package:</div>
          <div>1. **Review** the D.B.A declaration</div>
          <div>2. **Visit** your county clerk's office (or file online)</div>
          <div>3. **Pay** the small filing fee</div>
          <div>4. **Get** your certified D.B.A. certificate</div>
          <div>5. **Come back** here to deploy your ETHG recovery contract</div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 mb-2">Your ETHG Recovery Authority</h4>
          <div className="text-sm text-orange-700">
            Once your D.B.A. is filed, you'll have full legal authority to create the ETHGFixed contract to recover your trapped 1,990,000 tokens. The D.B.A. gives you business standing to deploy remediation contracts.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}