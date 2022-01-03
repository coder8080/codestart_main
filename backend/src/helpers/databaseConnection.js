/* Файл, возвращающий объект соединения с базой данных */
const mongoose = require('mongoose')
const { mongoUrl } = require('../config')
module.exports = mongoose.connect(mongoUrl)
