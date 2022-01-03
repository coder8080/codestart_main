const mongoose = require('mongoose')

const keySchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    key: { type: String, required: true },
})
const Key = mongoose.model('Key', keySchema)
module.exports = Key
