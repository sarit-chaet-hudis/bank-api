var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  passportId: { type: String, required: true, unique: true },
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
