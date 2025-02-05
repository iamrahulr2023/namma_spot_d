import React from 'react'
import { Link } from "react-router-dom";
import "./Ad_login.css"
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Ad_login() {
  const [error,seterror] = useState("");
const [email,setemail] = useState('')
const [pass , setpass ]= useState('')
const navigate = useNavigate()
const [ress,setress] = useState()

const handleSubmit =(e)=>{

  e.preventDefault()

    // Check if any required field is empty
    if ( !email || !pass) {
      seterror('Please fill in all fields.');
      return;
    }
    else{
      seterror("")
    }
      
     
       axios.post('http://localhost:3001/alogin',{email , pass})
       .then(res => {console.log(res)
      
        if(res.data ==="success"){

           navigate('/Adminhome')
        }
        else{
            setress(res.data) 
        }     
      }) 
       .catch(err => console.log(err))    
}

  return (
    <section id="admin-login-page">
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input type="email" required 
              value={email}
              onChange={(e)=> setemail(e.target.value)}/>
              <label id="adminlabels">Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" required 
              value={pass}
              onChange={(e)=> setpass(e.target.value)}/>
              <label id="adminlabels">Password</label>
            </div>
            <p style={{color:"red"}}>{ress}</p>
{error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="forget">
              <label>
                <input type="checkbox" />
                Remember Me
                <a href="#">Forget Password</a>
              </label>
            </div>
            <button type="submit" id="admin-login-btn">Log in</button>
            <div id="admin-register-link">
              <p>
                Don't have an account? <Link to="/areg">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Ad_login