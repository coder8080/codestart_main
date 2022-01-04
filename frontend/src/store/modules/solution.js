import solutionApi from '@/api/solution'

const state = {
    isSubmitting: false,
    isDeleting: false,
    errors: null,
}

export const mutationTypes = {
    createSolutionStart: '[solution] Create Solution Start',
    createSolutionSuccess: '[solution] Create Solution Success',
    createSolutionFailure: '[solution] Create Solution Failure',

    deleteSolutionStart: '[solution] Delete Solution Start',
    deleteSolutionSuccess: '[solution] Delete Solution Success',
    deleteSolutionFailure: '[solution] Delete Solution Failure',
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

    [mutationTypes.deleteSolutionStart](state) {
        state.isDeleting = true
        state.errors = null
    },
    [mutationTypes.deleteSolutionSuccess](state) {
        state.isDeleting = false
        state.errors = null
    },
    [mutationTypes.deleteSolutionFailure](state, errors) {
        state.isDeleting = false
        state.errors = errors
    },
}

export const actionTypes = {
    createSolution: '[solution] Create Solution',
    deleteSolution: '[solution] Delete Solution',
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
                    console.log(result)
                    context.commit(mutationTypes.createSolutionFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.deleteSolution](context, id) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.deleteSolutionStart)
            solutionApi
                .deleteSolution(id)
                .then(() => {
                    context.commit(mutationTypes.deleteSolutionSuccess)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.deleteSolutionFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
