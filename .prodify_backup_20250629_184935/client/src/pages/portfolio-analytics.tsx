import { PortfolioAnalytics } from "@/components/portfolio-analytics";

export default function PortfolioAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">Portfolio Analytics</h1>
      </div>
      <PortfolioAnalytics />
    </div>
  );
}