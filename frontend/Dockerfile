FROM node:8

RUN mkdir -p /var/www/html/frontend

WORKDIR /var/www/html/frontend

COPY ./ /var/www/html/frontend/

RUN npm -g config set user root

RUN npm install

RUN npm install -g @angular/cli

CMD ng serve --host 0.0.0.0
