const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    ownerUsername: { type: String, required: true },
    lesson: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    isBanned: { type: Boolean, default: false },
})
const Question = mongoose.model('Question', questionSchema)
module.exports = Question
