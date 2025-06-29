// Default Uniswap V3 ETH/USDC pool
export const DEFAULT_POOL_ADDRESS = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";

// Token decimals
export const USDC_DECIMALS = 6;
export const ETH_DECIMALS = 18;

// Pool info
export const POOL_INFO = {
  [DEFAULT_POOL_ADDRESS]: {
    name: "ETH/USDC",
    token0: "USDC",
    token1: "ETH",
    token0Decimals: USDC_DECIMALS,
    token1Decimals: ETH_DECIMALS,
  },
};

// API endpoints
export const API_ENDPOINTS = {
  POOLS: "/api/pools",
  SWAPS: "/api/swaps",
  RECENT_SWAPS: "/api/swaps/recent",
} as const;

// Chart colors
export const CHART_COLORS = {
  PRIMARY: "hsl(var(--primary))",
  SUCCESS: "hsl(var(--success))",
  DESTRUCTIVE: "hsl(var(--destructive))",
  WARNING: "hsl(var(--warning))",
  MUTED: "hsl(var(--muted-foreground))",
  BORDER: "hsl(var(--border))",
} as const;

// Time intervals for charts
export const TIME_INTERVALS = {
  "1H": 60 * 60 * 1000,
  "6H": 6 * 60 * 60 * 1000,
  "24H": 24 * 60 * 60 * 1000,
} as const;
