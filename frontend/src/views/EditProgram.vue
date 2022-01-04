<template>
    <div class="center">
        <app-loading v-if="isLoading" />
        <template v-if="!isLoading && isAllowedToEdit">
            <form v-on:submit.prevent="onSubmit">
                <h1 class="text-center">Редактировать программу<br />"{{ program.title }}"</h1>
                <div class="mb-3">
                    <label for="title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="title" v-model="program.title" />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Описание</label>
                    <textarea id="description" class="form-control" rows="3" v-model="program.description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Язык программы</label>
                    <div class="form-check">
                        <input class="form-check-input" value="html" type="radio" id="html" v-model="program.lang" />
                        <label class="form-check-label" for="html">HTML / CSS / JS</label>
                    </div>
                    <div class="form-text">Работаю над поддержкой большего количества языков.</div>
                </div>
                <div class="mb-3">
                    <label for="code" class="form-label">Код</label>
                    <textarea class="form-control" id="code" rows="10" v-model="program.code" required></textarea>
                </div>
                <div class="mb-3">
                    <app-errors v-if="errors" :errors="errors" />
                </div>
                <div class="mb-3">
                    <div class="buttons-container">
                        <button class="btn btn-success" :disabled="isSubmitting">Сохранить</button>
                        <app-loading v-if="isSubmitting" class="ms-2" />
                        <router-link
                            :to="{
                                name: 'ViewProgram',
                                params: { id: program._id },
                            }"
                            class="btn btn-outline-primary ms-2"
                            >Назад</router-link
                        >
                    </div>
                </div>
            </form>
        </template>
        <div v-if="!isLoading && !isAllowedToEdit" class="container">
            <h2>Вы не можете редактировать данную программу, потому что она принадлежит не вам.</h2>
            <router-link :to="{ name: 'Home' }" class="btn btn-outline-primary"
                ><i class="bi-house"></i>&nbsp;На главную</router-link
            >
        </div>
    </div>
</template>
<script>
import AppErrors from '@/components/Errors'
import AppLoading from '@/components/Loading'
import { actionTypes } from '@/store/modules/program'
import { mapState } from 'vuex'

export default {
    name: 'AppEditProgram',
    components: {
        AppErrors,
        AppLoading,
    },
    computed: {
        ...mapState({
            errors: (state) => state.program.errors,
            currentUser: (state) => state.auth.currentUser,
            program: (state) => state.program.data,
            isLoading: (state) => state.program.isLoading,
            isSubmitting: (state) => state.program.isSubmitting,
        }),
        programId() {
            return this.$route.params.id
        },
        isAllowedToEdit() {
            if (this.program && this.currentUser) {
                return this.currentUser.username === this.program.ownerUsername
            } else {
                return false
            }
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.getProgram, this.programId)
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch(actionTypes.editProgram, {
                    id: this.programId,
                    form: {
                        title: this.program.title,
                        description: this.program.description,
                        code: this.program.code,
                        lang: this.program.lang,
                    },
                })
                .then(() => {
                    alert('Успешно!')
                })
                .catch(() => {
                    alert('Произошла ошибка, повторите попытку позже.')
                })
        },
    },
}
</script>
