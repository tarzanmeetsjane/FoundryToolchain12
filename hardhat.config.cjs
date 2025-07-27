
const { HardhatUserConfig } = require('hardhat/config');
require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');

const config = {
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
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};

module.exports = config;
