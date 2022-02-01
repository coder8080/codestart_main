import chatApi from '@/api/chat'
import { mutationTypes as msgMutationTypes } from '@/store/modules/msg'

const state = {
    isLoading: false,
    errors: null,
    chats: null,
    data: null,
}

export const mutationTypes = {
    getChatListStart: '[chat] Get Chat List Start',
    getChatListSuccess: '[chat] Get Chat List Success',
    getChatListFailure: '[chat] Get Chat List Failure',

    getChatStart: '[chat] Get Chat Start',
    getChatSuccess: '[chat] Get Chat Success',
    getChatFailure: '[chat] Get Chat Failure',
}

const mutations = {
    [mutationTypes.getChatListStart](state) {
        state.isLoading = true
        state.errors = null
        state.chats = null
    },
    [mutationTypes.getChatListSuccess](state, chats) {
        state.isLoading = false
        state.errors = null
        state.chats = chats
    },
    [mutationTypes.getChatListFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
        state.chats = null
    },

    [mutationTypes.getChatStart](state) {
        state.isLoading = true
        state.errors = null
        state.data = null
    },
    [mutationTypes.getChatSuccess](state, chat) {
        state.isLoading = false
        state.errors = null
        state.data = chat
    },
    [mutationTypes.getChatFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
        state.data = null
    },

    [msgMutationTypes.sendMsgSuccess](state, msg) {
        state.data.messages.push(msg)
    },
    [msgMutationTypes.deleteMsgSuccess](state, id) {
        for (let i = 0; i < state.data.messages.length; i++) {
            if (state.data.messages[i]._id === id) {
                state.data.messages.splice(i, 1)
                break
            }
        }
    },
}

export const actionTypes = {
    getChatList: '[chat] Get Chat List',
    getChat: '[chat] Get Chat',
}

const actions = {
    [actionTypes.getChatList](context) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getChatListStart)
            chatApi
                .getChatList()
                .then((chats) => {
                    context.commit(mutationTypes.getChatListSuccess, chats)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.getChatListFailure, result.response.data.errors)
                })
        })
    },

    [actionTypes.getChat](context, id) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getChatStart)
            chatApi
                .getChat(id)
                .then((chat) => {
                    context.commit(mutationTypes.getChatSuccess, chat)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.getChatFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
