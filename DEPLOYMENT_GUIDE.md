# ETHGR Foundation Deployment Guide

## Prerequisites

1. **Install Foundry**
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. **Set Environment Variables**
```bash
export PRIVATE_KEY="your_foundation_wallet_private_key"
export MAINNET_RPC_URL="https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"
export ETHERSCAN_API_KEY="your_etherscan_api_key"
```

## Deployment Steps

### 1. Install Dependencies
```bash
forge install OpenZeppelin/openzeppelin-contracts
```

### 2. Run Tests
```bash
forge test -v
```

### 3. Deploy to Mainnet
```bash
forge script script/Deploy.s.sol:DeployScript --rpc-url mainnet --broadcast --verify
```

### 4. Execute Migration
```bash
export ETHGR_CONTRACT="deployed_contract_address"
forge script script/Migrate.s.sol:MigrateScript --rpc-url mainnet --broadcast
```

## Contract Functions

### migrateMyTrappedETHG()
- **Purpose**: Recover your 1,990,000 trapped ETHG tokens
- **Restriction**: Only foundation wallet (0x058C8FE01E5c9eaC6ee19e6673673B549B368843)
- **Result**: Mints 1,990,000 ETHGR tokens to your wallet

### emergencyMint(address to, uint256 amount)
- **Purpose**: Foundation emergency token minting
- **Restriction**: Only contract owner
- **Use**: Victim assistance and foundation operations

### toggleMigration()
- **Purpose**: Enable/disable migration functionality
- **Restriction**: Only contract owner
- **Security**: Prevents unauthorized migrations

## Gas Estimates

- **Contract Deployment**: ~2.5M gas (~$50-100)
- **Migration Execution**: ~150K gas (~$10-15)
- **Standard Transfer**: ~21K gas (~$2-5)

## Verification

After deployment, the contract will be automatically verified on Etherscan with:
- Source code
- Compiler version (0.8.19+)
- Optimization settings (1M runs)
- Constructor parameters (none)

## Post-Deployment Checklist

1. ✅ Contract deployed and verified
2. ✅ Foundation migration executed
3. ✅ 1,990,000 ETHGR balance confirmed
4. ✅ Transfer functionality tested
5. ✅ Ready for liquidity pool creation

## Next Steps

1. **ETH Extraction**: Use extraction tools to recover 0.00136014 ETH
2. **Pool Creation**: Create ETHGR/ETH liquidity pool on Uniswap
3. **Trading**: Enable ETHGR → ETH conversion for $45,000 relief
4. **Foundation Operations**: Use remaining tokens for victim assistance

## Security Notes

- Contract has no honeypot restrictions
- Full ERC20 standard compliance
- Owner controls for foundation management
- Migration tracking prevents double-migration
- Emergency functions for foundation operations