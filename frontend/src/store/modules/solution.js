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

    updateSolutionStart: '[solution] Update Solution Start',
    updateSolutionSuccess: '[solution] Update Solution Success',
    updateSolutionFailure: '[solution] Update Solution Failure',
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

    [mutationTypes.updateSolutionStart](state) {
        state.isSubmitting = true
        state.errors = null
    },
    [mutationTypes.updateSolutionSuccess](state) {
        state.isSubmitting = false
        state.errors = null
    },
    [mutationTypes.updateSolutionFailure](state, errors) {
        state.isSubmitting = false
        state.errors = errors
    },
}

export const actionTypes = {
    createSolution: '[solution] Create Solution',
    deleteSolution: '[solution] Delete Solution',
    updateSolution: '[solution] Update Solution',
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
    [actionTypes.deleteSolution](context, id) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.deleteSolutionStart)
            solutionApi
                .deleteSolution(id)
                .then(() => {
                    context.commit(mutationTypes.deleteSolutionSuccess, id)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.deleteSolutionFailure, result.response.data.errors)
                })
        })
    },

    [actionTypes.updateSolution](context, form) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.updateSolutionStart)
            solutionApi
                .updateSolution(form)
                .then((solution) => {
                    context.commit(mutationTypes.updateSolutionSuccess, solution)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.updateSolutionFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
