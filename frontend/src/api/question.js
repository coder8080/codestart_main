import axios from '@/api/axios'

function createQuestion(form) {
    return axios.post('/questions/create', { form }).then((response) => response.data.question)
}

export default { createQuestion }
