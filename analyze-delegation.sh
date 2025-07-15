
#!/bin/bash

echo "=== ETHGR Delegation Analysis ==="
echo "Contract: 0x6b7879a5d747e30a3adb37a9e41c046928fce933"
echo ""

CONTRACT_ADDRESS="0x6b7879a5d747e30a3adb37a9e41c046928fce933"

echo "=== Testing Contract Functions ==="

# Test for standard ERC20 functions
echo "Checking for ERC20 functions..."
cast call $CONTRACT_ADDRESS "name()" --rpc-url https://eth-mainnet.g.alchemy.com/v2/demo || echo "No name() function"
cast call $CONTRACT_ADDRESS "symbol()" --rpc-url https://eth-mainnet.g.alchemy.com/v2/demo || echo "No symbol() function"
cast call $CONTRACT_ADDRESS "totalSupply()" --rpc-url https://eth-mainnet.g.alchemy.com/v2/demo || echo "No totalSupply() function"

echo ""
echo "Checking for delegation functions..."

# Test for delegation-specific functions
cast call $CONTRACT_ADDRESS "nonces(address)" 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 --rpc-url https://eth-mainnet.g.alchemy.com/v2/demo || echo "No nonces() function"
cast call $CONTRACT_ADDRESS "DELEGATION_TYPEHASH()" --rpc-url https://eth-mainnet.g.alchemy.com/v2/demo || echo "No DELEGATION_TYPEHASH() function"
cast call $CONTRACT_ADDRESS "getDomainSeparator()" --rpc-url https://eth-mainnet.g.alchemy.com/v2/demo || echo "No getDomainSeparator() function"

echo ""
echo "Checking for recovery functions..."
cast call $CONTRACT_ADDRESS "migrationEnabled()" --rpc-url https://eth-mainnet.g.alchemy.com/v2/demo || echo "No migrationEnabled() function"
cast call $CONTRACT_ADDRESS "hasMigrated(address)" 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 --rpc-url https://eth-mainnet.g.alchemy.com/v2/demo || echo "No hasMigrated() function"

echo ""
echo "=== Contract Analysis Complete ==="
echo "This will help determine the correct contract type for verification."
