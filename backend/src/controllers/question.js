/** Set of express controllers for working with questions */

const Question = require('../models/question')
const Solution = require('../models/solution')

/** Create new question */
module.exports.createQuestion = async (req, res) => {
    user = req.body.user
    form = req.body.form
    errors = []
    if (!user) errors.push('чтобы задать вопрос, войдите на сайт')
    if (!form) {
        errors.push('укажите данные для регистрации вопроса')
    } else {
        if (!form.lesson) errors.push('укажите номер урока')
        if (!form.title) errors.push('укажите название вопроса')
        if (!form.description) errors.push('поясните ваш вопрос')
    }
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    const question = new Question({
        ownerUsername: user.username,
        title: form.title,
        description: form.description,
        lesson: form.lesson,
    })
    await question.save()
    res.status(200).json({ question })
}

/** Delete existing question */
module.exports.deleteQuestion = async (req, res) => {
    const user = req.body.user
    const id = req.body.id
    let errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!id) errors.push('укажите id удаляемого вопроса')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    const question = (await Question.find({ _id: id }))[0]
    if (!question) {
        res.status(401).json({ errors: ['такого вопроса не существует'] })
        return
    }
    if (question.ownerUsername !== user.username) {
        res.status(401).json({ errors: ['этот вопрос создан не вами'] })
        return
    }
    await Question.deleteOne({ _id: id })
    await Solution.deleteMany({ question: id })
    res.status(200).end()
}

/** Update existing question */
module.exports.updateQuestion = async (req, res) => {
    const user = req.body.user
    const form = req.body.form
    let errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!form) {
        errors.push('укажите данные для изменения')
    } else if (!form.id) errors.push('укажите id изменяемого вопроса')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    const id = form.id
    try {
        const question = (await Question.find({ _id: id }))[0]
        if (!question) {
            res.status(404).json({ errors: ['урока с таким id не существует'] })
            return
        }
        if (question.ownerUsername === user.username) {
            if (!form.title) form.title = question.title
            if (!form.description) form.description = question.description
            await Question.updateOne({ _id: id }, { title: form.title, description: form.description })
            const updatedQuestion = (await Question.find({ _id: id }))[0]
            res.status(200).json({ question: updatedQuestion })
        } else {
            res.status(403).json({ errors: ['этот вопрос задан не вами'] })
        }
    } catch {
        res.status(500).json({ errors: ['id некорректен'] })
    }
}
