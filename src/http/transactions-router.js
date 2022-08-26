const express = require('express')
const Transaction = require('../entities/transaction');
const validateSchema = require("../frameworks/ajv")

function createTransactionsRouter(manageTransactionsUsecase) {
    const router = express.Router();

    router.get("/transactions", async (req, res) => {

        const transactions = await manageTransactionsUsecase.getTransactions();
        res.status(200).send(transactions);
    })

    router.get("/transactions/buyers", async (req, res) => {

        const transactionsBuyers = await manageTransactionsUsecase.getTransactionsBuyers();
        res.status(200).send(transactionsBuyers);
    })

    router.get("/transactions/sellers", async (req, res) => {

        const transactionsSellers = await manageTransactionsUsecase.getTransactionsSellers();
        res.status(200).send(transactionsSellers);
    })

    router.get("/transactions/:id", async (req, res) => {
        const id = req.params.id;

        const transaction = await manageTransactionsUsecase.getTransaction(id);

        if (!transaction) {
            return res.status(400).send({
                message: `There is no transaction with ID ${id}`
            })
        }

        res.status(200).send(transaction);
    })

    router.post("/transactions/create", async (req, res) => {


        const transaction = await manageTransactionsUsecase.createTransaction(req.body);
        res.status(201).send(transaction);

    })

    router.put("/transactions/edit/:id", async (req, res) => {


        const id = req.params.id;
        const transaction = await manageTransactionsUsecase.updateTransaction(id, req.body);
        res.status(200).send(transaction);
    })

    router.delete("/transactions/:id", async (req, res) => {
        const id = req.params.id;
        await manageTransactionsUsecase.deleteTransaction(id);

        res.status(200).send(`Transaction deleted with ID ${id}`)
    })



    return router;
}

module.exports = createTransactionsRouter;