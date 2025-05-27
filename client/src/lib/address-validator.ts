// Advanced cryptocurrency address validation system
export class AddressValidator {
  // Ethereum wallet address validation
  static validateEthereumAddress(address: string): boolean {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
  }

  // Bitcoin wallet address validation
  static validateBitcoinAddress(address: string): boolean {
    const regex = /^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/;
    return regex.test(address);
  }

  // Transaction hash validation
  static validateTransactionHash(hash: string): boolean {
    const regex = /^0x[a-fA-F0-9]{64}$/;
    return regex.test(hash);
  }

  // Token contract address validation
  static validateTokenContract(address: string): boolean {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
  }

  // Liquidity pool address validation
  static validatePoolAddress(address: string): boolean {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    if (!regex.test(address)) return false;
    
    // Additional checks for known pool patterns
    const knownPoolPrefixes = ['0x88', '0x8a', '0xa4', '0xc0', '0xd0'];
    return knownPoolPrefixes.some(prefix => address.toLowerCase().startsWith(prefix));
  }

  // Validate crypto amount format
  static validateCryptoAmount(amount: string): boolean {
    const regex = /^\d+(\.\d{1,18})?$/;
    return regex.test(amount) && parseFloat(amount) > 0;
  }

  // Validate blockchain explorer URLs
  static validateExplorerUrl(url: string): boolean {
    const regex = /https?:\/\/(www\.)?(etherscan|bscscan|polygonscan)\.com\/tx\/[a-fA-F0-9]{64}/;
    return regex.test(url);
  }

  // Comprehensive address validation for any supported chain
  static validateAddress(address: string, chainId: number): {
    isValid: boolean;
    type: string;
    confidence: number;
    warnings: string[];
  } {
    const warnings: string[] = [];
    let confidence = 0;
    let type = 'unknown';

    // Basic format check
    if (!this.validateEthereumAddress(address)) {
      return {
        isValid: false,
        type: 'invalid',
        confidence: 0,
        warnings: ['Invalid address format']
      };
    }

    // Determine address type and confidence
    if (this.validatePoolAddress(address)) {
      type = 'pool';
      confidence = 90;
    } else if (this.validateTokenContract(address)) {
      type = 'token';
      confidence = 80;
    } else {
      type = 'wallet';
      confidence = 70;
    }

    // Chain-specific validations
    switch (chainId) {
      case 1: // Ethereum
        if (address.toLowerCase() === '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640') {
          type = 'verified_pool';
          confidence = 100;
        }
        break;
      case 56: // BSC
        if (address.toLowerCase().startsWith('0x')) {
          confidence += 5;
        }
        break;
      case 137: // Polygon
        if (address.toLowerCase().startsWith('0x')) {
          confidence += 5;
        }
        break;
    }

    // Add warnings for potential issues
    if (address.toLowerCase() === address) {
      warnings.push('Address is all lowercase - verify checksum');
    }

    if (confidence < 80) {
      warnings.push('Address format appears unusual - double-check source');
    }

    return {
      isValid: true,
      type,
      confidence,
      warnings
    };
  }

  // Check if address matches known DeFi protocols
  static identifyProtocol(address: string): string {
    const protocols: Record<string, string> = {
      '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640': 'Uniswap V3 ETH/USDC',
      '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8': 'Uniswap V3 ETH/USDC 0.3%',
      '0xa43fe16908251ee70ef74718545e4fe6c5ccec9f': 'SushiSwap ETH/USDC',
      '0x397ff1542f962076d0bfe58ea045ffa2d347aca0': 'PancakeSwap ETH/USDC'
    };

    return protocols[address.toLowerCase()] || 'Unknown Protocol';
  }

  // Detect potential arbitrage opportunities between addresses
  static detectArbitragePattern(addresses: string[]): boolean {
    // Look for patterns that suggest arbitrage activity
    const uniqueProtocols = new Set(addresses.map(addr => this.identifyProtocol(addr)));
    return uniqueProtocols.size > 1; // Multiple protocols = potential arbitrage
  }
}

export default AddressValidator;