import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import type { SwapEvent } from "@shared/schema";

interface VolumeChartProps {
  poolAddress: string;
}

export default function VolumeChart({ poolAddress }: VolumeChartProps) {
  const { data: swapEvents = [] } = useQuery<SwapEvent[]>({
    queryKey: [`/api/pools/${poolAddress}/swaps`],
    enabled: !!poolAddress,
    refetchInterval: false,
    staleTime: Infinity,
  });

  // Group data by hour and calculate buy/sell volumes
  const processVolumeData = () => {
    const hourlyData: { [key: string]: { buys: number; sells: number } } = {};

    swapEvents.forEach((event) => {
      const hour = new Date(event.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      if (!hourlyData[hour]) {
        hourlyData[hour] = { buys: 0, sells: 0 };
      }

      const volume = parseFloat(event.usdcAmount);
      if (event.tradeType === "BUY") {
        hourlyData[hour].buys += volume;
      } else {
        hourlyData[hour].sells += volume;
      }
    });

    return Object.entries(hourlyData)
      .map(([time, data]) => ({
        time,
        buys: Math.round(data.buys),
        sells: Math.round(data.sells),
      }))
      .slice(-10); // Show last 10 hours
  };

  const chartData = processVolumeData();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Trading Volume</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">Buys</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">Sells</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Legend />
                <Bar 
                  dataKey="buys" 
                  fill="hsl(var(--success))" 
                  name="Buy Volume"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="sells" 
                  fill="hsl(var(--destructive))" 
                  name="Sell Volume"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No volume data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
