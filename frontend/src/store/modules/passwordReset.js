import passwordResetApi from '@/api/passwordReset'

const state = {
    errors: null,
    isSubmitting: false,
}

export const mutationTypes = {
    submitEmailStart: '[password reset] Submit Email Start',
    submitEmailSuccess: '[password reset] Submit Email Success',
    submitEmailFailure: '[password reset] Submit Email Failure',

    resetPasswordStart: '[password reset] Reset Password Start',
    resetPasswordSuccess: '[password reset] Reset Password Success',
    resetPasswordFailure: '[password reset] Reset Password Failure',
}

const mutations = {
    [mutationTypes.submitEmailStart](state) {
        state.errors = null
        state.isSubmitting = true
    },
    [mutationTypes.submitEmailSuccess](state) {
        state.isSubmitting = false
    },
    [mutationTypes.submitEmailFailure](state, errors) {
        state.errors = errors
        state.isSubmitting = false
    },

    [mutationTypes.resetPasswordStart](state) {
        state.errors = null
        state.isSubmitting = true
    },
    [mutationTypes.resetPasswordSuccess](state) {
        state.isSubmitting = false
    },
    [mutationTypes.resetPasswordFailure](state, errors) {
        state.errors = errors
        state.isSubmitting = false
    },
}

export const actionTypes = {
    submitEmail: '[password reset] Submit Email',
    resetPassword: '[password reset] Reset Password',
}

const actions = {
    [actionTypes.submitEmail](context, email) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.submitEmailStart)
            passwordResetApi
                .submitEmail(email)
                .then(() => {
                    context.commit(mutationTypes.submitEmailSuccess)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.submitEmailFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.resetPassword](context, data) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.resetPasswordStart)
            passwordResetApi
                .resetPassword(data)
                .then(() => {
                    context.commit(mutationTypes.resetPasswordSuccess)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.resetPasswordFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
