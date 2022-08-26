require("dotenv").config(".env")

const {DataTypes, Sequelize, Model} = require('sequelize')
const sequelize = require("./db")
const bcrypt = require("bcrypt")
const Product = require("./sequelize-products-repository")


class User extends Model {

    async getUsers() {
        const users = await User.findAll({
            raw: true,

        })

        return users;
    }

    async getUser(id) {
        return await User.findByPk(id)
    }

    async getName() {
        const name = await User.findAll({
            raw: true,
            where: {name: 'DIEGO JAVIER222'}
        })

        return name
    }


    async createUser(user) {
        const data = await User.create(user);
        return data.id;
    }

    async updateUser(user) {
        const options = {
            where: {
                id: user.id,
            }
        }

        await User.update(user, options);
    }


    async deleteUser(id) {
        const options = {
            where: {
                id: id,
            }
        }

        await User.destroy(options)
    }

    async deleteAllUsers() {
        if (this.test) {
            const options = {
                truncate: true
            }
            await User.destroy(options);
        }
    }

    async dropUsersTable() {
        if (this.test) {
            await User.drop();
        }
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "user",
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, "a");
                user.password = bcrypt.hashSync(user.password, salt)
            }
        }

    },
})

User.hasMany(Product, {foreignKey: 'id'})
Product.belongsTo(User, {foreignKey: 'id'})


module.exports = User;