// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {ETHGRBase} from "../src/ETHGRBase.sol";

contract DeployETHGRBase is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        // Base network addresses
        address foundationTreasury = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
        address victimAssistanceFund = deployer; // Temporary, should be multisig
        address developmentFund = deployer; // Temporary, should be multisig
        address uniswapRouter = 0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24; // Base Uniswap V3 Router
        
        vm.startBroadcast(deployerPrivateKey);
        
        ETHGRBase token = new ETHGRBase(
            foundationTreasury,
            victimAssistanceFund,
            developmentFund,
            uniswapRouter
        );
        
        vm.stopBroadcast();
        
        console.log("ETHGRBase deployed to:", address(token));
        console.log("Foundation Treasury:", foundationTreasury);
        console.log("Victim Assistance Fund:", victimAssistanceFund);
        console.log("Development Fund:", developmentFund);
        console.log("Initial supply:", token.totalSupply());
    }
}