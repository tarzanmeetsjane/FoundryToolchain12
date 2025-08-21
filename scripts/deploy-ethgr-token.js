const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 Deploying ETHGR Recovery Token Contract...");
    
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("📝 Deploying from account:", deployer.address);
    console.log("💰 Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

    // Deploy the ETHGR token contract
    console.log("🔨 Deploying ETHGR Token Contract...");
    const ETHGRToken = await ethers.getContractFactory("ETHGRToken");
    const ethgrToken = await ETHGRToken.deploy();

    await ethgrToken.waitForDeployment();
    const tokenAddress = await ethgrToken.getAddress();

    console.log("✅ ETHGR Token Contract deployed successfully!");
    console.log("📍 Token Address:", tokenAddress);
    console.log("🔗 Transaction Hash:", ethgrToken.deploymentTransaction().hash);

    // Verify contract deployment
    console.log("🔍 Verifying contract deployment...");
    
    // Check contract state
    const name = await ethgrToken.name();
    const symbol = await ethgrToken.symbol();
    const totalSupply = await ethgrToken.totalSupply();
    const owner = await ethgrToken.owner();
    const victimClaimsEnabled = await ethgrToken.victimClaimsEnabled();
    const liquidityLocked = await ethgrToken.liquidityLocked();

    console.log("📊 Contract State Verification:");
    console.log("   Name:", name);
    console.log("   Symbol:", symbol);
    console.log("   Total Supply:", ethers.formatEther(totalSupply), "ETHGR");
    console.log("   Owner:", owner);
    console.log("   Victim Claims Enabled:", victimClaimsEnabled);
    console.log("   Liquidity Locked:", liquidityLocked);

    // Verify total supply matches expected
    const expectedSupply = ethers.parseEther("1990000"); // 1,990,000 ETHGR
    if (totalSupply.toString() !== expectedSupply.toString()) {
        throw new Error(`Total supply mismatch: expected ${expectedSupply}, got ${totalSupply}`);
    }

    // Verify owner assignment
    if (owner !== deployer.address) {
        throw new Error("Owner address mismatch");
    }

    console.log("✅ All contract parameters verified successfully!");

    // Save deployment info
    const deploymentInfo = {
        network: await deployer.provider.getNetwork(),
        contractAddress: tokenAddress,
        deployer: deployer.address,
        deploymentTime: new Date().toISOString(),
        transactionHash: ethgrToken.deploymentTransaction().hash,
        contractType: "ETHGRToken",
        totalSupply: ethers.formatEther(totalSupply)
    };

    console.log("💾 Deployment information saved");
    console.log("🎯 ETHGR Token ready for production use!");

    // Next steps instructions
    console.log("\n📋 Next Steps:");
    console.log("1. Verify contract on Etherscan/Sourcify");
    console.log("2. Add victim addresses and allocations");
    console.log("3. Enable victim claims");
    console.log("4. Deploy meta-transaction contract");
    console.log("5. Set up liquidity pools");

    return deploymentInfo;
}

// Handle errors
main()
    .then((deploymentInfo) => {
        console.log("🎉 ETHGR Token deployment completed successfully!");
        console.log("📍 Contract Address:", deploymentInfo.contractAddress);
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ ETHGR Token deployment failed:", error);
        process.exit(1);
    });


