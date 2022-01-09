import axios from '@/api/axios'

function createSolution(body) {
    return axios.post('/solutions/create', body).then((response) => response.data.solution)
}

function deleteSolution(id) {
    return axios.post('/solutions/delete', { id })
}

function updateSolution(form) {
    return axios.post('/solutions/update', { form }).then((response) => response.data.solution)
}

function markAsCorrect(id) {
    return axios.post('/solutions/mark-as-correct', { id })
}

export default { createSolution, deleteSolution, updateSolution, markAsCorrect }
