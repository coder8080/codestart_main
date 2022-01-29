import axios from 'axios'

function sendMsg(form) {
    return axios.post('/messages/send', form).then((response) => response.data.msg)
}

function deleteMsg(id) {
    return axios.post('/messages/delete', { id }).then((response) => response.data.msg)
}

export default {
    sendMsg,
    deleteMsg,
}
