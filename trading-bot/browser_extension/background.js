// Quantum Secure Trader - Browser Extension Background Script
// Integrates with main trading bot for automated execution

class TradingBotExtension {
    constructor() {
        this.apiBase = 'http://localhost:5000/api';
        this.wsConnection = null;
        this.isConnected = false;
        this.tradingSignals = [];
        this.automationQueue = [];
        this.userPreferences = {};
        
        this.init();
    }

    async init() {
        console.log('Initializing Trading Bot Extension...');
        
        // Load user preferences
        await this.loadUserPreferences();
        
        // Connect to main trading bot WebSocket
        this.connectToTradingBot();
        
        // Set up message listeners
        this.setupMessageListeners();
        
        // Start monitoring cycle
        this.startMonitoring();
        
        // Update badge
        this.updateBadge('●', '#10B981');
    }

    async loadUserPreferences() {
        try {
            const result = await chrome.storage.local.get(['tradingPreferences']);
            this.userPreferences = result.tradingPreferences || {
                autoExecute: false,
                riskTolerance: 'medium',
                maxTradeAmount: 1000,
                enableNotifications: true,
                monitoredPools: [],
                slippageTolerance: 0.5
            };
        } catch (error) {
            console.error('Failed to load user preferences:', error);
        }
    }

    async saveUserPreferences() {
        try {
            await chrome.storage.local.set({
                tradingPreferences: this.userPreferences
            });
        } catch (error) {
            console.error('Failed to save user preferences:', error);
        }
    }

