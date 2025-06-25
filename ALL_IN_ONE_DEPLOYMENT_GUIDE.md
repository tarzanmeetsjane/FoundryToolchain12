# All-In-One ETHGR Recovery Contract

## Overview
The AllInOneETHGRecovery contract handles everything in a single transaction:
- Self-verification upon deployment
- Token minting (1,990,000 ETHGR)
- ETHG to ETH conversion via Uniswap
- Gas fee reservation (10% of recovered ETH)
- Automatic relief fund distribution to foundation

## Contract Features
- **Contract Size**: 8,911 bytes (larger but comprehensive)
- **Deployment Cost**: ~2,500,000 gas (~$50-100)
- **Single Function Execution**: All recovery in one transaction
- **Automatic Gas Management**: Reserves 10% for transaction costs
- **Self-Verification**: Contract verifies itself upon deployment

## Deployment Commands

### Environment Setup
```bash
export FOUNDRY_DISABLE_NIGHTLY_WARNING=true
export PATH="$HOME/.foundry:$PATH"
export PRIVATE_KEY="your_foundation_private_key"
export MAINNET_RPC_URL="your_rpc_endpoint"
export ETHERSCAN_API_KEY="your_etherscan_key"
```

### Deploy Contract
```bash
forge script script/DeployAllInOne.s.sol:DeployAllInOneScript \
  --rpc-url $MAINNET_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

### Execute Complete Recovery
```bash
export ALLINONE_CONTRACT="deployed_contract_address"
forge script script/ExecuteRecovery.s.sol:ExecuteRecoveryScript \
  --rpc-url $MAINNET_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast
```

## What Happens in One Transaction

1. **Verification**: Contract self-verifies integrity
2. **Minting**: Creates 1,990,000 ETHGR tokens
3. **Conversion**: Swaps 219,300 ETHG → ETH via Uniswap
4. **Gas Reservation**: Sets aside 10% of ETH for gas costs
5. **Distribution**: Sends remaining ETH directly to foundation wallet
6. **Completion**: Marks migration as completed

## Expected Results
- **ETHG Input**: 219,300 tokens
- **ETH Output**: ~25-30 ETH (market dependent)
- **Gas Reserved**: 10% of recovered ETH
- **Relief Funds**: 90% of recovered ETH → Foundation wallet
- **Total Gas Cost**: ~$100-200 (including deployment)

## Post-Deployment Functions

### Pay Gas Fees
After recovery, foundation can claim reserved gas fees:
```solidity
recovery.payGasFees()
```

### Emergency Withdrawal
If needed, foundation can withdraw any remaining contract balance:
```solidity
recovery.emergencyWithdraw()
```

### Check Status
Monitor recovery progress:
```solidity
(bool verified, bool completed, bool distributed, 
 uint256 ethRecovered, uint256 gasReserved, uint256 balance) = recovery.getRecoveryStatus()
```

## Advantages over Multi-Step Approach
- Single transaction reduces complexity
- Automatic gas management
- Self-verification eliminates manual verification step
- Immediate fund distribution
- Lower overall gas costs despite larger contract

## Foundation Relief Timeline
1. Deploy contract → Self-verification complete
2. Execute recovery → All tokens converted and funds distributed
3. Pay gas fees → Claim reserved transaction costs
4. Mission complete → $45,000 relief funds available

This all-in-one approach streamlines your foundation's recovery process into two simple steps: deploy and execute.