// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

contract eventContract {
    struct Event{
        address Organiser;
        string name;
        uint date;
        uint price;
        uint seats;
        uint vacantSeats;
    }

    mapping(uint => Event) public eventList;

    mapping(address =>mapping(uint => uint)) public tickets;

    uint public nextId;

    function createEvent(string memory _name, uint _date, uint _price, uint _seats) public {

        require(_date>block.timestamp, "Please choose a correct date !!!");

        require(_seats>10, "Number of seats at the event must be greater than 10.");

        eventList[nextId] = Event(msg.sender, _name, _date, _price, _seats, _seats);

        nextId++;
    }

        function buyTicket(uint id, uint quantity) payable public  {
        require(eventList[id].date != 0, "Event does not exist !!");

        require(eventList[id].date > block.timestamp, "Event is ended !!");

        Event storage _event = eventList[id];

        require(msg.value == _event.price, "Ether is not enough !!");

        require(_event.seats >= quantity, "Seats Unavailable !!");

        _event.vacantSeats -= quantity;
    }
}