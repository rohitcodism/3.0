// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

contract eventContract {
    struct Event {
        address organizer;
        string name;
        uint date;
        uint price;
        uint seats;
        uint vacantSeats;
    }

    mapping(uint => Event) public eventList;
    mapping(address => mapping(uint => uint)) public tickets;
    uint public nextId;

    /**
     * @dev Creates a new event by storing its details in the `eventList` mapping.
     * It checks if the provided date is in the future and if the number of seats is greater than 10 before creating the event.
     * @param _name The name of the event.
     * @param _date The date of the event in Unix timestamp format.
     * @param _price The price of each ticket for the event.
     * @param _seats The total number of seats available for the event.
     */
    function createEvent(string memory _name, uint _date, uint _price, uint _seats) public {

        require(_date > block.timestamp, "Please choose a correct date !!!");

        require(_seats > 10, "Number of seats at the event must be greater than 10.");

        Event memory newEvent = Event(msg.sender, _name, _date, _price, _seats, _seats);

        eventList[nextId] = newEvent;

        nextId++;
    }

    /**
     * @dev Allows users to buy tickets for an event.
     * @param id The ID of the event for which the user wants to buy tickets.
     * @param quantity The number of tickets the user wants to purchase.
     */
    function buyTicket(uint id, uint quantity) payable public {
        Event storage _event = eventList[id];

        require(_event.date != 0, "Event does not exist !!");

        require(_event.date > block.timestamp, "Event is ended !!");

        require(msg.value == _event.price * quantity, "Ether is not enough !!");

        require(_event.vacantSeats >= quantity, "Seats Unavailable !!");

        _event.vacantSeats -= quantity;

        tickets[msg.sender][id] += quantity;
    }

    function transfer(uint event_id, uint quantity, address atendee) public {

        require(eventList[event_id].date != 0, "Invalid Event !!");

        require(eventList[event_id].date<block.timestamp, "Invalid Event !!");

        require(tickets[msg.sender][event_id]>= quantity, "Invalid quantity");

        tickets[msg.sender][event_id]-= quantity;

        tickets[atendee][event_id] += quantity;
        
    }
}