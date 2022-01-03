import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Settings from '@/views/Settings'
import Lesson from '@/views/Lesson'
import Lessons from '@/views/Lessons'
import SubmitEmail from '@/views/SubmitEmail'
import ResetPassword from '@/views/ResetPassword'
import LessonsFinish from '@/views/LessonsFinish'
import SubLesson from '@/views/SubLesson'
import ViewProgram from '@/views/ViewProgram'
import CreateProgram from '@/views/CreateProgram'
import UserProfile from '@/views/UserProfile'
import EditProgram from '@/views/EditProgram'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
    },
    {
        path: '/lesson/:number',
        name: 'Lesson',
        component: Lesson,
    },
    {
        path: '/lessons',
        name: 'Lessons',
        component: Lessons,
    },
    {
        path: '/forgot-password',
        name: 'SubmitEmail',
        component: SubmitEmail,
    },
    {
        path: '/reset-password/:key',
        name: 'ResetPassword',
        component: ResetPassword,
    },
    {
        path: '/lessons-finish',
        name: 'LessonsFinish',
        component: LessonsFinish,
    },
    {
        path: '/sublesson/:slug',
        name: 'SubLesson',
        component: SubLesson,
    },
    {
        path: '/program/:id',
        name: 'ViewProgram',
        component: ViewProgram,
    },
    {
        path: '/create-program',
        name: 'CreateProgram',
        component: CreateProgram,
    },
    {
        path: '/user-profile/:username',
        name: 'UserProfile',
        component: UserProfile,
    },
    {
        path: '/edit-program/:id',
        name: 'EditProgram',
        component: EditProgram,
    },
]

const router = new VueRouter({
    routes,
})

export default router
