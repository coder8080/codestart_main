<template>
    <div class="container">
        <template v-if="isLoggedIn && opened">
            <app-loading v-if="isLoading" />
            <app-errors v-if="errors" :errors="errors" />
            <div class="row" v-if="!isLoading && lesson">
                <div class="col-12 col-lg-7 mb-3 video-container">
                    <video controls :src="videoPath" type="video/mp4" v-on:ended="onEnd"></video>
                    <h1><i class="bi-film"></i>&nbsp;{{ lesson.title }}</h1>
                    <h4 class="mb-4 md-md-0">
                        <router-link :to="{ name: 'Lessons' }" class="a-black">
                            <i class="bi-caret-left-fill"></i>&nbsp;Назад к урокам
                        </router-link>
                    </h4>
                    <h2 class="mt-2"><i class="bi-plus-circle"></i>&nbsp;Дополнения к уроку:</h2>
                    <div class="row mb-3" v-if="lesson">
                        <div class="col col-12 col-md-6" v-for="sublesson of lesson.subLessons" :key="sublesson.id">
                            <app-sub-lesson :sublesson="sublesson" />
                        </div>
                    </div>
                    <p class="h4 text-muted" v-if="lesson && !lesson.subLessons[0]">Дополнения отсутствуют.</p>
                </div>
                <div class="col-12 col-lg-5">
                    <p class="h5">
                        {{ lesson.description }}
                    </p>
                    <div class="row mt-3 mb-2">
                        <div class="col col-12 col-sm-8 col-lg-12">
                            <p class="h3"><i class="bi-question-circle"></i>&nbsp;Вопросы к уроку</p>
                        </div>
                        <div class="col col-12 col-sm-4 col-lg-12 text-sm-end text-lg-start">
                            <button type="button" class="btn btn-outline-primary" v-on:click="openCreateQuestion">
                                <i class="bi-question-square"></i>&nbsp;Задать вопрос
                            </button>
                        </div>
                    </div>
                    <p v-if="!lesson.questions || lesson.questions == 0">Вопросов пока нет</p>
                    <div class="accordion" id="questions" v-if="lesson.questions">
                        <div class="accordion-item" v-for="question of lesson.questions" :key="question._id">
                            <h2 class="accordion-header" id="headingOne">
                                <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    :data-bs-target="'#a' + question._id"
                                    aria-expanded="true"
                                    :aria-controls="'a' + question._id"
                                >
                                    <h4><i class="bi-patch-question"></i>&nbsp;{{ question.title }}</h4>
                                </button>
                            </h2>
                            <div
                                :id="'a' + question._id"
                                class="accordion-collapse collapse"
                                aria-labelledby="headingOne"
                            >
                                <div class="accordion-body">
                                    <p><i class="bi-pencil-square"></i>&nbsp;{{ question.description }}</p>
                                    <div class="text-center">
                                        <button
                                            class="btn btn-outline-info"
                                            v-on:click="openCreateSolution(question._id)"
                                        >
                                            <i class="bi-plus-circle"></i>&nbsp;Ответить
                                        </button>
                                        <button
                                            class="btn btn-outline-warning ms-2"
                                            v-on:click="openUpdateQuestion(question._id)"
                                            v-if="currentUser.username == question.ownerUsername"
                                        >
                                            <i class="bi-pen"></i>&nbsp;Изменить
                                        </button>
                                        <button
                                            class="btn btn-outline-danger ms-2"
                                            v-on:click="onDeleteQuestion(question._id)"
                                            v-if="currentUser.username == question.ownerUsername"
                                        >
                                            <i class="bi-trash"></i>&nbsp;Удалить
                                        </button>
                                    </div>
                                </div>
                                <div class="container-fluid pb-2">
                                    <h5><i class="bi-lightbulb"></i>&nbsp;Решения</h5>
                                    <div v-if="!question.solutions || question.solutions == 0">
                                        <hr />
                                        <p>Решений пока нет</p>
                                    </div>
                                    <div v-if="question.solutions && question.solutions[0]">
                                        <div v-for="solution of question.solutions" :key="solution._id" class="mb-3">
                                            <p>
                                                <router-link
                                                    :to="{
                                                        name: 'UserProfile',
                                                        params: { username: solution.ownerUsername },
                                                    }"
                                                    class="a-black"
                                                    ><i class="bi-person-circle"></i>&nbsp;{{
                                                        solution.ownerUsername
                                                    }}</router-link
                                                >:
                                                {{ solution.text }}
                                            </p>
                                            <i class="text-success bi-check-lg me-2" v-if="solution.isCorrect"></i>
                                            <button
                                                v-if="currentUser.username == solution.ownerUsername"
                                                class="btn btn-outline-warning"
                                                v-on:click="openUpdateSolution(solution._id)"
                                            >
                                                <i class="bi-pen"></i>&nbsp;Изменить
                                            </button>
                                            <button
                                                v-if="currentUser.username == solution.ownerUsername"
                                                class="btn btn-outline-danger ms-2"
                                                v-on:click="onDeleteSolution(solution._id)"
                                            >
                                                <i class="bi-trash"></i>&nbsp;Удалить
                                            </button>
                                            <button
                                                class="btn btn-outline-info ms-2"
                                                v-if="
                                                    currentUser.username == question.ownerUsername &&
                                                    !solution.isCorrect
                                                "
                                                v-on:click="onMarkAsCorrect(solution._id)"
                                            >
                                                <i class="bi-check-circle"></i>&nbsp;Помогло
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <app-login-request />
        <div class="modal-container" tabindex="-1" id="lessonEnd">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Урок завершён</h5>
                    </div>
                    <div class="modal-body">
                        <p id="modal-text">
                            Поздравляю, вы прошли данный урок и следующий уже доступен! Вы можете остаться на этой
                            странице и ознакомиться с дополнениями или перейти к следующему уроку.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeLessonEnd">Остаться</button>
                        <router-link
                            :to="{
                                name: 'Lesson',
                                params: { number: lesson.number + 1 },
                            }"
                            class="btn btn-primary"
                            v-if="lesson"
                        >
                            К уроку
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-container" tabindex="-1" id="createQuestion">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Задать вопрос</h5>
                    </div>
                    <form v-on:submit.prevent="onCreateQuestion">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="questionTitle" class="form-label"
                                    ><i class="bi-pencil-square"></i>&nbsp;Название вопроса</label
                                >
                                <input
                                    type="text"
                                    id="questionTitle"
                                    class="form-control"
                                    v-model="question.title"
                                    autocomplete="off"
                                    required
                                />
                                <div class="form-text">Кратко сформулируйте суть вопроса</div>
                            </div>
                            <div>
                                <label for="questionDescription" class="form-label"
                                    ><i class="bi-card-text"></i>&nbsp;Текст вопроса</label
                                >
                                <textarea
                                    id="questionDescription"
                                    cols="30"
                                    rows="5"
                                    class="form-control"
                                    v-model="question.description"
                                    required
                                ></textarea>
                                <div class="form-text">Поясните ваш вопрос</div>
                            </div>
                            <app-errors v-if="questionErrors" :errors="questionErrors" />
                        </div>
                        <app-errors v-if="questionErrors" :errors="questionErrors" />
                        <div class="modal-footer">
                            <button class="btn btn-success" type="submit"><i class="bi-check"></i>&nbsp;Готово</button>
                            <button type="button" class="btn btn-secondary" @click="closeCreateQuestion">
                                <i class="bi-x-circle"></i>&nbsp;Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal-container" tabindex="-1" id="createSolution">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Ответить на вопрос</h5>
                    </div>
                    <form v-on:submit.prevent="onCreateSolution">
                        <div class="modal-body">
                            <label for="solution" class="form-label"><i class="bi-card-text"></i>&nbsp;Ваш ответ</label>
                            <textarea
                                id="solution"
                                cols="30"
                                class="form-control"
                                v-model="solution"
                                required
                            ></textarea>
                            <div class="form-text">Понятно сформулируйте ваш ответ</div>
                        </div>
                        <app-errors v-if="solutionErrors" :errors="solutionErrors" />
                        <div class="modal-footer">
                            <button class="btn btn-success" type="submit"><i class="bi-check"></i>&nbsp;Готово</button>
                            <button type="button" class="btn btn-secondary" v-on:click="closeCreateSolution">
                                <i class="bi-x-circle"></i>&nbsp;Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="dimming"></div>
        <app-lesson-closed v-if="!isLoading && isLoggedIn && !opened" />
    </div>
