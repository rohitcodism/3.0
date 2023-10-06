// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract Lottery {
    address public manager; // manager
    address payable[] public players; // participants
    address payable winner; // winner global

    constructor() {
        manager = msg.sender; // global variable
    }

    // geeting lottery entry amount from participants
    receive() external payable {
        require(msg.value>=2 ether, "Transaction amount must be greater than 2 ethers."); //entry amount can be only greater than 2 ether
        players.push(payable(msg.sender));
    }

    //to check the contract balance
    function getContractBalance() public view returns(uint){
        require(msg.sender == manager, "Only manager can check the contract balance.");// only owner can check the contract balance
        return address(this).balance;
    }

    //to get the winner by Keccak-256 algorithm
    function winnerChcker() private view returns(address payable){
        require(players.length >= 3, "Not enough participants.");
        uint Winner = uint256(keccak256(abi.encodePacked(block.timestamp, blockhash(block.number-1)))) % players.length;
        return players[Winner];
    }

    //to transfer the prize amount to winners wallet
    function transferPrize() public payable {
        require(msg.sender == manager, "Only manager can transfer the prize amount.");
        winner = winnerChcker();
        winner.transfer(address(this).balance);
        
    }

    // to announce the winner
    function winnerAnnouncer() public view returns(address){
        return winner;
    }

    // to fetch the winners wallet balance only winner can check that
    function fetchWinnerBalance() public view returns(uint){
        require(msg.sender == winner, "Only winner can check his balance.");
        return winner.balance;
    }

    // to reset the whole lottery and start again only manager can do it
    function resetLottery() public {
        require(msg.sender == manager, "Only manager can reset the lottery.");
        players = new address payable[](0);
    }
}