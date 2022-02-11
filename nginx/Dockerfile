FROM nginx:stable-alpine

LABEL maintainer="coder8080@yandex.ru"
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]