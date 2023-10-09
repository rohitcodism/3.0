// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

contract Wallet {
    string public name = "Wallet";
    uint num;

    function setValue(uint _num) public {
        num = _num;
    }

    function getValue() public view returns(uint) {
        return num;
    }

    function sendEthContract() public payable {
        // do nothing
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function sendEthUser(address payable _to) public payable {
        _to.transfer(msg.value);
    }

    function accountBalance(address _account) public view returns(uint) {
        return _account.balance;
    }
}