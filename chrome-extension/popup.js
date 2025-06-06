// Quantum Secure Trader Chrome Extension Popup Script

class QuantumTraderPopup {
  constructor() {
    this.currentTab = 'dashboard';
    this.refreshInterval = null;
    this.init();
  }

  // Initialize popup
  async init() {
    this.setupEventListeners();
    this.setupTabNavigation();
    await this.loadInitialData();
    this.startAutoRefresh();
  }

  // Setup event listeners
  setupEventListeners() {
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', () => {
      this.refreshData();
    });

    // Open dashboard button
    document.getElementById('openDashboardBtn').addEventListener('click', () => {
      chrome.tabs.create({ url: 'https://quantum-secure-trader.replit.app' });
    });

    // Analytics button
    document.getElementById('analyticsBtn').addEventListener('click', () => {
      this.switchTab('pools');
    });

    // Network selector
    document.getElementById('networkSelect').addEventListener('change', (e) => {
      this.loadNetworkPools(e.target.value);
    });

    // Pool search
    document.getElementById('poolSearch').addEventListener('input', (e) => {
      this.filterPools(e.target.value);
    });

    // Settings
    document.getElementById('clearCacheBtn').addEventListener('click', () => {
      this.clearCache();
    });

    // Update frequency setting
    document.getElementById('updateFrequency').addEventListener('change', (e) => {
      this.updateRefreshInterval(parseInt(e.target.value) * 1000);
    });
  }

  // Setup tab navigation
  setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        this.switchTab(tabName);
      });
    });
  }

  // Switch active tab
  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Update tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === tabName);
    });

    this.currentTab = tabName;

    // Load tab-specific data
    if (tabName === 'pools') {
      this.loadNetworkPools('eth');
    } else if (tabName === 'tokens') {
      this.loadTokenPrices();
    }
  }

  // Load initial data
  async loadInitialData() {
    await Promise.all([
      this.loadTrendingPools(),
      this.loadTokenPrices(),
      this.updateLastRefreshTime()
    ]);
  }

  // Load trending pools
  async loadTrendingPools() {
    try {
      const response = await this.sendMessage({ action: 'getTrendingPools' });
      
      if (response && response.data) {
        this.renderTrendingPools(response.data.data || []);
        this.updateStatusBadge(true);
      } else {
        this.showError('trendingPoolsList', 'Unable to load trending pools');
      }
    } catch (error) {
      console.error('Error loading trending pools:', error);
      this.showError('trendingPoolsList', 'Error loading data');
      this.updateStatusBadge(false);
    }
  }

  // Load network pools
  async loadNetworkPools(network) {
    const container = document.getElementById('networkPoolsList');
    container.innerHTML = '<div class="loading">Loading network pools...</div>';

    try {
      const response = await this.sendMessage({ 
        action: 'getNetworkPools', 
        network: network 
      });
      
      if (response && response.data) {
        this.renderNetworkPools(response.data || []);
      } else {
        this.showError('networkPoolsList', 'Unable to load network pools');
      }
    } catch (error) {
      console.error('Error loading network pools:', error);
      this.showError('networkPoolsList', 'Error loading data');
    }
  }

  // Load token prices
  async loadTokenPrices() {
    try {
      const response = await this.sendMessage({ action: 'getTokenPrices' });
      
      if (response && response.data) {
        this.renderTokenPrices(response.data);
        this.updateMarketStats(response.data);
      } else {
        this.showError('tokenList', 'Unable to load token prices');
      }
    } catch (error) {
      console.error('Error loading token prices:', error);
      this.showError('tokenList', 'Error loading data');
    }
  }

  // Render trending pools
  renderTrendingPools(pools) {
    const container = document.getElementById('trendingPoolsList');
    
    if (!pools || pools.length === 0) {
      container.innerHTML = '<div class="loading">No trending pools available</div>';
      return;
    }

    const poolsHTML = pools.slice(0, 5).map(pool => {
      const attributes = pool.attributes || {};
      const name = attributes.name || 'Unknown Pool';
      const priceUsd = parseFloat(attributes.base_token_price_usd || 0);
      const priceChange = parseFloat(attributes.price_change_percentage?.h24 || 0);
      const volume = parseFloat(attributes.volume_usd?.h24 || 0);

      return `
        <div class="pool-item">
          <div class="pool-info">
            <div class="pool-name">${this.truncateText(name, 20)}</div>
            <div class="pool-details">Vol: $${this.formatNumber(volume)}</div>
          </div>
          <div class="pool-metrics">
            <div class="pool-price">$${this.formatPrice(priceUsd)}</div>
            <div class="pool-change ${priceChange >= 0 ? 'positive' : 'negative'}">
              ${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = poolsHTML;
  }

  // Render network pools
  renderNetworkPools(pools) {
    const container = document.getElementById('networkPoolsList');
    
    if (!pools || pools.length === 0) {
      container.innerHTML = '<div class="loading">No pools available for this network</div>';
      return;
    }

    const poolsHTML = pools.slice(0, 10).map(pool => {
      const attributes = pool.attributes || {};
      const name = attributes.name || 'Unknown Pool';
      const priceUsd = parseFloat(attributes.base_token_price_usd || 0);
      const priceChange = parseFloat(attributes.price_change_percentage?.h24 || 0);
      const volume = parseFloat(attributes.volume_usd?.h24 || 0);

      return `
        <div class="pool-item">
          <div class="pool-info">
            <div class="pool-name">${this.truncateText(name, 18)}</div>
            <div class="pool-details">24h Vol: $${this.formatNumber(volume)}</div>
          </div>
          <div class="pool-metrics">
            <div class="pool-price">$${this.formatPrice(priceUsd)}</div>
            <div class="pool-change ${priceChange >= 0 ? 'positive' : 'negative'}">
              ${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = poolsHTML;
  }

  // Render token prices
  renderTokenPrices(tokenData) {
    const container = document.getElementById('tokenList');
    
    if (!tokenData || Object.keys(tokenData).length === 0) {
      container.innerHTML = '<div class="loading">No token data available</div>';
      return;
    }

    const tokens = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
      { id: 'usd-coin', name: 'USD Coin', symbol: 'USDC' },
      { id: 'tether', name: 'Tether', symbol: 'USDT' },
      { id: 'binancecoin', name: 'BNB', symbol: 'BNB' }
    ];

    const tokensHTML = tokens.map(token => {
      const data = tokenData[token.id];
      if (!data) return '';

      const price = data.usd || 0;
      const change = data.usd_24h_change || 0;

      return `
        <div class="token-item">
          <div class="token-icon">${token.symbol.substring(0, 2)}</div>
          <div class="token-info">
            <div class="token-name">${token.name}</div>
            <div class="token-symbol">${token.symbol}</div>
          </div>
          <div class="token-price">
            <div class="token-value">$${this.formatPrice(price)}</div>
            <div class="token-change ${change >= 0 ? 'positive' : 'negative'}">
              ${change >= 0 ? '+' : ''}${change.toFixed(2)}%
            </div>
          </div>
        </div>
      `;
    }).filter(html => html !== '').join('');

    container.innerHTML = tokensHTML || '<div class="loading">No token data available</div>';
  }

  // Update market stats
  updateMarketStats(tokenData) {
    if (!tokenData) return;

    // Calculate rough market metrics from available data
    const btcData = tokenData.bitcoin || {};
    const ethData = tokenData.ethereum || {};
    
    // Update market cap (simplified calculation)
    const marketCapElement = document.getElementById('totalMarketCap');
    if (marketCapElement) {
      marketCapElement.textContent = '$2.1T'; // Placeholder - would need actual market cap data
    }

    // Update volume (simplified calculation)
    const volumeElement = document.getElementById('totalVolume');
    if (volumeElement) {
      volumeElement.textContent = '$89.2B'; // Placeholder - would need actual volume data
    }

    // Update changes
    const marketCapChangeElement = document.getElementById('marketCapChange');
    const volumeChangeElement = document.getElementById('volumeChange');
    
    if (marketCapChangeElement && btcData.usd_24h_change) {
      const change = btcData.usd_24h_change;
      marketCapChangeElement.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
      marketCapChangeElement.className = `stat-change ${change >= 0 ? 'positive' : 'negative'}`;
    }
  }

  // Update status badge
  updateStatusBadge(isOnline) {
    const badge = document.getElementById('statusBadge');
    if (badge) {
      badge.textContent = isOnline ? 'Live' : 'Offline';
      badge.style.backgroundColor = isOnline ? '#10b981' : '#ef4444';
    }
  }

  // Show error message
  showError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<div class="loading" style="color: #ef4444;">${message}</div>`;
    }
  }

  // Refresh all data
  async refreshData() {
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.style.transform = 'rotate(360deg)';
    
    try {
      await this.sendMessage({ action: 'refreshData' });
      await this.loadInitialData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    
    setTimeout(() => {
      refreshBtn.style.transform = 'rotate(0deg)';
    }, 500);
  }

  // Filter pools based on search
  filterPools(searchTerm) {
    const poolItems = document.querySelectorAll('#networkPoolsList .pool-item');
    const term = searchTerm.toLowerCase();

    poolItems.forEach(item => {
      const poolName = item.querySelector('.pool-name').textContent.toLowerCase();
      const isVisible = poolName.includes(term);
      item.style.display = isVisible ? 'flex' : 'none';
    });
  }

  // Clear cache
  async clearCache() {
    try {
      await chrome.storage.local.clear();
      const button = document.getElementById('clearCacheBtn');
      const originalText = button.textContent;
      button.textContent = 'Cleared!';
      button.style.background = '#10b981';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);

      // Update cache info
      document.getElementById('cacheInfo').textContent = 'Cache: 0 MB';
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  // Update refresh interval
  updateRefreshInterval(intervalMs) {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.startAutoRefresh(intervalMs);
  }

  // Start auto refresh
  startAutoRefresh(intervalMs = 30000) {
    this.refreshInterval = setInterval(() => {
      this.loadInitialData();
    }, intervalMs);
  }

  // Update last refresh time
  updateLastRefreshTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const element = document.getElementById('lastUpdateTime');
    if (element) {
      element.textContent = timeString;
    }

    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
      lastUpdatedElement.textContent = now.toLocaleDateString();
    }
  }

  // Send message to background script
  sendMessage(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Utility functions
  formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toFixed(0);
  }

  formatPrice(price) {
    if (price >= 1000) return price.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (price >= 1) return price.toFixed(2);
    if (price >= 0.01) return price.toFixed(4);
    return price.toFixed(6);
  }

  truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QuantumTraderPopup();
});