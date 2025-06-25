// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Script.sol";
import "../src/AllInOneETHGRecovery.sol";

contract ExecuteRecoveryScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address contractAddress = vm.envAddress("ALLINONE_CONTRACT");
        
        console.log("Executing complete recovery process...");
        console.log("Contract:", contractAddress);
        
        AllInOneETHGRecovery recovery = AllInOneETHGRecovery(payable(contractAddress));
        
        // Check pre-execution status
        (bool verified, bool completed, bool distributed, uint256 ethRecovered, uint256 gasReserved, uint256 balance) = recovery.getRecoveryStatus();
        
        console.log("=== Pre-Execution Status ===");
        console.log("Verified:", verified);
        console.log("Completed:", completed);
        console.log("Distributed:", distributed);
        console.log("ETH Recovered:", ethRecovered);
        console.log("Gas Reserved:", gasReserved);
        console.log("Balance:", balance);
        
        require(verified, "Contract must be verified");
        require(!completed, "Recovery already completed");
        
        // Estimate expected ETH output
        uint256 estimatedETH = recovery.estimateETHOutput(recovery.CONVERSION_AMOUNT());
        uint256 estimatedRelief = recovery.calculateReliefAmount();
        
        console.log("=== Estimates ===");
        console.log("Expected ETH from conversion:", estimatedETH);
        console.log("Expected relief amount:", estimatedRelief);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Execute complete recovery in single transaction
        recovery.executeCompleteRecovery();
        
        vm.stopBroadcast();
        
        // Check post-execution status
        (verified, completed, distributed, ethRecovered, gasReserved, balance) = recovery.getRecoveryStatus();
        
        console.log("=== Post-Execution Status ===");
        console.log("Completed:", completed);
        console.log("Distributed:", distributed);
        console.log("ETH Recovered:", ethRecovered);
        console.log("Gas Reserved:", gasReserved);
        console.log("Contract Balance:", balance);
        
        console.log("=== Recovery Complete ===");
        console.log("ETHGR tokens minted:", recovery.TARGET_ETHGR_MINT());
        console.log("ETHG converted:", recovery.CONVERSION_AMOUNT());
        console.log("ETH recovered:", ethRecovered);
        console.log("Relief funds distributed:", ethRecovered - gasReserved);
        console.log("Gas fees reserved:", gasReserved);
        
        console.log("Foundation can now call payGasFees() to retrieve gas fees");
    }
}