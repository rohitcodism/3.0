const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SchoolData", () => {
    let SchoolData;
    let hardhatSchoolData;
    let Owner;

    // setting the necessary variables using beforeEach
    beforeEach(async () => {
        SchoolData = await ethers.getContractFactory("SchoolData");
        [Owner] = await ethers.getSigners();
        hardhatSchoolData = await SchoolData.deploy();
    })

    // testing the setting of correct owner during deployment
    describe("Deployment", () => {
        it("Should set the correct Owner.", async () => {
            expect(await hardhatSchoolData.Owner()).to.equal(Owner.address);
            console.log(Owner.address)
        })
    })
})