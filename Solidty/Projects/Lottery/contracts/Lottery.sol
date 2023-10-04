// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract Lottery {
    address public manager; // manager
    address payable[] public players; // participants

    constructor() {
        manager = msg.sender;
    }
}