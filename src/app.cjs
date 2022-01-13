const express = require("express");
const {
  addUser,
  deposit,
  withdraw,
  transfer,
  getUser,
  getAllUsers,
} = require("./handlers.cjs");

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/add", addUser);
// query params: id (mandatory), cash, credit

app.get("/", getAllUsers);

app.get("/:id", getUser);
// url params: id

app.put("/deposit", deposit);
// query params: id, amount (mandatory)

app.put("/withdraw", withdraw);
// query params: id, amount (mandatory)

app.put("/transfer", transfer);
// query params: id_from, id_to, amount (mandatory)

app.listen(port, () => console.log(`Server is up and runing on ${port}`));