    connectToTradingBot() {
        try {
            // Connect to main trading bot WebSocket
            this.wsConnection = new WebSocket('ws://localhost:5000/ws');
            
            this.wsConnection.onopen = () => {
                console.log('Connected to trading bot');
                this.isConnected = true;
                this.updateBadge('●', '#10B981');
            };

            this.wsConnection.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleTradingBotMessage(data);
            };

            this.wsConnection.onclose = () => {
                console.log('Disconnected from trading bot');
                this.isConnected = false;
                this.updateBadge('○', '#EF4444');
                
                // Reconnect after 5 seconds
                setTimeout(() => this.connectToTradingBot(), 5000);
            };

            this.wsConnection.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.updateBadge('!', '#F59E0B');
            };

        } catch (error) {
            console.error('Failed to connect to trading bot:', error);
        }
    }

    handleTradingBotMessage(data) {
        switch (data.type) {
            case 'trading_signal':
                this.handleTradingSignal(data.signal);
                break;
            case 'pool_update':
                this.handlePoolUpdate(data.pool);
                break;
            case 'automation_result':
                this.handleAutomationResult(data.result);
                break;
            case 'market_alert':
                this.handleMarketAlert(data.alert);
                break;
        }
    }

    async handleTradingSignal(signal) {
        console.log('Received trading signal:', signal);
        
        this.tradingSignals.push({
            ...signal,
            timestamp: Date.now(),
            processed: false
        });

        // Show notification if enabled
        if (this.userPreferences.enableNotifications) {
            this.showNotification({
                title: 'Trading Signal',
                message: `${signal.signal_type.toUpperCase()} signal for ${signal.pool_name}`,
                iconUrl: 'icons/icon48.png'
            });
        }

        // Auto-execute if enabled and conditions met
        if (this.userPreferences.autoExecute && this.shouldAutoExecute(signal)) {
            await this.queueAutomationTask(signal);
        }

        // Update popup data
        await this.updatePopupData();
    }

    shouldAutoExecute(signal) {
        // Check signal strength and confidence thresholds
        if (signal.confidence < 0.7 || signal.strength < 0.6) {
            return false;
        }

        // Check risk tolerance
        const riskThresholds = {
            conservative: 0.3,
            medium: 0.5,
            aggressive: 0.7
        };

        if (signal.strength > riskThresholds[this.userPreferences.riskTolerance]) {
            return false;
        }

        // Check if pool is in monitored list (if specified)
        if (this.userPreferences.monitoredPools.length > 0) {
            return this.userPreferences.monitoredPools.includes(signal.pool_address);
        }

        return true;
    }

    async queueAutomationTask(signal) {
        const task = {
            id: `task_${Date.now()}`,
            type: signal.signal_type === 'buy' ? 'provide_liquidity' : 'remove_liquidity',
            signal: signal,
            params: {
                poolAddress: signal.pool_address,
                amount: Math.min(signal.recommended_amount || 100, this.userPreferences.maxTradeAmount),
                slippageTolerance: this.userPreferences.slippageTolerance
            },
            status: 'queued',
            createdAt: Date.now()
        };

        this.automationQueue.push(task);
        console.log('Queued automation task:', task.id);

        // Process queue
        await this.processAutomationQueue();
    }

    async processAutomationQueue() {
        if (this.automationQueue.length === 0) return;

        const pendingTasks = this.automationQueue.filter(task => task.status === 'queued');
        
        for (const task of pendingTasks) {
            try {
                task.status = 'processing';
                console.log('Processing automation task:', task.id);

                // Send to task automation module
                const result = await this.executeAutomationTask(task);
                
                task.status = result.success ? 'completed' : 'failed';
                task.result = result;
                task.completedAt = Date.now();

                // Show notification
                this.showNotification({
                    title: task.status === 'completed' ? 'Task Completed' : 'Task Failed',
                    message: `${task.type} ${task.status}`,
                    iconUrl: 'icons/icon48.png'
                });

            } catch (error) {
                console.error('Automation task failed:', error);
                task.status = 'failed';
                task.error = error.message;
            }
        }

        // Clean up old completed tasks (keep last 50)
        this.automationQueue = this.automationQueue
            .filter(task => task.status !== 'completed' || Date.now() - task.completedAt < 86400000)
            .slice(-50);
    }

    async executeAutomationTask(task) {
        // This would integrate with the task automation module
        // For now, simulate the execution
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: Math.random() > 0.2, // 80% success rate
                    transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
                    gasUsed: Math.floor(Math.random() * 100000) + 50000
                });
            }, 2000);
        });
    }

    async handlePoolUpdate(pool) {
        // Update stored pool data
        await chrome.storage.local.set({
            [`pool_${pool.address}`]: {
                ...pool,
                lastUpdated: Date.now()
            }
        });
    }

    async handleMarketAlert(alert) {
        if (this.userPreferences.enableNotifications) {
            this.showNotification({
                title: 'Market Alert',
                message: alert.message,
                iconUrl: 'icons/icon48.png'
            });
        }
    }

    setupMessageListeners() {
        // Listen for messages from popup and content scripts
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            switch (message.action) {
                case 'getTradingSignals':
                    sendResponse({ signals: this.tradingSignals.slice(-10) });
                    break;

                case 'getAutomationQueue':
                    sendResponse({ queue: this.automationQueue.slice(-20) });
                    break;

                case 'updatePreferences':
                    this.userPreferences = { ...this.userPreferences, ...message.preferences };
                    this.saveUserPreferences();
                    sendResponse({ success: true });
                    break;

                case 'executeManualTrade':
                    this.executeManualTrade(message.params)
                        .then(result => sendResponse(result))
                        .catch(error => sendResponse({ success: false, error: error.message }));
                    return true; // Will respond asynchronously

                case 'getConnectionStatus':
                    sendResponse({ 
                        connected: this.isConnected,
                        tradingBotActive: this.isConnected,
                        lastUpdate: Date.now()
                    });
                    break;

                default:
                    sendResponse({ error: 'Unknown action' });
            }
        });
    }

    async executeManualTrade(params) {
        const task = {
            id: `manual_${Date.now()}`,
            type: 'manual_trade',
            params: params,
            status: 'processing',
            createdAt: Date.now()
        };

        try {
            const result = await this.executeAutomationTask(task);
            task.status = result.success ? 'completed' : 'failed';
            task.result = result;

            return result;
        } catch (error) {
            task.status = 'failed';
            task.error = error.message;
            throw error;
        }
    }

    startMonitoring() {
        // Monitor every 30 seconds
        setInterval(async () => {
            if (this.isConnected) {
                // Request latest signals from trading bot
                this.wsConnection.send(JSON.stringify({
                    type: 'request_signals',
                    params: {
                        limit: 10,
                        minConfidence: 0.5
                    }
                }));

                // Process automation queue
                await this.processAutomationQueue();
            }
        }, 30000);

        // Clean up old data every hour
        setInterval(() => {
            this.cleanupOldData();
        }, 3600000);
    }

    cleanupOldData() {
        const oneHourAgo = Date.now() - 3600000;
        
        // Remove old trading signals
        this.tradingSignals = this.tradingSignals.filter(
            signal => signal.timestamp > oneHourAgo
        );

        // Clean up storage
        chrome.storage.local.get(null, (items) => {
            const keysToRemove = [];
            for (const key in items) {
                if (key.startsWith('pool_') && items[key].lastUpdated < oneHourAgo) {
                    keysToRemove.push(key);
                }
            }
            if (keysToRemove.length > 0) {
                chrome.storage.local.remove(keysToRemove);
            }
        });
    }

    async updatePopupData() {
        await chrome.storage.local.set({
            popupData: {
                tradingSignals: this.tradingSignals.slice(-5),
                automationQueue: this.automationQueue.slice(-10),
                connectionStatus: this.isConnected,
                lastUpdate: Date.now()
            }
        });
    }

    showNotification(options) {
        if (chrome.notifications) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: options.iconUrl || 'icons/icon48.png',
                title: options.title,
                message: options.message
            });
        }
    }

    updateBadge(text, color) {
        if (chrome.action) {
            chrome.action.setBadgeText({ text });
            chrome.action.setBadgeBackgroundColor({ color });
        }
    }

    async getMarketSummary() {
        try {
            const response = await fetch(`${this.apiBase}/market-summary`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Failed to fetch market summary:', error);
        }
        return null;
    }

    async getPortfolioRecommendations() {
        try {
            const response = await fetch(`${this.apiBase}/portfolio-recommendations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    riskTolerance: this.userPreferences.riskTolerance,
                    investmentAmount: this.userPreferences.maxTradeAmount * 10
                })
            });
            
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Failed to fetch portfolio recommendations:', error);
        }
        return null;
    }
}

// Initialize the trading bot extension
const tradingBotExtension = new TradingBotExtension();

// Extension lifecycle events
chrome.runtime.onInstalled.addListener((details) => {
    console.log('Trading Bot Extension installed');
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Trading Bot Extension startup');
});

// Keep service worker alive
chrome.alarms.create('keepAlive', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'keepAlive') {
        console.log('Trading Bot Extension: Service worker keep-alive');
    }
});