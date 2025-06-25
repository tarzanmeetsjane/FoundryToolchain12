# ETHGR Foundation - Foundry Build System
# Production deployment automation for mainnet

.PHONY: help build test test-gas clean deploy migrate verify setup deploy-allinone execute-recovery

# Default target
help:
        @echo "ETHGR Foundation - Foundry Commands"
        @echo ""
        @echo "Setup Commands:"
        @echo "  setup        Setup Foundry environment"
        @echo "  build        Compile contracts"
        @echo "  test         Run test suite"
        @echo "  test-gas     Run tests with gas reporting"
        @echo ""
        @echo "Deployment Commands:"
        @echo "  deploy       Deploy to mainnet (requires .env)"
        @echo "  migrate      Execute foundation migration"
        @echo "  verify       Verify contract on Etherscan"
        @echo ""
        @echo "Utility Commands:"
        @echo "  clean        Clean build artifacts"

# Environment setup
export FOUNDRY_DISABLE_NIGHTLY_WARNING=true
export PATH := $(HOME)/.foundry:$(PATH)

# Build contracts
build:
        forge build --sizes

# Run tests
test:
        forge test -vv

# Run tests with gas reporting
test-gas:
        forge test --gas-report

# Clean build artifacts
clean:
        forge clean

# Setup development environment
setup:
        ./scripts/install-foundry.sh

# Deploy to mainnet (requires .env file)
deploy:
        @if [ ! -f .env ]; then \
                echo "Error: .env file not found. Copy .env.example and configure your keys."; \
                exit 1; \
        fi
        forge script script/Deploy.s.sol:DeployScript \
                --rpc-url $$MAINNET_RPC_URL \
                --private-key $$PRIVATE_KEY \
                --broadcast \
                --verify \
                --etherscan-api-key $$ETHERSCAN_API_KEY

# Execute foundation migration
migrate:
        @if [ ! -f .env ]; then \
                echo "Error: .env file not found. Configure ETHGR_CONTRACT address."; \
                exit 1; \
        fi
        forge script script/Migrate.s.sol:MigrateScript \
                --rpc-url $$MAINNET_RPC_URL \
                --private-key $$PRIVATE_KEY \
                --broadcast

# Verify contract manually
verify:
        @if [ ! -f .env ]; then \
                echo "Error: .env file not found. Configure ETHERSCAN_API_KEY."; \
                exit 1; \
        fi
        forge verify-contract \
                $$ETHGR_CONTRACT \
                src/ETHGRecovery.sol:ETHGRecovery \
                --etherscan-api-key $$ETHERSCAN_API_KEY

# Deploy all-in-one contract
deploy-allinone:
        @if [ ! -f .env ]; then \
                echo "Error: .env file not found. Copy .env.example and configure your keys."; \
                exit 1; \
        fi
        forge script script/DeployAllInOne.s.sol:DeployAllInOneScript \
                --rpc-url $$MAINNET_RPC_URL \
                --private-key $$PRIVATE_KEY \
                --broadcast \
                --verify \
                --etherscan-api-key $$ETHERSCAN_API_KEY

# Execute complete recovery (all-in-one)
execute-recovery:
        @if [ ! -f .env ]; then \
                echo "Error: .env file not found. Configure ALLINONE_CONTRACT address."; \
                exit 1; \
        fi
        forge script script/ExecuteRecovery.s.sol:ExecuteRecoveryScript \
                --rpc-url $$MAINNET_RPC_URL \
                --private-key $$PRIVATE_KEY \
                --broadcast