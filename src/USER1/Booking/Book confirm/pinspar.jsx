import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Pingenerate.css";

const Pin = () => {
  const location = useLocation();
  const { pin } = location.state || {};
  const [recentData, setRecentData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/getuserconfirmdata')
      .then(result => {
        setRecentData(result.data);

        // Ensure recentData.slotNumbers is an array
        const slotNumbers = result.data.slotNumbers || [];

        // Send update request after setting recentData
        axios.post('http://localhost:3001/updatepins', {
          city: result.data.city,
          slots: slotNumbers
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ticket-container">
      <h1 className="ticket-header">Your PIN</h1>
      <h2 className="ticket-details">{pin}</h2>
      {recentData && (
        <div className="ticket-details">
          <h3>Recent Booking Details:</h3>
          <h2>Entry Time: {recentData.entryTime}</h2>
          <h2>Exit Time: {recentData.exitTime}</h2>
          <h2>Date: {recentData.date}</h2>
          <h2>Vehicle Number: {recentData.vehicleno}</h2>
          <h2>Slot Numbers: {recentData.slotNumbers.join(', ')}</h2>
          <h2>Total Amount: ${recentData.totalAmount}</h2>
          <Link to="/home"><button><h2>OK</h2></button></Link>
        </div>
      )}
    </div>
  );
};

export default Pin;
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Pingenerate.css";

const Pin = () => {
  const location = useLocation();
  const { pin } = location.state || {};
  const [recentData, setRecentData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/getuserconfirmdata')
      .then(result => {
        setRecentData(result.data);

        // Ensure recentData.slotNumbers is an array
        const slotNumbers = result.data.slotNumbers || [];

        // Send update request after setting recentData
        axios.post('http://localhost:3001/updatepins', {
          city: result.data.city,
          slots: slotNumbers
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ticket-container">
      <h1 className="ticket-header">Your PIN</h1>
      <h2 className="ticket-details">{pin}</h2>
      {recentData && (
        <div className="ticket-details">
          <h3>Recent Booking Details:</h3>
          <h2>Entry Time: {recentData.entryTime}</h2>
          <h2>Exit Time: {recentData.exitTime}</h2>
          <h2>Date: {recentData.date}</h2>
          <h2>Vehicle Number: {recentData.vehicleno}</h2>
          <h2>Slot Numbers: {recentData.slotNumbers.join(', ')}</h2>
          <h2>Total Amount: ${recentData.totalAmount}</h2>
          <Link to="/home"><button><h2>OK</h2></button></Link>
        </div>
      )}
    </div>
  );
};

export default Pin;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Pingenerate.css";
import { Link } from "react-router-dom";

const Pin = () => {
  const location = useLocation();
  const { pin } = location.state || {};
  const [recentData, setRecentData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/getuserconfirmdata')
      .then(result => {
        setRecentData(result.data);
        // Send update request after setting recentData
        axios.post('http://localhost:3001/updatepins', {
          city: result.data.city,
          slot: result.data.slotNumbers.length
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ticket-container">
      <h1 className="ticket-header">Your PIN</h1>
      <h2 className="ticket-details">{pin}</h2>
      {recentData && (
        <div className="ticket-details">
          <h3>Recent Booking Details:</h3>
          <h2>Entry Time: {recentData.entryTime}</h2>
          <h2>Exit Time: {recentData.exitTime}</h2>
          <h2>Date: {recentData.date}</h2>
          <h2>Vehicle Number: {recentData.vehicleno}</h2>
          <h2>Slot Numbers: {recentData.slotNumbers.join(', ')}</h2>
          <h2>Total Amount: ${recentData.totalAmount}</h2>
          <Link to="/home"><button><h2>OK</h2></button></Link>
        </div>
      )}
    </div>
  );
};

export default Pin;
/// corrcet

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Pingenerate.css";
import { Link } from "react-router-dom";

const Pin = () => {
  const location = useLocation();
  const { pin } = location.state || {};
  const [recentData, setRecentData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [lastUserName, setLastUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get('http://localhost:3001/getuserdata');
        const userNameResponse = await axios.get('http://localhost:3001/getname');

        setMapData(userDataResponse.data);
        setLastUserName(userNameResponse.data.name);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mapData && lastUserName) {
      axios.post('http://localhost:3001/postconfirmbooking', {
        slotNumbers: mapData.slotNumbers,
        name: lastUserName,
        date: mapData.date,
        vehicleno: mapData.vehicleno,
        totalAmount: mapData.totalAmount,
        city: mapData.city
      })
        .then(result => console.log('Data posted successfully', result.data))
        .catch(err => console.log(err));
    }
  }, [mapData, lastUserName]);

  useEffect(() => {
    axios.get('http://localhost:3001/getuserconfirmdata')
      .then(result => {
        setRecentData(result.data);

        if (result.data) {
          // Send update request after setting recentData
          axios.post('http://localhost:3001/updatepins', {
            city: result.data.city,
            slots: result.data.slotNumbers
          })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ticket-container">
      <h1 className="ticket-header">Your PIN</h1>
      <h2 className="ticket-details">{pin}</h2>
      {recentData && (
        <div className="ticket-details">
          <h3>Recent Booking Details:</h3>
          <h2>Entry Time: {recentData.entryTime}</h2>
          <h2>Exit Time: {recentData.exitTime}</h2>
          <h2>Date: {recentData.date}</h2>
          <h2>Vehicle Number: {recentData.vehicleno}</h2>
          <h2>Slot Numbers: {recentData.slotNumbers.join(', ')}</h2>
          <h2>Total Amount: ${recentData.totalAmount}</h2>
          <Link to="/home"><button><h2>OK</h2></button></Link>
        </div>
      )}
    </div>
  );
};

export default Pin;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Pingenerate.css";
import { Link } from "react-router-dom";

const Pin = () => {

  //summa
  const location = useLocation();
  const { pin } = location.state || {};
  const [recentData, setRecentData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [lastUserName, setLastUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get('http://localhost:3001/getuserdata');
        const userNameResponse = await axios.get('http://localhost:3001/getname');

        setMapData(userDataResponse.data);
        setLastUserName(userNameResponse.data.name);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mapData && lastUserName) {
      axios.post('http://localhost:3001/postconfirmbooking', {
        slotNumbers: mapData.slotNumbers,
        name: lastUserName,
        date: mapData.date,
        vehicleno: mapData.vehicleno,
        totalAmount: mapData.totalAmount,
        city: mapData.city
      })
        .then(result => console.log('Data posted successfully', result.data))
        .catch(err => console.log(err));
    }
  }, [mapData, lastUserName]);

  useEffect(() => {
    axios.get('http://localhost:3001/getuserconfirmdata')
      .then(result => {
        setRecentData(result.data);

        if (result.data) {
          // Send update request after setting recentData
          axios.post('http://localhost:3001/updatepins', {
            city: result.data.city,
            slots: result.data.slotNumbers
          })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ticket-container">
      <h1 className="ticket-header">Your PIN</h1>
      <h2 className="ticket-details">{pin}</h2>
      {recentData && (
        <div className="ticket-details">
          <h3>Recent Booking Details:</h3>
          <h2>Entry Time: {recentData.entryTime}</h2>
          <h2>Exit Time: {recentData.exitTime}</h2>
          <h2>Date: {recentData.date}</h2>
          <h2>Vehicle Number: {recentData.vehicleno}</h2>
          <h2>Slot Numbers: {recentData.slotNumbers.join(', ')}</h2>
          <h2>Total Amount: ${recentData.totalAmount}</h2>
          <Link to="/home"><button><h2>OK</h2></button></Link>
        </div>
      )}
    </div>
  );
};

export default Pin;

//crt 
/*import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Pingenerate.css";
import { Link } from "react-router-dom";

const Pin = () => {

  //summa
  const location = useLocation();
  const { pin } = location.state || {};
  const [recentData, setRecentData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [lastUserName, setLastUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get('http://localhost:3001/getuserdata');
        const userNameResponse = await axios.get('http://localhost:3001/getname');

        setMapData(userDataResponse.data);
        setLastUserName(userNameResponse.data.name);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mapData && lastUserName) {
      axios.post('http://localhost:3001/postconfirmbooking', {
        slotNumbers: mapData.slotNumbers,
        name: lastUserName,
        date: mapData.date,
        vehicleno: mapData.vehicleno,
        totalAmount: mapData.totalAmount,
        city: mapData.city
      })
        .then(result => console.log('Data posted successfully', result.data))
        .catch(err => console.log(err));
    }
  }, [mapData, lastUserName]);

  useEffect(() => {
    axios.get('http://localhost:3001/getuserconfirmdata')
      .then(result => {
        setRecentData(result.data);

        if (result.data) {
          // Send update request after setting recentData
          axios.post('http://localhost:3001/updatepins', {
            city: result.data.city,
            slots: result.data.slotNumbers
          })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ticket-container">
      <h1 className="ticket-header">Your PIN</h1>
      <h2 className="ticket-details">{pin}</h2>
      {recentData && (
        <div className="ticket-details">
          <h3>Recent Booking Details:</h3>
          <h2>Entry Time: {recentData.entryTime}</h2>
          <h2>Exit Time: {recentData.exitTime}</h2>
          <h2>Date: {recentData.date}</h2>
          <h2>Vehicle Number: {recentData.vehicleno}</h2>
          <h2>Slot Numbers: {recentData.slotNumbers.join(', ')}</h2>
          <h2>Total Amount: ${recentData.totalAmount}</h2>
          <Link to="/homePage"><button><h2>OK</h2></button></Link>
        </div>
      )}
    </div>
  );
};

export default Pin;*/


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Pingenerate.css"; // Import CSS file

const Pin = () => {
  const location = useLocation();
  const { pin } = location.state || {};
  const [recentData, setRecentData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [lastUserName, setLastUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get('http://localhost:3001/getuserdata');
        const userNameResponse = await axios.get('http://localhost:3001/getname');

        setMapData(userDataResponse.data);
        setLastUserName(userNameResponse.data.name);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mapData && lastUserName) {
      axios.post('http://localhost:3001/postconfirmbooking', {
        slotNumbers: mapData.slotNumbers,
        name: lastUserName,
        date: mapData.date,
        vehicleno: mapData.vehicleno,
        totalAmount: mapData.totalAmount,
        city: mapData.city
      })
        .then(result => console.log('Data posted successfully', result.data))
        .catch(err => console.log(err));
    }
  }, [mapData, lastUserName]);
  

  useEffect(() => {
    axios.get('http://localhost:3001/getuserconfirmdata')
      .then(result => {
        setRecentData(result.data);

        if (result.data) {
          // Send update request after setting recentData
          axios.post('http://localhost:3001/updatepins', {
            city: result.data.city,
            slots: result.data.slotNumbers
          })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ticket-container">

     


      <h1 className="ticket-header">Ticket</h1>
     
      {recentData && (
        <div className="ticket-details">
          <b>Token NUmber:<h6>{pin}</h6></b>
         
          <b>Location:<h6>{recentData.city}</h6></b>
          <b>Date:<h6>{recentData.date}</h6> </b>
          <b>Vehicle Number:<h6>{recentData.vehicleno}</h6> </b>
          <b>Entry Time:<h6>{recentData.entryTime}</h6></b>
          <b>Exit Time:<h6>{recentData.exitTime}</h6> </b>
          
          <b>Slot Numbers:<h6>{recentData.slotNumbers.join(', ')}</h6> </b>
          <b>Payment Price:<h6>${recentData.totalAmount}</h6> </b>
       
          <Link to="/"><button className="btttn"><h5>OK</h5></button></Link>
        </div>
      )}
    </div>
  );
};

export default Pin;
