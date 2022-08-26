require("dotenv").config(".env");

//Database Settings
const db = require("./src/repositories/db")
const createExpressApp = require("./src/frameworks/express")

// Initialize User Setting
const SequelizeUsersRepository = require("./src/repositories/sequelize-users-repository")
const ManageUsersUsecase = require("./src/usecases/manage-users-usecase");
const createUsersRouter = require("./src/http/users-router")

// Initialize Category setting
const SequelizeCategoriesRepository = require("./src/repositories/sequelize-categories-repository")
const ManageCategoriesUsecase = require("./src/usecases/manage-categories-usecase")
const createCategoriesRouter = require("./src/http/categories-router")

// Initialize Products setting
const SequelizeProductsRepository = require('./src/repositories/sequelize-products-repository')
const ManageProductsRepository = require('./src/usecases/manage-products-usecase')
const createProductsRouter = require('./src/http/products-router')

// Initialize Transactions setting
const SequelizeTransactionsRepository = require('./src/repositories/sequelize-transactions-repository')
const ManageTransactionsRepository = require('./src/usecases/manage-transactions-usecase')
const createTransactionsRouter = require('./src/http/transactions-router')


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