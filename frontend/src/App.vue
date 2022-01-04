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
let style = document.createElement('style')

style.rel = 'stylesheet'
style.type = 'text/css'
// Да, это запещено, но вообще-то это потрясающий ход
style.innerHTML = `
    .a-black {
        color: whitesmoke !important;
    }

    body {
        background-color: #222222;
        color: whitesmoke;
    }

    li.list-group-item {
        background-color: #262a36 !important;
    }

    li.list-group-item.active {
        background-color: #0d6efd !important;
    }

    li.list-group-item a {
        color: whitesmoke;
    }

    li.list-group-item i {
        color: whitesmoke;
    }

    .card, .card-body {
        background-color: #262a36 !important;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: white;
    }

    input,
    textarea {
        background-color: #262a36 !important;
        color: whitesmoke !important;
        border: 1px solid black !important;
    }
    .modal-dialog, .modal-content {
        background-color: #262a36 !important;
    }

    .accordion-item,
    .accordion-button {
        background-color: #262a36 !important;
    }
    .accordion-button.collapsed {
        color: white !important;
    }
    .accordion-collapse {
        background-color: #0C2233;
    }
    .accordion-button.accordion-button.collapsed::after {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    }
    `

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
