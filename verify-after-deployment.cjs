// Verification script to run after contract deployment
const https = require('https');
const fs = require('fs');

// This will be updated with the actual contract address after deployment
const contractAddress = 'DEPLOYED_CONTRACT_ADDRESS'; // Update this after deployment
const apiKey = process.env.ETHERSCAN_API_KEY;

// Read the contract source
const contractSource = fs.readFileSync('./contracts/ETHGRecoverySimple.sol', 'utf8');

const postData = new URLSearchParams({
  apikey: apiKey,
  module: 'contract',
  action: 'verifysourcecode',
  contractaddress: contractAddress,
  sourceCode: contractSource,
  codeformat: 'solidity-single-file',
  contractname: 'ETHGRecoverySimple',
  compilerversion: 'v0.8.19+commit.7dd6d404',
  optimizationUsed: '0', // No optimization for Remix deployment
  runs: '200',
  constructorArguements: '', // Empty constructor
  evmversion: 'default',
  licenseType: '3' // MIT License
}).toString();

function verifyContract(address) {
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

  console.log('🚀 Verifying contract:', address);

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
          console.log('⏱️  Verification will complete in 30-60 seconds');
          console.log('🌟 Your portfolio will show $653,000 once verified');
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

  req.write(postData.replace('DEPLOYED_CONTRACT_ADDRESS', address));
  req.end();
}

// Usage: node verify-after-deployment.cjs CONTRACT_ADDRESS
if (process.argv[2]) {
  verifyContract(process.argv[2]);
} else {
  console.log('Usage: node verify-after-deployment.cjs CONTRACT_ADDRESS');
}