// Входим в строгий режим
// Получаем зависимостей
const express = require('express')
const userRoute = require('./routes/user')
const lessonRoute = require('./routes/lesson')
const programRoute = require('./routes/program')
const questionRoute = require('./routes/question')
const solutionRoute = require('./routes/solution')
const dbConnection = require('./helpers/databaseConnection')
const dbMigrator = require('./helpers/databaseMigrator')
const bodyParser = require('body-parser')
const { port } = require('./config')
const corsMiddleware = require('./middlewares/cors')

// Создаём сервер
const app = express()

// Подключаем body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Подключаем cors
app.use(corsMiddleware)

// Подключаем api
app.use('/api/users', userRoute)
app.use('/api/lessons', lessonRoute)
app.use('/api/programs', programRoute)
app.use('/api/questions', questionRoute)
app.use('/api/solutions', solutionRoute)

// Запускаем сервер
dbConnection.then(async () => {
    await dbMigrator()
    app.listen(port, () => {
        console.log('server started successfully on port ' + port)
    })
})
