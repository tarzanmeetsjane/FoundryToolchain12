#!/bin/bash

echo "=== ETHGR Contract Verification ==="
echo "Contract: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308"

# Install Foundry if not present
if ! command -v forge &> /dev/null; then
    echo "Installing Foundry..."
    curl -L https://foundry.paradigm.xyz | bash
    export PATH="$HOME/.foundry/bin:$PATH"
    if [ -f ~/.foundry/bin/foundryup ]; then
        ~/.foundry/bin/foundryup
    fi
fi

# Ensure PATH includes foundry
export PATH="$HOME/.foundry/bin:$PATH"
echo "Using exact deployed contract source"
echo ""

# Method 1: Using exact deployed contract source
echo "Attempting verification with exact deployed contract source..."
forge verify-contract \
  0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308 \
  EXACT_DEPLOYED_CONTRACT.sol:ETHGRecovery \
  --verifier-url 'https://api.routescan.io/v2/network/mainnet/evm/1/etherscan' \
  --etherscan-api-key 'verifyContract' \
  --num-of-optimizations 200 \
  --compiler-version v0.8.19+commit.7dd6d404 \
  --constructor-args 0x000000000000000000000000058c8fe01e5c9eac6ee19e6673673b549b368843

echo ""
echo "If that fails, trying with different constructor args..."

# Method 2: Alternative constructor args
forge verify-contract \
  0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308 \
  EXACT_DEPLOYED_CONTRACT.sol:ETHGRecovery \
  --verifier-url 'https://api.routescan.io/v2/network/mainnet/evm/1/etherscan' \
  --etherscan-api-key 'verifyContract' \
  --num-of-optimizations 200 \
  --compiler-version v0.8.19+commit.7dd6d404

echo ""
echo "Verification commands executed!"