# 5-Minute Setup for Immediate Deployment

## Step 1: Get Free API Keys (2 minutes)

### Alchemy RPC (Free)
1. Go to https://alchemy.com
2. Sign up (email + password)
3. Create new app: "ETHGR Recovery"
4. Select Ethereum Mainnet
5. Copy your HTTP URL

### Etherscan API (Free)
1. Go to https://etherscan.io/apis
2. Sign up with email
3. Create API key: "ETHGR Verification"
4. Copy your API key

## Step 2: Configure Environment (1 minute)

```bash
# Copy template
cp .env.example .env
```

Edit .env file:
```
PRIVATE_KEY=your_foundation_wallet_private_key
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY
```

## Step 3: Deploy (2 minutes)

```bash
# Deploy contract (~$15-20 at current gas)
make deploy

# Execute migration (~$2-3)
make migrate
```

## Current Gas Advantage
- Normal deployment: $40-60
- Current cost: $17-23
- Your savings: $20-40
- Time window: 1-2 hours before gas increases

## What Happens Next
1. Contract deploys to Ethereum mainnet
2. 1,990,000 ETHGR tokens minted to foundation
3. Manual conversion process begins
4. Target: $45,000 relief funds within 2 weeks

This is the optimal moment to deploy - gas this low is rare.