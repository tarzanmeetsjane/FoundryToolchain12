import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Settings, Minimize2, Maximize2, RefreshCw, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface WidgetSettings {
  poolAddress: string;
  dexPlatform: string;
  chainId: number;
  refreshInterval: number;
  showVolume: boolean;
  showPrice: boolean;
  showTrends: boolean;
  compactMode: boolean;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  transparency: number;
}

interface CryptoWidgetProps {
  isWidget?: boolean;
  onSettingsChange?: (settings: WidgetSettings) => void;
  initialSettings?: Partial<WidgetSettings>;
}

const defaultSettings: WidgetSettings = {
  poolAddress: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
  dexPlatform: "uniswap",
  chainId: 1,
  refreshInterval: 0, // Manual refresh only
  showVolume: true,
  showPrice: true,
  showTrends: true,
  compactMode: false,
  position: 'top-right',
  transparency: 85,
};

export default function CryptoWidget({ 
  isWidget = false, 
  onSettingsChange,
  initialSettings = {}
}: CryptoWidgetProps) {
  const [settings, setSettings] = useState<WidgetSettings>({
    ...defaultSettings,
    ...initialSettings
  });
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Fetch pool stats with manual refresh only
  const { data: poolStats, refetch, isLoading } = useQuery({
    queryKey: ["/api/pools", settings.poolAddress, "stats"],
    refetchInterval: settings.refreshInterval > 0 ? settings.refreshInterval : false,
    enabled: isVisible,
  });

  // Fetch recent swaps for trend analysis
  const { data: recentSwaps } = useQuery({
    queryKey: ["/api/pools", settings.poolAddress, "swaps"],
    refetchInterval: settings.refreshInterval > 0 ? settings.refreshInterval * 2 : false,
    enabled: isVisible && settings.showTrends,
  });

  // Calculate price trend from recent swaps
  const getPriceTrend = () => {
    if (!recentSwaps || !Array.isArray(recentSwaps) || recentSwaps.length < 2) return 0;
    const recent = recentSwaps.slice(0, 5);
    const prices = recent.map((swap: any) => parseFloat(swap.price0));
    if (prices.length < 2) return 0;
    return prices[0] - prices[prices.length - 1];
  };

  const priceTrend = getPriceTrend();
  const isPriceUp = priceTrend > 0;

  const updateSettings = (newSettings: Partial<WidgetSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    onSettingsChange?.(updated);
  };

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (num > 1) return num.toFixed(2);
    if (num > 0.01) return num.toFixed(4);
    return num.toFixed(8);
  };

  const formatVolume = (volume: string) => {
    const num = parseFloat(volume);
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  // Widget positioning styles
  const getPositionStyles = () => {
    if (!isWidget) return {};
    
    const positions = {
      'top-left': { top: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'bottom-right': { bottom: '20px', right: '20px' },
    };
    
    return {
      position: 'fixed' as const,
      ...positions[settings.position],
      zIndex: 9999,
      opacity: settings.transparency / 100,
    };
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className={cn(
          "fixed top-4 right-4 z-[10000]",
          "bg-background/80 backdrop-blur-sm border-border/50"
        )}
      >
        <Eye className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div style={getPositionStyles()} className={cn(
      "transition-all duration-300",
      isWidget && "shadow-2xl"
    )}>
      <Card className={cn(
        "w-full max-w-sm transition-all duration-300",
        isWidget && "backdrop-blur-md bg-background/90 border-border/50",
        isMinimized && "h-14 overflow-hidden",
        settings.compactMode && "max-w-xs"
      )}>
        <CardHeader className={cn(
          "pb-2 px-4 py-3",
          isMinimized && "pb-0"
        )}>
          <div className="flex items-center justify-between">
            <CardTitle className={cn(
              "text-sm font-medium flex items-center gap-2",
              settings.compactMode && "text-xs"
            )}>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {settings.compactMode ? "Live" : "Live Crypto"}
              </div>
              {settings.showTrends && poolStats && (
                <Badge variant={isPriceUp ? "default" : "destructive"} className="text-xs">
                  {isPriceUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                </Badge>
              )}
            </CardTitle>
            
            <div className="flex items-center gap-1">
              {isLoading && <RefreshCw className="h-3 w-3 animate-spin text-muted-foreground" />}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="h-6 w-6 p-0"
              >
                <Settings className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              
              {isWidget && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="h-6 w-6 p-0"
                >
                  <EyeOff className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="px-4 pb-4 space-y-3">
            {/* Pool Info */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Pool</span>
                <Badge variant="outline" className="text-xs">
                  {settings.dexPlatform.toUpperCase()}
                </Badge>
              </div>
              <div className="text-xs font-mono text-muted-foreground break-all">
                {settings.poolAddress.slice(0, 8)}...{settings.poolAddress.slice(-6)}
              </div>
            </div>

            {/* Price Display */}
            {settings.showPrice && poolStats && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Current Price</span>
                  {settings.showTrends && (
                    <span className={cn(
                      "text-xs font-medium",
                      isPriceUp ? "text-green-500" : "text-red-500"
                    )}>
                      {isPriceUp ? "+" : ""}{priceTrend.toFixed(4)}
                    </span>
                  )}
                </div>
                <div className="text-lg font-bold">
                  ${formatPrice((poolStats as any).currentPrice)}
                </div>
              </div>
            )}

            {/* Volume Display */}
            {settings.showVolume && poolStats && (
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">24h Volume</span>
                <div className="text-sm font-semibold text-blue-400">
                  {formatVolume((poolStats as any).totalVolume)}
                </div>
              </div>
            )}

            {/* Trading Activity */}
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Trades (24h)</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{(poolStats as any)?.dailyTrades || 0}</span>
                <div className="flex-1 bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(((poolStats as any)?.dailyTrades || 0) / 1000 * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <>
                <Separator />
                <div className="space-y-3 text-xs">
                  <div className="space-y-2">
                    <Label>Refresh Rate</Label>
                    <Select 
                      value={settings.refreshInterval.toString()} 
                      onValueChange={(value) => updateSettings({ refreshInterval: parseInt(value) })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10000">10 seconds</SelectItem>
                        <SelectItem value="30000">30 seconds</SelectItem>
                        <SelectItem value="60000">1 minute</SelectItem>
                        <SelectItem value="300000">5 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Select 
                      value={settings.position} 
                      onValueChange={(value: any) => updateSettings({ position: value })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-left">Top Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.showPrice}
                        onCheckedChange={(checked) => updateSettings({ showPrice: checked })}
                      />
                      <Label>Show Price</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.showVolume}
                        onCheckedChange={(checked) => updateSettings({ showVolume: checked })}
                      />
                      <Label>Show Volume</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.showTrends}
                        onCheckedChange={(checked) => updateSettings({ showTrends: checked })}
                      />
                      <Label>Show Trends</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.compactMode}
                        onCheckedChange={(checked) => updateSettings({ compactMode: checked })}
                      />
                      <Label>Compact Mode</Label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}