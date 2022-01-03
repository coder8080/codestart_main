<template>
    <div class="container-fluid">
        <link
            v-if="isDarkTheme"
            rel="stylesheet"
            href="./themes/sunburst.css"
        />
        <link v-if="!isDarkTheme" rel="stylesheet" href="./themes/github.css" />
        <app-errors v-if="errors" :errors="errors" />
        <app-loading v-if="isLoading" />
        <template v-if="program">
            <h1 class="text-center mb-3">
                <i class="bi-hash"></i>&nbsp;{{ program.title }}
            </h1>
            <div class="row">
                <div class="col-12 col-md-7 col-lg-7">
                    <h2><i class="bi-code-square"></i>&nbsp;Код</h2>
                    <pre><code :data-language="program.lang">{{ program.code }}</code></pre>
                    <div class="buttons-container" v-if="isMine">
                        <router-link
                            :to="{
                                name: 'EditProgram',
                                params: { id: program._id },
                            }"
                            class="btn btn-outline-primary"
                            >Редактировать</router-link
                        >
                        <button
                            v-on:click="onDelete"
                            class="btn btn-outline-danger ms-2"
                            :disabled="isDeleting"
                        >
                            Удалить
                        </button>
                    </div>
                    <router-link
                        :to="{
                            name: 'UserProfile',
                            params: { username: program.ownerUsername },
                        }"
                        class="btn btn-outline-success mt-2"
                        >Профиль автора</router-link
                    >
                </div>
                <div class="col-12 col-md-5 col-lg-5 mt-3 mt-md-0">
                    <h2><i class="bi-display"></i>&nbsp;Результат</h2>
                    <iframe class="iframe" :srcdoc="program.code"></iframe>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { actionTypes } from '@/store/modules/program'
import { mapState } from 'vuex'
import AppErrors from '@/components/Errors'
import AppLoading from '@/components/Loading'

export default {
    name: 'AppViewProgram',
    components: {
        AppErrors,
        AppLoading,
    },
    computed: {
        ...mapState({
            program: (state) => state.program.data,
            errors: (state) => state.program.errors,
            isLoading: (state) => state.program.isLoading,
            currentUser: (state) => state.auth.currentUser,
            isDeleting: (state) => state.program.isDeleting,
        }),
        id() {
            return this.$route.params.id
        },
        isDarkTheme() {
            if (this.currentUser) {
                return this.currentUser.theme == 'dark'
            } else {
                return false
            }
        },
        isMine() {
            if (this.currentUser) {
                return this.currentUser.username == this.program.ownerUsername
            } else {
                return false
            }
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.getProgram, this.id)
        let script = document.createElement('script')
        script.setAttribute('src', 'http://localhost:8080/rainbow-init.js')
        document.body.append(script)
    },
    methods: {
        onDelete() {
            if (confirm('Вы уверены, что хотите удалить программу?')) {
                this.$store
                    .dispatch(actionTypes.deleteProgram, this.program._id)
                    .then(() => {
                        this.$router.push({
                            name: 'UserProfile',
                            params: { username: this.currentUser.username },
                        })
                    })
            }
        },
    },
}
</script>
<style>
.iframe {
    border-radius: 5px;
    width: 100%;
    height: 400px;
    border: 2px solid black;
    background-color: whitesmoke;
}
</style>
