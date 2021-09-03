require("dotenv").config();
const express = require("express");
const rethinkDB = require("./rethinkDB")();
const app = express();
const port = 3000;
app.use(express.json());

require("./Routes/auth")(app, rethinkDB);
require("./Routes/compiler")(app, rethinkDB);
require("./Routes/queryRoutes")(app, rethinkDB);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
