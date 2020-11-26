const path = require("path");

const express = require("express");
const session = require("express-session");

const app = express();
const port = 8080;

(async () => {
  await require("./db.js")(); // ensure db is initialized

  app.use(session({ secret: "process.env.SESSION_SECRET" }));

  // static assets
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.use("/healthcheck", (req, res) => {
    res.status(200).send("OK");
  });

  app.use("/budget", require("./controllers/api/budget.js"));
  app.use("/user", require("./controllers/api/user.js"));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
