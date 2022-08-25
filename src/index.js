require("dotenv").config(".env");

//Database Settings
const SequelizeClient = require("./repositories/db")
const createExpressApp = require("./frameworks/express")

// Initialize User Setting
const SequelizeUsersRepository = require("./repositories/user/sequelize-users-repository")
const ManageUsersUsecase = require("./usecases/manage-users-usecase");
const createUsersRouter = require("./http/users-router")

// Initialize Sequelize Client
const sequelizeClient = new SequelizeClient();

const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient)


sequelizeClient.syncDatabase();

const manageUsersUsecase = new ManageUsersUsecase((sequelizeUsersRepository))

let routers=[
    createUsersRouter(manageUsersUsecase),
]

const app = createExpressApp(routers)