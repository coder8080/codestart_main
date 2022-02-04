const Program = require('../models/program')

module.exports.getProgram = async (req, res) => {
    id = req.params.id
    if (id) {
        program = (await Program.find({ _id: id }))[0]
        if (program) {
            res.status(200).json({ program })
        } else {
            res.status(404).json({ errors: ['нет программы с таким id'] })
        }
    } else {
        res.status(401).json({ errors: ['необходимо указать id'] })
    }
}

module.exports.createProgram = async (req, res) => {
    user = req.body.user
    if (user) {
        form = req.body
        let errors = []
        if (!form.title) {
            errors.push('Введите название программы')
        }
        if (!form.code) {
            errors.push('Введите код')
        }
        if (!form.lang) {
            errors.push('выберите язык, на котором написана программа')
        }
        if (errors[0]) {
            res.status(401).json({ errors })
        } else {
            const program = new Program({
                title: form.title,
                description: form.description,
                ownerUsername: user.username,
                lang: form.lang,
                code: form.code,
            })
            await program.save()
            if (!user.languages.includes(form.lang)) {
                user.languages.push(form.lang)
                await user.save()
            }
            res.status(200).json({ id: program.id })
        }
    } else {
        res.status(401).json({ errors: ['сначала вам нужно войти'] })
    }
}

module.exports.getMyPrograms = async (req, res) => {
    user = req.body.user
    if (user) {
        programs = await Program.find({ ownerUsername: user.usrname })
        res.status(200).json({
            programs,
        })
    } else {
        res.status(401).json({
            errors: ['сначала войдите на сайт'],
        })
    }
}

module.exports.deleteProgram = async (req, res) => {
    user = req.body.user
    id = req.body.id
    errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!id) errors.push('введите id программы для удаления')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    program = (await Program.find({ _id: id }))[0]
    if (!program) {
        res.status(404).json({ errors: ['нет программы с таким id'] })
        return
    }
    if (user.username != program.ownerUsername) {
        res.status(401).json({ errors: ['эта программа не принадлежит вам'] })
        return
    }
    await Program.deleteOne({ _id: id })
    res.status(200).end()
}

module.exports.editProgram = async (req, res) => {
    user = req.body.user
    id = req.body.id
    form = req.body.form
    errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!id) errors.push('укажите программу, которую хотите изменить')
    if (!form) {
        errors.push('укажите данные для изменения')
    } else {
        if (!form.title) errors.push('укажите название программы')
        if (!form.code) errors.push('укажите код программы')
        if (!form.lang) errors.push('укажите язык программы')
        if (!form.description) form.description = ''
    }
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    program = (await Program.find({ _id: id }))[0]
    if (!program) errors.push('нет программы с таким id')
    if (program.ownerUsername != user.username) errors.push('программа не принадлежит вам')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    await Program.update(
        { _id: id },
        {
            title: form.title,
            description: form.description,
            code: form.code,
            lang: form.lang,
            created: new Date(),
        }
    )
    editedProgram = (await Program.find({ _id: id }))[0]
    res.status(200).json({ program: editedProgram })
}

module.exports.checkAffiliation = async (req, res) => {
    user = req.body.user
    id = req.body.id
    errors = []
    if (!user) errors.push('сначала войдите на сайт')
    if (!id) errors.push('укажите id программы для проверки')
    if (errors[0]) {
        res.status(401).json({ errors })
        return
    }
    program = (await Program.find({ _id: id }))[0]
    if (!program) {
        res.status(404).json({ errors: ['нет программы с таким id'] })
        return
    }
    res.status(200).json({ allowed: program.ownerUsername === user.username })
}
