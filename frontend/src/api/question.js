import axios from '@/api/axios'

function createQuestion(form) {
    return axios.post('/questions/create', { form }).then((response) => response.data.question)
}

function deleteQuestion(id) {
    return axios.post('/questions/delete', { id })
}

export default { createQuestion, deleteQuestion }
