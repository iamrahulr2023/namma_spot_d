import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder';
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const AdminMap = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [mapWidth, setMapWidth] = useState('100%');
  const [marginLeft, setMarginLeft] = useState("0");
  const [markerInfo, setMarkerInfo] = useState({ name: "", desc: "", place: "" });
  const [eParking, setEParking] = useState(true); // State to keep track of E Parking toggle
  const mapRef = useRef(null);
  const navigate = useNavigate();

  const customIcon = L.icon({
    iconUrl: 'https://www.iconpacks.net/icons/2/free-location-map-icon-2956-thumb.png', // URL to your custom icon
    iconSize: [32, 32], // Adjust the size as needed
    iconAnchor: [16, 32], // Anchor the icon at its center
    popupAnchor: [0, -32] // Adjust the popup anchor
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    if (query) {
      setSearch(query);
    }
  }, [location.search]);

  useEffect(() => {
    const leafletMap = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);
    mapRef.current = leafletMap;

    leafletMap.on('click', addMarker);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    axios.post('https://nammaspot-backend.onrender.com/add', { locations })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, [locations, currentMarker]);

  useEffect(() => {
    if (mapRef.current) {
      L.Control.geocoder().addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addMarker = async (e) => {
    if (currentMarker !== null) {
        mapRef.current.removeLayer(currentMarker);
    }

    const popupContent = `
        <div class="contaaainer">
            <span id="toggleTexttt">E Parking</span>
            <label class="switchhh">
                <input id="toggleSwitchhh" type="checkbox" ${eParking ? 'checked' : ''}>
                <span class="sliderrrounddd"></span>
            </label>
        </div>
        <form id="marker-form">
            <input type="submit" value="Add Marker" />
        </form>
    `;

    let iconUrl = eParking ? 'https://cdn-icons-png.flaticon.com/128/929/929426.png' : 'https://www.iconpacks.net/icons/2/free-location-map-icon-2956-thumb.png';

    const customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const marker = L.marker(e.latlng, { icon: customIcon })
        .addTo(mapRef.current)
        .bindPopup(popupContent)
        .openPopup();

    const latLng = marker.getLatLng();
    const cityAddress = await fetchCityAddress(latLng);

    const newMarkerInfo = {
        name: "",
        desc: "",
        place: cityAddress
    };

    setMarkerInfo(newMarkerInfo);

    const newLocations = [...locations, { lat: latLng.lat, lng: latLng.lng, address: cityAddress }];
    setLocations(newLocations);

    setCurrentMarker(marker);

    // Add event listener for toggle switch
    const toggleSwitch = document.getElementById('toggleSwitchhh');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', (event) => {
            setEParking(event.target.checked);
            const newIconUrl = event.target.checked ? 'https://cdn-icons-png.flaticon.com/128/929/929426.png' : 'https://www.iconpacks.net/icons/2/free-location-map-icon-2956-thumb.png';
            const newCustomIcon = L.icon({
                iconUrl: newIconUrl,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
            marker.setIcon(newCustomIcon);
        });
    }
};


  useEffect(() => {
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      if (currentMarker) {
        const latLng = currentMarker.getLatLng();
        const cityAddress = await fetchCityAddress(latLng);
        if (eParking) {
          navigate(`/book?city=${encodeURIComponent(cityAddress)}&status=on `);
        } else {
          navigate(`/book?city=${encodeURIComponent(cityAddress)}`);
        }
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
  }, [currentMarker, navigate, eParking]);

  const fetchCityAddress = async (latLng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json`);
    const data = await response.json();
    return data.display_name;
  };

  return (
    <div>
      <div id="map" className="maps" style={{ marginLeft: marginLeft, width: mapWidth, height: '700px' }}></div>
      <div className="h">
        <div className="info">
          <h3 className='infoname'>{markerInfo.name}</h3>
          <p className='infoplace'>{markerInfo.place}</p>
          <p className='infodes'>{markerInfo.desc}</p>
          <h1 className='infoprice'> ₹ 78</h1>
          <button className='infobtn'><Link to="/payment"> BOOK NOW </Link></button>
        </div>
      </div>
    </div>
  );
};

export default AdminMap;