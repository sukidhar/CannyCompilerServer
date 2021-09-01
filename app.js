require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

require("./Routes/auth")(app);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
