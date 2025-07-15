
#!/bin/bash

echo "=== Contract Verification for 0x6b7879a5d747e30a3adb37a9e41c046928fce933 ==="
echo "Analyzing contract and attempting verification..."
echo ""

# Contract details
CONTRACT_ADDRESS="0x6b7879a5d747e30a3adb37a9e41c046928fce933"
OWNER_ADDRESS="0x058C8FE01E5c9eaC6ee19e6673673B549B368843"

echo "Contract Address: $CONTRACT_ADDRESS"
echo "Expected Owner: $OWNER_ADDRESS"
echo ""

# Method 1: Verify with exact deployed contract
echo "=== Method 1: Using EXACT_DEPLOYED_CONTRACT.sol ==="
forge verify-contract \
  $CONTRACT_ADDRESS \
  EXACT_DEPLOYED_CONTRACT.sol:ETHGRecovery \
  --verifier-url 'https://api.routescan.io/v2/network/mainnet/evm/1/etherscan' \
  --etherscan-api-key 'verifyContract' \
  --num-of-optimizations 200 \
  --compiler-version v0.8.19+commit.7dd6d404

echo ""
echo "=== Method 2: Using Hardhat verification ==="
npx hardhat verify --network mainnet $CONTRACT_ADDRESS

echo ""
echo "=== Method 3: Alternative verification with constructor args ==="
forge verify-contract \
  $CONTRACT_ADDRESS \
  EXACT_DEPLOYED_CONTRACT.sol:ETHGRecovery \
  --verifier-url 'https://api.routescan.io/v2/network/mainnet/evm/1/etherscan' \
  --etherscan-api-key 'verifyContract' \
  --num-of-optimizations 200 \
  --compiler-version v0.8.19+commit.7dd6d404 \
  --constructor-args $(cast abi-encode "constructor()" )

echo ""
echo "Verification attempts completed!"
echo "Check Etherscan for verification status."
