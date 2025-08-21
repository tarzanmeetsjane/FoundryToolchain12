const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Fixed ETHGR Recovery Contract...");
  
  // Get the contract factory
  const ETHGRRecovery = await ethers.getContractFactory("ETHGRRecovery");
  
  // Deploy the contract
  console.log("📝 Deploying contract...");
  const ethgrRecovery = await ETHGRRecovery.deploy();
  
  // Wait for deployment
  await ethgrRecovery.waitForDeployment();
  
  const contractAddress = await ethgrRecovery.getAddress();
  console.log("✅ Contract deployed to:", contractAddress);
  
  // Get contract info
  const name = await ethgrRecovery.name();
  const symbol = await ethgrRecovery.symbol();
  const owner = await ethgrRecovery.owner();
  
  console.log("📊 Contract Details:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Owner:", owner);
  
  // Generate the ABI for Etherscan
  const abi = ETHGRRecovery.interface.formatJson();
  
  console.log("\n🔧 Custom ABI for Etherscan:");
  console.log("Copy this ABI and add it to Etherscan for contract:", contractAddress);
  console.log("==========================================");
  console.log(abi);
  console.log("==========================================");
  
  console.log("\n🎯 Next Steps:");
  console.log("1. Copy the ABI above");
  console.log("2. Go to Etherscan contract:", contractAddress);
  console.log("3. Click 'Contract' tab");
  console.log("4. Click 'Verify and Publish'");
  console.log("5. Paste the ABI in the verification process");
  console.log("6. Execute migrateMyTrappedETHG() function");
  
  return contractAddress;
}

main()
  .then((address) => {
    console.log("\n🎉 Deployment completed successfully!");
    console.log("Contract address:", address);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

