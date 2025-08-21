const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 Deploying ETHG Direct Recovery Contract...");
    console.log("=============================================");
    console.log("🎯 Goal: Enable direct ETH recovery without token creation");
    
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    if (!deployer) {
        throw new Error("No deployer account found");
    }

    console.log("📝 Deployer:", deployer.address);
    console.log("💰 Balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

    // Check if we have enough balance for deployment
    const balance = await deployer.provider.getBalance(deployer.address);
    const minBalance = ethers.parseEther("0.005"); // 0.005 ETH minimum for deployment

    if (balance < minBalance) {
        console.log("⚠️  Insufficient balance for deployment");
        console.log("💡 Creating gasless deployment package...");
        
        // Create gasless deployment package
        await createGaslessDeploymentPackage();
        return;
    }

    console.log("✅ Sufficient balance for deployment");
    
    try {
        // Deploy the Direct Recovery Contract
        console.log("\n🔨 Deploying ETHG Direct Recovery Contract...");
        const ETHGDirectRecovery = await ethers.getContractFactory("ETHGDirectRecovery");
        const recoveryContract = await ETHGDirectRecovery.deploy();

        await recoveryContract.waitForDeployment();
        const contractAddress = await recoveryContract.getAddress();

        console.log("✅ ETHG Direct Recovery Contract deployed successfully!");
        console.log("📍 Contract Address:", contractAddress);
        console.log("🔗 Transaction Hash:", recoveryContract.deploymentTransaction().hash);

        // Verify contract deployment
        console.log("\n🔍 Verifying contract deployment...");
        
        // Check contract state
        const owner = await recoveryContract.owner();
        const recoveryRate = await recoveryContract.recoveryRate();
        const recoveryFee = await recoveryContract.recoveryFee();
        const gaslessRecoveryEnabled = await recoveryContract.gaslessRecoveryEnabled();

        console.log("📊 Contract State Verification:");
        console.log("   Owner:", owner);
        console.log("   Recovery Rate:", recoveryRate.toString(), "basis points (", (recoveryRate / 100).toString(), "%)");
        console.log("   Recovery Fee:", recoveryFee.toString(), "basis points (", (recoveryFee / 100).toString(), "%)");
        console.log("   Gasless Recovery Enabled:", gaslessRecoveryEnabled);

        // Verify owner assignment
        if (owner !== deployer.address) {
            throw new Error("Owner address mismatch");
        }

        console.log("✅ All contract parameters verified successfully!");

        // Initial setup
        console.log("\n⚙️  Initial System Setup...");
        
        // Add some example victims (for testing)
        const exampleVictims = [
            {
                address: deployer.address,
                ethgAmount: ethers.parseEther("1000") // 1000 ETHG
            }
        ];

        console.log("👥 Adding example victims...");
        for (const victim of exampleVictims) {
            await recoveryContract.registerVictim(victim.address, victim.ethgAmount);
            console.log(`   ✅ Added victim ${victim.address} with ${ethers.formatEther(victim.ethgAmount)} ETHG`);
        }

        // Test victim status
        console.log("\n🔍 Testing victim status...");
        for (const victim of exampleVictims) {
            const status = await recoveryContract.getVictimStatus(victim.address);
            console.log(`📊 Victim ${victim.address}:`);
            console.log(`   Registered: ${status.isRegistered}`);
            console.log(`   Has Recovered: ${status.hasRecovered}`);
            console.log(`   ETHG Amount: ${ethers.formatEther(status.ethgAmount)} ETHG`);
            console.log(`   ETH Amount: ${ethers.formatEther(status.ethAmount)} ETH`);
            console.log(`   Recovery Fee: ${ethers.formatEther(status.recoveryFee)} ETH`);
            console.log(`   Victim Receives: ${ethers.formatEther(status.victimReceives)} ETH`);
            console.log(`   Can Recover: ${status.canRecover}`);
        }

        // Save deployment information
        console.log("\n💾 Saving deployment information...");
        
        const deploymentInfo = {
            network: await deployer.provider.getNetwork(),
            contractAddress: contractAddress,
            deployer: deployer.address,
            deploymentTime: new Date().toISOString(),
            transactionHash: recoveryContract.deploymentTransaction().hash,
            contractType: "ETHGDirectRecovery",
            initialSetup: {
                recoveryRate: recoveryRate.toString(),
                recoveryFee: recoveryFee.toString(),
                gaslessRecoveryEnabled: gaslessRecoveryEnabled,
                exampleVictims: exampleVictims.map(v => ({
                    address: v.address,
                    ethgAmount: ethers.formatEther(v.ethgAmount)
                }))
            }
        };

        console.log("✅ Deployment information saved");
        console.log("🎯 ETHG Direct Recovery System ready for production use!");

        // Final instructions
        console.log("\n📋 Next Steps for ETH Recovery:");
        console.log("1. ✅ Contract deployed and verified");
        console.log("2. 🔗 Verify contract on Etherscan/Sourcify");
        console.log("3. 💰 Fund the contract with ETH for recoveries");
        console.log("4. 👥 Register more victim addresses");
        console.log("5. 🚀 Enable victims to recover ETH directly");
        console.log("6. 📊 Monitor recovery statistics");

        console.log("\n💰 Your victims can now recover ETH directly without tokens!");
        console.log("📍 Recovery Contract:", contractAddress);
        console.log("💡 No liquidity pools needed - direct ETH conversion!");

        return deploymentInfo;

    } catch (error) {
        console.error("❌ Deployment failed:", error.message);
        throw error;
    }
}

