/**
 * This is a set of express controllers for working with users/
 *
 * Author: coder8080
 */

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

// Password validation function
function validatePassword(password) {
    let errors = []
    const passwordValidationResult = passwordValidator.validate(password, {
        list: true,
    })
    // Convert errors to text
    for (let error of passwordValidationResult) {
        if (error === 'min') errors.push('пароль слишком короткий (минимальная длинна - 8 символов)')
        else if (error === 'max') errors.push('пароль слишком длинный (максимальная длинна - 100 символов)')
        else if (error === 'lowercase') errors.push('пароль должен содержать хотя бы одну строчную букву')
        else if (error === 'uppercase') errors.push('пароль должен содержать хотя бы одну заглавную букву')
        else if (error === 'symbols') errors.push('пароль должен содержать хотя бы один специальный символ')
    }
    return errors
}

/* User registration */
module.exports.register = async (req, res) => {
    // Get data
    const credentials = req.body
    // Create errors arr
    let errors = []
    // Check if username is specified
    if (!credentials.username) {
        // If it isn't, add an error
        errors.push('введите имя пользователя')
    } else {
        // If so, check if it is busy
        if ((await User.count({ username: credentials.username })) > 0) {
            errors.push('пользователь с таким именем уже сущетсвует')
        }
    }
    // Check if email is specified
    if (!credentials.email) {
        // If it sin't, add error
        errors.push('введите электронную почту')
    } else {
        // If so, validate it
        if (emailValidator.validate(credentials.email)) {
            // If it's ok, check if it is busy
            if (await User.count({ email: credentials.email })) {
                errors.push('пользователь с такой электронной почтой уже существует')
            }
        } else {
            errors.push('введите корректный адрес электронной почты')
        }
    }
    // Check if the second password is specified
    if (!credentials.repeatPassword) {
        errors.push('повторите пароль')
    }
    // Check if the password is specified
    if (!credentials.password) {
        errors.push('введите пароль')
    } else {
        // If it is, validate it
        const passwordValidationErrors = validatePassword(credentials.password)
        errors.push(...passwordValidationErrors)
        if (credentials.repeatPassword !== credentials.password) {
            errors.push('пароли не совпадают')
        }
    }
    // If there is at least one error, send them (or it)
    if (errors[0]) {
        res.status(401).json({
            errors,
        })
    } else {
        // If there aren't any errors, create a new user and send him
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

/* Sign in */
module.exports.login = async (req, res) => {
    console.log('signin in')
    // Get data
    const credentials = req.body
    // Create errors arr
    let errors = []
    // Email validation
    if (!credentials.email) {
        errors.push('введите электронную почту')
    } else {
        if (!emailValidator.validate(credentials.email)) {
            errors.push('введите корректный адрес электронной почты')
        }
    }
    // Checki if the password is specified
    if (!credentials.password) errors.push('введите пароль')
    if (!errors[0]) {
        // If there aren't any errors, try to get user from db
        let user = (await User.find({ email: credentials.email }))[0]
        if (user) {
            // If the user exists, validate password
            const passwordHash = sha256.x2(credentials.password)
            if (user.password === passwordHash) {
                // If the passwords matched, create authorization token and send it
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
                // If the passwords didn't match, send an error
                res.status(401).json({ errors: ['электронная почта или пароль неверны'] })
            }
        } else {
            // If the user doesn't exist, send an error
            res.status(401).json({ errors: ['пользователя с такой электронной почтой не существует'] })
        }
    } else {
        // If there are any errors, send them
        res.status(401).json({
            errors,
        })
    }
}

/* Token validation */
module.exports.validateToken = async (req, res) => {
    // Get user (for more understanding, look at auth api)
    const user = req.body.user
    if (user) {
        // If user exists, send him
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
        // If user doesn't exist, respond with 401 status
        res.status(401).end()
    }
}

/* User settings update */
module.exports.updateSettings = async (req, res) => {
    // Get user
    const user = req.body.user
    if (user) {
        // If the user exists, get settings
        const settings = req.body
        let errors = []
        // Validate username
        if (!settings.username) {
            errors.push('укажите имя пользователя')
        } else if (settings.username !== user.username) {
            let isUsernameTaken = (await User.find({ username: settings.username }))[0]
            if (isUsernameTaken) {
                errors.push('это имя пользователя уже занято')
            }
        }
        // Validate email
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
        // If the bio isn't specified, just set it to nothing
        if (!settings.bio) settings.bio = ''
        if (errors[0]) {
            // If there are any errors, send them
            res.status(401).json({
                errors,
            })
        } else {
            // If there aren't ane errors, update settings
            await User.update(
                { _id: user.id },
                {
                    username: settings.username,
                    email: settings.email,
                    bio: settings.bio,
                    theme: settings.theme,
                }
            )
            // Send updated user
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
        // If the user doesn't exist, sending an error
        res.status(401).json({
            errors: ['сначала войдите в аккаунт'],
        })
    }
}

/* User level update */
module.exports.updateLevel = async (req, res) => {
    // Get user
    const user = req.body.user
    if (user) {
        // If the user exists
        const lessonsCount = await Lesson.estimatedDocumentCount()
        // If the user hasn't finished lessons, rise his level
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
            // If the user has finished all lessons, nothing to do
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
        // If the user wasn't provided, send an error
        res.status(401).json({ errors: ['сначала войдите на сайт'] })
    }
}

/* Generate and send key for password reset */
module.exports.generateKey = async (req, res) => {
    // Get email
    const email = req.body.email
    if (email) {
        // If email was specified, try to get user
        const user = (await User.find({ email }))[0]
        if (user) {
            const userEmail = user.email
            // Create key
            const key_string = keyGenerator(20)
            const key_row = new Key({
                userEmail: userEmail,
                key: key_string,
            })
            await key_row.save()
            // Send email
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

/* Verify password reset key */
module.exports.verifyKey = async (req, res) => {
    // Get key
    const key_string = req.body.key
    if (key_string) {
        // Verify key
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

/* Reset password */
module.exports.resetPassword = async (req, res) => {
    // Get data
    const key_string = req.body.key
    const password = req.body.password
    const password_repeat = req.body.password_repeat
    // Validate data
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
    // Update password
    const user = (await User.find({ email: key_row.userEmail }))[0]
    user.password = sha256.x2(password)
    await Key.deleteOne({ userEmail: user.email })
    await user.save()
    res.status(200).end()
}

// Get user profile
module.exports.getUserProfile = async (req, res) => {
    // Get username
    const username = req.params.username
    if (username) {
        // Get user
        user = (await User.find({ username }))[0]
        if (user) {
            // Get user profile and send it
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

/* Get feed */
module.exports.getFeed = async (req, res) => {
    // Get data
    let pagination = req.params.pagination
    const user = req.body.user
    languages = user.languages
    // Create errors arr
    let errors = []
    // Validate data
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
    // If there are any errors, send them
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    // Get and send feed
    programs = []
    for (lang of languages) {
        programs.push(...(await Program.find({ lang })))
    }
    programs = randomMix(programs.slice(10 * pagination, 10 * (pagination + 1) + 1))
    res.status(200).json({ programs })
}
