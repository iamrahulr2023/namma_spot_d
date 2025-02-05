import React, { useState } from 'react';
import './Book.css';
import { useLocation, Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDetailsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [seat, setSeat] = useState("");
  const [des, setDes] = useState("");
  const [place, setPlace] = useState("");

  const city = new URLSearchParams(location.search).get('city');
  const status = new URLSearchParams(location.search).get('status') || null;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/adddata', { city, place, seat, des, company, price, status })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    navigate("/AdminHome");
  };

  return (
    <div className="bodybook">
      <div className="container-add-details">
        <form onSubmit={handleSubmit} className="form-add-details">
          <h2>ADD DETAILS</h2>
          <p>{city}</p>
          <label htmlFor="place">ADD PLACE:</label>
          <input type="text" id="place" name="place" onChange={(e) => setPlace(e.target.value)} />
          <label htmlFor="company">COMPANY NAME:</label>
          <input required type="text" id="company" name="company" onChange={(e) => setCompany(e.target.value)} />
          <label htmlFor="description">DESCRIPTION:</label>
          <input required type="text" id="description" name="description" onChange={(e) => setDes(e.target.value)} />
          <label htmlFor="seats">SET NO OF SEATS:</label>
          <input type="number" id="seats" name="seats" required onChange={(e) => setSeat(e.target.value)} />
          <label htmlFor="price">SET PRICE PER HRS:</label>
          <input required type="number" id="price" name="price" onChange={(e) => setPrice(e.target.value)} />
          <button type="submit" className='btnsave' id='ad-slot-save-btn'>Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddDetailsForm;

/*import React,{ useState }  from 'react';
import './Book.css';
import { useLocation,Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDetailsForm = () => {
    const location = useLocation();
    const navigate = useNavigate()

  const [company ,setcompany] = useState();
  const [price,setprice] = useState("");
  const [seat ,setseat] = useState("");
  const [des ,setdes] = useState("");
  const [place ,setplace] = useState("");

    const city = new URLSearchParams(location.search).get('city');

    const handlesubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/adddata',{ city ,place,seat,des,company,price})
        .then(res => console.log(res))
        .catch(err => console.log(err));
        navigate("/AdminHome")
      };
    return (
      <div className="bodybook">
        <div className="container-add-details">
            <form  onSubmit={handlesubmit} className="form-add-details">
                <h2>ADD DETAILS</h2>
                <p>{city}</p>
                <label htmlFor="place">ADD PLACE:</label>
                <input type="text" id="place" name="place"
                 onChange={(e) => setplace(e.target.value)} />
                
                <label htmlFor="company">COMPANY NAME:</label>
                <input required type="text" id="company" name="company"  onChange={(e) => setcompany(e.target.value)}/>
                
                <label htmlFor="description">DESCRIPTION:</label>
                <input required type="text" id="description" name="description"  onChange={(e) => setdes(e.target.value)} />
                
                <label htmlFor="seats">SET NO OF SEATS:</label>
                <input type="number" id="seats" name="seats" required  onChange={(e) => setseat(e.target.value)}/>
                
                <label htmlFor="price">SET PRICE PER HRS:</label>
                <input required type="number" id="price" name="price"  onChange={(e) => setprice(e.target.value)}/>
                
                <button type="submit" className='btnsave' id='ad-slot-save-btn'>Save</button>
            </form>
        </div>
        </div>
    );
};

export default AddDetailsForm;
*/