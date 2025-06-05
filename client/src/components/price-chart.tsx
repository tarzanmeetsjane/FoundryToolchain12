import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useState } from "react";
import type { SwapEvent } from "@shared/schema";

interface PriceChartProps {
  poolAddress: string;
}

export default function PriceChart({ poolAddress }: PriceChartProps) {
  const [timeframe, setTimeframe] = useState("1H");

  const { data: swapEvents = [] } = useQuery<SwapEvent[]>({
    queryKey: [`/api/pools/${poolAddress}/swaps`],
    enabled: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  // Process data for chart
  const chartData = swapEvents
    .filter((event) => parseFloat(event.price) > 0)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map((event) => ({
      time: new Date(event.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      price: parseFloat(event.price),
    }))
    .slice(-20); // Show last 20 data points

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Price Movement</CardTitle>
          <div className="flex items-center space-x-2">
            {["1H", "6H", "24H"].map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className={
                  timeframe === tf
                    ? "bg-primary/20 text-primary"
                    : "bg-background text-muted-foreground hover:bg-border"
                }
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No price data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
