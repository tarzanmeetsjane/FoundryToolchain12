import WalletValidationPanel from "@/components/wallet-validation-panel";
import WalletPortfolioAnalyzer from "@/components/wallet-portfolio-analyzer";

export default function WalletSecurity() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Wallet Security & Portfolio Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Professional-grade wallet address validation with security assessment, risk analysis, and token holdings
          </p>
        </div>
        
        <div className="space-y-8">
          <WalletValidationPanel />
          <WalletPortfolioAnalyzer />
        </div>
      </div>
    </div>
  );
}