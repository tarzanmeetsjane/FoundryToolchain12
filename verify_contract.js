const https = require('https');
const querystring = require('querystring');
const fs = require('fs');

const contractSource = fs.readFileSync('contract_source_flat.sol', 'utf8');

const postData = querystring.stringify({
  module: 'contract',
  action: 'verifysourcecode',
  contractaddress: '0xc2b6d375b7d14c9ce73f97ddf565002cce257308',
  sourceCode: contractSource,
  contractname: 'ETHGRecovery',
  compilerversion: 'v0.8.30+commit.73712a01',
  optimizationUsed: '0',
  runs: '200',
  constructorArguements: '',
  evmversion: '',
  licenseType: '3',
  apikey: process.env.ETHERSCAN_API_KEY
});

const options = {
  hostname: 'api.etherscan.io',
  path: '/api',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.write(postData);
req.end();
