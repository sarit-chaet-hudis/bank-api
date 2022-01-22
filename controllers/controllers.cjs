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

function deposit(req, res) {
  let accounts = loadAccounts();
  const { id, amount } = req.query;
  const user = accounts.find((account) => account.id === id);
  if (!user) {
    res.send(`No user in bank has id ${id}. Please try again.`);
  } else if (isNaN(amount)) {
    res.send("Deposit amount has to be a number");
  } else if (+amount <= 0) {
    res.send("Deposit amount has to be a positive number");
  } else {
    user.cash = +user.cash + +amount;
    res.send(user);
    saveAccounts(accounts);
  }
}
function withdraw(req, res) {
  let accounts = loadAccounts();
  const { id, amount } = req.query;
  const user = accounts.find((account) => account.id === id);
  if (!user) {
    res.send(`No user in bank has id ${id}. Please try again.`);
  } else if (isNaN(amount)) {
    res.send("Withdrawal amount has to be a number");
  } else if (+amount <= 0) {
    res.send("Withdrawal amount has to be a positive number");
  } else if (user.cash + user.credit - amount < 0) {
    res.send(
      "User cannot withraw this amount, try a smaller one or update credit"
    );
  } else {
    user.cash = +user.cash - +amount;
    res.send(user);
    saveAccounts(accounts);
  }
}
function transfer(req, res) {
  // TODO
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
