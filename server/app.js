const path = require("path");

const bodyParser = require('body-parser');
const express = require("express");
const session = require("express-session");
const authentication = require("./middleware/authentication.js");

const app = express();
const port = 8080;

(async () => {
  await require("./db.js")(); // ensure db is initialized

  app.use(session({ secret: "process.env.SESSION_SECRET" }));
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../auth-client/index.html"));
  })

  app.post('/login/authenticate', (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
      res.redirect('/login')
      return;
    }

    req.session.accountId = "5fbfe7509a758581b265a7f5";
    req.session.bankAccountIds = ["someid"]

    res.redirect('/')
  })


  app.use(authentication);

  // static assets
  app.use("/", express.static(path.join(__dirname, "../client/dist")));

  app.use("/budget", require("./controllers/api/budget.js"));
  app.use("/transactions", require("./controllers/api/transactions.js"));
  app.use("/user", require("./controllers/api/user.js"));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
