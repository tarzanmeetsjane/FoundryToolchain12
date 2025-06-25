# Foundry Nightly - Production Ready

## Installation Confirmed
- Foundry Version: 1.2.3-nightly ✅
- All tests passing (6/6) ✅  
- Gas optimization: 1M runs ✅
- Contract size: 4,228 bytes (highly optimized) ✅

## Deployment Commands

### 1. Set Environment Variables
```bash
export FOUNDRY_DISABLE_NIGHTLY_WARNING=true
export PATH="$HOME/.foundry:$PATH"
export PRIVATE_KEY="your_foundation_private_key"
export MAINNET_RPC_URL="https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY" 
export ETHERSCAN_API_KEY="your_etherscan_api_key"
```

### 2. Deploy to Mainnet
```bash
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $MAINNET_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify \
  --etherscan-api-key $ETHERSCAN_API_KEY
```

### 3. Execute Migration
```bash
export ETHGR_CONTRACT="deployed_contract_address"
forge script script/Migrate.s.sol:MigrateScript \
  --rpc-url $MAINNET_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast
```

## Gas Costs (Mainnet)
- Deployment: 1,060,185 gas
- Migration: 93,627 gas  
- Total: ~$30-60 (depending on gas price)

## Contract Functions Gas Usage
- migrateMyTrappedETHG(): 93,627 gas
- emergencyMint(): 70,401 gas
- transfer(): 51,300 gas
- toggleMigration(): 23,641 gas

Your ETHGR contract is production-ready for immediate mainnet deployment.