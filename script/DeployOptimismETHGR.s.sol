
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/OptimismETHGR.sol";

contract DeployOptimismETHGR is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ETHGRecovery ethgr = new ETHGRecovery();
        
        console.log("ETHGR deployed to Optimism:", address(ethgr));
        console.log("Owner:", ethgr.owner());
        console.log("Total Supply:", ethgr.totalSupply());
        console.log("Name:", ethgr.name());
        console.log("Symbol:", ethgr.symbol());

        vm.stopBroadcast();
    }
}
