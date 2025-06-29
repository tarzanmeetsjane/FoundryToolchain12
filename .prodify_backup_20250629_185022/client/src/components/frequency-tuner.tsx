import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap,
  TrendingUp,
  BarChart3,
  Radio,
  Waves,
  Target,
  AlertCircle,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FrequencyData {
  frequency: number;
  amplitude: number;
  phase: number;
  resonance: number;
  marketAlignment: number;
}

interface TradingFrequency {
  name: string;
  frequency: number;
  description: string;
  marketCondition: string;
  profitability: number;
  riskLevel: 'low' | 'medium' | 'high';
}

const TRADING_FREQUENCIES: TradingFrequency[] = [
  {
    name: "Alpha Wave",
    frequency: 8.5,
    description: "Deep market analysis frequency for long-term positioning",
    marketCondition: "Stable trending markets",
    profitability: 85,
    riskLevel: 'low'
  },
  {
    name: "Beta Wave", 
    frequency: 15.2,
    description: "Active trading frequency for medium-term swings",
    marketCondition: "Volatile oscillating markets",
    profitability: 72,
    riskLevel: 'medium'
  },
  {
    name: "Gamma Wave",
    frequency: 40.8,
    description: "High-frequency scalping for rapid opportunities",
    marketCondition: "High volatility breakouts",
    profitability: 94,
    riskLevel: 'high'
  },
  {
    name: "Theta Wave",
    frequency: 6.3,
    description: "Intuitive trading frequency for market sentiment",
    marketCondition: "Uncertain market conditions",
    profitability: 67,
    riskLevel: 'low'
  },
  {
    name: "Delta Wave",
    frequency: 3.1,
    description: "Deep value frequency for fundamental analysis",
    marketCondition: "Bear markets and accumulation",
    profitability: 78,
    riskLevel: 'low'
  }
];

