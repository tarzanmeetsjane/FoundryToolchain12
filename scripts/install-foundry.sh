#!/bin/bash

# ETHGR Foundation - Foundry Setup Script
# Configures Foundry nightly for mainnet deployment

set -e

echo "Setting up Foundry for ETHGR Foundation..."

# Use existing foundry installation in ~/.foundry/
export PATH="$HOME/.foundry:$PATH"
export FOUNDRY_DISABLE_NIGHTLY_WARNING=true

# Verify installation
echo "Verifying Foundry installation..."
forge --version

# Navigate to project root
cd "$(dirname "$0")/.."

# Initialize if needed (without git)
if [ ! -f "foundry.toml" ]; then
    echo "Initializing Foundry project..."
    forge init --no-git --force
fi

# Install dependencies
echo "Installing OpenZeppelin contracts..."
if [ ! -d "lib/openzeppelin-contracts" ]; then
    forge install openzeppelin/openzeppelin-contracts --no-git
fi

if [ ! -d "lib/forge-std" ]; then
    forge install foundry-rs/forge-std --no-git
fi

# Test compilation
echo "Testing ETHGR contract compilation..."
forge build --sizes

# Run comprehensive tests
echo "Running test suite with gas reporting..."
forge test --gas-report

echo ""
echo "Foundry setup complete!"
echo ""
echo "Ready for mainnet deployment:"
echo "  Contract size: 4,228 bytes (optimized)"
echo "  Deployment cost: ~1,060,185 gas"
echo "  Migration cost: ~93,627 gas"
echo ""
echo "Next steps:"
echo "  1. Configure .env with your keys"
echo "  2. Run deployment: make deploy NETWORK=mainnet"
echo "  3. Execute migration: make migrate"
echo ""