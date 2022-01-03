const defaultTile = 'Code</>Start'

/** Получить титул страницы
 * @param {Object} route - this.$route vue компонента
 * @return {String} - Титул страницы*/
function getTitle(route) {
    switch (route.name) {
        case 'Home':
            return `${defaultTile} - Главная`
        case 'Login':
            return `${defaultTile} - Войти`
        case 'Register':
            return `${defaultTile} - Зарегистироваться`
        case 'Lessons':
            return `${defaultTile} - Уроки`
        case 'Lesson':
            return `${defaultTile} - Урок ${route.params.number}`
        case 'Settings':
            return `${defaultTile} - Настройки`
        default:
            return defaultTile
    }
}

export default getTitle
