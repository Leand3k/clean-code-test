const express = require('express');
// const appRoot = require('app-root-path');
const Category = require('../entities/category')
const validateSchema = require("../frameworks/ajv")

function createCategoriesRouter(manageCategoriesUsecase) {

    const router = express.Router();

    router.get("/categories", async (req, res) => {

        const categories = await manageCategoriesUsecase.getCategories();
        res.status(200).send(categories);
    })

    router.get("/categories/:id", async (req, res) => {
        const id = req.params.id;

        const category = await manageCategoriesUsecase.getCategory(id);

        if (!category) {
            return res.status(400).send({
                message: `There is no categogry wih ID ${id}`
            })
        }

        res.status(200).send(category);
    })

    router.post("/categories/create", async (req, res) => {
        let validation = validateSchema(Category.schema, req);

        if (validation === true) {
            const category = await manageCategoriesUsecase.createCategory(req.body);
            res.status(201).send(category);
        } else {
            res.status(422).send(validation)
        }
    })

    router.put("/categories/edit/:id", async (req, res) => {

        const id = req.params.id;
        let validation = validateSchema(Category.schema, req);
        const categoryCheck = await manageCategoriesUsecase.getCategory(id)

        if (!categoryCheck) {
            res.status(400).send({
                message: `This category doesn't exist(ID ${id}).`
            })
        } else {
            if (validation === true) {
                const category = await manageCategoriesUsecase.updateCategory(id, req.body);
                res.status(200).send(category);
            } else {
                res.status(422).send(validation);
            }

        }


    })

    router.delete("/categories/:id", async (req, res) => {
        const id = req.params.id;

        const category = await manageCategoriesUsecase.getCategory(id);

        if (!category) {
            res.status(400).send({
                message: `The ID ${id} doesn't exist.`
            })
        } else {
            await manageCategoriesUsecase.deleteCategory(id);

            res.status(200).send({
                message: `Category deleted with ID ${id}`
            })

        }


    })



    return router;
}

module.exports = createCategoriesRouter;