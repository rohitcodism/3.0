// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

contract CrowdFunding {

    mapping(address =>uint) public Contributors; // contributor address -> donation amount
    address public Manager;
    uint public minContribution;
    uint public deadLine;
    uint public target;
    uint public raisedAmount;
    uint public numberOfContributors;

    struct Request {
        string description;
        address payable recipient;
        uint amount;
        bool completed;
        uint numberofVoters;
        mapping(address=>bool)  Voters;
    }

    mapping(uint=>Request) public  requests;
    uint public numRequests;
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

    function changeTarget(uint _newTarget) public {
        require(msg.sender == Manager, "Only manager can increase the target");
        require(_newTarget>target, "Target value can't be decreased");
        target = _newTarget;
    }

    function withdrawContribution() public payable {
        require(Contributors[msg.sender] != 0, "You haven't contributed anything.");
        raisedAmount -= Contributors[msg.sender];
        payable (msg.sender).transfer(Contributors[msg.sender]);
    }

    modifier onlyManager(){
        _;
        require(msg.sender == Manager, "Only manager can call this function");
    }

    function createRequests(string memory _description, address payable _recipient, uint amount) public onlyManager(){
        Request storage newRequest = requests[numRequests];

        newRequest.description = _description;
        newRequest.recipient = _recipient;
        newRequest.amount = amount;
        newRequest.completed = false;
        newRequest.numberofVoters = 0;
    }

}