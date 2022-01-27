import feedApi from '@/api/feed'

const state = {
    isLoading: false,
    errors: null,
    data: null,
}

export const mutationTypes = {
    getFeedStart: '[feed] Get Feed Start',
    getFeedSuccess: '[feed] Get Feed Success',
    getFeedFailure: '[feed] Get Feed Failure',
}

const mutations = {
    [mutationTypes.getFeedStart](state) {
        state.isLoading = true
        state.errors = null
        state.data = null
    },
    [mutationTypes.getFeedSuccess](state, programs) {
        state.isLoading = false
        state.errors = null
        state.data = programs
    },
    [mutationTypes.getFeedFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
        state.data = null
    },
}

export const actionTypes = {
    getFeed: '[feed] Get Feed',
}

const actions = {
    [actionTypes.getFeed](context, pagination) {
        return new Promise((rseolve) => {
            context.commit(mutationTypes.getFeedStart)
            feedApi
                .getFeed(pagination)
                .then((programs) => {
                    context.commit(mutationTypes.getFeedSuccess, programs)
                    rseolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.getFeedFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
