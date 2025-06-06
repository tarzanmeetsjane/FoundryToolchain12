import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiquidityPoolManager from "@/components/liquidity-pool-manager";
import V3PositionCreator from "@/components/v3-position-creator";
import PositionDashboard from "@/components/position-dashboard";
import V3V4PositionManager from "@/components/v3-v4-position-manager";

export default function LiquidityManagementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="v3v4" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="v3v4">V3/V4 Positions</TabsTrigger>
          <TabsTrigger value="v2">V2 Pools</TabsTrigger>
        </TabsList>

        <TabsContent value="v3v4">
          <V3PositionCreator />
          <V3V4PositionManager />
        </TabsContent>

        <TabsContent value="v2">
          <LiquidityPoolManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}