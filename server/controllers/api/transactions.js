const Transaction = require("../../models/Transaction.js");

const express = require("express");
const router = express.Router();

// authentication middleware
router.use((req, res, next) => {
  req.session.accountId = "5fbfe7509a758581b265a7f5";
  req.session.bankAccountIds = ["someid"]
  next();
  // if (req.session.accountId) {
  //   next();
  // } else {
  //   res.status(500).send("Not Authenticated");
  // }
});

router.get('/', async (req, res) => {
    const { from, to } = req.query;

    console.log(`${from} : ${to}`)

    let transactions = await Transaction.find({
        fiAccountId: req.session.accountId,
        date: { $gte: from, $lte: to }
    });

    res.status(200).send(transactions);
})

router.get('/:transactionId', async (req, res) => {
    const { transactionId } = req.params;

    let transaction = await Transaction.findOne({
        _id: transactionId,
        fiAccountId: req.session.accountId
    });

    res.status(200).json(transaction);
});

router.post('/', async (req, res) => {
    const { date, merchant, amount} = req.body;

    let newTransaction = new Transaction({
        merchant,
        fiAccountId: req.session.accountId,
        amount: amount,
        date: new Date(date)
    });

    let postedTransaction = await newTransaction.save();

    res.status(200).json(postedTransaction);
});

module.exports = router;
