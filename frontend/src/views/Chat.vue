<template>
    <div class="container" id="container">
        <template v-if="isLoggedIn && chat">
            <div class="bg-dark bg-opacity-10 rounded p-3 mb-2" id="chat">
                <nav class="navbar navbar-expand-lg navbar-light bg-light transparent-navbar">
                    <div class="container">
                        <router-link :to="{ name: 'Home' }" class="navbar-brand">Code&lt;/&gt;start</router-link>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarContent"
                            aria-controls="navbarContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
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
                <div class="spacer"></div>
            </div>
            <div class="text-center mt-2 d-flex form-container pe-3 ps-3 pe-sm-5 ps-sm-4 bg-dark">
                <form v-on:submit.prevent="onSubmit" class="d-flex p-0 p-2" style="width: 100%; max-width: 100%">
                    <router-link :to="{ name: 'Chats' }" class="btn btn-outline-warning me-2 d-flex align-items-center"
                        ><i class="bi-arrow-left-square h1"></i
                    ></router-link>
                    <textarea class="form-control" style="resize: none" v-model="text"></textarea>
                    <button type="submit" class="btn btn-outline-primary ms-2"><i class="bi-check h1"></i></button>
                </form>
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
    watch: {
        isLoggedIn() {
            setTimeout(() => {
                this.scroll()
            }, 100)
        },
    },
    methods: {
        onSubmit() {
            this.$store.dispatch(msgActionTypes.sendMsg, { text: this.text, receiver: this.username }).then(() => {
                this.text = ''
            })
        },
        scroll() {
            let chat = document.getElementById('chat')
            chat.scrollTop = chat.scrollHeight
        },
    },
    data() {
        return {
            text: '',
        }
    },
}
</script>
<style>
.form-container {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 0 auto;
    width: 100vw;
    height: 5em;
}

#chat {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    height: 100vh;
    overflow: auto;
    margin-top: 5em;
}
.spacer {
    width: 100%;
    height: 5em;
}
</style>
