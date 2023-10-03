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

        it("Should fail if owner is not calling the function", async () => {
            await hardhatSchoolData.newStudent(4, "Rohit Paul", 107, 13, "CSE2");
            expect(await hardhatSchoolData.updateStudent(4, "Rohit", 125, 14, "CSE3")).to.be.revertedWith("Only admins can update the details of a student.");
        })

        it("Should fail if id doesn't match", async () => {
            await hardhatSchoolData.newStudent(4, "Rohit Paul", 107, 13, "CSE2");
            expect(await hardhatSchoolData.updateStudent(4, "Rohit", 0, 0, "")).to.be.revertedWith("Student does not exist")
        })

        it("Should update a student correctly.", async () => {
            await hardhatSchoolData.newStudent(4, "Rohit Paul", 107, 13, "CSE2");
            const updatedStudent = await hardhatSchoolData.updateStudent(4, "Rohit", 0, 0, "");
            console.log(await updatedStudent.wait());
            const student = await hardhatSchoolData.StudentList(4)
            console.log(student);
            expect(student.name).to.equal("Rohit");
            expect(student.roll_number).to.equal(107);
            expect(student.class).to.equal(13);
            expect(student.section).to.equal("CSE2")
        })

        it("Should fail if owner is not calling the function", async () => {
            await hardhatSchoolData.newStudent(4, "Rohit Paul", 107, 13, "CSE2");
            expect(await hardhatSchoolData.deleteStudent(4)).to.be.revertedWith("Only admins can delete the details of a student.");
        })

        it("Should delete the student data", async () => {
            await hardhatSchoolData.newStudent(4, "Rohit Paul", 107, 13, "CSE2");
            await hardhatSchoolData.deleteStudent(4);
            const deletedStudent = hardhatSchoolData.StudentList(4);
            expect(deletedStudent.roll_number).to.equal(undefined);
        })
    })
})