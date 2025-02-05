// TicketBooking.js
import React, { useState, useEffect } from 'react';
import './ticketbook.css';

const TicketBooking = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    handleTicketSelection();
  }, []);

  const calculateDurationInHours = (entryDateTime, exitDateTime) => {
    const entryDate = new Date(entryDateTime);
    const exitDate = new Date(exitDateTime);
    const durationInMilliseconds = exitDate - entryDate;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60); // milliseconds to hours conversion
    return durationInHours;
  };

  // Function to handle changes in ticket selection
function handleTicketSelection() {
    let totalAmount = 0;
    let totalCount = 0;
  
    const tickets = document.querySelectorAll("input[name='tickets']:checked");
    const hoursPerSeat = parseInt(document.getElementById('hours').value);
    const entryDateTime = document.getElementById('entryDate').value;
    const exitDateTime = document.getElementById('exitDate').value;
  
    const durationInHours = calculateDurationInHours(entryDateTime, exitDateTime);
  
    tickets.forEach(ticket => {
      totalCount += 1;
      totalAmount += hoursPerSeat * durationInHours * 50; // Assuming $50 per hour per seat
    });
  
    // Update the count and amount only if they are valid numbers
    if (!isNaN(totalCount)) {
      document.querySelector(".count").innerHTML = totalCount;
    }
  
    if (!isNaN(totalAmount)) {
      document.querySelector(".amount").innerHTML = totalAmount.toFixed(2);
    }
  }
  
  
  let cou;
  do {
    cou = prompt("Enter How Many seats you want:");
  } while (isNaN(cou) || cou <= 0);
  
  // Convert cou to a number before using it
  cou = parseInt(cou);
  
  const bookTickets = () => {
    // Replace this with your booking logic
    alert("Tickets booked successfully!");
    // Optionally, you can reset the ticket count and total amount
    setTotalCount(0);
    setTotalAmount("0");
    // Clear selected checkboxes
    const selectedTickets = document.querySelectorAll("input[name='tickets']:checked");
    selectedTickets.forEach(ticket => {
      ticket.checked = false;
    });
  };

  const handleSeatClick = () => {
    handleTicketSelection();
  };

  return (
    <div className="center">
      <div className="tickets">
        <div className="ticket-selector">
          <div className="head">
            <div className="title">Ticket</div>
          </div>
          <div className="seats">
            <div className="status">
              <div className="item">Available</div>
              <div className="item">Booked</div>
              <div className="item">Selected</div>
            </div>
            <div className="all-seats">
              {Array.from({ length: 10 }, (_, index) => (
                <div key={index}>
                  <input type="checkbox" name="tickets" id={`s${index + 2}`} onClick={handleSeatClick} />
                  <label htmlFor={`s${index + 2}`} className="seat"></label>
                </div>
              ))}
            </div>
          </div>
          <div className="timings">
            <div className="dates">
              <label htmlFor="entryDate">Entry Date and Time:</label>
              <input type="datetime-local" id="entryDate" className="input_date" name="entryDate" onChange={handleTicketSelection} />
              <label htmlFor="exitDate">Exit Date and Time:</label>
              <input type="datetime-local" id="exitDate" name="exitDate" className="input_date" onChange={handleTicketSelection} />
            </div>
            <div className="hours">
              <label htmlFor="hours">Hours per Seat:</label>
              <input type="number" id="hours" className="input_date" min="1" step="1" defaultValue="1" onChange={handleTicketSelection} />
            </div>
          </div>
        </div>
        <div className="price">
          <div className="total">
            <span><span className="count">{totalCount}</span> Tickets </span>
            <div className="amount">{totalAmount}</div>
          </div>
          <button id="bookButton" type="button" onClick={bookTickets}>Book</button>
        </div>
      </div>
    </div>
  );
};

export default TicketBooking;
