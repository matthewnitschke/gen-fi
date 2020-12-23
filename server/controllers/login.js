const express = require('express');
const router = express.Router();
const path = require('path');

const Account = require('../models/Account');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../auth-client/index.html'));
});
router.get('/styles.css', (req, res) =>
  res.sendFile(path.join(__dirname, '../../auth-client/styles.css'))
);

router.post('/authenticate', async (req, res) => {
  console.log('authenticate');
  const { email, password } = req.body;

  let account = await Account.findOne({
    email,
  });

  if (account === null) {
    return res.status(400).send({
      message: 'User not found.',
    });
  } else {
    if (account.isValidPassword(password)) {
      // valid password, add the session vars
      req.session.accountId = account._id;

      return res.status(201).send({
        message: 'Authenticated!',
      });
    } else {
      return res.status(400).send({
        message: 'Wrong Password',
      });
    }
  }
});

router.post('/signup', async (req, res) => {
  console.log('signup');
  const { email, password } = req.body;

  let newAccount = new Account({
    email,
  });

  newAccount.setPassword(password);

  newAccount.save((err) => {
    if (err) {
      return res.status(400).send({
        message: 'Failed to add user.',
      });
    } else {
      return res.status(201).send({
        message: 'User added successfully.',
      });
    }
  });
});

router.post('/logout', async (req, res) => {
  req.session.destroy();

  res.status(200).send({
    message: 'User logged out successfully',
  });
});

module.exports = router;
