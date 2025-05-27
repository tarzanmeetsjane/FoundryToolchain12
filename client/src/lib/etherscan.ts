export const ETHERSCAN_API_URL = "https://api.etherscan.io/v2/api";
export const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY || "YourApiKeyToken";

// Uniswap V3 Swap event signature
export const SWAP_EVENT_TOPIC = "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67";

export interface EtherscanLog {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  timeStamp: string;
  gasPrice: string;
  gasUsed: string;
  logIndex: string;
  transactionHash: string;
  transactionIndex: string;
}

export interface EtherscanResponse<T> {
  status: string;
  message: string;
  result: T;
}

export async function fetchLogs(
  address: string,
  fromBlock: number,
  toBlock: number
): Promise<EtherscanLog[]> {
  const url = new URL(ETHERSCAN_API_URL);
  url.searchParams.append("chainid", "1");
  url.searchParams.append("module", "logs");
  url.searchParams.append("action", "getLogs");
  url.searchParams.append("address", address);
  url.searchParams.append("fromBlock", fromBlock.toString());
  url.searchParams.append("toBlock", toBlock.toString());
  url.searchParams.append("topic0", SWAP_EVENT_TOPIC);
  url.searchParams.append("page", "1");
  url.searchParams.append("offset", "1000");
  url.searchParams.append("apikey", ETHERSCAN_API_KEY);

  const response = await fetch(url.toString());
  const data: EtherscanResponse<EtherscanLog[]> = await response.json();

  if (data.status !== "1") {
    throw new Error(data.message || "Failed to fetch logs from Etherscan");
  }

  return data.result;
}

export async function fetchContractABI(address: string): Promise<string> {
  const url = new URL(ETHERSCAN_API_URL);
  url.searchParams.append("chainid", "1");
  url.searchParams.append("module", "contract");
  url.searchParams.append("action", "getabi");
  url.searchParams.append("address", address);
  url.searchParams.append("apikey", ETHERSCAN_API_KEY);

  const response = await fetch(url.toString());
  const data: EtherscanResponse<string> = await response.json();

  if (data.status !== "1") {
    throw new Error("Failed to fetch contract ABI");
  }

  return data.result;
}
