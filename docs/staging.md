
### Staging server

To avoid conflicts with other services on the same ports, we run our services on the following ports:

    cyber-ui :32500
    chaingear-api :32600
    cyber-search-api :32700
    cyber-markets-api :32800


#### Starting

Need to start 4 components:

- [cyber-ui](https://github.com/cyberFund/cyber-ui) (cui-browser)
- [cyber-search](https://github.com/cyberFund/cyber-search) API - up with `docker-compose.yml` at https://github.com/cyberFund/cyber-search/tree/chain_pump/devops/pumps
- [cyber-markets](https://github.com/cyberFund/cyber-markets) API - ???
- [chaingear](https://github.com/cyberFund/chaingear) API - ???

This only starts containers from DockerHub. It doesn't rebuild them. Rebuilding is another step.

#### Rebuilding

TODO: Move stuff out of CircleCI configs into build scripts + conventions.

