import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  paths: {
    sources: "./src",
  },
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: DEPLOYER_PRIVATE_KEY ? [`0x${DEPLOYER_PRIVATE_KEY}`] : [],
    },
    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      chainId: 421614,
      accounts: DEPLOYER_PRIVATE_KEY ? [`0x${DEPLOYER_PRIVATE_KEY}`] : [],
    },
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc",
      chainId: 42161,
      accounts: DEPLOYER_PRIVATE_KEY ? [`0x${DEPLOYER_PRIVATE_KEY}`] : [],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};

export default config;
