// Direct Etherscan API verification
const https = require('https');
const fs = require('fs');

const contractAddress = '0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308';
const apiKey = process.env.ETHERSCAN_API_KEY;

// Read the flattened contract source (no imports)
const contractSource = fs.readFileSync('./ETHGR_FLATTENED.sol', 'utf8');

const postData = new URLSearchParams({
  apikey: apiKey,
  module: 'contract',
  action: 'verifysourcecode',
  contractaddress: contractAddress,
  sourceCode: contractSource,
  codeformat: 'solidity-single-file',
  contractname: 'ETHGRecovery',
  compilerversion: 'v0.8.19+commit.7dd6d404',
  optimizationUsed: '1',
  runs: '200',
  constructorArguements: '', // Empty constructor
  evmversion: 'london',
  licenseType: '3' // MIT License
}).toString();

const options = {
  hostname: 'api.etherscan.io',
  port: 443,
  path: '/api',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

console.log('🚀 Starting Etherscan verification...');
console.log('📍 Contract:', contractAddress);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('📋 Response:', response);
      
      if (response.status === '1') {
        console.log('✅ Verification submitted successfully!');
        console.log('🔍 GUID:', response.result);
        console.log('⏱️  Check status in 30-60 seconds');
        console.log('🌟 Your portfolio should show $653,000 once verified');
      } else {
        console.log('❌ Verification failed:', response.result);
      }
    } catch (e) {
      console.log('❌ Error parsing response:', e.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Request error:', e.message);
});

req.write(postData);
req.end();