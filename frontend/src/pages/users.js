import React, { useState } from 'react';
//import axios from 'axios';
import '../styles/userpage.css'; // Make sure this file exists

//const statusSteps = ['Packed', 'Sent', 'Delivered', 'Received'];

const UserPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  //const [packageInfo, setPackageInfo] = useState(null);
  const [packageInfo, setPackageInfo] = useState({
    trackingNumber: '123456',
    status:'Sent',
    updates:[
      {update:'Package packed', date: '2025-04-05T12:00:00Z'},
      {update:'Package sent', date: '2025-04-06T14:00:00Z'},
    ],
  });

  /*const handleTrackPackage = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/packages/${trackingNumber}`);
      setPackageInfo(response.data);
    } catch (err) {
      console.error('Error tracking package:', err);
      setPackageInfo(null); // Reset package info if not found
    }
  };*/
  //dummy track function
  const handleTrackPackage = () => {
    setPackageInfo({
      trackingNumber: '123456',
    status:'Sent',
    updates:[
      {update:'Package packed', date: '2025-04-05T12:00:00Z'},
      {update:'Package sent', date: '2025-04-06T14:00:00Z'},
    ],
    });
  };

  // Fix for undefined status
  /*const getStepIndex = (status) => {
    if (!status) return -1; // Avoid crashing if status is undefined
    return statusSteps.findIndex(step => step.toLowerCase() === status.toLowerCase());
  };*/

  return (
    <div className="user-page">
      <h2>Track Your Package</h2>
      <input
        type="text"
        placeholder="Enter Tracking Number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button onClick={handleTrackPackage}>Track</button>

      {packageInfo && (
        <div className="package-info">
          <h3>Tracking Number: {packageInfo.trackingNumber}</h3>
          <p><strong>Status:</strong> {packageInfo.status}</p>
          <div className="status-tracker">
            <div className={`status-step ${packageInfo.status === 'Packed' ? 'active' : ''}`}>
              <div className="step-circle">1</div>
              <p>Packed</p>
            </div>
            <div className={`status-step ${packageInfo.status === 'Sent' ? 'active' : ''}`}>
              <div className="step-circle">2</div>
              <p>Sent</p>
            </div>
            <div className={`status-step ${packageInfo.status === 'Delivered' ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <p>Delivered</p>
            </div>
            <div className={`status-step ${packageInfo.status === 'Received' ? 'active' : ''}`}>
              <div className="step-circle">4</div>
              <p>Received</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
