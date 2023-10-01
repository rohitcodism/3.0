import { ethers } from "hardhat";
import { expect } from "chai";

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
})