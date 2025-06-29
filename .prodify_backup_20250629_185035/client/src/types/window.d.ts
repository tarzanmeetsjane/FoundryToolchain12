interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    isMetaMask?: boolean;
    isConnected?: () => boolean;
    selectedAddress?: string;
    chainId?: string;
    on?: (event: string, callback: (params: any) => void) => void;
    removeListener?: (event: string, callback: (params: any) => void) => void;
  };
}