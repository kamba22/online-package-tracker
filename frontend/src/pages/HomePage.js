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

    return (
        <div>
            <h2>Homepage</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if there's an error */}
            <div>
                <input
                    type='text'
                    placeholder='Tracking Number'
                    value={trackingNumber}
                    onChange={e => setTrackingNumber(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Status'
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                />
                <button onClick={handleCreatePackage}>Create Package</button>
            </div>
            <h3>Packages</h3>
            {Package.length > 0 ? (
                <ul>
                    {Package.map(pkg => (
                        <li key={pkg.trackingNumber}>
                            {pkg.trackingNumber} - {pkg.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No packages found.</p> // Show this if there are no packages
            )}
        </div>
    );
};

export default Homepage;
