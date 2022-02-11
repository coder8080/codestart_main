/** Functions for working with mailer service */

const axios = require('axios')
const { mailerUrl } = require('../config')

module.exports.sendMail = (mail) => {
    return axios.post(`${mailerUrl}/send-mail`, { mail })
}

module.exports.testMailer = () => {
    return axios.get(mailerUrl)
}
