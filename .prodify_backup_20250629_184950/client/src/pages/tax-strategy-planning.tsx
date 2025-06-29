import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator,
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Shield,
  Target,
  Calendar,
  Zap
} from "lucide-react";

export default function TaxStrategyPlanning() {
  const [personalWithdrawal, setPersonalWithdrawal] = useState("204000");
  const [foundationRevenue, setFoundationRevenue] = useState("100000");
  const [clientRecovery, setClientRecovery] = useState("50000");

  const taxRates = {
    personal: {
      federal: 0.22, // 22% federal for $50K+ income
      state: 0.06,   // Average state tax
      fica: 0.0765,  // Social Security + Medicare
      total: 0.3565  // Combined rate
    },
    business: {
      federal: 0.21, // Corporate tax rate
      state: 0.06,   // Average state corporate
      selfEmployment: 0.1413, // SE tax on foundation income
      total: 0.4013  // Combined rate
    },
    capitalGains: {
      shortTerm: 0.22,  // Same as ordinary income
      longTerm: 0.15,   // Long-term capital gains
      crypto: 0.22      // Crypto treated as ordinary income
    }
  };

  const calculatePersonalTaxes = (amount: number) => {
    const federal = amount * taxRates.personal.federal;
    const state = amount * taxRates.personal.state;
    const fica = amount * taxRates.personal.fica;
    const total = federal + state + fica;
    
    return {
      grossAmount: amount,
      federal: federal,
      state: state,
      fica: fica,
      totalTax: total,
      netAmount: amount - total,
      effectiveRate: (total / amount) * 100
    };
  };

  const calculateBusinessTaxes = (revenue: number) => {
    const federal = revenue * taxRates.business.federal;
    const state = revenue * taxRates.business.state;
    const selfEmployment = revenue * taxRates.business.selfEmployment;
    const total = federal + state + selfEmployment;
    
    return {
      grossRevenue: revenue,
      federal: federal,
      state: state,
      selfEmployment: selfEmployment,
      totalTax: total,
      netRevenue: revenue - total,
      effectiveRate: (total / revenue) * 100
    };
  };

  const personalTaxCalc = calculatePersonalTaxes(parseFloat(personalWithdrawal));
  const businessTaxCalc = calculateBusinessTaxes(parseFloat(foundationRevenue));
  const clientTaxCalc = calculateBusinessTaxes(parseFloat(clientRecovery));

  const quarterlyPayments = {
    personal: personalTaxCalc.totalTax / 4,
    business: businessTaxCalc.totalTax / 4,
    client: clientTaxCalc.totalTax / 4
  };

  const taxOptimizationStrategies = [
    {
      strategy: "Foundation Structure",
      description: "501(c)(3) nonprofit status for victim assistance operations",
      taxBenefit: "Tax-exempt status + donor deductions",
      implementation: "File Form 1023 with IRS for nonprofit status",
      timeframe: "3-6 months"
    },
    {
      strategy: "Business Expense Deductions",
      description: "Deduct legitimate foundation operational expenses",
      taxBenefit: "Reduce taxable income by 20-40%",
      implementation: "Track all business expenses, equipment, travel",
      timeframe: "Immediate"
    },
    {
      strategy: "Cryptocurrency Accounting",
      description: "FIFO method for ETHGR token conversions",
      taxBenefit: "Minimize capital gains through proper basis",
      implementation: "Use crypto tax software like CoinTracker",
      timeframe: "Immediate"
    },
    {
      strategy: "Quarterly Estimated Payments",
      description: "Avoid underpayment penalties with quarterly taxes",
      taxBenefit: "Prevent IRS penalties and interest",
      implementation: "Set aside 35-40% of all income for taxes",
      timeframe: "Immediate"
    }
  ];

  const clientTaxConsiderations = [
    {
      consideration: "Service Fee Taxation",
      description: "20% service fees are taxable business income",
      impact: "Must pay estimated taxes on all fees collected",
      solution: "Set aside 40% of all service fees for taxes"
    },
    {
      consideration: "Client Recovery Amounts",
      description: "Funds recovered for clients are not taxable to foundation",
      impact: "Only service fees create tax liability",
      solution: "Separate client funds from foundation income"
    },
    {
      consideration: "Expense Deductions",
      description: "Gas fees and operational costs are deductible",
      impact: "Reduces taxable income from service fees",
      solution: "Track all recovery-related expenses meticulously"
    },
    {
      consideration: "Documentation Requirements",
      description: "IRS requires detailed records for crypto transactions",
      impact: "Audit risk if records are incomplete",
      solution: "Maintain comprehensive transaction logs"
    }
  ];

  const taxReserveStrategy = {
    immediate: {
      personalWithdrawal: personalTaxCalc.grossAmount,
      taxReserve: personalTaxCalc.totalTax,
      netCash: personalTaxCalc.netAmount,
      description: "Set aside taxes immediately upon conversion"
    },
    quarterly: {
      q1Payment: quarterlyPayments.personal + quarterlyPayments.business,
      q2Payment: quarterlyPayments.personal + quarterlyPayments.business,
      q3Payment: quarterlyPayments.personal + quarterlyPayments.business,
      q4Payment: quarterlyPayments.personal + quarterlyPayments.business,
      annualTotal: (quarterlyPayments.personal + quarterlyPayments.business) * 4
    },
    foundation: {
      serviceFeeTaxRate: 0.40,
      exampleRecovery: 50000,
      serviceFee: 10000,
      taxOnFee: 4000,
      netFoundationIncome: 6000
    }
  };

  const taxScript = `
// TAX CALCULATION AND RESERVE SCRIPT
const TAX_CONFIG = {
    personalRates: {
        federal: 0.22,
        state: 0.06,
        fica: 0.0765,
        total: 0.3565
    },
    businessRates: {
        federal: 0.21,
        state: 0.06,
        selfEmployment: 0.1413,
        total: 0.4013
    },
    reservePercentage: 0.40 // Set aside 40% for taxes
};

function calculateTaxReserves(conversionAmount, serviceRevenue) {
    console.log("💰 CALCULATING TAX RESERVES");
    console.log("Personal Conversion:", conversionAmount);
    console.log("Service Revenue:", serviceRevenue);
    
    // Personal tax calculation
    const personalTax = conversionAmount * TAX_CONFIG.personalRates.total;
    const personalNet = conversionAmount - personalTax;
    
    // Business tax calculation  
    const businessTax = serviceRevenue * TAX_CONFIG.businessRates.total;
    const businessNet = serviceRevenue - businessTax;
    
    // Reserve calculation
    const totalTaxReserve = personalTax + businessTax;
    const safeReserve = (conversionAmount + serviceRevenue) * TAX_CONFIG.reservePercentage;
    
    const taxPlan = {
        personal: {
            gross: conversionAmount,
            tax: personalTax,
            net: personalNet,
            effectiveRate: (personalTax / conversionAmount) * 100
        },
        business: {
            gross: serviceRevenue,
            tax: businessTax,
            net: businessNet,
            effectiveRate: (businessTax / serviceRevenue) * 100
        },
        reserves: {
            calculated: totalTaxReserve,
            recommended: safeReserve,
            quarterly: safeReserve / 4
        },
        quarterly: {
            q1: (personalTax + businessTax) / 4,
            q2: (personalTax + businessTax) / 4,
            q3: (personalTax + businessTax) / 4,
            q4: (personalTax + businessTax) / 4
        }
    };
    
    console.log("📊 TAX PLAN CALCULATED:");
    console.log("- Personal Net:", taxPlan.personal.net);
    console.log("- Business Net:", taxPlan.business.net);
    console.log("- Tax Reserve:", taxPlan.reserves.recommended);
    console.log("- Quarterly Payment:", taxPlan.quarterly.q1);
    
    return taxPlan;
}

// Example calculation for immediate conversion
const immediateConversion = 50000; // $50K personal withdrawal
const expectedServiceRevenue = 20000; // First quarter service fees

const taxPlan = calculateTaxReserves(immediateConversion, expectedServiceRevenue);

// Set aside tax reserves immediately
const taxReserveAccount = {
    personalTaxes: taxPlan.personal.tax,
    businessTaxes: taxPlan.business.tax,
    total: taxPlan.reserves.recommended,
    availableForSpending: taxPlan.personal.net
};

console.log("🏦 TAX RESERVE ACCOUNT:");
console.log("- Total Reserved:", taxReserveAccount.total);
console.log("- Available to Spend:", taxReserveAccount.availableForSpending);
console.log("- Next Quarterly Payment:", taxPlan.quarterly.q1);

alert(\`TAX RESERVES: \${taxReserveAccount.total} set aside. Available to spend: \${taxReserveAccount.availableForSpending}\`);`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Tax Strategy & Planning
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Smart Tax Planning for Personal Recovery and Foundation Operations
          </p>
          <div className="foundation-status-badge foundation-status-warning foundation-fade-in">
            📊 Set Aside 35-40% for Taxes on All Conversions and Service Fees
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Tax Calculator */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Calculator className="h-7 w-7 mr-3" />
              Tax Calculation Engine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="personal-withdrawal" className="text-blue-700 dark:text-blue-300 font-semibold">
                    Personal Withdrawal ($)
                  </Label>
                  <Input
                    id="personal-withdrawal"
                    value={personalWithdrawal}
                    onChange={(e) => setPersonalWithdrawal(e.target.value)}
                    placeholder="204000"
                    className="foundation-input"
                  />
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                    <div className="text-green-700 dark:text-green-300 font-semibold text-sm">Net After Taxes:</div>
                    <div className="text-green-800 dark:text-green-200 font-bold text-lg">
                      ${personalTaxCalc.netAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="foundation-revenue" className="text-blue-700 dark:text-blue-300 font-semibold">
                    Foundation Revenue ($)
                  </Label>
                  <Input
                    id="foundation-revenue"
                    value={foundationRevenue}
                    onChange={(e) => setFoundationRevenue(e.target.value)}
                    placeholder="100000"
                    className="foundation-input"
                  />
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                    <div className="text-purple-700 dark:text-purple-300 font-semibold text-sm">Net After Taxes:</div>
                    <div className="text-purple-800 dark:text-purple-200 font-bold text-lg">
                      ${businessTaxCalc.netRevenue.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="client-recovery" className="text-blue-700 dark:text-blue-300 font-semibold">
                    Client Recovery Fee ($)
                  </Label>
                  <Input
                    id="client-recovery"
                    value={clientRecovery}
                    onChange={(e) => setClientRecovery(e.target.value)}
                    placeholder="50000"
                    className="foundation-input"
                  />
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <div className="text-amber-700 dark:text-amber-300 font-semibold text-sm">Net After Taxes:</div>
                    <div className="text-amber-800 dark:text-amber-200 font-bold text-lg">
                      ${clientTaxCalc.netRevenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Breakdown */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <DollarSign className="h-7 w-7 mr-3" />
              Detailed Tax Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <h3 className="text-green-700 dark:text-green-300 font-bold mb-3">Personal Taxes</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700 dark:text-green-300">Federal (22%):</span>
                    <span className="text-green-800 dark:text-green-200">${personalTaxCalc.federal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700 dark:text-green-300">State (6%):</span>
                    <span className="text-green-800 dark:text-green-200">${personalTaxCalc.state.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700 dark:text-green-300">FICA (7.65%):</span>
                    <span className="text-green-800 dark:text-green-200">${personalTaxCalc.fica.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span className="text-green-700 dark:text-green-300">Total Tax:</span>
                    <span className="text-green-800 dark:text-green-200">${personalTaxCalc.totalTax.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                <h3 className="text-purple-700 dark:text-purple-300 font-bold mb-3">Business Taxes</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-700 dark:text-purple-300">Federal (21%):</span>
                    <span className="text-purple-800 dark:text-purple-200">${businessTaxCalc.federal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700 dark:text-purple-300">State (6%):</span>
                    <span className="text-purple-800 dark:text-purple-200">${businessTaxCalc.state.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700 dark:text-purple-300">Self-Emp (14.13%):</span>
                    <span className="text-purple-800 dark:text-purple-200">${businessTaxCalc.selfEmployment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span className="text-purple-700 dark:text-purple-300">Total Tax:</span>
                    <span className="text-purple-800 dark:text-purple-200">${businessTaxCalc.totalTax.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold mb-3">Quarterly Payments</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-amber-700 dark:text-amber-300">Q1 Payment:</span>
                    <span className="text-amber-800 dark:text-amber-200">${quarterlyPayments.personal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700 dark:text-amber-300">Q2 Payment:</span>
                    <span className="text-amber-800 dark:text-amber-200">${quarterlyPayments.business.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700 dark:text-amber-300">Q3 Payment:</span>
                    <span className="text-amber-800 dark:text-amber-200">${quarterlyPayments.client.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span className="text-amber-700 dark:text-amber-300">Annual Total:</span>
                    <span className="text-amber-800 dark:text-amber-200">${((quarterlyPayments.personal + quarterlyPayments.business + quarterlyPayments.client) * 4).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Tax Considerations */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Users className="h-7 w-7 mr-3" />
              Client Recovery Tax Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <AlertDescription className="foundation-text-body text-purple-800 dark:text-purple-200">
                  <strong className="foundation-text-accent">CLIENT TAX RULE:</strong> Only your 20% service fees are taxable to the foundation. The 80% recovered for clients is NOT taxable income - it's pass-through funds.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clientTaxConsiderations.map((consideration, index) => (
                  <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                    <div className="space-y-3">
                      <h3 className="text-purple-700 dark:text-purple-300 font-bold">{consideration.consideration}</h3>
                      <p className="text-purple-800 dark:text-purple-200 text-sm">{consideration.description}</p>
                      
                      <div className="p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                        <span className="text-amber-700 dark:text-amber-300 font-semibold text-xs">Impact: </span>
                        <span className="text-amber-800 dark:text-amber-200 text-xs">{consideration.impact}</span>
                      </div>
                      
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                        <span className="text-green-700 dark:text-green-300 font-semibold text-xs">Solution: </span>
                        <span className="text-green-800 dark:text-green-200 text-xs">{consideration.solution}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Optimization */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <TrendingUp className="h-7 w-7 mr-3" />
              Tax Optimization Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {taxOptimizationStrategies.map((strategy, index) => (
                <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                  <div className="space-y-4">
                    <h3 className="text-amber-700 dark:text-amber-300 font-bold">{strategy.strategy}</h3>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">{strategy.description}</p>
                    
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                        <span className="text-green-700 dark:text-green-300 font-semibold">Benefit: </span>
                        <span className="text-green-800 dark:text-green-200">{strategy.taxBenefit}</span>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded">
                        <span className="text-blue-700 dark:text-blue-300 font-semibold">Action: </span>
                        <span className="text-blue-800 dark:text-blue-200">{strategy.implementation}</span>
                      </div>
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                        <span className="text-purple-700 dark:text-purple-300 font-semibold">Timeline: </span>
                        <span className="text-purple-800 dark:text-purple-200">{strategy.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tax Script */}
        <Card className="foundation-card border-yellow-200 dark:border-yellow-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-yellow-700 dark:text-yellow-300">
              <Calculator className="h-7 w-7 mr-3" />
              Tax Calculation Script
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <textarea
                value={taxScript}
                readOnly
                className="w-full h-48 bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-lg"
              />
              <Button
                onClick={() => navigator.clipboard.writeText(taxScript)}
                className="foundation-button-accent w-full"
              >
                Copy Tax Calculation Script
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Center */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Smart Tax Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong className="foundation-text-accent">TAX RESERVE RULE:</strong> Set aside 40% of all conversions and service fees for taxes. Keep client recovery funds (80%) separate - they're not taxable income to the foundation.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">40%</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Tax Reserve Rate</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${(personalTaxCalc.totalTax + businessTaxCalc.totalTax).toLocaleString()}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Total Tax Reserve</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">${((quarterlyPayments.personal + quarterlyPayments.business) * 4).toLocaleString()}</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Annual Tax Bill</div>
                </div>
                
                <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">${(quarterlyPayments.personal + quarterlyPayments.business).toLocaleString()}</div>
                  <div className="text-sm text-amber-700 dark:text-amber-300">Quarterly Payment</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  onClick={() => window.open('/pre-execution-security-check', '_self')}
                  className="foundation-button-primary h-12"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Security Check
                </Button>
                
                <Button
                  onClick={() => window.open('/execution-roadmap', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Full Roadmap
                </Button>
                
                <Button
                  onClick={() => window.open('/personal-allocation-plan', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Allocation Plan
                </Button>
                
                <Button
                  onClick={() => window.open('/clean-foundation-contract', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Foundation Setup
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}