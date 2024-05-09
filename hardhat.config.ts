// hardhat.config.ts

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    Sepolia: {
      url: process.env.INFURA_ENDPOINT || "", // Change to INFURA_ENDPOINT
      accounts: [process.env.PRIVATE_KEY || ""] // Provide a fallback value
    }
  }
};

export default config;
