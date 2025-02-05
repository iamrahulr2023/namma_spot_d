import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Reg.css";



const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    async function requestOTP() {
        try {
            const response = await fetch('http://localhost:3001/reqOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            setMessage(data.message);
            if (data.message === 'OTP Sent Successfully') {
                setOtpSent(true);
            }
        } catch (error) {
            console.error('Error requesting OTP:', error);
            setMessage('Failed to request OTP. Please try again later.');
        }
    }

    async function registerUser(event) {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, number,otp })
            });

            const data = await response.json();

            if (data.message === 'OTP Verified Successfully') {
                setMessage('Registration successful, please login.');
                navigate('/login');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage('Failed to register user. Please try again later.');
        }
    }

    return (
        <div className="user-reg-body">
            <div className="user-reg-container">
                <h1 className="form-title">Registration</h1>
                <form onSubmit={registerUser}>
                    <div className="main-user-info">
                        <div className="user-input-box">
                            <label htmlFor="username">Name</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="user-input-box">
                            <label htmlFor="number">Phone No</label>
                            <input
                                type="text"
                                id="number"
                                name="number"
                                placeholder="Enter Number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                       
                        <div className="user-input-box">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="user-input-box">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                     
                        {otpSent && (
                            <div className="user-input-box">
                                <label htmlFor="otp">OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <p>{message}</p>
                    <div className="form-submit-btn">
                        {!otpSent && (
                            <button type="button" onClick={requestOTP}>
                                Request OTP
                            </button>
                        )}
                        <input type="submit" value="Register" />
                    </div>
                </form>
                <div id="user-login-link">
                    <p>
                        Already have an account <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;