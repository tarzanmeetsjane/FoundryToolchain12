
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/BootstrapLiquidityETHGR.sol";

contract DeployBootstrapLiquidity is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        BootstrapLiquidityETHGR bootstrap = new BootstrapLiquidityETHGR();
        
        console.log("Bootstrap Liquidity Contract deployed to:", address(bootstrap));
        console.log("Foundation wallet:", bootstrap.FOUNDATION_WALLET());
        console.log("ETHGR token:", bootstrap.ETHGR_TOKEN());
        
        vm.stopBroadcast();
    }
}
