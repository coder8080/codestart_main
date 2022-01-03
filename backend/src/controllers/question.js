const Question = require('../models/question')

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
