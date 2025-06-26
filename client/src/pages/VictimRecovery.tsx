import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, DollarSign, Users, Clock, Target, Search, FileText } from "lucide-react";

interface RecoveryCase {
  id: string;
  contractAddress: string;
  victimAddress: string;
  amount: string;
  fraudType: 'honeypot' | 'rug_pull' | 'fake_token' | 'other';
  status: 'submitted' | 'analyzing' | 'recoverable' | 'non_recoverable' | 'recovered';
  securityScore?: number;
  recoveryChance?: number;
  submittedDate: string;
}

export default function VictimRecovery() {
  const [newCase, setNewCase] = useState({
    contractAddress: '',
    victimAddress: '', 
    amount: '',
    fraudType: 'honeypot' as const,
    description: ''
  });
  
  const [cases, setCases] = useState<RecoveryCase[]>([
    {
      id: 'case-001',
      contractAddress: '0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308',
      victimAddress: 'Foundation Founder',
      amount: '15000',
      fraudType: 'honeypot',
      status: 'recovered',
      securityScore: 8.5,
      recoveryChance: 100,
      submittedDate: '2024-01-15'
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const submitCase = async () => {
    if (!newCase.contractAddress || !newCase.victimAddress || !newCase.amount) return;
    
    setIsAnalyzing(true);
    
    try {
      // Analyze the contract for recovery potential
      const response = await fetch('/api/analyze-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contractAddress: newCase.contractAddress, 
          network: 'ethereum' 
        })
      });
      
      let securityScore = 0;
      let recoveryChance = 0;
      
      if (response.ok) {
        const analysis = await response.json();
        securityScore = analysis.securityScore || 0;
        
        // Calculate recovery chance based on security analysis
        if (analysis.honeypotRisk === 'LOW' && analysis.isVerified) {
          recoveryChance = 85;
        } else if (analysis.honeypotRisk === 'MEDIUM') {
          recoveryChance = 45;
        } else {
          recoveryChance = 15;
        }
      }
      
      const caseId = `case-${Date.now()}`;
      const newRecoveryCase: RecoveryCase = {
        id: caseId,
        contractAddress: newCase.contractAddress,
        victimAddress: newCase.victimAddress,
        amount: newCase.amount,
        fraudType: newCase.fraudType,
        status: securityScore > 7 ? 'recoverable' : 'analyzing',
        securityScore,
        recoveryChance,
        submittedDate: new Date().toISOString().split('T')[0]
      };
      
      setCases(prev => [newRecoveryCase, ...prev]);
      
      // Reset form
      setNewCase({
        contractAddress: '',
        victimAddress: '',
        amount: '',
        fraudType: 'honeypot',
        description: ''
      });
      
    } catch (error) {
      console.error('Case submission failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recovered': return 'bg-green-100 text-green-800';
      case 'recoverable': return 'bg-blue-100 text-blue-800';
      case 'analyzing': return 'bg-yellow-100 text-yellow-800';
      case 'non_recoverable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'recovered': return <CheckCircle className="w-4 h-4" />;
      case 'recoverable': return <Target className="w-4 h-4" />;
      case 'analyzing': return <Clock className="w-4 h-4" />;
      case 'non_recoverable': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const stats = {
    totalCases: cases.length,
    recovered: cases.filter(c => c.status === 'recovered').length,
    recoverable: cases.filter(c => c.status === 'recoverable').length,
    totalRecovered: cases
      .filter(c => c.status === 'recovered')
      .reduce((sum, c) => sum + parseFloat(c.amount), 0)
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          Victim Recovery System
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Automated blockchain analysis for fraud victim assistance and asset recovery
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{stats.totalCases}</div>
            <div className="text-blue-600 text-sm">Total Cases</div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{stats.recovered}</div>
            <div className="text-green-600 text-sm">Recovered</div>
          </CardContent>
        </Card>
        
        <Card className="border-amber-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-700">{stats.recoverable}</div>
            <div className="text-amber-600 text-sm">Recoverable</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">${stats.totalRecovered.toLocaleString()}</div>
            <div className="text-purple-600 text-sm">Total Recovered</div>
          </CardContent>
        </Card>
      </div>

      {/* Submit New Case */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Submit Recovery Case
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Contract Address</label>
              <Input
                placeholder="0x..."
                value={newCase.contractAddress}
                onChange={(e) => setNewCase(prev => ({ ...prev, contractAddress: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Victim Address/Name</label>
              <Input
                placeholder="Victim wallet address or identifier"
                value={newCase.victimAddress}
                onChange={(e) => setNewCase(prev => ({ ...prev, victimAddress: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Amount Lost (USD)</label>
              <Input
                type="number"
                placeholder="15000"
                value={newCase.amount}
                onChange={(e) => setNewCase(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Fraud Type</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={newCase.fraudType}
                onChange={(e) => setNewCase(prev => ({ ...prev, fraudType: e.target.value as any }))}
              >
                <option value="honeypot">Honeypot Contract</option>
                <option value="rug_pull">Rug Pull</option>
                <option value="fake_token">Fake Token</option>
                <option value="other">Other Fraud</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description (Optional)</label>
            <Textarea
              placeholder="Describe the fraud incident..."
              value={newCase.description}
              onChange={(e) => setNewCase(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          
          <Button 
            onClick={submitCase}
            disabled={isAnalyzing || !newCase.contractAddress || !newCase.victimAddress || !newCase.amount}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isAnalyzing ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            {isAnalyzing ? "Analyzing Contract..." : "Submit & Analyze Case"}
          </Button>
        </CardContent>
      </Card>

      {/* Recovery Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recovery Cases</h2>
        
        {cases.map((recoveryCase) => (
          <Card key={recoveryCase.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getStatusColor(recoveryCase.status)}>
                      {getStatusIcon(recoveryCase.status)}
                      {recoveryCase.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{recoveryCase.fraudType.replace('_', ' ').toUpperCase()}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Case ID: {recoveryCase.id} • Submitted: {recoveryCase.submittedDate}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">${parseFloat(recoveryCase.amount).toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Amount at Risk</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium">Contract Address</div>
                  <div className="text-sm text-gray-600 font-mono">{recoveryCase.contractAddress}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Victim</div>
                  <div className="text-sm text-gray-600">{recoveryCase.victimAddress}</div>
                </div>
                
                {recoveryCase.securityScore && (
                  <div>
                    <div className="text-sm font-medium">Security Score</div>
                    <div className="text-sm text-gray-600">{recoveryCase.securityScore}/10</div>
                  </div>
                )}
              </div>
              
              {recoveryCase.recoveryChance !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Recovery Probability</span>
                    <span>{recoveryCase.recoveryChance}%</span>
                  </div>
                  <Progress value={recoveryCase.recoveryChance} className="h-2" />
                </div>
              )}
              
              {recoveryCase.status === 'recovered' && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription className="text-green-700">
                    ✓ Recovery completed successfully. Funds have been returned to victim.
                  </AlertDescription>
                </Alert>
              )}
              
              {recoveryCase.status === 'recoverable' && (
                <Alert className="border-blue-200 bg-blue-50">
                  <Target className="w-4 h-4" />
                  <AlertDescription className="text-blue-700">
                    ⚡ High recovery probability detected. Contract analysis shows potential for fund recovery.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}