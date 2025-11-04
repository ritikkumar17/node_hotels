const mongoose=require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
//const mongoURL = 'mongodb://localhost:27017/hotels'  // database name
//const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGODB_URL;

//Set Up MongoDB Connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


//Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on("connected",()=>{
    console.log('Connected to MongoDB server');
});

db.on("error",(err)=>{
    console.log('MongoDB connection Error:' ,err);
});

db.on("disconnected",()=>{
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;