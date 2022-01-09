<template>
    <div id="app">
        <app-top-bar />
        <router-view />
    </div>
</template>
<script>
import { actionTypes } from '@/store/modules/auth'
import AppTopBar from '@/components/TopBar'
import getTitle from '@/helpers/title'
import { mapState } from 'vuex'
let style = document.createElement('link')

style.setAttribute('rel', 'stylesheet')
style.setAttribute('href', '/dark.css')
style.setAttribute('type', 'text/css')

export default {
    name: 'App',
    components: {
        AppTopBar,
    },
    mounted() {
        this.$store.dispatch(actionTypes.validateToken)
        this.updateTitle()
    },
    methods: {
        updateTitle() {
            document.title = getTitle(this.$route)
        },
    },
    computed: {
        ...mapState({
            currentUser: (state) => state.auth.currentUser,
        }),
    },
    watch: {
        $route() {
            this.updateTitle()
        },
        currentUser() {
            if (this.currentUser) {
                // Если зарегистрированный пользователь заходит на сайт, то сразу показываем ему страницу со списком уроков
                if (this.currentUser.username && this.$route.name === 'Home') {
                    this.$router.push({ name: 'Lessons' })
                }
                if (this.currentUser.theme === 'dark') {
                    document.head.appendChild(style)
                } else {
                    if (document.head.contains(style)) {
                        document.head.removeChild(style)
                    }
                }
            }
        },
    },
}
</script>
<style>
.center {
    display: flex;
    justify-content: center;
}
a {
    text-decoration: none;
}
form {
    max-width: 500px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
}
.modal-container {
    position: fixed;
    transition: 0.3s;
    transform: translate(-50%, -100%);
    top: 0;
    left: 50%;
    z-index: 1101;
}
#dimming {
    background-color: black;
    opacity: 0.7;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1100;
    display: none;
}
</style>
