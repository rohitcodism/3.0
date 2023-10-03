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

        //testing the enlister function if it is enlisting a new student correctly
        it("Should enlist a new student.", async() => {
            const newEnlistedStudent = await hardhatSchoolData.newStudent(4, "Rohit Paul", 125, 14, "CSE3");
            const data = await hardhatSchoolData.StudentList(4);
            expect(data.name).to.equal("Rohit Paul");
            expect(data.roll_number).to.equal(125);
            expect(data.class).to.equal(14);
            expect(data.section).to.equal("CSE3")
            console.log(newEnlistedStudent);
            console.log("Student data : ",data);
        })
    })
})