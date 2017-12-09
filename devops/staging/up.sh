#!/bin/bash
# show commands as they are executed
set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

git pull

export COMPOSE_FILE="$DIR/staging.chains.docker-compose.yml"
docker-compose up -d
sleep 10

export COMPOSE_FILE="$DIR/staging.common.docker-compose.yml"
docker-compose up -d
sleep 10

export COMPOSE_FILE="$DIR/staging.search.docker-compose.yml"
docker-compose pull
docker-compose up -d
sleep 10

export COMPOSE_FILE="$DIR/staging.markets.docker-compose.yml"
docker-compose pull
docker-compose up -d
