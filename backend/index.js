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
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000", // Ensure this matches your React app
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));


// MongoDB connection string
const mongoURI = 'mongodb+srv://nsasharon1:Gc3ujBm0VS4Los4x@cluster0.qpehdkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDb Atlas'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Routes
const packageRoutes = require("./routes/packageRoutes.js");
console.log(packageRoutes);
app.use("/api/Package", packageRoutes);

// Create a new package

app.post('/', async (req, res) => {
  const { trackingNumber, status } = req.body;
  console.log('Received package data:', { trackingNumber, status });

  if (!trackingNumber || !status) {
      return res.status(400).json({ message: 'Tracking number and status are required' });
  }

  try {
    const newPackage = new Package({ trackingNumber, status });
    await newPackage.save();
     // Simulating a database insert
      res.status(201).json(newPackage);

      res.json({message: "Packagecreated successfully", package:newPackage});
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

// Fetch all packages
app.get('/api/Package', async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching packages', error: err });
  }
});

// Update package status
app.put('/api/Package/:trackingNumber', async (req, res) => {
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
app.delete('/api/Package/:trackingNumber', async (req, res) => {
  const { trackingNumber } = req.params;

  try {
    await Package.findOneAndDelete({ trackingNumber });
    res.status(200).json({ message: 'Package deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting package', error: err });
  }
});

// Start the server
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});

