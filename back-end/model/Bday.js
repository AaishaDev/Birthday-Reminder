const mongoose = require("mongoose");

const bdaySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bday: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Bday = mongoose.model("Bday", bdaySchema);
module.exports = Bday;
