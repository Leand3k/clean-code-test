class Transaction {
    static schema = {
        type: "object",
        properties: {
            buyer_user: { type: "integer", errorMessage: 'must be of integer type' },
            products: { type: "integer", errorMessage: 'must be of integer type' },
            transaction_type: { type: "boolean", errorMessage: 'must be of boolean type (true for buyer, false for seller)' },
        },

        required: ["buyer_user", "products", "transaction_type"],
        additionalProperties: false,
    }

    constructor (id, buyer_user, products, transaction_type) {
        this.id = id;
        this.buyer_user = buyer_user;
        this.products = products;
        this.transaction_type = transaction_type;
    }
}

module.exports = Transaction
