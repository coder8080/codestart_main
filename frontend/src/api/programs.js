import axois from '@/api/axios'
import axios from './axios'

function getProgram(id) {
    return axois
        .get(`/programs/get/${id}`)
        .then((response) => response.data.program)
}

function createProgram(form) {
    return axois
        .post('/programs/create', form)
        .then((response) => response.data.id)
}

function deleteProgram(id) {
    return axios.post('/programs/delete', { id })
}

function editProgram(id, form) {
    return axios
        .post('/programs/edit', { id, form })
        .then((response) => response.data.program)
}

function checkAffiliation(id) {
    return axios
        .post('/programs/check-affiliation', { id })
        .then((response) => response.data.allowed)
}

export default {
    getProgram,
    createProgram,
    deleteProgram,
    editProgram,
    checkAffiliation,
}
