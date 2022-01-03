import axios from 'axios'

function getLesson(number) {
    return axios.get(`/lessons/get/${number}`).then((response) => response.data.lesson)
}

function updateUserLevel() {
    return axios.get(`/users/update-level`)
}

export default {
    getLesson,
    updateUserLevel,
}
