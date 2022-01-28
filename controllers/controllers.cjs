const ERRORS = require("../handlers/errorHandlers/user/errors.constants");
const User = require("../models/User");
const { saveUser, handleWithdraw } = require("../services/user");

async function addUser(req, res) {
  try {
    const user = req.body;
    let { passportId, cash, credit } = user;

    if (!passportId) {
      res.status(400).send("No passport Id supplied for new user");
      // TODO consider throw error - is a better practice ?
    } else {
      if (!cash) cash = 0;
      if (!credit) credit = 0;
      await saveUser({ passportId, cash, credit });
      res.send("User added");
    }
  } catch (err) {
    res.send({ statusCode: err.code, message: error.message });
  }
}

async function deleteUser(req, res) {
  // add new user, data: passport id, cash(default 0), credit(default 0).
  let { passportId, adminPass } = req.query;
  // change to params

  if (!passportId) {
    res.status(400).send("No passport Id supplied for deletion");
    // see above
  } else if (adminPass != "123456") {
    res.send("Wrong admin password");
  } else {
    try {
      // wrap the all the function try catch
      const user = await User.find({ passportId: passportId });
      if (!user) res.send(`No user has passport ID ${passportId}`);
      else {
        const resp = await User.deleteOne({ passportId: passportId });
        res.send(resp);
      }
    } catch (err) {
      res.send(err.message);
    }
  }
}

async function deposit(req, res) {
  const { passportId, amount } = req.params;

  console.log("~ passportId in controller", passportId);

  if (+amount <= 0) {
    res.status(400).send("Deposit amount has to be a positive number");
  } else {
    try {
      const user = await User.findOne({ passportId: passportId });
      user.cash += amount;
      await user.save();
      res.send(`New user cash is ${user.cash}`);
    } catch (err) {
      res.send(err.message);
    }
  }
}

// same

async function withdraw(req, res) {
  const { passportId, amount } = req.params;
  const {
    isNaNError,
    positiveNumberError,
    worngIdError = `No user in bank has id ${passportId}. Please try again.`,
  } = ERRORS;
  // params requierd

  // if (!passportId) res.send("No passport ID supplied");

  if (isNaN(amount)) return res.send(isNaNError);
  if (+amount <= 0) return res.send(positiveNumberError);

  try {
    const user = await User.findOne({ passportId: passportId });
    const isEnoughMoney = user.cash + user.credit - amount < 0;

    if (!user) return res.send(worngIdError);
    if (isEnoughMoney) {
      res.send(`User can only draw a maximum of ${user.cash + user.credit}`);
    } else {
      user.cash -= amount;
      await user.save();
      res.status(200).send(`New user balance is ${user.cash}`);
    }
  } catch (err) {
    res.send(err.message);
  }
}

async function transfer(req, res) {
  const { passportIdFrom, passportIdTo, amount } = req.query;

  if (!passportIdFrom || !passportIdTo)
    res.send("Please enter both passport IDs");
  else if (isNaN(amount)) {
    res.send("Transfer amount has to be a number");
  } else if (+amount <= 0) {
    res.send("Transfer amount has to be a positive number");
  } else {
    try {
      const userFrom = await User.findOne({ passportId: passportIdFrom });
      const userTo = await User.findOne({ passportId: passportIdTo });
      if (!userFrom || !userTo) {
        res.send(`One of the IDs is wrong, try again`);
      } else if (userFrom.cash + userFrom.credit - amount < 0) {
        res.send(
          `User ${userFrom.passportId} can only draw a maximum of ${
            userFrom.cash + userFrom.credit
          }`
        );
      } else {
        userFrom.cash -= amount;
        userTo.cash += amount;
        await userFrom.save();
        await userTo.save();
        res.send(
          `Updated balance for ${userFrom.passportId} is ${userFrom.cash}`
        );
      }
    } catch (err) {
      res.send(err.message);
    }
  }
}

// very very long can be more short and simple

// this is a very long function please try to use less with the if else if else

function updateCredit(req, res) {
  // TODO
}

function getUser(req, res) {
  let accounts = loadAccounts();
  const { id } = req.params;
  const user = accounts.find((account) => account.id === id);
  if (!user) {
    res.send(`No user in bank has id ${id}. Please try again.`);
  } else {
    res.send(user);
  }
}

async function getAllUsers(req, res) {
  console.log("in getAllUsers");
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

module.exports = {
  addUser,
  deposit,
  withdraw,
  transfer,
  updateCredit,
  getUser,
  getAllUsers,
  deleteUser,
};
