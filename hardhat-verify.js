const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  
  console.log("Verifying contract at:", contractAddress);
  
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });