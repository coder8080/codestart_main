import axios from 'axios'

function getSubLesson(id) {
    return axios.get(`/lessons/get-sub/${id}`).then((response) => response.data.sublesson)
}

export default {
    getSubLesson,
}
