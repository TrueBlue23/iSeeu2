import { useEffect, useState } from 'react';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!location && !error) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            });

            // Send data to backend (API route)
            fetch('/api/log', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
              })
            });
          },
          err => setError(err.message)
        );
      } else {
        setError("Geolocation not supported.");
      }
    }
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>I-See-You Demo</h1>
      {!location && !error && <p>Requesting your location...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {location &&
        <div>
          <h2>Your Location</h2>
          <ul>
            <li>Latitude: {location.latitude}</li>
            <li>Longitude: {location.longitude}</li>
            <li>Accuracy: {location.accuracy} meters</li>
          </ul>
          <a href={`https://maps.google.com/?q=${location.latitude},${location.longitude}`} target="_blank" rel="noopener noreferrer">
            View on Google Maps
          </a>
        </div>
      }
    </main>
  );
}
