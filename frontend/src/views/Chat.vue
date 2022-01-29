<template>
    <div class="container">
        <template v-if="isLoggedIn && chat">
            <h1 class="text-center">Ваш чат с пользователем {{ username }}</h1>
            <div class="bg-dark bg-opacity-10 rounded p-3 mb-2">
                <div
                    :class="{ 'justify-content-end': message.senderUsername == currentUser.username }"
                    class="d-flex p-1"
                    v-for="message in chat.messages"
                    :key="message._id"
                >
                    <div class="rounded-pill p-1 bg-dark bg-opacity-25 p-2">
                        <p class="h6 m-0 ms-1">
                            {{ message.text }}
                        </p>
                        <div class="text-end">
                            <p class="text-muted m-0" style="font-size: 10px">
                                {{ message.time }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="text-center container mt-2 d-flex">
                    <form v-on:submit.prevent="onSubmit" class="d-flex" style="width: 100%; max-width: 100%">
                        <router-link
                            :to="{ name: 'Chats' }"
                            class="btn btn-outline-warning me-2 d-flex align-items-center"
                            ><i class="bi-arrow-left-square h1"></i
                        ></router-link>
                        <textarea rows="2" class="form-control" style="resize: none" v-model="text"></textarea>
                        <button type="submit" class="btn btn-outline-primary ms-2"><i class="bi-check h1"></i></button>
                    </form>
                </div>
            </div>
        </template>
        <app-login-request v-if="isAnonymous" />
        <app-loading v-if="isLoading" />
    </div>
</template>
<script>
import { actionTypes as chatActionTypes } from '@/store/modules/chat'
import { actionTypes as msgActionTypes } from '@/store/modules/msg'
import { getterTypes } from '@/store/modules/auth'
import AppLoginRequest from '@/components/LoginRequest'
import AppLoading from '@/components/Loading'
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'AppChat',
    components: {
        AppLoginRequest,
        AppLoading,
    },
    mounted() {
        this.$store.dispatch(chatActionTypes.getChat, this.username)
    },
    computed: {
        ...mapState({
            chat: (state) => state.chat.data,
            isLoggedIn: (state) => state.auth.isLoggedIn,
            isLoading: (state) => state.chat.isLoading,
            currentUser: (state) => state.auth.currentUser,
        }),
        ...mapGetters({
            isAnonymous: getterTypes.isAnonymous,
        }),
        username() {
            return this.$route.params.username
        },
    },
    methods: {
        onSubmit() {
            this.$store.dispatch(msgActionTypes.sendMsg, { text: this.text, receiver: this.username }).then(() => {
                this.text = ''
            })
        },
    },
    data() {
        return {
            text: '',
        }
    },
}
</script>
