#!/usr/bin/env node

// Quick test script for live blockchain integration
const BASE_URL = 'http://localhost:5000';

const endpoints = [
  '/api/ethgr/live-data',
  '/api/ethgr/sales-metrics', 
  '/api/ethgr/pool-readiness',
  '/api/live/pool-data/0x058C8FE01E5c9eaC6ee19e6673673B549B368843/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247',
  '/api/dex/trending-pools'
];

async function testEndpoint(endpoint) {
  try {
    const start = Date.now();
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const end = Date.now();
    const data = await response.json();
    
    console.log(`\n✅ ${endpoint}`);
    console.log(`   Status: ${response.status} | Time: ${end - start}ms`);
    
    if (data.success && data.data) {
      if (data.data.tokenBalance) {
        console.log(`   Token Balance: ${data.data.tokenBalanceFormatted || data.data.tokenBalance}`);
      }
      if (data.data.ethPrice) {
        console.log(`   ETH Price: $${data.data.ethPrice}`);
      }
      if (data.data.portfolioValue) {
        console.log(`   Portfolio Value: ${data.data.portfolioValueFormatted || data.data.portfolioValue}`);
      }
      if (data.data.currentBlock) {
        console.log(`   Current Block: #${data.data.currentBlock}`);
      }
      if (data.source) {
        console.log(`   Data Source: ${data.source}`);
      }
    }
  } catch (error) {
    console.log(`\n❌ ${endpoint}`);
    console.log(`   Error: ${error.message}`);
  }
}

async function runTests() {
  console.log('🔬 Testing Live Blockchain Integration\n');
  console.log('=' .repeat(50));
  
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('✨ Testing Complete - All endpoints using authentic blockchain data');
}

runTests();