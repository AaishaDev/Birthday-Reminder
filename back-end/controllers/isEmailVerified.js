const User = require("../model/User");

const isEmailVerified = async (req, res) => {

  try {
    const foundUser = await User.findOne({ _id: req.id }).exec();

    if (foundUser.verified) {
      return res.status(200).json({ message: "Email is verified" });
    }
    else{
      return res.status(401).json({ message: "Email is not verified" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  isEmailVerified,
};
