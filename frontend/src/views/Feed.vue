<template>
    <div class="container">
        <h1 class="text-center">Ваша лента</h1>
        <template v-if="isLoggedIn && programs && programs[0]">
            <div class="row mb-2">
                <div class="col col-12 col-md-6 col-lg-4" v-for="program in programs" :key="program._id">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">"{{ program.title }}" by {{ program.ownerUsername }}</h5>
                            <p class="card-subtitle text-muted">
                                {{ program.lang }}
                            </p>
                            <div class="card-text">
                                {{ program.description }}
                            </div>
                            <div class="text-end">
                                <router-link
                                    :to="{ name: 'ViewProgram', params: { id: program._id } }"
                                    class="btn btn-outline-primary mt-1 text-end"
                                >
                                    Посмотреть
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p v-if="!programs[0]">Больше новостей нет.</p>
            <router-link
                class="btn btn-primary"
                :to="{ name: 'Feed', params: { pagination: pagination - 1 } }"
                v-if="pagination >= 1"
            >
                Назад
            </router-link>
            <router-link
                class="btn btn-outline-success"
                :to="{ name: 'Feed', params: { pagination: pagination + 1 } }"
                v-if="programs[0]"
            >
                Дальше
            </router-link>
        </template>

        <app-login-request v-if="isAnonymous" />
        <app-errors v-if="errors" :errors="errors" />
    </div>
</template>
<script>
import { actionTypes } from '@/store/modules/feed'
import { getterTypes } from '@/store/modules/auth'
import { mapState, mapGetters } from 'vuex'
import AppLoginRequest from '@/components/LoginRequest'
import AppErrors from '@/components/Errors'

export default {
    name: 'AppFeed',
    mounted() {
        this.$store.dispatch(actionTypes.getFeed, this.pagination)
    },
    computed: {
        ...mapState({
            programs: (state) => state.feed.data,
            isLoggedIn: (state) => state.auth.isLoggedIn,
            errors: (state) => state.feed.errors,
        }),
        ...mapGetters({
            isAnonymous: getterTypes.isAnonymous,
        }),
        pagination() {
            return Number(this.$route.params.pagination)
        },
    },
    components: {
        AppLoginRequest,
        AppErrors,
    },
    watch: {
        pagination() {
            this.$store.dispatch(actionTypes.getFeed, this.pagination)
        },
    },
}
</script>
