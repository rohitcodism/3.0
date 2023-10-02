const { error } = require("console");
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners(); // getting the deployer account

    const Token = await ethers.getContractFactory("Token"); // getting the contract factory

    const token = await Token.deploy()

    console.log("Token address : ", token.address);

}

main()
.then(() => {
    console.log("Token deployed successfully.");
    process.exit(0);
})
.catch(() => {
    console.error(error);
    
})

