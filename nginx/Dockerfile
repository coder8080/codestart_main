FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]