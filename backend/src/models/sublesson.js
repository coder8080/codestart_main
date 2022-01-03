const mongoose = require('mongoose')
const subLessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    video: { type: String, required: true },
    number: { type: Number, required: true },
    parent: { type: Number, required: true },
})
const SubLesson = mongoose.model('SubLesson', subLessonSchema)
module.exports = SubLesson
