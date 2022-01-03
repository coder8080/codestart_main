/** Функция записи в локальное хранилище с поддержкой
 * массивов, объектов и т. д. (по умолчанию поддерживаются тоько строки)
 * @param {String} key - название записи
 * @param {Object} data - данные, которые нужно записать
 * */
function setItem(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data))
}

/** Функция получения данных из локального хранилище с поддержкой
 * массивов, объектов и т. д. (по умолчанию поддерживаются тоько строки)
 * @param {String} key - название записи
 * @returns {Object} - полученные данные
 * */
function getItem(key) {
    try {
        return JSON.parse(window.localStorage.getItem(key))
    } catch (e) {
        console.log(e)
        return null
    }
}

export default {
    setItem,
    getItem,
}
