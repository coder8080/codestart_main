import solutionApi from '@/api/solution'

const state = {
    isSubmitting: false,
    errors: null,
}

export const mutationTypes = {
    createSolutionStart: '[solution] Create Solution Start',
    createSolutionSuccess: '[solution] Create Solution Success',
    createSolutionFailure: '[solution] Create Solution Failure',
}

const mutations = {
    [mutationTypes.createSolutionStart](state) {
        state.isSubmitting = true
        state.errors = null
    },
    [mutationTypes.createSolutionSuccess](state) {
        state.isSubmitting = false
        state.errors = null
    },
    [mutationTypes.createSolutionFailure](state, errors) {
        state.isSubmitting = false
        state.errors = errors
    },
}

export const actionTypes = {
    createSolution: '[solution] Create Solution',
}

const actions = {
    [actionTypes.createSolution](context, body) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.createSolutionStart)
            solutionApi
                .createSolution(body)
                .then((solution) => {
                    context.commit(mutationTypes.createSolutionSuccess, { solution, question: body.question })
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.createSolutionFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
