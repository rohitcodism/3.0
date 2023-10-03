// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract SchoolData {

    address public Owner;

    struct Student {
        string name;
        uint roll_number;
        uint class;
        string section;
    }

    constructor(){
        Owner = msg.sender;
    }

    mapping(uint => Student) public StudentList;

    function newStudent(uint _id, string memory _name, uint _roll, uint _class, string memory _section) public {
        require(msg.sender == Owner, "Only admins change can enlist a new student.");
        StudentList[_id] = Student(_name, _roll, _class, _section);
    }

    function updateStudent(uint _id, string memory _name, uint _roll, uint _class, string memory section) public {

        require(msg.sender == Owner, "Only admins can update the details of a student.");
        require(StudentList[_id].roll_number != 0, "Student does not exist");

        if(bytes(_name).length != 0) {
            StudentList[_id].name = _name;
        }else{
            StudentList[_id].name = StudentList[_id].name;
        }
        if(_roll != 0) {
            StudentList[_id].roll_number = _roll;
        }else{
            StudentList[_id].roll_number = StudentList[_id].roll_number;
        }
        if(_class != 0) {
            StudentList[_id].class = _class;
        }else{
            StudentList[_id].class = StudentList[_id].class;
        }
        if(bytes(section).length != 0) {
            StudentList[_id].section = section;
        }else{
            StudentList[_id].section = StudentList[_id].section;
        }
    }

    function deleteStudent(uint _id) public {
        require(msg.sender == Owner, "Only admins can delete the details of a student.");
        require(StudentList[_id].roll_number != 0, "Student does not exist");
        delete StudentList[_id];
    }
}