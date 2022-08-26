require("dotenv").config(".env");

//Database Settings
const db = require("./repositories/db")
const createExpressApp = require("./frameworks/express")

// Initialize User Setting
const SequelizeUsersRepository = require("./repositories/sequelize-users-repository")
const ManageUsersUsecase = require("./usecases/manage-users-usecase");
const createUsersRouter = require("./http/users-router")

// Initialize Category setting
const SequelizeCategoriesRepository = require("./repositories/sequelize-categories-repository")
const ManageCategoriesUsecase = require("./usecases/manage-categories-usecase")
const createCategoriesRouter = require("./http/categories-router")

// Initialize Products setting
const SequelizeProductsRepository = require('./repositories/sequelize-products-repository')
const ManageProductsRepository = require('./usecases/manage-products-usecase')
const createProductsRouter = require('./http/products-router')

// Initialize Transactions setting
const SequelizeTransactionsRepository = require('./repositories/sequelize-transactions-repository')
const ManageTransactionsRepository = require('./usecases/manage-transactions-usecase')
const createTransactionsRouter = require('./http/transactions-router')


// Initialize Sequelize Client
const sequelizeUsersRepository = new SequelizeUsersRepository(db)
const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(db)
const sequelizeProductsRepository = new SequelizeProductsRepository(db);
const sequelizeTransactionsRepository = new SequelizeTransactionsRepository(db);


db.sync()

const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository)
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository)
const manageProductsUsecase = new ManageProductsRepository(sequelizeProductsRepository);
const manageTransactionsUsecase = new ManageTransactionsRepository(sequelizeTransactionsRepository)


let routers = [
    createUsersRouter(manageUsersUsecase),
    createCategoriesRouter(manageCategoriesUsecase),
    createProductsRouter(manageProductsUsecase),
    createTransactionsRouter(manageTransactionsUsecase),
]

const app = createExpressApp(routers)