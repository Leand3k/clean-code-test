require("dotenv").config(".env")

const { DataTypes, Sequelize, Model } = require('sequelize')
const sequelize = require("./db")
const bcrypt = require("bcrypt")
const User = require("./sequelize-users-repository")
const Product = require("./sequelize-products-repository")


class Transaction extends Model {

    async getTransactions() {



        const transactions = await Transaction.findAll({
            raw: true,

        })

        return transactions;
    }

    async getTransactionsBuyers() {

        const transactionsBuyers = await Transaction.findAll({
            raw: true,
            include: [{
                model: User,

            }],
            where: {
                transaction_type: true
            },

        })

        return transactionsBuyers;

    }

    async getBuyers() {

        const transactionsBuyers = await Transaction.findAll({
            raw: true,
            attributes: {
                exclude: [
                    'buyer_user',
                    'products',
                    'transaction_type',
                    'id'
                ]
            },
            where: {
                transaction_type: true
            },
            include: [{
                model: User,

            }]

        })

        return transactionsBuyers;

    }

    async getSellers() {
        const transactionsSellers = await Transaction.findAll({
            raw: true,
            attributes: {
                exclude: [
                    'buyer_user',
                    'products',
                    'transaction_type',
                    'id'
                ]
            },
            include: [{
                model: User,

            }],
            where: {
                transaction_type: true
            },


        })

        return transactionsSellers;
    }

    async getTransactionsSellers() {

        const transactions = await Transaction.findAll({
            raw: true,
            include: [{
                model: User
            }],
            where: {
                transaction_type: false
            }
        })

        return transactions;

    }



    async getTransaction(id) {
        return await Transaction.findByPk(id)
    }


    async createTransaction(transaction) {
        const data = await Transaction.create(transaction);
        return data.id;
    }

    async updateTransaction(transaction) {
        const options = {
            where: {
                id: transaction.id,
            }
        }

        await Transaction.update(transaction, options);
    }

    async deleteTransaction(id) {
        const options = {
            where: {
                id: id,
            }
        }

        await Transaction.destroy(options)
    }

    async deleteAllTransactions() {
        if (this.test) {
            const options = {
                truncate: true
            }
            await Transaction.destroy(options);
        }
    }

    async dropTransactionsTable() {
        if (this.test) {
            await Transaction.drop();
        }
    }
}

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    buyer_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    products: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'product',
            key: 'id'
        }
    },
    transaction_type: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "transaction",
    timestamps: false,

})

User.hasMany(Transaction, { foreignKey: "id" })
Transaction.belongsToMany(Product, { through: 'transaction_product' })
Transaction.belongsTo(User, { foreignKey: "id" })
Product.belongsTo(Transaction)


module.exports = Transaction;