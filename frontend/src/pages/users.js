import React, { useState } from 'react';
import axios from 'axios';
import '../styles/userpage.css';

const TrackPackage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [currentStatus, setCurrentStatus] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const statusSteps = ['Packed', 'Shipped', 'In Transit', 'Delivered'];

  const handleTrack = async () => {
    if (!trackingNumber) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:3999/api/Package/${trackingNumber}`);
      if (response.data && response.data.status) {
        setCurrentStatus(response.data.status);
        setError('');
      } else {
        setCurrentStatus(null);
        setError('Package not found.');
      }
    } catch (err) {
      setError('Error retrieving package status.');
    }

    setLoading(false);
  };

  const getStepIndex = (status) => {
    return statusSteps.indexOf(status);
  };

  return (
    <section className="track-package-container">
      <h2>Track Your Package</h2>
      
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter tracking number"
        className="tracking-input"
      />
      <button onClick={handleTrack} disabled={loading} className="track-button">
        {loading ? "Tracking..." : "Track Package"}
      </button>

      {error && <p className="error">{error}</p>}

      {currentStatus && (
        <div className="status-steps">
          {statusSteps.map((step, index) => {
            const stepIndex = getStepIndex(currentStatus);
            return (
              <div key={index} className="status-step">
                <div className={`circle ${index <= stepIndex ? 'active' : ''}`}>
                  {index <= stepIndex ? '✔' : ''}
                </div>
                <p className="label">{step}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TrackPackage;
