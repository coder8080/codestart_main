import axios from '@/api/axios'

function createSolution(body) {
    return axios.post('/solutions/create', body).then((response) => response.data.solution)
}

export default { createSolution }
