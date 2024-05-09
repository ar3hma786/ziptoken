// hardhat.config.ts

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const { PRIVATE_KEY, INFURA_SEPHOLIA_ENDPOINT } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: INFURA_SEPHOLIA_ENDPOINT,
      accounts: [PRIVATE_KEY || '']
    }
  }
};

export default config;
