
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

export function BeaconChainAnalyzer() {
  const [blockInput, setBlockInput] = useState("22740258");
  const [blockData, setBlockData] = useState<BeaconBlockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse the provided block data as example
  const exampleBlockData: BeaconBlockData = {
    blockNumber: 22740258,
    slot: 11961081,
    epoch: 373783,
    proposerIndex: 1921242,
    slotRootHash: "0x33d21bf9d78117894a14db862bbc55651e8440a3ea14bc5e43829df30a4d0589",
    parentRootHash: "0xe88542f2019d2b0cec8c21844381fe2229fde78bc7ef9449e321e854144c8a1c",
    depositCount: 2045305,
    graffiti: "0x (Hex:Null)",
    randomness: "0xab541aef8418efd344776a2f0fa94ccf800bc299df70e734b0f4899a0b190cb0",
    randaoReveal: "0x894387de4afb5b9fbd0fbf183cd60b322867f1c08f95ee66eda54713ed650ec9fabdd49093dc3397e9d355cf59f722db16f254dda43c8374e8bbf94e3a5b3eff56184c088fadeab36f03cfacaf8ec6661ad04cb6de130c5d1363644558b7bf65",
    isMEVBlock: true,
    timestamp: Date.now()
  };

  const analyzeBlock = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, use the example data
      if (blockInput === "22740258") {
        setBlockData(exampleBlockData);
      } else {
        // In a real implementation, you would fetch from beacon chain API
        const response = await fetch(`/api/beacon-chain/block/${blockInput}`);
        if (!response.ok) {
          throw new Error('Block not found or API error');
        }
        const data = await response.json();
        setBlockData(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze block');
      // Fallback to example data for demonstration
      setBlockData(exampleBlockData);
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
          <div className="flex gap-2">
            <Input
              placeholder="Enter block number (e.g., 22740258)"
              value={blockInput}
              onChange={(e) => setBlockInput(e.target.value)}
              className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
            />
            <Button 
              onClick={analyzeBlock}
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

      {blockData && (
        <Card className="bg-white/10 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              Block #{blockData.blockNumber}
              {blockData.isMEVBlock && (
                <Badge className="bg-orange-600">MEV Block</Badge>
              )}
            </CardTitle>
            <CardDescription className="text-blue-200">
              Slot {blockData.slot.toLocaleString()} • Epoch {blockData.epoch.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/10">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">Overview</TabsTrigger>
                <TabsTrigger value="consensus" className="text-white data-[state=active]:bg-blue-600">Consensus</TabsTrigger>
                <TabsTrigger value="mev" className="text-white data-[state=active]:bg-blue-600">MEV Info</TabsTrigger>
                <TabsTrigger value="technical" className="text-white data-[state=active]:bg-blue-600">Technical</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="consensus" className="space-y-4">
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
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex gap-2">
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