</template>
<script>
import { actionTypes } from '@/store/modules/lesson'
import { actionTypes as questionActionTypes } from '@/store/modules/question'
import { actionTypes as solutionActionTypes } from '@/store/modules/solution'
import { mapState } from 'vuex'
import AppLoading from '@/components/Loading'
import AppLoginRequest from '@/components/LoginRequest'
import AppErrors from '@/components/Errors'
import AppSubLesson from '@/components/SubLessonCard'
import AppLessonClosed from '@/components/LessonClosed'

export default {
    name: 'AppLesson',
    components: {
        AppLoading,
        AppLoginRequest,
        AppErrors,
        AppSubLesson,
        AppLessonClosed,
    },
    data() {
        return {
            question: {
                title: '',
                description: '',
            },
            solution: '',
            openedQuestion: '',
            isUpdatingQuestion: false,
            isUpdatingSolution: false,
            updatingQuestionId: null,
            updatingSolutionId: null,
        }
    },
    computed: {
        ...mapState({
            isLoading: (state) => state.lesson.isLoading,
            lesson: (state) => state.lesson.data,
            errors: (state) => state.lesson.errors,
            questionErrors: (state) => state.question.errors,
            solutionErrors: (state) => state.solution.errors,
            isLoggedIn: (state) => state.auth.isLoggedIn,
            currentUser: (state) => state.auth.currentUser,
        }),
        videoPath() {
            return 'http://localhost:8080/lessons/' + this.lesson.video
        },
        number() {
            return this.$route.params.number
        },
        opened() {
            return this.currentUser.level + 1 >= this.number
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.getLesson, this.number)
        this.closeLessonEnd()
    },
    watch: {
        number() {
            this.$store.dispatch(actionTypes.getLesson, this.number)
            this.closeLessonEnd()
        },
    },
    methods: {
        onEnd() {
            if (this.currentUser.level < this.lesson.number) {
                this.$store.dispatch(actionTypes.updateUserLevel).then((haveFinished) => {
                    if (haveFinished) {
                        setTimeout(() => {
                            this.$router.push({ name: 'LessonsFinish' })
                        }, 1000)
                    } else {
                        setTimeout(() => {
                            this.openLessonEnd()
                        }, 1000)
                    }
                })
            }
        },
        onCreateQuestion() {
            if (!this.isUpdatingQuestion) {
                this.$store
                    .dispatch(questionActionTypes.createQuestion, {
                        lesson: this.lesson.number,
                        title: this.question.title,
                        description: this.question.description,
                    })
                    .then(() => {
                        this.closeCreateQuestion()
                        this.question.title = ''
                        this.question.description = ''
                    })
            } else {
                this.$store
                    .dispatch(questionActionTypes.updateQuestion, {
                        id: this.updatingId,
                        title: this.question.title,
                        description: this.question.description,
                    })
                    .then(() => {
                        this.closeCreateQuestion()
                        this.question.title = ''
                        this.question.description = ''
                        this.isUpdatingQuestion = false
                        this.updatingQuestionId = null
                    })
            }
        },
        onCreateSolution() {
            if (!this.isUpdatingSolution) {
                this.$store
                    .dispatch(solutionActionTypes.createSolution, {
                        question: this.openedQuestion,
                        text: this.solution,
                    })
                    .then(() => {
                        this.closeCreateSolution()
                        this.solution = ''
                    })
            } else {
                this.$store
                    .dispatch(solutionActionTypes.updateSolution, {
                        id: this.updatingSolutionId,
                        text: this.solution,
                    })
                    .then(() => {
                        this.closeCreateSolution()
                        this.solution = ''
                        this.isUpdatingSolution = false
                        this.updatingSolutionId = null
                    })
            }
        },
        onMarkAsCorrect(id) {
            this.$store.dispatch(solutionActionTypes.markAsCorrect, id)
        },

        openLessonEnd() {
            let modal = document.getElementById('lessonEnd')
            modal.style.transform = 'translate(-50%, 0)'
            let dimming = document.getElementById('dimming')
            dimming.style.display = 'block'
        },
        openCreateQuestion() {
            let modal = document.getElementById('createQuestion')
            modal.style.transform = 'translate(-50%, 0)'
            let dimming = document.getElementById('dimming')
            dimming.style.display = 'block'
        },
        openCreateSolution(id) {
            let modal = document.getElementById('createSolution')
            modal.style.transform = 'translate(-50%, 0)'
            let dimming = document.getElementById('dimming')
            dimming.style.display = 'block'
            this.openedQuestion = id
        },
        openUpdateQuestion(id) {
            let modal = document.getElementById('createQuestion')
            modal.style.transform = 'translate(-50%, 0)'
            let dimming = document.getElementById('dimming')
            dimming.style.display = 'block'
            for (let i = 0; i < this.lesson.questions.length; i++) {
                if (this.lesson.questions[i]._id == id) {
                    this.question.title = this.lesson.questions[i].title
                    this.question.description = this.lesson.questions[i].description
                }
            }
            this.isUpdatingQuestion = true
            this.updatingId = id
        },
        openUpdateSolution(id) {
            let modal = document.getElementById('createSolution')
            modal.style.transform = 'translate(-50%, 0)'
            let dimming = document.getElementById('dimming')
            dimming.style.display = 'block'
            for (let i = 0; i < this.lesson.questions.length; i++) {
                for (let j = 0; j < this.lesson.questions[i].solutions.length; j++) {
                    if (this.lesson.questions[i].solutions[j]._id == id) {
                        this.solution = this.lesson.questions[i].solutions[j].text
                    }
                }
            }
            this.isUpdatingSolution = true
            this.updatingSolutionId = id
        },

        closeLessonEnd() {
            let modal = document.getElementById('lessonEnd')
            modal.style.transform = 'translate(-50%, -100%)'
            let dimming = document.getElementById('dimming')
            dimming.style.display = 'none'
        },
        closeCreateQuestion() {
            let modal = document.getElementById('createQuestion')
            modal.style.transform = 'translate(-50%, -100%)'
            let dimming = document.getElementById('dimming')
            dimming.style.display = 'none'
        },
        closeCreateSolution() {
            let modal = document.getElementById('createSolution')
            modal.style.transform = 'translate(-50%, -100%)'
            let dimming = document.getElementById('dimming')
            dimming.style.display = 'none'
        },

        onDeleteQuestion(id) {
            this.$store.dispatch(questionActionTypes.deleteQuestion, id)
        },
        onDeleteSolution(id) {
            this.$store.dispatch(solutionActionTypes.deleteSolution, id)
        },
    },
}
</script>
<style>
video {
    width: 100%;
}
.video-container {
    height: min-content;
    position: relative;
}
.a-black {
    color: black;
}
</style>
