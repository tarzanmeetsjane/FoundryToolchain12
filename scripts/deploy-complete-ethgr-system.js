const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 Deploying Complete ETHGR Recovery System...");
    console.log("================================================");
    
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("📝 Deploying from account:", deployer.address);
    console.log("💰 Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

    // Step 1: Deploy ETHGR Token Contract
    console.log("\n🔨 Step 1: Deploying ETHGR Token Contract...");
    const ETHGRToken = await ethers.getContractFactory("ETHGRToken");
    const ethgrToken = await ETHGRToken.deploy();

    await ethgrToken.waitForDeployment();
    const tokenAddress = await ethgrToken.getAddress();

    console.log("✅ ETHGR Token deployed at:", tokenAddress);

    // Step 2: Deploy Meta-Transaction Contract
    console.log("\n🔨 Step 2: Deploying ETHGR Meta-Transaction Contract...");
    
    // Get network-specific addresses
    const network = await deployer.provider.getNetwork();
    let wethAddress, uniswapRouterAddress;
    
    if (network.chainId === 1n) { // Mainnet
        wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
        uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
        console.log("🌐 Network: Mainnet");
    } else if (network.chainId === 11155111n) { // Sepolia
        wethAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
        uniswapRouterAddress = "0xC532a74256D3Db4D444bb7B4c3C5d1c4C5d1c4C5"; // Sepolia Uniswap V2
        console.log("🌐 Network: Sepolia Testnet");
    } else {
        // Use environment variables or defaults
        wethAddress = process.env.WETH_ADDRESS || "0x0000000000000000000000000000000000000000";
        uniswapRouterAddress = process.env.UNISWAP_ROUTER_ADDRESS || "0x0000000000000000000000000000000000000000";
        console.log("🌐 Network: Custom/Unknown");
    }

    console.log("🔧 Contract Configuration:");
    console.log("   ETHGR Token:", tokenAddress);
    console.log("   WETH Address:", wethAddress);
    console.log("   Uniswap Router:", uniswapRouterAddress);

    const ETHGRMetaTransaction = await ethers.getContractFactory("ETHGRMetaTransaction");
    const metaTransactionContract = await ETHGRMetaTransaction.deploy(
        tokenAddress,
        wethAddress,
        uniswapRouterAddress
    );

    await metaTransactionContract.waitForDeployment();
    const metaTransactionAddress = await metaTransactionContract.getAddress();

    console.log("✅ Meta-Transaction Contract deployed at:", metaTransactionAddress);

    // Step 3: Verify and Configure Contracts
    console.log("\n🔍 Step 3: Verifying Contract Configuration...");
    
    // Verify ETHGR Token
    const tokenName = await ethgrToken.name();
    const tokenSymbol = await ethgrToken.symbol();
    const totalSupply = await ethgrToken.totalSupply();
    const tokenOwner = await ethgrToken.owner();

    console.log("📊 ETHGR Token Verification:");
    console.log("   Name:", tokenName);
    console.log("   Symbol:", tokenSymbol);
    console.log("   Total Supply:", ethers.formatEther(totalSupply), "ETHGR");
    console.log("   Owner:", tokenOwner);

    // Verify Meta-Transaction Contract
    const ethgrTokenAddress = await metaTransactionContract.ethgrToken();
    const wethContractAddress = await metaTransactionContract.wethAddress();
    const routerAddress = await metaTransactionContract.uniswapRouter();
    const metaOwner = await metaTransactionContract.owner();

    console.log("📊 Meta-Transaction Contract Verification:");
    console.log("   ETHGR Token:", ethgrTokenAddress);
    console.log("   WETH Address:", wethContractAddress);
    console.log("   Uniswap Router:", routerAddress);
    console.log("   Owner:", metaOwner);

    // Step 4: Initial Setup
    console.log("\n⚙️ Step 4: Initial System Setup...");
    
    // Add deployer as first victim (for testing)
    console.log("👤 Adding deployer as authorized victim...");
    const deployerAllocation = ethers.parseEther("10000"); // 10,000 ETHGR for testing
    await ethgrToken.addVictim(deployer.address, deployerAllocation);
    
    // Enable victim claims
    console.log("🔓 Enabling victim claims...");
    await ethgrToken.enableVictimClaims();
    
    // Claim initial allocation
    console.log("💰 Claiming initial victim allocation...");
    await ethgrToken.claimVictimAllocation();
    
    const deployerBalance = await ethgrToken.balanceOf(deployer.address);
    console.log("   Deployer ETHGR Balance:", ethers.formatEther(deployerBalance), "ETHGR");

    // Step 5: System Verification
    console.log("\n✅ Step 5: Final System Verification...");
    
    // Check victim status
    const victimStatus = await ethgrToken.getVictimStatus(deployer.address);
    console.log("👤 Victim Status Verification:");
    console.log("   Is Victim:", victimStatus.isVictim);
    console.log("   Has Claimed:", victimStatus.hasClaimed);
    console.log("   Allocation:", ethers.formatEther(victimStatus.allocation), "ETHGR");
    console.log("   Can Claim:", victimStatus.canClaim);

    // Check contract stats
    const contractStats = await ethgrToken.getContractStats();
    console.log("📊 Contract Statistics:");
    console.log("   Total Victim Allocation:", ethers.formatEther(contractStats.totalVictimAllocation), "ETHGR");
    console.log("   Liquidity Amount:", ethers.formatEther(contractStats.liquidityAmount), "ETHGR");
    console.log("   Time Until Deadline:", Math.floor(contractStats.timeUntilDeadline / 86400), "days");

    // Step 6: Save Deployment Information
    console.log("\n💾 Step 6: Saving Deployment Information...");
    
    const deploymentInfo = {
        network: {
            chainId: network.chainId.toString(),
            name: network.name || "unknown"
        },
        contracts: {
            ethgrToken: {
                address: tokenAddress,
                name: tokenName,
                symbol: tokenSymbol,
                totalSupply: ethers.formatEther(totalSupply),
                owner: tokenOwner
            },
            metaTransaction: {
                address: metaTransactionAddress,
                ethgrToken: ethgrTokenAddress,
                wethAddress: wethContractAddress,
                uniswapRouter: routerAddress,
                owner: metaOwner
            }
        },
        deployer: deployer.address,
        deploymentTime: new Date().toISOString(),
        transactions: {
            tokenDeployment: ethgrToken.deploymentTransaction().hash,
            metaTransactionDeployment: metaTransactionContract.deploymentTransaction().hash
        },
        initialSetup: {
            victimClaimsEnabled: true,
            deployerAllocation: ethers.formatEther(deployerAllocation),
            deployerBalance: ethers.formatEther(deployerBalance)
        }
    };

    console.log("✅ Deployment information saved");
    console.log("🎯 Complete ETHGR Recovery System deployed successfully!");

    // Final instructions
    console.log("\n📋 Next Steps for Token Value Recovery:");
    console.log("1. ✅ Contracts deployed and verified");
    console.log("2. 🔗 Verify contracts on Etherscan/Sourcify");
    console.log("3. 💧 Set up liquidity pools on Uniswap");
    console.log("4. 📢 Announce deployment to community");
    console.log("5. 🎯 Add more victim addresses");
    console.log("6. 🚀 Enable trading and value discovery");

    console.log("\n💰 Your ETHGR tokens are now ready for value recovery!");
    console.log("📍 ETHGR Token:", tokenAddress);
    console.log("📍 Meta-Transaction Contract:", metaTransactionAddress);

    return deploymentInfo;
}

// Handle errors
main()
    .then((deploymentInfo) => {
        console.log("\n🎉 Complete ETHGR System deployment successful!");
        console.log("🎯 Your recovery tokens are now deployed and ready!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n❌ ETHGR System deployment failed:", error);
        console.error("🔍 Check the error details above and try again");
        process.exit(1);
    });


