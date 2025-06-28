// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (Optimism)
 * @dev ERC20 Token for victim assistance and fund recovery on Optimism L2
 */
contract ETHGRecovery is ERC20, Ownable {
    bool public mintingEnabled = true;
    
    event MintingDisabled();
    
    constructor(string memory baseURI) ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Initial mint to contract deployer
        _mint(msg.sender, 1990000 * 10**decimals());
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(mintingEnabled, "Minting is disabled");
        _mint(to, amount);
    }
    
    function disableMinting() public onlyOwner {
        mintingEnabled = false;
        emit MintingDisabled();
    }
}