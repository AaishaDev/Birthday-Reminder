const User = require("../model/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
// Load environment variables
dotenv.config();

const handleNewUser = async (req, res) => {
  const { email, password } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);

  if (!email || !password) {
    return res.sendStatus(400);
  }
  // check for duplicate email

  const duplicate = await User.findOne({ email }).exec();

  if (duplicate) {
    return res.status(409).json({ message: "Email exists" });
  }
  try {
    // encrypt password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPassword,
      verified: false,
      refreshToken: "",
      otp: otp,
    });

    // create a nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // replace with your email address
        pass: process.env.EMAIL_PSWD, // replace with your password
      },
    });

    // setup email data
    let mailOptions = {
      from: process.env.EMAIL, // replace with your email address
      to: `${email}`, // replace with the recipient's email address
      subject: "Email Verification",
      text: `Here's OTP ${otp} to verify email!`,
    };

    // send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred: " + error.message);
      } else {
        console.log("Email sent successfully!");
        console.log("Message ID: " + info.messageId);
      }
    });

    return res.status(200).json({ message: `${email} succesfully registered` });
  } catch (err) {
    console.log(err, "error in registor route");
    return res.status(500).json({ message: "Error while registering user" });
  }
};
module.exports = {
  handleNewUser,
};
