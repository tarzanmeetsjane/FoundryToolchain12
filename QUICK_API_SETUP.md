# Complete API Setup (2 minutes remaining)

## Alchemy (You're doing this now)
- Complete the app creation at dashboard.alchemy.com
- Copy the HTTP URL from your dashboard
- Format: `https://eth-mainnet.g.alchemy.com/v2/ABC123...`

## Etherscan API (30 seconds)
- Visit: https://etherscan.io/apis
- Click "Add" to create new API key
- Name it "ETHGR Verification"
- Copy the generated key

## Foundation Wallet Private Key
- Open MetaMask with wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
- Click Account Details → Export Private Key
- Enter password and copy the 64-character hex string

## Update .env File
Replace these three lines in your .env:
```
PRIVATE_KEY=0xYOUR_ACTUAL_PRIVATE_KEY_HERE
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY
```

## Deploy Commands (Ready when .env complete)
```bash
make deploy && make migrate
```

Gas is still low - deploy immediately after setup complete.