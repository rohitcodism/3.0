const {error} = require("console")
const {ethers} = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigners();

    const SchoolData = await ethers.getContractFactory("SchoolData");

    const DeployedSchoolData = await  SchoolData.deploy()

    console.log(DeployedSchoolData.address);
}

main()
.then(() => {
    console.log("Data Base deployed.")
    process.exit(0)
})
.catch((error) => {
    console.error(error);
})