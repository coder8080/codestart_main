В полседствии readme будет отредактирован и доведён до ума. Ждите.
CodeStart - мой школьный проект в 7 классе.

# Запуск

Вам понадобится установленный и запущенный docker и docker-compose.
сначала скачиваем этот реп:

```bash
git clone https:///github.com/coder8080/codestart_main
cd codestart_main
```

затем докачиваем остальные:

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
