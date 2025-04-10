const Package = require("../models/package"); // Import Package model

// Create Package
exports.createPackage = async (req, res) => {
  console.log("Received request at /package/create", req.body);

  try {
    const { trackingNumber, status } = req.body;

    if (!trackingNumber) {
      return res.status(400).json({ message: "Tracking number is required" });
    }

    const newPackage = new Package({
      trackingNumber,
      status: status || "Pending",
    });

    await newPackage.save();
    res.json(newPackage);
  } catch (error) {
    console.error("Error saving package:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to track a package
exports.trackPackage = async (req, res) => {
  try {
      const trackingNumber = req.params.trackingNumber; // Get tracking number from URL params
      const package = await Package.findOne({ trackingNumber }); // Find package by tracking number

      if (!package) {
          return res.status(404).json({ error: 'Package not found' }); // Package not found
      }

      // Respond with the package status
      return res.json({ status: package.status });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' }); // In case of server error
  }
};
// Example: packagesController.js
/*const Package = require('../models/packageModel');

exports.trackPackage = async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;
    const package = await Package.findOne({ trackingNumber });

    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Send package info including status
    return res.status(200).json(package);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};*/
