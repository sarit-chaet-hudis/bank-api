const express = require("express");
const apiRouter = express.Router();

const {
  addUser,
  deposit,
  withdraw,
  transfer,
  getUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/controllers.cjs");

apiRouter.post("/add", addUser);
// query params: passportId (mandatory), cash, credit

apiRouter.get("/allusers", getAllUsers);
// no query params

apiRouter.get("/get/:passportId", getUser);

apiRouter.put("/deposit/:passportId/:amount", deposit);

apiRouter.put("/withdraw/:passportId/:amount", withdraw);
// query params: passportId, amount (mandatory)

apiRouter.put("/transfer", transfer);
// query params: passportIdFrom, passportIdTo, amount (mandatory)

apiRouter.delete("/delete/:passportId", deleteUser);

module.exports = apiRouter;
