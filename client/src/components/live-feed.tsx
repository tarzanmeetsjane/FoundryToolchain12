import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { SwapEvent } from "@shared/schema";

interface LiveFeedProps {
  poolAddress: string;
}

export default function LiveFeed({ poolAddress }: LiveFeedProps) {
  const [filter, setFilter] = useState("all");

  const { data: swapEvents = [], isLoading } = useQuery<SwapEvent[]>({
    queryKey: [`/api/pools/${poolAddress}/swaps`],
    enabled: !!poolAddress,
    refetchInterval: false, // Manual refresh only - no auto updates
  });

  const filteredEvents = swapEvents.filter((event) => {
    if (filter === "buy") return event.tradeType === "BUY";
    if (filter === "sell") return event.tradeType === "SELL";
    return true;
  });

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffMs = now.getTime() - eventTime.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);

    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffMin < 60) return `${diffMin}m ago`;
    return `${diffHour}h ago`;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="text-primary mr-2 h-5 w-5" />
            Live Swap Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <TrendingUp className="success mr-2 h-5 w-5" />
            Live Swap Events
            <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </CardTitle>
          <div className="flex items-center space-x-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="buy">Buy Only</SelectItem>
                <SelectItem value="sell">Sell Only</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No swap events found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try fetching swap events using the search controls above
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredEvents.map((event) => (
              <div
                key={`${event.transactionHash}-${event.logIndex}`}
                className={`bg-background/50 rounded-lg p-4 border-l-4 ${
                  event.tradeType === "BUY" ? "border-green-500" : "border-red-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {event.tradeType === "BUY" ? (
                        <TrendingUp className="h-4 w-4 success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 danger" />
                      )}
                      <Badge
                        variant={event.tradeType === "BUY" ? "default" : "destructive"}
                        className={event.tradeType === "BUY" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}
                      >
                        {event.tradeType}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatTime(event.timestamp.toString())}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {parseFloat(event.ethAmount).toFixed(6)} ETH
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${parseFloat(event.usdcAmount).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Price: ${parseFloat(event.price).toLocaleString()} • Gas: {event.gasUsed?.toLocaleString()} •{" "}
                  <a
                    href={`https://etherscan.io/tx/${event.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary cursor-pointer hover:underline"
                  >
                    {formatAddress(event.transactionHash)}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
