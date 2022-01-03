import axios from '@/api/axios'

function getProfile(username) {
    return axios
        .get(`/users/get-user-profile/${username}`)
        .then((response) => response.data)
}

export default { getProfile }
