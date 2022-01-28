const User = require("../models/User");

const saveUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();
};

const handleWithdraw = async (passportId, amount) => {
  if (isNaN(amount) || +amount <= 0) {
    throw Error("Amount has to be a valid positive number");
  }
  const user = await User.findOne({ passportId: passportId });
  if (!user)
    throw Error(`No user in bank has id ${passportId}. Please try again.`);
  const isEnoughMoney = amount < user.cash + user.credit;
  if (!isEnoughMoney) {
    throw Error(`User can only draw a maximum of ${user.cash + user.credit}`);
  } else {
    user.cash -= amount;
    await user.save();
    return `Success. New user balance after withdrawal is ${user.cash}`;
  }
};

const handleDeposit = async (passportId, amount) => {
  try {
    if (+amount <= 0 || isNaN(amount)) {
      throw Error("Deposit amount has to be a positive number");
    }
    const user = await User.findOne({ passportId: passportId });
    if (!user) throw Error("No such user");
    user.cash += +amount;
    await user.save();
    return `New user cash is ${user.cash}`;
  } catch (err) {
    return err.message;
  }
};
module.exports = { saveUser, handleWithdraw, handleDeposit };
