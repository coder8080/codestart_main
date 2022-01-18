FROM node:14-alpine

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN addgroup -S app && adduser -S app -G app
USER app