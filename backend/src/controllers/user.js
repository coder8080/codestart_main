const passwordValidator = require('../helpers/passwordValidator')
const User = require('../models/user')
const Key = require('../models/key')
const Lesson = require('../models/lesson')
const Program = require('../models/program')
const encodeEmail = require('../helpers/jwt').encode
const emailValidator = require('email-validator')
const mailerApi = require('../api/mailer')
const { domain } = require('../config')
const sha256 = require('sha256')
const keyGenerator = require('../helpers/keyGenerator')
const randomMix = require('../helpers/randomMix')

function validatePassword(password) {
    let errors = []
    const passwordValidationResult = passwordValidator.validate(password, {
        list: true,
    })
    // Конвертируем сообщения проверки в понятный текст
    for (let error of passwordValidationResult) {
        if (error === 'min') errors.push('пароль слишком короткий (минимальная длинна - 8 символов)')
        else if (error === 'max') errors.push('пароль слишком длинный (максимальная длинна - 100 символов)')
        else if (error === 'lowercase') errors.push('пароль должен содержать хотя бы одну строчную букву')
        else if (error === 'uppercase') errors.push('пароль должен содержать хотя бы одну заглавную букву')
        else if (error === 'symbols') errors.push('пароль должен содержать хотя бы один специальный символ')
    }
    return errors
}

/* Создание пользователя */
module.exports.register = async (req, res) => {
    // Получаем введённые данные
    const credentials = req.body
    // Объявляем массив ошибок
    let errors = []
    // Проверяем, указано ли имя пользователя
    if (!credentials.username) {
        // Если нет, записываем сообщение об ошибке
        errors.push('введите имя пользователя')
    } else {
        // Если да, то проверяем, не занято ли оно
        if ((await User.count({ username: credentials.username })) > 0) {
            errors.push('пользователь с таким именем уже сущетсвует')
        }
    }
    // Проверяем, указана ли электронная почта
    if (!credentials.email) {
        // Если нет, записываем сообщение об ошибке
        errors.push('введите электронную почту')
    } else {
        // Если да, то проверяем, верно и она указана
        if (emailValidator.validate(credentials.email)) {
            // Если да, то проверяем, не занята ли она
            if (await User.count({ email: credentials.email })) {
                errors.push('пользователь с такой электронной почтой уже существует')
            }
        } else {
            errors.push('введите корректный адрес электронной почты')
        }
    }
    // Проверяем, повторён ли пароль
    if (!credentials.repeatPassword) {
        errors.push('повторите пароль')
    }
    // Проверяем, указан ли пароль
    if (!credentials.password) {
        errors.push('введите пароль')
    } else {
        // Если да, проверяем его на соответствие требованиям
        const passwordValidationErrors = validatePassword(credentials.password)
        errors.push(...passwordValidationErrors)
        if (credentials.repeatPassword !== credentials.password) {
            errors.push('пароли не совпадают')
        }
    }
    // Если есть хоть одна ошибка, то отправляем их
    if (errors[0]) {
        res.status(401).json({
            errors,
        })
    } else {
        // Если нет, то создаём пользователя
        const user = new User({
            username: credentials.username,
            email: credentials.email,
            password: sha256.x2(credentials.password),
        })
        await user.save()
        res.status(200).json({
            user: {
                token: encodeEmail(user.email),
                username: user.username,
                email: user.email,
                level: user.level,
                bio: user.bio,
                theme: user.theme,
            },
        })
    }
}

/* Вход на сайт */
module.exports.login = async (req, res) => {
    // Создание необходимых переменных
    const credentials = req.body
    let errors = []
    // Проверка электронной почты
    if (!credentials.email) {
        errors.push('введите электронную почту')
    } else {
        if (!emailValidator.validate(credentials.email)) {
            errors.push('введите корректный адрес электронной почты')
        }
    }
    // Проверка пароля (на наличие)
    if (!credentials.password) errors.push('введите пароль')
    if (!errors[0]) {
        // Если ещё не было найдено ошибок, то получаем пользователя
        let user = (await User.find({ email: credentials.email }))[0]
        if (user) {
            // Если пользователь был получен, то проверяем пароль
            const passwordHash = sha256.x2(credentials.password)
            if (user.password === passwordHash) {
                // Если пароль совпал, то создаём токен и отправляем его
                const token = encodeEmail(user.email)
                res.status(200).json({
                    user: {
                        username: user.username,
                        email: user.email,
                        bio: user.bio,
                        level: user.level,
                        token,
                        theme: user.theme,
                    },
                })
            } else {
                // Если пароль не совпал, то создам сообщение об ошибке
                errors.push('электронная почта или пароль неверны')
            }
        } else {
            // Если пользователя с такой электронной почтой не существует, то создаем ошибку
            errors.push('пользователя с такой электронной почтой не существует')
        }
    }
    if (errors[0]) {
        res.status(401).json({
            errors,
        })
    }
}

module.exports.validateToken = async (req, res) => {
    const user = req.body.user
    if (user) {
        res.status(200).json({
            user: {
                username: user.username,
                email: user.email,
                level: user.level,
                bio: user.bio,
                theme: user.theme,
            },
        })
    } else {
        res.status(401).end()
    }
}

module.exports.updateSettings = async (req, res) => {
    const user = req.body.user
    if (user) {
        const settings = req.body
        let errors = []
        if (!settings.username) {
            errors.push('укажите имя пользователя')
        } else if (settings.username !== user.username) {
            let isUsernameTaken = (await User.find({ username: settings.username }))[0]
            if (isUsernameTaken) {
                errors.push('это имя пользователя уже занято')
            }
        }
        if (!settings.email) {
            errors.push('укажите электронную почту')
        } else {
            if (!emailValidator.validate(settings.email)) {
                errors.push('введите корректный адрес электронной почты')
            } else if (settings.email !== user.email) {
                const isEmailTaken = (await User.find({ email: settings.email }))[0]
                if (isEmailTaken) {
                    errors.push('уже существует аккаунт с этим адресом почты')
                }
            }
        }
        if (!settings.bio) settings.bio = ''
        if (errors[0]) {
            res.status(401).json({
                errors,
            })
        } else {
            await User.update(
                { _id: user.id },
                {
                    username: settings.username,
                    email: settings.email,
                    bio: settings.bio,
                    theme: settings.theme,
                }
            )
            let updatedUser = (await User.find({ _id: user.id }))[0]
            res.status(200).json({
                user: {
                    email: updatedUser.email,
                    username: updatedUser.username,
                    bio: updatedUser.bio,
                    level: updatedUser.level,
                    theme: updatedUser.theme,
                },
            })
        }
    } else {
        res.status(401).json({
            errors: ['сначала войдите в аккаунт'],
        })
    }
}

module.exports.updateLevel = async (req, res) => {
    const user = req.body.user
    if (user) {
        const lessonsCount = await Lesson.estimatedDocumentCount()
        if (user.level !== lessonsCount) {
            await User.update({ id: user.id }, { level: user.level + 1 })
            let updatedUser = (await User.find({ id: user.id }))[0]
            let haveFinished = false
            if (updatedUser.level === lessonsCount) haveFinished = true
            res.status(200).json({
                user: {
                    username: updatedUser.username,
                    email: updatedUser.email,
                    bio: updatedUser.bio,
                    level: updatedUser.level,
                    theme: updatedUser.theme,
                },
                haveFinished,
            })
        } else {
            res.status(200).json({
                user: {
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    level: user.level,
                    theme: user.theme,
                },
            })
        }
    } else {
        res.status(401).json({ errors: ['сначала войдите на сайт'] })
    }
}

module.exports.generateKey = async (req, res) => {
    const email = req.body.email
    if (email) {
        const user = (await User.find({ email }))[0]
        if (user) {
            const userEmail = user.email
            const key_string = keyGenerator(20)
            const key_row = new Key({
                userEmail: userEmail,
                key: key_string,
            })
            await key_row.save()
            mailerApi
                .sendMail({
                    to: email,
                    subject: 'Сброс пароля на сайте Code</>Start',
                    text: `Был сделан запрос сброса пароля в аккаунте с этим адресом электронной почты. Если вы его не делали, проигнорируйте данное сообщение. Чтобы сбросить пароль, перейдите по ссылке ${domain}/#/reset-password/${key_string}. Не отвечайте на это письмо.\n\n--------------------\nCode</>Start`,
                })
                .then(() => {
                    res.status(200).end()
                })
                .catch((result) => {
                    res.status(500).json({
                        errors: [result],
                    })
                })
        } else {
            res.status(401).json({
                errors: ['нет пользователя с такой электронной почтой'],
            })
        }
    } else {
        res.status(401).json({
            errors: ['введите электронную почту'],
        })
    }
}

module.exports.verifyKey = async (req, res) => {
    const key_string = req.body.key
    if (key_string) {
        const key_row = (await Key.find({ key: key_string }))[0]
        if (key_row) {
            res.status(200).end()
        } else {
            res.status(401).json({
                errors: ['не существует такого ключа сброса'],
            })
        }
    } else {
        res.status(401).json({
            errors: ['укажите код сброса пароля'],
        })
    }
}

module.exports.resetPassword = async (req, res) => {
    const key_string = req.body.key
    const password = req.body.password
    const password_repeat = req.body.password_repeat
    if (!(key_string && password && password_repeat)) {
        res.status(401).json({
            errors: ['укажите пароль и повторите его'],
        })
        return
    }
    const key_row = (await Key.find({ key: key_string }))[0]
    if (!key_row) {
        res.status(401).json({
            errors: ['не существует такого ключа сброса'],
        })
        return
    }
    const user = (await User.find({ email: key_row.userEmail }))[0]
    if (password !== password_repeat) {
        res.status(401).json({
            errors: ['пароли не совпадают'],
        })
        return
    }
    let passwordValidationErrors = validatePassword(password)
    if (passwordValidationErrors[0]) {
        res.status(401).json({ errors: passwordValidationErrors })
        return
    }
    user.password = sha256.x2(password)
    await Key.deleteOne({ userEmail: user.email })
    await user.save()
    res.status(200).end()
}

module.exports.getUserProfile = async (req, res) => {
    const username = req.params.username
    if (username) {
        user = (await User.find({ username }))[0]
        if (user) {
            programs = (await Program.find({ ownerUsername: user.username })).reverse()
            res.status(200).json({
                user: {
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    theme: user.theme,
                    level: user.level,
                },
                programs,
            })
        } else {
            res.status(404).json({
                errors: ['нет пользователя с таким логином'],
            })
        }
    } else {
        res.status(401).json({ errors: ['введите email'] })
    }
}

module.exports.getFeed = async (req, res) => {
    let pagination = req.params.pagination
    const user = req.body.user
    languages = user.languages
    let errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!pagination) {
        errors.push('укажите номер страницы (начинается с 0)')
    } else {
        pagination = Number(pagination)
        if (typeof pagination !== 'number') errors.push('номер страницы должен быть целым числом (нумерация с 0)')
        if (Math.floor(pagination) !== pagination) errors.push('номер страницы должен быть целым числом')
    }
    if (!languages) {
        errors.push('нет языков для формирования ленты')
    } else {
        if (!languages[0]) errors.push('нет первого языка')
        if (typeof languages[0] !== 'string') errors.push('каждый язык должен быть строкой')
    }
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    console.log(languages)
    programs = []
    for (lang of languages) {
        programs.push(...(await Program.find({ lang })))
    }
    programs = randomMix(programs.slice(10 * pagination, 10 * (pagination + 1) + 1))
    res.status(200).json({ programs })
}
