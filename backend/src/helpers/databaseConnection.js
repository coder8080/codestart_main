/* This code returns a database connection object */
const mongoose = require('mongoose')
const { mongoUrl } = require('../config')
module.exports = mongoose.connect(mongoUrl)
