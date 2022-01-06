const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const solutionController = require('../controllers/solution')

router.post('/create', auth, solutionController.createSolution)
router.post('/delete', auth, solutionController.deleteSolution)
router.post('/update', auth, solutionController.updateSolution)

module.exports = router
