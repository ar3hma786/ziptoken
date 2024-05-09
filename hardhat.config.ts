// hardhat.config.ts

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/c2e3680018dc4067b6584b09dd6b9a57",
      accounts: ["b2dafa55516a55496e77f3f1c72db17f01fa194b04218d03ac619ef6c1c703be"]
    }
  }
};

export default config;
