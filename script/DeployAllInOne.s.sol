// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Script.sol";
import "../src/AllInOneETHGRecovery.sol";

contract DeployAllInOneScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying AllInOneETHGRecovery contract...");
        console.log("Deployer:", deployer);
        console.log("Foundation:", AllInOneETHGRecovery(address(0)).FOUNDATION_WALLET());
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy the all-in-one recovery contract
        AllInOneETHGRecovery recovery = new AllInOneETHGRecovery();
        
        vm.stopBroadcast();
        
        console.log("AllInOneETHGRecovery deployed at:", address(recovery));
        console.log("Contract verified:", recovery.contractVerified());
        
        // Log contract status
        (bool verified, bool completed, bool distributed, uint256 ethRecovered, uint256 gasReserved, uint256 balance) = recovery.getRecoveryStatus();
        
        console.log("=== Contract Status ===");
        console.log("Verified:", verified);
        console.log("Migration Completed:", completed);
        console.log("Funds Distributed:", distributed);
        console.log("ETH Recovered:", ethRecovered);
        console.log("Gas Reserved:", gasReserved);
        console.log("Contract Balance:", balance);
        
        console.log("=== Next Steps ===");
        console.log("1. Execute complete recovery:");
        console.log("   recovery.executeCompleteRecovery()");
        console.log("2. Pay gas fees:");
        console.log("   recovery.payGasFees()");
        console.log("3. Emergency withdraw if needed:");
        console.log("   recovery.emergencyWithdraw()");
    }
}