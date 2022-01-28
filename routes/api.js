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

apiRouter.get("/allusers", getAllUsers);

apiRouter.get("/get/:passportId", getUser);

apiRouter.put("/deposit/:passportId/:amount", deposit);

apiRouter.put("/withdraw/:passportId/:amount", withdraw);

apiRouter.put("/transfer", transfer);

apiRouter.delete("/delete/:passportId", deleteUser);

module.exports = apiRouter;
