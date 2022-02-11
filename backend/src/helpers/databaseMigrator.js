/** This code applies lessons and sublessons to the db */

const Lesson = require('../models/lesson')
const SubLesson = require('../models/sublesson')
module.exports = async () => {
    // Synchronize lessons
    const lessons_needed = require('../config').lessons
    await Lesson.deleteMany({})
    for (let lesson of lessons_needed) {
        let new_lesson = await Lesson.create(lesson)
        new_lesson.save()
    }

    // Synchronize sublessons
    const sub_lessons_needed = require('../config').subLessons
    await SubLesson.deleteMany({})
    for (let sub_lesson of sub_lessons_needed) {
        let new_sub_lesson = await SubLesson.create(sub_lesson)
        new_sub_lesson.save()
    }
}
