import axios from '@/api/axios'

function createSolution(body) {
    return axios.post('/solutions/create', body).then((response) => response.data.solution)
}

function deleteSolution(id) {
    return axios.post('/solutions/delete', { id })
}

export default { createSolution, deleteSolution }
