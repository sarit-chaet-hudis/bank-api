const User = require("../models/User");

const saveUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();
};

const handleWithdraw = async (passportId, amount) => {
  // TODO make sure error is thrown, maby empty user is not !user ?
  try {
    const user = await User.findOne({ passportId: passportId });
    if (!user)
      throw Error(`No user in bank has id ${passportId}. Please try again.`);
    const isEnoughMoney = amount < user.cash + user.credit;
    if (!isEnoughMoney) {
      throw Error(`User can only draw a maximum of ${user.cash + user.credit}`);
    } else {
      user.cash -= amount;
      await user.save();
      return `New user balance after withdrawal is ${user.cash}`;
    }
  } catch (err) {
    return err.message;
  }
};
module.exports = { saveUser, handleWithdraw };
