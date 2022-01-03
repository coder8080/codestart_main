import axios from '@/api/axios'

function submitEmail(email) {
    return axios.post('/users/generate-key', { email })
}

function resetPassword({ key, password, password_repeat }) {
    return axios.post('/users/reset-password', { key, password, password_repeat })
}

export default {
    submitEmail,
    resetPassword,
}
