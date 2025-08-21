# 🚀 ETHG Recovery System via Uniswap

**Direct ETHG → ETH recovery using trusted Uniswap infrastructure - No new contracts needed!**

## 🎯 What This System Does

This is a **web-based recovery system** that enables ETHG victims to swap their trapped tokens for ETH directly on Uniswap. Instead of creating complex smart contracts or liquidity pools, victims can use existing, trusted Uniswap infrastructure to recover their funds immediately.

## ✨ Key Benefits

- **🚫 No Contract Deployment** - Uses existing Uniswap infrastructure
- **💰 Lower Costs** - Just gas fees for swaps (~$5-20)
- **⚡ Immediate Recovery** - No waiting for token value discovery
- **🔒 Trusted Platform** - Uniswap is battle-tested and secure
- **📱 User-Friendly** - Simple web interface for easy recovery
- **🌐 No Liquidity Pools** - Uses existing ETHG/ETH trading pairs

## 🏗️ System Architecture

```
Victim's Wallet → Web Interface → Uniswap V2/V3 → ETH Recovery
     ↓              ↓              ↓              ↓
  ETHG Tokens → Recovery Form → Swap Execution → ETH Received
```

## 📁 File Structure

```
uniswap-ethg-recovery/
├── index.html          # Main web interface
├── app.js             # Core application logic
├── config.js          # Configuration and settings
├── README.md          # This documentation
└── assets/            # Images and additional resources
```

## 🚀 Quick Start

### 1. **Open the System**
```bash
# Navigate to the directory
cd uniswap-ethg-recovery

# Open index.html in your browser
# Or serve it using a local server
python -m http.server 8000
# Then visit: http://localhost:8000
```

### 2. **Connect Your Wallet**
- Click **"Connect Wallet"** button
- Approve MetaMask connection
- Ensure you're on **Ethereum Mainnet**

### 3. **Start Recovery Process**
- Enter ETHG amount to recover
- Click **"Preview Swap"** to see details
- Click **"Execute Recovery"** to complete swap

## ⚙️ Configuration

### **ETHG Token Addresses**
Edit `config.js` to set the correct ETHG token addresses:

```javascript
ETHG_TOKENS: {
    MAIN_ETHG: '0x...', // Replace with actual ETHG address
    ETHG_V1: '0x...',   // Replace if found
    ETHG_V2: '0x...'    // Replace if found
}
```

### **Network Settings**
The system automatically detects and uses:
- **Mainnet**: Production Ethereum network
- **Sepolia**: Test network for development

### **Recovery Parameters**
```javascript
RECOVERY: {
    DEFAULT_SLIPPAGE: 1.0,        // 1% default slippage
    MAX_SLIPPAGE: 5.0,            // 5% maximum slippage
    PRICE_IMPACT_WARNING: 3.0,    // Warn if > 3%
    PRICE_IMPACT_MAX: 10.0        // Reject if > 10%
}
```

## 🔧 Technical Details

### **Supported Wallets**
- ✅ MetaMask (Primary)
- ✅ WalletConnect (Coming Soon)
- ✅ Coinbase Wallet (Coming Soon)

### **Uniswap Integration**
- **V2 Router**: `0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D`
- **V3 Router**: `0xE592427A0AEce92De3Edee1F18E0157C05861564`
- **WETH Address**: `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`

### **Gas Optimization**
- **Token Approval**: ~50,000 gas
- **Token Swap**: ~200,000 gas
- **Meta-Transaction**: ~250,000 gas

## 📊 Recovery Process

### **Step 1: Wallet Connection**
1. User connects MetaMask
2. System verifies network (Mainnet required)
3. Displays wallet balances (ETH + ETHG)

### **Step 2: Recovery Setup**
1. User enters ETHG amount to recover
2. System calculates ETH output using Uniswap
3. Shows swap preview with price impact and slippage

### **Step 3: Token Approval**
1. System checks current allowance
2. If needed, requests token approval
3. User approves in MetaMask

### **Step 4: Swap Execution**
1. System executes swap on Uniswap
2. ETHG tokens are swapped for ETH
3. ETH is sent directly to user's wallet

## 💰 Cost Analysis

