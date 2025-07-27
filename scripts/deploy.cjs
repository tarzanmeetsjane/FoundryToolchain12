const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying ETHGRecoverySimple contract...");

  const ETHGRecoverySimple = await hre.ethers.getContractFactory("ETHGRecoverySimple");
  const contract = await ETHGRecoverySimple.deploy();

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  
  console.log("✅ Contract deployed successfully!");
  console.log("📍 Contract address:", contractAddress);
  console.log("🌟 Ready for verification and $653,000 portfolio display!");

  // Save deployment info
  const fs = require('fs');
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: hre.network.name,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync('deployment-result.json', JSON.stringify(deploymentInfo, null, 2));

  return contractAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });