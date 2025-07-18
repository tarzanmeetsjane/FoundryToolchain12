
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/ETHGRToETHConverter.sol";

contract DeployConverter is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy the converter contract
        ETHGRToETHConverter converter = new ETHGRToETHConverter();
        
        console.log("ETHGRToETHConverter deployed to:", address(converter));
        console.log("Owner:", converter.owner());
        console.log("Conversions enabled:", converter.conversionsEnabled());
        console.log("Conversion fee:", converter.conversionFee(), "basis points");
        
        vm.stopBroadcast();
    }
}
