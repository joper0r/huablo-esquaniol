FROM node:latest

RUN mkdir -p /var/www/html/frontend

WORKDIR /var/www/html/frontend

RUN npm -g config set user root

RUN npm install

RUN npm update

RUN echo 'alias ng="~/npm-global/bin/ng" ' >> ~/.bashrc

CMD ng serve
