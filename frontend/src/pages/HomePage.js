/// src/components/Homepage.js
import React, { useState, useEffect } from 'react';
//import api from './api';
//import { createPackage } from '../api';
import axios from 'axios';
import '../styles/homepage.css'; // Adjust the path based on your folder structure
import { SERVER_URL } from '../config/config'; // Adjust the path based on your folder structure

const requestURL = `${SERVER_URL}/api/Package`;

const Homepage = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [status, setStatus] = useState('');
    const [Package, setPackages] = useState([]);
    //const [Package, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null); 
    const [error, setError] = useState(null);

    // Handle the creation of a new package
    const handleCreatePackage = async () => {
        console.log('Sending request to create package...');
        if (!trackingNumber || !status) {
            alert('Please enter both tracking number and status.');
            return;
        }
        console.log('searching');
        try {
            //console.log('Sending request to create package...');
            //const response = await api.post('/packages', { trackingNumber, status }); // Correct endpoint /packages (plural)
            console.log('testing');
            const response = await axios.post(requestURL, {
                trackingNumber, //to send tracking number
                status, // to send status in the body
            });

            console.log('Package created:', response.data);
            setPackages([...Package, response.data]); // Add new package to the list
            setTrackingNumber('');
            setStatus('');
        } catch (err) {
            console.error('Error creating package:', err);
            setError('Failed to create package');
        }
    };

    // Fetch packages from the backend when the component mounts
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                console.log('Fetching packages from /api/Package');
                const response = await axios.get(requestURL);
                if (response.data && response.data.length > 0) {
                    setPackages(response.data);
                } else {
                    setPackages([]); // In case the response is empty
                }
            } catch (err) {
                console.error('Error fetching packages:', err);
                setError('Failed to load packages');
            }
        };

        fetchPackages();
    }, []); // Empty dependency array, runs only once when the component mounts

    const handleDeletePackage = async (trackingNumber) => {
        try {
            await axios.delete(`${requestURL}/${trackingNumber}`);
            setPackages(Package.filter(pkg => pkg.trackingNumber !== trackingNumber)); // Remove package from list
        } catch (err) {
            console.error('Error deleting package:', err);
            setError('Failed to delete package');
        }
    };

    // Handle the update of a package
    const handleUpdatePackage = async () => {
        if (!selectedPackage || !status) {
            alert('Please select a package to update and enter a new status.');
            return;
        }

        try {
            const updatedPackage = { ...selectedPackage, status };
            const response = await axios.put(`${requestURL}/${selectedPackage.trackingNumber}`, updatedPackage);

            const updatedPackages = Package.map(pkg =>
                pkg.trackingNumber === selectedPackage.trackingNumber ? response.data : pkg
            );
            setPackages(updatedPackages);
            setSelectedPackage(null);
            setTrackingNumber('');
            setStatus('');
        } catch (err) {
            console.error('Error updating package:', err);
            setError('Failed to update package');
        }
    };

    return (
        <div className="homepage-container">
            <h2>Package Tracker</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Tracking Number"
                    value={trackingNumber}
                    onChange={e => setTrackingNumber(e.target.value)}
                    disabled={selectedPackage} // Disable when updating
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                />
                <button onClick={handleCreatePackage}>Create Package</button>
                {selectedPackage && (
                    <button onClick={handleUpdatePackage}>Update Package</button>
                )}
            </div>
            <h3>Packages</h3>
            {Package.length > 0 ? (
                <ul>
                    {Package.map(pkg => (
                        <li key={pkg.trackingNumber}>
                            <div className="package-info">
                                <span>{pkg.trackingNumber} - {pkg.status}</span>
                                <button onClick={() => setSelectedPackage(pkg)} className="edit-btn">
                                    Edit
                                </button>
                                <button onClick={() => handleDeletePackage(pkg.trackingNumber)} className="delete-btn">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No packages found.</p>
            )}
        </div>
    );
};

export default Homepage;