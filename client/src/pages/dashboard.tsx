import { useState } from "react";
import { ChartLine, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchControls from "@/components/search-controls";
import LiveFeed from "@/components/live-feed";
import MarketMetrics from "@/components/market-metrics";
import PriceChart from "@/components/price-chart";
import VolumeChart from "@/components/volume-chart";
import TransactionHistory from "@/components/transaction-history";
import ImplementationGuide from "@/components/implementation-guide";

export default function Dashboard() {
  const [selectedPool, setSelectedPool] = useState("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ChartLine className="text-primary h-8 w-8" />
            <h1 className="text-xl font-bold">DeFi Trade Tracker</h1>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              BETA
            </Badge>
          </div>
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Search and Controls */}
        <SearchControls selectedPool={selectedPool} onPoolChange={setSelectedPool} />

        {/* Real-time Data */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <LiveFeed poolAddress={selectedPool} />
          </div>
          <div className="space-y-6">
            <MarketMetrics poolAddress={selectedPool} />
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PriceChart poolAddress={selectedPool} />
          <VolumeChart poolAddress={selectedPool} />
        </div>

        {/* Transaction History */}
        <TransactionHistory poolAddress={selectedPool} />

        {/* Implementation Guide */}
        <ImplementationGuide />
      </div>
    </div>
  );
}
