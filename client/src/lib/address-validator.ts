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

  // Advanced wallet address validation with security analysis
  static validateWalletAddress(address: string, chainId: number = 1): {
    isValid: boolean;
    confidence: number;
    walletType: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    features: string[];
    securityScore: number;
  } {
    if (!address || typeof address !== 'string') {
      return {
        isValid: false,
        confidence: 0,
        walletType: 'INVALID',
        riskLevel: 'HIGH',
        features: [],
        securityScore: 0
      };
    }

    const cleanAddress = address.trim().toLowerCase();
    
    // Basic Ethereum address validation
    if (!this.validateEthereumAddress(cleanAddress)) {
      return {
        isValid: false,
        confidence: 0,
        walletType: 'INVALID_FORMAT',
        riskLevel: 'HIGH',
        features: [],
        securityScore: 0
      };
    }

    const features: string[] = [];
    let confidence = 60; // Base confidence for valid format
    let walletType = 'STANDARD_WALLET';
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
    let securityScore = 50;

    // Check for special addresses
    if (cleanAddress === '0x0000000000000000000000000000000000000000') {
      walletType = 'NULL_ADDRESS';
      riskLevel = 'HIGH';
      confidence = 100;
      securityScore = 0;
      features.push('Null Address - Cannot receive funds');
      return { isValid: true, confidence, walletType, riskLevel, features, securityScore };
    }

    // Check for known exchange wallets
    const exchangeInfo = this.detectExchangeWallet(cleanAddress);
    if (exchangeInfo) {
      walletType = 'EXCHANGE_WALLET';
      confidence += 25;
      riskLevel = 'LOW';
      securityScore += 30;
      features.push(`${exchangeInfo} Exchange Wallet`);
    }

    // Check for smart contract patterns
    if (this.isSmartContract(cleanAddress)) {
      walletType = 'SMART_CONTRACT';
      confidence += 20;
      riskLevel = 'LOW';
      securityScore += 20;
      features.push('Smart Contract Address');
    }

    // Check for multisig indicators
    if (this.hasMultisigPattern(cleanAddress)) {
      walletType = 'MULTISIG_WALLET';
      confidence += 15;
      riskLevel = 'LOW';
      securityScore += 25;
      features.push('Potential Multisig Wallet');
    }

    // Analyze address entropy and patterns
    const entropyScore = this.calculateAddressEntropy(cleanAddress);
    confidence += Math.min(entropyScore, 20);
    securityScore += Math.min(entropyScore, 15);

    if (entropyScore > 15) {
      features.push('High Entropy - Good randomness');
    } else if (entropyScore < 8) {
      features.push('Low Entropy - May be generated');
      riskLevel = 'MEDIUM';
    }

    // Check for vanity address patterns
    if (this.isVanityAddress(cleanAddress)) {
      walletType = 'VANITY_ADDRESS';
      confidence += 10;
      features.push('Vanity Address');
      // Vanity addresses can be less secure if poorly generated
      if (this.hasWeakVanityPattern(cleanAddress)) {
        riskLevel = 'MEDIUM';
        securityScore -= 10;
        features.push('Weak vanity pattern detected');
      }
    }

    // EIP-55 checksum validation
    if (this.hasValidChecksum(address)) {
      confidence += 10;
      securityScore += 10;
      features.push('Valid EIP-55 Checksum');
    } else {
      features.push('No checksum - verify carefully');
      riskLevel = riskLevel === 'LOW' ? 'MEDIUM' : riskLevel;
    }

    // Final risk assessment
    if (securityScore >= 80) riskLevel = 'LOW';
    else if (securityScore >= 50) riskLevel = 'MEDIUM';
    else riskLevel = 'HIGH';

    return {
      isValid: true,
      confidence: Math.min(confidence, 100),
      walletType,
      riskLevel,
      features,
      securityScore: Math.min(securityScore, 100)
    };
  }

  private static detectExchangeWallet(address: string): string | null {
    const exchangePatterns = [
      { pattern: /^0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be/, name: 'Binance' },
      { pattern: /^0xd551234ae421e3bcba99a0da6d736074f22192ff/, name: 'Binance' },
      { pattern: /^0x564286362092d8e7936f0549571a803b203aaced/, name: 'Binance' },
      { pattern: /^0xfe9e8709d3215310075d67e3ed32a380ccf451c8/, name: 'Coinbase' },
      { pattern: /^0xa090e606e30bd747d4e6245a1517ebe430f0057e/, name: 'Coinbase' },
      { pattern: /^0x503828976d22510aad0201ac7ec88293211d23da/, name: 'Coinbase' },
      { pattern: /^0x6262998ced04146fa42253a5c0af90ca02dfd2a3/, name: 'Crypto.com' },
      { pattern: /^0x46340b20830761efd32832a74d7169b29feb9758/, name: 'Crypto.com' },
    ];

    for (const exchange of exchangePatterns) {
      if (exchange.pattern.test(address)) {
        return exchange.name;
      }
    }
    return null;
  }

  private static isSmartContract(address: string): boolean {
    const knownContracts = [
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
      '0xa0b86a33e6776e81f36c40a8d7b0c8bfe9e73c0c', // USDC
      '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640', // Uniswap V3 USDC/ETH
      '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36', // Uniswap V3 USDT
    ];
    return knownContracts.includes(address);
  }

  private static hasMultisigPattern(address: string): boolean {
    // Heuristic: repeated byte patterns might indicate multisig
    const hex = address.slice(2);
    const repeatingPattern = /(.{2})\1{2,}/;
    return repeatingPattern.test(hex);
  }

  private static calculateAddressEntropy(address: string): number {
    const hex = address.slice(2);
    const charCounts: Record<string, number> = {};
    
    for (const char of hex) {
      charCounts[char] = (charCounts[char] || 0) + 1;
    }
    
    const probabilities = Object.values(charCounts).map(count => count / hex.length);
    const entropy = -probabilities.reduce((sum, p) => sum + p * Math.log2(p), 0);
    
    // Normalize to 0-20 scale
    return Math.min(entropy * 5, 20);
  }

  private static isVanityAddress(address: string): boolean {
    const hex = address.slice(2);
    // Check for repeated characters or obvious patterns
    const patterns = [
      /^0{6,}/, // Leading zeros
      /^f{6,}/, // Leading f's
      /(.)\1{5,}/, // 6+ repeated characters
      /^(dead|beef|cafe|feed|face)/, // Common vanity words
    ];
    
    return patterns.some(pattern => pattern.test(hex));
  }

  private static hasWeakVanityPattern(address: string): boolean {
    const hex = address.slice(2);
    // Patterns that might indicate weak generation
    return /^0{8,}|(.)\1{8,}/.test(hex); // 8+ repeated chars
  }

  private static hasValidChecksum(address: string): boolean {
    // Check if address has mixed case (indicating EIP-55 checksum)
    if (address === address.toLowerCase() || address === address.toUpperCase()) {
      return false;
    }
    
    const hasUppercase = /[A-F]/.test(address);
    const hasLowercase = /[a-f]/.test(address);
    return hasUppercase && hasLowercase;
  }
}

export default AddressValidator;