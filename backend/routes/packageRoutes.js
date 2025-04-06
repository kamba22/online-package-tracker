const express = require('express');
const path = require('path');
const router = express.Router();
const Package = require('../models/package'); // Import the Package model
const { createPackage } = require(path.join(__dirname, '..', 'controllers', 'packageController'));

// Create a new package
router.post('/api/Package', async (req, res) => {
    console.log('Received request at /api/Package', req.body); // Debugging

    try {
        const { trackingNumber, status } = req.body;

        if (!trackingNumber) {
            return res.status(400).json({ message: 'Tracking number is required' });
        }

        const newPackage = new Package({
            trackingNumber,
            status: status || 'Pending', // Default status if none is provided
        });

        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (error) {
        console.error('Error saving package:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all packages
router.get('/api/Package', async (req, res) => {
    try {
        const packages = await Package.find();
        res.status(200).json(packages);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching packages', error: err });
    }
});

// Get a specific package by tracking number
router.get('/api/Package/:trackingNumber', async (req, res) => {
    try {
        const package = await Package.findOne({ trackingNumber: req.params.trackingNumber });
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json(package);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving package', error: err });
    }
});

// Update package status
router.put('/api/Package/:trackingNumber', async (req, res) => {
    const { trackingNumber } = req.params;
    const { status } = req.body;

    try {
        const updatedPackage = await Package.findOneAndUpdate({ trackingNumber }, { status }, { new: true });

        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        res.status(200).json(updatedPackage);
    } catch (err) {
        res.status(500).json({ message: 'Error updating package', error: err });
    }
});

// Delete a package
router.delete('/api/Package/:trackingNumber', async (req, res) => {
    const { trackingNumber } = req.params;

    try {
        const deletedPackage = await Package.findOneAndDelete({ trackingNumber });

        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting package', error: err });
    }
});

module.exports = router;
