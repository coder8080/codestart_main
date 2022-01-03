const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const questionController = require('../controllers/question')

router.post('/create', auth, questionController.createQuestion)
module.exports = router
