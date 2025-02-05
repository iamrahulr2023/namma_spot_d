import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import "./Book.css"
import axios from 'axios';

const Book2 = () => {
  const location = useLocation();
  const [company ,setcompany] = useState();
  const [rate ,setrate] = useState("");
  const [slot ,setslot] = useState("");
  const [des ,setdes] = useState("");
  const [area ,setarea] = useState("");

  const handlesubmit = (e)=>{
    e.preventDefault();
    axios.post('https://nammaspot-backend.onrender.com/add',{city, area,slot,des,company,rate})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };

  const city = new URLSearchParams(location.search).get('city');

  return (
    <div>
      <h2>Book</h2>
      <h2>City: {city}</h2>
      <div className="bookbox">
        <h2>Parking Booking Form (Admin)</h2>
        <form onSubmit={(e)=>handlesubmit(e)}>
          <label htmlFor="company">Company:</label><br />
          <input type="text" id="company" name="company"
           placeholder="Enter company name" 
           value={company}
           onChange={(e) => setcompany(e.target.value)}
           /><br />

          <label htmlFor="rate">Rate (per Hour):</label><br />
          <input type="text" id="rate" name="rate" placeholder="Enter rate per hour"  value={rate}
          onChange={(e) => setrate(e.target.value)}/><br />
          <label htmlFor="area">Area:</label><br />
          <input type="text" id="area" name="area" placeholder="Enter area"  value={area}
          onChange={(e) => setarea(e.target.value)} /><br />
          <label htmlFor="slot">Slot:</label><br />
          <input type="text" id="slot" name="slot" placeholder="Enter number of available slots"  value={slot}
            onChange={(e) => setslot(e.target.value)}/><br />
          <label htmlFor="hours">description:</label><br />
          <input type="text" id="hours" name="hours" placeholder="Enter describtion"   value={des}
           onChange={(e) => setdes(e.target.value)}  /><br /><br />
          <Link to="/map"><input type="submit" value="Book" />book</Link>
        </form> 
      </div>
    </div>
  );
}

export default Book2;

/* index.css */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
  }
  
  .book-container {
    padding: 20px;
  }
  
  .bookbox {
    width: 60%;
    margin: 0 auto;
    padding: 50px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .booking-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .form-label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: calc(100% - 20px);
  }
  
  .form-button {
    padding: 10px;
    border-radius: 4px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .form-button:hover {
    background-color: #0056b3;
  }