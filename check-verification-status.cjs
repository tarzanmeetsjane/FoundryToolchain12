// Check Etherscan verification status
const https = require('https');

const guid = 'atemyifatp1r1iiqwhr9b1rxss3nbuuf6tmsega4rcnmp4rwrz';
const apiKey = process.env.ETHERSCAN_API_KEY;

const options = {
  hostname: 'api.etherscan.io',
  port: 443,
  path: `/api?module=contract&action=checkverifystatus&guid=${guid}&apikey=${apiKey}`,
  method: 'GET'
};

console.log('Checking verification status...');

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('Status Response:', response);
      
      if (response.status === '1') {
        console.log('Contract verified successfully!');
        console.log('Your portfolio should now display $653,000');
      } else if (response.result === 'Pending in queue') {
        console.log('Verification still pending. Check again in 30 seconds.');
      } else {
        console.log('Verification status:', response.result);
      }
    } catch (e) {
      console.log('Error parsing response:', e.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.end();