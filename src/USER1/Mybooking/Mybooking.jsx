import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Mybooking.css';

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState({ upcoming: [], completed: [], cancelled: [] });
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getconfirmbo');
      const fetchedBookings = response.data;
      const currentDate = new Date();

      const upcomingBookings = fetchedBookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return !booking.date || bookingDate > currentDate;
      });

      const completedBookings = fetchedBookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return booking.date && bookingDate <= currentDate;
      });

      setBookings({
        upcoming: upcomingBookings,
        completed: completedBookings,
        cancelled: [],
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchCancelledBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getcancelledbo');
      const cancelledBookings = response.data;
      setBookings((prevBookings) => ({
        ...prevBookings,
        cancelled: cancelledBookings,
      }));
    } catch (error) {
      console.error('Error fetching cancelled bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchCancelledBookings();
  }, []);

  const cancelBooking = async (booking) => {
    try {
      await axios.delete(`http://localhost:3001/deleteupcoming/${booking._id}`);
      await axios.post('http://localhost:3001/cancellbooking', booking);

      setBookings((prevBookings) => {
        const updatedUpcoming = prevBookings.upcoming.filter((b) => b._id !== booking._id);
        return {
          ...prevBookings,
          upcoming: updatedUpcoming,
          cancelled: [...prevBookings.cancelled, booking],
        };
      });

      console.log(`Cancelled booking with ID: ${booking._id}`);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const navigateToRouteMap = (city) => {
    navigate('/routemap', { state: { endLocation: city } });
  };

  const renderBookings = (type) => {
    return bookings[type].map((booking) => (
      <div key={booking._id} className={`booking-item ${type}`}>
        <h3>{type === 'upcoming' ? 'Upcoming Booking' : type === 'completed' ? 'Completed Booking' : 'Cancelled Booking'}</h3>
        <p>Date: {booking.date ? booking.date : 'N/A'}</p>
        <p>City: {booking.city ? booking.city : 'N/A'}</p>
        <p>Slot: {booking.slotNumbers && booking.slotNumbers.length > 0 ? booking.slotNumbers.join(', ') : 'N/A'}</p>
        <p>Amount: {booking.totalAmount ? `$${booking.totalAmount}` : 'N/A'}</p>
        {type === 'upcoming' && (
          <div className="actions">
            <button className="cancel-btn" onClick={() => cancelBooking(booking)}>Cancel Booking</button>
            <div className="route-btn" onClick={() => navigateToRouteMap(booking.city)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
  <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/>
</svg></div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="body16">
      <div className="userpage">
        <div className="tabs">
          <button className={activeTab === 'upcoming' ? 'active' : ''} onClick={() => setActiveTab('upcoming')}>
            Upcoming Bookings
          </button>
          <button className={activeTab === 'completed' ? 'active' : ''} onClick={() => setActiveTab('completed')}>
            Completed Bookings
          </button>
          <button className={activeTab === 'cancelled' ? 'active' : ''} onClick={() => setActiveTab('cancelled')}>
            Cancelled Bookings
          </button>
        </div>
        <div className="content">
          {activeTab === 'upcoming' && renderBookings('upcoming')}
          {activeTab === 'completed' && renderBookings('completed')}
          {activeTab === 'cancelled' && renderBookings('cancelled')}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
