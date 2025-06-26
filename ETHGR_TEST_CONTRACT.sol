// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "remix_tests.sol";
import "../contracts/ETHGRecovery.sol";

contract ETHGRecoveryTest {
    ETHGRecovery ethgrToken;
    address testOwner = address(this);
    
    function beforeAll() public {
        ethgrToken = new ETHGRecovery();
    }
    
    function testTokenInitialValues() public {
        Assert.equal(ethgrToken.name(), "ETHG Recovery", "token name did not match");
        Assert.equal(ethgrToken.symbol(), "ETHGR", "token symbol did not match");
        Assert.equal(ethgrToken.decimals(), 18, "token decimals did not match");
        Assert.equal(ethgrToken.totalSupply(), 1990000 * 10**18, "token supply should be 1,990,000");
    }
    
    function testOwnershipInitialization() public {
        Assert.equal(ethgrToken.owner(), testOwner, "owner should be the deployer");
        Assert.equal(ethgrToken.mintingEnabled(), true, "minting should be enabled initially");
    }
    
    function testInitialBalance() public {
        uint256 expectedBalance = 1990000 * 10**18;
        Assert.equal(ethgrToken.balanceOf(testOwner), expectedBalance, "deployer should have initial supply");
    }
    
    function testBasicTransfer() public {
        address recipient = address(0x123);
        uint256 transferAmount = 1000 * 10**18;
        
        // Transfer tokens
        ethgrToken.transfer(recipient, transferAmount);
        
        Assert.equal(ethgrToken.balanceOf(recipient), transferAmount, "recipient should receive tokens");
        Assert.equal(ethgrToken.balanceOf(testOwner), (1990000 * 10**18) - transferAmount, "sender balance should decrease");
    }
    
    function testMinting() public {
        address recipient = address(0x456);
        uint256 mintAmount = 500 * 10**18;
        uint256 initialSupply = ethgrToken.totalSupply();
        
        // Mint new tokens
        ethgrToken.mint(recipient, mintAmount);
        
        Assert.equal(ethgrToken.balanceOf(recipient), mintAmount, "recipient should receive minted tokens");
        Assert.equal(ethgrToken.totalSupply(), initialSupply + mintAmount, "total supply should increase");
    }
    
    function testMintingDisable() public {
        // Disable minting
        ethgrToken.disableMinting();
        Assert.equal(ethgrToken.mintingEnabled(), false, "minting should be disabled");
        
        // Try to mint (should fail)
        try ethgrToken.mint(address(0x789), 100 * 10**18) {
            Assert.ok(false, "minting should have failed");
        } catch Error(string memory reason) {
            Assert.equal(reason, "Minting is disabled", "should fail with correct reason");
        }
    }
}