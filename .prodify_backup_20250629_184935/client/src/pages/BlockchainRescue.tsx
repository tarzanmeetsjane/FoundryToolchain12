import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, DollarSign, Users, Clock, Target } from "lucide-react";

interface RescueOperation {
  id: string;
  victimAddress: string;
  amount: string;
  currency: string;
  status: 'pending' | 'verified' | 'rescued' | 'distributed';
  fraudType: string;
  reportedDate: string;
  rescueProgress: number;
}

export default function BlockchainRescue() {
  const [activeRescues, setActiveRescues] = useState<RescueOperation[]>([
    {
      id: "foundation-case",
      victimAddress: "Foundation Founder",
      amount: "15000",
      currency: "USD", 
      status: "rescued",
      fraudType: "Token Honeypot",
      reportedDate: "2024-01-01",
      rescueProgress: 100
    },
    {
      id: "2", 
      victimAddress: "0x2345...6789",
      amount: "8500",
      currency: "USD",
      status: "verified",
      fraudType: "Liquidity Rug Pull",
      reportedDate: "2024-12-20",
      rescueProgress: 75
    },
    {
      id: "3",
      victimAddress: "0x3456...7890",
      amount: "22000",
      currency: "USD",
      status: "pending",
      fraudType: "Fake Exchange",
      reportedDate: "2024-12-23",
      rescueProgress: 25
    }
  ]);

  const [foundationStats, setFoundationStats] = useState({
    totalRescued: 127450,
    victimsHelped: 89,
    activeInvestigations: 12,
    successRate: 78,
    averageRecovery: 14300,
    responseTime: 24 // hours
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rescued': return 'bg-green-100 text-green-800 border-green-200';
      case 'verified': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'distributed': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFraudTypeIcon = (fraudType: string) => {
    if (fraudType.includes('Honeypot')) return <Target className="w-4 h-4" />;
    if (fraudType.includes('Rug Pull')) return <AlertTriangle className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          Blockchain Rescue Operations
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Helping cryptocurrency fraud victims recover their assets through transparent, verified rescue operations
        </p>
      </div>

      {/* Foundation Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">${foundationStats.totalRescued.toLocaleString()}</div>
              <div className="text-sm text-green-600">Total Rescued</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{foundationStats.victimsHelped}</div>
              <div className="text-sm text-blue-600">Victims Helped</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-700">{foundationStats.activeInvestigations}</div>
              <div className="text-sm text-yellow-600">Active Cases</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-700">{foundationStats.successRate}%</div>
              <div className="text-sm text-purple-600">Success Rate</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">${foundationStats.averageRecovery.toLocaleString()}</div>
              <div className="text-sm text-indigo-600">Avg Recovery</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-700">{foundationStats.responseTime}h</div>
              <div className="text-sm text-teal-600">Response Time</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ETHGR Foundation Rescue Mission */}
      <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          <div className="font-semibold text-blue-800 mb-1">
            ETHGR Foundation Rescue Mission Active
          </div>
          <div className="text-blue-700">
            Our own $15,000 fraud recovery has enabled us to help {foundationStats.victimsHelped} other victims recover ${foundationStats.totalRescued.toLocaleString()} in stolen assets. 
            Current conversion plan: 219,300 ETHGR tokens → $45,000 victim assistance fund.
          </div>
        </AlertDescription>
      </Alert>

      {/* Active Rescue Operations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Active Rescue Operations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeRescues.map((rescue) => (
              <div key={rescue.id} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getFraudTypeIcon(rescue.fraudType)}
                    <div>
                      <div className="font-semibold">{rescue.fraudType}</div>
                      <div className="text-sm text-gray-600">Victim: {rescue.victimAddress}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">${rescue.amount}</div>
                    <Badge className={getStatusColor(rescue.status)}>
                      {rescue.status.charAt(0).toUpperCase() + rescue.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Rescue Progress</span>
                    <span>{rescue.rescueProgress}%</span>
                  </div>
                  <Progress value={rescue.rescueProgress} className="h-2" />
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Reported: {rescue.reportedDate}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rescue.status === 'rescued' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>

                {rescue.status === 'rescued' && (
                  <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Funds successfully recovered and returned to victim</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rescue Process */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Our Rescue Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
              <h3 className="font-semibold mb-2">Report Fraud</h3>
              <p className="text-sm text-gray-600">Victims submit detailed fraud reports with transaction evidence</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
              <h3 className="font-semibold mb-2">Verify Claims</h3>
              <p className="text-sm text-gray-600">Blockchain analysis confirms fraudulent activity and victim legitimacy</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
              <h3 className="font-semibold mb-2">Asset Recovery</h3>
              <p className="text-sm text-gray-600">Technical teams work to recover stolen funds through various methods</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">4</div>
              <h3 className="font-semibold mb-2">Return Funds</h3>
              <p className="text-sm text-gray-600">Recovered assets are returned to verified victims through secure channels</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Foundation Mission Statement */}
      <Card className="border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-700">
            <DollarSign className="w-5 h-5" />
            Foundation Mission: From Victim to Helper
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <p className="text-indigo-800 mb-4">
              The ETHGR Foundation was born from our own $15,000 cryptocurrency fraud experience. After successfully recovering 
              our stolen assets and converting them into 1,990,000 ETHGR tokens, we committed to helping other victims.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-indigo-800 mb-2">Our Story</h4>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Lost $15,000 to sophisticated token honeypot</li>
                  <li>• Fought for 1 year to recover stolen assets</li>
                  <li>• Successfully deployed recovery contract</li>
                  <li>• Converted recovered tokens to foundation funding</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-800 mb-2">Our Impact</h4>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• $127,450 in total victim assistance provided</li>
                  <li>• 89 fraud victims successfully helped</li>
                  <li>• 78% success rate in asset recovery</li>
                  <li>• 24-hour average response time</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Need Help with Cryptocurrency Fraud?</h2>
            <p className="text-lg mb-6 opacity-90">
              Our team has the experience and resources to investigate your case and help recover your stolen assets.
            </p>
            <div className="space-x-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Report Fraud Case
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Contact Foundation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}