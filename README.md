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
