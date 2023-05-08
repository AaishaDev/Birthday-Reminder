const User = require("../model/User");

const otpVerify = async (req, res) => {
  const { otpVal } = req.body;
  otp = parseInt(otpVal);

  const foundUser = await User.findOne({ _id: req.id }).exec();

  try {
    if (otp === foundUser.otp) {
      const user = await User.findByIdAndUpdate(
        foundUser._id,
        { verified: true, otp: "" },
        {
          new: true, // return the updated note instead of the old one
        }
      );

      if (!user) {
        return res.status(203).json({ error: "User not found" });
      }

      res.json(user);
    } else {
      res.status(401).json({ message: "Wrong OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  otpVerify,
};
