<template>
    <div v-if="isLoggedIn">
        <h2>Вы уже зарегистрированы на сайте</h2>
        <router-link :to="{ name: 'Lessons' }" class="btn btn-success">К урокам</router-link>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'AppAlreadyLoggedIn',
    computed: {
        ...mapState({
            isLoggedIn: (state) => state.auth.isLoggedIn,
        }),
    },
}
</script>
