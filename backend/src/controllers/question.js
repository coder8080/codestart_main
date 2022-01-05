const Question = require('../models/question')
const Solution = require('../models/solution')

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
