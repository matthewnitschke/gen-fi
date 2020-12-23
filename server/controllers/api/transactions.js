const Transaction = require('../../models/Transaction');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const { from, to } = req.query;

  let transactions = await Transaction.find({
    fiAccountId: req.session.accountId,
    date: { $gte: from, $lte: to },
  });

  res.status(200).send(transactions);
});

router.get('/:transactionId', async (req, res) => {
  const { transactionId } = req.params;

  let transaction = await Transaction.findOne({
    _id: transactionId,
    fiAccountId: req.session.accountId,
  });

  res.status(200).json(transaction);
});

router.post('/', async (req, res) => {
  const { date, merchant, amount } = req.body;

  let newTransaction = new Transaction({
    merchant,
    fiAccountId: req.session.accountId,
    amount: amount,
    date: new Date(date),
    isUserCreated: true,
  });

  let postedTransaction = await newTransaction.save();

  res.status(200).json(postedTransaction);
});

module.exports = router;
