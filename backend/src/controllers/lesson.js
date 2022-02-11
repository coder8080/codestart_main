/** Set of express controllers for working with lessons */

const Lesson = require('../models/lesson')
const SubLesson = require('../models/sublesson')
const Solution = require('../models/solution')
const Question = require('../models/question')
const mailerApi = require('../api/mailer')

/** Get lesson */
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

/** Get sublesson */
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

/** Get all abailable lessons */
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

/** Get number of lessons */
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
