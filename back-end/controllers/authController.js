// Import User model and required packages
const User = require("../model/User");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Handle authentication request
const handleAuth = async (req, res) => {
  const {email, password} = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password are required." });
  }

  // Find user by email
  const foundUser = await User.findOne({email}).exec();

  // If user not found, send unauthorized response
  if (!foundUser) {
    return res.status(401).json({message:"Unauthorized"})
  }

  // Compare provided password with user password
  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  // If password doesn't match, send wrong password response
  if (!passwordMatch) {
    return res.status(401).json({message:"Wrong Password"})
  }

  // Generate access and refresh tokens
  const accessToken = jwt.sign({id: foundUser.id, email: foundUser.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15min'});
  const refreshToken = jwt.sign({id: foundUser.id, email: foundUser.email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});

  // Save refresh token with current user
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();

  // Send response with tokens
  const tokenObj = {
    refreshToken: foundUser.refreshToken,
    accessToken: accessToken,
  };
  res.json(tokenObj);
};

// Export handleAuth function
module.exports = {
  handleAuth,
};
