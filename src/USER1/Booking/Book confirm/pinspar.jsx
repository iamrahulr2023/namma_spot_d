import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Pingenerate.css";

const Pin = () => {
  const location = useLocation();
  const { pin } = location.state || {};
  const [recentData, setRecentData] = useState(null);

  useEffect(() => {
    // Fetch user confirmation data
    axios.get('https://nammaspot-backend.onrender.com/getuserconfirmdata')
      .then(result => {
        setRecentData(result.data);

        // Ensure recentData.slotNumbers is an array
        const slotNumbers = result.data.slotNumbers || [];

        // Send update request after setting recentData
        axios.post('https://nammaspot-backend.onrender.com/updatepins', {
          city: result.data.city,
          slots: slotNumbers
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        // Get additional user data
        Promise.all([
          axios.get('https://nammaspot-backend.onrender.com/getuserdata'),
          axios.get('https://nammaspot-backend.onrender.com/getname')
        ])
        .then(([userDataResponse, userNameResponse]) => {
          // Post confirmation booking
          axios.post('https://nammaspot-backend.onrender.com/postconfirmbooking', {
            userData: userDataResponse.data,
            userName: userNameResponse.data
          })
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ticket-container">
      <h1 className="ticket-header">Your PIN</h1>
      <h2 className="ticket-details">{pin}</h2>
      {recentData && (
        <div className="ticket-details">
          <h3>Recent Booking Details:</h3>
          <h2>Entry Time: {recentData.entryTime}</h2>
          <h2>Exit Time: {recentData.exitTime}</h2>
          <h2>Date: {recentData.date}</h2>
          <h2>Vehicle Number: {recentData.vehicleno}</h2>
          <h2>Slot Numbers: {recentData.slotNumbers.join(', ')}</h2>
          <h2>Total Amount: ${recentData.totalAmount}</h2>
          <Link to="/home"><button><h2>OK</h2></button></Link>
        </div>
      )}
    </div>
  );
};

export default Pin;
