import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import BackgroundImage from '../../assets/profile.jpg';

// Fix the default icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DelMap = () => {
  const [vehiclePosition, setVehiclePosition] = useState([28.6139, 77.2090]);
  const [customerPosition, setCustomerPosition] = useState(null); // State for customer position
  const markerRef = useRef(null);

  const SetMapCenter = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, map.getZoom());
    }, [position, map]);
    
    return null;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = [position.coords.latitude, position.coords.longitude];
        setVehiclePosition(userCoords);
      },
      (error) => {
        console.error('Error getting user location', error);
      }
    );

    const fetchGpsData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gps/vehicle1');
        const { latitude, longitude } = response.data;
        setVehiclePosition([latitude, longitude]);
      } catch (error) {
        console.error('Error fetching GPS data', error);
      }
    };

    fetchGpsData();
    const interval = setInterval(fetchGpsData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [vehiclePosition]);

  const handleCustomerInput = (e) => {
    e.preventDefault();
    const latitude = parseFloat(e.target.latitude.value);
    const longitude = parseFloat(e.target.longitude.value);
    if (!isNaN(latitude) && !isNaN(longitude)) {
      setCustomerPosition([latitude, longitude]);
    }
    e.target.reset(); // Clear input fields
  };

  return (
    <div className="bg-gradient-to-r from-white via-yellow-100 to-white ml-60 mt-[78px] w-full h-screen flex items-center justify-center relative">
      <div className="absolute inset-0">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-full h-full object-cover blur-sm opacity-30"
        />
      </div>

      <form onSubmit={handleCustomerInput} className="absolute top-4 left-4 z-10">
        <input
          type="text"
          name="latitude"
          placeholder="Customer Latitude"
          required
          className="mr-2 p-1 rounded"
        />
        <input
          type="text"
          name="longitude"
          placeholder="Customer Longitude"
          required
          className="mr-2 p-1 rounded"
        />
        <button type="submit" className="p-1 bg-yellow-300 rounded">Add Customer</button>
      </form>

      <MapContainer
        center={vehiclePosition}
        zoom={15}
        className="h-[calc(100vh-200px)] w-[calc(145vh)]"
      >
        <SetMapCenter position={vehiclePosition} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={vehiclePosition} ref={markerRef}>
          <Popup>Vehicle is here</Popup>
        </Marker>
        {customerPosition && ( // Add marker for customer if position is set
          <Marker position={customerPosition}>
            <Popup>Customer is here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default DelMap;
