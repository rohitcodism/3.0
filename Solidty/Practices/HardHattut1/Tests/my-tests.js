const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = require("hardhat");


describe("Token", () => {
    it("Deployment should assign the total supply of tokens to the owner", async () => {
        const [owner] = await ethers.getSigners();
        console.log("Owner:", owner);

        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();

        const ownerBalance = await hardhatToken.fetchBalance(owner.address);
        console.log("Owner Balance:", ownerBalance.toString());

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Specified amount tokens should be transferred between accounts", async () => {
        const [owner, addr1, addr2] = await ethers.getSigners();
        console.log("Owner:", owner);
        console.log("Sender:", addr1);
        console.log("Receiver:", addr2);

        // deploying contract
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();

        // transferring 10 tokens to receiver
        await hardhatToken.transfer(addr2.address, 10);

        // checking balance of receiver
        const balance2 = await hardhatToken.fetchBalance(addr2.address);

        // checking if balance is 10
        expect(balance2).to.equal(10);

        // transferring 5 tokens to sender
        await hardhatToken.transfer(addr1.address, 5);

        // checking balance of sender
        const balance1 = await hardhatToken.fetchBalance(addr1.address);

        // checking if balance is 5
        expect(balance1).to.equal(5);

    });
})

