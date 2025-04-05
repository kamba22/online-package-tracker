// backend/models/Package.js
const mongoose = require('mongoose');


const PackageSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    //enum: ['Packed', 'Sent', 'Delivered', 'Received'],
  },
  updates: [
    {
      date: { type: Date, default: Date.now },
      update: String,
    },
  ],
});

const Package = mongoose.model('packages', PackageSchema);

module.exports = Package;