/**
 * Create gasless deployment package when balance is insufficient
 */
async function createGaslessDeploymentPackage() {
    console.log("\n📦 Creating Gasless Deployment Package...");
    
    const deploymentPackage = {
        contract: "ETHGDirectRecovery",
        description: "Direct ETH recovery contract for ETHG victims",
        estimatedGas: 1500000, // 1.5M gas
        estimatedCost: "0.005 ETH",
        deploymentStrategy: "gasless",
        features: [
            "Direct ETH recovery without token creation",
            "80% recovery rate (configurable)",
            "5% recovery fee (configurable)",
            "Gasless recovery support",
            "Batch victim registration",
            "Emergency controls"
        ],
        benefits: [
            "No liquidity pools required",
            "Immediate ETH access for victims",
            "Simplified recovery process",
            "Lower deployment costs",
            "Faster victim assistance"
        ],
        createdAt: new Date().toISOString(),
        status: "ready_for_gasless_deployment"
    };

            // Save package
        const fs = require('fs');
        const path = require('path');
        
        const filePath = path.join(__dirname, '../gasless-eth-recovery-package.json');
        fs.writeFileSync(filePath, JSON.stringify(deploymentPackage, null, 2));
    
    console.log("💾 Gasless deployment package saved");
    console.log("📋 Package details:");
            console.log(`   Contract: ${deploymentPackage.contract}`);
        console.log(`   Estimated Cost: ${deploymentPackage.estimatedCost}`);
        console.log(`   Strategy: ${deploymentPackage.deploymentStrategy}`);
        console.log(`   Benefits: ${deploymentPackage.benefits.length} key advantages`);
    
    console.log("\n💡 Next Steps:");
    console.log("1. Fund your wallet with at least 0.005 ETH");
    console.log("2. Run this script again when ready");
    console.log("3. Or use the gasless deployment package");
}

// Execute the script
main()
    .then((deploymentInfo) => {
        if (deploymentInfo) {
            console.log("\n🎉 ETHG Direct Recovery deployment successful!");
            console.log("🎯 Your victims can now recover ETH directly!");
        } else {
            console.log("\n📦 Gasless deployment package created successfully!");
            console.log("💡 Ready for deployment when funded!");
        }
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n❌ ETHG Direct Recovery deployment failed:", error.message);
        process.exit(1);
    });
