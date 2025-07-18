
const { ethers } = require('ethers');

// ETHGR Recovery and ETH Conversion Script
async function executeCompleteRecovery() {
    console.log("🚀 Starting Complete ETHGR Recovery to ETH...");
    
    // Your wallet and contract details
    const WALLET_ADDRESS = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
    const ETHGR_CONTRACT = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
    const CONVERTER_CONTRACT = "0x..." // Will be deployed
    
    // Setup provider with your private key from Secrets
    const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    console.log(`Using wallet: ${wallet.address}`);
    
    // Step 1: Check if migration is already done
    const ethgrAbi = [
        "function migrateMyTrappedETHG() external",
        "function balanceOf(address) external view returns (uint256)",
        "function hasMigrated(address) external view returns (bool)",
        "function totalSupply() external view returns (uint256)"
    ];
    
    const ethgrContract = new ethers.Contract(ETHGR_CONTRACT, ethgrAbi, wallet);
    
    try {
        // Check migration status
        const hasMigrated = await ethgrContract.hasMigrated(WALLET_ADDRESS);
        const currentBalance = await ethgrContract.balanceOf(WALLET_ADDRESS);
        
        console.log(`Migration Status: ${hasMigrated ? 'Completed' : 'Pending'}`);
        console.log(`Current ETHGR Balance: ${ethers.formatEther(currentBalance)}`);
        
        // Step 2: Execute migration if not done
        if (!hasMigrated) {
            console.log("🔄 Executing ETHGR migration...");
            const migrateTx = await ethgrContract.migrateMyTrappedETHG({
                gasLimit: 200000
            });
            await migrateTx.wait();
            console.log("✅ Migration completed!");
            
            // Update balance
            const newBalance = await ethgrContract.balanceOf(WALLET_ADDRESS);
            console.log(`New ETHGR Balance: ${ethers.formatEther(newBalance)}`);
        }
        
        // Step 3: Convert ETHGR to ETH via Uniswap
        const converterAbi = [
            "function convertETHGRToETH(uint256 ethgrAmount, uint256 minEthOut) external",
            "function getEstimatedETH(uint256 ethgrAmount) external view returns (uint256 estimatedETH, uint256 fee)"
        ];
        
        // Deploy converter if needed or use existing
        console.log("🔄 Converting ETHGR to ETH...");
        
        // Get current ETHGR balance for conversion
        const ethgrBalance = await ethgrContract.balanceOf(WALLET_ADDRESS);
        
        if (ethgrBalance > 0) {
            // Use Uniswap directly for conversion
            const uniswapRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
            const routerAbi = [
                "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
                "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
                "function WETH() external pure returns (address)"
            ];
            
            const router = new ethers.Contract(uniswapRouter, routerAbi, wallet);
            const weth = await router.WETH();
            
            // Approve ETHGR for router
            const approveAbi = ["function approve(address spender, uint256 amount) external returns (bool)"];
            const ethgrForApproval = new ethers.Contract(ETHGR_CONTRACT, approveAbi, wallet);
            
            console.log("📝 Approving ETHGR for Uniswap...");
            const approveTx = await ethgrForApproval.approve(uniswapRouter, ethgrBalance);
            await approveTx.wait();
            
            // Get estimated ETH output
            const path = [ETHGR_CONTRACT, weth];
            const amounts = await router.getAmountsOut(ethgrBalance, path);
            const estimatedETH = amounts[1];
            const minETH = estimatedETH * BigInt(95) / BigInt(100); // 5% slippage
            
            console.log(`Estimated ETH output: ${ethers.formatEther(estimatedETH)}`);
            console.log(`Minimum ETH (5% slippage): ${ethers.formatEther(minETH)}`);
            
            // Execute swap
            console.log("🔄 Executing ETHGR → ETH swap...");
            const swapTx = await router.swapExactTokensForETH(
                ethgrBalance,
                minETH,
                path,
                WALLET_ADDRESS,
                Math.floor(Date.now() / 1000) + 300, // 5 minute deadline
                { gasLimit: 300000 }
            );
            
            const receipt = await swapTx.wait();
            console.log("✅ Swap completed!");
            console.log(`Transaction: ${receipt.transactionHash}`);
            
            // Check final ETH balance
            const ethBalance = await provider.getBalance(WALLET_ADDRESS);
            console.log(`Final ETH Balance: ${ethers.formatEther(ethBalance)} ETH`);
            
            return {
                success: true,
                ethgrRecovered: ethers.formatEther(ethgrBalance),
                ethReceived: ethers.formatEther(estimatedETH),
                transactionHash: receipt.transactionHash
            };
        } else {
            console.log("❌ No ETHGR balance to convert");
            return { success: false, reason: "No ETHGR balance" };
        }
        
    } catch (error) {
        console.error("❌ Recovery failed:", error);
        return { success: false, error: error.message };
    }
}

// Execute recovery
executeCompleteRecovery()
    .then(result => {
        console.log("\n🎉 RECOVERY COMPLETE!");
        console.log("Results:", result);
    })
    .catch(error => {
        console.error("❌ Recovery failed:", error);
    });

module.exports = { executeCompleteRecovery };
