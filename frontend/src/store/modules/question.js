import questionApi from '@/api/question'

const state = {
    isSubmitting: false,
    errors: null,
}

export const mutationTypes = {
    createQuestionStart: '[question] Create Question Start',
    createQuestionSuccess: '[question] Create Question Success',
    createQuestionFailure: '[question] Create Question Failure',
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
}

export const actionTypes = {
    createQuestion: '[question] Create Question',
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
                    console.log(result)
                    context.comimt(mutationTypes.createQuestionFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
