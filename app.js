require("dotenv").config();
const express = require("express");
const rethinkDB = require("./rethinkDB")();
const googleAuth = require("./googleAuthVerification");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.put("/auth", async (req, res) => {
  if (req.body.id) {
    googleAuth
      .verifyGID(req.body.id)
      .then(async (payload) => {
        let hasAccount = await rethinkDB.isAlreadyUser(payload.sub);
        let result = await rethinkDB.insertUser(
          payload.sub,
          payload.email,
          payload.given_name,
          payload.family_name,
          payload.picture
        );
        if (hasAccount) {
          res.send({
            status: "account updated",
          });
          return;
        }
        res.send({
          status: "account created",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(403).send({
          error: error,
        });
      });
  }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
