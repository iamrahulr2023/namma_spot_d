import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder';
import "./index.css"
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Map = () => {

  const location = useLocation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    if (query) {
      setSearch(query);
    }
  }, [location.search]);

  const [currentMarker, setCurrentMarker] = useState(null);
  const [mapWidth, setMapWidth] = useState('100%'); 
  const [marginleft , setMarginLeft] = useState("0");
  const [markerInfo, setMarkerInfo] = useState({ name: "", desc: "", place: "" });
  const mapRef = useRef(null);

  useEffect(() => {
    const leafletMap = L.map('map').setView([20.5937, 78.9629], 5); // Centered around India
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);
    mapRef.current = leafletMap;

    // Event listener to add marker on map click
    leafletMap.on('click', addMarker);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      L.Control.geocoder().addTo(mapRef.current);
    }
  }, []);

  const addMarker = (e) => {
    // Remove the previously added marker if any
    if (currentMarker !== null) {
      mapRef.current.removeLayer(currentMarker);
    }

    const popupContent = `
      <form id="marker-form">
        <label for="marker-name">Name:</label><br>
        <input type="text" id="marker-name" name="marker-name"><br>
        <label for="marker-desc">Description:</label><br>
        <input type="text" id="marker-desc" name="marker-desc"><br><br>
        <input type="submit" value="Add Marker">
      </form>
    `;

    const marker = L.marker(e.latlng)
      .addTo(mapRef.current)
      .bindPopup(popupContent)
      .openPopup();

    setCurrentMarker(marker);
  };

  useEffect(() => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
      const name = document.getElementById('marker-name').value;
      const desc = document.getElementById('marker-desc').value;

      // Update the popup content with the new information
      const newContent = `
        <h3>${name}</h3>
        <p>${desc}</p>
        <button id="bookBtn">Book</button>
      `;
      currentMarker.setPopupContent(newContent);

      // Attaching event listener to the dynamically created button
      const bookBtn = document.getElementById('bookBtn');
      if (bookBtn) {
        bookBtn.addEventListener('click', () => book(name, desc));
      }
    };

    const form = document.getElementById('marker-form');
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', handleFormSubmit);
      }
    };
  }, [currentMarker]);

  const book = async (name, desc) => {
    // Fetch the place name based on marker's coordinates
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${currentMarker.getLatLng().lat}&lon=${currentMarker.getLatLng().lng}&format=json`);
      const data = await response.json();
      if (data && data.display_name) {
        setMarkerInfo({ name, desc, place: data.display_name });
      }
    } catch (error) {
      console.error('Error fetching place name:', error);
    }
    setMapWidth('50%');
    setMarginLeft("50%");
  };

  return (
    <div>
      {/* Ensure the map container has an appropriate size */}
      <div id="map" className="maps" style={{ marginLeft: marginleft, width: mapWidth, height: '700px' }}></div>
      <div className="h">
        <div className="info">
          <h3 className='infoname'>{markerInfo.name}</h3>
          <p className='infoplace'>{markerInfo.place}</p>
          <p className='infodes'>{markerInfo.desc}</p>
          <h1 className='infoprice'> $78</h1>
          <button className='infobtn'><Link to="/book">BOOK NOW</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Map;


/*
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder';
import "./index.css"
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useLocation } from 'react-router-dom';

const AdminMap = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");

  const [loactions , setlocations ] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    if (query) {
      setSearch(query);
    }
  }, [location.search]);

  const [currentMarker, setCurrentMarker] = useState(null);
  const [mapWidth, setMapWidth] = useState('100%'); 
  const [marginleft , setMarginLeft] = useState("0");
  const [markerInfo, setMarkerInfo] = useState({ name: "", desc: "", place: "" });
  const mapRef = useRef(null);
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  useEffect(() => {
    const leafletMap = L.map('map').setView([20.5937, 78.9629], 5); // Centered around India
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);
    mapRef.current = leafletMap;

    // Event listener to add marker on map click
    leafletMap.on('click', addMarker);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      L.Control.geocoder().addTo(mapRef.current);
    }
  }, []);

  const addMarker = (e) => {
    // Remove the previously added marker if any
    if (currentMarker !== null) {
      mapRef.current.removeLayer(currentMarker);
    }

    const popupContent = `
      <form id="marker-form">
        <input type="submit" value="Add Marker">
        <button id="mark-btn">Mark</button>
      </form>
    `;

    const marker = L.marker(e.latlng)
      .addTo(mapRef.current)
      .bindPopup(popupContent)
      .openPopup();

    setCurrentMarker(marker);
  };

  useEffect(() => {
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      if (currentMarker) {
        const latLng = currentMarker.getLatLng();
        const cityAddress = await fetchCityAddress(latLng);
        navigate(`/book?city=${encodeURIComponent(cityAddress)}`);
      }
    };

    const handleMarkButtonClick = () => {
      // Perform actions when the "Mark" button is clicked
      console.log("Mark button clicked!");
    };

    const form = document.getElementById('marker-form');
    const markBtn = document.getElementById('mark-btn');

    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }

    if (markBtn) {
      markBtn.addEventListener('click', handleMarkButtonClick);
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', handleFormSubmit);
      }
      if (markBtn) {
        markBtn.removeEventListener('click', handleMarkButtonClick);
      }
    };
  }, [currentMarker, navigate]);

  const fetchCityAddress = async (latLng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json`);
    const data = await response.json();
    return data.display_name;
  };

  return (
    <div>
      {/* Ensure the map container has an appropriate size */}
      <div id="map" className="maps" style={{ marginLeft: marginleft, width: mapWidth, height: '700px' }}></div>
      <div className="h">
        <div className="info">
          <h3 className='infoname'>{markerInfo.name}</h3>
          <p className='infoplace'>{markerInfo.place}</p>
          <p className='infodes'>{markerInfo.desc}</p>
          <h1 className='infoprice'> $78</h1>
          <button className='infobtn'><Link to="/book">BOOK NOW</Link></button>
        </div>
      </div>
    </div>
  );
};

