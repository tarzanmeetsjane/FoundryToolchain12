
# BitGet Wallet + Optimism Deployment Guide

## Step 1: Add Optimism Network to BitGet Wallet

1. Open BitGet Wallet
2. Go to Settings → Networks → Add Network
3. Enter these details:
   - **Network Name**: Optimism
   - **RPC URL**: `https://mainnet.optimism.io`
   - **Chain ID**: `10`
   - **Currency Symbol**: `ETH`
   - **Block Explorer**: `https://optimistic.etherscan.io`

## Step 2: Fund Your Wallet

1. Bridge your $19 ETH from Ethereum mainnet to Optimism
2. Use the official Optimism Bridge: https://app.optimism.io/bridge
3. Cost: ~$5-8 to bridge
4. Remaining: ~$11-14 ETH on Optimism

## Step 3: Deploy Contract

### Option A: Using Remix (Recommended)
1. Go to https://remix.ethereum.org
2. Connect BitGet Wallet
3. Switch to Optimism network
4. Copy contract from `EXACT_DEPLOYED_CONTRACT.sol`
5. Compile and deploy

### Option B: Using Foundry on Replit
```bash
# Set your BitGet wallet private key
export PRIVATE_KEY="your_private_key"

# Deploy to Optimism
forge script script/DeployOptimismETHGR.s.sol --rpc-url https://mainnet.optimism.io --broadcast --verify
```

## Step 4: Verify Contract
The contract will auto-verify on deployment. Your new contract address will be displayed.

## Step 5: Create Liquidity Pool
With remaining $8-10 ETH, create a ETHGR/ETH pool on Velodrome (Optimism's main DEX).

## Expected Results
- **Deployment Cost**: $3-5
- **Verification**: Automatic
- **Liquidity Pool**: $8-10 remaining
- **Gas Fees**: 90% cheaper than Ethereum
- **Transaction Speed**: 1-2 seconds vs 15+ seconds

Your ETHGR tokens will show proper value recognition within hours!
