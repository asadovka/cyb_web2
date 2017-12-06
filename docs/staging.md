
### Staging server

To avoid conflicts with other services on the same ports, we run our services on the following ports:

    cyber-ui :32500
    chaingear-api :32600
    cyber-search-api :32700
    cyber-markets-api :32800

Staging runs 4 components:

- [cyber-ui](https://github.com/cyberFund/cyber-ui) (cui-browser)
- [cyber-search](https://github.com/cyberFund/cyber-search) API - up with `docker-compose.yml` at https://github.com/cyberFund/cyber-search/tree/chain_pump/devops/pumps
- [cyber-markets](https://github.com/cyberFund/cyber-markets) API - ???
- [chaingear](https://github.com/cyberFund/chaingear) API - ???

### Server setup

This is only needed to be done once.

1. SSH to staging server. Make sure you're in `docker` group:

       $ groups
       anatoli docker wheel cyber

2. Checkout repos for `cyber-ui` and components:

       $ git clone https://github.com/cyberFund/cyber-ui
       $ git clone https://github.com/cyberFund/cyber-markets

#### Update running containers

Update running containers:

       $ ./cyber-ui/devops/staging/up.sh

This uses `docker-compose` to start containers from DockerHub. It doesn't rebuild them.

#### Rebuilding

TODO: Move stuff out of CircleCI configs into build scripts + conventions.

