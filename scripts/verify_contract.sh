#!/bin/bash

# ETHGR Contract Verification Script
# Contract: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308

echo "🔍 ETHGR Contract Verification Process"
echo "======================================"

CONTRACT_ADDRESS="0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308"
CONTRACT_NAME="ETHGRecovery"
CONTRACT_PATH="src/ETHGRecovery.sol"

echo "📝 Contract Details:"
echo "   Address: $CONTRACT_ADDRESS"
echo "   Name: $CONTRACT_NAME"
echo "   Path: $CONTRACT_PATH"
echo ""

# Method 1: Direct Etherscan Verification
echo "🚀 Method 1: Direct Etherscan Verification"
echo "forge verify-contract \\"
echo "    --chain-id 1 \\"
echo "    --num-of-optimizations 200 \\"
echo "    --watch \\"
echo "    --constructor-args \$(cast abi-encode \"constructor()\") \\"
echo "    --compiler-version v0.8.30+commit.73712a01 \\"
echo "    $CONTRACT_ADDRESS \\"
echo "    $CONTRACT_PATH:$CONTRACT_NAME \\"
echo "    --etherscan-api-key \$ETHERSCAN_API_KEY"
echo ""

# Method 2: Sourcify Verification (Alternative)
echo "🔄 Method 2: Sourcify Verification (Alternative)"
echo "forge verify-contract \\"
echo "    --chain-id 1 \\"
echo "    --verifier sourcify \\"
echo "    $CONTRACT_ADDRESS \\"
echo "    $CONTRACT_PATH:$CONTRACT_NAME"
echo ""

# Method 3: Manual Verification Setup
echo "📋 Method 3: Manual Verification Data"
echo "Contract Address: $CONTRACT_ADDRESS"
echo "Contract Name: $CONTRACT_NAME"
echo "Compiler Version: v0.8.30+commit.73712a01"
echo "Optimization: Enabled (200 runs)"
echo "License: MIT"
echo "Constructor Arguments: (empty)"
echo ""

echo "💡 Next Steps:"
echo "1. Set ETHERSCAN_API_KEY environment variable"
echo "2. Run one of the verification methods above"
echo "3. Or copy the contract source from /verification-fix"
echo "4. Submit manually at https://etherscan.io/verifyContract"

# Check if we have required tools
if command -v forge &> /dev/null; then
    echo ""
    echo "✅ Foundry (forge) detected"
    if [ ! -z "$ETHERSCAN_API_KEY" ]; then
        echo "✅ ETHERSCAN_API_KEY is set"
        echo ""
        echo "🎯 Ready to execute verification!"
        echo "Run: ./scripts/verify_contract.sh execute"
    else
        echo "⚠️  ETHERSCAN_API_KEY not set"
        echo "   Get your API key from: https://etherscan.io/myapikey"
    fi
else
    echo ""
    echo "⚠️  Foundry not found. Install with:"
    echo "   curl -L https://foundry.paradigm.xyz | bash"
    echo "   foundryup"
fi

# Execute verification if requested
if [ "$1" = "execute" ]; then
    if [ -z "$ETHERSCAN_API_KEY" ]; then
        echo ""
        echo "❌ Cannot execute: ETHERSCAN_API_KEY not set"
        exit 1
    fi
    
    echo ""
    echo "🚀 Executing contract verification..."
    
    forge verify-contract \
        --chain-id 1 \
        --num-of-optimizations 200 \
        --watch \
        --constructor-args $(cast abi-encode "constructor()") \
        --compiler-version v0.8.30+commit.73712a01 \
        $CONTRACT_ADDRESS \
        $CONTRACT_PATH:$CONTRACT_NAME \
        --etherscan-api-key $ETHERSCAN_API_KEY
        
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Verification successful!"
        echo "Check your contract at:"
        echo "https://etherscan.io/address/$CONTRACT_ADDRESS#code"
    else
        echo ""
        echo "❌ Verification failed. Try manual method at:"
        echo "https://etherscan.io/verifyContract?a=$CONTRACT_ADDRESS"
    fi
fi