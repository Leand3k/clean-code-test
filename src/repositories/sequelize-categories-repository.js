require("dotenv").config(".env")

const {DataTypes, Sequelize, Model} = require('sequelize')
const sequelize = require("./db")


class Category extends Model {

    async getCategories() {
        const categories = await Category.findAll({
            raw: true
        })

        return categories;
    }

    async getCategory(id) {
        return await Category.findByPk(id);
    }

    async createCategory(category) {

        const data = await Category.create(category);
        return data.id;
    }

    async updateCategory(category) {
        const options = {
            where: {
                id: category.id,
            }
        }

        await Category.update(category, options);
    }

    async deleteCategory(id) {
        const options = {
            where: {
                id: id,
            }
        }
        await Category.destroy(options);
    }

    async deleteAllCategories() {
        if (this.test) {

            const options = {
                truncate: true
            };

            await Category.destroy(options);

        }
    }

    async dropCategoriesTable() {

        if (this.test) {
            await Category.drop();
        }

    }
}

Category.init({
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
}, {
    sequelize,
    tableName: 'category',
    timestamps: false,
})


module.exports = Category;