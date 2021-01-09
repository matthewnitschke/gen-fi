const plaid = require('plaid');
const mongoose = require('mongoose');
const Transaction = require('../../models/Transaction');

const express = require('express');
const router = express.Router();

const Account = require('../../models/Account');

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
  options: {
    version: '2019-05-29',
  },
});

// const e = (req, res, next) => {
//   if (req.session.accountId != null) {
//     next();
//   } else {
//     res.status(500).send("Not Authenticated");
//   }
// };

router.get('/accounts', async (req, res) => {
  const { email } = req.query

  let accounts = await Account.find({
    ...(!!email && {
      email: { '$regex': email, '$options': 'i' },
    })
  });

  res.status(200).json(accounts);
});

router.post('/setAccessToken', async (req, res) => {
  const { email, token } = req.body;

  await Account.findOneAndUpdate({
    email
  }, { plaidAccessToken: token });

  res.status(200).send('OK');
});

router.get('/getBankAccounts', async (req, res) => {
  if (req.session.plaidAccessToken == null) {
    return res.status(500).json({
      error: 'Plaid ACCESS_TOKEN not initialized. If just set, try logging in and out again.'
    })
  }

  client.getAccounts(req.session.plaidAccessToken, (error, accountsResp) => {
    if (error != null) {
      console.error(error);
      return res.status(500).json({
        error
      });
    }

    res.status(200).json(accountsResp);
  })
});

router.get('/syncTransactions', async (req, res) => {
  if (req.session.plaidAccessToken == null) {
    return res.status(500).json({
      error: 'Plaid ACCESS_TOKEN not initialized. If just set, try logging in and out again.'
    })
  }

  try {
    let response = await client.getTransactions(
      req.session.plaidAccessToken,
      '2020-12-01',
      '2021-02-01',
      {
        // account_ids: [],
        // count: 0,
        // offset: 0
      }
    );

    await Transaction.bulkWrite(
      response.transactions.map(transaction => ({
        updateOne: {
          filter: { _id: transaction.transaction_id },
          update: {
            _id: transaction.transaction_id,
            fiAccountId: req.session.accountId,
        
            date: transaction.date,
            merchant: transaction.merchant_name,
            amount: transaction.amount,
            isPending: transaction.pending,

            isUserCreated: false,
          },
          upsert: true,
        }
      }))
    );

  } catch(e) {
    console.error(e)
    return res.status(500).json({
      error: e
    });
  }

  res.status(200).send('OK')
});

router.delete('/allTransactions', async (req, res) => {
  if (req.session.plaidAccessToken == null) {
    return res.status(500).json({
      error: 'Plaid ACCESS_TOKEN not initialized. If just set, try logging in and out again.'
    })
  }

  await Transaction.deleteMany({
    fiAccountId: req.session.accountId
  })

  res.status(200).send('OK');
})

module.exports = router;
