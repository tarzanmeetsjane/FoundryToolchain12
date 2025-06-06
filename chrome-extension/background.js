// Quantum Secure Trader Chrome Extension Background Script
// Handles API requests, data processing, and real-time updates

class QuantumTraderAPI {
  constructor() {
    this.geckoTerminalBase = 'https://api.geckoterminal.com/api/v2';
    this.coinGeckoBase = 'https://api.coingecko.com/api/v3';
    this.updateInterval = 30000; // 30 seconds
    this.isRunning = false;
  }

  // Fetch trending pools from GeckoTerminal
  async getTrendingPools() {
    try {
      const response = await fetch(`${this.geckoTerminalBase}/networks/trending_pools`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trending pools:', error);
      return null;
    }
  }

  // Fetch network pools for specific blockchain
  async getNetworkPools(network = 'eth') {
    try {
      const response = await fetch(`${this.geckoTerminalBase}/networks/${network}/pools?page=1`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${network} pools:`, error);
      return null;
    }
  }

  // Fetch token prices from CoinGecko
  async getTokenPrices(tokenIds) {
    try {
      const ids = Array.isArray(tokenIds) ? tokenIds.join(',') : tokenIds;
      const response = await fetch(`${this.coinGeckoBase}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching token prices:', error);
      return null;
    }
  }

  // Store data in Chrome storage
  async storeData(key, data) {
    try {
      await chrome.storage.local.set({ [key]: data });
      console.log(`Stored ${key} data`);
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
    }
  }

  // Retrieve data from Chrome storage
  async getData(key) {
    try {
      const result = await chrome.storage.local.get([key]);
      return result[key] || null;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  }

  // Start real-time data updates
  async startRealTimeUpdates() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('Starting Quantum Secure Trader real-time updates');

    const updateData = async () => {
      try {
        // Fetch trending pools
        const trendingPools = await this.getTrendingPools();
        if (trendingPools) {
          await this.storeData('trendingPools', {
            data: trendingPools,
            timestamp: Date.now()
          });
        }

        // Fetch Ethereum pools
        const ethPools = await this.getNetworkPools('eth');
        if (ethPools) {
          await this.storeData('ethPools', {
            data: ethPools,
            timestamp: Date.now()
          });
        }

        // Fetch popular token prices
        const tokenPrices = await this.getTokenPrices('ethereum,bitcoin,usd-coin,tether,binancecoin');
        if (tokenPrices) {
          await this.storeData('tokenPrices', {
            data: tokenPrices,
            timestamp: Date.now()
          });
        }

        // Update badge with active status
        chrome.action.setBadgeText({ text: '●' });
        chrome.action.setBadgeBackgroundColor({ color: '#10B981' });

      } catch (error) {
        console.error('Error in data update cycle:', error);
        chrome.action.setBadgeText({ text: '!' });
        chrome.action.setBadgeBackgroundColor({ color: '#EF4444' });
      }
    };

    // Initial update
    await updateData();

    // Set up interval for continuous updates
    this.updateIntervalId = setInterval(updateData, this.updateInterval);
  }

  // Stop real-time updates
  stopRealTimeUpdates() {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
      this.updateIntervalId = null;
    }
    this.isRunning = false;
    chrome.action.setBadgeText({ text: '' });
    console.log('Stopped real-time updates');
  }
}

// Initialize API instance
const quantumAPI = new QuantumTraderAPI();

// Extension lifecycle events
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Quantum Secure Trader Extension installed');
  
  // Set up initial state
  chrome.action.setBadgeText({ text: '○' });
  chrome.action.setBadgeBackgroundColor({ color: '#6B7280' });
  
  // Start real-time updates
  quantumAPI.startRealTimeUpdates();
});

chrome.runtime.onStartup.addListener(() => {
  console.log('Quantum Secure Trader Extension startup');
  quantumAPI.startRealTimeUpdates();
});

// Handle extension suspension/wake
chrome.runtime.onSuspend.addListener(() => {
  console.log('Extension suspending');
  quantumAPI.stopRealTimeUpdates();
});

// Message handling for popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'getTrendingPools':
      quantumAPI.getData('trendingPools').then(sendResponse);
      return true; // Will respond asynchronously

    case 'getEthPools':
      quantumAPI.getData('ethPools').then(sendResponse);
      return true;

    case 'getTokenPrices':
      quantumAPI.getData('tokenPrices').then(sendResponse);
      return true;

    case 'refreshData':
      quantumAPI.startRealTimeUpdates().then(() => {
        sendResponse({ success: true });
      });
      return true;

    case 'getNetworkPools':
      quantumAPI.getNetworkPools(message.network).then(sendResponse);
      return true;

    default:
      sendResponse({ error: 'Unknown action' });
  }
});

// Keep service worker alive
chrome.alarms.create('keepAlive', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keepAlive') {
    // Perform lightweight operation to keep worker active
    console.log('Quantum Secure Trader: Service worker keep-alive');
  }
});