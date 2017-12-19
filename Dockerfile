FROM node:8.9.3

RUN mkdir -p /var/www/html/frontend

WORKDIR /var/www/html/frontend


#RUN apt-get update && apt-get install
##RUN npm install -g @angular/cli@latest

##CMD ng serve --host 0.0.0.0