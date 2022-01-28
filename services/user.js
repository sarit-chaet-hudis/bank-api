const User = require("../models/User");

const saveUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();
};

const handleWithdraw = async (passportId, amount) => {
  try {
  } catch {}
};
module.exports = { saveUser, handleWithdraw };
