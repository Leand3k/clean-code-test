const express = require('express')
const Product = require('../entities/product');
const validateSchema = require("../frameworks/ajv")

function createProductsRouter(manageProductsUsecase) {
    const router = express.Router();

    router.get("/products", async (req, res) => {

        const products = await manageProductsUsecase.getProducts();
        res.status(200).send(products);
    })

    router.get("/products/:id", async (req, res) => {
        const id = req.params.id;

        const product = await manageProductsUsecase.getProduct(id);

        if (!product) {
            return res.status(400).send({
                message: `There is no product with ID ${id}`
            })
        }

        res.status(200).send(product);
    })

    router.post("/products/create", async (req, res) => {
        let validation = validateSchema(Product.schema, req);

        if (validation === true) {

            const nameProduct = req.body.name;
            const checkProduct = await manageProductsUsecase.getProductByName(nameProduct)

            if (checkProduct) {
                return res.status(400).send({
                    message: `There is already a product named ${nameProduct}. Products cannot repeat.`
                })
            }

            const product = await manageProductsUsecase.createProduct(req.body);
            res.status(201).send(product);

        } else {
            res.status(422).send(validation)
        }
    })

    router.put("/products/edit/:id", async (req, res) => {
        let validation = validateSchema(Product.schema, req);
        if (validation === true) {
            const id = req.params.id;
            const product = await manageProductsUsecase.updateProduct(id, req.body);
            res.status(200).send(product);
        } else {
            res.status(422).send(validation);
        }
    })

    router.delete("/products/:id", async (req, res) => {
        const id = req.params.id;
        await manageProductsUsecase.deleteProduct(id);

        res.status(200).send(`Product deleted with ID ${id}`)
    })



    return router;
}

module.exports = createProductsRouter;