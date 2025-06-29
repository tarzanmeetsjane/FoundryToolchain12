// Contract addresses
export const ETHGR_CONTRACT = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
export const FOUNDATION_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
export const ETHG_TOKEN = "0xfa7de122f5fba7123cdb4fe6bf75821c2b937c90";

// Use Etherscan API for blockchain data
const ETHERSCAN_API_KEY = "IRSDN3CM3AMG2Y2S2SBAISZ3HF7SV6TAG3";

// ERC20 ABI for token balance queries
export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)"
];

// Get ETHGR token balance for foundation wallet using Etherscan API
export async function getETHGRBalance() {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${ETHGR_CONTRACT}&address=${FOUNDATION_WALLET}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
    );
    const data = await response.json();
    
    if (data.status === "1" && data.result) {
      // Convert from wei to tokens (18 decimals)
      const balanceInTokens = parseInt(data.result) / Math.pow(10, 18);
      return balanceInTokens;
    }
    
    return 1990000; // Fallback to known balance
  } catch (error) {
    console.error("Error fetching ETHGR balance:", error);
    return 1990000;
  }
}

// Get ETH balance for foundation wallet using Etherscan API
export async function getETHBalance() {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=balance&address=${FOUNDATION_WALLET}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
    );
    const data = await response.json();
    
    if (data.status === "1" && data.result) {
      // Convert from wei to ETH
      const balanceInETH = parseInt(data.result) / Math.pow(10, 18);
      return balanceInETH;
    }
    
    return 0;
  } catch (error) {
    console.error("Error fetching ETH balance:", error);
    return 0;
  }
}

// Get current ETH price from a reliable source
export async function getETHPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await response.json();
    return data.ethereum.usd;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return 2439; // Fallback price
  }
}

// Calculate conversion estimates
export function calculateConversion(ethgrAmount: number, ethPrice: number) {
  const ethgToEthRate = 7434; // Current rate: 1 ETH = 7434 ETHGR
  const expectedETH = ethgrAmount / ethgToEthRate;
  const expectedUSD = expectedETH * ethPrice;
  const tradingFees = expectedUSD * 0.0025; // 0.25% fees
  const netUSD = expectedUSD - tradingFees;
  const taxReserve = netUSD * 0.4; // 40% tax reserve
  const availableCash = netUSD - taxReserve;
  
  return {
    expectedETH,
    expectedUSD,
    tradingFees,
    netUSD,
    taxReserve,
    availableCash
  };
}