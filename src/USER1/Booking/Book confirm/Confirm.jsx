import React from "react";
import { useLocation , useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Confirm.css";
import axios from "axios";
import { useEffect } from "react";

const ConfirmationPage = ({Total =100}) => {
const navigate = useNavigate()
  const [book, setBook] = useState({
		name: "user1",
		author: "John Green",
		img: "https://imges-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
		price: 250,
	});

  const location = useLocation();
  const {
    slotNumbers = [], 
    entryTime = "", 
    exitTime = "", 
    date = "", 
    vehicleno = "",
    totalAmount ="0",
    city ="" 
  } = location.state || {};

//
  const [pin, setPin] = useState('');

  const generatePin = () => {
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    setPin(newPin);
  };

  useEffect(() => {
    generatePin();
  }, []);
  //

	let KEY_ID = "rzp_test_CMsB4Ic9wCgo4O"
	const initPayment = (data) => {
		const options = {
			key: KEY_ID,
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "https://nammaspot-backend.onrender.com/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);

          navigate("/pin", { state: { pin } });

				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "https://nammaspot-backend.onrender.com/api/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: parseInt(totalAmount) });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};
  //////

  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post('https://nammaspot-backend.onrender.com/adddetails', { slotNumbers, entryTime, exitTime, date, vehicleno, totalAmount ,pin,city})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  ////
  

 
  return (
    <div className="confirmation-container">
      <form onSubmit={handlesubmit}>
        <div className="confirmation-details">
          <h3>Booking Confirmation</h3>
          <div className="detail">
            <label className="confirm-label">Slot Numbers:</label>
            <input className="confirm-input" type="text" value={slotNumbers.join(", ")} readOnly />
          </div>
          <div className="confirm-detail">
            <label className="confirm-label">Vehicle number:</label>
            <input className="confirm-input" type="text" value={vehicleno} readOnly />
          </div>
          <div className="confirm-detail">
            <label className="confirm-label">Entry Time:</label>
            <input className="confirm-input" type="text" value={entryTime} readOnly />
          </div>
          <div className="confirm-detail">
            <label className="confirm-label">Exit Time:</label>
            <input className="confirm-input" type="text" value={exitTime} readOnly />
          </div>
          <div className="confirm-detail">
            <label className="confirm-label">Date of Booking:</label>
            <input className="confirm-input" type="text" value={date} readOnly />
          </div>
          <div className="confirm-detail">
            <label className="confirm-label">Total Amount:</label>
            <input className="confirm-input" type="text" value={`₹${totalAmount.toFixed(2)}`} readOnly />
          </div>
        </div>
        <div className="book-confirm-buttons">
          <Link to="/booking">
            <button>Edit Details</button>
          </Link>


          <div className='deliboxmain'>
    
    <h3>₹{totalAmount}</h3>

 </div>



          <button type="submit" id="proceedtopayementuser" onClick={handlePayment}>Proceed to Payment</button>
        </div>
      </form>
     
    </div>
  );
};

export default ConfirmationPage;
