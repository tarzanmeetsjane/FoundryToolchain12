import { readFileSync } from 'fs';

interface VerificationRequest {
  contractAddress: string;
  sourceCode: string;
  contractName: string;
  compilerVersion: string;
  optimizationUsed: boolean;
  runs: number;
  constructorArguments?: string;
  libraryName?: string;
  libraryAddress?: string;
}

export class EtherscanVerification {
  private apiKey: string;
  private baseUrl: string = 'https://api.etherscan.io/api';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async verifyContract(request: VerificationRequest): Promise<any> {
    const formData = new URLSearchParams({
      apikey: this.apiKey,
      module: 'contract',
      action: 'verifysourcecode',
      contractaddress: request.contractAddress,
      sourceCode: request.sourceCode,
      codeformat: 'solidity-single-file',
      contractname: request.contractName,
      compilerversion: request.compilerVersion,
      optimizationUsed: request.optimizationUsed ? '1' : '0',
      runs: request.runs.toString(),
      ...(request.constructorArguments && { constructorArguements: request.constructorArguments }),
      ...(request.libraryName && request.libraryAddress && {
        libraryname1: request.libraryName,
        libraryaddress1: request.libraryAddress
      })
    });

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(`Verification failed: ${error}`);
    }
  }

  async checkVerificationStatus(guid: string): Promise<any> {
    const url = `${this.baseUrl}?module=contract&action=checkverifystatus&guid=${guid}&apikey=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(`Status check failed: ${error}`);
    }
  }

  static prepareETHGRContract(): VerificationRequest {
    // Read the fixed contract source code
    const sourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHGRecovery
 * @dev Fixed contract with proper Solidity syntax for price service recognition
 * @notice This contract replaces the invalid syntax that caused $0.00 display issue
 */
contract ETHGRecovery is ERC20, Ownable {
    
    // Total supply: 1,990,000 tokens
    uint256 private constant TOTAL_SUPPLY = 1_990_000 * 10**18;
    
    /**
     * @dev Constructor that mints initial supply to deployer
     * @notice Fixed syntax enables proper metadata parsing by price services
     */
    constructor() ERC20("ETHG Recovery", "ETHGR") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
    
    /**
     * @dev Allows owner to mint additional tokens if needed
     * @param to Address to receive the minted tokens
     * @param amount Amount of tokens to mint (in wei)
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Emergency recovery function for trapped tokens
     * @param tokenAddress Address of the token contract to recover
     * @param amount Amount of tokens to recover
     */
    function recoverERC20(address tokenAddress, uint256 amount) public onlyOwner {
        IERC20(tokenAddress).transfer(owner(), amount);
    }
    
    /**
     * @dev Recovery function for trapped ETH
     */
    function recoverETH() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    /**
     * @dev Returns contract version for verification
     */
    function version() public pure returns (string memory) {
        return "1.0.0-fixed";
    }
    
    /**
     * @dev Override to prevent renouncing ownership accidentally
     */
    function renounceOwnership() public view override onlyOwner {
        revert("Ownership cannot be renounced for security");
    }
}`;

    return {
      contractAddress: '0xfA7b8c5585E8C4244899d2aE45Ae3e5df9a2abF247',
      sourceCode: sourceCode,
      contractName: 'ETHGRecovery',
      compilerVersion: 'v0.8.19+commit.7dd6d404',
      optimizationUsed: false,
      runs: 200
    };
  }
}

// Verification workflow for ETHGR contract
export async function verifyETHGRContract(apiKey: string): Promise<string> {
  const verifier = new EtherscanVerification(apiKey);
  const request = EtherscanVerification.prepareETHGRContract();
  
  try {
    console.log('Starting ETHGR contract verification...');
    const verificationResponse = await verifier.verifyContract(request);
    
    if (verificationResponse.status === '1') {
      const guid = verificationResponse.result;
      console.log(`Verification submitted successfully. GUID: ${guid}`);
      
      // Poll for verification status
      let attempts = 0;
      const maxAttempts = 30; // 5 minutes with 10-second intervals
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
        
        const statusResponse = await verifier.checkVerificationStatus(guid);
        console.log(`Verification status: ${statusResponse.result}`);
        
        if (statusResponse.result === 'Pass - Verified') {
          return 'Contract successfully verified on Etherscan';
        } else if (statusResponse.result.includes('Fail')) {
          throw new Error(`Verification failed: ${statusResponse.result}`);
        }
        
        attempts++;
      }
      
      throw new Error('Verification timeout - check Etherscan manually');
    } else {
      throw new Error(`Verification submission failed: ${verificationResponse.result}`);
    }
  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
}