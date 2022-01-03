const Lesson = require('../models/lesson')
const SubLesson = require('../models/sublesson')
module.exports = async () => {
    // Синхронизируем уроки
    const lessons_needed = require('../config').lessons
    await Lesson.remove({})
    for (let lesson of lessons_needed) {
        let new_lesson = await Lesson.create(lesson)
        new_lesson.save()
    }

    // Синхронизируем дополнения к урокам
    const sub_lessons_needed = require('../config').subLessons
    await SubLesson.remove({})
    for (let sub_lesson of sub_lessons_needed) {
        let new_sub_lesson = await SubLesson.create(sub_lesson)
        new_sub_lesson.save()
    }
}
