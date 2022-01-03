<template>
    <div class="center">
        <form v-on:submit.prevent="onSubmit">
            <h2 class="text-center">Сброс пароля</h2>
            <div class="text-center">
                <router-link :to="{ name: 'Login' }" class="link-primary">Я вспомнил!</router-link>
            </div>
            <app-errors v-if="errors" :errors="errors" />
            <div class="mb-3 mt-3">
                <label for="email-input"><i class="bi-envelope"></i>&nbsp;Электронная почта</label>
                <input type="email" class="form-control" id="email-input" v-model="email" required />
            </div>
            <p>Мы отправим вам на почту письмо с ссылкой на страницу сброса пароля.</p>
            <div class="buttons-container">
                <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                    <i class="bi-box-arrow-in-right"></i>&nbsp;Отправить
                </button>
                <app-loading v-if="isSubmitting" />
            </div>
            <p v-if="isSubmitted" class="mt-2">
                Письмо было отправлено. Если вы не можете его найти, попробуйте открыть папку спам. Эту страницу можно
                закрыть.
            </p>
        </form>
    </div>
</template>
<script>
import { actionTypes } from '@/store/modules/passwordReset'
import { mapState } from 'vuex'
import AppLoading from '@/components/Loading'
import AppErrors from '@/components/Errors'

export default {
    name: 'AppSubmitEmail',
    components: {
        AppLoading,
        AppErrors,
    },
    computed: {
        ...mapState({
            errors: (state) => state.passwordReset.errors,
            isSubmitting: (state) => state.passwordReset.isSubmitting,
        }),
    },
    methods: {
        onSubmit() {
            this.$store.dispatch(actionTypes.submitEmail, this.email).then(() => {
                this.isSubmitted = true
            })
        },
    },
    data() {
        return {
            email: '',
            isSubmitted: false,
        }
    },
}
</script>
