import msgApi from '@/api/msg'

const state = {
    isSubmitting: false,
    isLoading: false,
    errors: null,
}

export const mutationTypes = {
    sendMsgStart: '[msg] Send Message Start',
    sendMsgSuccess: '[msg] Send Message Success',
    sendMsgFailure: '[msg] Send Message Failure',

    deleteMsgStart: '[msg] Delete Message Start',
    deleteMsgSuccess: '[msg] Delete Message Success',
    deleteMsgFailure: '[msg] Delete Message Failure',
}

const mutations = {
    [mutationTypes.sendMsgStart](state) {
        state.isSubmitting = true
        state.errors = null
    },
    [mutationTypes.sendMsgSuccess](state) {
        state.isSubmitting = false
        state.errors = null
    },
    [mutationTypes.sendMsgFailure](state, errors) {
        state.isSubmitting = false
        state.errors = errors
    },

    [mutationTypes.deleteMsgStart](state) {
        state.isLoading = true
        state.errors = null
    },
    [mutationTypes.deleteMsgSuccess](state) {
        state.isLoading = false
        state.errors = null
    },
    [mutationTypes.deleteMsgFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
    },
}

export const actionTypes = {
    sendMsg: '[msg] Send Message',
    deleteMsg: '[msg] Delete Message',
}

const actions = {
    [actionTypes.sendMsg](context, form) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.sendMsgStart)
            msgApi
                .sendMsg(form)
                .then((msg) => {
                    context.commit(mutationTypes.sendMsgSuccess, msg)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.sendMsgFailure, result.response.data.errors)
                })
        })
    },

    [actionTypes.deleteMsg](context, id) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.deleteMsgStart)
            msgApi
                .deleteMsg(id)
                .then(() => {
                    context.commit(mutationTypes.deleteMsgSuccess, id)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.deleteMsgFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
