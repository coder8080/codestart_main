import axios from 'axios'
import storage from '@/helpers/storage'
export const baseURL = 'http://localhost:8080/api'
axios.defaults.baseURL = baseURL
axios.interceptors.request.use((config) => {
    const token = storage.getItem('token')
    config.headers.Authorization = token ? token : ''
    return config
})
export default axios
