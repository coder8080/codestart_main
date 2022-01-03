<template>
    <div v-if="isAnonymous">
        <h2>Для доступа ко всем возможностям войдите на сайт</h2>
        <router-link :to="{ name: 'Login' }" class="btn btn-success">
            <i class="bi-door-open"></i>&nbsp;Войти
        </router-link>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getterTypes } from '@/store/modules/auth'

export default {
    name: 'AppLoginRequest',
    computed: {
        ...mapGetters({
            isAnonymous: getterTypes.isAnonymous,
        }),
    },
}
</script>
