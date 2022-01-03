module.exports.port = process.env.PORT
module.exports.mongoUrl = process.env.MONGO_URL
module.exports.mailerUrl = process.env.MAILER_URL
module.exports.lessons = [
    {
        title: 'Введение в курс.',
        description: `Я рад видеть вас на платформе CodeStart. В этом уроке я расскажу вам о курсе и о том, что вы
         сможете сделать в его конце.`,
        number: 1,
        video: 'intro.mp4',
    },
    {
        title: 'Урок первый. Язык html.',
        description: `Всем привет! В этом уроке мы установим редактор кода (программу, в которой программисты пишут
         код) и познакомимся с языком html.`,
        number: 2,
        video: 'html.mp4',
    },
    {
        title: 'Урок второй. Язык css.',
        description: `Всем ещё раз привет. В этом уроке мы разберём язык программирования (стилей) css. Он нужен,
         чтобы добавить красочности нашему сайту. Самый простой пример использования css - это цвета. Хорошего
          просмотра!`,
        number: 3,
        video: 'css.mp4',
    },
    {
        title: 'Урок третий. Язык js',
        description: `Вы уже прошли половину пути! В этом уроке мы разберём язык js и по его окончанию будет
         окончательно готовы к финальному проекту. Вперёд!`,
        number: 4,
        video: 'js.mp4',
    },
    {
        title: 'Урок четвёртый, последний. Финальный проект.',
        description: `Поздравляю вас! Вы уже на финишной прямой. Это последний урок курса. Удачи вам`,
        number: 5,
        video: 'final.mp4',
    },
]
module.exports.subLessons = [
    {
        title: 'Дополнение 1. Настройка редактора',
        description:
            'В этом дополнении я хочу рассказать про настройку редактораа более детально. Например, зачем нужнен ' +
            'prettier и как его включить',
        number: 1,
        parent: 2,
        video: '2-1.mp4',
    },
]
module.exports.domain = process.env.DOMAIN
