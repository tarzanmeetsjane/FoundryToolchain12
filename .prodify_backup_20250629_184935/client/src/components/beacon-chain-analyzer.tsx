
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Search, Clock, Shield, Zap, Info } from "lucide-react";

interface BeaconBlockData {
  blockNumber: number;
  slot: number;
  epoch: number;
  proposerIndex: number;
  slotRootHash: string;
  parentRootHash: string;
  depositCount: number;
  graffiti: string;
  randomness: string;
  randaoReveal: string;
  timestamp?: number;
  isMEVBlock?: boolean;
}

interface EpochData {
  epochNumber: number;
  finalized: boolean;
  age: string;
  attestations: number;
  participationRate: number;
  votedEther: number;
  eligibleEther: number;
  slashingProposer: number;
  slashingAttester: number;
  deposits: number;
  voluntaryExits: number;
  totalValidatorCount: number;
  activeCount: number;
  pendingCount: number;
  timestamp?: number;
}

export function BeaconChainAnalyzer() {
  const [blockInput, setBlockInput] = useState("11961081");
  const [epochInput, setEpochInput] = useState("373783");
  const [analysisType, setAnalysisType] = useState<"block" | "epoch">("block");
  const [blockData, setBlockData] = useState<BeaconBlockData | null>(null);
  const [epochData, setEpochData] = useState<EpochData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse the provided epoch data as example
  const exampleEpochData: EpochData = {
    epochNumber: 373783,
    finalized: true,
    age: "23 mins ago (Jun-19-2025 06:11:35 PM +UTC)",
    attestations: 182,
    participationRate: 99.19,
    votedEther: 2144527,
    eligibleEther: 2161956,
    slashingProposer: 0,
    slashingAttester: 0,
    deposits: 0,
    voluntaryExits: 0,
    totalValidatorCount: 1969270,
    activeCount: 1967418,
    pendingCount: 1852,
    timestamp: new Date('2025-06-19T18:11:35Z').getTime()
  };

  // Parse the provided block data as example
  const exampleBlockData: BeaconBlockData = {
    blockNumber: 22740258,
    slot: 11961081,
    epoch: 373783,
    proposerIndex: 1921242,
    slotRootHash: "0x33d21bf9d78117894a14db862bbc55651e8440a3ea14bc5e43829df30a4d0589",
    parentRootHash: "0xe88542f2019d2b0cec8c21844381fe2229fde78bc7ef9449e321e854144c8a1c",
    depositCount: 2045305,
    graffiti: "0x0000000000000000000000000000000000000000000000000000000000000000",
    randomness: "0x5bfb7d78c5a256a0f23abb3fdc058c31f8caf2edcfe19485679f3f0039d90b49",
    randaoReveal: "0x894387de4afb5b9fbd0fbf183cd60b322867f1c08f95ee66eda54713ed650ec9fabdd49093dc3397e9d355cf59f722db16f254dda43c8374e8bbf94e3a5b3eff56184c088fadeab36f03cfacaf8ec6661ad04cb6de130c5d1363644558b7bf65",
    isMEVBlock: false,
    timestamp: new Date('2025-06-19T18:16:35Z').getTime()
  };

  const analyzeData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (analysisType === "block") {
        // Handle specific slot number from the provided data
        if (blockInput === "11961081" || blockInput === "22740258") {
          setBlockData(exampleBlockData);
          setEpochData(null);
        } else {
          // In a real implementation, you would fetch from beacon chain API
          const response = await fetch(`/api/beacon-chain/block/${blockInput}`);
          if (!response.ok) {
            throw new Error('Block not found or API error');
          }
          const data = await response.json();
          setBlockData(data);
          setEpochData(null);
        }
      } else {
        // Handle epoch analysis
        if (epochInput === "373783") {
          setEpochData(exampleEpochData);
          setBlockData(null);
        } else {
          // In a real implementation, you would fetch from beacon chain API
          const response = await fetch(`/api/beacon-chain/epoch/${epochInput}`);
          if (!response.ok) {
            throw new Error('Epoch not found or API error');
          }
          const data = await response.json();
          setEpochData(data);
          setBlockData(null);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to analyze ${analysisType}`);
      // Fallback to example data for demonstration
      if (analysisType === "block") {
        setBlockData(exampleBlockData);
        setEpochData(null);
      } else {
        setEpochData(exampleEpochData);
        setBlockData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatHash = (hash: string) => {
    if (!hash) return 'N/A';
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const calculateSlotTime = (slot: number) => {
    // Genesis timestamp for Ethereum 2.0: December 1, 2020 12:00:23 UTC
    const genesisTimestamp = 1606824023;
    const secondsPerSlot = 12;
    return new Date((genesisTimestamp + slot * secondsPerSlot) * 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Beacon Chain Block Analyzer
          </CardTitle>
          <CardDescription className="text-blue-200">
            Analyze Ethereum consensus layer blocks and MEV activity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant={analysisType === "block" ? "default" : "outline"}
              onClick={() => setAnalysisType("block")}
              className="text-white"
            >
              Block Analysis
            </Button>
            <Button
              variant={analysisType === "epoch" ? "default" : "outline"}
              onClick={() => setAnalysisType("epoch")}
              className="text-white"
            >
              Epoch Analysis
            </Button>
          </div>

          <div className="flex gap-2">
            {analysisType === "block" ? (
              <Input
                placeholder="Enter slot number (e.g., 11961081)"
                value={blockInput}
                onChange={(e) => setBlockInput(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
              />
            ) : (
              <Input
                placeholder="Enter epoch number (e.g., 373783)"
                value={epochInput}
                onChange={(e) => setEpochInput(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
              />
            )}
            <Button 
              onClick={analyzeData}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Analyze
            </Button>
          </div>

          {error && (
            <Alert className="border-yellow-500 bg-yellow-50">
              <Info className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                {error} (Showing example data for demonstration)
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {(blockData || epochData) && (
        <Card className="bg-white/10 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {blockData ? (
                <>
                  Block #{blockData.blockNumber}
                  {blockData.isMEVBlock && (
                    <Badge className="bg-orange-600">MEV Block</Badge>
                  )}
                </>
              ) : (
                <>
                  Epoch #{epochData?.epochNumber}
                  {epochData?.finalized && (
                    <Badge className="bg-green-600">Finalized</Badge>
                  )}
                  {epochData && epochData.participationRate > 99 && (
                    <Badge className="bg-blue-600">High Participation</Badge>
                  )}
                </>
              )}
            </CardTitle>
            <CardDescription className="text-blue-200">
              {blockData ? (
                `Slot ${blockData.slot.toLocaleString()} • Epoch ${blockData.epoch.toLocaleString()}`
              ) : (
                `${epochData?.activeCount.toLocaleString()} Active Validators • ${epochData?.participationRate.toFixed(2)}% Participation`
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className={`grid w-full ${blockData ? 'grid-cols-4' : 'grid-cols-3'} bg-white/10`}>
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">Overview</TabsTrigger>
                <TabsTrigger value="consensus" className="text-white data-[state=active]:bg-blue-600">
                  {blockData ? 'Consensus' : 'Validators'}
                </TabsTrigger>
                {blockData && (
                  <TabsTrigger value="mev" className="text-white data-[state=active]:bg-blue-600">MEV Info</TabsTrigger>
                )}
                <TabsTrigger value="technical" className="text-white data-[state=active]:bg-blue-600">Technical</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {blockData ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Block Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-200">Block Number:</span>
                          <span className="text-white font-mono">#{blockData.blockNumber.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Slot:</span>
                          <span className="text-white font-mono">{blockData.slot.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Epoch:</span>
                          <span className="text-white font-mono">{blockData.epoch.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Proposer Index:</span>
                          <span className="text-white font-mono">{blockData.proposerIndex.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Slot Time:</span>
                          <span className="text-white">{calculateSlotTime(blockData.slot).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Network Stats
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-200">Deposit Count:</span>
                          <span className="text-white font-mono">{blockData.depositCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Graffiti:</span>
                          <span className="text-white font-mono text-xs">{blockData.graffiti}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">MEV Status:</span>
                          <Badge variant={blockData.isMEVBlock ? "destructive" : "default"}>
                            {blockData.isMEVBlock ? "MEV Detected" : "Standard Block"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : epochData && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Epoch Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-200">Epoch Number:</span>
                          <span className="text-white font-mono">#{epochData.epochNumber.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Status:</span>
                          <Badge variant={epochData.finalized ? "default" : "secondary"}>
                            {epochData.finalized ? "Finalized" : "Pending"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Age:</span>
                          <span className="text-white">{epochData.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Attestations:</span>
                          <span className="text-white font-mono">{epochData.attestations.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Participation Rate:</span>
                          <span className="text-white font-mono">{epochData.participationRate.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Validator Stats
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-200">Voted ETH:</span>
                          <span className="text-white font-mono">{epochData.votedEther.toLocaleString()} ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Eligible ETH:</span>
                          <span className="text-white font-mono">{epochData.eligibleEther.toLocaleString()} ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Active Validators:</span>
                          <span className="text-white font-mono">{epochData.activeCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Total Validators:</span>
                          <span className="text-white font-mono">{epochData.totalValidatorCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Pending Count:</span>
                          <span className="text-white font-mono">{epochData.pendingCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="consensus" className="space-y-4">
                {blockData ? (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">Consensus Data</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-blue-200 block mb-1">Slot Root Hash:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-mono text-xs break-all">{blockData.slotRootHash}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigator.clipboard.writeText(blockData.slotRootHash)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-blue-200 block mb-1">Parent Root Hash:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-mono text-xs break-all">{blockData.parentRootHash}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigator.clipboard.writeText(blockData.parentRootHash)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>

                      <div>
                        <span className="text-blue-200 block mb-1">Block Randomness:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-mono text-xs break-all">{blockData.randomness}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigator.clipboard.writeText(blockData.randomness)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : epochData && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">Validator Performance</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-3">
                          <div>
                            <span className="text-blue-200">Participation Rate:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-full bg-white/20 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{width: `${epochData.participationRate}%`}}
                                />
                              </div>
                              <span className="text-white font-mono">{epochData.participationRate.toFixed(2)}%</span>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-blue-200">ETH Participation:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-full bg-white/20 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{width: `${(epochData.votedEther / epochData.eligibleEther) * 100}%`}}
                                />
                              </div>
                              <span className="text-white font-mono">{((epochData.votedEther / epochData.eligibleEther) * 100).toFixed(2)}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-blue-200">Slashing (P/A):</span>
                            <span className="text-white">{epochData.slashingProposer}/{epochData.slashingAttester}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-200">Deposits:</span>
                            <span className="text-white">{epochData.deposits}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-200">Voluntary Exits:</span>
                            <span className="text-white">{epochData.voluntaryExits}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="mev" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    MEV Analysis
                  </h4>
                  
                  {blockData.isMEVBlock ? (
                    <div className="space-y-3">
                      <Alert className="border-orange-500 bg-orange-50">
                        <Zap className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                          <strong>MEV Block Detected:</strong> This block contains MEV (Maximum Extractable Value) activity.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-200">MEV Type:</span>
                          <span className="text-white ml-2">Builder Block</span>
                        </div>
                        <div>
                          <span className="text-blue-200">Extraction Method:</span>
                          <span className="text-white ml-2">Sandwich/Arbitrage</span>
                        </div>
                        <div>
                          <span className="text-blue-200">Builder:</span>
                          <span className="text-white ml-2">EigenPhi Detected</span>
                        </div>
                        <div>
                          <span className="text-blue-200">Risk Level:</span>
                          <Badge variant="destructive">High</Badge>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Alert className="border-green-500 bg-green-50">
                      <Shield className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        No MEV activity detected in this block.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4">
                {blockData ? (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">Technical Details</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-blue-200 block mb-1">Randao Reveal (Validator Signature):</span>
                        <div className="bg-black/20 p-2 rounded text-xs font-mono text-white break-all">
                          {blockData.randaoReveal}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-blue-200">Slots per Epoch:</span>
                          <span className="text-white ml-2">32</span>
                        </div>
                        <div>
                          <span className="text-blue-200">Slot Duration:</span>
                          <span className="text-white ml-2">12 seconds</span>
                        </div>
                        <div>
                          <span className="text-blue-200">Current Slot in Epoch:</span>
                          <span className="text-white ml-2">{blockData.slot % 32}</span>
                        </div>
                        <div>
                          <span className="text-blue-200">Next Epoch Slot:</span>
                          <span className="text-white ml-2">{32 - (blockData.slot % 32)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : epochData && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">Epoch Technical Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-blue-200">Slots per Epoch:</span>
                          <span className="text-white ml-2">32</span>
                        </div>
                        <div>
                          <span className="text-blue-200">Epoch Duration:</span>
                          <span className="text-white ml-2">6.4 minutes</span>
                        </div>
                        <div>
                          <span className="text-blue-200">Start Slot:</span>
                          <span className="text-white ml-2">{(epochData.epochNumber * 32).toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-blue-200">End Slot:</span>
                          <span className="text-white ml-2">{((epochData.epochNumber + 1) * 32 - 1).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="text-blue-200 mb-2">Validator Distribution</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-blue-200">Active:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-white/20 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{width: `${(epochData.activeCount / epochData.totalValidatorCount) * 100}%`}}
                                />
                              </div>
                              <span className="text-white text-xs">{epochData.activeCount.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-200">Pending:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-white/20 rounded-full h-2">
                                <div 
                                  className="bg-yellow-600 h-2 rounded-full" 
                                  style={{width: `${(epochData.pendingCount / epochData.totalValidatorCount) * 100}%`}}
                                />
                              </div>
                              <span className="text-white text-xs">{epochData.pendingCount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex gap-2">
              {blockData ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                    onClick={() => window.open(`https://beaconcha.in/block/${blockData.slot}`)}
                  >
                    View on Beaconcha.in
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                    onClick={() => window.open(`https://etherscan.io/block/${blockData.blockNumber}`)}
                  >
                    View on Etherscan
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </>
              ) : epochData && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                    onClick={() => window.open(`https://beaconcha.in/epoch/${epochData.epochNumber}`)}
                  >
                    View on Beaconcha.in
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                    onClick={() => window.open(`https://beaconscan.com/epoch/${epochData.epochNumber}`)}
                  >
                    View on BeaconScan
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
