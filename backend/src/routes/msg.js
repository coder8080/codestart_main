const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const msgController = require('../controllers/msg')

router.post('/send', auth, msgController.sendMsg)
router.post('/delete', auth, msgController.deleteMsg)

module.exports = router
