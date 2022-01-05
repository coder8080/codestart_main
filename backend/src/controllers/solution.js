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

module.exports.deleteSolution = async (req, res) => {
    const user = req.body.user
    const id = req.body.id
    let errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!id) errors.push('укажите id удаляемого решения')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    const question = (await Solution.find({ _id: id }))[0]
    if (!question) {
        res.status(401).json({ errors: ['такого решения не существует'] })
        return
    }
    if (question.ownerUsername !== user.username) {
        res.status(401).json({ errors: ['это решение предложено не вами'] })
        return
    }
    await Solution.deleteOne({ _id: id })
    res.status(200).end()
}
