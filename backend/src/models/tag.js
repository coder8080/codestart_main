const mongoose = require('mongoose')
const tagSchema = new mongoose.Schema({
    name: { type: String, required: true },
})
const Tag = new mongoose.model('Tag', tagSchema)
module.exports = Tag
