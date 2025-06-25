// Simulate Bot Revenue Data for Testing
// Creates realistic revenue events and updates funding sources

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

async function simulateBotRevenue() {
  console.log("🤖 Simulating Zero-Config Bot Revenue Data");
  console.log("=" * 50);
  
  try {
    // Initialize the dashboard first
    console.log("Initializing dashboard...");
    const initResponse = await fetch(`${baseUrl}/api/initialize-discovered-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!initResponse.ok) {
      console.log("Dashboard already initialized or error occurred");
    }
    
    // Get the created bots
    const botsResponse = await fetch(`${baseUrl}/api/bots`);
    const bots = await botsResponse.json();
    
    if (bots.length === 0) {
      console.log("No bots found. Please initialize the dashboard first.");
      return;
    }
    
    console.log(`Found ${bots.length} bots. Creating revenue events...`);
    
    // Create revenue events for each bot
    for (const bot of bots) {
      const events = generateRevenueEvents(bot);
      
      for (const event of events) {
        try {
          const response = await fetch(`${baseUrl}/api/revenue-events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
          });
          
          if (response.ok) {
            console.log(`✓ Created revenue event for ${bot.name}: $${event.amount}`);
          }
        } catch (error) {
          console.log(`✗ Failed to create event for ${bot.name}`);
        }
      }
    }
    
    // Update funding sources with simulated values
    await updateFundingSources();
    
    console.log("\n🎉 Bot revenue simulation complete!");
    console.log("Visit /bot-dashboard to see the results");
    
  } catch (error) {
    console.error("Simulation failed:", error);
  }
}

function generateRevenueEvents(bot) {
  const events = [];
  const now = new Date();
  
  // Generate events for the last 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
    
    // Generate 1-3 events per day per bot
    const eventCount = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < eventCount; j++) {
      let amount, eventType;
      
      // Different revenue patterns based on bot type
      if (bot.type === 'liquidity_provider') {
        amount = (Math.random() * 5 + 0.1).toFixed(6); // $0.1 - $5
        eventType = 'trading_fee';
      } else if (bot.type === 'arbitrage') {
        amount = (Math.random() * 15 + 2).toFixed(6); // $2 - $17
        eventType = 'arbitrage';
      } else {
        amount = (Math.random() * 8 + 0.5).toFixed(6); // $0.5 - $8.5
        eventType = 'trading_fee';
      }
      
      events.push({
        botId: bot.id,
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        amount,
        currency: 'ETH',
        eventType,
        gasUsed: (Math.random() * 100000 + 21000).toFixed(0),
        gasPrice: (Math.random() * 50 + 10).toFixed(0)
      });
    }
  }
  
  return events;
}

async function updateFundingSources() {
  console.log("\nUpdating funding sources...");
  
  // Simulate discovery of additional funding
  const additionalSources = [
    {
      name: "LP Position Discovery #1",
      type: "lp_token",
      address: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc",
      currentValue: "45.30",
      availableForLiquidation: "40.00",
      liquidationPriority: 7,
      metadata: {
        description: "Uniswap V2 USDC/ETH LP tokens from trading bot",
        protocol: "uniswap_v2",
        pair: "USDC/ETH"
      }
    },
    {
      name: "Arbitrage Bot Profits",
      type: "wallet_balance",
      address: "0xba618d94903cd30d40b95b982f8ade42db0d7a85",
      currentValue: "78.50",
      availableForLiquidation: "70.00",
      liquidationPriority: 9,
      metadata: {
        description: "Accumulated profits from cross-chain arbitrage operations",
        chain: "ethereum"
      }
    },
    {
      name: "Yield Farming Rewards",
      type: "yield_farming",
      address: "0x762010a2aba6efde44f752da4c8b2b268ca02222",
      currentValue: "156.80",
      availableForLiquidation: "140.00",
      liquidationPriority: 10,
      metadata: {
        description: "Compound and Aave farming rewards ready for withdrawal",
        protocols: ["compound", "aave"]
      }
    }
  ];
  
  for (const source of additionalSources) {
    try {
      const response = await fetch(`${baseUrl}/api/funding-sources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(source)
      });
      
      if (response.ok) {
        console.log(`✓ Added funding source: ${source.name} ($${source.availableForLiquidation})`);
      }
    } catch (error) {
      console.log(`✗ Failed to add funding source: ${source.name}`);
    }
  }
}

// Run simulation if this file is executed directly
if (require.main === module) {
  simulateBotRevenue();
}

module.exports = { simulateBotRevenue };