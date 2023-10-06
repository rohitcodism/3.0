// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract Lottery {
    address public manager; // manager
    address payable[] public players; // participants
    address payable winner; // winner global

    constructor() {
        manager = msg.sender; // global variable
    }

    receive() external payable {
        require(msg.value>=2 ether, "Transaction amount must be greater than 2 ethers.");
        players.push(payable(msg.sender));
    }

    function getContractBalance() public view returns(uint){
        require(msg.sender == manager, "Only manager can check the contract balance.");
        return address(this).balance;
    }

    function winnerChcker() public view returns(address){
        require(players.length >= 3, "Not enough participants.");
        uint Winner = uint256(keccak256(abi.encodePacked(block.timestamp, blockhash(block.number-1)))) % players.length;
        return players[Winner];
    }

    function transferPrize() public payable {
        require(msg.sender == manager, "Only manager can transfer the prize amount.")
        winner = winnerChcker();
        winner.transfer(address(this).balance);
        
    }

    function winnerAnnouncer() public view returns(address){
        return winner;
    }

    function fetchWinnerBalance() public view returns(uint){
        require(msg.sender == winner, "Only winner can check his balance.")
        return winner.balance;
    }

    function resetLottery() public {
        require(msg.sender == manager, "Only manager can reset the lottery.");
        while(players[players.length-1] != 0){
            players.pop();
        }
    }
}