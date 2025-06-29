import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Atom, TrendingUp, Activity, Zap, Target, BarChart3 } from "lucide-react";

interface QuantumState {
  liquidityPosition: number;
  energyLevel: number;
  tunnelProbability: number;
  emissionRate: number;
  burnRate: number;
  participantCount: number;
  boundaryWidth: number;
}

export default function QuantumLiquidity() {
  const [quantumState, setQuantumState] = useState<QuantumState>({
    liquidityPosition: 750000, // Current liquidity in USD
    energyLevel: 171, // Number of participants (LP positions)
    tunnelProbability: 0.23,
    emissionRate: 0.15,
    burnRate: 0.08,
    participantCount: 171,
    boundaryWidth: 50000
  });

  const [waveFunction, setWaveFunction] = useState<number[]>([]);

  // Calculate quantum wave function approximation
  useEffect(() => {
    const calculateWaveFunction = () => {
      const points = 100;
      const wave = [];
      for (let i = 0; i < points; i++) {
        const x = (i / points) * 1000000; // Liquidity range 0-1M USD
        const barrier1 = 200000;
        const barrier2 = 800000;
        
        if (x < barrier1 || x > barrier2) {
          // Outside barriers - exponential decay
          const decay = Math.exp(-2 * Math.abs(x - 500000) / 100000);
          wave.push(decay * 0.1);
        } else {
          // Inside barriers - sinusoidal
          const amplitude = 0.8;
          const frequency = 4 * Math.PI / (barrier2 - barrier1);
          wave.push(amplitude * Math.sin(frequency * (x - barrier1)));
        }
      }
      setWaveFunction(wave);
    };

    calculateWaveFunction();
    const interval = setInterval(calculateWaveFunction, 5000);
    return () => clearInterval(interval);
  }, [quantumState]);

  // Calculate emissions based on quantum tunneling
  const calculateEmissions = () => {
    const { liquidityPosition, participantCount, boundaryWidth } = quantumState;
    const lowerBoundary = 200000;
    const upperBoundary = 800000;
    
    if (liquidityPosition < lowerBoundary + boundaryWidth) {
      // Near lower boundary - emit tokens
      const distance = Math.abs(liquidityPosition - lowerBoundary);
      return Math.exp(-2 * distance / boundaryWidth) * 1000;
    } else if (liquidityPosition > upperBoundary - boundaryWidth) {
      // Near upper boundary - burn tokens
      const distance = Math.abs(liquidityPosition - upperBoundary);
      return -Math.exp(-2 * distance / boundaryWidth) * 1000;
    }
    return 0;
  };

  const emissions = calculateEmissions();
  const tunnelStrength = Math.abs(emissions) / 1000;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Quantum Liquidity Analysis
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Modeling liquidity pools as quantum particles in a box to optimize token emissions and stability
        </p>
      </div>

      {/* Quantum State Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Atom className="w-5 h-5" />
              Quantum State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Energy Level (E)</span>
                <Badge variant="secondary">{quantumState.energyLevel}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Participants</span>
                <span className="font-semibold">{quantumState.participantCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tunnel Probability</span>
                <span className="font-semibold">{(quantumState.tunnelProbability * 100).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <TrendingUp className="w-5 h-5" />
              Liquidity Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-green-700">
                ${quantumState.liquidityPosition.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                Current aggregate liquidity (x-axis)
              </div>
              <Progress 
                value={(quantumState.liquidityPosition / 1000000) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Activity className="w-5 h-5" />
              Emission Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-orange-700">
                {emissions > 0 ? '+' : ''}{emissions.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">
                Tokens/hour (Ψ(x) = e^(-2a√(V₀-E)))
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-sm">
                  {emissions > 0 ? 'Emitting' : emissions < 0 ? 'Burning' : 'Stable'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wave Function Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Quantum Wave Function Ψ(x)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg p-4 relative overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-center">
              <svg width="100%" height="100%" viewBox="0 0 800 200">
                {/* Potential barriers */}
                <rect x="160" y="0" width="8" height="200" fill="#ef4444" opacity="0.3" />
                <rect x="640" y="0" width="8" height="200" fill="#ef4444" opacity="0.3" />
                
                {/* Wave function */}
                <path
                  d={`M 0 100 ${waveFunction.map((y, i) => 
                    `L ${(i / waveFunction.length) * 800} ${100 - y * 80}`
                  ).join(' ')}`}
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  fill="none"
                />
                
                {/* Current position marker */}
                <circle
                  cx={(quantumState.liquidityPosition / 1000000) * 800}
                  cy="100"
                  r="6"
                  fill="#10b981"
                  className="animate-pulse"
                />
              </svg>
            </div>
            
            <div className="absolute bottom-2 left-2 text-xs text-gray-500">
              $0
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              $1M
            </div>
            <div className="absolute top-2 left-4 text-xs text-gray-500">
              Barriers (V₀)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quantum Mechanics Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Quantum Liquidity Mechanics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Schrödinger Equation Application</h3>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                H(x)Ψ(x) = E(x)Ψ(x)
              </div>
              <p className="text-sm text-gray-600">
                Where H is the Hamiltonian operator related to kinetic and potential energy.
                Applied to liquidity pools where x-axis represents aggregate liquidity (USD)
                and y-axis represents number of staking participants.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Tunneling Effect</h3>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                Ψ(x) = e^(-2a√(V₀-E))
              </div>
              <p className="text-sm text-gray-600">
                When liquidity approaches boundaries, quantum tunneling occurs.
                Exponential decay function determines token emissions/burns to maintain
                optimal liquidity range between ${(quantumState.liquidityPosition * 0.27).toLocaleString()} - ${(quantumState.liquidityPosition * 1.07).toLocaleString()}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Status Alert */}
      <Alert className={`border-l-4 ${
        Math.abs(emissions) > 500 
          ? 'border-l-orange-500 bg-orange-50' 
          : 'border-l-green-500 bg-green-50'
      }`}>
        <Activity className="h-4 w-4" />
        <AlertDescription>
          <div className="font-semibold mb-2">
            {Math.abs(emissions) > 500 ? 'Quantum Tunneling Active' : 'Stable Quantum State'}
          </div>
          <div className="text-sm">
            {emissions > 500 
              ? `Liquidity approaching lower boundary. Emitting ${emissions.toFixed(0)} tokens/hour to attract participants.`
              : emissions < -500
              ? `Liquidity approaching upper boundary. Burning ${Math.abs(emissions).toFixed(0)} tokens/hour to maintain stability.`
              : `Liquidity within optimal range. Minimal intervention required. Current tunnel strength: ${(tunnelStrength * 100).toFixed(1)}%`
            }
          </div>
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button 
          onClick={() => setQuantumState(prev => ({
            ...prev,
            liquidityPosition: Math.max(100000, prev.liquidityPosition - 50000)
          }))}
          variant="outline"
        >
          Simulate Liquidity Decrease
        </Button>
        <Button 
          onClick={() => setQuantumState(prev => ({
            ...prev,
            liquidityPosition: Math.min(900000, prev.liquidityPosition + 50000)
          }))}
          variant="outline"
        >
          Simulate Liquidity Increase
        </Button>
        <Button 
          onClick={() => setQuantumState(prev => ({
            ...prev,
            participantCount: prev.participantCount + 10,
            energyLevel: prev.energyLevel + 10
          }))}
        >
          Add Participants
        </Button>
      </div>
    </div>
  );
}