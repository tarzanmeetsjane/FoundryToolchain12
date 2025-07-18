
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../EXACT_DEPLOYED_CONTRACT.sol";

contract DeployOptimismETHGR is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy ETHGR contract with your wallet as owner
        ETHGRecovery ethgr = new ETHGRecovery();
        
        console.log("ETHGR deployed to:", address(ethgr));
        console.log("Owner:", ethgr.owner());
        console.log("Migration enabled:", ethgr.migrationEnabled());
        
        vm.stopBroadcast();
    }
}
