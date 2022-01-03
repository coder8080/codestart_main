import settingsApi from '@/api/settings'

const state = {
    isSubmitting: false,
    errors: null,
}

export const mutationTypes = {
    updateSettingsStart: '[settings] Update Settings Start',
    updateSettingsSuccess: '[settings] Update Settings Success',
    updateSettingsFailure: '[settings] Update Settings Failure',
}

const mutations = {
    [mutationTypes.updateSettingsStart](state) {
        state.isSubmitting = true
        state.errors = null
    },
    [mutationTypes.updateSettingsSuccess](state) {
        state.isSubmitting = false
    },
    [mutationTypes.updateSettingsFailure](state, errors) {
        state.isSubmitting = false
        state.errors = errors
    },
}

export const actionTypes = {
    updateSettings: '[settings] Update Settings',
}

const actions = {
    [actionTypes.updateSettings](context, settings) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.updateSettingsStart)
            settingsApi
                .updateSettings(settings)
                .then((user) => {
                    context.commit(mutationTypes.updateSettingsSuccess, user)
                    resolve()
                })
                .catch((result) => {
                    context.commit(mutationTypes.updateSettingsFailure, result.response.data.errors)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
