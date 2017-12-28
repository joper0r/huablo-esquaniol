FROM node:latest

RUN mkdir -p /var/www/html/frontend

WORKDIR /var/www/html/frontend

ADD /* /var/www/html/frontend

RUN npm -g config set user root

RUN npm install

CMD ng serve --host 0.0.0.0
