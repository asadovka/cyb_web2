<h1 align="center">
Front door to blockchain universe
</h1>


<div align="center">
  <img src="/design/logo/readme.png"></a>
</div>



# Overview

Cyb is a blockchain browser with integrated DApp platform. Browser consists of two main parts:

1. Shell, which:

- can search in blockchains, Dapps, and IPFS content
- can deploy and manage Dapps for users
- shows desync state of user and blockchain
- manages user's account data (sign transactions, create custom feed)

2. DApps, which:

- use cyber.Search services for data obtaining (cyber.Search, cyber.Markets, cybernode)
- are stored in IPFS
- can interract with user and each other

### Development

    npm install yarn -g  # if not installed
    npm start

This starts local server that compiles all UI assets into memory and
updates them as soon as they are edited.

UI uses API endpoints, specified by the following environment variables:

* [cyber-search](https://github.com/cybercongress/cyber-search) `CYBER_SEARCH_API`
* [cyber-markets](https://github.com/cybercongress/cyber-markets) `CYBER_SEARCH_API`
* [chaingear](https://github.com/cybercomgress//chaingear-api) `CYBER_CHAINGEAR_API`

#### Building raw static site

    npm run build

This compiles all UI assets into static website, copied in `dist/`dir.
API endpoints are configured in [config.js](https://github.com/cybercongress/cyber-ui/blob/master/config.js).

#### Building container for deployment

    docker build -t cybernode/cui-browser -f ./devops/Dockerfile ./
    
To check that container works correctly, bring up backend API, pass
their endpoint URLs as environment variables and run container:
    
    export CYBER_CHAINGEAR_API=http://127.0.0.1:32600
    export CYBER_SEARCH_API=http://127.0.0.1:32700
    export CYBER_MARKETS_API=http://127.0.0.1:32800
    
    docker run -e CYBER_CHAINGEAR_API -e CYBER_SEARCH_API -e CYBER_MARKETS_API --name frontend -d -p 127.0.0.1:32500:80 cybernode/cui-browser

This command starts server on http://127.0.0.1:32500

Checking container logs:

    docker logs frontend

To attach to container and/or remove it if needed:

    docker exec -t -i frontend /bin/bash
    docker stop frontend
    docker rm frontend

### Cybernode settings

* **Image**: `cui-browser`
* **Portmap**: 32500


[http://browser.cybersearch.io/](http://browser.cybersearch.io/)


## Issues

If you have any problems with or questions about CYB, please contact us through a 
[GitHub issue](https://github.com/cybercongress/cyb/issues).

## Gitcoin Tasks
<a href="https://gitcoin.co/explorer?q=cyber-browser">
    <img src="https://gitcoin.co/funding/embed?repo=https://github.com/cybercongress/cyber-browser">
</a>

## Contribute

You are invited to contribute new features, fixes, or updates, large or small; We are always thrilled to receive pull 
requests, and do our best to process them as fast as We can. You can find detailed information in our 
[contribution guide](./CONTRIBUTING.md).
 
## Roadmap & Changelog

Stay tuned with our [Changelog](./CHANGELOG.md) and [Roadmap](./ROADMAP.md).






