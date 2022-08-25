const { DataTypes } = require('sequelize')
const db = require('../db')
const bcrypt = require("bcrypt");

class SequelizeUsersRepository {
    constructor (sequelizeClient, test = false) {

        this.sequelizeClient = sequelizeClient;
        this.test = test;

        let tableName = "user";

        if (test) {
            tableName += "_test_"
        }

        const columns = {
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
        }

        const options = {
            tableName: tableName,
            timestamps: false,
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, "a");
                        user.password = bcrypt.hashSync(user.password, salt)
                    }
                }

            },
            instanceMethods: {
                validPassword: (password) => {
                    return bcrypt.compareSync(password, this.password)
                },
            },
        }

        this.userModel = sequelizeClient.sequelize.define('User', columns, options);
    }

    async getUsers() {
        const users = await this.userModel.findAll({
            raw: true
        })

        return users;
    }

    async getUser(id) {
        return await this.userModel.findByPk(id)
    }

    async getName() {
        const name = await this.userModel.findAll({
            raw: true,
            where: { name: 'DIEGO JAVIER222' }
        })

        return name
    }


    async createUser(user) {
        const data = await this.userModel.create(user);
        return data.id;
    }

    async updateUser(user) {
        const options = {
            where: {
                id: user.id,
            }
        }

        await this.userModel.update(user, options);
    }

    async deleteUser(id) {
        const options = {
            where: {
                id: id,
            }
        }

        await this.userModel.destroy(options)
    }

    async deleteAllUsers() {
        if (this.test) {
            const options = {
                truncate: true
            }
            await this.userModel.destroy(options);
        }
    }

    async dropUsersTable() {
        if (this.test) {
            await this.userModel.drop();
        }
    }
}


module.exports = SequelizeUsersRepository;