<template>
    <div class="center">
        <form v-on:submit.prevent="onSubmit" class="ps-3 pe-3">
            <h2 class="text-center">Сброс пароля</h2>
            <div class="text-center">
                <router-link :to="{ name: 'Login' }" class="link-primary">Я вспомнил!</router-link>
            </div>
            <app-errors v-if="errors" :errors="errors" />
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
                    v-model="password_repeat"
                    required
                />
            </div>
            <div class="buttons-container">
                <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                    <i class="bi-box-arrow-in-right"></i>&nbsp;Сбросить
                </button>
                <app-loading v-if="isSubmitting" />
            </div>
            <p class="mt-2" v-if="isResetted">
                Пароль успешно сброшен. <router-link :to="{ name: 'Login' }">Войти</router-link>
            </p>
        </form>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AppLoading from '@/components/Loading'
import AppErrors from '@/components/Errors'
import { actionTypes } from '@/store/modules/passwordReset'

export default {
    name: 'AppResetPassword',
    components: {
        AppLoading,
        AppErrors,
    },
    data() {
        return {
            password: '',
            password_repeat: '',
            isResetted: false,
        }
    },
    computed: {
        ...mapState({
            isSubmitting: (state) => state.passwordReset.isSubmitting,
            errors: (state) => state.passwordReset.errors,
        }),
        key() {
            return this.$route.params.key
        },
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch(actionTypes.resetPassword, {
                    key: this.key,
                    password: this.password,
                    password_repeat: this.password_repeat,
                })
                .then(() => {
                    this.isResetted = true
                })
        },
    },
}
</script>