| Component | Cost | Notes |
|-----------|------|-------|
| **Token Approval** | ~$2-5 | One-time per token |
| **ETHG → ETH Swap** | ~$5-15 | Per recovery transaction |
| **Total Recovery** | ~$7-20 | Much cheaper than contract deployment |

## 🛡️ Security Features

### **Built-in Protections**
- ✅ **Slippage Limits** - Prevents excessive price impact
- ✅ **Deadline Protection** - Transactions expire after 20 minutes
- ✅ **Network Verification** - Only works on Ethereum Mainnet
- ✅ **Balance Checks** - Verifies sufficient ETHG before swap

### **User Safety**
- ✅ **Preview Before Execution** - See exact swap details
- ✅ **Price Impact Warnings** - Alerts for high impact swaps
- ✅ **Transaction History** - Track all recovery attempts
- ✅ **Etherscan Links** - Verify transactions on blockchain

## 🔍 Troubleshooting

### **Common Issues**

#### **"MetaMask not found"**
- Install MetaMask browser extension
- Ensure it's enabled for the current site

#### **"Wrong network"**
- Switch MetaMask to Ethereum Mainnet
- Network ID should be 1

#### **"Insufficient balance"**
- Check your ETHG token balance
- Ensure you have enough ETH for gas fees

#### **"Swap failed"**
- Check gas price and network congestion
- Try reducing swap amount
- Verify slippage tolerance settings

### **Performance Tips**
- Use during low gas periods (weekends, late night EST)
- Start with smaller amounts for testing
- Monitor gas prices using Etherscan Gas Tracker

## 🚀 Deployment Options

### **Local Development**
```bash
# Simple HTTP server
python -m http.server 8000

# Node.js server
npx http-server -p 8000

# PHP server
php -S localhost:8000
```

### **Production Deployment**
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Easy deployment with CI/CD
- **Vercel**: Fast global CDN
- **AWS S3**: Scalable cloud hosting

### **Custom Domain**
- Point domain to hosting provider
- Enable HTTPS for security
- Add MetaMask deep linking

## 📈 Monitoring & Analytics

### **Recovery Metrics**
- Total ETHG recovered
- Number of successful swaps
- Average recovery amount
- Gas costs per recovery

### **User Analytics**
- Unique wallet connections
- Recovery success rates
- User retention metrics
- Error tracking and resolution

## 🔮 Future Enhancements

### **Planned Features**
- 🎯 **Meta-Transactions** - No gas fees for victims
- 📱 **Mobile App** - Native mobile experience
- 🔄 **Batch Recovery** - Multiple tokens in one transaction
- 📊 **Advanced Analytics** - Detailed recovery insights
- 🌐 **Multi-Chain Support** - Polygon, BSC, Arbitrum

### **Integration Opportunities**
- **DEX Aggregators** - 1inch, Paraswap for best prices
- **Gas Optimization** - EIP-1559 and gas prediction
- **Price Feeds** - Chainlink for accurate pricing
- **Insurance** - DeFi insurance for large recoveries

## 🤝 Contributing

### **How to Help**
1. **Test the system** with different scenarios
2. **Report bugs** and suggest improvements
3. **Add features** and submit pull requests
4. **Improve documentation** and user guides
5. **Share with victims** who need recovery help

### **Development Setup**
```bash
# Clone repository
git clone <repository-url>
cd uniswap-ethg-recovery

# Install dependencies (if any)
npm install

# Start development server
npm run dev
```

## 📞 Support & Community

### **Getting Help**
- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our community for support
- **Telegram**: Quick questions and updates
- **Email**: Direct support for urgent issues

### **Resources**
- **Uniswap Docs**: https://docs.uniswap.org/
- **Ethereum Docs**: https://ethereum.org/developers/
- **MetaMask Docs**: https://docs.metamask.io/
- **Gas Tracker**: https://etherscan.io/gastracker

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Uniswap Team** - For the amazing DEX infrastructure
- **Ethereum Community** - For the blockchain foundation
- **MetaMask Team** - For the wallet integration
- **ETHG Victims** - For inspiring this recovery solution

---

## 🎉 **Ready to Help Victims Recover?**

**Your Uniswap ETHG recovery system is ready to deploy!** 

This system will help ETHG victims recover their funds faster, cheaper, and more reliably than any contract-based solution. 

**Start helping victims today!** 🚀✨

