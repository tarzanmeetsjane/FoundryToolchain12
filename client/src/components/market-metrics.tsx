import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { PoolStats } from "@shared/schema";

interface MarketMetricsProps {
  poolAddress: string;
}

export default function MarketMetrics({ poolAddress }: MarketMetricsProps) {
  const { data: poolStats } = useQuery<PoolStats>({
    queryKey: [`/api/pools/${poolAddress}/stats`],
    enabled: !!poolAddress,
  });

  return (
    <>
      {/* Market Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle>Market Sentiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Buy Pressure</span>
                <span className="success font-semibold">
                  {poolStats ? `${poolStats.buyPressure}%` : "--"}
                </span>
              </div>
              <Progress 
                value={poolStats?.buyPressure || 0} 
                className="h-2"
                style={{
                  background: 'hsl(var(--background))',
                }}
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Sell Pressure</span>
                <span className="danger font-semibold">
                  {poolStats ? `${poolStats.sellPressure}%` : "--"}
                </span>
              </div>
              <Progress 
                value={poolStats?.sellPressure || 0} 
                className="h-2"
                style={{
                  background: 'hsl(var(--background))',
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Volume Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Volume Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Large (&gt;10 ETH)</span>
              <span className="warning font-semibold">
                {poolStats ? `$${parseFloat(poolStats.largeVolume).toLocaleString()}` : "--"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Medium (1-10 ETH)</span>
              <span className="font-semibold">
                {poolStats ? `$${parseFloat(poolStats.mediumVolume).toLocaleString()}` : "--"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Small (&lt;1 ETH)</span>
              <span className="font-semibold">
                {poolStats ? `$${parseFloat(poolStats.smallVolume).toLocaleString()}` : "--"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
