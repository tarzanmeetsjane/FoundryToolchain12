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

async function analyzeFailedTransaction() {
    console.log('🔍 ANALYZING FAILED UNISWAP TRANSACTION\n');
    
    const txHash = '0x584552adc82ed6b8943a9dbd31272c889062581bd9462d5f063abca80b1829cc';
    const etherscanKey = process.env.ETHERSCAN_API_KEY;
    
    console.log(`Transaction Hash: ${txHash}\n`);
    
    // Get transaction details from Etherscan
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
            console.log(`Nonce: ${parseInt(tx.nonce, 16)}`);
            console.log(`Block Number: ${tx.blockNumber ? parseInt(tx.blockNumber, 16) : 'Pending'}`);
        } else {
            console.log('❌ Transaction not found in mempool or blockchain');
        }
    } catch (error) {
        console.log(`❌ Error fetching transaction: ${error.message}`);
    }
    console.log('');
    
    // Get transaction receipt (if mined)
    console.log('📋 TRANSACTION RECEIPT:');
    console.log('========================');
    try {
        const receiptUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${etherscanKey}`;
        const receiptData = await httpsGet(receiptUrl);
        
        if (receiptData.result) {
            const receipt = receiptData.result;
            console.log(`Status: ${receipt.status === '0x1' ? '✅ SUCCESS' : '❌ FAILED'}`);
            console.log(`Block Number: ${parseInt(receipt.blockNumber, 16)}`);
            console.log(`Gas Used: ${parseInt(receipt.gasUsed, 16).toLocaleString()}`);
            console.log(`Effective Gas Price: ${parseInt(receipt.effectiveGasPrice, 16) / 1e9} gwei`);
            
            if (receipt.status === '0x0') {
                console.log('\n🚨 TRANSACTION FAILED - Common reasons:');
                console.log('• Insufficient gas limit');
                console.log('• Slippage tolerance too low');
                console.log('• Token approval required');
                console.log('• Price moved during execution');
                console.log('• Insufficient balance');
            }
        } else {
            console.log('Transaction not yet mined or failed to process');
        }
    } catch (error) {
        console.log(`❌ Error fetching receipt: ${error.message}`);
    }
    console.log('');
    
    // Check current wallet status
    console.log('💰 CURRENT WALLET STATUS:');
    console.log('==========================');
    const foundationWallet = '0x058C8FE01E5c9eaC6ee19e6673673B549B368843';
    try {
        // Check ETH balance
        const balanceUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${foundationWallet}&tag=latest&apikey=${etherscanKey}`;
        const balanceData = await httpsGet(balanceUrl);
        
        if (balanceData.status === '1') {
            const ethBalance = parseFloat(balanceData.result) / 1e18;
            console.log(`Foundation Wallet: ${foundationWallet}`);
            console.log(`Current ETH Balance: ${ethBalance.toFixed(6)} ETH`);
            console.log(`Gas Available: ${ethBalance > 0.002 ? '✅ Sufficient' : '⚠️ Low'}`);
        }
    } catch (error) {
        console.log(`❌ Error checking wallet: ${error.message}`);
    }
    console.log('');
    
    console.log('🔧 TROUBLESHOOTING RECOMMENDATIONS:');
    console.log('====================================');
    console.log('1. ✅ Check transaction status on Etherscan');
    console.log('2. ⚡ Increase gas limit (try 300,000-500,000)');
    console.log('3. 📊 Increase slippage tolerance (5-15%)');
    console.log('4. 🔑 Verify token approvals are set');
    console.log('5. 💰 Ensure sufficient ETH for gas fees');
    console.log('6. ⏰ Try during lower network congestion');
    console.log('7. 🔄 Use fresh transaction (new nonce)');
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('===============');
    console.log('I will create a comprehensive swap troubleshooting guide');
    console.log('to help you successfully execute your ETHGR transactions.');
}

analyzeFailedTransaction();
