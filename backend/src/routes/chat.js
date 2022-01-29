const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()
const chatController = require('../controllers/chat')

router.get('/get-chat-list', auth, chatController.getChatList)
router.post('/get-chat-by-id', auth, chatController.getChatById)
router.post('/get-chat', auth, chatController.getChat)

module.exports = router
