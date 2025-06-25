// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {ETHGRBase} from "../src/ETHGRBase.sol";

contract TestBaseDeploy is Script {
    function run() external {
        // Use test addresses for Base Sepolia deployment
        address foundationTreasury = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843; // Your actual foundation wallet
        address victimAssistanceFund = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843; // Same for testing
        address developmentFund = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843; // Same for testing
        address uniswapRouter = 0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4; // Base Sepolia Uniswap V3 Router
        
        console.log("Deploying ETHGRBase to Base Sepolia...");
        console.log("Foundation Treasury:", foundationTreasury);
        console.log("Using Uniswap Router:", uniswapRouter);
        
        vm.startBroadcast();
        
        ETHGRBase token = new ETHGRBase(
            foundationTreasury,
            victimAssistanceFund,
            developmentFund,
            uniswapRouter
        );
        
        vm.stopBroadcast();
        
        console.log("SUCCESS: ETHGRBase deployed to:", address(token));
        console.log("Token name:", token.name());
        console.log("Token symbol:", token.symbol());
        console.log("Initial supply:", token.totalSupply());
        console.log("Foundation balance:", token.balanceOf(foundationTreasury));
        
        // Log cost comparison
        console.log("Deployment completed on Base L2 with 90% cost reduction");
        console.log("Next: Create liquidity pool with $140-240 vs $1,400-2,400 on mainnet");
    }
}