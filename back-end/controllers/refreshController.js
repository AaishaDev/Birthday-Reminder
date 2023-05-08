const User = require("../model/User");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const refreshToken = authHeader.split(" ")[1];

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );

    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
