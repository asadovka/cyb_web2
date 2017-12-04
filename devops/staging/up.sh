#!/bin/bash

set -x

docker-compose -f ./docker-compose.yml.staging up -d
