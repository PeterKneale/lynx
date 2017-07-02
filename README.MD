# Quick Start

## Start Postgres

- Start a postgres docker instance

```sh
docker run -d \
 -e POSTGRES_PASSWORD=password \
 -e POSTGRES_USER=admin \
 -e POSTGRES_DB=lynx \
    postgres
```

## Setup Environment Variables

- LYNX can be configured via environment variables

```sh
export LYNX_DB_HOST=172.17.0.7
export LYNX_DB_DATABASE=lynx
export LYNX_DB_USER=admin
export LYNX_DB_PASSWORD=password
```

## Execute LYNX

```sh
lynx --stderrthreshold=INFO
```

## Test

```sh
http POST localhost:8080/api/users firstname=peter lastname=kneale
```

# Unit Tests
```sh
 go test -v  . -args -stderrthreshold=INFO
```