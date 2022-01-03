<template>
    <div class="container">
        <template v-if="isLoggedIn && sublesson && opened">
            <app-loading v-if="isLoading" />
            <app-errors v-if="errors" :errors="errors" />
            <div class="row" v-if="!isLoading && isLoggedIn && sublesson">
                <div class="col-lg-8 col-md-12 col-sm-12 mb-3 video-container">
                    <video controls :src="videoPath"></video>
                    <h1><i class="bi-film"></i>&nbsp;{{ sublesson.title }}</h1>
                    <h4>
                        <router-link :to="{ name: 'Lesson', params: { number: sublesson.parent } }" class="a-black">
                            <i class="bi-caret-left-fill"></i>&nbsp;Назад к уроку
                        </router-link>
                    </h4>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                    <p class="h5">
                        {{ sublesson.description }}
                    </p>
                </div>
            </div>
        </template>
        <app-login-request v-if="isAnonymous" />
        <app-lesson-closed />
    </div>
</template>
<script>
import { actionTypes } from '@/store/modules/subLesson'
import { getterTypes } from '@/store/modules/auth'
import { mapState, mapGetters } from 'vuex'
import AppLoginRequest from '@/components/LoginRequest'
import AppErrors from '@/components/Errors'
import AppLoading from '@/components/Loading'
import AppLessonClosed from '@/components/LessonClosed'

export default {
    name: 'AppSubLesson',
    components: {
        AppLoginRequest,
        AppErrors,
        AppLoading,
        AppLessonClosed,
    },
    computed: {
        ...mapState({
            sublesson: (state) => state.subLesson.data,
            isLoading: (state) => state.subLesson.isLoading,
            isLoggedIn: (state) => state.auth.isLoggedIn,
            errors: (state) => state.subLesson.errors,
            currentUser: (state) => state.auth.currentUser,
        }),
        ...mapGetters({
            isAnonymous: getterTypes.isAnonymous,
        }),
        id() {
            return this.$route.params.slug
        },
        videoPath() {
            if (this.sublesson) {
                return `http://localhost:8080/lessons/${this.sublesson.video}`
            } else {
                return ''
            }
        },
        opened() {
            if (this.sublesson) {
                return this.currentUser.level + 1 >= this.sublesson.parent
            } else {
                return false
            }
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.getSubLesson, this.id)
    },
}
</script>
