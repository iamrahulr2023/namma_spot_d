import React from "react";
import  { useState } from 'react';
import { Link } from "react-router-dom";
import "./Ad_reg.css";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

function Ad_reg() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const [ress, setRess] = useState('');
  const [cpass, setCPass] = useState('');
  
 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (!name || !email || !pass) {
      setError('Please fill in all fields.');
      return;
    }

    if(pass !== cpass){
      setError('Passwords are not equal.');
      return;
    }

    axios.post('https://nammaspot-backend.onrender.com/aregister', { name, email, pass })
      .then((res) => {
        console.log(res);
        navigate('/alogin');
      })
      .catch((err) => {
        console.log(err);
        setRess('Registration failed. Please try again.');
      });
  };

  return (
    <div id="admin-reg-page">
      <div className="admin-reg-container">
        <h1 className="form-title">Admin Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="main-admin-info">
            <div className="admin-input-box">
              <label for="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter Full Name"
                required
              />
            </div>
            <div className="admin-input-box">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
            <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={pass}
            onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
              <label for="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                required
              />
            </div>
            <div className="admin-input-box">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={cpass}
            onChange={(e) => setCPass(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
              <label for="admin-address">Address</label>
              <input
                type="text"
                id="admin-address"
                name="admin-address"
                placeholder="Address"
                required
              />
            </div>
            <div className="admin-input-box">
              <label for="id-proof">ID-Proof</label>
              <input
                type="file"
                name="fileToUpload"
                id="fileToUpload"
                accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
              />
              <br />
            </div>
          </div>
          <p>{ress}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="gender-details-box">
            <span className="gender-title">Gender</span>
            <div className="gender-category">
              <input type="radio" name="gender" id="male" />
              <label for="male">Male</label>
              <input type="radio" name="gender" id="female" />
              <label for="female">Female</label>
              <input type="radio" name="gender" id="other" />
              <label for="other">Other</label>
            </div>
            <div className="gender-category">
              <label>
                <input type="checkbox" name="terms" required /> I agree to the
                <a href="#">Terms and Conditions</a>
              </label>
            </div>

            <div id="admin-login-link">
              <p>
                Already have an account <Link to="/alogin">Login</Link>
              </p>
            </div>
          </div>
          <div class="form-submit-btn">
            <input type="submit" value="Register" />
          </div>
        </form>
          
       
      </div>
    </div>
  );
}

export default Ad_reg;