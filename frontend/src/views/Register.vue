<template>
    <div class="center">
        <form v-on:submit.prevent="onSubmit" v-if="isAnonymous" class="ps-3 pe-3">
            <h2 class="text-center">Зарегистрируйтесь и начните программировать уже сейчас!</h2>
            <div class="text-center">
                <router-link :to="{ name: 'Login' }" class="link-primary">Уже есть аккаунт?</router-link>
            </div>
            <app-errors v-if="errors" :errors="errors" />
            <div class="mb-3 mt-3">
                <label for="username-input"><i class="bi-person-circle"></i>&nbsp;Имя пользователя</label>
                <input
                    type="text"
                    class="form-control"
                    id="username-input"
                    v-model="username"
                    autocomplete="off"
                    required
                />
            </div>
            <div class="mb-3">
                <label for="email-input"><i class="bi-envelope"></i>&nbsp;Электронная почта</label>
                <input type="email" class="form-control" id="email-input" v-model="email" required />
            </div>
            <div class="mb-3">
                <label for="password-input"><i class="bi-key"></i>&nbsp;Пароль</label>
                <input type="password" class="form-control" id="password-input" v-model="password" required />
            </div>
            <div class="mb-3">
                <label for="repeat-password-input"><i class="bi-key-fill"></i>&nbsp;Повторите пароль</label>
                <input
                    type="password"
                    class="form-control"
                    id="repeat-password-input"
                    v-model="repeatPassword"
                    required
                />
            </div>
            <div class="buttons-container">
                <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                    <i class="bi-box-arrow-in-right"></i>&nbsp;Зарегистрироваться
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
    name: 'AppRegister',
    components: {
        AppErrors,
        AppLoading,
        AppAlreadyLoggedIn,
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
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
                .dispatch(actionTypes.register, {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    repeatPassword: this.repeatPassword,
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
