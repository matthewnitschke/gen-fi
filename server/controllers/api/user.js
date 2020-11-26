const express = require("express");
const router = express.Router();

router.post("/authenticate", (req, res) => {
  // is user who they say they are?
  let userAuthenticated = true;
  if (userAuthenticated) {
    req.session.accountId = "5fbfe7509a758581b265a7f5";
  }

  res.status(200).send("OK");
});

router.get("/authenticated", (req, res) => {
  res.status(200).send(req.session.accountId);
});

module.exports = router;
