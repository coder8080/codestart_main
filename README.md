# CodeStart

Code</>Start - site for my short html-css-js course.
Was made as my school project in 2021-2022 academic year.
I was in 7-th grade.

## Specifications:

-   Tech stack: _MENV_
-   Languages: _JS_, _HTML_, _CSS_
-   Frameworks: _Vue_, _Express_, _Bootstrap_
-   Technologies: _Docker_, _Docker-Compose_

# Table of contents

-   [System requirements](#system-requirements)
-   [Launch](#launch)
    -   [Launch in development mode](#launch-in-development-mode)
-   [Setup](#setup)
    -   [Host](#host)
    -   [Port](#port)
    -   [E-mail](#e-mail)
-   [Goals](#goals)

# System requirements

-   Terminal (`powershell`, `gnome-terminal`, `konsole`, etc.)
-   Installed `docker`
-   Started docker daemon
-   Installed `docker-compose` (if it wasn't installed with docker)

# Launch

Download this repo:

```bash
git clone https:///github.com/coder8080/codestart_main
cd codestart_main
```

Start project in production mode:

```bash
docker-compose up --build
```

If you get error on linux, try to start this command with sudo:

```bash
sudo docker-compose up --build
```

First launch may be long and require stable internet connect to download necessary docker images.

## Launch in development mode

Difference between production and development modes:

-   Vue starts a live update server instead of creating production build
-   Microservices, written with express.js use real-time update by nodemon
-   Database port (27017) forwarded to a host

To start site in the development mode, use this command:

```bash
docker-compose -f compose.yml -f compose.development.yml up --build
```

If you get error on linux, here is this command with sudo:

```bash
sudo docker-compose -f compose.yml -f compose.development.yml up --build
```

# Setup

For the site to work correctly, you need to setup it.

## Host

Attention! This is a required parametr.
You have to specify the host (on which domain the site is running) in `compose.yml` file
in the root folder.
Go to services > nginx > environment > HOST and change it to needed (like localhost, 192.168.0.3,
www.example.com, etc.)

## Port

To change the port, on which the site runs, go to `docker-compose.yml` file in the root folder,
then services > nginx > environment > PORT (line 61) and change it to needed.

## E-mail

In order for users to reset their paswords, the site needs an email address.
I simply created a google account and used it. I think, the site will work with any other
email provider - mail.ru, yandex.ru, etc. , but I haven't tested it. So i advice you
to create a google account too.
If you use email provider, distinct from google, you need to explicitly specify his smtp
server address in `compose.yml` > services > mailer > environment > HOST.
If you use google, you don't need to change this parametr.
Required settings of an email account (login and password) are specified at
`compose.yml` file in the root folder at services > mailer > environment >
LOGIN and PASSWORD (lines 33 and 34).
If you won't specify email account settings, password reset won't work.

# Goals

-   [x] Add solutions display under question
-   [x] Add an ability to edit & remove your questions
-   [x] Add an ability to edit & remove your solutions
-   [x] Add an ability to mark solution as correct
-   [ ] Add homework for each lesson
-   [x] Add feed page
-   [x] Add messages between users
-   [ ] Add root user
-   [ ] Add moderators
-   [ ] Add button "draw the attention of moderator"
