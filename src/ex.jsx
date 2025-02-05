import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder';
import "./index.css"
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
    axios.get('https://nammaspot-backend.onrender.com/get')
      .then(result => setLocations(result.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('https://nammaspot-backend.onrender.com/getdetails',{params:{name:markerInfo.name}})
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
  }, [markerInfo.name]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    if (query) {
      setSearch(query);
      markLocation(query);
    }
  }, [location.search]);

  useEffect(() => {
    const leafletMap = L.map('map').setView([20.5937, 78.9629], 5); // Centered around India
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);
    mapRef.current = leafletMap;

    // Event listener to add marker on map click
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
      <div id="map" className="maps" style={{ marginLeft: marginLeft, width: mapWidth, height: '700px' }}></div>
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