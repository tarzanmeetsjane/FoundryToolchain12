// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

/**
 * @title UNI Recovery Contract
 * @dev Final extraction contract for UNI tokens from contract wallet
 * @dev Target wallet: 0xc46eB37677360EfDc011F4097621F15b792fa630
 * @dev Owner wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract UNIRecoveryExtraction {
    address public constant OWNER = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    address public constant UNI_TOKEN = 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984;
    address public constant SOURCE_WALLET = 0xc46eB37677360EfDc011F4097621F15b792fa630;
    
    IERC20 public constant UNI = IERC20(UNI_TOKEN);
    
    modifier onlyOwner() {
        require(msg.sender == OWNER, "Only owner can execute");
        _;
    }
    
    /**
     * @dev Check UNI balance in source wallet
     */
    function checkUNIBalance() external view returns (uint256) {
        return UNI.balanceOf(SOURCE_WALLET);
    }
    
    /**
     * @dev Recover specific amount of UNI tokens
     */
    function recoverUNI(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(UNI.transferFrom(SOURCE_WALLET, OWNER, amount), "Transfer failed");
        
        emit UNIRecovered(SOURCE_WALLET, OWNER, amount);
    }
    
    /**
     * @dev Recover all UNI tokens from source wallet
     */
    function recoverAllUNI() external onlyOwner {
        uint256 balance = UNI.balanceOf(SOURCE_WALLET);
        require(balance > 0, "No UNI tokens to recover");
        require(UNI.transferFrom(SOURCE_WALLET, OWNER, balance), "Transfer failed");
        
        emit UNIRecovered(SOURCE_WALLET, OWNER, balance);
    }
    
    /**
     * @dev Emergency function to recover any UNI held by this contract
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = UNI.balanceOf(address(this));
        require(balance > 0, "No UNI in contract");
        require(UNI.transfer(OWNER, balance), "Emergency withdrawal failed");
        
        emit EmergencyWithdrawal(OWNER, balance);
    }
    
    /**
     * @dev Recover ETH from source wallet (if any)
     */
    function recoverETH() external onlyOwner {
        uint256 balance = SOURCE_WALLET.balance;
        require(balance > 0, "No ETH to recover");
        
        (bool success, ) = OWNER.call{value: balance}("");
        require(success, "ETH transfer failed");
        
        emit ETHRecovered(SOURCE_WALLET, OWNER, balance);
    }
    
    /**
     * @dev Get comprehensive wallet status
     */
    function getWalletStatus() external view returns (
        uint256 uniBalance,
        uint256 ethBalance,
        uint256 allowance
    ) {
        uniBalance = UNI.balanceOf(SOURCE_WALLET);
        ethBalance = SOURCE_WALLET.balance;
        allowance = UNI.allowance(SOURCE_WALLET, address(this));
    }
    
    // Events
    event UNIRecovered(address indexed from, address indexed to, uint256 amount);
    event ETHRecovered(address indexed from, address indexed to, uint256 amount);
    event EmergencyWithdrawal(address indexed to, uint256 amount);
}