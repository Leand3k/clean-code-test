require("dotenv").config(".env")

const { DataTypes, Sequelize, Model } = require('sequelize')
const sequelize = require("./db")
const bcrypt = require("bcrypt")
const User = require("../repositories/sequelize-users-repository")


class Product extends Model {

    async getProducts() {
        const products = await Product.findAll({
            raw: true,
        })

        return products;
    }

    async getProduct(id) {
        return await Product.findByPk(id)
    }

    async getProductByName(name) {
        return await Product.findOne({ where: { name } })
    }


    async createProduct(product) {
        const data = await Product.create(product);
        return data.id;
    }

    async updateProduct(product) {
        const options = {
            where: {
                id: product.id,
            }
        }

        await Product.update(product, options);
    }

    async deleteProduct(id) {
        const options = {
            where: {
                id: id,
            }
        }

        await Product.destroy(options)
    }

    async deleteAllProducts() {
        if (this.test) {
            const options = {
                truncate: true
            }
            await Product.destroy(options);
        }
    }

    async dropProductsTable() {
        if (this.test) {
            await Product.drop();
        }
    }
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    categories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
            key: 'id'
        }
    },
}, {
    sequelize,
    tableName: 'product',
    timestamps: false,
})

// Product.hasMany(User);
// User.belongsTo(Product);

User.hasOne(Product, { foreignKey: "id" })
Product.belongsTo(User, { foreignKey: "id" })





module.exports = Product;