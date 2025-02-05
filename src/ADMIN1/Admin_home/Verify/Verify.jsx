import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useLanguage } from '../../../USER1/Homepage/LanguageContext';
import './Verify.css';

const translations = {
  en: {
    verify: "Verify",
    enterPin: "Enter PIN",
    verifyButton: "Verify",
    enterSeats: "Enter seats to free (comma separated)",
    in: "IN",
    out: "Out",
    userDetails: "User Details",
    slotNumbers: "Slot Numbers",
    date: "Date",
    vehicleNumber: "Vehicle Number",
    totalAmount: "Total Amount",
    city: "City",
    successMatch: "Successfully matched",
    noMatch: "No match found",
    slotsFreed: "Slots freed successfully",
    pinNotFound: "PIN not found",
    youAreIn: "YOU ARE IN",
    youAreOut: "YOU ARE OUT",
    loadingError: "Error loading data",
  },
  ta: {
    verify: "சரிபார்க்கவும்",
    enterPin: "பின் எண் உள்ளிடவும்",
    verifyButton: "சரிபார்க்கவும்",
    enterSeats: "விடுவதற்கான இடங்களை உள்ளிடவும் (கமா பிரித்து)",
    in: "உள்",
    out: "வெளியே",
    userDetails: "பயனர் விவரங்கள்",
    slotNumbers: "இட எண்கள்",
    date: "தேதி",
    vehicleNumber: "வாகன எண்",
    totalAmount: "மொத்த தொகை",
    city: "நகரம்",
    successMatch: "வெற்றிகரமாக பொருந்தியது",
    noMatch: "பொருந்துதல் இல்லை",
    slotsFreed: "இடங்கள் வெற்றிகரமாக விடுவிக்கப்பட்டது",
    pinNotFound: "பின் எண் காணப்படவில்லை",
    youAreIn: "நீங்கள் உள்ளே உள்ளீர்கள்",
    youAreOut: "நீங்கள் வெளியே உள்ளீர்கள்",
    loadingError: "தரவுகளை ஏற்றுவதில் பிழை",
  },
  hi: {
    verify: "सत्यापित करें",
    enterPin: "पिन दर्ज करें",
    verifyButton: "सत्यापित करें",
    enterSeats: "मुक्त करने के लिए सीटें दर्ज करें (अल्पविराम से अलग करें)",
    in: "अंदर",
    out: "बाहर",
    userDetails: "उपयोगकर्ता विवरण",
    slotNumbers: "स्लॉट नंबर",
    date: "तारीख",
    vehicleNumber: "वाहन नंबर",
    totalAmount: "कुल राशि",
    city: "शहर",
    successMatch: "सफलतापूर्वक मेल खाया",
    noMatch: "कोई मेल नहीं मिला",
    slotsFreed: "स्लॉट सफलतापूर्वक मुक्त किए गए",
    pinNotFound: "पिन नहीं मिला",
    youAreIn: "आप अंदर हैं",
    youAreOut: "आप बाहर हैं",
    loadingError: "डेटा लोड करने में त्रुटि",
  },
};

