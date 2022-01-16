<template>
    <div class="center">
        <form v-on:submit.prevent="onSubmit" v-if="isAnonymous">
            <h2 class="text-center">Для доступа к урокам войдите на сайт:</h2>
            <div class="text-center">
                <router-link :to="{ name: 'Register' }" class="link-primary">Нужен аккаунт?</router-link>
            </div>
            <app-errors v-if="errors" :errors="errors" />
            <div class="mb-3 mt-3">
                <label for="email-input"><i class="bi-envelope"></i>&nbsp;Электронная почта</label>
                <input type="email" class="form-control" id="email-input" v-model="email" autocomplete="off" required />
            </div>
            <div class="mb-3">
                <label for="password-input"><i class="bi-key"></i>&nbsp;Пароль</label>
                <input type="password" class="form-control" id="password-input" v-model="password" required />
                <router-link :to="{ name: 'SubmitEmail' }">Забыли пароль?</router-link>
            </div>
            <div class="buttons-container">
                <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                    <i class="bi-box-arrow-in-right"></i>&nbsp;Войти
                </button>
                <app-loading v-if="isSubmitting" />
            </div>
        </form>
        <app-already-logged-in />
    </div>
</template>
<script>
import AppErrors from '@/components/Errors'
import AppLoading from '@/components/Loading'
import AppAlreadyLoggedIn from '@/components/AlreadyLoggedIn'
import { actionTypes, mutationTypes } from '@/store/modules/auth'
import { getterTypes } from '@/store/modules/auth'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    name: 'AppLogin',
    components: {
        AppErrors,
        AppLoading,
        AppAlreadyLoggedIn,
    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapState({
            isSubmitting: (state) => state.auth.isSubmitting,
            errors: (state) => state.auth.errors,
            isLoggedIn: (state) => state.auth.isLoggedIn,
        }),
        ...mapGetters({
            isAnonymous: getterTypes.isAnonymous,
        }),
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch(actionTypes.login, {
                    email: this.email,
                    password: this.password,
                })
                .then(() => {
                    this.$router.push({ name: 'Lessons' })
                })
        },
    },
    mounted() {
        this.$store.commit(mutationTypes.resetErrors)
    },
}
</script>
