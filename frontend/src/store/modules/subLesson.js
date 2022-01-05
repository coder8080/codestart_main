import subLessonApi from '@/api/sublesson'

const state = {
    data: null,
    errors: null,
    isLoading: false,
}

export const mutationTypes = {
    getSubLessonStart: '[Sub Lesson] Get Sub Lesson Start',
    getSubLessonSuccess: '[Sub Lesson] Get Sub Lesson Success',
    getSubLessonFailure: '[Sub Lesson] Get Sub Lesson Failure',
}

const mutations = {
    [mutationTypes.getSubLessonStart](state) {
        state.isLoading = true
        state.errors = null
        state.data = null
    },
    [mutationTypes.getSubLessonSuccess](state, subLesson) {
        state.isLoading = false
        state.errors = null
        state.data = subLesson
    },
    [mutationTypes.getSubLessonFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
        state.data = null
    },
}

export const actionTypes = {
    getSubLesson: '[Sub Lesson] Get Sub Lesson',
}

const actions = {
    [actionTypes.getSubLesson](context, id) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getSubLessonStart)
            subLessonApi
                .getSubLesson(id)
                .then((sublesson) => {
                    context.commit(mutationTypes.getSubLessonSuccess, sublesson)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.getSubLessonFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