const Verify = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [seatsToFree, setSeatsToFree] = useState('');
  const [matchedDoc, setMatchedDoc] = useState(null);
  const [latestNumber, setLatestNumber] = useState();
  const [otp, setOTP] = useState('');
  const [otpSent, setOTPSent] = useState(false);
  const [otpVerified, setOTPVerified] = useState(false);
  const [email , setEmail] = useState("");
  const [noti, setNoti] = useState('');
  
  const {
    verify,
    enterPin,
    verifyButton,
    enterSeats,
    in: inButton,
    out,
    userDetails,
    slotNumbers,
    date,
    vehicleNumber,
    totalAmount,
    city,
    successMatch,
    noMatch,
    slotsFreed,
    pinNotFound,
    youAreIn,
    youAreOut,
    loadingError,
  } = translations[language] || translations.en;

  useEffect(() => {
    axios.get('https://nammaspot-backend.onrender.com/getpins')
      .then(result => setData(result.data))
      .catch(err => console.error(loadingError, err));

    axios.get('https://nammaspot-backend.onrender.com/getnumber')
      .then(result => setLatestNumber(result.data.number))
      //.then(result => console.log(result.data.number))
      .catch(err => console.error(err));

    axios.get('https://nammaspot-backend.onrender.com/getname')
      .then(result => setEmail(result.data.email))
      .catch(err => console.log(err));
  }, [loadingError]);

  const handleVerify = () => {
    const pinData = data.find(item => item.pin === parseInt(pin));
    if (pinData) {
      setMessage(successMatch);
      setMatchedDoc(pinData);
    } else {
      setMessage(noMatch);
      setMatchedDoc(null);
    }
  };

  const handleOut = () => {
    const pinData = data.find(item => item.pin === parseInt(pin));
    if (pinData) {
      axios.post('https://nammaspot-backend.onrender.com/freeupslots', {
        pin: parseInt(pin),
        seatsToFree: seatsToFree.split(',').map(seat => seat.trim())
      })
        .then(() => setMessage(slotsFreed))
        .catch(err => console.error(err));
    } else {
      setMessage(pinNotFound);
    }
  };

  const handleIn = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://nammaspot-backend.onrender.com/putnoti', { noti: youAreIn });
      sendNotification(youAreIn);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleOutButton = async () => {
    if (!otpVerified) {
      try {
        await requestOTP();
        setOTPSent(true);
      } catch (error) {
        console.error('Error requesting OTP:', error);
      }
    } else {
      setNoti(youAreOut);
      try {
        await axios.post('https://nammaspot-backend.onrender.com/putnoti', { noti: youAreOut });
        sendNotification(youAreOut);
        handleOut();
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('https://nammaspot-backend.onrender.com/verifyOTPnew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      const data = await response.json();
      if (data.message === 'OTP Verified Successfully') {
        setOTPVerified(true);
        setNoti(youAreOut);
        try {
          await axios.post('https://nammaspot-backend.onrender.com/putnoti', { noti: youAreOut });
          sendNotification(youAreOut);
          handleOut();
        } catch (error) {
          console.error('Error sending notification:', error);
        }
      } else {
        console.log('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const requestOTP = async () => {
    try {
      const response = await fetch('https://nammaspot-backend.onrender.com/reqOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      setMessage(data.message);
      if (data.message === 'OTP Sent Successfully') {
        setOTPSent(true);
      }
    } catch (error) {
      console.error('Error requesting OTP:', error);
      setMessage('Failed to request OTP. Please try again later.');
    }
  };

  const sendNotification = (notificationMessage) => {
    axios.post('https://nammaspot-backend.onrender.com/sendNotification', {
      number: latestNumber,
      message: notificationMessage
    })
      .then(response => {
        console.log('Notification sent:', response.data);
      })
      .catch(err => console.error('Error sending notification:', err));
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    const handleScanSuccess = (decodedText) => {
      setPin(decodedText);
      handleVerify();
    };

    const handleScanFailure = (error) => {
      console.warn(`QR error = ${error}`);
    };

    scanner.render(handleScanSuccess, handleScanFailure);

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, []);

  return (
    <div className="verify-app">
      <div className="body18">
        <h1>{verify}</h1>
        <div className="verify-container">
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder={enterPin}
          />
          <button className="verify-button" onClick={handleVerify}>{verifyButton}</button>
          <h2 className="verify-message">{message}</h2>
          {otpSent && !otpVerified && (
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter OTP"
              />
              <button onClick={handleVerifyOTP}>Verify OTP</button>
            </div>
          )}
          <input
            type="text"
            value={seatsToFree}
            onChange={(e) => setSeatsToFree(e.target.value)}
            placeholder={enterSeats}
          />
          <div className="verify-buttons">
            <button className="verify-in" onClick={handleIn}>{inButton}</button>
            <button className="verify-out" onClick={handleOutButton}>{out}</button>
          </div>
        </div>
        {matchedDoc && (
          <div className="verify-details">
            <h3>{userDetails}</h3>
            <p>{slotNumbers}: <span className='datas'>{matchedDoc.slotNumbers.join(', ')}</span></p>
            <p>{date}: <span className='datas'>{matchedDoc.date}</span></p>
            <p>{vehicleNumber}: <span className='datas'>{matchedDoc.vehicleno}</span></p>
            <p>{totalAmount}: <span className='datas'>{matchedDoc.totalAmount}</span></p>
            <p>{city}: <span className='datas'>{matchedDoc.city}</span></p>
          </div>
        )}
        <div id="reader"></div>
      </div>
    </div>
  );
};

export default Verify;
