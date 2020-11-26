const Budget = require('../../models/Budget.js');

const express = require('express')
const router = express.Router()

// authentication middleware
router.use((req, res, next) => {
    if (req.session.accountId) {
        next()
    } else {
        res.status(500).send('Not Authenticated');
    }
})

router.get('/:year/:month', async (req, res) => {
    const { year, month } = req.params;
    const { accountId } = req.session;

    console.log(`Getting budget for: ${year}/${month} on account: ${accountId}`);

    const foundBudget = await Budget.findOne({
        accountId: accountId,
        date: `${year}/${month}`
    });

    res.status(200).json(foundBudget);
})

router.post('/:year/:month', async (req, res) => {
    const { year, month } = req.params;
    const { accountId } = req.session;

    const { items, borrows } = res.body;

    const foundBudget = await Budget.findOne({
        accountId: accountId,
        date: `${year}/${month}`
    });

    if (foundBudget) {
        await Budget.findOneAndUpdate({
             _id: foundBudget._id
        }, { 
            storeData: { items, borrows }
        });
    } else {
        let newBudget = new Budget({
            accountId,
            date: `${year}/${month}`,
            storeData: {
                items,
                borrows
            }
        });

        await newBudget.save();
    }

    res.sendStatus(200);
});

module.exports = router;