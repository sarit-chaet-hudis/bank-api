const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGO_URI;

const app = express();

const port = process.env.PORT || 3000;

const {
  addUser,
  deposit,
  withdraw,
  transfer,
  getUser,
  getAllUsers,
} = require("./controllers/controllers.cjs");

app.use(express.static(path.join(__dirname, "../client/build")));
// app.use(express.static(path.join(__dirname, "../client/public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(URI, () => console.log("connected mongoose"));

app.post("/api/add", addUser);
// query params: id (mandatory), cash, credit

app.get("/api/allusers", getAllUsers);
// no query params

app.get("/api/get/:id", getUser);
// url params: id

app.put("/api/deposit", deposit);
// query params: id, amount (mandatory)

app.put("/api/withdraw", withdraw);
// query params: id, amount (mandatory)

app.put("/api/transfer", transfer);
// query params: id_from, id_to, amount (mandatory)

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

app.listen(port, () => console.log(`Server is up and runing on ${port}`));
