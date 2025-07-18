
const ethers = require('ethers');

async function executeETHRecovery() {
    console.log("🚀 Starting ETH Recovery Process...");
    
    // Contract details
    const contractAddress = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
    const targetWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
    
    // Setup provider
    const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY');
    
    // Contract ABI for the migration function
    const abi = [
        "function migrateMyTrappedETHG() external",
        "function balanceOf(address) external view returns (uint256)",
        "function hasMigrated(address) external view returns (bool)",
        "function totalSupply() external view returns (uint256)"
    ];
    
    try {
        // Create contract instance
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        // Check current status
        console.log("📊 Checking contract status...");
        const hasMigrated = await contract.hasMigrated(targetWallet);
        const currentBalance = await contract.balanceOf(targetWallet);
        const totalSupply = await contract.totalSupply();
        
        console.log(`Migration Status: ${hasMigrated ? 'Already migrated' : 'Ready to migrate'}`);
        console.log(`Current Balance: ${ethers.formatEther(currentBalance)} ETHGR`);
        console.log(`Total Supply: ${ethers.formatEther(totalSupply)} ETHGR`);
        
        if (!hasMigrated) {
            console.log("✅ Ready to execute migration for 1,990,000 ETHGR tokens");
            console.log("💡 Next step: Call migrateMyTrappedETHG() from wallet:", targetWallet);
            
            return {
                status: "ready",
                action: "Call migrateMyTrappedETHG() function",
                expectedTokens: "1990000",
                contractAddress: contractAddress
            };
        } else {
            console.log("ℹ️ Migration already completed");
            return {
                status: "completed",
                currentBalance: ethers.formatEther(currentBalance)
            };
        }
        
    } catch (error) {
        console.error("❌ Error:", error.message);
        return {
            status: "error",
            error: error.message
        };
    }
}

// Execute if run directly
if (require.main === module) {
    executeETHRecovery().then(result => {
        console.log("\n🎯 Recovery Result:", result);
    });
}

module.exports = { executeETHRecovery };
