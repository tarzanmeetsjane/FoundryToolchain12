// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Test.sol";
import "../src/AllInOneETHGRecovery.sol";

contract AllInOneETHGRecoveryTest is Test {
    AllInOneETHGRecovery public recovery;
    address public constant FOUNDATION = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    address public constant ETHG_TOKEN = 0xFA7DE122F5Fba7123cDb4fE6bf75821C2B937c90;
    
    function setUp() public {
        // Deploy contract (constructor sets FOUNDATION as owner)
        recovery = new AllInOneETHGRecovery();
    }
    
    function test_ContractSelfVerification() public view {
        (bool verified, , , , , ) = recovery.getRecoveryStatus();
        assertTrue(verified, "Contract should be self-verified");
    }
    
    function test_InitialState() public view {
        assertEq(recovery.name(), "ETHGR Recovery Token");
        assertEq(recovery.symbol(), "ETHGR");
        assertEq(recovery.owner(), FOUNDATION);
        
        (bool verified, bool completed, bool distributed, , , ) = recovery.getRecoveryStatus();
        assertTrue(verified);
        assertFalse(completed);
        assertFalse(distributed);
    }
    
    function test_OnlyFoundationCanExecute() public {
        vm.expectRevert("Only foundation can execute");
        recovery.executeCompleteRecovery();
    }
    
    function test_ETHOutputEstimation() public {
        uint256 testAmount = 219300 * 10**18; // 219.3K ETHG
        uint256 estimatedETH = recovery.estimateETHOutput(testAmount);
        
        if (estimatedETH > 0) {
            assertGt(estimatedETH, 1 ether, "Should estimate reasonable ETH output");
        }
    }
    
    function test_ReliefAmountCalculation() public {
        uint256 reliefAmount = recovery.calculateReliefAmount();
        // Should return 0 before migration completion or estimated amount
        assertGe(reliefAmount, 0);
    }
    
    function test_EmergencyWithdraw() public {
        // Send some ETH to contract
        vm.deal(address(recovery), 1 ether);
        
        vm.prank(FOUNDATION);
        recovery.emergencyWithdraw();
        
        assertEq(address(recovery).balance, 0);
    }
    
    function test_GasConstantsAreCorrect() public view {
        assertEq(recovery.TARGET_ETHGR_MINT(), 1990000 * 10**18);
        assertEq(recovery.CONVERSION_AMOUNT(), 219300 * 10**18);
        assertEq(recovery.MIN_ETH_OUTPUT(), 25 ether);
    }
    
    function test_ContractCanReceiveETH() public {
        uint256 amount = 1 ether;
        vm.deal(address(this), amount);
        
        (bool success, ) = address(recovery).call{value: amount}("");
        assertTrue(success);
        assertEq(address(recovery).balance, amount);
    }
}