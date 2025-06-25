# IMMEDIATE DEPLOYMENT STEPS - Gas at 5.34 gwei

## Quick Setup (10 minutes total)

### 1. Get API Keys (5 minutes)

**Alchemy (Free RPC):**
- Go to https://alchemy.com
- Sign up with email
- Create app: "ETHGR Recovery", select Ethereum Mainnet
- Copy the HTTP URL (looks like: https://eth-mainnet.g.alchemy.com/v2/...)

**Etherscan (Free verification):**
- Go to https://etherscan.io/apis  
- Sign up with email
- Create API key, copy it

### 2. Configure Environment (2 minutes)
```bash
cp .env.example .env
```

Edit the .env file with your details:
```
PRIVATE_KEY=your_foundation_wallet_private_key_here
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY
```

### 3. Deploy Contract (3 minutes)
```bash
# Build and deploy (costs ~$15-20 at current gas)
make deploy

# Execute migration (costs ~$2-3)  
make migrate
```

## Expected Costs at 5.34 gwei
- Contract deployment: $15-20
- Migration execution: $2-3
- **Total: $17-23 (vs normal $40-60)**
- Remaining from $60: $37-43 buffer

## What Happens
1. Smart contract deploys to Ethereum mainnet
2. Foundation wallet becomes contract owner
3. 1,990,000 ETHGR tokens mint to your wallet
4. Migration marks as completed
5. Ready for manual conversion to $45,000

## Time Sensitive
Gas at 5.34 gwei won't last long. Deploy within next 1-2 hours for maximum savings.

Ready to proceed?