export default AdminMap;

*/

/*
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder';
import "./index.css";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [currentMarker, setCurrentMarker] = useState(null);
  const [mapWidth, setMapWidth] = useState('100%');
  const [marginLeft, setMarginLeft] = useState("0");
  const [markerInfo, setMarkerInfo] = useState({ name: "", desc: "", place: "" });
  const mapRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setLocations(result.data))
      .catch(err => console.log(err));
  }, []);

  /*useEffect(() => {
    axios.get('http://localhost:3001/getdetails',{markerInfo.name})
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
  }, []);*/

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    if (query) {
      setSearch(query);
      markLocation(query);
    }
  }, [location.search]);

  useEffect(() => {
    const leafletMap = L.map('map').setView([20.5937, 78.9629], 5); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);
    mapRef.current = leafletMap;

    leafletMap.on('click', addMarker);

    markAllLocations();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [locations]);

  useEffect(() => {
    if (mapRef.current) {
      L.Control.geocoder().addTo(mapRef.current);
    }
  }, []);

  const markLocation = async (query) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const marker = L.marker([lat, lon])
          .addTo(mapRef.current)
          .bindPopup(`<b>${query}</b>`)
          .on('click', () => handleMarkerClick({ name: query, lat, lon }))
          .openPopup();
        setCurrentMarker(marker);
      }
    } catch (error) {
      console.error('Error marking location:', error);
    }
  };

  const markAllLocations = async () => {
    for (const location of locations) {
      await markLocation(location);
    }
  };

  const addMarker = (e) => {
    if (currentMarker !== null) {
      mapRef.current.removeLayer(currentMarker);
    }

    const popupContent = `
      <form id="marker-form">
        <label for="marker-name">Name:</label><br>
        <input type="text" id="marker-name" name="marker-name"><br>
        <label for="marker-desc">Description:</label><br>
        <input type="text" id="marker-desc" name="marker-desc"><br><br>
        <input type="submit" value="Add Marker">
      </form>
    `;

    const marker = L.marker(e.latlng)
      .addTo(mapRef.current)
      .bindPopup(popupContent)
      .openPopup();

    setCurrentMarker(marker);
  };

  useEffect(() => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
      const name = document.getElementById('marker-name').value;
      const desc = document.getElementById('marker-desc').value;

      const newContent = `
        <h3>${name}</h3>
        <p>${desc}</p>
        <button id="bookBtn">Book</button>
      `;
      currentMarker.setPopupContent(newContent);

      const bookBtn = document.getElementById('bookBtn');
      if (bookBtn) {
        bookBtn.addEventListener('click', () => book(name, desc));
      }
    };

    const form = document.getElementById('marker-form');
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', handleFormSubmit);
      }
    };
  }, [currentMarker]);

  const handleMarkerClick = async ({ name, lat, lon }) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();
      if (data && data.display_name) {
        setMarkerInfo({ name, desc: "", place: data.display_name });
      }
    } catch (error) {
      console.error('Error fetching place name:', error);
    }
    setMapWidth('50%');
    setMarginLeft("50%");
  };

  const book = async (name, desc) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${currentMarker.getLatLng().lat}&lon=${currentMarker.getLatLng().lng}&format=json`);
      const data = await response.json();
      if (data && data.display_name) {
        setMarkerInfo({ name, desc, place: data.display_name });
      }
    } catch (error) {
      console.error('Error fetching place name:', error);
    }
    setMapWidth('50%');
    setMarginLeft("50%");
  };

  return (
    <div>
      <div id="map" className="maps" style={{ marginLeft: marginLeft, width: mapWidth, height: '700px' }}></div>
      <div className="h">
        <div className="info">
          <h3 className='infoname'>{markerInfo.name}</h3>
          <p className='infoplace'>{markerInfo.place}</p>
          <p className='infodes'>{markerInfo.desc}</p>
        
          <h1 className='infoprice'>$78</h1>
          <button className='infobtn'><Link to="/book">BOOK NOW</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Map;

*/

/*
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import "./Book.css"
import axios from 'axios';

const Book = () => {
  const location = useLocation();
  const [company ,setcompany] = useState();
  const [rate ,setrate] = useState("");
  const [slot ,setslot] = useState("");
  const [des ,setdes] = useState("");
  const [area ,setarea] = useState("");

  const handlesubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/add',{city, area,slot,des,company,rate})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };

  const city = new URLSearchParams(location.search).get('city');

  return (
    <div>
      <h2>Book</h2>
      <h2>City: {city}</h2>
      <div className="bookbox">
        <h2>Parking Booking Form (Admin)</h2>
        <form onSubmit={(e)=>handlesubmit(e)}>
          <label htmlFor="company">Company:</label><br />
          <input type="text" id="company" name="company"
           placeholder="Enter company name" 
           value={company}
           onChange={(e) => setcompany(e.target.value)}
           /><br />

          <label htmlFor="rate">Rate (per Hour):</label><br />
          <input type="text" id="rate" name="rate" placeholder="Enter rate per hour"  value={rate}
          onChange={(e) => setrate(e.target.value)}/><br />
          <label htmlFor="area">Area:</label><br />
          <input type="text" id="area" name="area" placeholder="Enter area"  value={area}
          onChange={(e) => setarea(e.target.value)} /><br />
          <label htmlFor="slot">Slot:</label><br />
          <input type="text" id="slot" name="slot" placeholder="Enter number of available slots"  value={slot}
            onChange={(e) => setslot(e.target.value)}/><br />
          <label htmlFor="hours">description:</label><br />
          <input type="text" id="hours" name="hours" placeholder="Enter describtion"   value={des}
           onChange={(e) => setdes(e.target.value)}  /><br /><br />
          <Link to="/map"><input type="submit" value="Book" />book</Link>
        </form> 
      </div>
    </div>
  );
}

export default Book;

*/

/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Map = require('./modules/Map'); 
const Details = require('./modules/Details');// Adjusted import

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Admindata', { useNewUrlParser: true, useUnifiedTopology: true });

/*app.post('/maps', (req,res) => {
    const location = req.body.location; // Get single location from request body
    Map.findOneAndUpdate(
        {}, // Find the first document (or you can specify a specific query)
        { $push: { locations: location } }, // Append the location to the locations array
        { new: true, upsert: true } // Create the document if it doesn't exist
    )
    .then(result => res.json(result))
    .catch(err => res.json(err));
});*/

app.get('/get', (req, res) => {
  Map.findById('664827a4b50ea396d0c856fd')
    .then(result => res.json(result.locations))
    .catch(err => res.json(err));
});

/*app.get('/getdetails', (req, res) => {
  const { name } = req.query;
  Details.findOne({ city: name })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});*/

app.post('/maps',(req,res) =>{
  const location = req.body.location;
  Map.create({
     locations :location
  }).then(result => res.json(result))
  .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
  const { area, slot, des, company, city, rate } = req.body;

  Details.create({ area, slot, des, company, city, rate })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


*/