// Quantum Secure Trader Chrome Extension Content Script
// Injects trading widget into web pages

class QuantumTraderWidget {
  constructor() {
    this.isInjected = false;
    this.widget = null;
    this.isVisible = false;
    this.position = { x: window.innerWidth - 320, y: 20 };
    this.init();
  }

  init() {
    // Only inject on financial/crypto related sites
    if (this.shouldInject()) {
      this.injectWidget();
      this.setupEventListeners();
    }
  }

  shouldInject() {
    const hostname = window.location.hostname.toLowerCase();
    const cryptoSites = [
      'uniswap.org', 'app.uniswap.org',
      'pancakeswap.finance',
      'curve.fi',
      'balancer.fi',
      'dextools.io',
      'dexscreener.com',
      'coingecko.com',
      'coinmarketcap.com',
      'defillama.com',
      'etherscan.io',
      'bscscan.com',
      'polygonscan.com'
    ];

    return cryptoSites.some(site => hostname.includes(site)) || 
           hostname.includes('dex') || 
           hostname.includes('defi') ||
           hostname.includes('swap');
  }

  injectWidget() {
    if (this.isInjected) return;

    // Create widget container
    this.widget = document.createElement('div');
    this.widget.id = 'quantum-trader-widget';
    this.widget.innerHTML = this.getWidgetHTML();
    
    // Apply styles
    this.applyWidgetStyles();
    
    // Inject into page
    document.body.appendChild(this.widget);
    this.isInjected = true;

    // Load initial data
    this.loadWidgetData();
  }

  getWidgetHTML() {
    return `
      <div class="qt-widget-header">
        <div class="qt-logo">QST</div>
        <div class="qt-controls">
          <button class="qt-minimize" title="Minimize">−</button>
          <button class="qt-close" title="Close">×</button>
        </div>
      </div>
      <div class="qt-widget-content">
        <div class="qt-tabs">
          <button class="qt-tab active" data-tab="prices">Prices</button>
          <button class="qt-tab" data-tab="pools">Pools</button>
          <button class="qt-tab" data-tab="alerts">Alerts</button>
        </div>
        
        <div class="qt-tab-content active" id="qt-prices">
          <div class="qt-price-list" id="qt-price-list">
            <div class="qt-loading">Loading prices...</div>
          </div>
        </div>
        
        <div class="qt-tab-content" id="qt-pools">
          <div class="qt-pool-list" id="qt-pool-list">
            <div class="qt-loading">Loading pools...</div>
          </div>
        </div>
        
        <div class="qt-tab-content" id="qt-alerts">
          <div class="qt-alert-setup">
            <h4>Price Alerts</h4>
            <div class="qt-alert-form">
              <input type="text" placeholder="Token symbol" class="qt-input" id="qt-alert-token">
              <input type="number" placeholder="Target price" class="qt-input" id="qt-alert-price">
              <button class="qt-btn" id="qt-create-alert">Create Alert</button>
            </div>
            <div class="qt-active-alerts" id="qt-active-alerts">
              <div class="qt-no-alerts">No active alerts</div>
            </div>
          </div>
        </div>
        
        <div class="qt-widget-footer">
          <button class="qt-open-dashboard" id="qt-open-dashboard">Open Dashboard</button>
        </div>
      </div>
    `;
  }

