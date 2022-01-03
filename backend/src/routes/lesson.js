const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const lessonController = require('../controllers/lesson')

router.get('/get/:number', auth, lessonController.getLesson)
router.get('/get-sub/:id', auth, lessonController.getSubLesson)
router.get('/get-all', auth, lessonController.getAllLessons)
router.get('/count-lessons', auth, lessonController.countLessons)
router.get('/test-mailer', lessonController.testMailer)
router.get('/send-test-mail', lessonController.sendTestMail)

module.exports = router
