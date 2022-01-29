const mongoose = require('mongoose')
const msgSchema = new mongoose.Schema({
    text: { type: String, required: true },
    senderUsername: { type: String, required: true },
    receiverUsername: { type: String, required: true },
    time: { type: Date, default: new Date() },
    chatId: { type: String, required: true },
})
const Msg = mongoose.model('Msg', msgSchema)
module.exports = Msg
