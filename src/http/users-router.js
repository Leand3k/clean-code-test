const express = require('express')
// const appRoot = require('app-root-path');
const User = require('../entities/user');
const validateSchema = require("../frameworks/ajv")

function createUsersRouter(manageUsersUsecase) {
    const router = express.Router();

    router.get("/users", async (req, res) => {

        const users = await manageUsersUsecase.getUsers();
        res.status(200).send(users);
    })

    router.get("/users/name", async (req, res) => {
        const name = await manageUsersUsecase.getName();
        res.status(200).send(name)
    })

    router.get("/users/:id", async (req, res) => {
        const id = req.params.id;

        const user = await manageUsersUsecase.getUser(id);

        if (!user) {
            return res.status(400).send({
                message: `There is no user with ID ${id}`
            })
        }

        res.status(200).send(user);
    })

    router.post("/users/create", async (req, res) => {
        let validation = validateSchema(User.schema, req);

        if (validation === true) {
            const user = await manageUsersUsecase.createUser(req.body);
            res.status(201).send(user);

        } else {
            res.status(422).send(validation)
        }
    })

    router.put("/users/edit/:id", async (req, res) => {
        let validation = validateSchema(User.schema, req);
        if (validation === true) {
            const id = req.params.id;
            const user = await manageUsersUsecase.updateUser(id, req.body);
            res.status(200).send(user);
        } else {
            res.status(422).send(validation);
        }
    })

    router.delete("/users/:id", async (req, res) => {
        const id = req.params.id;
        await manageUsersUsecase.deleteUser(id);

        res.status(200).send(`User deleted with ID ${id}`)
    })


    return router;
}

module.exports = createUsersRouter;