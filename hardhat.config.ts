
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-verify';

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || 'demo',
      routescan: 'routescan', // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: 'routescan',
        chainId: 1,
        urls: {
          apiURL: 'https://api.routescan.io/v2/network/mainnet/evm/1/etherscan',
          browserURL: 'https://routescan.io'
        }
      }
    ]
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: process.env.MAINNET_RPC_URL || 'https://eth-rpc.gateway.pokt.network',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    routescan: {
      url: 'https://eth-rpc.gateway.pokt.network',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};

export default config;
