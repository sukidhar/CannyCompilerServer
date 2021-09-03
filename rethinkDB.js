var r = require("rethinkdb");
const { v4: uuid } = require("uuid");

module.exports = () => {
  var connection = null;
  r.connect(
    {
      host: "localhost",
      port: 28015,
      db: "cannycompiler",
    },
    async (err, conn) => {
      if (err) {
        throw err;
        return;
      }
      console.log(`connected to rethinkDB`);
      connection = conn;
    }
  );

  return {
    insertUser: async (id, email, firstName, lastName, picture) => {
      let result = await r
        .table("Users")
        .insert(
          {
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            picture: picture,
          },
          { conflict: "update" }
        )
        .run(connection);
      console.log(result);
      return result;
    },
    isAlreadyUser: async (id) => {
      let res = await r.table("Users").get(id).run(connection);
      console.log(res);
      return res !== null;
    },
    addLog: async (id, code, res, language) => {
      await r
        .table("Users")
        .get(id)
        .update({
          logs: {
            [uuid()]: {
              code: code,
              result: res,
              language: language,
            },
          },
        })
        .run(connection);
    },
    getAllLogs: async (id) => {
      return await r.table("Users").get(id)("logs").run(connection);
    },

    getLog: async (id, lid) => {
      return await r.table("Users").get(id)("logs")(lid).run(connection);
    },

    deleteLogs: async (id) => {
      return await r
        .table("Users")
        .get(id)
        .replace(r.row.without("logs"))
        .run(connection);
    },

    deleteLog: async (id, lid) => {
      return await r
        .table("Users")
        .get(id)("logs")
        .merge({
          [lid]: r.literal(),
        })
        .run(connection);
    },
  };
};
