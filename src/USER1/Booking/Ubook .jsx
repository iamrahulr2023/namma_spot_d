import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Ubook.css";

const ParkingBooking = () => {
  const location = useLocation();
  const { city } = location.state || {};

  const [date, setDate] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [vehicleno, setVehicle] = useState('');
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [totalSlots, setTotalSlots] = useState(0);
  const [pricePerHour, setPricePerHour] = useState(10); // Default value, will be updated
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://nammaspot-backend.onrender.com/getseat', { params: { city } })
      .then(result => {
        console.log('Result from backend:', result.data);
        if (result.data && result.data.seat !== null) {
          setTotalSlots(result.data.seat);
          setSlots(Array(result.data.seat).fill(false));
          setBookedSlots(result.data.slots || []);
          setPricePerHour(result.data.price); // Fetch and set the price per hour
        } else {
          setError('Seat information is not available for this city.');
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      });
  }, [city]);

  const handleSlotChange = (index) => {
    if (bookedSlots.includes(getSlotLabel(index))) {
      return; // Do nothing if slot is already booked
    }
    const newSlots = [...slots];
    newSlots[index] = !newSlots[index];
    setSlots(newSlots);
  };

  const calculateTotalAmount = () => {
    if (!entryTime || !exitTime) return 0;
    const selectedSlots = slots.filter(slot => slot).length;
    const startTime = new Date(`1970-01-01T${entryTime}:00`);
    const endTime = new Date(`1970-01-01T${exitTime}:00`);
    const durationInHours = (endTime - startTime) / 3600000;
    return selectedSlots * pricePerHour * durationInHours;
  };

  const calculateSelectedSlots = () => {
    return slots.filter(slot => slot).length;
  };

  const getSlotLabel = (index) => {
    return (index + 1).toString();
  };

  const handleProceedToPayment = () => {
    const selectedSlotNumbers = slots
      .map((slot, index) => (slot ? getSlotLabel(index) : null))
      .filter(slot => slot !== null);

    navigate('/confirmbooking', {
      state: {
        slotNumbers: selectedSlotNumbers,
        entryTime,
        exitTime,
        date,
        vehicleno,
        totalAmount: calculateTotalAmount(),
        city,
      }
    });
  };

  const isSlotBooked = (index) => {
    return bookedSlots.includes(getSlotLabel(index));
  };

  return (
    <div className="parking-container">
      {error && <div className="error">{error}</div>}
      <div className="header">
        <label className='book-lbl'>Location:</label>
        <textarea id="book-txtarea" placeholder={city} readOnly></textarea>
        <span className="price-per-hour">${pricePerHour}/hour</span>
      </div>

      <div className='car-num'>
        <label className='book-lbl'>Vehicle number:</label>
        <input 
          className='book-input' 
          type='text'
          value={vehicleno}
          onChange={(e) => setVehicle(e.target.value)} 
        />
      </div>
      
      <label className='book-lbl'>Date of Booking Slot:</label>
      <input
        className='book-input'
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="timing">
        <div className="time-input">
          <label className='book-lbl'>Entry Time:</label>
          <input
            className='book-input'
            type="time"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
          />
        </div>
        <div className="time-input">
          <label className='book-lbl'>Exit Time:</label>
          <input
            className='book-input'
            type="time"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
          />
        </div>
      </div>

      <div className="details">
        <span>Number of Seats Booked: {calculateSelectedSlots()}</span>
        <span>Total Amount: ₹{calculateTotalAmount().toFixed(2)}</span>
      </div>

      <div className="slots">
        <label className='book-lbl'>Select Parking Slots:</label>
        <div className="grid">
          {slots.map((slot, index) => (
            <div 
              key={index} 
              className={`slot-container ${slot ? 'checked' : ''} ${isSlotBooked(index) ? 'booked' : ''}`}
              onClick={() => handleSlotChange(index)}
            >
              <label>{getSlotLabel(index)}</label>
              <input
                type="checkbox"
                checked={slot}
                onChange={() => handleSlotChange(index)}
                className="slot-checkbox"
                disabled={isSlotBooked(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <button className="proceed-button" onClick={handleProceedToPayment}>Book now</button>
    </div>
  );
};

export default ParkingBooking;