import axios from 'axios'

function getFeed(pagination) {
    return axios.get(`/users/get-feed/${pagination}`).then((response) => response.data.programs)
}

export default {
    getFeed,
}
