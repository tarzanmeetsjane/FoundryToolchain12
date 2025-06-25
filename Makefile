# ETHGR Foundation Deployment Makefile

# Environment variables
-include .env

# Default network
NETWORK ?= mainnet

# Contract addresses (set after deployment)
ETHGR_CONTRACT ?= 

# Commands
.PHONY: help install test deploy migrate verify clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	forge install

build: ## Build contracts
	forge build

test: ## Run tests
	forge test -vv

test-gas: ## Run tests with gas reporting
	forge test --gas-report

deploy: ## Deploy ETHGR contract to mainnet
	forge script script/Deploy.s.sol:DeployScript --rpc-url $(NETWORK) --broadcast --verify

deploy-dry: ## Dry run deployment
	forge script script/Deploy.s.sol:DeployScript --rpc-url $(NETWORK)

migrate: ## Execute foundation migration
	@echo "Migrating with contract: $(ETHGR_CONTRACT)"
	forge script script/Migrate.s.sol:MigrateScript --rpc-url $(NETWORK) --broadcast

verify: ## Verify contract on Etherscan
	forge verify-contract $(ETHGR_CONTRACT) src/ETHGRecovery.sol:ETHGRecovery --chain $(NETWORK)

clean: ## Clean build artifacts
	forge clean

# Development helpers
dev-deploy: ## Deploy to local testnet
	anvil & forge script script/Deploy.s.sol:DeployScript --rpc-url http://localhost:8545 --broadcast

# Foundation specific commands
foundation-check: ## Check foundation wallet balance
	cast balance 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 --rpc-url $(NETWORK)

ethgr-balance: ## Check ETHGR balance
	cast call $(ETHGR_CONTRACT) "balanceOf(address)" 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 --rpc-url $(NETWORK)

migration-status: ## Check if foundation has migrated
	cast call $(ETHGR_CONTRACT) "hasMigrated(address)" 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 --rpc-url $(NETWORK)

total-supply: ## Check total ETHGR supply
	cast call $(ETHGR_CONTRACT) "totalSupply()" --rpc-url $(NETWORK)