import { ethers } from 'hardhat';

async function main() {
    // Get signer
    const [deployer] = await ethers.getSigners();

    // Get user's ETH balance before deployment
    const balanceBefore = await deployer.provider.getBalance(deployer.address);
    console.log('ETH balance before deployment:', ethers.formatEther(balanceBefore));

    // Deployment parameters
    const name = "ZipToken";
    const symbol = "ZIP";
    const totalSupply = ethers.parseUnits("25000000", 18);
    const decimals = 18;
    const uniswapRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const uniswapFactory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

    // Deploy ZipToken contract
    const ZipToken = await ethers.getContractFactory('ZipToken');
    const zipToken = await ZipToken.deploy(
        name,
        symbol,
        totalSupply,
        decimals,
        uniswapRouter,
        uniswapFactory
    );


    // Wait for deployment transaction to be mined
    const deploymentTx = zipToken.deploymentTransaction();
    if (deploymentTx) {
        await deploymentTx.wait();
    } else {
        throw new Error("Deployment transaction is null");
    }




    // Get user's ETH balance after deployment
    const balanceAfter = await deployer.provider.getBalance(deployer.address);
    console.log('ETH balance after deployment:', ethers.formatEther(balanceAfter));

    // Output contract address
    console.log('Zip Token deployed:', await zipToken.getAddress());



}

// Execute main function
main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
