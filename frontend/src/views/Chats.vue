<template>
    <div class="container">
        <h1 class="text-center">Ваши чаты</h1>
        <ul class="list-group" v-if="chats && chats[0]">
            <li class="list-group-item" v-for="chat in chats" :key="chat._id">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">
                        {{ chat.username }}
                    </div>
                    {{ chat.lastMessage.text }} ({{ chat.lastMessage.time }})
                    <br />
                    <div class="text-end">
                        <router-link
                            :to="{ name: 'Chat', params: { username: chat.username } }"
                            class="btn btn-outline-success mt-2"
                        >
                            Перейти в чат
                        </router-link>
                    </div>
                </div>
            </li>
        </ul>
        <p v-if="chats && !chats[0]">
            У вас нет открытых чатов. Чтобы начать общение, нажмите на кнопку "Создать чат" и введите ник пользователя,
            или нажмите на кнопку "написать" в чужом профиле.
        </p>
        <app-login-request v-if="isAnonymous" />
        <app-errors v-if="errors" :errors="errors" />
        <app-loading v-if="isLoading" />
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { actionTypes } from '@/store/modules/chat'
import { getterTypes } from '@/store/modules/auth'
import AppErrors from '@/components/Errors'
import AppLoading from '@/components/Loading'
import AppLoginRequest from '@/components/LoginRequest'

export default {
    name: 'AppChats',
    computed: {
        ...mapState({
            errors: (state) => state.chat.errros,
            isLoading: (state) => state.chat.isLoading,
            _chats: (state) => state.chat.chats,
            currentUser: (state) => state.auth.currentUser,
        }),
        ...mapGetters({
            isAnonymous: getterTypes.isAnonymous,
        }),
        chats() {
            let result = []
            if (this._chats && this._chats[0]) {
                for (let chat of this._chats) {
                    let username
                    if (chat.usersUsernames[0] === this.currentUser.username) {
                        username = chat.usersUsernames[1]
                    } else {
                        username = chat.usersUsernames[0]
                    }
                    result.push({ _id: chat._id, username, lastMessage: chat.lastMessage })
                }
            }
            return result
        },
    },
    components: {
        AppErrors,
        AppLoading,
        AppLoginRequest,
    },
    mounted() {
        this.$store.dispatch(actionTypes.getChatList)
    },
}
</script>
