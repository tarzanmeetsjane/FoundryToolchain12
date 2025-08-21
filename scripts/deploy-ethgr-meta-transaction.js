const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 Deploying ETHGR Meta-Transaction Contract...");
    
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("📝 Deploying from account:", deployer.address);
    console.log("💰 Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

    // Contract addresses (these need to be set for your target network)
    const ETHGR_TOKEN_ADDRESS = process.env.ETHGR_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000";
    const WETH_ADDRESS = process.env.WETH_ADDRESS || "0x0000000000000000000000000000000000000000";
    const UNISWAP_ROUTER_ADDRESS = process.env.UNISWAP_ROUTER_ADDRESS || "0x0000000000000000000000000000000000000000";

    console.log("🔧 Contract Configuration:");
    console.log("   ETHGR Token:", ETHGR_TOKEN_ADDRESS);
    console.log("   WETH Address:", WETH_ADDRESS);
    console.log("   Uniswap Router:", UNISWAP_ROUTER_ADDRESS);

    // Validate addresses
    if (ETHGR_TOKEN_ADDRESS === "0x0000000000000000000000000000000000000000") {
        throw new Error("ETHGR_TOKEN_ADDRESS not set in environment variables");
    }
    if (WETH_ADDRESS === "0x0000000000000000000000000000000000000000") {
        throw new Error("WETH_ADDRESS not set in environment variables");
    }
    if (UNISWAP_ROUTER_ADDRESS === "0x0000000000000000000000000000000000000000") {
        throw new Error("UNISWAP_ROUTER_ADDRESS not set in environment variables");
    }

    // Deploy the contract
    const ETHGRMetaTransaction = await ethers.getContractFactory("ETHGRMetaTransaction");
    const metaTransactionContract = await ETHGRMetaTransaction.deploy(
        ETHGR_TOKEN_ADDRESS,
        WETH_ADDRESS,
        UNISWAP_ROUTER_ADDRESS
    );

    await metaTransactionContract.waitForDeployment();
    const contractAddress = await metaTransactionContract.getAddress();

    console.log("✅ ETHGR Meta-Transaction Contract deployed successfully!");
    console.log("📍 Contract Address:", contractAddress);
    console.log("🔗 Transaction Hash:", metaTransactionContract.deploymentTransaction().hash);

    // Verify contract deployment
    console.log("🔍 Verifying contract deployment...");
    const deployedContract = await ethers.getContractAt("ETHGRMetaTransaction", contractAddress);
    
    // Check contract state
    const ethgrToken = await deployedContract.ethgrToken();
    const wethAddress = await deployedContract.wethAddress();
    const uniswapRouter = await deployedContract.uniswapRouter();
    const owner = await deployedContract.owner();
    const gasPriceMultiplier = await deployedContract.gasPriceMultiplier();
    const minEthgrForGas = await deployedContract.minEthgrForGas();

    console.log("📊 Contract State Verification:");
    console.log("   ETHGR Token:", ethgrToken);
    console.log("   WETH Address:", wethAddress);
    console.log("   Uniswap Router:", uniswapRouter);
    console.log("   Owner:", owner);
    console.log("   Gas Price Multiplier:", gasPriceMultiplier.toString());
    console.log("   Min ETHGR for Gas:", ethers.formatEther(minEthgrForGas), "ETHGR");

    // Verify all addresses match
    if (ethgrToken !== ETHGR_TOKEN_ADDRESS) {
        throw new Error("ETHGR token address mismatch");
    }
    if (wethAddress !== WETH_ADDRESS) {
        throw new Error("WETH address mismatch");
    }
    if (uniswapRouter !== UNISWAP_ROUTER_ADDRESS) {
        throw new Error("Uniswap router address mismatch");
    }
    if (owner !== deployer.address) {
        throw new Error("Owner address mismatch");
    }

    console.log("✅ All contract parameters verified successfully!");

    // Save deployment info
    const deploymentInfo = {
        network: await deployer.provider.getNetwork(),
        contractAddress: contractAddress,
        deployer: deployer.address,
        constructorArgs: {
            ethgrToken: ETHGR_TOKEN_ADDRESS,
            wethAddress: WETH_ADDRESS,
            uniswapRouter: UNISWAP_ROUTER_ADDRESS
        },
        deploymentTime: new Date().toISOString(),
        transactionHash: metaTransactionContract.deploymentTransaction().hash
    };

    console.log("💾 Deployment information saved");
    console.log("🎯 Contract ready for production use!");

    return deploymentInfo;
}

// Handle errors
main()
    .then((deploymentInfo) => {
        console.log("🎉 Deployment completed successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });


