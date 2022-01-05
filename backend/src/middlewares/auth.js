const jwt = require('jsonwebtoken')
const User = require('../models/user')

/* Middleware авторизации */
module.exports = async (req, res, next) => {
    try {
        // Получаем id пользователя
        const email = jwt.verify(req.headers.authorization, process.env.SECRET).email
        console.log(email)
        // Получаем пользователя
        const user = await User.findOne({
            email,
        })
        console.log(user)
        if (user) {
            // Если он есть, то сохраняем его
            req.body.user = user
            next()
        } else {
            // Если что-то пошло не так, то запрос не должен быть выполнен
            res.status(401).end()
        }
    } catch (e) {
        console.log(e)
        // Если что-то пошло не так, то запрос не должен быть выполнен
        res.status(401).json({ errors: ['ваш токен не подтверждён. войдите на сайт'] })
        return
    }
}
