import authApi from '@/api/auth'
import storage from '@/helpers/storage'
import { mutationTypes as settingsMutationTypes } from '@/store/modules/settings'
import { mutationTypes as lessonMutationTypes } from '@/store/modules/lesson'

const state = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: null,
    errors: null,
    isLoading: false,
}

export const mutationTypes = {
    registerStart: '[auth] Register Start',
    registerSuccess: '[auth] Register Success',
    registerFailure: '[auth] Register Failure',

    loginStart: '[auth] Login Start',
    loginSuccess: '[auth] Login Success',
    loginFailure: '[auth] Login Failure',

    resetErrors: '[auth] Reset',

    validateTokenStart: '[auth] Validate Token Start',
    validateTokenSuccess: '[auth] Validate Token Success',
    validateTokenFailure: '[auth] Validate Token Failure',

    logout: '[auth] logout',
}

const mutations = {
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true
        state.errors = null
    },
    [mutationTypes.registerSuccess](state, user) {
        state.isSubmitting = false
        state.errors = null
        state.currentUser = user
        state.isLoggedIn = true
    },
    [mutationTypes.registerFailure](state, errors) {
        state.isSubmitting = false
        state.errors = errors
    },

    [mutationTypes.loginStart](state) {
        state.isSubmitting = true
        state.errors = null
    },
    [mutationTypes.loginSuccess](state, user) {
        state.isSubmitting = false
        state.errors = null
        state.currentUser = user
        state.isLoggedIn = true
    },
    [mutationTypes.loginFailure](state, errors) {
        state.isSubmitting = false
        state.errors = errors
    },

    [mutationTypes.resetErrors](state) {
        state.errors = null
    },

    [mutationTypes.validateTokenStart](state) {
        state.isLoading = true
    },
    [mutationTypes.validateTokenSuccess](state, user) {
        state.isLoading = false
        state.currentUser = user
        state.isLoggedIn = true
    },
    [mutationTypes.validateTokenFailure](state) {
        state.isLoading = false
        state.isLoggedIn = false
    },

    [settingsMutationTypes.updateSettingsSuccess](state, user) {
        state.currentUser = user
    },

    [mutationTypes.logout](state) {
        state.currentUser = null
        state.isLoggedIn = false
    },

    [lessonMutationTypes.updateUserLevelSuccess](state, user) {
        state.currentUser = user
    },
}

export const getterTypes = {
    isAnonymous: '[auth] Is Anonymous',
}

const getters = {
    [getterTypes.isAnonymous](state) {
        return state.isLoggedIn === false
    },
}

export const actionTypes = {
    register: '[auth] Register',
    login: '[auth] Login',
    validateToken: '[auth] Validate Token',
    logout: '[auth] logout',
}

const actions = {
    [actionTypes.register](context, credentials) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.registerStart)
            authApi
                .createUser(credentials)
                .then((user) => {
                    context.commit(mutationTypes.registerSuccess, user)
                    storage.setItem('token', user.token)
                    resolve(user)
                })
                .catch((result) => {
                    context.commit(mutationTypes.registerFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.login](context, credentials) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.loginStart)
            authApi
                .login(credentials)
                .then((user) => {
                    context.commit(mutationTypes.loginSuccess, user)
                    storage.setItem('token', user.token)
                    resolve(user)
                })
                .catch((result) => {
                    context.commit(mutationTypes.loginFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.validateToken](context) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.validateTokenStart)
            authApi
                .validateToken()
                .then((user) => {
                    context.commit(mutationTypes.validateTokenSuccess, user)
                    resolve()
                })
                .catch(() => {
                    context.commit(mutationTypes.validateTokenFailure)
                    storage.setItem('token', '')
                })
        })
    },
    [actionTypes.logout](context) {
        return new Promise((resolve) => {
            try {
                context.commit(mutationTypes.logout)
                storage.setItem('token', '')
                resolve()
            } catch (e) {
                console.log('error', e)
            }
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
