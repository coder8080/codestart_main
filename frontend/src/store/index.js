import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import settings from '@/store/modules/settings'
import lesson from '@/store/modules/lesson'
import lessons from '@/store/modules/lessons'
import passwordReset from '@/store/modules/passwordReset'
import subLesson from '@/store/modules/subLesson'
import program from '@/store/modules/program'
import profile from '@/store/modules/profile'
import question from '@/store/modules/question'
import solution from '@/store/modules/solution'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        settings,
        lesson,
        lessons,
        passwordReset,
        subLesson,
        program,
        profile,
        question,
        solution,
    },
})
