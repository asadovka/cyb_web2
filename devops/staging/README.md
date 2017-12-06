Files in this dir:

* `docker-compose.yml` - test setup for local development with `docker-compose up`.
   It is set with port conventions for backend API, but doesn't bring up any of the
   components.
* `docker-compose.yml.staging` - container setup for current staging server. It
   doesn't bring up backend API components. Because they are maintained in their
   own repos.
* `up.sh` - script that brings everything up on staging server, including backend
   APIs. It assumes that backend projects are checked out at the same level as this
   repository. See [/docs/staging.md](/docs/staging.md) for details.
