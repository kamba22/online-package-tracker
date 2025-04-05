// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Package = require('./models/package'); // Import the Package model

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = 'mongodb+srv://nsasharon1:Gc3ujBm0VS4Los4x@cluster0.qpehdkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Routes

// Create a new package
app.post('/api/packages', async (req, res) => {
  const { trackingNumber, status } = req.body;

  try {
    const newPackage = new Package({ trackingNumber, status });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(400).json({ message: 'Error creating package', error: err });
  }
});

// Fetch all packages
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching packages', error: err });
  }
});

// Update package status
app.put('/api/packages/:trackingNumber', async (req, res) => {
  const { trackingNumber } = req.params;
  const { status } = req.body;

  try {
    const updatedPackage = await Package.findOneAndUpdate({ trackingNumber }, { status }, { new: true });
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: 'Error updating package', error: err });
  }
});

// Delete a package
app.delete('/api/packages/:trackingNumber', async (req, res) => {
  const { trackingNumber } = req.params;

  try {
    await Package.findOneAndDelete({ trackingNumber });
    res.status(200).json({ message: 'Package deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting package', error: err });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
