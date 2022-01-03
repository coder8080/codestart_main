const express = require('express')
const router = express.Router()
const programController = require('../controllers/program')
const auth = require('../middlewares/auth')

router.get('/get/:id', programController.getProgram)
router.post('/create', auth, programController.createProgram)
router.get('/get-my-programs', auth, programController.getMyPrograms)
router.post('/delete', auth, programController.deleteProgram)
router.post('/edit', auth, programController.editProgram)
router.post('/check-affiliation', auth, programController.checkAffiliation)
module.exports = router
