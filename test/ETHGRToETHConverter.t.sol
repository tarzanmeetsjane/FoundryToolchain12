
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/ETHGRToETHConverter.sol";

contract ETHGRToETHConverterTest is Test {
    ETHGRToETHConverter public converter;
    address public foundation = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    address public user = address(0x123);
    
    function setUp() public {
        vm.prank(foundation);
        converter = new ETHGRToETHConverter();
    }
    
    function testInitialSetup() public {
        assertEq(converter.owner(), foundation);
        assertTrue(converter.conversionsEnabled());
        assertEq(converter.conversionFee(), 50); // 0.5%
    }
    
    function testUpdateFee() public {
        vm.prank(foundation);
        converter.updateConversionFee(100); // 1%
        assertEq(converter.conversionFee(), 100);
    }
    
    function testToggleConversions() public {
        vm.prank(foundation);
        converter.toggleConversions();
        assertFalse(converter.conversionsEnabled());
        
        vm.prank(foundation);
        converter.toggleConversions();
        assertTrue(converter.conversionsEnabled());
    }
    
    function testOnlyFoundationAccess() public {
        vm.prank(user);
        vm.expectRevert("Only foundation can execute");
        converter.updateConversionFee(100);
        
        vm.prank(user);
        vm.expectRevert("Only foundation can execute");
        converter.toggleConversions();
    }
}
