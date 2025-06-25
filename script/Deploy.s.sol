// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {ETHGRecovery} from "../src/ETHGRecovery.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ETHGRecovery ethgr = new ETHGRecovery();
        
        console2.log("ETHGR Contract deployed to:", address(ethgr));
        console2.log("Deployer address:", msg.sender);
        console2.log("Contract owner:", ethgr.owner());
        console2.log("Migration enabled:", ethgr.migrationEnabled());

        vm.stopBroadcast();
    }
}