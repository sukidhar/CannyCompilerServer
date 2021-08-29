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
    addUser: async (email, password) => {},
  };
};
