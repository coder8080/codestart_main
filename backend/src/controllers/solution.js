const Solution = require('../models/solution')
const Question = require('../models/question')

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

module.exports.updateSolution = async (req, res) => {
    const user = req.body.user
    const form = req.body.form
    let errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!form) {
        errors.push('укажите данные для изменения')
    } else {
        if (!form.id) errors.push('укажите id изменяемого решения')
        if (!form.text) errors.push('укажите новый текст решения')
    }
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    const id = form.id
    try {
        const solution = (await Solution.find({ _id: id }))[0]
        if (!solution) {
            res.status(404).json({ errors: ['решения с таким id не существует'] })
            return
        }
        if (solution.ownerUsername === user.username) {
            await Solution.update({ _id: id }, { text: form.text })
            const updatedSolution = (await Solution.find({ _id: id }))[0]
            res.status(200).json({ solution: updatedSolution })
        } else {
            res.status(403).json({ errors: ['это решение предложено не вами'] })
        }
    } catch {
        res.status(500).json({ errors: ['id некорректен'] })
    }
}

module.exports.markAsCorrect = async (req, res) => {
    const user = req.body.user
    const id = req.body.id
    let errors = []
    if (!user) errors.push('Сначала войдите на сайт')
    if (!id) errors.push('Укажите id решения')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    const solution = (await Solution.find({ _id: id }))[0]
    if (!solution) {
        res.status(404).json({ errors: ['нет решения с таким id'] })
        return
    }
    const question = (await Question.find({ _id: solution.question }))[0]
    if (question.ownerUsername !== user.username) {
        res.status(403).json({ errors: ['этот вопрос принадлежит не вам'] })
        return
    }
    await Solution.update({ _id: id }, { isCorrect: true })
    res.status(200).end()
}
