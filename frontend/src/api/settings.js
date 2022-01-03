import axios from '@/api/axios'

function updateSettings(settings) {
    return axios.post('/users/update-settings', settings).then((response) => response.data.user)
}

export default {
    updateSettings,
}
