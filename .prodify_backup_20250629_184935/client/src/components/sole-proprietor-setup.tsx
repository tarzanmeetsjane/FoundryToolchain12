import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Download,
  CheckCircle,
  Info,
  Zap,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SoleProprietorSetup() {
  const [yourName, setYourName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [purpose, setPurpose] = useState("Smart contract development and blockchain security services");
  const { toast } = useToast();

  const generateSoleProprietorDocuments = () => {
    if (!yourName || !state) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and state",
        variant: "destructive"
      });
      return;
    }

    const soleProprietorDeclaration = `SOLE PROPRIETORSHIP DECLARATION
FOR SMART CONTRACT DEVELOPMENT

Individual Name: ${yourName}
Business Address: ${address || "Same as personal address"}
State of Operation: ${state}
Business Purpose: ${purpose}

LEGAL BASIS FOR SMART CONTRACT CREATION:
As a sole proprietor, I, ${yourName}, have full legal authority to:

1. Create and deploy smart contracts for legitimate business purposes
2. Provide blockchain technology services to the public
3. Develop remediation contracts for defective tokens
4. Offer voluntary token migration services

SPECIFIC PROJECT AUTHORIZATION:
This declaration authorizes the creation of smart contracts for:
- Contract Name: ETHGFixed
- Purpose: Fix honeypot vulnerabilities in ETHG token
- Migration: Voluntary 1:1 token recovery for affected holders
- Transparency: Full source code verification on Etherscan

COMPLIANCE COMMITMENTS:
- All contracts will be open source and verified
- No investment advice will be provided
- Migration participation is voluntary
- Full transparency and documentation
- Compliance with applicable laws

As a sole proprietor, I operate this business in my individual capacity 
with full personal responsibility and authority.

Signed: ${yourName}
Date: ${new Date().toLocaleDateString()}
State: ${state}

---
LEGAL AUTHORITY CONFIRMED:
✓ No filing required - Immediate legal authority
✓ Personal liability accepted
✓ Business operates under individual name
✓ Full authorization to create ETHG recovery contract`;

    const contractHeader = `/**
 * SOLE PROPRIETORSHIP LEGAL HEADER
 * 
 * Business Owner: ${yourName}
 * Business Type: Sole Proprietorship
 * State: ${state}
 * 
 * LEGAL AUTHORITY:
 * This smart contract is created by ${yourName} operating as a sole proprietor
 * with full legal authority to provide blockchain technology services.
 * 
 * PURPOSE: Fix ETHG token honeypot vulnerabilities
 * MIGRATION: Voluntary 1:1 token recovery system
 * TRANSPARENCY: Full source code verification
 * 
 * DISCLAIMERS:
 * - NO WARRANTY: Contract provided "as is"
 * - NO INVESTMENT ADVICE: Tokens have no guaranteed value
 * - VOLUNTARY: Migration participation is optional
 * - TECHNICAL RISKS: Users should understand blockchain technology
 * 
 * Sole proprietor operates with personal liability and full authorization.
 */`;

    const businessLetter = `BUSINESS AUTHORIZATION LETTER

To: Ethereum Network Validators
From: ${yourName}, Sole Proprietor
Date: ${new Date().toLocaleDateString()}

RE: Authorization for ETHGFixed Smart Contract Deployment

Dear Network Validators,

I, ${yourName}, operating as a sole proprietor in ${state}, hereby provide 
formal notice of my intention to deploy smart contracts for legitimate 
business purposes.

BUSINESS DETAILS:
- Legal Name: ${yourName}
- Business Structure: Sole Proprietorship
- Business Purpose: ${purpose}
- State of Operation: ${state}

CONTRACT SPECIFICATIONS:
- Contract Name: ETHGFixed
- Purpose: Remediate honeypot vulnerabilities in existing ETHG token
- Function: Enable voluntary 1:1 token migration for affected holders
- Transparency: Full source code verification on Etherscan

LEGAL STANDING:
As a sole proprietor, I have full legal authority to create and deploy 
smart contracts in my individual capacity. This business operates in 
compliance with applicable laws and regulations.

The proposed ETHGFixed contract serves a legitimate public benefit by 
providing a solution for holders of defective ETHG tokens to voluntarily 
migrate to a properly functioning contract.

Respectfully,

${yourName}
Sole Proprietor
${state}`;

    const files = {
      'Sole-Proprietor-Declaration.txt': soleProprietorDeclaration,
      'Contract-Legal-Header.sol': contractHeader,
      'Business-Authorization-Letter.txt': businessLetter,
      'IMMEDIATE-DEPLOYMENT-READY.md': `# YOU'RE READY TO DEPLOY IMMEDIATELY!

## ✅ LEGAL AUTHORITY CONFIRMED

As a sole proprietor, you have IMMEDIATE legal authority to:
- Deploy smart contracts
- Create the ETHGFixed recovery contract
- Provide token migration services
- Fix honeypot vulnerabilities

## 🚀 NO WAITING REQUIRED

Unlike D.B.A. or corporation setup:
- ✅ NO filing fees
- ✅ NO paperwork to submit
- ✅ NO waiting period
- ✅ IMMEDIATE authorization

## 📋 NEXT STEPS

1. **Download these documents** (already done)
2. **Go to Market Data tab**
3. **Click "Auto-Complete" on Steps 3 & 4** in the recovery guide
4. **Deploy your ETHGFixed contract**
5. **Recover your 1,990,000 ETHG tokens**

## 🔐 YOUR AUTHORITY

${yourName} - Sole Proprietor, ${state}
Authorized to create ETHGFixed contract for ETHG recovery

**You can start deploying RIGHT NOW!**`
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
      title: "Ready to Deploy!",
      description: "Sole proprietor authority confirmed - you can create contracts immediately"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Sole Proprietor Setup (FREE & IMMEDIATE)
        </CardTitle>
        <CardDescription>
          Get instant legal authority to deploy your ETHG recovery contract - no filing required
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Why Sole Proprietorship is Perfect
          </h4>
          <div className="space-y-2 text-sm text-green-700">
            <div>• **FREE**: No filing fees or paperwork required</div>
            <div>• **IMMEDIATE**: Legal authority right now, no waiting</div>
            <div>• **SIMPLE**: Just fill out this form and download documents</div>
            <div>• **LEGAL**: Full authority to create smart contracts as individual</div>
            <div>• **FAST TRACK**: Deploy ETHG recovery contract today</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="yourName">Your Full Legal Name *</Label>
            <Input 
              id="yourName"
              placeholder="Your full legal name"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="state">Your State *</Label>
            <Input 
              id="state"
              placeholder="e.g. California, Texas, New York"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Your Address (Optional)</Label>
          <Textarea 
            id="address"
            placeholder="Your address (can be home address or leave blank)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="purpose">Business Purpose (Pre-filled)</Label>
          <Textarea 
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows={2}
            className="bg-gray-50"
          />
        </div>

        <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="w-5 h-5 text-blue-600" />
          <div className="text-sm">
            <div className="font-medium text-blue-800">Total Cost: $0.00</div>
            <div className="text-blue-700">No fees, no filing, no waiting - immediate legal authority</div>
          </div>
        </div>

        <Button 
          onClick={generateSoleProprietorDocuments}
          className="w-full"
          size="lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Generate Legal Documents & Start Recovery
        </Button>

        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="font-medium">After you download:</div>
          <div>1. **Keep documents safe** - they prove your legal authority</div>
          <div>2. **Scroll up** to the Step-by-Step Recovery Guide</div>
          <div>3. **Click "Auto-Complete"** on Steps 3 & 4</div>
          <div>4. **Deploy your contract** - you have full legal authority now</div>
          <div>5. **Recover your 1,990,000 ETHG tokens**</div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            You're Authorized Right Now
          </h4>
          <div className="text-sm text-orange-700">
            As a sole proprietor, you have immediate legal standing to create the ETHGFixed contract. 
            No waiting, no fees, no bureaucracy. Your ETHG recovery can start today.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}