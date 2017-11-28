#!/bin/sh

echo "################################## Set app config"

CYBER_CHAINGEAR_API=${CYBER_CHAINGEAR_API:-"http://localhost:9000"} 
CYBER_SEARCH_API=${CYBER_SEARCH_API:-"http://localhost:8000"} 
CYBER_MARKETS_API=${CYBER_MARKETS_API:-"http://localhost:5000"} 

echo "→ CYBER_CHAINGEAR_API: $CYBER_CHAINGEAR_API" 
echo "→ CYBER_SEARCH_API: $CYBER_SEARCH_API" 
echo "→ CYBER_MARKETS_API: $CYBER_MARKETS_API" 

export DOLLAR='$'

echo "################################## Run nginx"

envsubst < /config.tmpl > /dist/config.js 
envsubst < /etc/nginx/conf.d/nginx.tmpl > /etc/nginx/conf.d/nginx.conf # /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
