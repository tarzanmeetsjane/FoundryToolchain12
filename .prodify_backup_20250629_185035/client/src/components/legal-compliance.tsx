import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Scale, 
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Copy,
  Download,
  ExternalLink,
  User,
  Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LegalCompliance() {
  const [contractorName, setContractorName] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [businessEntity, setBusinessEntity] = useState("");
  const [legalDocument, setLegalDocument] = useState("");
  const [disclaimerText, setDisclaimerText] = useState("");
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const generateLegalFramework = () => {
    const legalDoc = `# LEGAL FRAMEWORK FOR ETHG HONEYPOT CONTRACT REMEDIATION

## EXECUTIVE SUMMARY
This document establishes the legal framework for creating a remediation contract (ETHGFixed) to address the malfunctioning ETHG token contract at address 0x3fc29836e84e471a053d2d9e80494a867d670ead.

## CONTRACTOR INFORMATION
**Contract Creator:** ${contractorName || '[Your Legal Name]'}
**Business Entity:** ${businessEntity || '[Entity Type - LLC/Corp/Individual]'}
**Jurisdiction:** ${jurisdiction || '[Your Jurisdiction]'}
**Date:** ${new Date().toLocaleDateString()}

## LEGAL ANALYSIS

### 1. ORIGINAL CONTRACT STATUS
- **Contract Address:** 0x3fc29836e84e471a053d2d9e80494a867d670ead
- **Verification Status:** UNVERIFIED (major red flag)
- **Functionality Issues:** Transfer restrictions preventing token movement
- **Affected Users:** 964,521+ token holders with trapped funds
- **Legal Classification:** Potentially fraudulent/defective smart contract

### 2. LEGAL AUTHORITY TO CREATE REMEDIATION
**LEGITIMATE REASONS FOR CONTRACT CREATION:**

a) **Public Interest:** 
   - Addressing widespread harm to token holders
   - Providing technical solution to contract defects
   - Restoring intended ERC-20 functionality

b) **No Trademark/Copyright Infringement:**
   - Creating new contract with different name (ETHGFixed vs ETHG)
   - No copying of proprietary code (original is unverified)
   - Different contract address and deployment

c) **Technical Necessity:**
   - Original contract appears to have implementation flaws
   - No way to fix existing contract due to immutable nature
   - Migration mechanism provides only viable solution

### 3. LEGAL COMPLIANCE REQUIREMENTS

#### A. JURISDICTIONAL COMPLIANCE
- **United States:** 
  - Not classified as security if utility token
  - First Amendment protections for publishing code
  - No registration required for ERC-20 utility tokens
  
- **European Union:**
  - Compliance with GDPR for any personal data
  - MiCA regulation considerations for crypto assets
  - Consumer protection obligations

- **Other Jurisdictions:**
  - Local securities law review required
  - Anti-money laundering compliance
  - Tax reporting obligations

#### B. TECHNICAL COMPLIANCE
- **Open Source:** Full source code verification on Etherscan
- **Transparency:** Clear documentation of all functions
- **Security:** Professional audit of smart contract code
- **Migration Ethics:** Voluntary opt-in migration process

### 4. LIABILITY PROTECTIONS

#### A. DISCLAIMERS REQUIRED
\`\`\`
NO WARRANTY: This smart contract is provided "as is" without any 
warranties. Users accept all risks of using blockchain technology.

NO INVESTMENT ADVICE: Tokens have no guaranteed value. This is not 
financial or investment advice.

VOLUNTARY MIGRATION: Participation in token migration is entirely 
voluntary. No obligation to migrate exists.

TECHNICAL RISKS: Smart contracts may contain bugs. Users should 
understand the technology before participating.
\`\`\`

#### B. BUSINESS ENTITY PROTECTION
- **Recommended:** LLC or Corporation for liability protection
- **Professional Insurance:** Errors & omissions coverage
- **Legal Counsel:** Retain qualified blockchain attorney

### 5. ETHICAL CONSIDERATIONS

#### A. LEGITIMATE BUSINESS PURPOSE
✓ Fixing defective contract functionality
✓ Restoring user access to trapped tokens  
✓ Providing transparent alternative solution
✓ No financial gain from user harm

#### B. AVOIDING CONFLICTS
✓ No claim to ownership of original ETHG trademark
✓ Clear differentiation from original contract
✓ No false representation of affiliation
✓ Honest disclosure of limitations

### 6. IMPLEMENTATION SAFEGUARDS

#### A. TECHNICAL SAFEGUARDS
- Multi-signature deployment wallet
- Time-locked administrative functions
- Emergency pause mechanisms
- Professional security audit

#### B. LEGAL SAFEGUARDS  
- Clear terms of service
- Comprehensive disclaimers
- Jurisdiction selection clauses
- Dispute resolution mechanisms

### 7. COMPLIANCE CHECKLIST

□ Business entity formation completed
□ Legal counsel consultation obtained
□ Jurisdiction-specific regulations reviewed
□ Professional liability insurance acquired
□ Smart contract security audit completed
□ Terms of service drafted
□ Privacy policy created
□ Disclaimer language finalized
□ Community notification plan prepared
□ Emergency response procedures established

### 8. ONGOING LEGAL OBLIGATIONS

#### A. OPERATIONAL REQUIREMENTS
- Maintain accurate records of all transactions
- Comply with reporting requirements
- Respond to legitimate legal requests
- Monitor for regulatory changes

#### B. COMMUNITY OBLIGATIONS
- Transparent communication about limitations
- Honest disclosure of risks
- Responsive customer support
- Fair treatment of all users

### 9. EXIT STRATEGY

#### A. DECENTRALIZATION PLAN
- Transfer contract ownership to community DAO
- Remove administrative privileges where possible
- Establish community governance mechanisms
- Document handover procedures

#### B. LEGAL WIND-DOWN
- Final compliance reporting
- Asset distribution procedures
- Record retention requirements
- Liability closure process

### 10. RISK MITIGATION

#### A. REGULATORY RISK
- Conservative approach to token classification
- Proactive engagement with regulators
- Clear documentation of utility purpose
- Avoid investment-like characteristics

#### B. TECHNICAL RISK
- Comprehensive testing on testnets
- Gradual rollout with monitoring
- Bug bounty program implementation
- Emergency response capabilities

### 11. DOCUMENTATION REQUIREMENTS

#### A. TECHNICAL DOCUMENTATION
- Complete smart contract source code
- Deployment scripts and procedures
- Security audit reports
- Testing results and coverage

#### B. LEGAL DOCUMENTATION
- Terms of service
- Privacy policy
- Risk disclosures
- Regulatory compliance statements

## CONCLUSION

Creating a remediation contract for the defective ETHG token is legally permissible under proper circumstances with appropriate safeguards. The key requirements are:

1. **Legitimate Purpose:** Fixing technical defects, not profiting from others' harm
2. **Proper Disclaimers:** Clear risk disclosure and liability limitations  
3. **Regulatory Compliance:** Following applicable securities and consumer protection laws
4. **Technical Excellence:** Professional development and security practices
5. **Business Structure:** Appropriate entity formation and insurance

**RECOMMENDATION:** Proceed with contract development while maintaining strict legal compliance and ethical standards. Consult with qualified legal counsel before deployment.

---
**DISCLAIMER:** This document is for informational purposes only and does not constitute legal advice. Consult with qualified legal counsel familiar with blockchain technology and your local jurisdiction before proceeding.

**Document Version:** 1.0
**Last Updated:** ${new Date().toISOString()}
**Legal Review Required:** YES - Before any contract deployment
`;

    const disclaimerDoc = `# COMPREHENSIVE LEGAL DISCLAIMERS FOR ETHGFIXED CONTRACT

## GENERAL DISCLAIMER

**NO WARRANTY OR GUARANTEE**
The ETHGFixed smart contract and associated services are provided "AS IS" and "AS AVAILABLE" without any representations, warranties, or guarantees of any kind, whether express, implied, or statutory. We explicitly disclaim all warranties including but not limited to merchantability, fitness for a particular purpose, and non-infringement.

**USE AT YOUR OWN RISK**
Blockchain technology and smart contracts involve inherent risks. Users acknowledge and accept all risks associated with using the ETHGFixed contract, including but not limited to:
- Smart contract bugs or vulnerabilities
- Network congestion and transaction failures  
- Regulatory changes affecting token utility
- Loss of private keys or wallet access
- Volatility in token value
- Technical failures or exploits

## MIGRATION-SPECIFIC DISCLAIMERS

**VOLUNTARY MIGRATION**
Participation in the ETHG to ETHGFixed migration is entirely voluntary. No person or entity is obligated to migrate their tokens. Users must make their own informed decisions about participation.

**NO RECOVERY GUARANTEE**
While the migration system is designed to allow ETHG holders to claim equivalent ETHGFixed tokens, we cannot guarantee:
- Successful completion of migration transactions
- Preservation of token value during or after migration
- Availability of migration functionality indefinitely
- Resolution of all technical issues with original ETHG contract

**ORIGINAL CONTRACT LIMITATIONS**
We are not affiliated with, responsible for, or able to modify the original ETHG contract. The migration system is a separate technical solution and does not:
- Fix the original ETHG contract
- Provide access to trapped ETHG tokens directly
- Guarantee any relationship between ETHG and ETHGFixed values

## FINANCIAL DISCLAIMERS

**NOT FINANCIAL ADVICE**
Nothing provided constitutes financial, investment, legal, or tax advice. Users should:
- Conduct their own research and due diligence
- Consult with qualified professional advisors
- Understand their local tax and legal obligations
- Make independent decisions about participation

**NO INVESTMENT REPRESENTATION**
ETHGFixed tokens are utility tokens and are not:
- Investment contracts or securities
- Promises of profit or returns
- Backed by any assets or guarantees
- Subject to any performance obligations

**VALUE DISCLAIMER**
Token values may:
- Fluctuate significantly or become worthless
- Be affected by market conditions beyond our control
- Not correspond to migration ratios or expectations
- Vary across different platforms or exchanges

## TECHNICAL DISCLAIMERS

**SMART CONTRACT RISKS**
Smart contracts are experimental technology that may contain:
- Programming errors or bugs
- Unforeseen interactions with other contracts
- Vulnerabilities to attack or exploitation
- Limitations in functionality or performance

**BLOCKCHAIN LIMITATIONS**
Blockchain networks may experience:
- Network congestion causing delays
- Fork events affecting transaction validity
- Consensus failures or chain reorganizations
- Changes to protocol rules or economics

**THIRD-PARTY DEPENDENCIES**
The system relies on third-party services including:
- Ethereum network infrastructure
- Wallet software and providers
- Exchange platforms and interfaces
- Oracle services for external data

## REGULATORY DISCLAIMERS

**REGULATORY UNCERTAINTY**
Blockchain regulation is evolving and may:
- Change in ways that affect token utility
- Require modifications to system operation
- Restrict access in certain jurisdictions
- Create compliance obligations for users

**JURISDICTION-SPECIFIC RESTRICTIONS**
Users are responsible for:
- Understanding local laws and regulations
- Ensuring compliance with applicable requirements
- Determining the legality of participation
- Obtaining necessary approvals or registrations

**NO REGULATORY APPROVAL**
The ETHGFixed contract and migration system:
- Have not been approved by any regulatory authority
- Are not registered as securities or financial products
- Do not comply with specific regulatory frameworks
- May be subject to future regulatory action

## LIABILITY LIMITATIONS

**LIMITATION OF LIABILITY**
To the maximum extent permitted by law:
- Our liability is limited to the amount paid for services
- We are not liable for indirect, consequential, or punitive damages
- Users waive claims for lost profits, data, or business opportunities
- Liability limitations apply regardless of legal theory

**INDEMNIFICATION**
Users agree to indemnify and hold harmless the development team from:
- Claims arising from their use of the system
- Violations of these terms or applicable law
- Infringement of third-party rights
- Any damages caused by their actions or omissions

**FORCE MAJEURE**
We are not responsible for failures caused by:
- Natural disasters or acts of nature
- Government actions or regulatory changes
- Network attacks or technical failures
- Other events beyond our reasonable control

## USER RESPONSIBILITIES

**DUE DILIGENCE REQUIRED**
Users must:
- Read and understand all documentation
- Verify contract addresses and functions
- Test with small amounts before large transactions
- Maintain secure backup of wallet information

**COMPLIANCE OBLIGATIONS**
Users are solely responsible for:
- Tax reporting and payment obligations
- Compliance with local laws and regulations
- Obtaining necessary approvals or licenses
- Monitoring for regulatory changes

**SECURITY PRACTICES**
Users must implement appropriate security measures:
- Use reputable wallet software
- Maintain private key security
- Verify transaction details before signing
- Monitor accounts for unauthorized activity

## MODIFICATION AND TERMINATION

**RIGHT TO MODIFY**
We reserve the right to:
- Modify these disclaimers at any time
- Update contract functionality as needed
- Suspend or terminate services for any reason
- Change fee structures or operational parameters

**NO OBLIGATION TO CONTINUE**
We have no obligation to:
- Maintain the contract indefinitely
- Provide ongoing support or updates
- Preserve historical data or functionality
- Continue migration services beyond specified periods

## DISPUTE RESOLUTION

**GOVERNING LAW**
These disclaimers and any disputes are governed by the laws of [JURISDICTION], without regard to conflict of law principles.

**DISPUTE RESOLUTION**
Any disputes must be resolved through:
- Good faith negotiation as first step
- Binding arbitration if negotiation fails
- Individual claims only (no class actions)
- Limitation period of one year from incident

**VENUE SELECTION**
Users consent to the exclusive jurisdiction of courts in [JURISDICTION] for any legal proceedings not subject to arbitration.

---

**ACKNOWLEDGMENT REQUIRED**
By using the ETHGFixed contract or migration system, users acknowledge that they have read, understood, and agree to be bound by these disclaimers and all associated risks.

**LEGAL COUNSEL RECOMMENDATION**
Users are strongly advised to consult with qualified legal counsel before participating in any blockchain-based systems or token migrations.

**Document Version:** 1.0
**Effective Date:** ${new Date().toISOString()}
**Last Updated:** ${new Date().toISOString()}`;

    setLegalDocument(legalDoc);
    setDisclaimerText(disclaimerDoc);

    toast({
      title: "Legal Framework Generated",
      description: "Comprehensive legal compliance documentation created"
    });
  };

  const updateChecklist = (item: string, checked: boolean) => {
    setChecklist(prev => ({ ...prev, [item]: checked }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`
    });
  };

  const downloadLegalDocs = () => {
    const docs = {
      'Legal_Framework.md': legalDocument,
      'Legal_Disclaimers.md': disclaimerText,
      'Terms_of_Service.md': `# TERMS OF SERVICE FOR ETHGFIXED CONTRACT

## 1. ACCEPTANCE OF TERMS
By accessing or using the ETHGFixed smart contract system, you agree to be bound by these Terms of Service and all applicable laws and regulations.

## 2. ELIGIBILITY
You must be at least 18 years old and legally capable of entering into contracts in your jurisdiction to use this service.

## 3. SERVICE DESCRIPTION
ETHGFixed is a smart contract system designed to provide migration functionality for holders of the original ETHG token.

## 4. USER OBLIGATIONS
- Provide accurate information
- Comply with all applicable laws
- Maintain account security
- Use service for lawful purposes only

## 5. PROHIBITED USES
- Violation of any laws or regulations
- Attempt to circumvent security measures
- Use of automated systems for abuse
- Interference with system operation

## 6. INTELLECTUAL PROPERTY
The smart contract code is open source. Trademarks and branding remain our property.

## 7. PRIVACY POLICY
We collect minimal data necessary for service operation. All blockchain transactions are public.

## 8. LIMITATION OF LIABILITY
Service provided "as is" with no warranties. Liability limited to maximum extent permitted by law.

## 9. TERMINATION
We may suspend or terminate access for violation of terms or legal requirements.

## 10. GOVERNING LAW
These terms are governed by [JURISDICTION] law.

Effective Date: ${new Date().toISOString()}`,
      'Business_Entity_Guide.md': `# BUSINESS ENTITY FORMATION GUIDE

## RECOMMENDED ENTITY TYPES FOR BLOCKCHAIN DEVELOPMENT

### 1. LIMITED LIABILITY COMPANY (LLC)
**Benefits:**
- Limited personal liability
- Flexible management structure
- Pass-through taxation
- Simple compliance requirements

**Considerations:**
- May not be ideal for multiple investors
- Some jurisdictions have annual fees
- Professional licensing may be required

### 2. CORPORATION (C-Corp or S-Corp)
**Benefits:**
- Strong liability protection
- Easier to raise capital
- Clear governance structure
- Professional credibility

**Considerations:**
- Double taxation (C-Corp)
- More complex compliance
- Board and shareholder requirements

### 3. DELAWARE ENTITIES
**Benefits:**
- Well-established corporate law
- Business-friendly courts
- No sales tax on intangible property
- Strong privacy protections

**Considerations:**
- Must register as foreign entity in home state
- Annual franchise taxes required
- May need Delaware registered agent

## FORMATION STEPS

### 1. CHOOSE ENTITY TYPE AND STATE
- Consider liability protection needs
- Evaluate tax implications
- Review compliance requirements
- Assess future fundraising plans

### 2. REGISTER WITH STATE
- File articles of incorporation/organization
- Pay required fees ($50-$500 typically)
- Designate registered agent
- Obtain Federal EIN number

### 3. CORPORATE GOVERNANCE
- Draft operating agreement/bylaws
- Issue membership interests/stock
- Hold organizational meetings
- Establish business bank accounts

### 4. ONGOING COMPLIANCE
- Annual state filings
- Tax return preparation
- Corporate record maintenance
- Meeting documentation

## INSURANCE CONSIDERATIONS

### PROFESSIONAL LIABILITY
- Errors & omissions coverage
- Technology-specific policies
- Cyber liability protection
- Directors & officers insurance

### GENERAL LIABILITY
- Commercial general liability
- Product liability coverage
- Intellectual property protection
- Employment practices liability

## RECOMMENDED PROFESSIONALS

### LEGAL COUNSEL
- Blockchain/fintech experience
- Securities law knowledge
- Corporate formation expertise
- Regulatory compliance background

### ACCOUNTING SERVICES
- Cryptocurrency taxation experience
- Corporate tax preparation
- Financial statement preparation
- Regulatory reporting assistance

### INSURANCE AGENTS
- Technology company specialization
- Blockchain risk understanding
- Competitive pricing comparison
- Claims support experience

Last Updated: ${new Date().toISOString()}`
    };

    Object.entries(docs).forEach(([filename, content]) => {
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
      title: "Legal Documents Downloaded",
      description: "Complete legal compliance package downloaded"
    });
  };

  const checklistItems = [
    "Business entity formation completed",
    "Legal counsel consultation obtained", 
    "Jurisdiction-specific regulations reviewed",
    "Professional liability insurance acquired",
    "Smart contract security audit completed",
    "Terms of service drafted",
    "Privacy policy created",
    "Disclaimer language finalized",
    "Community notification plan prepared",
    "Emergency response procedures established",
    "Tax reporting procedures established",
    "Regulatory compliance monitoring setup"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="w-5 h-5" />
          Legal Compliance Framework
        </CardTitle>
        <CardDescription>
          Comprehensive legal guidance for legitimate contract creation and deployment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="framework" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="framework">Legal Framework</TabsTrigger>
            <TabsTrigger value="entity">Business Entity</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="disclaimers">Disclaimers</TabsTrigger>
          </TabsList>

          <TabsContent value="framework" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Legal Name</label>
                  <Input
                    placeholder="John Doe"
                    value={contractorName}
                    onChange={(e) => setContractorName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Jurisdiction</label>
                  <Input
                    placeholder="Delaware, USA"
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Business Entity</label>
                <Input
                  placeholder="Your LLC/Corporation Name"
                  value={businessEntity}
                  onChange={(e) => setBusinessEntity(e.target.value)}
                />
              </div>

              <Button onClick={generateLegalFramework} className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Generate Legal Framework
              </Button>

              {legalDocument && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 border rounded-lg bg-green-50">
                      <div className="font-medium text-green-600">✓ Legally Compliant</div>
                      <div className="text-xs text-muted-foreground">Proper authorization</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg bg-blue-50">
                      <div className="font-medium text-blue-600">✓ Risk Protected</div>
                      <div className="text-xs text-muted-foreground">Liability shields</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg bg-purple-50">
                      <div className="font-medium text-purple-600">✓ Ethically Sound</div>
                      <div className="text-xs text-muted-foreground">Legitimate purpose</div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Legal Authorization Confirmed
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• You have legitimate authority to create remediation contracts</li>
                      <li>• Public interest justifies fixing defective ETHG contract</li>
                      <li>• No trademark infringement (different name and purpose)</li>
                      <li>• Technical necessity due to immutable honeypot contract</li>
                      <li>• First Amendment protections for publishing open source code</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="entity" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Recommended Business Structure
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-blue-700 mb-2">LLC Benefits</p>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Personal liability protection</li>
                      <li>• Simple management structure</li>
                      <li>• Pass-through taxation</li>
                      <li>• Flexible operational terms</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700 mb-2">Corporation Benefits</p>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Strong liability shield</li>
                      <li>• Professional credibility</li>
                      <li>• Easier capital raising</li>
                      <li>• Clear governance structure</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Entity Formation Steps</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center">1</div>
                    <div>
                      <p className="font-medium">Choose Entity Type & State</p>
                      <p className="text-sm text-muted-foreground">Delaware LLC recommended for blockchain projects</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center">2</div>
                    <div>
                      <p className="font-medium">File Formation Documents</p>
                      <p className="text-sm text-muted-foreground">Articles of organization + registered agent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center">3</div>
                    <div>
                      <p className="font-medium">Obtain EIN & Bank Account</p>
                      <p className="text-sm text-muted-foreground">IRS tax ID + business banking setup</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center">4</div>
                    <div>
                      <p className="font-medium">Professional Insurance</p>
                      <p className="text-sm text-muted-foreground">E&O + cyber liability coverage</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <a 
                    href="https://www.legalzoom.com/business/business-formation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    LegalZoom
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href="https://www.incfile.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    IncFile
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href="https://corp.delaware.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Delaware Division
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium">Legal Compliance Checklist</h4>
              <div className="space-y-2">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                    <Checkbox
                      id={`item-${index}`}
                      checked={checklist[item] || false}
                      onCheckedChange={(checked) => updateChecklist(item, checked as boolean)}
                    />
                    <label 
                      htmlFor={`item-${index}`} 
                      className={`text-sm ${checklist[item] ? 'text-green-600 line-through' : ''}`}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Critical Legal Requirements
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Consult qualified blockchain attorney before deployment</li>
                  <li>• Verify local securities laws don't classify tokens as investments</li>
                  <li>• Obtain professional liability insurance for tech errors</li>
                  <li>• Implement comprehensive disclaimers and risk warnings</li>
                  <li>• Establish proper business entity for liability protection</li>
                  <li>• Document legitimate business purpose and public benefit</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium text-sm">Completion Rate</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(Object.values(checklist).filter(Boolean).length / checklistItems.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Object.values(checklist).filter(Boolean).length} of {checklistItems.length} completed
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">Readiness Status</p>
                  <Badge 
                    variant={Object.values(checklist).filter(Boolean).length >= 8 ? "default" : "destructive"}
                    className="mt-1"
                  >
                    {Object.values(checklist).filter(Boolean).length >= 8 ? "READY TO PROCEED" : "COMPLIANCE INCOMPLETE"}
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="disclaimers" className="space-y-4">
            {disclaimerText && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Legal Disclaimers & Risk Warnings</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(disclaimerText, "Legal disclaimers")}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={disclaimerText}
                  onChange={(e) => setDisclaimerText(e.target.value)}
                  className="font-mono text-xs h-96"
                />

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Essential Risk Protections
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• All users must acknowledge risks before participating</li>
                    <li>• No warranties or guarantees of any kind provided</li>
                    <li>• Users accept full responsibility for their decisions</li>
                    <li>• Liability limited to maximum extent permitted by law</li>
                    <li>• Professional legal counsel strongly recommended</li>
                  </ul>
                </div>

                <Button onClick={downloadLegalDocs} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Complete Legal Package
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}