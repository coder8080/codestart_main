const Solution = require('../models/solution')

module.exports.createSolution = async (req, res) => {
    const user = req.body.user
    const text = req.body.text
    const question = req.body.question
    errors = []
    if (!user) errors.push('войдите на сайт')
    if (!text) errors.push('укажите текст ответа')
    if (!question) errors.push('укажите к какому вопросу отностися решение')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    let solution = new Solution({
        question,
        text,
        ownerUsername: user.username,
    })
    await solution.save()
    res.status(200).json({ solution })
}
