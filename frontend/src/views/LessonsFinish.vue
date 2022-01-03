<template>
    <div class="container text-center">
        <app-login-request v-if="isAnonymous" />
        <app-loading v-if="isLoading" />
        <template v-if="showCongratulation">
            <h1>Поздравляю!</h1>
            <p class="h4">
                Вы успешно завершили весь мой курс! Желаю вам успехов в дальнейшем пути (и не только в it).
            </p>
            <p class="h3 mt-2">И помните - Школа 1518 рулит!</p>
        </template>
        <template v-if="showMessage">
            <p>Сначала <router-link :to="{ name: 'Lessons' }">повысьте</router-link> свой уровень до максимального.</p>
        </template>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { getterTypes } from '@/store/modules/auth'
import { actionTypes } from '@/store/modules/lessons'
import AppLoading from '@/components/Loading'
import AppLoginRequest from '@/components/LoginRequest'

export default {
    name: 'AppLessonsFinish',
    components: {
        AppLoading,
        AppLoginRequest,
    },
    computed: {
        ...mapState({
            currentUser: (state) => state.auth.currentUser,
            lessonsCount: (state) => state.lessons.count,
            isLoading: (state) => state.lessons.isLoading,
        }),
        ...mapGetters({
            isAnonymous: getterTypes.isAnonymous,
        }),
        showCongratulation() {
            if (this.currentUser && this.lessonsCount) {
                return this.currentUser.level >= this.lessonsCount
            } else {
                return false
            }
        },
        showMessage() {
            return this.currentUser && this.lessonsCount && !this.isLoading && !this.showCongratulation
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.countLessons)
    },
}
</script>
