const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Load environment variables
dotenv.config();

// Define the MongoDB connection string
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const dbConnect=()=>{
   mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log("Error connecting to database", err);
    });
}
module.exports = dbConnect