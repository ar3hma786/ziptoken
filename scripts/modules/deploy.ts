import { ethers } from 'hardhat';

async function main() {
    // Get signer
    const [deployer] = await ethers.getSigners();

    // Get user's ETH balance before deployment
    const balanceBefore = await deployer.getBalance();
    console.log('ETH balance before deployment:', ethers.utils.formatEther(balanceBefore));

    // Deploy ZipToken contract
    const ZipToken = await ethers.getContractFactory('ZipToken');
    const zipToken = await ZipToken.deploy(25000000);

    // Wait for deployment to be confirmed
    await zipToken.deployed();

    // Get user's ETH balance after deployment
    const balanceAfter = await deployer.getBalance();
    console.log('ETH balance after deployment:', ethers.utils.formatEther(balanceAfter));

    // Output transaction link
    console.log('Transaction hash:', zipToken.deployTransaction.hash);
    console.log('View transaction on Etherscan:', `https://sepolia.etherscan.io/tx/${zipToken.deployTransaction.hash}`);
}

// Execute main function
main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
