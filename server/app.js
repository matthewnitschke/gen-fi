const path = require("path");

const bodyParser = require('body-parser');
const express = require("express");
const session = require("express-session");

const app = express();
const port = 8080;

(async () => {
  await require("./db.js")(); // ensure db is initialized

  app.use(session({ secret: "process.env.SESSION_SECRET" }));
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // static assets
  app.use("/", express.static(path.join(__dirname, "../client/dist")));

  app.use("/healthcheck", (req, res) => {
    res.status(200).send("OK");
  });

  app.use("/budget", require("./controllers/api/budget.js"));
  app.use("/transactions", require("./controllers/api/transactions.js"));
  app.use("/user", require("./controllers/api/user.js"));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
