const { v4: uuid } = require('uuid')

class Session {
    constructor({ email }) {
        this.email = email
        this.id = uuid()
    }

    static generateSessionId({ email, sessionId }) {
        return `${email}|${sessionId}`
    }

    getId() {
        return this.id
    } 

}

module.exports = Session