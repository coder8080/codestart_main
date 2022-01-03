<template>
    <div class="container-fluid">
        <app-loading v-if="isLoading" />
        <app-errors v-if="errors" :errors="errors" />
        <template v-if="profile">
            <h1 class="text-center mb-5">
                <i class="bi-file-person-fill"></i>&nbsp;Профиль пользователя
                {{ profile.user.username }}
            </h1>
            <div class="row">
                <div class="col col-12 col-sm-12 col-md-4 col-lg-4">
                    <h2 class="mb-3">
                        <i class="bi-info-circle"></i>&nbsp;Информация
                    </h2>
                    <p>
                        <i class="bi-person-circle"></i>&nbsp;Имя
                        пользователя:&nbsp;{{ profile.user.username }}
                    </p>
                    <p>
                        <i class="bi-envelope"></i>&nbsp;Электронная
                        почта:&nbsp;{{ profile.user.email }}
                    </p>
                    <p v-if="profile.user.bio">
                        <i class="bi-pencil-square"></i>&nbsp;Описание:&nbsp;{{
                            profile.user.bio
                        }}
                    </p>
                    <template v-if="isLoggedIn">
                        <router-link
                            class="btn btn-outline-primary"
                            :to="{ name: 'Settings' }"
                            ><i class="bi-gear"></i>&nbsp;Перейти в
                            настройки</router-link
                        >
                        <br />
                        <button
                            type="button"
                            class="btn btn-outline-danger mt-2"
                            v-on:click="logout"
                        >
                            <i class="bi-box-arrow-in-left"></i>&nbsp;Выйти
                        </button>
                    </template>
                </div>
                <div class="col col-12 col-md-8 col-lg-8 mt-3 mt-md-0">
                    <div class="row">
                        <div class="col col-12 col-sm-6">
                            <h2 class="mb-3">
                                <i class="bi-code-slash"></i>&nbsp;Программы
                            </h2>
                        </div>
                        <div
                            class="col col-12 col-sm-6 text-sm-end"
                            v-if="isLoggedIn"
                        >
                            <router-link
                                :to="{ name: 'CreateProgram' }"
                                class="btn btn-outline-success mt-2"
                                ><i class="bi-pencil"></i>&nbsp;Создать
                                программу</router-link
                            >
                        </div>
                    </div>
                    <p v-if="!programs[0]">У пользователя нет пограмм</p>
                    <ul class="list-group" v-if="programs">
                        <li
                            class="list-group-item"
                            v-for="program in programs"
                            :key="program.id"
                        >
                            <router-link
                                :to="{
                                    name: 'ViewProgram',
                                    params: { id: program._id },
                                }"
                            >
                                <div class="row">
                                    <div class="col">
                                        <i class="bi-hash"></i>&nbsp;{{
                                            program.title
                                        }}
                                        <p v-if="program.description">
                                            <i class="bi-sticky"></i>&nbsp;{{
                                                program.description
                                            }}
                                        </p>
                                    </div>
                                    <div class="col">
                                        <p class="text-end">
                                            <i class="bi-calendar"></i>&nbsp;{{
                                                program.created.slice(0, 10)
                                            }}
                                        </p>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { actionTypes } from '@/store/modules/profile'
import { actionTypes as authActionTypes } from '@/store/modules/auth'
import { mapState } from 'vuex'
import AppErrors from '@/components/Errors'
import AppLoading from '@/components/Loading'

export default {
    name: 'AppUserProfile',
    components: {
        AppErrors,
        AppLoading,
    },
    computed: {
        ...mapState({
            profile: (state) => state.profile.data,
            isLoading: (state) => state.profile.isLoading,
            errors: (state) => state.profile.errors,
            isLoggedIn: (state) => state.auth.isLoggedIn,
        }),
        username() {
            return this.$route.params.username
        },
        programs() {
            return this.profile.programs
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.getProfile, this.username)
    },
    methods: {
        logout() {
            this.$store.dispatch(authActionTypes.logout).then(() => {
                this.$store.state.auth.currentUser = { theme: 'light' }
                this.$router.push({ name: 'Home' })
            })
        },
    },
}
</script>
