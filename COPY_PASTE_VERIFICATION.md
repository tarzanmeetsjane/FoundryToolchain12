# Copy-Paste Etherscan Verification Details

## Contract Address
```
0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
```

## Contract Source Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        _mint(msg.sender, 1990000 * 10**18);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        return super.transferFrom(from, to, amount);
    }
}
```

## Verification Settings

**Compiler Type:** Solidity (Single File)  
**Compiler Version:** v0.8.19+commit.7dd6d404  
**License Type:** MIT License (3)  
**Optimization:** No  
**Runs:** 200  
**Constructor Arguments:** Leave empty  

## Step-by-Step Instructions

1. Go to: https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
2. Click "Contract" tab
3. Click "Verify and Publish"
4. Select "Via Solidity (Single File)"
5. Paste contract address: `0xfA7b8c553C48C56ec7027d26ae95b029a2abF247`
6. Select compiler: `v0.8.19+commit.7dd6d404`
7. Copy and paste the contract source code above
8. Set License to "MIT License (3)"
9. Leave constructor arguments empty
10. Click "Verify and Publish"

This should resolve the $0.00 display issue and restore proper market pricing.