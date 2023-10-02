// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "hardhat/console.sol"; // importing console library for debugging purpose

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

        // console logging the balance of the sender
        console.log("* * sender balance %s tokens * *", balances[msg.sender]);

        console.log("* *Sneder is sending %s tokens to %s address * *", _amount, _to);

        // require(msg.sender == owner, "Only owner can transfer tokens !!");
        require(balances[msg.sender] >= _amount, "Insufficient Balance !!!");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function fetchBalance(address _account) public view returns(uint) {
        return balances[_account];
    }
}