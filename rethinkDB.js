var r = require("rethinkdb");

module.exports = () => {
  var connection = null;
  r.connect(
    {
      host: "localhost",
      port: 28015,
      db: "cannycompiler",
    },
    (err, conn) => {
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
  };
};
