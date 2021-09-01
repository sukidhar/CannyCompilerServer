var r = require("rethinkdb");

module.exports = () => {
  var connection = null;
  r.connect(
    {
      host: "localhost",
      port: 28015,
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
    insertUser: async (id, name, email) => {
      r.table("Users")
        .insert(
          {
            id: id,
            name: name,
            email: email,
          },
          { conflict: "update" }
        )
        .run(connection)
        .then((res) => {
          console.log(res);
        });
    },
  };
};
