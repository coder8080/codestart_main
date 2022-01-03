import axios from '@/api/axios'

function createUser(credentials) {
    return axios.post('/users/create', credentials).then((response) => response.data.user)
}

function login(credentials) {
    return axios.post('/users/login', credentials).then((response) => response.data.user)
}

function validateToken() {
    return axios.get('/users/validate-token').then((response) => response.data.user)
}

export default {
    createUser,
    login,
    validateToken,
}
