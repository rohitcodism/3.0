// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

contract CrowdFunding {

    mapping(address=>uint) public Contributors; // contributor address -> donation amount
    address public Manager;
    uint public minContribution;
    uint public deadLine;
    uint public target;
    uint public raisedAmount;
    uint public numberOfContributors;

    constructor(uint _target, uint _deadLine){
        target = _target;
        deadLine = block.timestamp + _deadLine; // time of contract deployment + time we want to run the crowdfunding
        minContribution = 100 wei;
        Manager = msg.sender;
    }

    function sendEth() public payable{
        require(deadLine>block.timestamp, "Deadline for contribution is over !!!");
        require(msg.value>=minContribution, "Minimum contribution amount is 100 Wei !!");
        if(Contributors[msg.sender] == 0){   // checking if the contributor in contributing for the first time
            numberOfContributors ++;
        }
        Contributors[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function getContractBalance() public view returns(uint){
        return address(this).balance;
    }

}