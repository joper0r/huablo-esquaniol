FROM ubuntu:16.04

RUN mkdir -p /var/www/html/frontend

WORKDIR /var/www/html/frontend

RUN apt-get update && apt-get install -y curl

CMD /bin/bash

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -y nodejs

RUN npm -g config set user root

RUN npm install -g @angular/cli

CMD ng serve --host 0.0.0.0
