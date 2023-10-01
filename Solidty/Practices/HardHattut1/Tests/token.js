import chai, { expect } from "chai";

describe("Token", () => {
    it("Deployment should assign the total supply of tokens to the owner", async () => {
        const[owner] = await ethers.getSigners(); // to access the owner of the contract

        console.log("Owner : ", owner);

        const Token = await ethers.getContractFactory("Token"); //to get a instance of the contract

        const hardhatToken = await Token.deploy(); // to deploy the contract

        const ownerBalance = await hardhatToken.fetchBalance(owner.address); // to get the balance of the owner

        console.log("Owner Balance : ", ownerBalance.toString()); // to print the balance of the owner

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // to check if the total supply is equal to the owner balance
    });
})