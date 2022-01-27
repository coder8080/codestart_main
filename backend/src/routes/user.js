const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

router.post('/create', userController.register)
router.post('/login', userController.login)
router.get('/validate-token', auth, userController.validateToken)
router.post('/update-settings', auth, userController.updateSettings)
router.get('/update-level', auth, userController.updateLevel)
router.post('/generate-key', userController.generateKey)
router.get('/verify-key', userController.verifyKey)
router.post('/reset-password', userController.resetPassword)
router.get('/get-user-profile/:username', userController.getUserProfile)
router.get('/get-feed/:pagination', auth, userController.getFeed)

module.exports = router
