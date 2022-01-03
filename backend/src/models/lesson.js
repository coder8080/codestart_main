const mongoose = require('mongoose')
const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    number: { type: Number, required: true },
    description: { type: String, required: true },
    video: { type: String, required: true },
})
const Lesson = mongoose.model('Lesson', lessonSchema)
module.exports = Lesson
