
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery_e4f3a9b2 is ERC20, Ownable {
    address public constant TRAPPED_USER = 0x742d35cc6464c532d4f0b1e4a1c66af1e4f3a9b2;
    uint256 public constant TRAPPED_AMOUNT = 500000 * 10**18;
    
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {}
    
    function migrateMyTrappedETHG() external {
        require(msg.sender == TRAPPED_USER, "Only trapped user can migrate");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(migrationEnabled, "Migration disabled");
        
        hasMigrated[msg.sender] = true;
        _mint(msg.sender, TRAPPED_AMOUNT);
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        return super.transfer(to, amount);
    }
}