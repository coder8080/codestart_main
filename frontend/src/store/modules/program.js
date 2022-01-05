import programApi from '@/api/programs'

const state = {
    isLoading: false,
    isSubmitting: false,
    data: null,
    errors: null,
    isDeleting: false,
}

export const mutationTypes = {
    getProgramStart: '[program] Get Program Start',
    getProgramSuccess: '[program] Get Program Success',
    getProgramFailure: '[program] Get Program Failure',

    createProgramStart: '[program] Create Program Start',
    createProgramSuccess: '[program] Create Program Success',
    createProgramFailure: '[program] Create Program Failure',

    deleteProgramStart: '[program] Delete Program Start',
    deleteProgramSuccess: '[program] Delete Program Success',
    deleteProgramFailure: '[program] Delete Program Failure',

    editProgramStart: '[program] Edit Program Start',
    editProgramSuccess: '[program] Edit Program Success',
    editProgramFailure: '[program] Edit Program Failure',
}
const mutations = {
    [mutationTypes.getProgramStart](state) {
        state.isLoading = true
        state.data = null
        state.errors = null
    },
    [mutationTypes.getProgramSuccess](state, data) {
        state.isLoading = false
        state.errors = null
        state.data = data
    },
    [mutationTypes.getProgramFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
        state.data = null
    },

    [mutationTypes.createProgramStart](state) {
        state.isSubmitting = true
        state.errors = null
    },
    [mutationTypes.createProgramSuccess](state) {
        state.isSubmitting = false
        state.errors = null
    },
    [mutationTypes.createProgramFailure](state, errors) {
        state.isSubmitting = false
        state.errors = errors
    },

    [mutationTypes.deleteProgramStart](state) {
        state.isDeleting = true
        state.errors = null
        state.data = null
    },
    [mutationTypes.deleteProgramSuccess](state) {
        state.isDelting = false
        state.data = null
        state.errors = null
    },
    [mutationTypes.deleteProgramFailure](state, errors) {
        state.isDeleting = false
        state.data = null
        state.errors = errors
    },

    [mutationTypes.editProgramStart](state) {
        state.isSubmitting = true
        state.errors = null
    },
    [mutationTypes.editProgramSuccess](state, program) {
        state.isSubmitting = false
        state.data = program
        state.errors = null
    },
    [mutationTypes.editProgramFailure](state, errors) {
        state.isSubmitting = false
        state.errors = errors
    },
}

export const actionTypes = {
    getProgram: '[program] Get Program',
    createProgram: '[program] Create Program',
    deleteProgram: '[program] Delete Program',
    editProgram: '[program] Edit Program',
}

const actions = {
    [actionTypes.getProgram](context, id) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getProgramStart)
            programApi
                .getProgram(id)
                .then((program) => {
                    context.commit(mutationTypes.getProgramSuccess, program)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.getProgramFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.createProgram](context, form) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.createProgramStart)
            programApi
                .createProgram(form)
                .then((id) => {
                    context.commit(mutationTypes.createProgramSuccess)
                    resolve(id)
                })
                .catch((result) => {
                    context.commit(mutationTypes.createProgramFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.deleteProgram](context, id) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.deleteProgramStart)
            programApi
                .deleteProgram(id)
                .then(() => {
                    context.commit(mutationTypes.deleteProgramSuccess)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.deleteProgramFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.editProgram](context, { id, form }) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.editProgramStart)
            programApi
                .editProgram(id, form)
                .then((program) => {
                    context.commit(mutationTypes.editProgramSuccess, program)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.editProgramFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
