const mongoose = require("mongoose");

const uri = "mongodb+srv://nsasharon1:Gc3ujBm0VS4Los4x@cluster0.qpehdkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas!"))
.catch(err => console.error("MongoDB connection error:", err));

module.exports = mongoose;
