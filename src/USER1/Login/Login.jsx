/*import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    async function loginUser(event) {
        event.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        } else {
            setError('');
        }

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Failed to login. Please try again later.');
        }
    }

    return (
        <section className="user-login-container">
            <div className="form-box">
                <div className="form-value">
                    <form onSubmit={loginUser}>
                        <h2>Login</h2>
                        <div className="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Email</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>Password</label>
                        </div>
                        <p style={{color: 'red'}}>{message}</p>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <div className="forget">
                            <label>
                                <input type="checkbox" />
                                Remember Me
                                <a href="#">Forget Password</a>
                            </label>
                        </div>
                        <button type="submit" id="user-login-btn">Log in</button>
                        <div id="user-register-link">
                            <p>
                                Don't have an account? <Link to="/Register">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;

*/
/* not producted code */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    async function loginUser(event) {
        event.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        } else {
            setError('');
        }

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Failed to login. Please try again later.');
        }
    }

    return (
        <section className="user-login-container">
            <div className="form-box">
                <div className="form-value">
                    <form onSubmit={loginUser}>
                        <h2>Login</h2>
                        <div className="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="userloginlabels">Email</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="userloginlabels">Password</label>
                        </div>
                        <p style={{color: 'red'}}>{message}</p>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <div className="forget">
                            <label>
                                <input type="checkbox" />
                                Remember Me
                                <a href="#">Forget Password</a>
                            </label>
                        </div>
                        <button type="submit" id="user-login-btn">Log in</button>
                        <div id="user-register-link">
                            <p>
                                Don't have an account? <Link to="/Register">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;