import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Bot, Wallet, TrendingUp, DollarSign, Target, Activity, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Bot as BotType, WalletBalance, LpPosition, RevenueEvent, FundingSource } from "@shared/schema";

export default function BotDashboard() {
  const queryClient = useQueryClient();
  const [selectedBot, setSelectedBot] = useState<string | null>(null);

  // Initialize dashboard data
  const initializeMutation = useMutation({
    mutationFn: () => apiRequest("/api/initialize-discovered-data", "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bots"] });
      queryClient.invalidateQueries({ queryKey: ["/api/funding-sources"] });
    }
  });

  // Fetch all data
  const { data: bots = [], isLoading: botsLoading } = useQuery({
    queryKey: ["/api/bots"],
    queryFn: () => apiRequest("/api/bots")
  });

  const { data: fundingSources = [] } = useQuery({
    queryKey: ["/api/funding-sources"],
    queryFn: () => apiRequest("/api/funding-sources")
  });

  const { data: lpPositions = [] } = useQuery({
    queryKey: ["/api/lp-positions"],
    queryFn: () => apiRequest("/api/lp-positions")
  });

  const { data: totalRevenue = { totalRevenue: 0 } } = useQuery({
    queryKey: ["/api/analytics/total-revenue"],
    queryFn: () => apiRequest("/api/analytics/total-revenue")
  });

  const { data: fundingSummary = { totalValue: 0, liquidationValue: 0, sourceCount: 0 } } = useQuery({
    queryKey: ["/api/analytics/funding-summary"],
    queryFn: () => apiRequest("/api/analytics/funding-summary")
  });

  const { data: botPerformance = [] } = useQuery({
    queryKey: ["/api/analytics/bot-performance"],
    queryFn: () => apiRequest("/api/analytics/bot-performance")
  });

  useEffect(() => {
    // Auto-initialize if no bots exist
    if (bots && bots.length === 0) {
      initializeMutation.mutate();
    }
  }, [bots]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "inactive": return "bg-yellow-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "inactive": return <AlertCircle className="h-4 w-4" />;
      case "error": return <XCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  if (botsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Bot className="h-12 w-12 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Loading Bot Revenue Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Zero-Config Bot Revenue Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track automated trading bot performance and funding sources for Base L2 deployment
          </p>
        </div>
        
        {(!bots || bots.length === 0) && (
          <Button 
            onClick={() => initializeMutation.mutate()}
            disabled={initializeMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {initializeMutation.isPending ? "Initializing..." : "Initialize Dashboard"}
          </Button>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bots.filter((bot: BotType) => bot.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {bots.length} total bots discovered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue.totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all bot operations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Funding</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${fundingSummary.liquidationValue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for Base L2 deployment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployment Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.min(100, (fundingSummary.liquidationValue / 250) * 100).toFixed(0)}%
            </div>
            <Progress 
              value={Math.min(100, (fundingSummary.liquidationValue / 250) * 100)} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Target: $250 for optimal deployment
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bots" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bots">Trading Bots</TabsTrigger>
          <TabsTrigger value="funding">Funding Sources</TabsTrigger>
          <TabsTrigger value="positions">LP Positions</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        {/* Bots Tab */}
        <TabsContent value="bots" className="space-y-4">
          <div className="grid gap-4">
            {bots.map((bot: BotType) => (
              <Card key={bot.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(bot.status)}`} />
                      <div>
                        <CardTitle className="text-lg">{bot.name}</CardTitle>
                        <CardDescription>
                          {bot.type.replace("_", " ").toUpperCase()} • {bot.walletAddress.slice(0, 8)}...
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(bot.status)}
                      <Badge variant={bot.status === "active" ? "default" : "secondary"}>
                        {bot.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                        Total Revenue
                      </h4>
                      <p className="text-lg font-bold">
                        ${parseFloat(bot.totalRevenue || "0").toFixed(4)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                        Daily Revenue
                      </h4>
                      <p className="text-lg font-bold">
                        ${parseFloat(bot.dailyRevenue || "0").toFixed(4)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                        Last Active
                      </h4>
                      <p className="text-sm">
                        {new Date(bot.lastActive).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {bot.config && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-sm mb-2">Configuration</h4>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {JSON.stringify(bot.config, null, 2)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {bots.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No Bots Configured</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Initialize the dashboard to import discovered bot configurations
                  </p>
                  <Button onClick={() => initializeMutation.mutate()}>
                    Initialize Bot Data
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Funding Sources Tab */}
        <TabsContent value="funding" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Funding Summary</CardTitle>
                <CardDescription>
                  Available sources for Base L2 deployment funding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">
                      Total Value
                    </h4>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      ${fundingSummary.totalValue.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">
                      Available for Liquidation
                    </h4>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      ${fundingSummary.liquidationValue.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">
                      Sources Count
                    </h4>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {fundingSummary.sourceCount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {fundingSources.map((source: FundingSource) => (
              <Card key={source.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{source.name}</CardTitle>
                      <CardDescription>
                        {source.type.replace("_", " ").toUpperCase()} • {source.address.slice(0, 12)}...
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      Priority: {source.liquidationPriority}/10
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                        Current Value
                      </h4>
                      <p className="text-lg font-bold">
                        ${parseFloat(source.currentValue || "0").toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                        Available for Liquidation
                      </h4>
                      <p className="text-lg font-bold text-green-600">
                        ${parseFloat(source.availableForLiquidation || "0").toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {source.metadata && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-sm mb-2">Details</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {(source.metadata as any)?.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* LP Positions Tab */}
        <TabsContent value="positions" className="space-y-4">
          <div className="grid gap-4">
            {lpPositions.map((position: LpPosition) => (
              <Card key={position.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{position.pairInfo}</CardTitle>
                      <CardDescription>
                        {position.protocol.toUpperCase()} on {position.blockchain}
                      </CardDescription>
                    </div>
                    <Badge variant={position.isActive ? "default" : "secondary"}>
                      {position.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                        LP Balance
                      </h4>
                      <p className="text-lg font-bold">
                        {parseFloat(position.balance || "0").toFixed(6)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                        Estimated Value
                      </h4>
                      <p className="text-lg font-bold">
                        ${parseFloat(position.estimatedValue || "0").toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                        Last Updated
                      </h4>
                      <p className="text-sm">
                        {new Date(position.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Token: {position.tokenAddress.slice(0, 12)}...
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Wallet: {position.walletAddress.slice(0, 12)}...
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {lpPositions.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No LP Positions Found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    LP positions will appear here once discovered from bot wallets
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Bot Performance Comparison</CardTitle>
                <CardDescription>
                  Revenue generation across all discovered bots
                </CardDescription>
              </CardHeader>
              <CardContent>
                {botPerformance.map((bot: any) => (
                  <div key={bot.botId} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div>
                      <h4 className="font-semibold">{bot.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {bot.eventCount} revenue events
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${parseFloat(bot.totalRevenue).toFixed(4)}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">total revenue</p>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No performance data available yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Readiness</CardTitle>
                <CardDescription>
                  Base L2 deployment funding analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current Available Funding</span>
                  <span className="font-bold">${fundingSummary.liquidationValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Minimum Required (Bootstrap)</span>
                  <span className="font-bold">$25.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Optimal Target</span>
                  <span className="font-bold">$250.00</span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Bootstrap Deployment</span>
                    <Badge variant={fundingSummary.liquidationValue >= 25 ? "default" : "destructive"}>
                      {fundingSummary.liquidationValue >= 25 ? "Ready" : "Insufficient"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Optimal Deployment</span>
                    <Badge variant={fundingSummary.liquidationValue >= 250 ? "default" : "secondary"}>
                      {fundingSummary.liquidationValue >= 250 ? "Ready" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}