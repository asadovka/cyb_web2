#!/bin/bash
# show commands as they are executed
set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# directory with repo clones
HOME="$( dirname $( dirname "$( dirname "$DIR" )" ) )"

git pull

export COMPOSE_FILE="$DIR/docker-compose.yml.staging"
docker-compose pull
docker-compose up -d

#
#cd "$HOME/cyber-markets"
#git pull
#export COMPOSE_FILE="devops/staging/docker-compose.yml"
#docker-compose pull
#docker-compose up -d
