FROM node:14-alpine

LABEL maintainer="coder8080@yandex.ru"
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN addgroup -S app && adduser -S app -G app
USER app