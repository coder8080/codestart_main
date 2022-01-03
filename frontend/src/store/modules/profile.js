import profileApi from '@/api/profile'

const state = {
    isLoading: false,
    errors: null,
    data: null,
}

export const mutationTypes = {
    getProfileStart: '[profile] Get Profile Start',
    getProfileSuccess: '[profile] Get Profile Success',
    getProfileFailure: '[profile] Get Profile Failure',
}

const mutations = {
    [mutationTypes.getProfileStart](state) {
        state.data = null
        state.errors = null
        state.isLoading = true
    },
    [mutationTypes.getProfileSuccess](state, data) {
        state.data = data
        state.errors = null
        state.isLoading = false
    },
    [mutationTypes.getProfileFailure](state, errors) {
        state.data = null
        state.isLoading = false
        state.errors = errors
    },
}

export const actionTypes = {
    getProfile: '[profile] Get Profile',
}

const actions = {
    [actionTypes.getProfile](context, username) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getProfileStart)
            profileApi
                .getProfile(username)
                .then((profile) => {
                    context.commit(mutationTypes.getProfileSuccess, profile)
                    resolve()
                })
                .catch((result) => {
                    context.commit(
                        mutationTypes.getProfileFailure,
                        result.response.data.errors
                    )
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
