FROM node:8.5.0 as webpack
COPY ./ /src
WORKDIR /src
RUN npm install
RUN npm run build

FROM nginx
RUN mkdir /dist
COPY --from=webpack /src/dist /dist
RUN rm /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/
