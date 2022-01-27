const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: '' },
    level: { type: Number, default: 0 },
    theme: { type: String, default: 'light' },
    languages: { type: [String], default: ['html'] },
})
const User = mongoose.model('User', userSchema)
module.exports = User
