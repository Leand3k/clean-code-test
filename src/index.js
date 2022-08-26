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

// Initialize Sequelize Client


const sequelizeUsersRepository = new SequelizeUsersRepository(db)
const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(db)


db.sync()

const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository)
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository)

let routers = [
    createUsersRouter(manageUsersUsecase),
    createCategoriesRouter(manageCategoriesUsecase)
]

const app = createExpressApp(routers)