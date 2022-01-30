<template>
    <div>
        <nav
            class="navbar navbar-expand-lg fixed-top"
            :class="{
                'navbar-light': !darkTheme,
                'bg-light': !darkTheme,
                'navbar-dark': darkTheme,
                'bg-dark': darkTheme,
            }"
            id="navbar"
        >
            <div class="container">
                <router-link :to="{ name: 'Home' }" class="navbar-brand">Code&lt;/&gt;start</router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'Home' }" active-class="active" exact>
                                <i class="bi-house"></i>
                                Главная
                            </router-link>
                        </li>
                        <template v-if="isAnonymous">
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'Login' }" active-class="active">
                                    <i class="bi-door-open"></i>
                                    Войти
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'Register' }" active-class="active">
                                    <i class="bi-door-open-fill"></i>
                                    Зарегистрироваться
                                </router-link>
                            </li>
                        </template>
                        <template v-if="isLoggedIn">
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'Lessons' }" active-class="active">
                                    <i class="bi-film"></i>
                                    Уроки
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    class="nav-link"
                                    :to="{
                                        name: 'UserProfile',
                                        params: {
                                            username: currentUser.username,
                                        },
                                    }"
                                    active-class="active"
                                    ><i class="bi-file-person"></i>&nbsp;Профиль</router-link
                                >
                            </li>
                            <li class="nav-item">
                                <router-link
                                    class="nav-link"
                                    :to="{ name: 'Feed', params: { pagination: 0 } }"
                                    active-class="active"
                                    ><i class="bi-star"></i>&nbsp;Лента</router-link
                                >
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'Chats' }" class="nav-link" active-class="active"
                                    ><i class="bi-chat"></i>&nbsp;Чаты</router-link
                                >
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'Settings' }" active-class="active">
                                    <i class="bi-gear"></i>
                                    Настройки
                                </router-link>
                            </li>
                        </template>
                    </ul>
                    <!--                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>-->
                    <div class="d-flex" v-if="isLoggedIn">
                        <router-link :to="{ name: 'Settings' }" class="a-black">
                            {{ currentUser.username }}
                            <i class="bi-gear ms-2"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
        <nav class="navbar navbar-expand-lg navbar-light bg-light transparent-navbar">
            <div class="container">
                <router-link :to="{ name: 'Home' }" class="navbar-brand">Code&lt;/&gt;start</router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    </div>
</template>
<script>
import { getterTypes } from '@/store/modules/auth'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'AppTopBar',
    computed: {
        ...mapGetters({
            isAnonymous: getterTypes.isAnonymous,
        }),
        ...mapState({
            isLoggedIn: (state) => state.auth.isLoggedIn,
            currentUser: (state) => state.auth.currentUser,
        }),
        darkTheme() {
            return this.currentUser && this.currentUser.theme === 'dark'
        },
    },
}
</script>
<style>
.transparent-navbar {
    opacity: 0;
}
</style>
