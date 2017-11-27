Web UI for cyber-markets and cyber-search.

* https://github.com/facebook/jest
* https://github.com/zeit/next.js/

#### Local development

    npm start

This starts local server that compiles all UI assets into memory and
updates them as soon as they are edited.

UI uses [cyber-search](https://github.com/cyberFund/cyber-search) API
endpoint, which is specified by `API_ROOT` environment variable.

#### Production deployment

    npm run build

This compiles all UI assets into static website, copied in `dist/`dir
and ready to be deployed to remote side.


#### build and run container

    docker build -t cyber-ui/frontend-image -f ./devops/Dockerfile ./
    docker run -e API_ROOT=http://search-api.cyber.fund  --name frontend -d -p 7000:80 cyber-ui/frontend-image


#### check container and remove if need
    docker exec -t -i frontend /bin/bash

    docker rm frontend

    docker stop frontend

https://thepracticalsysadmin.com/templated-nginx-configuration-with-bash-and-docker/
