const https = require('https');

function httpsGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(data);
                }
            });
        }).on('error', reject);
    });
}

async function analyzeNewTransaction() {
    console.log('🔍 ANALYZING NEW TRANSACTION\n');
    
    const txHash = '0xde0940c599134e2efb34c53939d6b947de09cef6a27d1e9c0ab4dad5ba40d4bc';
    const etherscanKey = process.env.ETHERSCAN_API_KEY;
    
    console.log(`Transaction Hash: ${txHash}\n`);
    
    // Get transaction details
    console.log('📄 TRANSACTION DETAILS:');
    console.log('========================');
    try {
        const txUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${etherscanKey}`;
        const txData = await httpsGet(txUrl);
        
        if (txData.result) {
            const tx = txData.result;
            console.log(`From: ${tx.from}`);
            console.log(`To: ${tx.to}`);
            console.log(`Value: ${parseInt(tx.value, 16) / 1e18} ETH`);
            console.log(`Gas Price: ${parseInt(tx.gasPrice, 16) / 1e9} gwei`);
            console.log(`Gas Limit: ${parseInt(tx.gas, 16).toLocaleString()}`);
            console.log(`Block Number: ${tx.blockNumber ? parseInt(tx.blockNumber, 16) : 'Pending'}`);
            console.log(`Input Data Length: ${tx.input.length} characters`);
            
            // Check if this is a Uniswap transaction
            if (tx.to && tx.to.toLowerCase().includes('router') || tx.input.startsWith('0x38ed1739')) {
                console.log(`Transaction Type: 🦄 UNISWAP SWAP`);
            } else if (tx.to && tx.to.toLowerCase().includes('approve') || tx.input.startsWith('0x095ea7b3')) {
                console.log(`Transaction Type: ✅ TOKEN APPROVAL`);
            } else {
                console.log(`Transaction Type: 📝 CONTRACT INTERACTION`);
            }
        } else {
            console.log('❌ Transaction not found or still pending');
        }
    } catch (error) {
        console.log(`❌ Error fetching transaction: ${error.message}`);
    }
    console.log('');
    
    // Get transaction receipt
    console.log('📋 TRANSACTION RECEIPT:');
    console.log('========================');
    try {
        const receiptUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${etherscanKey}`;
        const receiptData = await httpsGet(receiptUrl);
        
        if (receiptData.result) {
            const receipt = receiptData.result;
            const status = receipt.status === '0x1' ? '✅ SUCCESS' : '❌ FAILED';
            console.log(`Status: ${status}`);
            console.log(`Block Number: ${parseInt(receipt.blockNumber, 16)}`);
            console.log(`Gas Used: ${parseInt(receipt.gasUsed, 16).toLocaleString()}`);
            console.log(`Effective Gas Price: ${parseInt(receipt.effectiveGasPrice, 16) / 1e9} gwei`);
            console.log(`Transaction Fee: ${(parseInt(receipt.gasUsed, 16) * parseInt(receipt.effectiveGasPrice, 16)) / 1e18} ETH`);
            
            if (receipt.status === '0x1') {
                console.log('\n🎉 TRANSACTION SUCCESSFUL!');
                console.log('This transaction completed successfully.');
                
                // Check logs for swap events
                if (receipt.logs && receipt.logs.length > 0) {
                    console.log(`\n📊 TRANSACTION EVENTS:`);
                    console.log(`Found ${receipt.logs.length} event logs`);
                    
                    // Look for Transfer or Swap events
                    receipt.logs.forEach((log, index) => {
                        if (log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef') {
                            console.log(`Event ${index + 1}: Transfer Event`);
                        } else if (log.topics[0] === '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822') {
                            console.log(`Event ${index + 1}: Swap Event`);
                        }
                    });
                }
            } else {
                console.log('\n❌ TRANSACTION FAILED');
                console.log('This transaction used gas but failed to complete.');
            }
        } else {
            console.log('No receipt found - transaction may still be pending');
        }
    } catch (error) {
        console.log(`❌ Error fetching receipt: ${error.message}`);
    }
    console.log('');
    
    console.log('🎯 ANALYSIS SUMMARY:');
    console.log('====================');
    console.log('I will check if this transaction was successful and');
    console.log('help determine your next steps for ETHGR trading.');
}

analyzeNewTransaction();
