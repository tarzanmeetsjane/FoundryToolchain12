// Comprehensive wallet asset checker for Base L2 funding
const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
const etherscanApi = "IRSDN3CM3AMG2Y2S2SBAISZ3HF7SV6TAG3";

// Check ETH balance
async function checkETHBalance() {
    try {
        const response = await fetch(
            `https://api.etherscan.io/api?module=account&action=balance&address=${foundationWallet}&tag=latest&apikey=${etherscanApi}`
        );
        const data = await response.json();
        const ethBalance = parseInt(data.result) / 1e18;
        return ethBalance;
    } catch (error) {
        console.error("Error checking ETH balance:", error);
        return 0;
    }
}

// Check ERC-20 token balances
async function checkTokenBalance(tokenAddress, tokenName, decimals = 18) {
    try {
        const response = await fetch(
            `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${foundationWallet}&tag=latest&apikey=${etherscanApi}`
        );
        const data = await response.json();
        const balance = parseInt(data.result) / Math.pow(10, decimals);
        return { token: tokenName, balance, address: tokenAddress };
    } catch (error) {
        console.error(`Error checking ${tokenName} balance:`, error);
        return { token: tokenName, balance: 0, address: tokenAddress };
    }
}

async function analyzeFoundationAssets() {
    console.log("ETHGR Foundation Asset Analysis");
    console.log("Wallet:", foundationWallet);
    console.log("Target: $200-300 for Base L2 deployment");
    console.log("=" * 60);
    
    // Check ETH balance
    const ethBalance = await checkETHBalance();
    const ethValue = ethBalance * 2400; // Approximate ETH price
    
    console.log(`ETH Balance: ${ethBalance.toFixed(6)} ETH (~$${ethValue.toFixed(2)})`);
    
    // Check key tokens
    const tokens = [
        { address: "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308", name: "ETHGR", decimals: 18 },
        { address: "0xA0b86a33E6441b9435B8B6FdfE2D12E50b3a7F82", name: "USDC", decimals: 6 },
        { address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", name: "DAI", decimals: 18 },
        { address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", name: "UNI", decimals: 18 },
        { address: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc", name: "USDC/ETH LP", decimals: 18 }
    ];
    
    let totalValue = ethValue;
    console.log("\nToken Balances:");
    
    for (const token of tokens) {
        const result = await checkTokenBalance(token.address, token.name, token.decimals);
        console.log(`${result.token}: ${result.balance.toFixed(6)}`);
        
        // Rough value estimation
        if (result.token === "USDC" || result.token === "DAI") {
            totalValue += result.balance;
        } else if (result.token === "UNI") {
            totalValue += result.balance * 8; // Approximate UNI price
        } else if (result.token === "USDC/ETH LP") {
            totalValue += result.balance * 50; // Rough LP value
        }
    }
    
    console.log("\n" + "=" * 60);
    console.log(`Total Estimated Portfolio Value: $${totalValue.toFixed(2)}`);
    console.log(`Funding Target ($200-300): ${totalValue >= 200 ? "ACHIEVABLE" : "NEEDS REVIEW"}`);
    
    if (totalValue >= 200) {
        console.log("\nFUNDING STRATEGY:");
        console.log("✓ Sufficient assets for Base L2 deployment");
        console.log("✓ Liquidate LP tokens or convert ETH");
        console.log("✓ Proceed with Base L2 migration");
        console.log("✓ Create $140-240 liquidity pool");
    } else {
        console.log("\nALTERNATIVE OPTIONS:");
        console.log("• Check trading bot profits");
        console.log("• Review DeFi yield positions");
        console.log("• Consider gradual deployment approach");
    }
    
    return {
        ethBalance,
        ethValue,
        totalValue,
        fundingAchievable: totalValue >= 200
    };
}

// Execute analysis
analyzeFoundationAssets().then(result => {
    console.log("\nAsset analysis complete - Ready for Base L2 funding decision");
}).catch(error => {
    console.error("Analysis failed:", error);
});