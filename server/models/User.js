var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  passID: { type: String, required: true },
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
