# CodeStart

Code</>Start - сайт для запсанного мной краткого курса по html-css-js.
Создавался как школьный проект в 2021-2022 учебном году.
Тогда я был в 7-ом классе.

## Спецификации:

-   Набор компонентов: _MENV_
-   Использованы языки: _JS_, _HTML_, _CSS_
-   Использованы фреймворки: _Vue_, _Express_, _Bootstrap_
-   Использованы технологии: _Docker_, _Docker-Compose_

# Содержание

-   [Системные требования](#системные-требования)
-   [Запуск](#запуск)
-   [Запуск в режиме разработки](#запуск-в-режиме-разработки)
-   [Настройка](#настройка)
    -   [Порт](#порт)
    -   [Почта](#почта)

# Системные требования

-   Терминал (`powershell`, `gnome-terminal`, `konsole`, etc.)
-   Установленный `docker`
-   Запущенный демон docker'а
-   Установленный `docker-compose` (если он не был установлен вместе с docker)

# Запуск

Сначала скачиваем этот репозиторий:

```bash
git clone https:///github.com/coder8080/codestart_main
cd codestart_main
```

Так как код разбит на микросервисы, у каждого свой репозиторий.
Скачиваем оставшиеся микросервисы:

```bash
git clone https://github.com/coder8080/codestart_frontend frontend
git clone https://github.com/coder8080/codestart_backend backend
git clone https://github.com/coder8080/codestart_lessons lessons
git clone https://github.com/coder8080/codestart_mailer mailer
```

и запускаем проект:

```bash
docker-compose up --build
```

При возникновении ошибки на операционной системе linux, попробуйте запустить команду от имени root'а,
то есть

```bash
sudo docker-compose up --build
```

Первый запуск может быть долгим и потребовать быстрого интерент-соединения, так как необходимо скачать
некоторые образы docker.

## Запуск в режиме разработки

Чем режим разработки отличается от обычного? Внешне различия не заметны, но вот основной перчень:

-   Vue не делает сборку для продакшена, а сам запускается сервер, то есть изменения в файле
    мнгновенно отражаются в браузере
-   Микросервисы, использующие express запускаются с помощью nodemon, то есть при внесении
    изменений перезапускаются
-   Порт базы данных (27017) проброшен на реальную машину

Чтобы запустить сайт в dev режиме, выполните следующую команду:

```bash
docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build
```

И при возникновении ошибка на linux соответственно от имени рута:

```bash
sudo docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build
```

# Настройка

В предыдущем разделе сказано, как запустить проект. Но для корректной работы его нужно настроить.

## Порт

Чтобы изменить порт, на котором запускается весь сайт в production-режиме, откройте файл `codestart_main/nginx/nginx.conf.prod`

На второй строке вы можете увидеть следующий код:

```
listen 8080;
```

Замените порт 8080 на нужный вам.
Чтобы изменить порт запуска в dev-режиме, проделайте то же самое с файлом `codestart_main/nginx/nginx.conf.dev`

## Почта

Чтобы пользователи могли сбросить пароль, сайту нужна почта. Я просто создавал специальный
аккаунт google. Может сработать и с яндекс почтой, mail.ru, но я не пробовал. Настройки указываются
в файле `docker-compose.yml` в корневой директории проекта на строках 35 и 36. Если указаны неверные данные, сбор пароля работать не будет.
