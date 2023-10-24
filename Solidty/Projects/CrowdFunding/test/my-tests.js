const {expect} = require("chai");
const { parse } = require("dotenv");
const { parseUnits } = require("ethers");
const {ethers} = require("hardhat");

describe("CrowdFunding", function () {
    let manager;
    let minContribution;
    let deadline = 3600;
    let testTarget = 3000;
    let raisedAmount;
    let numberOfContributors;

    beforeEach(async() => {
        CF = await ethers.getContractFactory("CrowdFunding");
        [manager] = await ethers.getSigners();
        crowdF = await CF.deploy(testTarget, deadline);
    })

    it("Should set the correct parameters.", async () => {
        expect(await crowdF.Manager()).to.equal(manager.address);
        console.log(manager);
    })

    it("Should revert if DEADLINE is over.", async () =>{
        expect(await crowdF.sendEth({value: parseUnits("101", "wei")})).to.be.revertedWith("Deadline for contribution is over !!!")
    })

    // it("Should revert if the contribution amount is less than 100 Wei.", async () => {
    //     expect(await crowdF.sendEth({value: parseUnits("99", "wei")})).to.be.revertedWith("Minimum contribution amount is 100 Wei !!");
    // })

    it("Should increment the number of contributors if the contributor has not contributed yet.", async() => {
        const intialContri = await crowdF.numberOfContributors();

        await crowdF.sendEth({value: parseUnits("102", "wei")});

        const finalContri = await crowdF.numberOfContributors();

        expect(finalContri).to.equal(intialContri + BigInt(1));

    })

    it("Should increase the raised amount with the amount contr", async () => {
        await crowdF.sendEth({value: parseUnits("102", "wei")});
        expect(await crowdF.raisedAmount()).to.equal(BigInt(102));
    })

    it("Should fetch the contract balance.", async () => {
        const initialBalance = await crowdF.getContractBalance();
        await crowdF.sendEth({value: parseUnits("200", "wei")});
        const afterBalance = await crowdF.getContractBalance();
        expect(afterBalance).to.equal(initialBalance + parseUnits("200", "wei"));
    })

    // it("Should change the target amount", async () => {
    //     await crowdF.changeTarget(5000);
    
    //     expect(await crowdF.target()).to.equal(5000);
    // })
    
    it("Should allow contributors to withdraw their amount.", async() =>{
        await expect(crowdF.withdrawContribution()).to.be.revertedWith("You haven't contributed anything.")
    })

    it("Should deduct the withdraw amount from the raised amount.", async() => {
        await crowdF.sendEth({value: parseUnits("200", "wei")});
        await crowdF.withdrawContribution();
        expect(await crowdF.raisedAmount()).to.equal(0);
        
    })

    it("Should transfer the contribution amount to the contributor.", async () => {
        await crowdF.sendEth({value: parseUnits("200", "wei")});
        await crowdF.withdrawContribution();
        expect(await crowdF.getContractBalance()).to.equal(0);
    })

    it("Should create a new request for contribution.", async () => {
        await crowdF.createRequests("Buy a laptop", manager.address, 2000);
        const request = await crowdF.requests(0);
        expect(request.description).to.equal("Buy a laptop");
    })

    it("Should prevent the vote for a non-contributor.", async () => {
        await crowdF.createRequests("Buy a laptop", manager.address, 2000);
        expect(await crowdF.voteRequest(0)).to.be.revertedWith("Only contributors can vote for the request.")
    })

});