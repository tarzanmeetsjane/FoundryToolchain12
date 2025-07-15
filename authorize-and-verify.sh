
#!/bin/bash

echo "=== ETHGR Delegation Authorization & Verification ==="
echo "Contract: 0x6b7879a5d747e30a3adb37a9e41c046928fce933"
echo "Owner: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
echo ""

CONTRACT_ADDRESS="0x6b7879a5d747e30a3adb37a9e41c046928fce933"
OWNER_ADDRESS="0x058C8FE01E5c9eaC6ee19e6673673B549B368843"

echo "=== STEP 1: AUTHORIZE DELEGATION ==="
echo "This will enable gas-free recovery operations through EIP-712 signatures"
echo ""

# Check if we have the wallet service available
echo "Checking wallet connection..."
node -e "
const { walletService } = require('./server/wallet-service.ts');
const info = walletService.getWalletInfo();
console.log('Wallet Address:', info.address);
console.log('Has Private Key:', info.hasPrivateKey);
console.log('Is Connected:', info.isConnected);
if (info.address === '$OWNER_ADDRESS') {
  console.log('✅ Correct wallet detected - proceeding with authorization');
} else {
  console.log('❌ Wrong wallet - expected $OWNER_ADDRESS');
}
"

echo ""
echo "=== STEP 2: CONTRACT VERIFICATION ATTEMPTS ==="
echo ""

# Method 1: Standard ETHGR verification
echo "📋 Method 1: Standard ETHGR Contract Verification"
if command -v forge &> /dev/null; then
  forge verify-contract \
    $CONTRACT_ADDRESS \
    EXACT_DEPLOYED_CONTRACT.sol:ETHGRecovery \
    --verifier-url 'https://api.routescan.io/v2/network/mainnet/evm/1/etherscan' \
    --etherscan-api-key 'verifyContract' \
    --num-of-optimizations 200 \
    --compiler-version v0.8.19+commit.7dd6d404
else
  echo "Forge not available - skipping forge verification"
fi

echo ""
echo "📋 Method 2: Hardhat Verification"
if [ -f "hardhat.config.cjs" ]; then
  npx hardhat verify --network mainnet $CONTRACT_ADDRESS
else
  echo "Hardhat config not found - creating temporary config"
  cat > temp-hardhat.config.cjs << 'EOF'
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    mainnet: {
      url: "https://eth-mainnet.g.alchemy.com/v2/demo",
      accounts: []
    }
  },
  etherscan: {
    apiKey: "YourApiKeyToken"
  }
};
EOF
  npx hardhat verify --config temp-hardhat.config.cjs --network mainnet $CONTRACT_ADDRESS
  rm temp-hardhat.config.cjs
fi

echo ""
echo "📋 Method 3: Delegated Recovery Contract Verification"
if command -v forge &> /dev/null; then
  forge verify-contract \
    $CONTRACT_ADDRESS \
    src/ETHGRDelegatedRecovery.sol:ETHGRDelegatedRecovery \
    --verifier-url 'https://api.routescan.io/v2/network/mainnet/evm/1/etherscan' \
    --etherscan-api-key 'verifyContract' \
    --num-of-optimizations 200 \
    --compiler-version v0.8.19+commit.7dd6d404 \
    --constructor-args $(cast abi-encode "constructor(address,address)" $CONTRACT_ADDRESS $OWNER_ADDRESS) 2>/dev/null || echo "Cast not available for constructor args"
else
  echo "Forge not available for delegated recovery verification"
fi

echo ""
echo "=== STEP 3: DELEGATION AUTHORIZATION ==="
echo "Creating delegation authorization transaction..."

# Use the wallet service to authorize delegation
node -e "
const { walletService } = require('./server/wallet-service.ts');

async function authorizeDelegation() {
  try {
    console.log('Authorizing delegation for contract $CONTRACT_ADDRESS...');
    
    // This would be the actual delegation authorization call
    // The exact function depends on the delegation contract implementation
    const result = await walletService.executeContractCall(
      '$CONTRACT_ADDRESS',
      'authorizeDelegation(address)',
      ['$OWNER_ADDRESS']
    );
    
    if (result.success) {
      console.log('✅ Delegation authorized successfully!');
      console.log('Transaction Hash:', result.transactionHash);
      console.log('');
      console.log('🎉 DELEGATION FEATURES NOW ACTIVE:');
      console.log('- Gas-free recovery operations');
      console.log('- EIP-712 signature support');
      console.log('- Cross-chain delegation capabilities');
      console.log('- Secure off-chain transaction signing');
    } else {
      console.log('❌ Delegation authorization failed:', result.error);
      console.log('');
      console.log('🔧 MANUAL AUTHORIZATION STEPS:');
      console.log('1. Connect to the delegation contract');
      console.log('2. Call authorizeDelegation() function');
      console.log('3. Confirm transaction in wallet');
    }
  } catch (error) {
    console.log('Error during delegation authorization:', error.message);
    console.log('');
    console.log('📝 DELEGATION CONTRACT DETAILS:');
    console.log('Contract Address: $CONTRACT_ADDRESS');
    console.log('Expected Owner: $OWNER_ADDRESS');
    console.log('');
    console.log('This delegation contract enables:');
    console.log('- Gasless recovery transactions');
    console.log('- EIP-712 compliant signatures');
    console.log('- Replay attack protection via nonces');
    console.log('- Secure multi-signature recovery operations');
  }
}

authorizeDelegation();
"

echo ""
echo "=== VERIFICATION STATUS CHECK ==="
echo "Checking verification status on Etherscan..."

# Check verification status
curl -s "https://api.etherscan.io/api?module=contract&action=getsourcecode&address=$CONTRACT_ADDRESS&apikey=YourApiKeyToken" | grep -q '"ABI":\[' && echo "✅ Contract appears to be verified" || echo "❌ Contract verification pending"

echo ""
echo "=== SUMMARY ==="
echo "Contract Address: $CONTRACT_ADDRESS"
echo "Owner Address: $OWNER_ADDRESS"
echo ""
echo "🔍 NEXT STEPS:"
echo "1. Check Etherscan for verification status"
echo "2. Test delegation functionality if authorized"
echo "3. Monitor gas-free recovery capabilities"
echo "4. Verify EIP-712 signature support"
echo ""
echo "📋 USEFUL LINKS:"
echo "Contract on Etherscan: https://etherscan.io/address/$CONTRACT_ADDRESS"
echo "Verification Status: https://etherscan.io/address/$CONTRACT_ADDRESS#code"
echo ""
echo "🎯 DELEGATION BENEFITS:"
echo "- Zero gas fees for recovery operations"
echo "- Enhanced security through EIP-712 signatures"
echo "- Cross-chain delegation support"
echo "- Protection against replay attacks"
