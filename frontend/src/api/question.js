import axios from '@/api/axios'

function createQuestion(form) {
    return axios.post('/questions/create', { form }).then((response) => response.data.question)
}

function deleteQuestion(id) {
    return axios.post('/questions/delete', { id })
}

function updateQuestion(form) {
    return axios.post('/questions/update', { form }).then((response) => response.data.question)
}

export default { createQuestion, deleteQuestion, updateQuestion }
