import axios from 'axios'

function getChatList() {
    return axios.get('/chats/get-chat-list').then((response) => response.data.chats)
}

function getChat(username) {
    return axios.post('/chats/get-chat', { username }).then((response) => response.data.chat)
}

export default {
    getChatList,
    getChat,
}
