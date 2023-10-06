const {ethers} = require("hardhat")
const { expect } = require("chai")

describe("My Tests", function () {
    let owner;
    let players;
    let winner;
    let Token;
    let LotteryToken;

    beforeEach(async () => {
        Token = await ethers.getContractFactory("Lottery");
        [owner] = await ethers.getSigners();
        LotteryToken = await Token.deploy();
    })
    it("Should set the manager.", async () => {
        expect(await LotteryToken.manager()).to.equal(owner.address);
        console.log(owner);
    })

    it("Should fail if manager is not calling the function.", async () => {
        expect(LotteryToken.getContractBalance()).to.be.revertedWith("Only manager can check the contract balance.")
    })
});