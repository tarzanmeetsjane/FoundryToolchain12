const { ethers } = require('ethers');

// Test both formats
const keyWithoutPrefix = 'a5ed71406d5a0be4fb9fe9ba2ff4addf51f01922688bc1eabf51ab92fbfe694f';
const keyWithPrefix = '0xa5ed71406d5a0be4fb9fe9ba2ff4addf51f01922688bc1eabf51ab92fbfe694f';

console.log('🔍 Testing private key formats...\n');

try {
    // Test without 0x prefix
    const wallet1 = new ethers.Wallet(keyWithoutPrefix);
    console.log(`✅ Key without 0x: ${wallet1.address}`);
} catch (error) {
    console.log(`❌ Key without 0x failed: ${error.message}`);
}

try {
    // Test with 0x prefix
    const wallet2 = new ethers.Wallet(keyWithPrefix);
    console.log(`✅ Key with 0x: ${wallet2.address}`);
} catch (error) {
    console.log(`❌ Key with 0x failed: ${error.message}`);
}

// Check if they're the same address
try {
    const wallet1 = new ethers.Wallet(keyWithoutPrefix);
    const wallet2 = new ethers.Wallet(keyWithPrefix);
    
    if (wallet1.address === wallet2.address) {
        console.log('\n✅ Both formats produce the same wallet address');
        console.log(`Address: ${wallet1.address}`);
        
        if (wallet1.address.toLowerCase() === '0x058c8fe01e5c9eac6ee19e6673673b549b368843') {
            console.log('✅ This matches your foundation wallet!');
        } else {
            console.log('❌ This does NOT match your foundation wallet');
            console.log('Expected: 0x058c8fe01e5c9eac6ee19e6673673b549b368843');
        }
    } else {
        console.log('\n❌ Different addresses - this should not happen');
    }
} catch (error) {
    console.log(`\n❌ Comparison failed: ${error.message}`);
}

console.log('\n📋 Key Information:');
console.log(`Original key: ${keyWithoutPrefix}`);
console.log(`With 0x prefix: ${keyWithPrefix}`);
console.log(`Key length: ${keyWithoutPrefix.length} characters`);
console.log(`Expected length: 64 characters`);

if (keyWithoutPrefix.length === 64) {
    console.log('✅ Length is correct');
} else {
    console.log('❌ Length is incorrect');
}
