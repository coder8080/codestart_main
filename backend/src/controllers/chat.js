/** Set of express controllers for working with chats */

const Chat = require('../models/chat')
const Msg = require('../models/msg')
const User = require('../models/user')

/** Get all user's chats */
module.exports.getChatList = async (req, res) => {
    const user = req.body.user
    if (!user) {
        res.status(401).json({ errors: ['сначала войдите на сайт'] })
        return
    }
    result = []
    const chats = await Chat.find({ usersUsernames: user.username })
    for (chat of chats) {
        messages = await Msg.find({ chatId: chat._id })
        let lastMessage
        if (messages.length > 0) {
            let index = messages.length - 1
            lastMessage = messages[index]
        } else {
            lastMessage = { text: 'Нет сообщений', date: '-' }
        }
        result.push({ _id: chat._id, usersUsernames: chat.usersUsernames, lastMessage })
    }
    res.status(200).json({ chats: result })
}

/** Get chat and all it's messages by id */
module.exports.getChatById = async (req, res) => {
    const user = req.body.user
    const id = req.body.id
    let errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!id) errors.push('укажите id чата')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    const chat = (await Chat.find({ _id: id }))[0]
    if (!chat) {
        res.status(401).json({ errors: ['нет чата с таким id'] })
        return
    }
    if (!chat.usersUsernames.includes(user.username)) {
        res.status(401).json({ errors: ['вы не учавствуете в этом чате'] })
    }
    const messages = await Msg.find({ chatId: chat._id })
    res.status({ chat: { _id: chat._id, messages } })
}

/** Get chat and all it's messages by usernames */
module.exports.getChat = async (req, res) => {
    const user = req.body.user
    const username2 = req.body.username
    let errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!username2) errors.push('укажите username второго пользователя')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    const user2 = (await User.find({ username: username2 }))[0]
    if (!user2) {
        res.status(401).json({ errors: ['нет пользователя с таким username'] })
        return
    }
    const chat = (await Chat.find({ usersUsernames: { $all: [user.username, username2] } }))[0]
    if (!chat) {
        res.status(401).json({ errors: ['у вас нет чата с этим пользователем'] })
        return
    }
    const messages = await Msg.find({ chatId: chat._id })
    res.status(200).json({ chat: { _id: chat._id, usersUsernames: chat.usersUsernames, messages } })
}
