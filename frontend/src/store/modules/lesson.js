import lessonApi from '@/api/lesson'
import { mutationTypes as questionMutationTypes } from '@/store/modules/question'
import { mutationTypes as solutionMutationTypes } from '@/store/modules/solution'

const state = {
    data: null,
    errors: null,
    isLoading: false,
    isUpdatingLevel: false,
    updatingLevelErrors: null,
}
export const mutationTypes = {
    getLessonStart: '[lesson] Get Lesson Start',
    getLessonSuccess: '[lesson] Get Lesson Success',
    getLessonFailure: '[lesson] Get Lesson Failure',

    updateUserLevelStart: '[lesson] Update User Level Start',
    updateUserLevelSuccess: '[lesson] Update User Level Success',
    updateUserLevelFailure: '[lesson] Update User Level Failure',
}
const mutations = {
    [mutationTypes.getLessonStart](state) {
        state.data = null
        state.errors = null
        state.isLoading = true
    },
    [mutationTypes.getLessonSuccess](state, lesson) {
        state.data = lesson
        state.isLoading = false
    },
    [mutationTypes.getLessonFailure](state, errors) {
        state.errors = errors
        state.isLoading = false
    },

    [mutationTypes.updateUserLevelStart](state) {
        state.isUpdatingLevel = true
        state.updatingLevelErrors = null
    },
    [mutationTypes.updateUserLevelSuccess](state) {
        state.isUpdatingLevel = false
    },
    [mutationTypes.updateUserLevelFailure](state, errors) {
        state.isUpdatingLevel = false
        state.updatingLevelErrors = errors
    },

    [questionMutationTypes.createQuestionSuccess](state, question) {
        state.data.questions.push(question)
    },

    [solutionMutationTypes.createSolutionSuccess](state, { solution, question }) {
        console.log(solution)
        console.log(question)
        for (let i = 0; i < state.data.questions.length; i++) {
            console.log(i)
            if (state.data.questions[i]._id === question) {
                state.data.questions[i].solutions.push(solution)
            }
        }
    },
}
export const actionTypes = {
    getLesson: '[lesson] Get Lesson',
    updateUserLevel: '[lesson] Update User Level',
}
const actions = {
    [actionTypes.getLesson](context, number) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getLessonStart)
            lessonApi
                .getLesson(number)
                .then((lesson) => {
                    context.commit(mutationTypes.getLessonSuccess, lesson)
                    resolve(lesson)
                })
                .catch((result) => {
                    context.commit(mutationTypes.getLessonFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.updateUserLevel](context) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.updateUserLevelStart)
            lessonApi
                .updateUserLevel()
                .then((response) => {
                    const user = response.data.user
                    context.commit(mutationTypes.updateUserLevelSuccess, user)
                    resolve(response.data.haveFinished)
                })
                .catch((result) => {
                    context.commit(mutationTypes.updateUserLevelFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
