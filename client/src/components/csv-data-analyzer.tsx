import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink,
  BarChart3,
  Activity,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TransactionData {
  hash: string;
  status: string;
  method: string;
  blockNumber: string;
  dateTime: string;
  from: string;
  fromNametag: string;
  to: string;
  toNametag: string;
  amount: string;
  valueUSD: string;
  txnFee: string;
}

interface LPTokenData {
  address: string;
  blockchain: string;
  protocol: string;
  pair: string;
  poolSize: string;
  filePath: string;
  lineNumber: string;
}

interface AnalysisResult {
  type: 'transactions' | 'lp-tokens';
  totalRecords: number;
  successfulTxs?: number;
  failedTxs?: number;
  totalValueUSD?: number;
  uniqueProtocols?: string[];
  topPairs?: { pair: string; count: number }[];
  riskFactors?: string[];
  insights?: string[];
}

export function CSVDataAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.replace(/"/g, '').trim());
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });
  };

  const analyzeTransactionData = (data: any[]): AnalysisResult => {
    const successfulTxs = data.filter(tx => tx.Status === 'Success').length;
    const failedTxs = data.filter(tx => tx.Status?.includes('Error')).length;
    
    const totalValueUSD = data
      .filter(tx => tx['Value (USD)'])
      .reduce((sum, tx) => {
        const value = parseFloat(tx['Value (USD)'].replace(/[$,]/g, ''));
        return sum + (isNaN(value) ? 0 : value);
      }, 0);

    const methods = data.map(tx => tx.Method).filter(Boolean);
    const uniqueMethods = Array.from(new Set(methods));
    
    const riskFactors: string[] = [];
    if (failedTxs > 0) {
      riskFactors.push(`${failedTxs} failed transactions detected`);
    }
    if (data.some(tx => tx.Method === 'Approve')) {
      riskFactors.push('Multiple approval transactions found');
    }

    const insights: string[] = [];
    insights.push(`${successfulTxs}/${data.length} transactions successful`);
    insights.push(`Most common method: ${uniqueMethods[0] || 'Unknown'}`);
    if (totalValueUSD > 0) {
      insights.push(`Total transaction value: $${totalValueUSD.toFixed(2)}`);
    }

    return {
      type: 'transactions',
      totalRecords: data.length,
      successfulTxs,
      failedTxs,
      totalValueUSD,
      riskFactors,
      insights
    };
  };

  const analyzeLPTokenData = (data: any[]): AnalysisResult => {
    const protocols = data.map(token => token.Protocol).filter(Boolean);
    const uniqueProtocols = Array.from(new Set(protocols));
    
    const blockchains = data.map(token => token.Blockchain).filter(Boolean);
    const uniqueBlockchains = Array.from(new Set(blockchains));

    const pairs = data.map(token => token.Pair).filter(Boolean);
    const pairCounts = pairs.reduce((acc: any, pair) => {
      acc[pair] = (acc[pair] || 0) + 1;
      return acc;
    }, {});
    
    const topPairs = Object.entries(pairCounts)
      .map(([pair, count]) => ({ pair, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const riskFactors: string[] = [];
    const unknownTokens = data.filter(token => !token.Protocol || token.Protocol === '');
    if (unknownTokens.length > 0) {
      riskFactors.push(`${unknownTokens.length} tokens without protocol identification`);
    }

    const insights: string[] = [];
    insights.push(`${uniqueProtocols.length} different protocols detected`);
    insights.push(`Coverage across ${uniqueBlockchains.length} blockchains`);
    if (topPairs.length > 0) {
      insights.push(`Most common pair: ${topPairs[0].pair}`);
    }

    return {
      type: 'lp-tokens',
      totalRecords: data.length,
      uniqueProtocols,
      topPairs,
      riskFactors,
      insights
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    setFileName(file.name);
    setIsAnalyzing(true);

    try {
      const text = await file.text();
      const data = parseCSV(text);
      
      if (data.length === 0) {
        throw new Error('No data found in CSV file');
      }

      // Detect data type based on headers
      const headers = Object.keys(data[0]);
      let result: AnalysisResult;

      if (headers.includes('Transaction Hash') || headers.includes('Status')) {
        result = analyzeTransactionData(data);
      } else if (headers.includes('Address') && headers.includes('Protocol')) {
        result = analyzeLPTokenData(data);
      } else {
        throw new Error('Unrecognized CSV format');
      }

      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${data.length} records`,
      });

    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze CSV file",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            CSV Data Analyzer
          </CardTitle>
          <CardDescription>
            Upload and analyze transaction data or LP token scans from CSV files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Upload CSV File</p>
                <p className="text-xs text-muted-foreground">
                  Supports transaction exports and LP token scans
                </p>
              </div>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Select File"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {fileName && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4" />
              <span>Selected: {fileName}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analysis Results
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {analysisResult.type === 'transactions' ? 'Transaction Data' : 'LP Token Data'}
              </Badge>
              <Badge variant="outline">
                {formatNumber(analysisResult.totalRecords)} Records
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{formatNumber(analysisResult.totalRecords)}</div>
                <div className="text-sm text-muted-foreground">Total Records</div>
              </div>
              
              {analysisResult.type === 'transactions' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analysisResult.successfulTxs}</div>
                    <div className="text-sm text-muted-foreground">Successful</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{analysisResult.failedTxs}</div>
                    <div className="text-sm text-muted-foreground">Failed</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      ${(analysisResult.totalValueUSD || 0).toFixed(0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Value</div>
                  </div>
                </>
              )}

              {analysisResult.type === 'lp-tokens' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{analysisResult.uniqueProtocols?.length}</div>
                    <div className="text-sm text-muted-foreground">Protocols</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">{analysisResult.topPairs?.length}</div>
                    <div className="text-sm text-muted-foreground">Unique Pairs</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {analysisResult.topPairs?.[0]?.count || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Top Pair Count</div>
                  </div>
                </>
              )}
            </div>

            <Separator />

            {/* Risk Factors */}
            {analysisResult.riskFactors && analysisResult.riskFactors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  Risk Factors
                </h4>
                <div className="space-y-1">
                  {analysisResult.riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-yellow-600">
                      <div className="w-1 h-1 bg-yellow-600 rounded-full"></div>
                      {risk}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights */}
            {analysisResult.insights && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Key Insights
                </h4>
                <div className="space-y-1">
                  {analysisResult.insights.map((insight, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Protocol/Pair Breakdown */}
            {analysisResult.type === 'lp-tokens' && analysisResult.uniqueProtocols && (
              <div className="space-y-2">
                <h4 className="font-medium">Protocol Distribution</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {analysisResult.uniqueProtocols.slice(0, 6).map((protocol, index) => (
                    <Badge key={index} variant="secondary">
                      {protocol || 'Unknown'}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {analysisResult.topPairs && (
              <div className="space-y-2">
                <h4 className="font-medium">Top Trading Pairs</h4>
                <div className="space-y-2">
                  {analysisResult.topPairs.slice(0, 5).map((pair, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{pair.pair}</span>
                      <Badge variant="outline">{pair.count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <ExternalLink className="w-3 h-3 mr-1" />
                Export Analysis
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAnalysisResult(null)}
              >
                Clear Results
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}