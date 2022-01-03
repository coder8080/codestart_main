<template>
    <div class="center">
        <app-login-request v-if="isAnonymous" />
        <app-loading v-if="isLoading" />
        <template v-if="isLoggedIn">
            <form v-on:submit.prevent="onSubmit">
                <h1>Создание программы</h1>
                <p>
                    На сайте есть возможность поделиться своим кодом с другими
                    пользователями. На этой странице вы можете загрузить свою
                    программу.
                </p>
                <div class="mb-3">
                    <label for="title" class="form-label">Название</label>
                    <input
                        type="text"
                        class="form-control"
                        id="title"
                        v-model="title"
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Описание</label>
                    <textarea
                        id="description"
                        class="form-control"
                        rows="3"
                        v-model="description"
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Язык программы</label>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            value="html"
                            type="radio"
                            id="html"
                            v-model="lang"
                        />
                        <label class="form-check-label" for="html"
                            >HTML / CSS / JS</label
                        >
                    </div>
                    <div class="form-text">
                        Работаю над поддержкой большего количества языков.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="code" class="form-label">Код</label>
                    <textarea
                        class="form-control"
                        id="code"
                        rows="10"
                        v-model="code"
                        required
                    ></textarea>
                </div>
                <div class="mb-3">
                    <app-errors v-if="errors" :errors="errors" />
                </div>
                <div class="mb-3">
                    <div class="buttons-container">
                        <button
                            class="btn btn-outline-primary"
                            :disabled="isSubmitting"
                        >
                            Создать
                        </button>
                        <app-loading v-if="isSubmitting" class="ms-2" />
                    </div>
                </div>
            </form>
        </template>
    </div>
</template>
<script>
import AppErrors from '@/components/Errors'
import AppLoginRequest from '@/components/LoginRequest'
import AppLoading from '@/components/Loading'
import { mapState, mapGetters } from 'vuex'
import { getterTypes } from '@/store/modules/auth'
import { actionTypes } from '@/store/modules/program'

export default {
    name: 'AppCreateProgram',
    components: {
        AppErrors,
        AppLoginRequest,
        AppLoading,
    },
    computed: {
        ...mapState({
            errors: (state) => state.program.errors,
            isSubmitting: (state) => state.program.isSubmitting,
            isLoggedIn: (state) => state.auth.isLoggedIn,
            isLoading: (state) => state.auth.isLoading,
        }),
        ...mapGetters({
            isAnonymous: getterTypes.isAnonymous,
        }),
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch(actionTypes.createProgram, {
                    title: this.title,
                    description: this.description,
                    code: this.code,
                    lang: this.lang,
                })
                .then((id) => {
                    this.$router.push({ name: 'ViewProgram', params: { id } })
                })
        },
    },
    data() {
        return {
            title: '',
            description: '',
            code: '',
            lang: 'html',
        }
    },
}
</script>