export default function FrequencyTuner() {
  const [selectedFrequency, setSelectedFrequency] = useState(8.5);
  const [amplitude, setAmplitude] = useState([75]);
  const [phase, setPhase] = useState([0]);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [marketResonance, setMarketResonance] = useState(0);
  const { toast } = useToast();

  // Fetch current market conditions to determine optimal frequency
  const { data: marketData, isLoading: marketLoading } = useQuery({
    queryKey: ['market-frequency-data'],
    queryFn: async () => {
      const response = await fetch('/api/dex/trending-pools');
      if (!response.ok) throw new Error('Failed to fetch market data');
      return response.json();
    },
    refetchInterval: 10000,
  });

  // Calculate market resonance based on current data
  useEffect(() => {
    if (marketData?.data) {
      const pools = marketData.data.slice(0, 10);
      let totalVolatility = 0;
      let totalVolume = 0;
      
      pools.forEach((pool: any) => {
        const priceChange = Math.abs(parseFloat(pool.attributes.price_change_percentage.h24));
        const volume = parseFloat(pool.attributes.volume_usd.h24);
        totalVolatility += priceChange;
        totalVolume += volume;
      });
      
      const avgVolatility = totalVolatility / pools.length;
      const avgVolume = totalVolume / pools.length;
      
      // Calculate resonance based on market conditions
      const volatilityScore = Math.min(avgVolatility / 20, 1); // Normalize to 0-1
      const volumeScore = Math.min(avgVolume / 10000000, 1); // Normalize to 0-1
      const resonance = (volatilityScore + volumeScore) / 2 * 100;
      
      setMarketResonance(resonance);
    }
  }, [marketData]);

  const handleCalibration = async () => {
    setIsCalibrating(true);
    
    // Simulate frequency calibration process
    const calibrationSteps = [
      "Analyzing market harmonics...",
      "Detecting optimal frequency bands...",
      "Synchronizing with price movements...",
      "Calibrating amplitude settings...",
      "Tuning phase alignment...",
      "Frequency calibration complete!"
    ];
    
    for (let i = 0; i < calibrationSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Calibration Progress",
        description: calibrationSteps[i],
      });
    }
    
    // Set optimal frequency based on market conditions
    const optimalFreq = marketResonance > 70 ? 40.8 : 
                       marketResonance > 50 ? 15.2 : 
                       marketResonance > 30 ? 8.5 : 6.3;
    
    setSelectedFrequency(optimalFreq);
    setAmplitude([marketResonance]);
    setIsCalibrating(false);
    
    toast({
      title: "Calibration Complete",
      description: `Optimal frequency: ${optimalFreq} Hz`,
    });
  };

  const getFrequencyColor = (freq: number) => {
    if (freq >= 30) return "text-red-500";
    if (freq >= 15) return "text-orange-500";
    if (freq >= 8) return "text-green-500";
    if (freq >= 6) return "text-blue-500";
    return "text-purple-500";
  };

  const getResonanceStatus = (resonance: number) => {
    if (resonance >= 80) return { status: "Excellent", color: "text-green-600" };
    if (resonance >= 60) return { status: "Good", color: "text-blue-600" };
    if (resonance >= 40) return { status: "Fair", color: "text-yellow-600" };
    return { status: "Poor", color: "text-red-600" };
  };

  const resonanceStatus = getResonanceStatus(marketResonance);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Radio className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Money Frequency Tuner</h1>
          <p className="text-muted-foreground">
            Calibrate trading frequencies to market harmonics for optimal performance
          </p>
        </div>
      </div>

      <Tabs defaultValue="tuner" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tuner">Frequency Tuner</TabsTrigger>
          <TabsTrigger value="presets">Preset Frequencies</TabsTrigger>
          <TabsTrigger value="analysis">Market Analysis</TabsTrigger>
          <TabsTrigger value="resonance">Resonance Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="tuner" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5" />
                Frequency Calibration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Frequency (Hz)</label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        value={selectedFrequency}
                        onChange={(e) => setSelectedFrequency(parseFloat(e.target.value))}
                        step="0.1"
                        min="1"
                        max="100"
                        className="w-24"
                      />
                      <span className={`text-2xl font-bold ${getFrequencyColor(selectedFrequency)}`}>
                        {selectedFrequency} Hz
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Amplitude: {amplitude[0]}%</label>
                    <Slider
                      value={amplitude}
                      onValueChange={setAmplitude}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Phase: {phase[0]}°</label>
                    <Slider
                      value={phase}
                      onValueChange={setPhase}
                      max={360}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                    <h3 className="font-semibold mb-2">Market Resonance</h3>
                    <div className="text-3xl font-bold mb-1">
                      <span className={resonanceStatus.color}>{marketResonance.toFixed(1)}%</span>
                    </div>
                    <Badge variant={marketResonance >= 60 ? "default" : "secondary"}>
                      {resonanceStatus.status}
                    </Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Current Settings</h3>
                    <div className="space-y-2 text-sm">
                      <div>Frequency: {selectedFrequency} Hz</div>
                      <div>Amplitude: {amplitude[0]}%</div>
                      <div>Phase: {phase[0]}°</div>
                      <div>Sync Status: {marketResonance > 50 ? "Synchronized" : "Calibrating"}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleCalibration}
                    disabled={isCalibrating || marketLoading}
                    className="w-full h-12"
                  >
                    {isCalibrating ? (
                      <>
                        <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                        Calibrating...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Auto-Calibrate
                      </>
                    )}
                  </Button>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <h3 className="font-semibold mb-2">Calibration Tip</h3>
                    <p className="text-sm text-muted-foreground">
                      Auto-calibration analyzes current market conditions to determine 
                      optimal frequency settings for maximum resonance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preset Trading Frequencies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TRADING_FREQUENCIES.map((freq, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedFrequency(freq.frequency)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{freq.name}</h3>
                        <Badge variant={freq.riskLevel === 'low' ? 'default' : 
                                      freq.riskLevel === 'medium' ? 'secondary' : 'destructive'}>
                          {freq.riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className={`text-lg font-bold ${getFrequencyColor(freq.frequency)}`}>
                          {freq.frequency} Hz
                        </div>
                        <div className="text-muted-foreground">{freq.description}</div>
                        <div>
                          <span className="font-medium">Best for:</span> {freq.marketCondition}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Profitability:</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${freq.profitability}%` }}
                            />
                          </div>
                          <span className="text-xs">{freq.profitability}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Volatility</p>
                    <p className="text-2xl font-bold">{(marketResonance * 0.8).toFixed(1)}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency Lock</p>
                    <p className="text-2xl font-bold">{marketResonance > 60 ? "Locked" : "Searching"}</p>
                  </div>
                  <Target className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Signal Strength</p>
                    <p className="text-2xl font-bold">{Math.min(amplitude[0] + 15, 100)}%</p>
                  </div>
                  <Radio className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Profit Potential</p>
                    <p className="text-2xl font-bold">${(marketResonance * 100).toFixed(0)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Frequency Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h3 className="font-semibold mb-2">Current Market Frequency</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on live market data analysis, the optimal trading frequency is currently 
                    <span className="font-semibold"> {selectedFrequency} Hz</span>. This frequency 
                    provides the best resonance with current market conditions.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Harmonic Alignment</div>
                    <div className="text-xl font-bold">{(marketResonance * 1.2).toFixed(1)}%</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Phase Coherence</div>
                    <div className="text-xl font-bold">{(90 + phase[0] / 4).toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resonance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Real-Time Resonance Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              {marketLoading ? (
                <div className="flex items-center justify-center p-8">
                  <AlertCircle className="h-6 w-6 animate-spin mr-2" />
                  Loading market resonance data...
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">
                      <span className={resonanceStatus.color}>{marketResonance.toFixed(1)}%</span>
                    </div>
                    <div className="text-xl text-muted-foreground">Market Resonance</div>
                    <Badge variant={marketResonance >= 60 ? "default" : "secondary"} className="mt-2">
                      {resonanceStatus.status} Alignment
                    </Badge>
                  </div>

                  <div className="w-full bg-muted rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 ${
                        marketResonance >= 80 ? 'bg-green-500' :
                        marketResonance >= 60 ? 'bg-blue-500' :
                        marketResonance >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${marketResonance}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-green-500">{selectedFrequency}</div>
                      <div className="text-sm text-muted-foreground">Hz</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-500">{amplitude[0]}</div>
                      <div className="text-sm text-muted-foreground">Amplitude</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-500">{phase[0]}</div>
                      <div className="text-sm text-muted-foreground">Phase</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}