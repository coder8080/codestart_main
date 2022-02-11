/** Code for working with JWT (JSON verification token) */

const jwt = require('jsonwebtoken')

/**
 * Create JSON verification token (JWT) based on user email
 * @param {String} email - user email
 * @returns {String} - key
 * */
function encode(email) {
    return jwt.sign({ email }, process.env.SECRET, { expiresIn: '43200s' })
}

/**
 * Get user email from JWT created by previously defined function
 * @param {String} token - token
 * @returns {String} - email
 * */
function decode(token) {
    return jwt.verify(token, process.env.SECRET).email
}

module.exports = {
    encode,
    decode,
}