  applyWidgetStyles() {
    if (document.getElementById('quantum-trader-widget-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'quantum-trader-widget-styles';
    styles.textContent = `
      #quantum-trader-widget {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 300px;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        color: #1f2937;
        transition: all 0.3s ease;
      }

      #quantum-trader-widget.minimized {
        height: 40px;
        overflow: hidden;
      }

      .qt-widget-header {
        background: linear-gradient(135deg, #1e293b, #334155);
        color: white;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 12px 12px 0 0;
        cursor: move;
      }

      .qt-logo {
        font-weight: 700;
        font-size: 16px;
      }

      .qt-controls {
        display: flex;
        gap: 8px;
      }

      .qt-minimize, .qt-close {
        width: 20px;
        height: 20px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }

      .qt-minimize:hover, .qt-close:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .qt-widget-content {
        padding: 16px;
        max-height: 400px;
        overflow-y: auto;
      }

      .qt-tabs {
        display: flex;
        margin-bottom: 16px;
        border-bottom: 1px solid #e2e8f0;
      }

      .qt-tab {
        flex: 1;
        padding: 8px 12px;
        border: none;
        background: transparent;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        color: #64748b;
        border-bottom: 2px solid transparent;
        transition: all 0.2s;
      }

      .qt-tab:hover {
        color: #475569;
      }

      .qt-tab.active {
        color: #1e293b;
        border-bottom-color: #3b82f6;
      }

      .qt-tab-content {
        display: none;
      }

      .qt-tab-content.active {
        display: block;
      }

      .qt-price-item, .qt-pool-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f1f5f9;
      }

      .qt-price-item:last-child, .qt-pool-item:last-child {
        border-bottom: none;
      }

      .qt-token-info, .qt-pool-info {
        flex: 1;
      }

      .qt-token-name, .qt-pool-name {
        font-weight: 600;
        font-size: 12px;
        color: #1e293b;
      }

      .qt-token-symbol, .qt-pool-details {
        font-size: 10px;
        color: #64748b;
      }

      .qt-price-data, .qt-pool-data {
        text-align: right;
      }

      .qt-price, .qt-pool-price {
        font-weight: 600;
        font-size: 11px;
        color: #1e293b;
      }

      .qt-change {
        font-size: 10px;
        font-weight: 500;
      }

      .qt-change.positive {
        color: #10b981;
      }

      .qt-change.negative {
        color: #ef4444;
      }

      .qt-loading {
        text-align: center;
        padding: 20px;
        color: #64748b;
        font-size: 12px;
      }

      .qt-alert-form {
        margin-bottom: 16px;
      }

      .qt-input {
        width: 100%;
        padding: 8px;
        margin-bottom: 8px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 12px;
        outline: none;
      }

      .qt-input:focus {
        border-color: #3b82f6;
      }

      .qt-btn, .qt-open-dashboard {
        width: 100%;
        padding: 8px 16px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }

      .qt-btn:hover, .qt-open-dashboard:hover {
        background: #2563eb;
      }

      .qt-widget-footer {
        padding: 12px 16px;
        border-top: 1px solid #e2e8f0;
        background: #f8fafc;
        border-radius: 0 0 12px 12px;
      }

      .qt-alert-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        background: #f8fafc;
        border-radius: 4px;
        margin-bottom: 8px;
        font-size: 11px;
      }

      .qt-no-alerts {
        text-align: center;
        color: #64748b;
        font-size: 11px;
        padding: 16px;
      }

      h4 {
        margin: 0 0 12px 0;
        font-size: 13px;
        color: #1e293b;
      }

      /* Scrollbar styling */
      .qt-widget-content::-webkit-scrollbar {
        width: 4px;
      }

      .qt-widget-content::-webkit-scrollbar-track {
        background: #f1f5f9;
      }

      .qt-widget-content::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 2px;
      }
    `;

    document.head.appendChild(styles);
  }

  setupEventListeners() {
    // Tab switching
    this.widget.querySelectorAll('.qt-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    // Minimize/Close buttons
    this.widget.querySelector('.qt-minimize').addEventListener('click', () => {
      this.toggleMinimize();
    });

    this.widget.querySelector('.qt-close').addEventListener('click', () => {
      this.closeWidget();
    });

    // Open dashboard
    this.widget.querySelector('#qt-open-dashboard').addEventListener('click', () => {
      window.open('https://quantum-secure-trader.replit.app', '_blank');
    });

    // Create alert
    this.widget.querySelector('#qt-create-alert').addEventListener('click', () => {
      this.createAlert();
    });

    // Make widget draggable
    this.makeDraggable();
  }

  switchTab(tabName) {
    // Update tab buttons
    this.widget.querySelectorAll('.qt-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // Update tab contents
    this.widget.querySelectorAll('.qt-tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `qt-${tabName}`);
    });

    // Load tab-specific data
    if (tabName === 'pools') {
      this.loadPoolData();
    }
  }

  async loadWidgetData() {
    try {
      // Get data from background script
      const response = await this.sendMessage({ action: 'getTokenPrices' });
      
      if (response && response.data) {
        this.renderPrices(response.data);
      }
    } catch (error) {
      console.error('Error loading widget data:', error);
    }
  }

  async loadPoolData() {
    try {
      const response = await this.sendMessage({ action: 'getTrendingPools' });
      
      if (response && response.data) {
        this.renderPools(response.data.data || []);
      }
    } catch (error) {
      console.error('Error loading pool data:', error);
    }
  }

  renderPrices(tokenData) {
    const container = this.widget.querySelector('#qt-price-list');
    
    const tokens = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
      { id: 'usd-coin', name: 'USDC', symbol: 'USDC' },
      { id: 'binancecoin', name: 'BNB', symbol: 'BNB' }
    ];

    const html = tokens.map(token => {
      const data = tokenData[token.id];
      if (!data) return '';

      const price = data.usd || 0;
      const change = data.usd_24h_change || 0;

      return `
        <div class="qt-price-item">
          <div class="qt-token-info">
            <div class="qt-token-name">${token.name}</div>
            <div class="qt-token-symbol">${token.symbol}</div>
          </div>
          <div class="qt-price-data">
            <div class="qt-price">$${this.formatPrice(price)}</div>
            <div class="qt-change ${change >= 0 ? 'positive' : 'negative'}">
              ${change >= 0 ? '+' : ''}${change.toFixed(1)}%
            </div>
          </div>
        </div>
      `;
    }).filter(html => html !== '').join('');

    container.innerHTML = html || '<div class="qt-loading">No price data available</div>';
  }

  renderPools(pools) {
    const container = this.widget.querySelector('#qt-pool-list');
    
    if (!pools || pools.length === 0) {
      container.innerHTML = '<div class="qt-loading">No pool data available</div>';
      return;
    }

    const html = pools.slice(0, 5).map(pool => {
      const attributes = pool.attributes || {};
      const name = attributes.name || 'Unknown Pool';
      const volume = parseFloat(attributes.volume_usd?.h24 || 0);
      const priceChange = parseFloat(attributes.price_change_percentage?.h24 || 0);

      return `
        <div class="qt-pool-item">
          <div class="qt-pool-info">
            <div class="qt-pool-name">${this.truncateText(name, 15)}</div>
            <div class="qt-pool-details">Vol: $${this.formatNumber(volume)}</div>
          </div>
          <div class="qt-pool-data">
            <div class="qt-change ${priceChange >= 0 ? 'positive' : 'negative'}">
              ${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(1)}%
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  createAlert() {
    const tokenInput = this.widget.querySelector('#qt-alert-token');
    const priceInput = this.widget.querySelector('#qt-alert-price');
    
    const token = tokenInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (!token || !price) {
      alert('Please enter both token symbol and target price');
      return;
    }

    // Store alert in Chrome storage
    chrome.storage.local.get(['alerts'], (result) => {
      const alerts = result.alerts || [];
      alerts.push({
        id: Date.now(),
        token: token.toUpperCase(),
        targetPrice: price,
        created: new Date().toISOString()
      });

      chrome.storage.local.set({ alerts }, () => {
        this.renderAlerts(alerts);
        tokenInput.value = '';
        priceInput.value = '';
      });
    });
  }

  renderAlerts(alerts) {
    const container = this.widget.querySelector('#qt-active-alerts');
    
    if (!alerts || alerts.length === 0) {
      container.innerHTML = '<div class="qt-no-alerts">No active alerts</div>';
      return;
    }

    const html = alerts.map(alert => `
      <div class="qt-alert-item">
        <span>${alert.token} @ $${alert.targetPrice}</span>
        <button onclick="this.parentElement.remove()" style="background: #ef4444; color: white; border: none; border-radius: 2px; padding: 2px 6px; font-size: 10px; cursor: pointer;">×</button>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  toggleMinimize() {
    this.widget.classList.toggle('minimized');
  }

  closeWidget() {
    if (this.widget) {
      this.widget.remove();
      this.isInjected = false;
    }
  }

  makeDraggable() {
    const header = this.widget.querySelector('.qt-widget-header');
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(this.widget.style.left || this.position.x);
      startTop = parseInt(this.widget.style.top || this.position.y);
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      this.widget.style.left = Math.max(0, Math.min(window.innerWidth - 300, startLeft + deltaX)) + 'px';
      this.widget.style.top = Math.max(0, Math.min(window.innerHeight - 100, startTop + deltaY)) + 'px';
      this.widget.style.right = 'auto';
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }

  sendMessage(message) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, resolve);
    });
  }

  formatPrice(price) {
    if (price >= 1000) return price.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (price >= 1) return price.toFixed(2);
    return price.toFixed(4);
  }

  formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toFixed(0);
  }

  truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}

// Initialize widget when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new QuantumTraderWidget();
  });
} else {
  new QuantumTraderWidget();
}