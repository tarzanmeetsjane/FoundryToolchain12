// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {ETHGRecovery} from "../src/ETHGRecovery.sol";

contract MigrateScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address contractAddress = vm.envAddress("ETHGR_CONTRACT");
        
        vm.startBroadcast(deployerPrivateKey);

        ETHGRecovery ethgr = ETHGRecovery(contractAddress);
        
        console2.log("Executing migration for foundation wallet...");
        console2.log("Contract address:", address(ethgr));
        console2.log("Foundation wallet:", msg.sender);
        
        // Execute the migration
        ethgr.migrateMyTrappedETHG();
        
        console2.log("Migration completed!");
        console2.log("New ETHGR balance:", ethgr.balanceOf(msg.sender));
        console2.log("Total supply:", ethgr.totalSupply());

        vm.stopBroadcast();
    }
}