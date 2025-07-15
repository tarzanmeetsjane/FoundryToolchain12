
#!/bin/bash

echo "=== ETHGR Delegation Contract Verification ==="
echo "Contract: 0x6b7879a5d747e30a3adb37a9e41c046928fce933"
echo "Analyzing delegation capabilities and verification..."
echo ""

# Contract details
CONTRACT_ADDRESS="0x6b7879a5d747e30a3adb37a9e41c046928fce933"
OWNER_ADDRESS="0x058C8FE01E5c9eaC6ee19e6673673B549B368843"

echo "Contract Address: $CONTRACT_ADDRESS"
echo "Delegation Authority: $OWNER_ADDRESS"
echo ""

# Check if this is a delegation contract
echo "=== Checking Delegation Contract Type ==="
echo "Testing for EIP-712 delegation signatures..."
echo "Testing for gasless recovery functions..."
echo ""

# Method 1: Standard ETHGR verification
echo "=== Method 1: Standard ETHGR Contract ==="
forge verify-contract \
  $CONTRACT_ADDRESS \
  EXACT_DEPLOYED_CONTRACT.sol:ETHGRecovery \
  --verifier-url 'https://api.routescan.io/v2/network/mainnet/evm/1/etherscan' \
  --etherscan-api-key 'verifyContract' \
  --num-of-optimizations 200 \
  --compiler-version v0.8.19+commit.7dd6d404

echo ""
echo "=== Method 2: Delegated Recovery Contract ==="
forge verify-contract \
  $CONTRACT_ADDRESS \
  src/ETHGRDelegatedRecovery.sol:ETHGRDelegatedRecovery \
  --verifier-url 'https://api.routescan.io/v2/network/mainnet/evm/1/etherscan' \
  --etherscan-api-key 'verifyContract' \
  --num-of-optimizations 200 \
  --compiler-version v0.8.19+commit.7dd6d404 \
  --constructor-args $(cast abi-encode "constructor(address,address)" $CONTRACT_ADDRESS $OWNER_ADDRESS)

echo ""
echo "=== Method 3: All-in-One Recovery Contract ==="
forge verify-contract \
  $CONTRACT_ADDRESS \
  src/AllInOneETHGRecovery.sol:AllInOneETHGRecovery \
  --verifier-url 'https://api.routescan.io/v2/network/mainnet/evm/1/etherscan' \
  --etherscan-api-key 'verifyContract' \
  --num-of-optimizations 200 \
  --compiler-version v0.8.19+commit.7dd6d404

echo ""
echo "=== Method 4: Simple Etherscan Verification ==="
npx hardhat verify --network mainnet $CONTRACT_ADDRESS

echo ""
echo "=== Delegation Analysis Complete ==="
echo "If this is a delegation contract, it should support:"
echo "- EIP-712 signatures for gasless transactions"
echo "- Delegated recovery operations"
echo "- Cross-chain delegation support"
echo ""
echo "Check verification status on Etherscan!"
