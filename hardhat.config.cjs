
const { HardhatUserConfig } = require('hardhat/config');
require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');

const config = {
  solidity: {
    version: "0.8.20",
    settings: {
      viaIR: true,
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
      url: process.env.MAINNET_RPC_URL || 'https://ethereum.publicnode.com',
      accounts: ['0xa5ed71406d5a0be4fb9fe9ba2ff4addf51f01922688bc1eabf51ab92fbfe694f'],
      gasPrice: 20000000000, // 20 gwei
    },
    polygon: {
      url: 'https://polygon-rpc.com/',
      accounts: ['0xa5ed71406d5a0be4fb9fe9ba2ff4addf51f01922688bc1eabf51ab92fbfe694f'],
      gasPrice: 30000000000, // 30 gwei
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: ['0xa5ed71406d5a0be4fb9fe9ba2ff4addf51f01922688bc1eabf51ab92fbfe694f'],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};

module.exports = config;
