import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Routemap.css';
import { useLocation } from 'react-router-dom'; // Add this line

// Your existing code continues...


let DefaultIcon = L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function DisplayRoute({ startCoords, endCoords, setDistance, setTime }) {
    const map = useMap();

    useEffect(() => {
        if (!startCoords || !endCoords) return;

        const accessToken = 'pk.eyJ1IjoidGhhbWlsYXJhc2FuZ3AiLCJhIjoiY2x4M214cjRsMTF1NTJpczk5bXJrMWdldSJ9.eWOzqy3c1K2314DXbe5orA';
        const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[1]},${startCoords[0]};${endCoords.lng},${endCoords.lat}?geometries=geojson&access_token=${accessToken}`;

        fetch(routeUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch route: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const geojson = data.routes[0].geometry;
                const routeLayer = L.geoJSON(geojson, {
                    style: { color: 'blue', weight: 4 }
                }).addTo(map);

                const distanceInKm = data.routes[0].distance / 1000;
                const durationInSecs = data.routes[0].duration;
                const durationInHours = Math.floor(durationInSecs / 3600);
                const durationInMinutes = Math.floor((durationInSecs % 3600) / 60);

                setDistance(`Distance: ${distanceInKm.toFixed(2)} km`);
                setTime(`Estimated Time: ${durationInHours} hrs and ${durationInMinutes} mins`);

                map.fitBounds(routeLayer.getBounds());
            })
            .catch(error => {
                alert(`Failed to fetch route: ${error.message}`);
                console.error(error);
            });

    }, [startCoords, endCoords, map, setDistance, setTime]);

    return null;
}

function Routemap() {
    const location = useLocation();
    const { endLocation } = location.state || {};

    const [userLocation, setUserLocation] = useState(null);
    const [endCoords, setEndCoords] = useState(null);
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                error => {
                    console.error(error);
                }
            );
        }
    }, []);

    useEffect(() => {
        const getCoordinates = async (location) => {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`);
            const data = await response.json();
            if (data.length > 0) {
                return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
            }
            return null;
        };

        const fetchEndCoords = async () => {
            if (endLocation) {
                const coords = await getCoordinates(endLocation);
                if (coords) {
                    setEndCoords(coords);
                } else {
                    alert("Unable to find the specified location.");
                }
            }
        };

        fetchEndCoords();
    }, [endLocation]);

    return (
        <div className="App">
            <MapContainer center={[0, 0]} zoom={2} id="map" style={{ height: '700px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Map data &copy; OpenStreetMap contributors"
                />
                {userLocation && <Marker position={userLocation}><Popup>You are here</Popup></Marker>}
                {userLocation && endCoords && <DisplayRoute startCoords={userLocation} endCoords={endCoords} setDistance={setDistance} setTime={setTime} />}
            </MapContainer>
            <div className="info">
                <h3>Route Information</h3>
                <p>{distance}</p>
                <p>{time}</p>
            </div>
        </div>
    );
}

export default Routemap;
