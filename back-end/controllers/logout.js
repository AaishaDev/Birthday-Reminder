const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  try {
    const foundUser = await User.findOne({ _id: req.id }).exec();

    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = handleLogout;
