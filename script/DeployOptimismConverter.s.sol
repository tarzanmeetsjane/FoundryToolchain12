
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/ETHGRToETHConverter.sol";

contract DeployOptimismConverter is Script {
    function run() external {
        // Use environment variable for private key
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying ETHGR to ETH Converter on Optimism...");
        console.log("Deployer:", deployer);
        console.log("Balance:", deployer.balance / 1e18, "ETH");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy the converter contract
        ETHGRToETHConverter converter = new ETHGRToETHConverter();
        
        console.log("=== DEPLOYMENT SUCCESS ===");
        console.log("ETHGRToETHConverter deployed to:", address(converter));
        console.log("Owner:", converter.owner());
        console.log("Foundation wallet:", converter.FOUNDATION_WALLET());
        console.log("ETHGR token address:", converter.ETHGR_TOKEN());
        console.log("Uniswap router:", converter.UNISWAP_ROUTER());
        console.log("Conversions enabled:", converter.conversionsEnabled());
        console.log("Conversion fee:", converter.conversionFee(), "basis points (0.5%)");
        
        vm.stopBroadcast();
        
        console.log("=== NEXT STEPS ===");
        console.log("1. Add Optimism network to BitGet Wallet");
        console.log("2. Import ETHGR tokens using contract address");
        console.log("3. Use converter to swap ETHGR -> ETH directly");
        console.log("4. Lower fees, faster transactions than Ethereum mainnet!");
    }
}
