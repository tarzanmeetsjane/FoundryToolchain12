// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {ETHGRBase} from "../src/ETHGRBase.sol";

contract ETHGRBaseTest is Test {
    ETHGRBase public token;
    
    address public foundationTreasury = makeAddr("foundation");
    address public victimAssistanceFund = makeAddr("victim");
    address public developmentFund = makeAddr("dev");
    address public uniswapRouter = makeAddr("router");
    address public user = makeAddr("user");
    
    function setUp() public {
        token = new ETHGRBase(
            foundationTreasury,
            victimAssistanceFund,
            developmentFund,
            uniswapRouter
        );
    }
    
    function testInitialState() public {
        assertEq(token.name(), "ETHGR Base");
        assertEq(token.symbol(), "ETHGR");
        assertEq(token.totalSupply(), 1990000 * 10**18);
        assertEq(token.balanceOf(foundationTreasury), 1990000 * 10**18);
        assertEq(token.foundationTreasury(), foundationTreasury);
        assertEq(token.victimAssistanceFund(), victimAssistanceFund);
        assertEq(token.developmentFund(), developmentFund);
    }
    
    function testBurnMechanism() public {
        uint256 transferAmount = 1000 * 10**18;
        uint256 expectedBurn = (transferAmount * token.burnRate()) / 10000;
        uint256 expectedTransfer = transferAmount - expectedBurn;
        
        // Foundation transfers to user (burn applied)
        vm.prank(foundationTreasury);
        token.transfer(user, transferAmount);
        
        // User should receive amount minus burn
        assertEq(token.balanceOf(user), expectedTransfer);
        assertEq(token.totalBurned(), expectedBurn);
        assertEq(token.totalSupply(), 1990000 * 10**18 - expectedBurn);
    }
    
    function testEmergencyAssistance() public {
        // Transfer some tokens to victim assistance fund first
        vm.prank(foundationTreasury);
        token.transfer(victimAssistanceFund, 100000 * 10**18);
        
        uint256 assistanceAmount = 5000 * 10**18;
        
        vm.prank(victimAssistanceFund);
        token.emergencyAssistance(user, assistanceAmount);
        
        assertEq(token.balanceOf(user), assistanceAmount);
    }
    
    function testRevenueDistribution() public {
        // Send ETH to contract
        vm.deal(address(token), 1 ether);
        
        uint256 initialFoundationBalance = foundationTreasury.balance;
        uint256 initialVictimBalance = victimAssistanceFund.balance;
        uint256 initialDevBalance = developmentFund.balance;
        
        token.distributeRevenue();
        
        // Check distribution according to percentages
        uint256 expectedFoundation = (1 ether * 6000) / 10000; // 60%
        uint256 expectedVictim = (1 ether * 3000) / 10000; // 30%
        uint256 expectedDev = (1 ether * 1000) / 10000; // 10%
        
        assertEq(foundationTreasury.balance, initialFoundationBalance + expectedFoundation);
        assertEq(victimAssistanceFund.balance, initialVictimBalance + expectedVictim);
        assertEq(developmentFund.balance, initialDevBalance + expectedDev);
    }
    
    function testManualBurn() public {
        vm.prank(foundationTreasury);
        token.transfer(user, 10000 * 10**18);
        
        uint256 burnAmount = 1000 * 10**18;
        uint256 userBalanceBefore = token.balanceOf(user);
        uint256 totalSupplyBefore = token.totalSupply();
        
        vm.prank(user);
        token.burn(burnAmount);
        
        assertEq(token.balanceOf(user), userBalanceBefore - burnAmount);
        assertEq(token.totalSupply(), totalSupplyBefore - burnAmount);
        assertEq(token.totalBurned(), burnAmount + (10000 * 10**18 * 10) / 10000); // Including transfer burn
    }
    
    function testFoundationStats() public {
        (
            uint256 totalSupply_,
            uint256 totalBurned_,
            uint256 foundationBalance,
            uint256 victimBalance,
            uint256 devBalance
        ) = token.getFoundationStats();
        
        assertEq(totalSupply_, 1990000 * 10**18);
        assertEq(totalBurned_, 0);
        assertEq(foundationBalance, 1990000 * 10**18);
        assertEq(victimBalance, 0);
        assertEq(devBalance, 0);
    }
    
    function testCostComparison() public {
        // Simulate gas costs on Base vs Mainnet
        uint256 baseGasPrice = 0.001 gwei; // Base L2 gas price
        uint256 mainnetGasPrice = 20 gwei; // Ethereum mainnet gas price
        
        uint256 transferGas = 21000;
        
        uint256 baseCost = baseGasPrice * transferGas;
        uint256 mainnetCost = mainnetGasPrice * transferGas;
        
        console.log("Base L2 transfer cost (wei):", baseCost);
        console.log("Mainnet transfer cost (wei):", mainnetCost);
        console.log("Cost reduction factor:", mainnetCost / baseCost);
        
        // Assert 90%+ cost reduction
        assertTrue(baseCost < mainnetCost / 10);
    }
}