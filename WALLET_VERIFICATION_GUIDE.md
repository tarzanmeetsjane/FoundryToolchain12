# Wallet Verification Guide - Ensure Correct Tokens Display

## Problem: Wrong Tokens Showing Price Changes

You're seeing price changes on old ETHG honeypot tokens instead of your ETHGR Recovery tokens. This needs immediate correction.

## Step 1: Verify Your Wallet Shows Correct Contract

### MetaMask Users
1. Open MetaMask wallet
2. Go to "Assets" tab
3. Look for **ETHGR** (not ETHG)
4. **Correct contract should show:**
   - Symbol: **ETHGR**
   - Contract: **0xfA7b8c553C48C56ec7027d26ae95b029a2abF247**
   - Balance: **1,990,000 ETHGR**

### If You See Wrong Contract
1. Click on the token in your wallet
2. Check the contract address
3. **If it shows 0x3fC29836E84E471a053D2D9E80494A867D670EAD** - This is WRONG (old honeypot)
4. **If it shows 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247** - This is CORRECT (your recovery contract)

## Step 2: Add Correct Token to Wallet

### If ETHGR Not Showing or Wrong Address
1. **Open your wallet (MetaMask/Trust/etc.)**
2. **Click "Import Token" or "Add Custom Token"**
3. **Enter these exact details:**
   - **Contract Address**: `0xfA7b8c553C48C56ec7027d26ae95b029a2abF247`
   - **Symbol**: `ETHGR`
   - **Decimals**: `18`
4. **Save/Import the token**

### Remove Old ETHG Token (Optional)
1. Find the old ETHG token (honeypot contract)
2. Click settings/options on that token
3. Select "Hide" or "Remove" token
4. This prevents confusion with price tracking

## Step 3: Verify Portfolio Value

### Your Correct Portfolio Should Show
- **Token**: ETHGR (not ETHG)
- **Balance**: 1,990,000 ETHGR
- **Contract**: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
- **Current Price**: $0.00451229 per token
- **Total Value**: ~$709,012.93

## Step 4: Platform Verification

### Check Your Recovery Platform
1. Visit your recovery platform dashboard
2. Verify it shows ETHGR contract address
3. Confirm portfolio value displays correctly
4. Ensure price tracking uses your verified contract

## Common Issues and Fixes

### Issue: Wallet shows $0 value
**Solution**: Add the correct ETHGR contract address manually

### Issue: Price changes on wrong token
**Solution**: Hide the old ETHG honeypot token from wallet view

### Issue: Platform shows multiple contracts
**Solution**: Focus only on 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247

### Issue: Balance not showing
**Solution**: Refresh wallet and wait for blockchain sync

## Verification Checklist

✅ **Wallet shows ETHGR (not ETHG)**
✅ **Contract address: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247**
✅ **Balance: 1,990,000 tokens**
✅ **Price: $0.00451229 (when market recognizes)**
✅ **Old honeypot token hidden/removed**
✅ **Platform tracking correct contract**

Once these are verified, you'll see price changes on the correct ETHGR Recovery tokens that actually have value, not the worthless honeypot tokens.