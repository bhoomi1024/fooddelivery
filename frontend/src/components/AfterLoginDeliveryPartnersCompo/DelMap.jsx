import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DelMap = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [coordinates, setCoordinates] = useState({
    origin: [20.5937, 78.9629],
    destination: [19.5937, 68.9629]
  });
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);

  const redIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const blueIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  useEffect(() => {
    const fetchOriginAddress = async (lat, lng) => {
      try {
        const response = await axios.get('http://localhost:3000/api/mapquest/geocoding/v1/reverse', {
          params: {
            key: '6n8mOkjIr008hDT2QOx9Vs9NNsAmCWEz',
            location: `${lat},${lng}`
          }
        });
        const address = response.data.results[0].locations[0].street + ", " +
                        response.data.results[0].locations[0].adminArea5 + ", " +
                        response.data.results[0].locations[0].adminArea3 + ", " +
                        response.data.results[0].locations[0].adminArea1;
        setOrigin(address);
      } catch (error) {
        console.error('Error fetching origin address', error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates((prevCoords) => ({
          ...prevCoords,
          origin: [latitude, longitude]
        }));
        setMapCenter([latitude, longitude]);
        fetchOriginAddress(latitude, longitude);
      });
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const destinationResponse = await axios.get('http://localhost:3000/api/mapquest/geocoding/v1/address', {
        params: {
          key: '6n8mOkjIr008hDT2QOx9Vs9NNsAmCWEz',
          location: destination
        }
      });

      const destinationCoords = destinationResponse.data.results[0].locations[0].latLng;

      setCoordinates((prevCoords) => ({
        ...prevCoords,
        destination: [destinationCoords.lat, destinationCoords.lng]
      }));
    } catch (error) {
      console.error('Error fetching coordinates', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '70%', height: '70%', position: 'relative' }}>
        <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <input
              type="text"
              value={origin}
              placeholder="Origin"
              readOnly
              style={{ marginRight: '10px' }}
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              style={{ marginRight: '10px' }}
            />
            <button type="submit">Get Directions</button>
          </div>
        </form>
        <MapContainer center={mapCenter} zoom={5} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates.origin} icon={redIcon} />
          <Marker position={coordinates.destination} icon={blueIcon} />
          <Polyline positions={[coordinates.origin, coordinates.destination]} />
        </MapContainer>
      </div>
    </div>
  );
};

export default DelMap;
