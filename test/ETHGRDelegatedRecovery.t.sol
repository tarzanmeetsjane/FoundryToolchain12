// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/ETHGRDelegatedRecovery.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockETHGR is ERC20 {
    constructor() ERC20("ETHGR", "ETHGR") {
        _mint(msg.sender, 1990000 * 10**18);
    }
}

contract ETHGRDelegatedRecoveryTest is Test {
    ETHGRDelegatedRecovery public recovery;
    MockETHGR public ethgr;
    
    address public owner = makeAddr("owner");
    address public beneficiary = makeAddr("beneficiary");
    uint256 public ownerPrivateKey = 0xA11CE;
    
    function setUp() public {
        vm.startPrank(owner);
        ethgr = new MockETHGR();
        recovery = new ETHGRDelegatedRecovery(address(ethgr), owner);
        
        // Transfer tokens to recovery contract
        ethgr.transfer(address(recovery), 100000 * 10**18);
        vm.stopPrank();
    }
    
    function testDelegatedRecovery() public {
        uint256 amount = 1000 * 10**18;
        uint256 deadline = block.timestamp + 1 hours;
        uint256 nonce = recovery.getNonce(beneficiary);
        
        // Create delegation signature
        bytes32 structHash = keccak256(
            abi.encode(
                recovery.DELEGATION_TYPEHASH(),
                beneficiary,
                amount,
                nonce,
                deadline
            )
        );
        
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                recovery.getDomainSeparator(),
                structHash
            )
        );
        
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, digest);
        
        // Set owner private key
        vm.prank(owner);
        
        // Execute delegated recovery
        recovery.executeRecoveryWithDelegation(
            beneficiary,
            amount,
            deadline,
            v,
            r,
            s
        );
        
        assertEq(ethgr.balanceOf(beneficiary), amount);
    }
    
    function testDirectRecovery() public {
        uint256 amount = 500 * 10**18;
        
        vm.prank(owner);
        recovery.executeRecovery(beneficiary, amount);
        
        assertEq(ethgr.balanceOf(beneficiary), amount);
    }
    
    function testSignatureDelegation() public {
        // Test Foundry's signDelegation cheatcode
        address delegatee = makeAddr("delegatee");
        uint256 amount = 2000 * 10**18;
        uint256 deadline = block.timestamp + 2 hours;
        
        // Use Foundry's signDelegation for EIP-712 signature creation
        bytes memory signature = vm.signDelegation(
            ownerPrivateKey,
            address(recovery),
            abi.encode(beneficiary, amount, deadline)
        );
        
        (uint8 v, bytes32 r, bytes32 s) = abi.decode(signature, (uint8, bytes32, bytes32));
        
        // Execute with delegation signature
        recovery.executeRecoveryWithDelegation(
            beneficiary,
            amount,
            deadline,
            v,
            r,
            s
        );
        
        assertEq(ethgr.balanceOf(beneficiary), amount);
    }
}