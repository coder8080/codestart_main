const Chat = require('../models/chat')
const Msg = require('../models/msg')
const User = require('../models/user')

module.exports.sendMsg = async (req, res) => {
    const user = req.body.user
    const receiver = req.body.receiver
    const text = req.body.text
    let errors = []
    if (!user) errors.push('сначала войдите на сат')
    if (!receiver) errors.push('укажите получателя')
    if (!text) errors.push('укажите текст сообщения')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    let second_user = (await User.find({ username: receiver }))[0]
    if (!second_user) {
        res.status(401).json({ errors: ['нет пользователя с таким логином'] })
        return
    }
    let chat = (await Chat.find({ usersUsernames: { $all: [user.username, receiver] } }))[0]
    if (!chat) {
        chat = new Chat({
            usersUsernames: [user.username, receiver],
        })
        await chat.save()
    }
    const msg = new Msg({
        text,
        senderUsername: user.username,
        receiverUsername: receiver,
        chatId: chat._id,
    })
    await msg.save()
    res.status(200).json({ msg })
}

module.exports.deleteMsg = async (req, res) => {
    const user = req.body.user
    const id = req.body.id
    let errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!id) errors.push('укажите id удаляемого сообщения')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    let msg = (await Msg.find({ _id: id }))[0]
    if (!msg) {
        res.status(401).json({ errors: ['нет сообщения с таким id'] })
        return
    }
    if (msg.senderUsername !== user.username) {
        res.status(401).json({ errors: ['это сообщение принадлежит не вам'] })
        return
    }
    await Msg.deleteOne({ _id: id })
    res.status(200).end()
}
