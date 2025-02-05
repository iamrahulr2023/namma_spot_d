// VerifyOTP.js

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');

    async function verifyOTP(event) {
        event.preventDefault();
        const email = location.state.email;

        try {
            const response = await fetch('http://localhost:3001/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (data.message === 'OTP Verified Successfully') {
                navigate('/Home');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    }

    return (
        <div>
            <h1>Verify OTP</h1>
            <form onSubmit={verifyOTP}>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                />
                <br />
                <button type="submit">Verify OTP</button>
            </form>
        </div>
    );
};

export default VerifyOTP;
