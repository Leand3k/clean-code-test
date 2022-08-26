const Transaction = require('../entities/transaction')

class ManageTransactionsUsecase {

    constructor(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    async getTransactions() {
        return await this.transactionsRepository.getTransactions();
    }

    async getTransactionsBuyers() {
        return await this.transactionsRepository.getTransactionsBuyers();
    }

    async getTransactionsSellers() {
        return await this.transactionsRepository.getTransactionsSellers();
    }

    async getBuyers() {
        return await this.transactionsRepository.getBuyers()
    }

    async getSellers() {
        return await this.transactionsRepository.getSellers()
    }

    async getTransaction(id) {
        return await this.transactionsRepository.getTransaction(id);
    }


    async createTransaction(data) {


        const transaction = new Transaction(undefined, data.buyer_user, data.products, data.transaction_type);
        const id = await this.transactionsRepository.createTransaction(transaction);
        transaction.id = id;

        return transaction;
    }

    async updateTransaction(id, data) {
        const transaction = new Transaction(id, data.buyer_user, data.products);
        await this.transactionsRepository.updateTransaction(transaction);

        return transaction;
    }

    async deleteTransaction(id) {
        await this.transactionsRepository.deleteTransaction(id);
    }
}

module.exports = ManageTransactionsUsecase;