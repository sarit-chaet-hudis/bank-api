const ERRORS = require("../handlers/errorHandlers/user/errors.constants");
const User = require("../models/User");
const { saveUser, handleWithdraw, handleDeposit } = require("../services/user");

async function addUser(req, res) {
  try {
    const user = req.body;
    let { passportId, cash, credit } = user;

    if (!passportId) {
      throw Error("No passport Id supplied");
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
  try {
    let { passportId } = req.params;
    const user = await User.find({ passportId: passportId });
    const resp = await User.deleteOne({ passportId: passportId });
    if (resp.deletedCount === 0) {
      throw Error("No user deleted, check passport ID and try again");
    }
    res.send(resp);
  } catch (err) {
    res.send(err.message);
  }
}

async function deposit(req, res) {
  const { passportId, amount } = req.params;

  try {
    const resp = await handleDeposit(passportId, amount);
    res.send(resp);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function withdraw(req, res) {
  const { passportId, amount } = req.params;

  try {
    const resp = await handleWithdraw(passportId, amount);
    res.send(resp);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function transfer(req, res) {
  const { passportIdFrom, passportIdTo, amount } = req.params;

  try {
    const withdrawResp = await handleWithdraw(passportIdFrom, amount);
    const depositResp = await handleDeposit(passportIdTo, amount);
    res.send(depositResp);
  } catch (err) {
    res.send(err.message);
  }
}

function updateCredit(req, res) {
  // TODO
}

async function getUser(req, res) {
  const { passportId } = req.params;
  try {
    const user = await User.findOne({ passportId: passportId });
    if (!user) throw Error("No such user");
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getAllUsers(req, res) {
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
