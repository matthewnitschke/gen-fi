const Budget = require('../../models/Budget.js');
const Transaction = require('../../models/Transaction.js');

const express = require('express');
const router = express.Router();

// authentication middleware
router.use((req, res, next) => {
  req.session.accountId = '5fbfe7509a758581b265a7f5';
  req.session.bankAccountIds = ['5fbfe7509a758581b265a7f5'];
  next();
  // if (req.session.accountId) {
  //   next();
  // } else {
  //   res.status(500).send("Not Authenticated");
  // }
});

router.get('/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  const { accountId } = req.session;

  const foundBudget = await Budget.findOne({
    accountId: accountId,
    date: `${year}/${month}`,
  });

  let lastOfMonth = new Date(parseInt(year), parseInt(month) + 1, 0);
  console.log(
    `Searching for transactions: between ${year}-${month}-1 and ${year}-${month}-${lastOfMonth.getDate()}`
  );
  const transactions = await Transaction.find({
    // account_id: { "$in" : [req.session.bankAccountIds] },
    date: {
      $gte: `${year}-${month}-1`,
      $lte: `${year}-${month}-${lastOfMonth.getDate()}`,
    },
  });

  let response = {};
  if (foundBudget) {
    response = {
      ...response,
      ...foundBudget.storeData,
    };
  }

  if (transactions) {
    response = {
      ...response,
      transactions: transactions.reduce(
        (acc, transaction) => ({
          ...acc,
          [transaction._id]: transaction,
        }),
        {}
      ),
    };
  }

  res.status(200).json(response);
});

router.post('/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  const { accountId } = req.session;

  const foundBudget = await Budget.findOne({
    accountId: accountId,
    date: `${year}/${month}`,
  });

  if (foundBudget) {
    await Budget.findOneAndUpdate(
      {
        _id: foundBudget._id,
      },
      {
        storeData: req.body,
      }
    );
  } else {
    let newBudget = new Budget({
      accountId,
      date: `${year}/${month}`,
      storeData: req.body,
    });

    await newBudget.save();
  }

  res.sendStatus(200);
});

router.delete('/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  const { accountId } = req.session;

  await Budget.findOneAndDelete({
    accountId: accountId,
    date: `${year}/${month}`,
  });

  res.status(200).send('OK');
});

module.exports = router;
