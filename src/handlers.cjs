const fs = require("fs");

function addUser(req, res) {
  // add new user, data: passport id, cash(default 0), credit(default 0).
  // if all is well, add to json and return success msg
  const { id, cash = 0, credit = 0 } = req.query;
  if (!id) {
    res.send("no id supplied for new user");
  } else if (typeof +cash !== "number" || typeof +credit !== "number") {
    res.send("cash and credit parameters need to be numbers");
  } else {
    const accounts = loadAccounts();
    for (let i = 0; i < accounts.length; i++) {
      // check if id doesnt already exist
      if (accounts[i].id === id) {
        res.send(`Bank already has user with id ${id}`);
      }
    }
    accounts.push({ id, cash, credit });
    res.send(accounts);
    saveAccounts(accounts);
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
function transfer(req, res) {}

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

function getAllUsers(req, res) {
  res.send(loadAccounts());
}

const loadAccounts = () => {
  try {
    const data = fs.readFileSync("./src/accounts.json").toString();
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveAccounts = (accounts) => {
  const data = JSON.stringify(accounts);
  fs.writeFileSync("./src/accounts.json", data);
};

// As req.query’s shape is based on user-controlled input, all properties
//  and values in this object are untrusted and should be validated before
//  trusting. For example, req.query.foo.toString() may fail in multiple
//  ways, for example foo may not be there or may not be a string, and
//   toString may not be a function and instead a string or other user-input.

module.exports = { addUser, deposit, withdraw, transfer, getUser, getAllUsers };
