import { ethers } from 'hardhat';

async function main() {
    // Get signer
    const [deployer] = await ethers.getSigners();

    // Get user's ETH balance before deployment
    const balanceBefore = await deployer.provider.getBalance(deployer.address);
    console.log('ETH balance before deployment:', ethers.formatEther(balanceBefore));

    // Deploy ZipToken contract
    const ZipToken = await ethers.getContractFactory('ZipToken');
    const zipToken = await ZipToken.deploy(25000000);

    // Wait for deployment to be confirmed
    await zipToken.deployed();

    // Get user's ETH balance after deployment
    const balanceAfter = await deployer.provider.getBalance(deployer.address);
    console.log('ETH balance after deployment:', ethers.formatEther(balanceAfter));
}

// Execute main function
main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
