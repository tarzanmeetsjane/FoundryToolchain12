import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Radio, Volume2, TrendingUp, Zap, Target, DollarSign } from "lucide-react";

interface FrequencyData {
  frequency: number;
  amplitude: number;
  waveType: 'sine' | 'square' | 'triangle' | 'sawtooth';
  resonance: number;
  wealth_alignment: number;
  manifestation_power: number;
}

export default function MoneyFrequencyTuner() {
  const [frequencyData, setFrequencyData] = useState<FrequencyData>({
    frequency: 528, // Hz - "Love frequency"
    amplitude: 0.7,
    waveType: 'sine',
    resonance: 85,
    wealth_alignment: 72,
    manifestation_power: 68
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [foundationFunding, setFoundationFunding] = useState(20.61);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    initAudio();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Calculate wealth resonance based on frequency
  useEffect(() => {
    const calculateWealthResonance = () => {
      const { frequency } = frequencyData;
      
      // Solfeggio frequencies and their wealth associations
      const wealthFrequencies = {
        174: 40, // Foundation frequency
        285: 55, // Healing and regeneration
        396: 62, // Liberation from fear
        417: 70, // Facilitating change
        528: 85, // Transformation and DNA repair (love frequency)
        639: 78, // Harmonious relationships
        741: 65, // Awakening intuition
        852: 58, // Returning to spiritual order
        963: 45  // Divine consciousness
      };

      let wealth_alignment = 50;
      let manifestation_power = 50;

      // Find closest wealth frequency
      const closest = Object.entries(wealthFrequencies).reduce((prev, curr) => {
        return Math.abs(Number(curr[0]) - frequency) < Math.abs(Number(prev[0]) - frequency) ? curr : prev;
      });

      const distance = Math.abs(Number(closest[0]) - frequency);
      const baseAlignment = Number(closest[1]);
      
      // Calculate alignment based on distance from optimal frequency
      wealth_alignment = Math.max(20, baseAlignment - (distance * 0.5));
      
      // Manifestation power increases with amplitude and resonance
      manifestation_power = Math.min(100, (frequencyData.amplitude * 100) + (wealth_alignment * 0.3));

      setFrequencyData(prev => ({
        ...prev,
        wealth_alignment: Math.round(wealth_alignment),
        manifestation_power: Math.round(manifestation_power),
        resonance: Math.round(85 + (Math.sin(frequency / 100) * 15))
      }));
    };

    calculateWealthResonance();
  }, [frequencyData.frequency, frequencyData.amplitude]);

  // Foundation funding simulation based on frequency alignment
  useEffect(() => {
    const simulateFundingIncrease = () => {
      const { wealth_alignment, manifestation_power } = frequencyData;
      const multiplier = (wealth_alignment + manifestation_power) / 100;
      const newFunding = 20.61 * (1 + (multiplier - 1) * 0.1);
      setFoundationFunding(Math.round(newFunding * 100) / 100);
    };

    simulateFundingIncrease();
  }, [frequencyData.wealth_alignment, frequencyData.manifestation_power]);

  const playFrequency = () => {
    if (!audioContextRef.current) return;

    if (isPlaying) {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    // Create oscillator and gain node
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.type = frequencyData.waveType;
    oscillator.frequency.setValueAtTime(frequencyData.frequency, audioContextRef.current.currentTime);
    
    gainNode.gain.setValueAtTime(frequencyData.amplitude * 0.1, audioContextRef.current.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.start();
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    setIsPlaying(true);

    // Auto-stop after 30 seconds
    setTimeout(() => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
        setIsPlaying(false);
      }
    }, 30000);
  };

  const updateFrequency = (value: number[]) => {
    setFrequencyData(prev => ({ ...prev, frequency: value[0] }));
    
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(value[0], audioContextRef.current!.currentTime);
    }
  };

  const updateAmplitude = (value: number[]) => {
    setFrequencyData(prev => ({ ...prev, amplitude: value[0] / 100 }));
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime((value[0] / 100) * 0.1, audioContextRef.current!.currentTime);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Money Frequency Tuner
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Align your financial energy with prosperity frequencies to enhance foundation funding potential
        </p>
      </div>

      {/* Foundation Funding Impact */}
      <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <DollarSign className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="font-semibold text-green-800 mb-1">
            Current Foundation Funding: ${foundationFunding} ETH
          </div>
          <div className="text-green-700">
            Frequency alignment increasing funding potential by {((foundationFunding / 20.61 - 1) * 100).toFixed(1)}%
          </div>
        </AlertDescription>
      </Alert>

      {/* Frequency Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Radio className="w-5 h-5" />
              Frequency Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Frequency: {frequencyData.frequency} Hz
              </label>
              <Slider
                value={[frequencyData.frequency]}
                onValueChange={updateFrequency}
                min={100}
                max={1000}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>100 Hz</span>
                <span>528 Hz (Love)</span>
                <span>1000 Hz</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Amplitude: {Math.round(frequencyData.amplitude * 100)}%
              </label>
              <Slider
                value={[frequencyData.amplitude * 100]}
                onValueChange={updateAmplitude}
                min={10}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Wave Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['sine', 'square', 'triangle', 'sawtooth'] as const).map((type) => (
                  <Button
                    key={type}
                    variant={frequencyData.waveType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFrequencyData(prev => ({ ...prev, waveType: type }))}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={playFrequency}
              className={`w-full ${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              {isPlaying ? 'Stop Frequency' : 'Play Frequency'}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <TrendingUp className="w-5 h-5" />
              Wealth Alignment Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Wealth Alignment</span>
                  <Badge variant="secondary">{frequencyData.wealth_alignment}%</Badge>
                </div>
                <Progress value={frequencyData.wealth_alignment} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Manifestation Power</span>
                  <Badge variant="secondary">{frequencyData.manifestation_power}%</Badge>
                </div>
                <Progress value={frequencyData.manifestation_power} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Resonance Field</span>
                  <Badge variant="secondary">{frequencyData.resonance}%</Badge>
                </div>
                <Progress value={frequencyData.resonance} className="h-3" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-2">Optimal Frequencies</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>528 Hz - Love & Transformation</span>
                  <span className="text-green-600">85% alignment</span>
                </div>
                <div className="flex justify-between">
                  <span>639 Hz - Relationships</span>
                  <span className="text-blue-600">78% alignment</span>
                </div>
                <div className="flex justify-between">
                  <span>417 Hz - Change Facilitation</span>
                  <span className="text-purple-600">70% alignment</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Solfeggio Frequency Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Sacred Solfeggio Frequencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { freq: 174, name: "Foundation", color: "bg-red-100 text-red-700" },
              { freq: 285, name: "Healing", color: "bg-orange-100 text-orange-700" },
              { freq: 396, name: "Liberation", color: "bg-yellow-100 text-yellow-700" },
              { freq: 417, name: "Change", color: "bg-green-100 text-green-700" },
              { freq: 528, name: "Love", color: "bg-blue-100 text-blue-700" },
              { freq: 639, name: "Harmony", color: "bg-purple-100 text-purple-700" },
            ].map(({ freq, name, color }) => (
              <Button
                key={freq}
                variant="outline"
                className={`flex flex-col h-16 ${color} border-2`}
                onClick={() => setFrequencyData(prev => ({ ...prev, frequency: freq }))}
              >
                <div className="font-bold">{freq} Hz</div>
                <div className="text-xs">{name}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ETHGR Foundation Integration */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Zap className="w-5 h-5" />
            Foundation Frequency Enhancement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{foundationFunding}</div>
              <div className="text-sm text-blue-600">ETH Available</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {Math.round((frequencyData.wealth_alignment + frequencyData.manifestation_power) / 2)}%
              </div>
              <div className="text-sm text-green-600">Funding Probability</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">1,990k</div>
              <div className="text-sm text-purple-600">ETHGR Tokens</div>
            </div>
          </div>
          
          <Alert className="mt-4 border-blue-200 bg-blue-50">
            <Target className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <div className="text-blue-800">
                Frequency alignment at {frequencyData.frequency} Hz is {frequencyData.wealth_alignment >= 70 ? 'optimizing' : 'limiting'} foundation funding potential. 
                Target 528 Hz for maximum wealth manifestation alignment.
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}