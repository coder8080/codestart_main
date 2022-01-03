const mongoose = require('mongoose')
const programSchema = new mongoose.Schema({
    ownerUsername: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    lang: { type: String, required: true },
    code: { type: String, required: true },
    created: { type: Date, default: new Date() },
})
const Program = new mongoose.model('Program', programSchema)
module.exports = Program
