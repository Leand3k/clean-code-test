// Entidad usuario

class User {
    static schema = {
        type: "object",
        properties: {
            name: {type: "string", errorMessage: 'must be of string type'},
            email: {type: "string", errorMessage: 'must be of string type'},
            password: {type: "string", errorMessage: 'must be of string type'},
            is_admin: {type: "boolean", errorMessage: 'must be of boolean type (true or false)'}
        },
        required: ["name", "email", "is_admin"],
        additionalProperties: true,
    }

    constructor(id, name, email, password, is_admin) {
        this.id = id,
            this.name = name,
            this.email = email,
            this.password = password,
            this.is_admin = is_admin
    }
}

module.exports = User