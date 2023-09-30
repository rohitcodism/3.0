// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Token {
    string public name = "hardhat_token";
    string public symbol = "HTT";
    uint public totalSupply = 10000;

    address public owner;
    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address _to, uint _amount) public {
        require(msg.sender == owner, "Only owner can transfer tokens !!");
        require(balances[msg.sender] >= _amount, "Insufficient Balance !!!");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function fetchBalance(address _to) public view returns(uint) {
        return balances[_to];
    }
}