import axios from '@/api/axios'

function getAllLessons() {
    return axios.get('/lessons/get-all').then((response) => response.data.lessons)
}

function countLessons() {
    return axios.get('/lessons/count-lessons').then((response) => response.data.count)
}

export default {
    getAllLessons,
    countLessons,
}
