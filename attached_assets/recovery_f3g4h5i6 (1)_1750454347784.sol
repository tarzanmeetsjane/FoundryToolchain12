
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery_f3g4h5i6 is ERC20, Ownable {
    address public constant TRAPPED_USER = 0x8c54b2b1c8c9f0a3d2e7f1a4b5c8d9e2f3g4h5i6;
    uint256 public constant TRAPPED_AMOUNT = 250000 * 10**18;
    
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