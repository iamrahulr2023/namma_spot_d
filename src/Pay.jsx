import React from 'react'
import axios from "axios";
import { useState } from "react";
import './index.css'

const Pay = ({Total = 100}) => {
  const [book, setBook] = useState({
		name: "user1",
		author: "John Green",
		img: "https://imges-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
		price: 250,
	});

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
			const { data } = await axios.post(orderUrl, { amount: Total+5 });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};
  return (
    <div className='deliboxmain'>
    
       <p>$ {Total+5}</p>

       <button type='submit' onClick={handlePayment} className='proceed'>Proceed To Payment</button>
    </div>
  )
}

export default Pay
