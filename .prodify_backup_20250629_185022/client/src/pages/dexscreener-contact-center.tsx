import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail,
  MessageSquare,
  Copy,
  CheckCircle,
  ExternalLink,
  Send,
  FileText,
  Shield
} from "lucide-react";

export default function DexScreenerContactCenter() {
  const [copied, setCopied] = useState("");
  const [emailDraft, setEmailDraft] = useState("");

  const contractDetails = {
    honeypot: "0x0890f93a1fd344b3437ec10c1c14d1a581142c5f",
    recovery: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
    activeEthg: "0x3fC29836E84E471a053D2D9E80494A867D670EAD"
  };

  const contactChannels = [
    {
      platform: "Twitter/X",
      handle: "@dexscreener",
      url: "https://twitter.com/dexscreener",
      method: "Public mention or DM",
      priority: "High"
    },
    {
      platform: "Discord",
      server: "DEX Screener Community",
      url: "https://discord.gg/dexscreener",
      method: "Support ticket or admin contact",
      priority: "High"
    },
    {
      platform: "Telegram",
      group: "@dexscreener",
      url: "https://t.me/dexscreener",
      method: "Direct message to admins",
      priority: "Medium"
    },
    {
      platform: "Email",
      address: "support@dexscreener.com",
      url: "mailto:support@dexscreener.com",
      method: "Formal documentation request",
      priority: "Medium"
    }
  ];

  const emailTemplate = `Subject: Contract Classification Update Request - Legal Community Recovery

Dear DEX Screener Team,

I am writing to request an update to your contract classification for the following addresses:

ORIGINAL HONEYPOT CONTRACT (Currently flagged correctly):
• Address: ${contractDetails.honeypot}
• Status: Correctly flagged as honeypot
• Action: No change needed - this was indeed malicious

LEGAL RECOVERY CONTRACT (Needs classification update):
• Address: ${contractDetails.recovery}
• Token: ETHG Recovery Token (ETHGR)
• Purpose: Community protection and legal takeover
• Value: $648,740 worth of recovery tokens
• Status: Legitimate community protection effort

MARKET REFERENCE:
• Active ETHG trading: ${contractDetails.activeEthg}
• Price: $0.326 per token
• Purpose: Price reference for recovery value calculation

SITUATION SUMMARY:
Our team executed a legal community takeover of the honeypot contract ${contractDetails.honeypot} to protect investors. We deployed a recovery contract at ${contractDetails.recovery} that issued 1,990,000 ETHGR tokens worth $648,740 to affected community members.

This is a legitimate recovery operation, not a continuation of the original honeypot. The recovery contract:
1. Has transparent, verifiable source code
2. Successfully migrated trapped value to safe tokens
3. References legitimate market pricing from ${contractDetails.activeEthg}
4. Protects the community from further losses

REQUEST:
Please update your classification system to distinguish between:
- ${contractDetails.honeypot} (honeypot - correctly flagged)
- ${contractDetails.recovery} (legitimate recovery - should not be flagged)

We can provide additional documentation, contract verification, and community testimonials if needed.

VERIFICATION LINKS:
- Recovery Contract: https://etherscan.io/address/${contractDetails.recovery}
- Active ETHG Market: https://dexscreener.com/ethereum/${contractDetails.activeEthg}
- Original Honeypot: https://dexscreener.com/ethereum/${contractDetails.honeypot}

Thank you for your consideration in updating this classification to reflect the legitimate nature of our community protection efforts.

Best regards,
[Your Name]
ETHG Recovery Team

---
Contact: [Your Email]
Recovery Contract: ${contractDetails.recovery}
Community Value Protected: $648,740`;

  const twitterTemplate = `@dexscreener Hello! We need help updating contract classification. 

Our team legally took over honeypot ${contractDetails.honeypot.slice(0,10)}... and deployed recovery contract ${contractDetails.recovery.slice(0,10)}... to protect $648,740 in community value.

Recovery contract is legitimate - can we get classification updated? 

#CommunityProtection #DeFiSafety`;

  const discordTemplate = `**Contract Classification Update Request**

Hi DEX Screener team! 👋

**Situation:** 
- Original honeypot: \`${contractDetails.honeypot}\` (correctly flagged)
- Our recovery contract: \`${contractDetails.recovery}\` (needs update)

**Background:**
We executed a legal community takeover of the honeypot to protect investors. Our recovery contract issued $648,740 worth of ETHGR tokens to affected community members.

**Request:**
Please update classification to distinguish between the malicious original and our legitimate recovery effort.

**Verification:**
- Recovery contract: https://etherscan.io/address/${contractDetails.recovery}
- Market reference: https://dexscreener.com/ethereum/${contractDetails.activeEthg}

Can someone from your team help us get this updated? Happy to provide additional documentation!

Thanks! 🙏`;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Mail className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              DEX Screener Contact Center
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Update contract classification for your legitimate recovery operation
          </p>
        </div>

        {/* Urgency Alert */}
        <Alert className="border-orange-500 bg-orange-500/10">
          <Shield className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-orange-200 text-center">
            <strong>Classification Update Needed:</strong> DEX Screener needs to distinguish between the original honeypot and your legitimate recovery contract protecting $648,740 in community value.
          </AlertDescription>
        </Alert>

        {/* Contract Summary */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Contract Classification Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                  <h5 className="text-red-400 font-medium mb-2">Original Honeypot</h5>
                  <p className="text-white font-mono text-xs break-all mb-2">{contractDetails.honeypot}</p>
                  <Badge className="bg-red-600 text-white">Correctly Flagged</Badge>
                </div>
                
                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <h5 className="text-green-400 font-medium mb-2">Recovery Contract</h5>
                  <p className="text-white font-mono text-xs break-all mb-2">{contractDetails.recovery}</p>
                  <Badge className="bg-green-600 text-white">Needs Update</Badge>
                </div>
                
                <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h5 className="text-blue-400 font-medium mb-2">Active ETHG</h5>
                  <p className="text-white font-mono text-xs break-all mb-2">{contractDetails.activeEthg}</p>
                  <Badge className="bg-blue-600 text-white">Price Reference</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Channels */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Contact Channels</CardTitle>
            <CardDescription className="text-gray-400">
              Multiple ways to reach DEX Screener team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactChannels.map((channel, index) => (
                <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-blue-400 font-medium">{channel.platform}</h5>
                    <Badge className={`${
                      channel.priority === 'High' ? 'bg-red-600' : 'bg-orange-600'
                    } text-white`}>
                      {channel.priority}
                    </Badge>
                  </div>
                  <p className="text-white font-mono text-sm mb-2">{channel.handle || channel.address || channel.group}</p>
                  <p className="text-gray-300 text-xs mb-3">{channel.method}</p>
                  <Button 
                    onClick={() => window.open(channel.url, '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Contact via {channel.platform}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email Template */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Professional Email Template
              <Button 
                onClick={() => copyToClipboard(emailTemplate, "email")}
                className="bg-green-600 hover:bg-green-700"
              >
                {copied === "email" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Email
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={emailTemplate}
              readOnly
              className="font-mono text-sm h-96 bg-gray-900 text-green-400"
            />
          </CardContent>
        </Card>

        {/* Social Media Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Twitter Template */}
          <Card className="bg-gray-800/50 border-purple-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Twitter/X Template
                <Button 
                  onClick={() => copyToClipboard(twitterTemplate, "twitter")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {copied === "twitter" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Tweet
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={twitterTemplate}
                readOnly
                className="font-mono text-sm h-32 bg-gray-900 text-purple-400"
              />
            </CardContent>
          </Card>

          {/* Discord Template */}
          <Card className="bg-gray-800/50 border-orange-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Discord Template
                <Button 
                  onClick={() => copyToClipboard(discordTemplate, "discord")}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {copied === "discord" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Message
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={discordTemplate}
                readOnly
                className="font-mono text-sm h-32 bg-gray-900 text-orange-400"
              />
            </CardContent>
          </Card>
        </div>

        {/* Action Plan */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">Recommended Action Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <div className="w-6 h-6 rounded-full bg-yellow-600 text-white font-bold flex items-center justify-center text-sm">1</div>
                <p className="text-gray-300">Start with Twitter mention for quick visibility</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <div className="w-6 h-6 rounded-full bg-yellow-600 text-white font-bold flex items-center justify-center text-sm">2</div>
                <p className="text-gray-300">Follow up with Discord support ticket for detailed explanation</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <div className="w-6 h-6 rounded-full bg-yellow-600 text-white font-bold flex items-center justify-center text-sm">3</div>
                <p className="text-gray-300">Send formal email with complete documentation</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <div className="w-6 h-6 rounded-full bg-yellow-600 text-white font-bold flex items-center justify-center text-sm">4</div>
                <p className="text-gray-300">Provide additional verification if requested</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supporting Documentation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-lg py-8"
            onClick={() => window.open(`https://etherscan.io/address/${contractDetails.recovery}`, '_blank')}
          >
            <FileText className="h-6 w-6 mr-2" />
            Recovery Contract
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-lg py-8"
            onClick={() => window.open(`https://dexscreener.com/ethereum/${contractDetails.activeEthg}`, '_blank')}
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            Active ETHG
          </Button>
          
          <Button 
            className="bg-red-600 hover:bg-red-700 text-lg py-8"
            onClick={() => window.open(`https://dexscreener.com/ethereum/${contractDetails.honeypot}`, '_blank')}
          >
            <Shield className="h-6 w-6 mr-2" />
            Original Honeypot
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-lg py-8"
            onClick={() => window.open('/honeypot-recovery-success', '_self')}
          >
            <MessageSquare className="h-6 w-6 mr-2" />
            Full Documentation
          </Button>
        </div>

        {/* Success Indicator */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center">
            <strong>Ready to Contact:</strong> All templates prepared with accurate contract addresses and community protection documentation. Time to update DEX Screener classification!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}