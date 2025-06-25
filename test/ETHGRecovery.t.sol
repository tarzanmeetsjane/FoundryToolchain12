// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {ETHGRecovery} from "../src/ETHGRecovery.sol";

contract ETHGRecoveryTest is Test {
    ETHGRecovery public ethgr;
    address public foundation = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    address public user = address(0x1);

    function setUp() public {
        vm.prank(foundation);
        ethgr = new ETHGRecovery();
    }

    function test_FoundationMigration() public {
        vm.prank(foundation);
        ethgr.migrateMyTrappedETHG();
        
        assertEq(ethgr.balanceOf(foundation), 1990000 * 10**18);
        assertEq(ethgr.totalSupply(), 1990000 * 10**18);
        assertTrue(ethgr.hasMigrated(foundation));
    }

    function test_CannotMigrateTwice() public {
        vm.startPrank(foundation);
        ethgr.migrateMyTrappedETHG();
        
        vm.expectRevert("Already migrated");
        ethgr.migrateMyTrappedETHG();
        vm.stopPrank();
    }

    function test_OnlyFoundationCanMigrate() public {
        vm.prank(user);
        vm.expectRevert("Only foundation");
        ethgr.migrateMyTrappedETHG();
    }

    function test_TransferFunctionality() public {
        vm.prank(foundation);
        ethgr.migrateMyTrappedETHG();
        
        uint256 transferAmount = 1000 * 10**18;
        
        vm.prank(foundation);
        ethgr.transfer(user, transferAmount);
        
        assertEq(ethgr.balanceOf(user), transferAmount);
        assertEq(ethgr.balanceOf(foundation), (1990000 * 10**18) - transferAmount);
    }

    function test_EmergencyMint() public {
        vm.prank(foundation);
        ethgr.emergencyMint(user, 1000 * 10**18);
        
        assertEq(ethgr.balanceOf(user), 1000 * 10**18);
    }

    function test_ToggleMigration() public {
        vm.prank(foundation);
        ethgr.toggleMigration();
        
        assertFalse(ethgr.migrationEnabled());
        
        vm.prank(foundation);
        vm.expectRevert("Migration disabled");
        ethgr.migrateMyTrappedETHG();
    }
}