const jwt = require('jsonwebtoken')

/**
 * Создание ключа входа на основе электронной почты
 * @param {String} email - электронная почта пользователя
 * @returns {String} - секретный ключ
 * */
function encode(email) {
    return jwt.sign({ email }, process.env.SECRET, { expiresIn: '43200s' })
}

/**
 * Получение id пользователя из ключа
 * @param {String} token - токен, который нужно расшифровать
 * @returns {Number} - id пользователя
 * */
function decode(token) {
    return jwt.verify(token, process.env.SECRET).id
}

module.exports = {
    encode,
    decode,
}
