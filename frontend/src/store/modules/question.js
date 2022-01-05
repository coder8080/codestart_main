import questionApi from '@/api/question'

const state = {
    isSubmitting: false,
    isDeleting: false,
    errors: null,
}

export const mutationTypes = {
    createQuestionStart: '[question] Create Question Start',
    createQuestionSuccess: '[question] Create Question Success',
    createQuestionFailure: '[question] Create Question Failure',

    deleteQuestionStart: '[question] Delete Question Start',
    deleteQuestionSuccess: '[question] Delete Question Success',
    deleteQuestionFailure: '[question] Delete Question Failure',
}

const mutations = {
    [mutationTypes.createQuestionStart](state) {
        state.isSubmitting = true
        state.errors = null
    },
    [mutationTypes.createQuestionSuccess](state) {
        state.isLoading = false
        state.errors = null
    },
    [mutationTypes.createQuestionFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
    },

    [mutationTypes.deleteQuestionStart](state) {
        state.errors = null
        state.isDeleting = true
    },
    [mutationTypes.deleteQuestionSuccess](state) {
        state.isDeleting = false
        state.errors = null
    },
    [mutationTypes.deleteQuestionFailure](state, errors) {
        state.isDeleting = false
        state.errors = errors
    },
}

export const actionTypes = {
    createQuestion: '[question] Create Question',
    deleteQuestion: '[question] Delete Question',
}

const actions = {
    [actionTypes.createQuestion](context, form) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.createQuestionStart)
            questionApi
                .createQuestion(form)
                .then((question) => {
                    context.commit(mutationTypes.createQuestionSuccess, question)
                    resolve()
                })
                .catch((result) => {
                    context.comimt(mutationTypes.createQuestionFailure, result.response.data.errors)
                })
        })
    },

    [actionTypes.deleteQuestion](context, id) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.deleteQuestionStart)
            questionApi
                .deleteQuestion(id)
                .then(() => {
                    context.commit(mutationTypes.deleteQuestionSuccess, id)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.deleteQuestionFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
