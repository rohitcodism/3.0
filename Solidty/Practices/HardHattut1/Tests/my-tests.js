const { expect } = require("chai"); // importing the chai library
const hre = require("hardhat"); //importing hardhat-runtime-environment
const { ethers } = require("hardhat"); // importing ethers

describe("Token", () => {
    let Token;
    let hardhatToken;
    let Owner;
    let address1;
    let address2;
    let addrs;

    beforeEach(async () => {
        Token = await ethers.getContractFactory("Token"); // creating an instance of the contract
        [Owner, address1, address2, ...addrs] = await ethers.getSigners(); // getting the accounts
        hardhatToken = await Token.deploy(); // deploying the contract
    })

    // testing the deployment
    describe("Deployment", () => {
        it("Should set the right owner", async () => {
            expect(await hardhatToken.owner()).to.equal(Owner.address); // checking if the owner is set correctly
            console.log(Owner.address)
        })

        // testing the initial supply
        it("Should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await hardhatToken.fetchBalance(Owner.address); // getting the balance of the owner

            expect(ownerBalance).to.equal(10000); // checking if the balance is set correctly
        })

        // testing the transfer function
        describe("Transactions", () => {
            it("Should transfer the specified amount", async() => {
                await hardhatToken.transfer(address1.address, 10); // transferring 10 tokens to address1
                const balance1 = await hardhatToken.fetchBalance(address1.address); // getting the balance of address1
                expect(balance1).to.equal(10); // checking if the balance is set correctly

                await hardhatToken.transfer(address2.address, 5); // transferring 5 tokens to address2
                const balance2 = await hardhatToken.fetchBalance(address2.address); // getting the balance of address2
                expect(balance2).to.equal(5); // checking if the balance is set correctly

                await hardhatToken.connect(address1).transfer(address2.address, 5); // transferring 5 tokens from address1 to address2
                const balanceX = await hardhatToken.fetchBalance(address2.address); // getting the balance of address2
                expect(balanceX).to.equal(10); // checking if the balance is set correctly
            })

            // testing the transfer function for failure
            it("Fail!! if sender doesn't have enough tokens.", async () => {
                const initialOwnerBalance = await hardhatToken.fetchBalance(Owner.address); // getting the initial balance of the owner
                await expect(hardhatToken.connect(address1).transfer(Owner.address, 1)).to.be.revertedWith("Insufficient Balance !!!"); // checking if the transfer fails
                await expect(await hardhatToken.fetchBalance(Owner.address)).to.equal(initialOwnerBalance); // checking if the balance is set correctly
            })

            // testing the update balance function
            it("Should update balance correctly.", async () => {
                const initialOwnerBalance = await hardhatToken.fetchBalance(Owner.address); // getting the initial balance of the owner
                await hardhatToken.transfer(address1.address, 10); // transferring 10 tokens to address1
                await hardhatToken.transfer(address2.address, 10); // transferring 10 tokens to address2

                const finalOwnerBalance = await hardhatToken.fetchBalance(Owner.address); // getting the final balance of the owner
                expect(finalOwnerBalance).to.equal(initialOwnerBalance-20); // checking if the balance is set correctly

                const balanceX = await hardhatToken.fetchBalance(address1.address); // getting the balance of address1
                expect(balanceX).to.equal(10); // checking if the balance is set correctly

                const balanceY = await hardhatToken.fetchBalance(address2.address); // getting the balance of address2
                expect(balanceY).to.equal(10); // checking if the balance is set correctly
            })
        })
    })
})

