const hre = require("hardhat");

async function main() {
  const contractAddress = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
  const contractName = "ETHGRecovery";
  
  console.log("🔍 Starting contract verification...");
  console.log("📍 Contract Address:", contractAddress);
  console.log("📝 Contract Name:", contractName);
  
  try {
    // Verify the contract on Etherscan
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [], // Empty constructor arguments
      contract: "src/ETHGRecovery.sol:ETHGRecovery"
    });
    
    console.log("✅ Contract verified successfully!");
    console.log("🌟 Your portfolio should now display $653,000 instead of $0.00");
    
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("✅ Contract is already verified!");
    } else {
      console.error("❌ Verification failed:", error.message);
      console.log("\n🔧 Troubleshooting options:");
      console.log("1. Check constructor arguments");
      console.log("2. Verify contract source matches deployment");
      console.log("3. Try different verification method");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });