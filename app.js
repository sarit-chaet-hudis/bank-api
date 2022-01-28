require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const apiRouter = require("./routes/api.js");

const URI = process.env.MONGO_URI;
const app = express();

app.use(express.static(path.join(__dirname, "./client/build")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(URI, () => console.log("connected mongoose"));

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is up and runing on ${port}`));
