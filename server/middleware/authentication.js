module.exports = (req, res, next) => {
  // req.session.accountId = "5fbfe7509a758581b265a7f5";
  // req.session.bankAccountIds = ["someid"]
  // next();
  if (req.session.accountId != null) {
    next();
  } else {
    //   res.status(500).send("Not Authenticated");
    res.redirect('/login');
  }
};
