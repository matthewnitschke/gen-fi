const express = require('express');
const router = express.Router();
const path = require('path');

const User = require('../models/User.js');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../auth-client/index.html'));
});
router.get('/styles.css', (req, res) =>
  res.sendFile(path.join(__dirname, '../../auth-client/styles.css'))
);

router.post('/authenticate', async (req, res) => {
  console.log('authenticate');
  const { email, password } = req.body;

  let user = await User.findOne({
    email,
  });

  if (user === null) {
    return res.status(400).send({
      message: 'User not found.',
    });
  } else {
    if (user.isValidPassword(password)) {
      // valid password, add the session vars
      req.session.accountId = '5fbfe7509a758581b265a7f5';
      req.session.bankAccountIds = ['someid'];

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

  let newUser = new User({
    email,
  });

  newUser.setPassword(password);

  newUser.save((err) => {
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
  console.log('logout');
  req.session.destroy();

  res.status(200).send({
    message: 'User logged out successfully',
  });
});

module.exports = router;
