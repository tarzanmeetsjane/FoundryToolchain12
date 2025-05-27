import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, Zap } from "lucide-react";
import type { DexPlatform } from "@shared/schema";

interface DexPlatformSelectorProps {
  selectedPlatform: string;
  selectedChain: number;
  onPlatformChange: (platform: string, chainId: number) => void;
}

export default function DexPlatformSelector({ 
  selectedPlatform, 
  selectedChain, 
  onPlatformChange 
}: DexPlatformSelectorProps) {
  const [initialized, setInitialized] = useState(false);

  const { data: platforms = [] } = useQuery<DexPlatform[]>({
    queryKey: ["/api/dex/platforms"],
    refetchInterval: false, // Stop automatic refreshing
    staleTime: Infinity, // Keep data fresh without refetching
  });

  // Initialize DEX platforms on first load
  useEffect(() => {
    if (!initialized && platforms.length === 0) {
      initializePlatforms();
    }
  }, [initialized, platforms.length]);

  const initializePlatforms = async () => {
    try {
      await fetch("/api/dex/initialize", { method: "POST" });
      setInitialized(true);
      // Refetch platforms after initialization
      window.location.reload();
    } catch (error) {
      console.error("Failed to initialize DEX platforms:", error);
    }
  };

  // Group platforms by chain
  const platformsByChain = platforms.reduce((acc, platform) => {
    if (!acc[platform.chainId]) {
      acc[platform.chainId] = [];
    }
    acc[platform.chainId].push(platform);
    return acc;
  }, {} as Record<number, DexPlatform[]>);

  const currentPlatform = platforms.find(p => p.name === selectedPlatform && p.chainId === selectedChain);

  const getChainBadgeColor = (chainId: number) => {
    switch (chainId) {
      case 1: return "bg-blue-500/20 text-blue-500";
      case 56: return "bg-yellow-500/20 text-yellow-500";
      case 137: return "bg-purple-500/20 text-purple-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };

  if (!initialized && platforms.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Network className="text-primary mr-2 h-5 w-5" />
            DEX Platforms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Button onClick={initializePlatforms} className="bg-primary hover:bg-primary/80">
              <Zap className="mr-2 h-4 w-4" />
              Initialize Multi-DEX Support
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Set up support for Uniswap, SushiSwap, PancakeSwap, and more
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Network className="text-primary mr-2 h-5 w-5" />
          DEX Platform
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Selection Display */}
          {currentPlatform && (
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div>
                <div className="font-semibold">{currentPlatform.displayName}</div>
                <div className="text-sm text-muted-foreground">{currentPlatform.chainName}</div>
              </div>
              <Badge className={getChainBadgeColor(currentPlatform.chainId)}>
                Chain {currentPlatform.chainId}
              </Badge>
            </div>
          )}

          {/* Platform Selector */}
          <div className="space-y-3">
            {Object.entries(platformsByChain).map(([chainId, chainPlatforms]) => (
              <div key={chainId}>
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  {chainPlatforms[0].chainName}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {chainPlatforms.map((platform) => (
                    <Button
                      key={`${platform.name}-${platform.chainId}`}
                      variant={
                        selectedPlatform === platform.name && selectedChain === platform.chainId
                          ? "default"
                          : "outline"
                      }
                      onClick={() => onPlatformChange(platform.name, platform.chainId)}
                      className={`justify-start h-auto p-3 ${
                        selectedPlatform === platform.name && selectedChain === platform.chainId
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/10"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{platform.displayName}</span>
                        <Badge 
                          variant="secondary" 
                          className={getChainBadgeColor(platform.chainId)}
                        >
                          {platform.chainId}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Platform Stats */}
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            {platforms.length} DEX platforms supported across {Object.keys(platformsByChain).length} chains
          </div>
        </div>
      </CardContent>
    </Card>
  );
}