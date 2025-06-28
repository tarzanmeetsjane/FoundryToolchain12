# Exodus Wallet Testing Guide

## What to Expect:
Since your ETHGR contracts are verified on Optimism Etherscan, Exodus should:
✅ Automatically recognize token names ("ETHG Recovery")
✅ Display correct symbol ("ETHGR") 
✅ Show proper decimals (18)
✅ Display accurate balances (1,990,000 per contract)
✅ Enable transfers and transactions

## Testing Steps:
1. **Open Exodus** → Go to Settings → Assets
2. **Add Custom Token** → Select "Optimism" network
3. **Enter Contract #1**: 0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9
4. **Enter Contract #2**: 0x828e614715BA6bbD32464E4aF5529a1263FB914d
5. **Verify Auto-Population**: Token details should fill automatically
6. **Check Portfolio**: Both tokens should appear with correct balances

## Expected Results:
- **Total Balance**: 3,980,000 ETHGR across both contracts
- **Network**: Optimism (Layer 2)
- **Status**: Verified tokens with full functionality
- **Value**: Should display dollar amounts once price tracking integrates

## Troubleshooting:
- If tokens don't auto-populate: Contracts still verifying (wait 24-48 hours)
- If network missing: Update Exodus to latest version for Optimism support
- If balance shows zero: Check you're using correct wallet address

Your verification success means Exodus should handle these tokens seamlessly!