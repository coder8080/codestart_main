import lessonsApi from '@/api/lessons'

const state = {
    isLoading: false,
    data: null,
    count: null,
    errors: null,
}
export const mutationTypes = {
    getAllLessonsStart: '[lessons] Get All Lessons Start',
    getAllLessonsSuccess: '[lessons] Get All Lessons Success',
    getAllLessonsFailure: '[lessons] Get All Lessons Failure',

    countLessonsStart: '[lessons] Count All Lessons Start',
    countLessonsSuccess: '[lessons] Count All Lessons Success',
    countLessonsFailure: '[lessons] Count All Lessons Failure',
}
const mutations = {
    [mutationTypes.getAllLessonsStart](state) {
        state.isLoading = true
        state.errors = null
    },
    [mutationTypes.getAllLessonsSuccess](state, lessons) {
        state.isLoading = false
        state.data = lessons
    },
    [mutationTypes.getAllLessonsFailure](state, errors) {
        state.isLoading = false
        if (!state.errors) {
            state.errors = errors
        } else {
            state.errors.push(...errors)
        }
    },

    [mutationTypes.countLessonsStart](state) {
        state.isLoading = true
        state.errors = null
    },
    [mutationTypes.countLessonsSuccess](state, count) {
        state.isLoading = false
        state.count = count
    },
    [mutationTypes.countLessonsFailure](state, errors) {
        state.isLoading = false
        if (!state.errors) {
            state.errors = errors
        } else {
            state.errors.push(...errors)
        }
    },
}
export const actionTypes = {
    getAllLessons: '[lessons] Get All Lessons',
    countLessons: '[lessons] Count Lessons',
}
const actions = {
    [actionTypes.getAllLessons](context) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getAllLessonsStart)
            lessonsApi
                .getAllLessons()
                .then((lessons) => {
                    context.commit(mutationTypes.getAllLessonsSuccess, lessons)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.getAllLessonsFailure, result.response.data.errors)
                })
        })
    },

    [actionTypes.countLessons](context) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.countLessonsStart)
            lessonsApi
                .countLessons()
                .then((count) => {
                    context.commit(mutationTypes.countLessonsSuccess, count)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.countLessonsFailure, result.response.data.errors)
                })
        })
    },
}
export default {
    state,
    mutations,
    actions,
}
