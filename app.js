require("dotenv").config();
const express = require("express");
const rethinkDB = require("./rethinkDB")();
const googleAuth = require("./googleAuthVerification");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth", async (req, res) => {
  if (req.body.id) {
    await googleAuth.verifyGID(req.body.id);
  }
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
