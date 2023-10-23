const {expect} = require("chai");
const { parseUnits } = require("ethers");
const {ethers} = require("hardhat");

describe("CrowdFunding", function () {
    let manager;
    let minContribution;
    let deadline = 3600;
    let target = 3000;
    let raisedAmount;
    let numberOfContributors;

    beforeEach(async() => {
        CF = await ethers.getContractFactory("CrowdFunding");
        [manager] = await ethers.getSigners();
        crowdF = await CF.deploy(target, deadline);
    })

    it("Should set the correct parameters.", async () => {
        expect(await crowdF.Manager()).to.equal(manager.address);
        console.log(manager);
    })

    it("Should revert if DEADLINE is over.", async () =>{
        expect(await crowdF.sendEth({value: parseUnits("101", "wei")})).to.be.revertedWith("Deadline for contribution is over !!!")
    })

    it("Should revert if the contribution amount is less than 100 Wei.", async () => {
        expect(await crowdF.sendEth({value: parseUnits("99", "wei")})).to.be.revertedWith("Minimum contribution amount is 100 Wei !!");
    })

    it("Should increment the number of contributors if the contributor has not contributed yet.", async() => {
        const intialContri = await crowdF.numberOfContributors();

        await crowdF.sendEth({value: parseUnits("102", "wei")});

        const finalContri = await crowdF.numberOfContributors();

        expect(finalContri).to.equal(intialContri + BigInt(1));
        console.log(finalContri);

    })
});