
# ZipToken Project

This project contains smart contract code for the ZipToken ERC20 token and deployment scripts using Hardhat.

## Overview

ZipToken is an ERC20 token deployed on the Ethereum blockchain. It is implemented using Solidity and deployed using Hardhat, a development environment for Ethereum smart contracts.

## Features

- ERC20 token standard compliant
- Total supply of 25,000,000 tokens
- Deployment script for easy deployment to Ethereum networks
- Integration with Etherscan for transaction verification

## Requirements

Before running the deployment script, ensure you have the following prerequisites installed:

- Node.js
- npm (Node Package Manager)
- Hardhat

## Installation

1. Clone this repository:

```
git clone <repository-url>
```

2. Install dependencies:

```
npm install
```

## Deployment

To deploy the ZipToken contract to the Ethereum blockchain, follow these steps:

1. Configure your Hardhat network settings in `hardhat.config.ts`.
2. Run the deployment script:

```
npx hardhat run --network <network-name> scripts/modules/deploy.ts
```

Replace `<network-name>` with the name of your target Ethereum network (e.g., 'mainnet', 'rinkeby', 'sepolia', etc.).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

