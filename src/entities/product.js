class Product {
    static schema = {
        type: "object",
        properties: {
            name: {type: "string", errorMessage: 'must be of string type'},
            description: {type: "string", errorMessage: 'must be of string type'},
            quantity: {type: "integer", errorMessage: 'must be of integer type'},
            status: {type: "boolean", errorMessage: 'must be of boolean type'},
            seller_user: {type: "integer", errorMessage: 'must be of integer type'},
            categories: {type: "integer", errorMessage: 'must be of integer type'},
        },

        required: ["name", "description", "quantity", "status", "seller_user", "categories"],
        additionalProperties: false,
    }

    constructor(id, name, description, quantity, status, seller_user, categories) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.status = status;
        this.seller_user = seller_user;
        this.categories = categories;
    }
}

module.exports = Product
