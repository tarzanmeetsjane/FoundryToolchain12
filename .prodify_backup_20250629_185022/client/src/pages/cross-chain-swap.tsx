import { CrossChainSwap } from "@/components/cross-chain-swap";

export default function CrossChainSwapPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Cross-Chain Swap</h1>
        <p className="text-muted-foreground">
          Swap tokens across different blockchains seamlessly using Symbiosis Finance protocol
        </p>
      </div>
      
      <CrossChainSwap />
    </div>
  );
}