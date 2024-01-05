const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/transactions', async (req, res) => {
    const transaction = new Transaction({
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type,
    });

    try {
        const savedTransaction = await transaction.save();
        res.json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/transactions/:id', async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports=router;