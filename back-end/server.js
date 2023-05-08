// Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnection");
const { default: mongoose } = require("mongoose");
const verifyJWT = require("./middlewares/verifyJwt");
const { allowedOrigins } = require("./config/allowedOrigin");
const { sendReminder } = require("./sendEmail/emailSchedule");
const cron = require('node-cron');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to database
dbConnect();

// Set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});



// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Send Reminders
cron.schedule('0 0 * * *', () => {
  sendReminder()
});
cron.schedule('24 21 * * *', () => {
  sendReminder()
});
cron.schedule('00 16 * * *', () => {
  sendReminder()
});

//Routes
app.get('/', (req, res) => {
  console.log("home route");
  res.send({ message: "You are on home route" });
});

// Register routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require('./routes/refresh'));

// Protected routes (require authentication)
app.use(verifyJWT);
app.use("/otpVerify", require('./routes/otpVerify'));
app.use("/isEmailVerified", require('./routes/isEmailVerified'));
app.use("/reminder", require('./routes/reminder'));
app.use("/logout", require('./routes/logout'));

// Start the server
mongoose.connection.once("open", () => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server up and running on port ${process.env.PORT || 8000}`);
  });
});



