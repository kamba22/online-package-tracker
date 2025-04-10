import React, { useState } from 'react';
import axios from 'axios';
import '../styles/userpage.css';
import { SERVER_URL } from '../config/config'; // Adjust the path based on your folder structure

const requestURL = `${SERVER_URL}/api/Package`;

const statusSteps = ["Pending", "Dispatched", "In Transit", "Delivered"];

const TrackPackage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!trackingNumber) return;

    try {
      const response = await axios.get(`${requestURL}/${trackingNumber}`);
      if (response.data && response.data.status) {
        setCurrentStatus(response.data.status);
        setError('');
      } else {
        setCurrentStatus(null);
        setError('Package not found.');
      }
    } catch (err) {
      console.error(err);
      setCurrentStatus(null);
      setError('Package not found or server error.');
    }
  };

  return (
    <div className="tracker-container">
      <h2>Track Your Package</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter tracking number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <button onClick={handleTrack}>Track</button>
      </div>

      {error && <p className="error">{error}</p>}

      {currentStatus && (
        <div className="status-steps">
          {statusSteps.map((step, index) => {
            const stepIndex = statusSteps.findIndex(s=> s ===currentStatus);
            return (
              <div key={index} className={`step ${index <= stepIndex ? "active" : ""}`}>
                <div className={`circle ${index <= stepIndex ? "active" : ""}`}>
                  {index <= stepIndex ? "✔" : ""}
                </div>
                <div className="label">{step}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrackPackage;
