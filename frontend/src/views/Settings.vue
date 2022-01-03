<template>
    <div class="container center pb-2">
        <form v-on:submit.prevent="onSubmit" v-if="isLoggedIn">
            <h2 class="text-center">Настройки профиля</h2>
            <router-link
                :to="{
                    name: 'UserProfile',
                    params: { username: currentUser.username },
                }"
                class="btn btn-outline-primary"
                ><i class="bi-file-person"></i>&nbsp;Перейти в
                профиль</router-link
            >
            <app-errors v-if="errors" :errors="errors" />
            <div class="mb-3 mt-3">
                <p class="h5">Ваш уровень: {{ currentUser.level }}</p>
                <router-link :to="{ name: 'Lessons' }" class="btn btn-success">
                    <i class="bi-arrow-up"></i>&nbsp;Повысить
                </router-link>
            </div>
            <div class="mb-3 mt-3">
                <label for="username-input"
                    ><i class="bi-person-circle"></i>&nbsp;Имя
                    пользователя</label
                >
                <input
                    type="text"
                    class="form-control"
                    id="username-input"
                    v-model="user.username"
                    autocomplete="off"
                    required
                />
            </div>
            <div class="mb-3">
                <label for="email-input"
                    ><i class="bi-envelope"></i>&nbsp;Электронная почта</label
                >
                <input
                    type="email"
                    class="form-control"
                    id="email-input"
                    v-model="user.email"
                    required
                />
            </div>
            <div class="mb-3">
                <label for="bio-input"
                    ><i class="bi-pencil-square"></i>&nbsp;Описание</label
                >
                <textarea
                    id="bio-input"
                    cols="30"
                    rows="10"
                    v-model="user.bio"
                    class="form-control"
                ></textarea>
            </div>
            <div class="mb-3">
                <input
                    class="form-check-input me-1"
                    type="checkbox"
                    role="switch"
                    id="darkThemeCheck"
                    v-model="user.darkTheme"
                />
                <label for="darkThemeCheck">Тёмная тема</label>
            </div>
            <div class="buttons-container">
                <button
                    type="submit"
                    class="btn btn-primary me-2"
                    :disabled="isSubmitting"
                >
                    <i class="bi-check"></i>&nbsp;Применить
                </button>
                <app-loading v-if="isSubmitting" />
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    v-on:click="logout"
                >
                    <i class="bi-box-arrow-in-left"></i>&nbsp;Выйти
                </button>
            </div>
        </form>
        <app-login-request />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AppErrors from '@/components/Errors'
import AppLoading from '@/components/Loading'
import AppLoginRequest from '@/components/LoginRequest'
import { actionTypes } from '@/store/modules/settings'
import { mutationTypes as authActionTypes } from '@/store/modules/auth'

export default {
    name: 'AppSettings',
    components: {
        AppErrors,
        AppLoading,
        AppLoginRequest,
    },
    computed: {
        ...mapState({
            isSubmitting: (state) => state.settings.isSubmitting,
            errors: (state) => state.settings.errors,
            isLoggedIn: (state) => state.auth.isLoggedIn,
            currentUser: (state) => state.auth.currentUser,
        }),
        user() {
            let darkTheme = false
            if (this.currentUser.theme === 'dark') {
                darkTheme = true
            }
            return {
                username: this.currentUser.username,
                email: this.currentUser.email,
                bio: this.currentUser.bio,
                darkTheme,
            }
        },
    },
    methods: {
        onSubmit() {
            let theme = 'light'
            if (this.user.darkTheme === true) {
                theme = 'dark'
            }
            this.$store.dispatch(actionTypes.updateSettings, {
                username: this.user.username,
                email: this.user.email,
                bio: this.user.bio,
                theme,
            })
        },
        logout() {
            this.$store.dispatch(authActionTypes.logout).then(() => {
                this.$store.state.auth.currentUser = { theme: 'light' }
                this.$router.push({ name: 'Home' })
            })
        },
    },
}
</script>
