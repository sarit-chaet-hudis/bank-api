const { get } = require("http");
const User = require("../models/User");

async function addUser(req, res) {
  // add new user, data: passport id, cash(default 0), credit(default 0).
  let { passportId, cash, credit } = req.body;

  if (!passportId) {
    res.status(400).send("No passport Id supplied for new user");
  } else {
    try {
      if (!cash) cash = 0;
      if (!credit) credit = 0;

      const newUser = await User.create({ passportId, cash, credit });
      res.send("User added");
    } catch (err) {
      res.send(err.message);
    }
  }
}

async function deposit(req, res) {
  const { passportId, amount } = req.query;

  if (!passportId) res.send("No passport ID supplied");
  else if (isNaN(amount)) {
    res.send("Deposit amount has to be a number");
  } else if (+amount <= 0) {
    res.send("Deposit amount has to be a positive number");
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

async function withdraw(req, res) {
  const { passportId, amount } = req.query;

  if (!passportId) res.send("No passport ID supplied");
  else if (isNaN(amount)) {
    res.send("Withdrawal amount has to be a number");
  } else if (+amount <= 0) {
    res.send("Withdrawal amount has to be a positive number");
  } else {
    try {
      const user = await User.findOne({ passportId: passportId });
      if (!user) {
        res.send(`No user in bank has id ${passportId}. Please try again.`);
      } else if (user.cash + user.credit - amount < 0) {
        res.send(`User can only draw a maximum of ${user.cash + user.credit}`);
      } else {
        user.cash -= amount;
        await user.save();
        res.send(`New user balance is ${user.cash}`);
      }
    } catch (err) {
      res.send(err.message);
    }
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

// const loadAccounts = () => {
//   try {
//     const data = fs.readFileSync("./../accounts.json").toString();
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// };

const saveAccounts = (accounts) => {
  const data = JSON.stringify(accounts);
  fs.writeFileSync("./src/accounts.json", data);
};

module.exports = {
  addUser,
  deposit,
  withdraw,
  transfer,
  updateCredit,
  getUser,
  getAllUsers,
};
