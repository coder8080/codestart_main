const mongoose = require('mongoose')
const solutionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    ownerUsername: { type: String, required: true },
})
const Solution = mongoose.model('Solution', solutionSchema)
module.exports = Solution
