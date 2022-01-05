const Lesson = require('../models/lesson')
const SubLesson = require('../models/sublesson')
const Solution = require('../models/solution')
const Question = require('../models/question')
const mailerApi = require('../api/mailer')

module.exports.getLesson = async (req, res) => {
    const user = req.body.user
    const number = Number(req.params.number)
    if (user) {
        const lesson = (await Lesson.find({ number }))[0]
        if (lesson) {
            const subLessons = await SubLesson.find({ parent: number })
            const questions = await Question.find({ lesson: number })
            for (let i = 0; i < questions.length; i++) {
                question = questions[i]
                const solutions = await Solution.find({
                    question: question._id,
                })
                questions[i] = {
                    _id: question._id,
                    ownerUsername: question.ownerUsername,
                    lesson: question.lesson,
                    title: question.title,
                    description: question.description,
                    isBanned: question.isBanned,
                    solutions,
                }
            }
            console.log
            res.status(200).json({
                lesson: {
                    number: lesson.number,
                    title: lesson.title,
                    description: lesson.description,
                    video: lesson.video,
                    subLessons,
                    questions,
                },
            })
        } else {
            res.status(404).json({ errors: ['урок с таким номером не найден'] })
        }
    } else {
        res.status(401).json({ errors: ['сначала вам нужно войти'] })
    }
}

module.exports.getSubLesson = async (req, res) => {
    const user = req.body.user
    if (user) {
        const arr = req.params.id.split('-')
        const parent = arr[0]
        const number = arr[1]
        const sublesson = (await SubLesson.find({ parent, number }))[0]
        if (sublesson) {
            res.status(200).json({
                sublesson,
            })
        } else {
            res.status(401).json({
                errors: ['дополнения с таким id не существует'],
            })
        }
    } else {
        res.status(401).json({ errors: ['сначала войдите на сайт'] })
    }
}

module.exports.getAllLessons = async (req, res) => {
    const user = req.body.user
    if (user) {
        const lessons = await Lesson.find({})
        res.status(200).json({
            lessons,
        })
    } else {
        res.status(401).json({
            errors: ['сначала войдите на сайт'],
        })
    }
}

module.exports.countLessons = async (req, res) => {
    const user = req.body.user
    if (user) {
        const count = await Lesson.estimatedDocumentCount()
        res.status(200).json({
            count,
        })
    } else {
        res.status(401).json({
            errors: ['сначала войдите на сайт'],
        })
    }
}

module.exports.testMailer = async (req, res) => {
    mailerApi
        .testMailer()
        .then((response) => {
            res.status(200).json(response.data)
        })
        .catch((result) => {
            res.status(500).json({
                error: result,
            })
        })
}

module.exports.sendTestMail = async (req, res) => {
    mailerApi.sendMail({
        to: 'coder8080@yandex.ru',
        subject: 'test mail',
        text: 'password reset',
    })
}
