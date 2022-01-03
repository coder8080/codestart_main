<template>
    <div class="container">
        <app-errors :errors="errors" v-if="errors" />
        <app-loading v-if="isLoading" />
        <template v-if="!isLoading && lessons && !errors && isLoggedIn">
            <h1 class="text-center">Список уроков</h1>
            <p class="h4">Ваш уровень: {{ currentUser.level }}/{{ lessonsCount }}</p>
            <ul class="list-group">
                <li
                    class="list-group-item"
                    :class="{
                        disabled: lesson.number > currentUser.level + 1,
                        active: lesson.number === currentUser.level + 1,
                    }"
                    v-for="lesson of lessons"
                    :key="lesson.number"
                >
                    <i
                        :class="{
                            'bi-award-fill': currentUser.level >= lesson.number,
                            'bi-award': currentUser.level < lesson.number,
                        }"
                    ></i>
                    <router-link
                        :to="{ name: 'Lesson', params: { number: lesson.number } }"
                        v-if="lesson.number <= currentUser.level + 1"
                        class="a-black"
                    >
                        {{ lesson.title }}
                    </router-link>
                    <template v-if="lesson.number > currentUser.level + 1">&nbsp;{{ lesson.title }} (закрыто)</template>
                </li>
            </ul>
        </template>
        <app-login-request />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AppErrors from '@/components/Errors'
import AppLoading from '@/components/Loading'
import AppLoginRequest from '@/components/LoginRequest'
import { actionTypes } from '@/store/modules/lessons'

export default {
    name: 'AppLessons',
    components: {
        AppErrors,
        AppLoading,
        AppLoginRequest,
    },
    computed: {
        ...mapState({
            isLoading: (state) => state.lessons.isLoading,
            lessons: (state) => state.lessons.data,
            errors: (state) => state.lessons.errors,
            currentUser: (state) => state.auth.currentUser,
            isLoggedIn: (state) => state.auth.isLoggedIn,
            lessonsCount: (state) => state.lessons.count,
        }),
    },
    mounted() {
        this.$store.dispatch(actionTypes.getAllLessons)
        this.$store.dispatch(actionTypes.countLessons)
    },
}
</script>
<style>
li.active * {
    color: white !important;
}
</style>
