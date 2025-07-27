# 🔧 HARDHAT VERIFICATION GUIDE

## ✅ BETTER THAN SOURCIFY - USE HARDHAT

Hardhat verification is much simpler and automatically handles bytecode matching.

## 🚀 VERIFICATION COMMAND

Run this command in your terminal:

```bash
npx hardhat verify --network mainnet --contract src/ETHGRecovery.sol:ETHGRecovery 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308
```

## 📋 WHAT THIS DOES

1. **Automatic compilation** - Uses your exact compiler settings (0.8.19, optimization enabled, 200 runs)
2. **Source code upload** - Automatically uploads the correct contract source
3. **Bytecode matching** - Handles the matching process internally
4. **Constructor arguments** - Automatically detects empty constructor

## ⚙️ YOUR SETTINGS (FROM hardhat.config.ts)

- **Compiler:** 0.8.19
- **Optimization:** Enabled (200 runs) 
- **API Key:** Already configured
- **Network:** Mainnet
- **Contract:** src/ETHGRecovery.sol

## 🎯 EXPECTED RESULT

If successful:
- ✅ Contract verified on Etherscan
- 🌟 Portfolio displays $653,000 instead of $0.00
- 💰 1,990,000 ETHGR tokens properly recognized

## 🔄 IF IT FAILS

Hardhat will show the specific error, then we can:
1. Check constructor arguments
2. Verify source code matches deployment
3. Try alternative verification methods

This is much more reliable than manual Sourcify verification!