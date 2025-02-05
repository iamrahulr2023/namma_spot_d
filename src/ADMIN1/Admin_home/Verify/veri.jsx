import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Verify = () => {
  const [data, setData] = useState([]);
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/getpins')
      .then(result => setData(result.data))
      .catch(err => console.log(err));
  }, []);



  const handleVerify = () => {
    const pinExists = data.some(item => item.pin === parseInt(pin));
    if (pinExists) {
      setMessage('Successfully matched');
    } else {
      setMessage('No match found');
    }
  };

  return (
    <div>
      <h1>Verify</h1>
      <input
        type="text"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
      />
      <button onClick={handleVerify}>Verify</button>
      <br />
      <h2 style={{color:"red"}}>{message}</h2>
      <br />
      <button>In</button>
      <br />
      <button>Out</button>
    </div>
  );
};

export default Verify;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Verify = () => {
  const [data, setData] = useState([]);
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/getpined')
      .then(result => setData(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleVerify = () => {
    const pinExists = data.some(item => item.pin === parseInt(pin));
    if (pinExists) {
      setMessage('Successfully matched');
    } else {
      setMessage('No match found');
    }
  };

  const handleOut = () => {
    const pinData = data.find(item => item.pin === parseInt(pin));
    if (pinData) {
      axios.post('http://localhost:3001/freeupslots', { pin: parseInt(pin) })
        .then(response => setMessage('Slots freed successfully'))
        .catch(err => console.log(err));
    } else {
      setMessage('PIN not found');
    }
  };

  return (
    <div>
      <h1>Verify</h1>
      <input
        type="text"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
      />
      <button onClick={handleVerify}>Verify</button>
      <br />
      <h2 style={{color:"red"}}>{message}</h2>
      <br />
      <button>In</button>
      <br />
      <button onClick={handleOut}>Out</button>
    </div>
  );
};

export default Verify;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Verify = () => {
  const [data, setData] = useState([]);
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [seatsToFree, setSeatsToFree] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/getpins')
      .then(result => setData(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleVerify = () => {
    const pinExists = data.some(item => item.pin === parseInt(pin));
    if (pinExists) {
      setMessage('Successfully matched');
    } else {
      setMessage('No match found');
    }
  };

  const handleOut = () => {
    const pinData = data.find(item => item.pin === parseInt(pin));
    if (pinData) {
      axios.post('http://localhost:3001/freeupslots', { 
        pin: parseInt(pin),
        seatsToFree: seatsToFree.split(',').map(seat => seat.trim())
      })
        .then(response => setMessage('Slots freed successfully'))
        .catch(err => console.log(err));
    } else {
      setMessage('PIN not found');
    }
  };


  axios.post('http://localhost:3001/completedbooking',{data})
  .then(res=>console.log(res))

  axios.delete('http://localhost:3001/upcomingcomingbooking',{data})
  .then(res=>console.log(res))
  

  return (
    <div>
      <h1>Verify</h1>
      <input
        type="text"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
      />
      <button onClick={handleVerify}>Verify</button>
      <br />
      <h2 style={{color:"red"}}>{message}</h2>
      <br />
      <input
        type="text"
        value={seatsToFree}
        onChange={(e) => setSeatsToFree(e.target.value)}
        placeholder="Enter seats to free (comma separated)"
      />
      <button onClick={handleOut}>Out</button>
    </div>
  );
};

export default Verify;
///new

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Verify = () => {
  const [data, setData] = useState([]);
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [seatsToFree, setSeatsToFree] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/getpins')
      .then(result => setData(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleVerify = () => {
    const pinExists = data.some(item => item.pin === parseInt(pin));
    if (pinExists) {
      setMessage('Successfully matched');
    } else {
      setMessage('No match found');
    }
  };

  const handleOut = async () => {
    const pinData = data.find(item => item.pin === parseInt(pin));
    if (pinData) {
      try {
        // Fetch the booking document by pin
        const response = await axios.get('http://localhost:3001/getconfirmbo');
        const booking = response.data.find(item => item.pin === parseInt(pin));

        if (booking) {
          // Delete the booking from the confirm_booking collection
          await axios.delete(`http://localhost:3001/upcomingbooking/${booking._id}`);
          
          // Add the booking to the completed_booking collection
          await axios.post('http://localhost:3001/completedbooking', booking);

          // Update the state
          setData(data.filter(item => item.pin !== parseInt(pin)));
          setMessage('Booking moved to completed successfully');

          // Free up slots
          await axios.post('http://localhost:3001/freeupslots', { 
            pin: parseInt(pin),
            seatsToFree: seatsToFree.split(',').map(seat => seat.trim())
          });

        } else {
          setMessage('Booking not found');
        }
      } catch (error) {
        console.error('Error processing booking:', error);
        setMessage('Error processing booking');
      }
    } else {
      setMessage('PIN not found');
    }
  };

  return (
    <div>
      <h1>Verify</h1>
      <input
        type="text"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
      />
      <button onClick={handleVerify}>Verify</button>
      <br />
      <h2 style={{color:"red"}}>{message}</h2>
      <br />
      <input
        type="text"
        value={seatsToFree}
        onChange={(e) => setSeatsToFree(e.target.value)}
        placeholder="Enter seats to free (comma separated)"
      />
      <button onClick={handleOut}>Out</button>
    </div>
  );
};

export default Verify;

///old 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Verify = () => {
  const [data, setData] = useState([]);
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [seatsToFree, setSeatsToFree] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/getpins')
      .then(result => setData(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleVerify = () => {
    const pinExists = data.some(item => item.pin === parseInt(pin));
    if (pinExists) {
      setMessage('Successfully matched');
    } else {
      setMessage('No match found');
    }
  };

  const handleOut = () => {
    const pinData = data.find(item => item.pin === parseInt(pin));
    if (pinData) {
      axios.post('http://localhost:3001/freeupslots', { 
        pin: parseInt(pin),
        seatsToFree: seatsToFree.split(',').map(seat => seat.trim())
      })
        .then(response => setMessage('Slots freed successfully'))
        .catch(err => console.log(err));
    } else {
      setMessage('PIN not found');
    }
  };


  axios.post('http://localhost:3001/completedbooking',{data})
  .then(res=>console.log(res))

  axios.delete('http://localhost:3001/upcomingcomingbooking',{data})
  .then(res=>console.log(res))
  

  return (
    <div>
      <h1>Verify</h1>
      <input
        type="text"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
      />
      <button onClick={handleVerify}>Verify</button>
      <br />
      <h2 style={{color:"red"}}>{message}</h2>
      <br />
      <input
        type="text"
        value={seatsToFree}
        onChange={(e) => setSeatsToFree(e.target.value)}
        placeholder="Enter seats to free (comma separated)"
      />
      <button onClick={handleOut}>Out</button>
    </div>
  );
};

export default Verify;

///chat
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Verify = () => {
  const [data, setData] = useState([]);
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [seatsToFree, setSeatsToFree] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/getpins')
      .then(result => setData(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleVerify = () => {
    const pinExists = data.some(item => item.pin === parseInt(pin));
    if (pinExists) {
      setMessage('Successfully matched');
    } else {
      setMessage('No match found');
    }
  };

  const handleOut = async () => {
    const pinData = data.find(item => item.pin === parseInt(pin));
    if (pinData) {
      try {
        // Fetch the booking document by pin
        const response = await axios.get('http://localhost:3001/getconfirmbo');
        const booking = response.data.find(item => item.pin === parseInt(pin));

        if (booking) {
          // Delete the booking from the confirm_booking collection
          await axios.delete(`http://localhost:3001/upcomingbooking/${booking._id}`);
          
          // Add the booking to the completed_booking collection
          await axios.post('http://localhost:3001/completedbooking', booking);

          // Update the state
          setData(data.filter(item => item.pin !== parseInt(pin)));
          setMessage('Booking moved to completed successfully');

          // Free up slots
          await axios.post('http://localhost:3001/freeupslots', { 
            pin: parseInt(pin),
            seatsToFree: seatsToFree.split(',').map(seat => seat.trim())
          });

        } else {
          setMessage('Booking not found');
        }
      } catch (error) {
        console.error('Error processing booking:', error);
        setMessage('Error processing booking');
      }
    } else {
      setMessage('PIN not found');
    }
  };

  return (
    <div>
      <h1>Verify</h1>
      <input
        type="text"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
      />
      <button onClick={handleVerify}>Verify</button>
      <br />
      <h2 style={{color:"red"}}>{message}</h2>
      <br />
      <input
        type="text"
        value={seatsToFree}
        onChange={(e) => setSeatsToFree(e.target.value)}
        placeholder="Enter seats to free (comma separated)"
      />
      <button onClick={handleOut}>Out</button>
    </div>
  );
};

export default Verify;

// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const confirmSchema = require('./models/confirmSchema');
const completedSchema = require('./models/completedSchema');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bookingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const confirm = mongoose.model('confirm', confirmSchema);
const completed = mongoose.model('completed', completedSchema);

app.get('/getconfirmbo', (req, res) => {
  confirm.find({})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/cancellbooking', (req, res) => {
  const newBooking = new completed({
    date: req.body.date,
    city: req.body.city,
    slotNumbers: req.body.slotNumbers,
    totalAmount: req.body.totalAmount,
  });

  newBooking.save()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.delete('/deleteupcoming/:id', (req, res) => {
  const bookingId = req.params.id;
  confirm.findByIdAndDelete(bookingId)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/completedbooking', (req, res) => {
  const newBooking = new completed({
    date: req.body.date,
    city: req.body.city,
    slotNumbers: req.body.slotNumbers,
    totalAmount: req.body.totalAmount,
  });

  newBooking.save()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.App {
  text-align: center;
  background-color: #0d2238; /* Blue background color */
  padding: 20px;
  min-height: 100vh; /* Ensures the background covers the full viewport height */
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  background-color: #28a745; 
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: inline-block;
  color: white;
}

.container {
  background-color: white;
  padding: 40px; /* Increased padding for more spacing */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px; /* Set maximum width */

  margin-left: -100px;/* Centering the container */
}

input {
  width: calc(100% - 22px);
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:first-of-type {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  margin: 10px 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button#verify {
  background-color: blue; /* Blue background color */
  color: white; /* Text color */
  /* You can add other styling properties here */
}

button#in {
  background-color: #28a745;
  color: white;
}

button#out {
  background-color: #dc3545;
  color: white;
}

button:hover {
  opacity: 0.8;
}

.success {
  color: red;
  font-size: 18px;
  margin: 20px 0;
}

.details {
  background-color: white;
  padding: 50px; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px; /* Set maximum width */
  margin: 20px auto; /* Centering the details box */
  text-align: left;
}

.details h3 {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.details p {
  margin: 5px 0;
}

.buttons {
  display: flex;
  justify-content: center;
  width: 100%;
}

.input-group {
  width: 80%;
  display: flex;
  align-items: center;
}

.input-group input {
  flex: 1;
  padding: 10px;
  margin-right: 20px; 
  width: 50%; 
}

.one {
  color: blue;
}
