#FROM andrey/node_module as webpack
#WORKDIR /src
FROM node:8.5.0 as webpack
COPY ./ /src
WORKDIR /src
RUN npm install
RUN npm run build

FROM nginx
RUN mkdir /dist
COPY --from=webpack /src/dist /dist

RUN rm /etc/nginx/conf.d/*
COPY devops/nginx.tmpl /etc/nginx/conf.d/
COPY devops/config.tmpl config.tmpl
COPY devops/run_nginx.sh run_nginx.sh
CMD /run_nginx.sh


