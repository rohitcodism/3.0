const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = require("hardhat");

describe("Token", () => {
    let Token;
    let hardhatToken;
    let Owner;
    let address1;
    let address2;
    let addrs;

    beforeEach(async () => {
        Token = await ethers.getContractFactory("Token");
        [Owner, address1, address2, ...addrs] = await ethers.getSigners(); 
        hardhatToken = await Token.deploy();
    })

    describe("Deployment", () => {
        it("Should set the right owner", async () => {
            expect(await hardhatToken.owner()).to.equal(Owner.address);
            console.log(Owner.address)
        })

        it("Should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await hardhatToken.fetchBalance(Owner.address);

            expect(ownerBalance).to.equal(10000);
        })

        describe("Transactions", () => {
            it("Should transfer the specified amount", async() => {
                await hardhatToken.transfer(address1.address, 10);
                const balance1 = await hardhatToken.fetchBalance(address1.address);
                expect(balance1).to.equal(10);

                await hardhatToken.transfer(address2.address, 5);
                const balance2 = await hardhatToken.fetchBalance(address2.address);
                expect(balance2).to.equal(5);

                await hardhatToken.connect(address1).transfer(address2.address, 5);
                const balanceX = await hardhatToken.fetchBalance(address2.address);
                expect(balanceX).to.equal(10);
            })
        })
    })
})

