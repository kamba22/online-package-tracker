// src/components/UpdatesPage.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdatesPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`http://localhost:5000/api/packages/${trackingNumber}`, { update: { status } });
      setTrackingNumber('');
      setStatus('');
      alert('Package status updated!');
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div>
      <h2>Update Package Status</h2>
      <input
        type="text"
        placeholder="Tracking Number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={handleUpdateStatus}>Update Status</button>
    </div>
  );
};

export default UpdatesPage;
