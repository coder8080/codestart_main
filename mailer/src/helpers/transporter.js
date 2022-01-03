const nodemailer = require('nodemailer')
const { login, password, host } = require('../config')

module.exports = nodemailer.createTransport({
    host: host,
    port: 587,
    auth: {
        user: login,
        pass: password,
    },
})
