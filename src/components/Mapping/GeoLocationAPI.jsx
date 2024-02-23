import React, { useState, useEffect } from 'react';

const GeoLocation = () => {
    const [location, setLocation] = useState('');

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else { 
            setLocation('Geolocation is not supported by this browser.');
        }
    }

    const showPosition = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        reverseGeocode(lat, lon);
    }

    const showError = (error) => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                setLocation('User denied the request for Geolocation.');
                break;
            // Handle other error cases
        }
    }

    const reverseGeocode = (lat, lon) => {
        // Call to a reverse geocoding API
        // For example, using OpenStreetMap's Nominatim:
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(data => {
                setLocation(data.display_name);
            })
            .catch(error => {
                setLocation('Error in reverse geocoding');
            });
    }

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <div>
            <h2>Your Location:</h2>
            <p>{location}</p>
        </div>
    );
}

export default GeoLocation;
