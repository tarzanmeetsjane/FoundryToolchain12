# ETHGR Meta-Transaction Contract Deployment Guide

## 🎯 Overview

This guide covers the production deployment of the ETHGR Meta-Transaction contract, which enables users to pay for gas using ETHGR tokens through meta-transactions.

## 📋 Prerequisites

- **Hardhat** development environment configured
- **Ethereum wallet** with sufficient ETH for deployment
- **Environment variables** properly configured
- **Network access** to target blockchain (Mainnet/Testnet)

## 🔧 Configuration Setup

### 1. Environment Variables

Create or update your `.env` file with the following variables:

```bash
# Network Configuration
NETWORK_ID=1  # 1 for Mainnet, 11155111 for Sepolia
NETWORK_NAME=mainnet

# Contract Addresses
ETHGR_TOKEN_ADDRESS=0x...  # Your ETHGR token contract address
WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2  # Mainnet WETH
UNISWAP_ROUTER_ADDRESS=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D  # Mainnet Uniswap V2

# Gas Configuration
GAS_LIMIT=5000000
GAS_PRICE=20000000000  # 20 Gwei

# Security
OWNER_ADDRESS=0x...  # Your wallet address
MULTISIG_ADDRESS=0x...  # Optional: Multisig wallet

# Verification
ETHERSCAN_API_KEY=your_api_key_here
SOURCIFY_ENABLED=true
```

### 2. Network Configuration

Ensure your `hardhat.config.js` includes the target network:

```javascript
module.exports = {
  networks: {
    mainnet: {
      url: process.env.MAINNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1,
      gasPrice: 20000000000
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    }
  }
};
```

## 🚀 Deployment Steps

### Step 1: Compile Contracts

```bash
npx hardhat compile
```

### Step 2: Verify Configuration

```bash
# Check environment variables
echo "ETHGR Token: $ETHGR_TOKEN_ADDRESS"
echo "WETH Address: $WETH_ADDRESS"
echo "Uniswap Router: $UNISWAP_ROUTER_ADDRESS"
```

### Step 3: Deploy Contract

```bash
# Deploy to mainnet
npx hardhat run scripts/deploy-ethgr-meta-transaction.js --network mainnet

# Or deploy to testnet first
npx hardhat run scripts/deploy-ethgr-meta-transaction.js --network sepolia
```

### Step 4: Verify Deployment

The deployment script automatically verifies:
- Contract address deployment
- Constructor parameters
- Owner assignment
- Initial state variables

## 🔍 Post-Deployment Verification

### 1. Contract State Check

```javascript
const contract = await ethers.getContractAt("ETHGRMetaTransaction", contractAddress);

// Verify addresses
console.log("ETHGR Token:", await contract.ethgrToken());
console.log("WETH Address:", await contract.wethAddress());
console.log("Uniswap Router:", await contract.uniswapRouter());
console.log("Owner:", await contract.owner());
```

### 2. Functionality Test

Test basic contract functions:

```javascript
// Get user nonce
const nonce = await contract.getNonce(userAddress);

// Check gas price multiplier
const multiplier = await contract.gasPriceMultiplier();

// Verify minimum ETHGR amount
const minAmount = await contract.minEthgrForGas();
```

## 🛡️ Security Considerations

### 1. Access Control
- **Owner Functions**: Only owner can call administrative functions
- **Emergency Withdrawals**: Owner can withdraw funds in emergencies
- **Parameter Updates**: Gas price multiplier and minimum amounts adjustable

### 2. Input Validation
- **Deadline Checks**: All transactions have expiration timestamps
- **Amount Validation**: Minimum ETHGR amounts enforced
- **Signature Verification**: EIP-712 compliant signature validation

### 3. Gas Optimization
- **Efficient Swaps**: Optimized Uniswap integration
- **Refund Mechanism**: Excess ETH automatically refunded
- **Gas Tracking**: Precise gas usage monitoring

## 🔗 Contract Verification

### Etherscan Verification

```bash
npx hardhat verify --network mainnet CONTRACT_ADDRESS \
  "ETHGR_TOKEN_ADDRESS" \
  "WETH_ADDRESS" \
  "UNISWAP_ROUTER_ADDRESS"
```

### Sourcify Verification

```bash
# Sourcify verification is automatic if enabled
# Ensure your contract is properly flattened and verified
```

## 📊 Monitoring & Maintenance

### 1. Event Monitoring
Monitor these key events:
- `MetaTransactionExecuted`: Successful meta-transactions
- `GaslessSwapExecuted`: ETHGR to ETH swaps
- Gas usage patterns and costs

### 2. Regular Checks
- Gas price multiplier adjustments
- Minimum ETHGR amount updates
- Emergency withdrawal capabilities
- Contract balance monitoring

### 3. Performance Metrics
- Transaction success rates
- Gas cost efficiency
- User adoption patterns
- ETHGR token utilization

## 🚨 Emergency Procedures

### 1. Emergency Withdrawals
```javascript
// Withdraw ETH
await contract.emergencyWithdrawEth();

// Withdraw ETHGR tokens
await contract.emergencyWithdrawEthgr();
```

### 2. Parameter Adjustments
```javascript
// Update gas price multiplier
await contract.setGasPriceMultiplier(150); // 150%

// Update minimum ETHGR amount
await contract.setMinEthgrForGas(ethers.parseEther("500")); // 500 ETHGR
```

## 📝 Deployment Checklist

- [ ] Environment variables configured
- [ ] Network configuration verified
- [ ] Contract compiled successfully
- [ ] Deployment script tested
- [ ] Contract deployed to target network
- [ ] Deployment verification completed
- [ ] Contract verified on Etherscan/Sourcify
- [ ] Initial functionality tested
- [ ] Security parameters reviewed
- [ ] Monitoring setup configured
- [ ] Documentation updated
- [ ] Team notified of deployment

## 🎉 Success Criteria

- Contract deployed successfully
- All constructor parameters verified
- Owner permissions confirmed
- Basic functionality tested
- Contract verified on block explorer
- Production monitoring active

## 📞 Support

For deployment issues or questions:
1. Check the deployment logs
2. Verify environment configuration
3. Review contract compilation
4. Check network connectivity
5. Verify wallet permissions

---

**⚠️ IMPORTANT**: This is a production deployment. Ensure all security measures are in place and thoroughly test on testnets before mainnet deployment.


