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
     * @dev Updates the details of an event in the `eventList` mapping.
     * @param eventId The ID of the event to be updated.
     * @param _newName The new name of the event.
     * @param _newDate The new date of the event in Unix timestamp format.
     * @param _newPrice The new price of each ticket for the event.
     * @param _newSeats The new total number of seats available for the event.
     */
    /**
     * @dev Updates the details of an event in the `eventList` mapping.
     * @param eventId The ID of the event to be updated.
     * @param _newName The new name of the event.
     * @param _newDate The new date of the event in Unix timestamp format.
     * @param _newPrice The new price of each ticket for the event.
     * @param _newSeats The new total number of seats available for the event.
     */
    function updateEvent(uint eventId, string memory _newName, uint _newDate, uint _newPrice, uint _newSeats) public {
        // Check if the event with the given `eventId` exists in the `eventList` mapping.
        require(bytes(eventList[eventId].name).length != 0, "Event doesn't exist !!");

        // Check if the event's date is in the future.
        require(eventList[eventId].date > block.timestamp, "Event is ended !!");

        // Check if the caller of the function is the organizer of the event.
        require(eventList[eventId].organizer == msg.sender, "You are not the organizer !!");

        // Update the event's details in the `eventList` mapping.
        Event storage eventToUpdate = eventList[eventId];

        // Update the event's name if a new name is provided.
        if (bytes(_newName).length != 0) {
            eventToUpdate.name = _newName;
        }

        // Update the event's date if a new date is provided.
        if (_newDate != 0) {
            eventToUpdate.date = _newDate;
        }

        // Update the event's price if a new price is provided.
        if (_newPrice != 0) {
            eventToUpdate.price = _newPrice;
        }

        // Update the event's seats if new seats are provided.
        if (_newSeats != 0) {
            eventToUpdate.seats = _newSeats;
            eventToUpdate.vacantSeats = _newSeats;
        }
    }

    /**
     * @dev Allows users to purchase tickets for a specific event.
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

    /**
     * @dev The `transfer` function allows a user to transfer tickets for a specific event to another attendee.
     * @param event_id The ID of the event for which the tickets are being transferred.
     * @param quantity The number of tickets being transferred.
     * @param attendee The address of the new attendee who will receive the transferred tickets.
     */
    function transfer(uint event_id, uint quantity, address attendee) public {
        // Check if the event with the given `event_id` exists and is valid
        require(eventList[event_id].date != 0, "Invalid Event !!");

        // Check if the event has already occurred
        require(eventList[event_id].date < block.timestamp, "Invalid Event !!");

        // Check if the sender has enough tickets to transfer
        require(tickets[msg.sender][event_id] >= quantity, "Invalid quantity");

        // Subtract the transferred tickets from the sender's account
        tickets[msg.sender][event_id] -= quantity;

        // Add the transferred tickets to the new attendee's account
        tickets[attendee][event_id] += quantity;
    }

    /**
     * @dev Cancels the purchased tickets for a specific event and refunds the user.
     * @param _event The ID of the event for which the tickets are being canceled.
     * @param quantity The number of tickets being canceled.
     */
    function cancelTicket(uint _event, uint quantity) payable public {
        require(eventList[_event].date != 0, "Invalid event !!");
        require(eventList[_event].date > block.timestamp, "Invalid event !!");
        require(quantity > 0, "Ticket quantity can't be 0.");

        tickets[msg.sender][_event] -= quantity;

        address payable user = payable(msg.sender);
        uint amount = eventList[_event].price * quantity;
        user.transfer(amount);
    }
}    