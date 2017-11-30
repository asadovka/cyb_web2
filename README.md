Frontend UI for cyber-markets and cyber-search (blockchain browser).

Image: `cui-browser`

#### Local development

    npm start

This starts local server that compiles all UI assets into memory and
updates them as soon as they are edited.

UI uses API endpoints, specified by the following environment variables:

* [cyber-search](https://github.com/cyberFund/cyber-search) `CYBER_SEARCH_API`
* [cyber-markets](https://github.com/cyberFund/cyber-markets) `CYBER_SEARCH_API`
* [chaingear](https://github.com/cyberFund//chaingear-api) `CYBER_CHAINGEAR_API`

#### Building static site version

    npm run build

This compiles all UI assets into static website, copied in `dist/`dir
and ready to be executed or packed into Docker container for deployment.

#### Building container for deployment

    docker build -t cybernode/cui-browser -f ./devops/Dockerfile ./
    
To check that container works correctly, you need to bring up backend API and
pass endpoint addresses as environment variables:
    
    export CYBER_CHAINGEAR_API=http://localhost:8000
    export CYBER_SEARCH_API=http://search-api.cyber.fund
    export CYBER_MARKETS_API=http://localhost:9000
    
    docker run -e CYBER_CHAINGEAR_API -e CYBER_SEARCH_API -e CYBER_MARKETS_API --name frontend -d -p 7000:80 cybernode/cui-browser
    
Checking container logs:

    docker logs frontend

To attach to container and/or remove it if needed:

    docker exec -t -i frontend /bin/bash
    docker stop frontend
    docker rm frontend

To understand how do we pass environment params to stateless frontend, see
https://thepracticalsysadmin.com/templated-nginx-configuration-with-bash-and-docker/

#### Roadmap

* https://github.com/facebook/jest
* https://github.com/zeit/next.js/

