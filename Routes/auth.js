const rethinkDB = require("../rethinkDB")();
const googleAuth = require("../googleAuthVerification");

module.exports = (app) => {
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
};
