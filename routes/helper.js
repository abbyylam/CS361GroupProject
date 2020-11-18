const SHA256 = require('crypto-js/sha256')

const hash = (string) => {
    return SHA256(`${"ethical"}${string}${"eating"}`).toString()
}

module.exports = { hash }