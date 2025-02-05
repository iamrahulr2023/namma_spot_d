import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder';
import "./index.css";
import Navbar from './USER1/Homepage/Navbar';

const Map = () => {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [currentMarker, setCurrentMarker] = useState(null);
    const [markerInfo, setMarkerInfo] = useState({});
    const [showBooking, setShowBooking] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minRating, setMinRating] = useState(1);
    const [maxRating, setMaxRating] = useState(5);
    const mapRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const { searchValue } = location.state || { searchValue: "" };

    const defaultIcon = L.icon({
        iconUrl: 'https://www.iconpacks.net/icons/2/free-location-map-icon-2956-thumb.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const statusIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/128/929/929426.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const handleNavigate = () => {
        navigate('/booking', { state: { city: markerInfo.city } });
    }

    useEffect(() => {
        axios.get('https://nammaspot-backend.onrender.com/get')
            .then(res => {
                setLocations(res.data); // Set the fetched locations to state
                setFilteredLocations(res.data); // Initially, show all locations
                markAllLocations(res.data); // Mark all locations on the map
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const leafletMap = L.map('map').setView([20.5937, 78.9629], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leafletMap);
        mapRef.current = leafletMap;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                const userMarker = L.marker([latitude, longitude], { icon: defaultIcon })
                    .addTo(mapRef.current)
                    .bindPopup("You are here")
                    .openPopup();
                mapRef.current.setView([latitude, longitude], 10);
                setCurrentMarker(userMarker);
            }, error => {
                console.error('Error getting user location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (searchValue) {
            setSearch(searchValue);
            handleSearch(searchValue);
        }
    }, [searchValue]);

    const markAllLocations = async (locations) => {
        for (const location of locations) {
            await markLocation(location);
        }
    };

    const markLocation = async (location) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location.locations)}&format=json`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const icon = location.status ? statusIcon : defaultIcon;
                L.marker([lat, lon], { icon: icon })
                    .addTo(mapRef.current)
                    .bindPopup(`<b>${location.locations}</b>`)
                    .on('click', () => handleMarkerClick(location));
            }
        } catch (error) {
            console.error('Error marking location:', error);
        }
    };

    const handleSearch = async (search) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const marker = L.marker([lat, lon], { icon: defaultIcon })
                    .addTo(mapRef.current)
                    .bindPopup(search)
                    .openPopup();
                mapRef.current.setView([lat, lon], 15); // Set zoom level to focus on the searched location
                setCurrentMarker(marker);
            }
        } catch (error) {
            console.error('Error searching location:', error);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSearch(search);
    };

    const handleMarkerClick = (location) => {
        setMarkerInfo(location);
        setShowBooking(true);
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        const minRate = parseFloat(minRating);
        const maxRate = parseFloat(maxRating);

        if (!isNaN(min) && !isNaN(max) && !isNaN(minRate) && !isNaN(maxRate)) {
            const filtered = locations.filter(loc => 
                loc.price >= min && 
                loc.price <= max &&
                loc.averagerate >= minRate &&
                loc.averagerate <= maxRate
            );
            setFilteredLocations(filtered);
            updateMapWithFilteredLocations(filtered);
            setShowFilter(false); // Close filter form after applying
        }
    };

    const updateMapWithFilteredLocations = (locations) => {
        if (mapRef.current) {
            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    mapRef.current.removeLayer(layer);
                }
            });
            markAllLocations(locations);
        }
    };

    const handleRoute = () => {
        navigate('/routemap', { state: { endLocation: markerInfo.city } });
    }
    const handlereview = () => {
        navigate('/review', { state: { cityd: markerInfo.city } });
    }

    return (
        <>
        <Navbar/>
        <div className="mapccontainer">
            <div className="search-container">
                <form id="search-form" onSubmit={handleFormSubmit}>
                    <input 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Search for a location" 
                    />
                    <button style={{width:"100px"}} type="submit">Search</button>
                </form>
                <button id="filterbtn" onClick={toggleFilter} style={{marginTop: "10px"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down-alt" viewBox="0 0 16 16">
  <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5"/>
</svg></button>
            </div>
          
            {showFilter && (
                <div className="filter-container">
                    <form id="filter-form" onSubmit={handleFilterSubmit}>
                    <h4>Filter By Price</h4>
                        <input 
                            type="number" 
                            value={minPrice} 
                            onChange={(e) => setMinPrice(e.target.value)} 
                            placeholder="Min Price" 
                        />
                        <input 
                            type="number" 
                            value={maxPrice} 
                            onChange={(e) => setMaxPrice(e.target.value)} 
                            placeholder="Max Price" 
                        />
                        <h4>Filter By Ratings</h4>
                        <input 
                            type="number" 
                            value={minRating} 
                            onChange={(e) => setMinRating(e.target.value)} 
                            placeholder="Min Rating (1-5)" 
                            min="1"
                            max="5"
                            step="0.1"
                        />
                        <input 
                            type="number" 
                            value={maxRating} 
                            onChange={(e) => setMaxRating(e.target.value)} 
                            placeholder="Max Rating (1-5)" 
                            min="1"
                            max="5"
                            step="0.1"
                        />
                        <button style={{width:"100px"}} type="submit">Apply</button>
                    </form>
                </div>
            )}
            {showBooking && (
                <div className="h">
                    <div className="ino">
                        <p className="parkbooks">BOOK FOR PARK</p>
                        <span id="goroute" onClick={handleRoute}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sign-turn-right-fill" viewBox="0 0 16 16">
  <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM9 8.466V7H7.5A1.5 1.5 0 0 0 6 8.5V11H5V8.5A2.5 2.5 0 0 1 7.5 6H9V4.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L9.41 8.658A.25.25 0 0 1 9 8.466"/>
</svg></span>
                        <p className="infoplace">Place: {markerInfo.place}</p>
                        <p className="infoname">Company: {markerInfo.company}</p>
                        <p className="infodes">City: {markerInfo.city}</p>
                        <h4 className="infoname">Seats Available: {markerInfo.seat}</h4>
                        <p className="infoprice">₹  {markerInfo.price}</p>
                        {markerInfo.averagerate && (
                            <div className="rates">
                                RATE: {markerInfo.averagerate.toFixed(1)} out of 5
                            </div>
                        )}
                        <button className="infobtn" onClick={handleNavigate}>BOOK NOW</button>
                        <div>
                            <p className="infodes">Description: {markerInfo.des}</p>
                            <p>How to Park</p>
                            <p>Upon arrival, show parking pass to the attendant for validation</p>
                        </div>
                        <div className="review">
                            
                            <b>Review this Spot</b>
                            <p>Share your thoughts with other customers</p>
                            <button  onClick={handlereview}>Write Your Review</button>
                        </div>
                        {markerInfo.reviews && markerInfo.reviews.length > 0 && (
                            <div className="reviews">
                                <h3>Reviews:</h3>
                                {markerInfo.reviews.map((review, index) => (
                                    <div key={index} className="review-item">
                                        <p><strong>{review.header}</strong></p>
                                        <p>{review.body}</p>
                                        <p>Rating: {review.starcount} out of 5</p>
                                    </div>
                                 
                                ))}
                               
                            </div>
                        )}
                            
                    </div>
             
                </div>
            )}
            <div  id="map" className="map"></div>
          
        </div>
        <div id="marque"> 
    <div className="stay-tuned">Note*  Stay Tuned with us - Find Your Perfect Spot!</div>
</div>

       

        </>
    );
};

export default Map;
