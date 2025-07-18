#!/bin/bash

# ETHGR Contract Verification Script
# This script verifies the ETHGR contract on Ethereum mainnet

echo "🔍 ETHGR Contract Verification Script"
echo "========================================"

# Contract details
CONTRACT_ADDRESS="0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308"
CHAIN_ID="1"
COMPILER_VERSION="0.8.30"

echo "Contract Address: $CONTRACT_ADDRESS"
echo "Chain ID: $CHAIN_ID"
echo "Compiler Version: $COMPILER_VERSION"
echo ""

# Check if forge is installed
if ! command -v forge &> /dev/null; then
    echo "❌ Error: Forge is not installed."
    echo "Please install Foundry first:"
    echo "curl -L https://foundry.paradigm.xyz | bash"
    echo "foundryup"
    exit 1
fi

echo "✅ Forge is installed"

# Check if contract source exists
if [ ! -f "src/ETHGRecovery.sol" ]; then
    echo "❌ Error: Contract source file not found at src/ETHGRecovery.sol"
    echo "Please ensure the contract source file exists"
    exit 1
fi

echo "✅ Contract source file found"

# Verify contract using Foundry
echo ""
echo "🚀 Starting contract verification..."
echo ""

# Method 1: Try Sourcify first (fastest)
echo "Method 1: Attempting Sourcify verification..."
forge verify-contract \
    --chain-id $CHAIN_ID \
    --verifier sourcify \
    $CONTRACT_ADDRESS \
    src/ETHGRecovery.sol:ETHGRecovery

if [ $? -eq 0 ]; then
    echo "✅ Sourcify verification successful!"
    exit 0
fi

echo "⚠️  Sourcify verification failed, trying Etherscan..."

# Method 2: Try Etherscan (requires API key)
if [ -z "$ETHERSCAN_API_KEY" ]; then
    echo "❌ Error: ETHERSCAN_API_KEY environment variable not set"
    echo "Please set your Etherscan API key:"
    echo "export ETHERSCAN_API_KEY=your_api_key_here"
    exit 1
fi

echo "Method 2: Attempting Etherscan verification..."
forge verify-contract \
    --chain-id $CHAIN_ID \
    --verifier etherscan \
    --etherscan-api-key $ETHERSCAN_API_KEY \
    $CONTRACT_ADDRESS \
    src/ETHGRecovery.sol:ETHGRecovery

if [ $? -eq 0 ]; then
    echo "✅ Etherscan verification successful!"
    echo ""
    echo "🎉 Contract is now verified!"
    echo "View on Etherscan: https://etherscan.io/address/$CONTRACT_ADDRESS"
    exit 0
else
    echo "❌ Etherscan verification failed"
    echo ""
    echo "📋 Manual verification steps:"
    echo "1. Go to https://etherscan.io/verifyContract?a=$CONTRACT_ADDRESS"
    echo "2. Select 'Solidity (Single file)'"
    echo "3. Compiler version: v$COMPILER_VERSION"
    echo "4. Paste your contract source code"
    echo "5. Constructor arguments: (leave empty)"
    echo "6. Submit for verification"
    exit 1
fi