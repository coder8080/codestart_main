# CodeStart

CodeStart - веб платформа с кратким курсом по работе с html css js.
Создавалась как школьный проект в 2021-2022 учебном году (я был в 7-ом классе)

# Системные требования

- Терминал (powershell, gnome-terminal, konsole, etc.)
- Установленный и запущенный docker
- Установленный docker-compose (если он не был установлен вместе с docker)

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
```

и запускаем проект:

```bash
docker-compose up --build
```

При возникновении ошибки на операционной системе linux, попробуйте запустить команду с root-правами, то есть

```bash
sudo docker-compose up --build
```

Проект запускается долго, так как образы docker - это полноценные операционные системы. Где мог, я использовал alpine для оптимизации.
Сами по себе уроки на сайте не появляются, в последствии будет создан скрипт автозаполнения базы.
Уже готовые уроки вы можете увидеть в codestart_main/lessons/videos/
