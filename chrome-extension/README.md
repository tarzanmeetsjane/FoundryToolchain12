# Quantum Secure Trader Chrome Extension

A comprehensive blockchain analytics extension that provides real-time trading insights, portfolio management, and market analysis across multiple decentralized exchanges and blockchain networks.

## Features

### Core Functionality
- **Real-time Price Tracking**: Live cryptocurrency prices with 24h change indicators
- **DEX Pool Analytics**: Trending pools across multiple blockchain networks
- **Price Alerts**: Custom price alert system with browser notifications
- **Multi-Chain Support**: Ethereum, BSC, Polygon, Arbitrum, Optimism, Base
- **Smart Widget Injection**: Auto-detects crypto/DeFi websites and injects trading widget

### Data Sources
- **GeckoTerminal API**: Real-time DEX trading data and pool analytics
- **CoinGecko API**: Comprehensive cryptocurrency market data
- **Moralis API**: Blockchain wallet balances and token metadata
- **Etherscan APIs**: Multi-chain transaction and contract data

## Installation

### Development Installation

1. **Download Extension Files**
   ```bash
   git clone [repository-url]
   cd chrome-extension
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `chrome-extension` folder

3. **Verify Installation**
   - Extension icon should appear in Chrome toolbar
   - Click icon to open popup interface
   - Badge should show green dot indicating live data connection

### Production Installation

1. **Chrome Web Store** (Coming Soon)
   - Search for "Quantum Secure Trader"
   - Click "Add to Chrome"
   - Confirm installation

2. **Manual Installation**
   - Download latest release ZIP file
   - Extract to local folder
   - Follow development installation steps

## Usage

### Popup Interface

**Dashboard Tab**
- Market overview with key statistics
- Trending pools from multiple DEX platforms
- Quick access to full dashboard

**Pools Tab**
- Network-specific pool listings
- Search and filter functionality
- Real-time volume and price change data

**Tokens Tab**
- Live cryptocurrency prices
- 24-hour change indicators
- Major token tracking (BTC, ETH, USDC, etc.)

**Settings Tab**
- Notification preferences
- Update frequency configuration
- Cache management
- Extension information

### Widget Injection

The extension automatically detects crypto-related websites and injects a floating widget:

**Supported Sites**
- Uniswap (app.uniswap.org)
- PancakeSwap (pancakeswap.finance)
- DexTools (dextools.io)
- DexScreener (dexscreener.com)
- CoinGecko (coingecko.com)
- Etherscan family (etherscan.io, bscscan.com, etc.)

**Widget Features**
- Draggable and minimizable
- Real-time price updates
- Pool analytics
- Price alert creation
- Quick dashboard access

### Price Alerts

1. **Create Alert**
   - Open extension popup
   - Navigate to "Alerts" tab
   - Enter token symbol and target price
   - Click "Create Alert"

2. **Alert Notifications**
   - Browser notifications when price targets hit
   - Visual indicators in extension badge
   - Alert management in settings

## Configuration

### API Integration

The extension connects to multiple APIs for authentic data:

```javascript
// APIs used (no configuration required)
- GeckoTerminal: https://api.geckoterminal.com/api/v2
- CoinGecko: https://api.coingecko.com/api/v3
- Moralis: https://api.moralis.io (if available)
- Etherscan: https://api.etherscan.io (if available)
```

### Permissions

Required permissions:
- `activeTab`: Access current tab for widget injection
- `storage`: Store user preferences and cached data
- `scripting`: Inject content scripts on supported sites

Host permissions for API access:
- `https://api.geckoterminal.com/*`
- `https://api.coingecko.com/*`
- `https://api.moralis.io/*`
- Blockchain explorer APIs

### Storage

The extension uses Chrome's local storage for:
- User preferences and settings
- Cached market data (auto-expires)
- Active price alerts
- Widget position preferences

## Development

### File Structure
```
chrome-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for data fetching
├── popup.html            # Main popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── content.js            # Widget injection script
├── content.css           # Widget styling
├── icons/                # Extension icons
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
└── README.md             # This file
```

### API Integration

**Background Script** (`background.js`)
- Handles all API requests
- Manages data caching and updates
- Provides data to popup and content scripts
- Maintains service worker lifecycle

**Real-time Updates**
- Manual update with the click of a button for trending pools
- Price data refreshed on manual action
- Network-specific pool data on demand
- Efficient caching to minimize API calls

### Customization

**Update Frequency**
```

**Widget Injection Sites**
```javascript
// In content.js - shouldInject() method
const cryptoSites = [
  'uniswap.org',
  'pancakeswap.finance',
  // Add more sites as needed
];
```

## Browser Compatibility

- **Chrome**: Version 88+
- **Edge**: Version 88+ (Chromium-based)
- **Opera**: Version 74+
- **Brave**: Latest version

## Privacy & Security

- **No Personal Data Collection**: Extension only accesses public market data
- **Local Storage Only**: All user data stored locally in browser
- **HTTPS API Calls**: All external requests use secure connections
- **No Tracking**: No analytics or user behavior tracking
- **Open Source**: Full source code available for review

## Troubleshooting

### Common Issues

**Extension Not Loading**
- Verify Developer mode is enabled
- Check for manifest.json errors in Extensions page
- Reload extension after code changes

**No Data Showing**
- Check internet connection
- Verify API endpoints are accessible
- Clear extension cache in Settings tab

**Widget Not Appearing**
- Ensure you're on a supported crypto website
- Check if content script injection is blocked
- Refresh the page after installing extension

**Performance Issues**
- Reduce update frequency in Settings
- Clear cached data regularly
- Disable on non-crypto sites if needed

### Debug Mode

Enable Chrome DevTools for extension debugging:
1. Right-click extension icon → "Inspect popup"
2. Go to `chrome://extensions/` → Click extension "Details" → "Inspect views: background page"
3. Check Console for error messages

## Support

For issues, feature requests, or questions:
- GitHub Issues: [repository-url]/issues
- Email: support@quantum-secure-trader.app
- Documentation: https://quantum-secure-trader.replit.app

## License

MIT License - see LICENSE file for details

## Version History

**v1.0.0** (Current)
- Initial release
- Real-time price tracking
- DEX pool analytics
- Widget injection
- Price alerts
- Multi-chain support

## Roadmap

**Upcoming Features**
- Portfolio tracking integration
- Advanced charting
- DeFi yield farming data
- NFT floor price tracking
- Cross-chain analytics
- Mobile companion app

---

**Quantum Secure Trader** - Comprehensive DeFi Analytics Platform