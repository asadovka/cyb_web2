#!/bin/sh

echo "################################## Run nginx"
export DOLLAR='$'
envsubst < /etc/nginx/conf.d/nginx.tmpl > /etc/nginx/conf.d/nginx.conf # /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"
