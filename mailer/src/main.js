const express = require('express')
const app = express()
const { port, login } = require('./config')
const bodyParser = require('body-parser')
const transporter = require('./helpers/transporter')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'mailer service is working correctly',
    })
})

app.post('/send-mail', (req, res) => {
    const mail = req.body.mail
    mail.from = login
    transporter.sendMail(mail).then((info, err) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                error: 'error during sending e-mail',
            })
        }
        res.status(200).end()
    })
})

app.listen(port, () => {
    console.log(`mailer service was started successfully on port ${port}`)
})
